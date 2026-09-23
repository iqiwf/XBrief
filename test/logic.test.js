import assert from "node:assert/strict";
import test from "node:test";
import { xCount, LIMITS } from "../lib/count.js";
import { checkGrounding, stripUngrounded } from "../lib/ground.js";
import { fitPosts, splitSentences } from "../lib/posts.js";
import { writePosts } from "../lib/gemini.js";
import { parseArticle } from "../lib/extract.js";
import { isPrivateIp, pickAddress, pinnedLookup, validateUrlShape } from "../lib/ssrf.js";

test("x counts urls as 23 and leaves trailing punctuation", () => {
  assert.equal(xCount("See https://example.com/a/b."), 4 + 23 + 1);
  assert.equal(xCount("plain"), 5);
});

test("posts pack on sentence boundaries and refuse a mid-word cut", () => {
  const posts = fitPosts(["Alpha went home. Bravo stayed late. Charlie wrote it down."], 28);
  assert.ok(posts);
  assert.ok(posts.every((post) => xCount(post) <= 28));
  assert.equal(posts.join(" "), "Alpha went home. Bravo stayed late. Charlie wrote it down.");
  assert.equal(fitPosts(["Supercalifragilisticexpialidocious is not a sentence that can break."], 20), null);
});

test("sentence split keeps abbreviations together", () => {
  assert.deepEqual(splitSentences("The U.S. won. Then it rained."), ["The U.S. won.", "Then it rained."]);
});

test("grounding catches new numbers, quotes, and names", () => {
  const source = "Ada Lovelace met the press in London and confirmed 12% growth.";
  assert.equal(checkGrounding(["Ada Lovelace confirmed 12% growth in London."], source).ok, true);
  const bad = checkGrounding(['Ada Lovelace confirmed 40% growth and said "we are thrilled today".'], source);
  assert.equal(bad.ok, false);
  assert.ok(bad.issues.some((issue) => issue.value === "40%"));
  const stripped = stripUngrounded(
    ["Ada Lovelace confirmed 12% growth in London. Invented City raised $9."],
    source,
  );
  assert.equal(stripped.removed, 1);
  assert.match(stripped.posts[0], /12%/);
});

test("private hosts and odd urls are rejected", () => {
  assert.equal(isPrivateIp("127.0.0.1"), true);
  assert.equal(isPrivateIp("10.1.2.3"), true);
  assert.equal(isPrivateIp("8.8.8.8"), false);
  assert.equal(isPrivateIp("169.254.169.254"), true);
  assert.throws(() => validateUrlShape("http://localhost/a"));
  assert.throws(() => validateUrlShape("file:///etc/passwd"));
  assert.equal(validateUrlShape("https://example.com/story").hostname, "example.com");
  assert.throws(() => validateUrlShape("http://metadata.google.internal/"));
  assert.equal(isPrivateIp("::1"), true);
  assert.equal(isPrivateIp("fe80::1"), true);
  assert.equal(isPrivateIp("fd00::1"), true);
  assert.equal(pickAddress([{ address: "1.1.1.1" }, { address: "10.0.0.1" }]), null);
  assert.equal(pickAddress([{ address: "1.1.1.1", family: 4 }]).address, "1.1.1.1");
  pinnedLookup("1.1.1.1")("example.com", { all: true }, (error, result) => {
    assert.equal(error, null);
    assert.deepEqual(result, [{ address: "1.1.1.1", family: 4 }]);
  });
});

test("reader keeps the story and drops the chrome", () => {
  const html = `<!doctype html><html><head>
    <title>Ignored</title>
    <meta property="og:site_name" content="Desk">
    <meta property="og:title" content="City council delays the bridge vote">
  </head><body>
    <nav>Home Sports</nav>
    <article>
      <h1>City council delays the bridge vote</h1>
      <p>The city council voted Tuesday to delay the bridge decision until June, after residents asked for another hearing.</p>
      <p>Mayor Ada Quinn said the pause would let staff publish the cost memo. No new figure was given.</p>
      <p>The hearing is set for June 12 at city hall. Council members did not set a construction date.</p>
    </article>
  </body></html>`;
  const article = parseArticle(html, "https://desk.example/bridge");
  assert.equal(article.title, "City council delays the bridge vote");
  assert.equal(article.siteName, "Desk");
  assert.match(article.text, /Ada Quinn/);
  assert.doesNotMatch(article.text, /Sports/);
});

test("limits match the product", () => {
  assert.equal(LIMITS.standard, 280);
  assert.equal(LIMITS.premium, 25000);
});

test("rewrite drops invented numbers and keeps each post inside the limit", async () => {
  const original = globalThis.fetch;
  const article = {
    title: "Council delays bridge vote",
    byline: "",
    siteName: "Desk",
    url: "https://desk.example/bridge",
    truncated: false,
    text: "The city council voted Tuesday to delay the bridge decision until June. Mayor Ada Quinn said the pause would let staff publish the cost memo. The hearing is set for June 12 at city hall.",
  };
  let calls = 0;
  globalThis.fetch = async (_url, options) => {
    calls += 1;
    assert.equal(options.headers["x-goog-api-key"], "server-key");
    const body = JSON.parse(options.body);
    assert.match(body.systemInstruction.parts[0].text, /280/);
    const posts =
      calls === 1
        ? ["The council delayed the bridge vote until June, and Ada Quinn said staff would publish the cost memo. Turnout hit 90%."]
        : ["The council delayed the bridge vote until June. Ada Quinn said the pause would let staff publish the cost memo. The hearing is set for June 12 at city hall."];
    return new Response(
      JSON.stringify({ candidates: [{ content: { parts: [{ text: JSON.stringify({ posts }) }] } }] }),
      { status: 200, headers: { "content-type": "application/json" } },
    );
  };
  try {
    const result = await writePosts({
      apiKey: "server-key",
      model: "gemini-3.5-flash",
      mode: "standard",
      article,
    });
    assert.equal(calls, 2);
    assert.equal(result.posts.length, 1);
    assert.ok(result.posts[0].chars <= 280);
    assert.equal(result.posts[0].chars, xCount(result.posts[0].text));
    assert.doesNotMatch(result.posts[0].text, /90%/);
    assert.match(result.posts[0].text, /June 12/);
  } finally {
    globalThis.fetch = original;
  }
});

test("a long draft becomes a thread split on sentences", async () => {
  const original = globalThis.fetch;
  const sentences = [
    "The council delayed the bridge vote until June after a long and crowded public meeting.",
    "Ada Quinn said staff would publish the cost memo before anyone is asked to decide again.",
    "The hearing is set for June 12 at city hall, and no construction date was put on the calendar.",
    "Residents asked for another hearing before any construction date is even discussed in public.",
  ];
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        candidates: [{ content: { parts: [{ text: JSON.stringify({ posts: [sentences.join(" ")] }) }] } }],
      }),
      { status: 200 },
    );
  try {
    const result = await writePosts({
      apiKey: "server-key",
      model: "gemini-3.5-flash",
      mode: "standard",
      article: {
        title: "Bridge",
        siteName: "Desk",
        byline: "",
        truncated: false,
        text: sentences.join(" "),
      },
    });
    assert.ok(result.posts.length > 1);
    assert.ok(result.posts.every((post) => post.chars <= 280));
    assert.match(result.posts[0].text, /^1\//);
    assert.equal(
      result.posts.map((post) => post.text.replace(/^\d+\/\d+\s+/, "")).join(" "),
      sentences.join(" "),
    );
  } finally {
    globalThis.fetch = original;
  }
});
