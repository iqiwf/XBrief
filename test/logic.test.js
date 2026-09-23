import assert from "node:assert/strict";
import test from "node:test";
import { xCount, LIMITS } from "../lib/count.js";
import { checkGrounding, stripUngrounded } from "../lib/ground.js";
import { fitPosts, splitSentences } from "../lib/posts.js";
import { geminiKind, retryDelayMs, writePosts } from "../lib/gemini.js";
import { parseArticle } from "../lib/extract.js";
import { describeFailure, failureCode, isPrivateIp, orderAddresses, pickAddress, pinnedLookup, validateUrlShape } from "../lib/ssrf.js";

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
  assert.equal(pickAddress([{ address: "10.0.0.1" }, { address: "1.1.1.1" }]).address, "1.1.1.1");
  assert.equal(pickAddress([{ address: "10.0.0.1" }, { address: "192.168.1.1" }]), null);
  assert.equal(pickAddress([{ address: "2001:4860:4860::8888" }, { address: "10.0.0.1" }]).address, "2001:4860:4860::8888");
  assert.equal(pickAddress([{ address: "1.1.1.1", family: 4 }]).address, "1.1.1.1");
  assert.equal(isPrivateIp("::ffff:127.0.0.1"), true);
  assert.equal(isPrivateIp("64:ff9b::7f00:1"), true);
  assert.equal(isPrivateIp("64:ff9b:1::1"), true);
  assert.equal(isPrivateIp("100::1"), true);
  assert.equal(isPrivateIp("2001:db8::1"), true);
  assert.equal(isPrivateIp("fec0::1"), true);
  assert.equal(isPrivateIp("198.18.0.1"), true);
  assert.equal(isPrivateIp("203.0.113.5"), true);
  assert.equal(isPrivateIp("198.51.100.5"), true);
  assert.equal(isPrivateIp("2001:4860:4860::8888"), false);
  assert.equal(isPrivateIp("2a04:4e42::367"), false);
  assert.deepEqual(
    orderAddresses([
      { address: "2001:4860:4860::8888" },
      { address: "10.0.0.1" },
      { address: "1.1.1.1" },
      { address: "::ffff:1.0.0.1" },
      { address: "1.1.1.1" },
      { address: "2606:4700:4700::1111" },
    ]).map((item) => item.address),
    ["1.1.1.1", "1.0.0.1", "2001:4860:4860::8888", "2606:4700:4700::1111"],
  );
  pinnedLookup("1.1.1.1")("example.com", { all: true }, (error, result) => {
    assert.equal(error, null);
    assert.deepEqual(result, [{ address: "1.1.1.1", family: 4 }]);
  });
  const dual = pinnedLookup(["2606:4700:4700::1111", "1.1.1.1", "10.1.1.1"]);
  dual("example.com", { all: true }, (error, result) => {
    assert.equal(error, null);
    assert.deepEqual(result, [
      { address: "1.1.1.1", family: 4 },
      { address: "2606:4700:4700::1111", family: 6 },
    ]);
  });
  dual("example.com", { family: 6 }, (error, address, family) => {
    assert.equal(error, null);
    assert.equal(address, "2606:4700:4700::1111");
    assert.equal(family, 6);
  });
  pinnedLookup(["10.0.0.1"])("example.com", {}, (error) => {
    assert.equal(error.code, "EBADADDR");
  });
});

test("fetch failures keep the underlying cause", () => {
  const cause = new Error("connect ECONNREFUSED");
  cause.code = "ECONNREFUSED";
  const error = new TypeError("fetch failed");
  error.cause = cause;
  assert.match(describeFailure(error), /ECONNREFUSED/);
  assert.match(describeFailure(error), /fetch failed/);
  assert.equal(failureCode(error), "ECONNREFUSED");
  const abort = new DOMException("The operation was aborted.", "AbortError");
  assert.equal(failureCode(abort), "AbortError");
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
      <p>LIVE</p>
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
  assert.doesNotMatch(article.text, /\bLIVE\b/);
});

test("json-ld and article markup beat a challenge page and related links", () => {
  const html = `<!doctype html><html><head>
    <script type="application/ld+json">{"@type":"NewsArticle","headline":"Council delays the vote","articleBody":"The city council voted Tuesday to delay the bridge decision until June after a long public meeting. Mayor Ada Quinn said staff would publish the cost memo before another vote. The hearing is set for June 12 at city hall, and no construction date was placed on the calendar."}</script>
  </head><body>
    <article>
      <p>The city council voted Tuesday to delay the bridge decision until June. Mayor Ada Quinn said staff would publish the cost memo.</p>
      <aside class="related">Recommended: Sports scores and shopping deals</aside>
    </article>
  </body></html>`;
  const article = parseArticle(html, "https://news.example/story");
  assert.match(article.text, /June 12/);
  assert.doesNotMatch(article.text, /Sports scores/);
  assert.throws(
    () => parseArticle("<html><body><h1>Just a moment</h1><p>Verify you are human before continuing.</p></body></html>", "https://news.example/wall"),
    /blocked the fetch|login/,
  );
});

test("article text is recovered from json-ld lists and from div layouts", () => {
  const linked = `<!doctype html><html><head>
    <script type="application/ld+json">{"@type":["NewsArticle"],"headline":"Council delays the vote","articleBody":["The city council voted Tuesday to delay the bridge decision until June after a long public meeting.","Mayor Ada Quinn said staff would publish the cost memo before another vote. The hearing is set for June 12 at city hall, and no construction date was placed on the calendar."]}</script>
  </head><body><p>Preview only.</p></body></html>`;
  assert.match(parseArticle(linked, "https://news.example/json").text, /June 12/);

  const blocks = `<!doctype html><html><head><title>Markets settle after a wild open</title></head><body>
    <div id="story">
      <h1>Markets settle after a wild open</h1>
      <div>Traders spent the morning reversing a sharp drop after the central bank left rates unchanged. The move surprised desks that had priced in a cut.</div>
      <div>By the close, the local index had recovered most of the loss and the currency was steady against the dollar. Officials declined to preview the next meeting.</div>
      <div>Analysts at North Bridge said the statement was the same one published in March, and no new stimulus figure was included in the release.</div>
    </div>
  </body></html>`;
  const article = parseArticle(blocks, "https://markets.example/open");
  assert.match(article.text, /North Bridge/);
  assert.equal(article.title, "Markets settle after a wild open");
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

test("a busy Gemini response is retried once", async () => {
  const original = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    if (calls === 1) {
      return new Response(
        JSON.stringify({ error: { message: "This model is currently experiencing high demand. Please try again later." } }),
        { status: 503, headers: { "content-type": "application/json", "retry-after": "0" } },
      );
    }
    return new Response(
      JSON.stringify({
        candidates: [{ content: { parts: [{ text: JSON.stringify({ posts: ["The council delayed the bridge vote until June."] }) }] } }],
      }),
      { status: 200, headers: { "content-type": "application/json" } },
    );
  };
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
        text: "The council delayed the bridge vote until June.",
      },
    });
    assert.equal(calls, 2);
    assert.match(result.posts[0].text, /June/);
  } finally {
    globalThis.fetch = original;
  }
});

test("gemini errors are classified and quota is not retried", async () => {
  assert.equal(geminiKind(429, { error: { status: "RESOURCE_EXHAUSTED", message: "You exceeded your current quota, please check your plan and billing details." } }), "quota");
  assert.equal(geminiKind(429, { error: { status: "RESOURCE_EXHAUSTED", message: "rate_limit_exceeded" } }), "rate");
  assert.equal(geminiKind(429, { error: { message: "too many requests" } }), "rate");
  assert.equal(geminiKind(403, { error: { status: "PERMISSION_DENIED", message: "API key not valid." } }), "auth");
  assert.equal(geminiKind(400, { error: { message: "Invalid thinking config." } }), "thinking");
  assert.equal(geminiKind(400, { error: { message: "Request contains an invalid argument." } }), "permanent");
  assert.equal(geminiKind(503, { error: { message: "unavailable" } }), "transient");
  assert.equal(retryDelayMs({ headers: { get: () => "2" } }, 0), 2000);
  assert.ok(retryDelayMs({ headers: { get: () => null } }, 0) >= 1000);
  assert.ok(retryDelayMs({ headers: { get: () => null } }, 1) >= 2000);

  const original = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return new Response(
      JSON.stringify({ error: { status: "RESOURCE_EXHAUSTED", message: "You exceeded your current quota, please check your plan and billing details." } }),
      { status: 429, headers: { "content-type": "application/json" } },
    );
  };
  try {
    await assert.rejects(
      writePosts({
        apiKey: "server-key",
        model: "gemini-3.5-flash",
        mode: "standard",
        article: { title: "Bridge", siteName: "Desk", byline: "", truncated: false, text: "The council delayed the vote." },
      }),
      /daily quota/,
    );
    assert.equal(calls, 1);
  } finally {
    globalThis.fetch = original;
  }
});

test("a rate limit retries then stops, and a bad request does not", async () => {
  const original = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return new Response(
      JSON.stringify({ error: { status: "RESOURCE_EXHAUSTED", message: "too many requests" } }),
      { status: 429, headers: { "content-type": "application/json", "retry-after": "0" } },
    );
  };
  const article = { title: "Bridge", siteName: "Desk", byline: "", truncated: false, text: "The council delayed the vote." };
  try {
    await assert.rejects(
      writePosts({ apiKey: "server-key", model: "gemini-3.5-flash", mode: "standard", article }),
      /rate-limiting/,
    );
    assert.equal(calls, 3);
    calls = 0;
    globalThis.fetch = async () => {
      calls += 1;
      return new Response(
        JSON.stringify({ error: { message: "Request contains an invalid argument." } }),
        { status: 400, headers: { "content-type": "application/json" } },
      );
    };
    await assert.rejects(
      writePosts({ apiKey: "server-key", model: "gemini-3.5-flash", mode: "standard", article }),
      /could not write the post/,
    );
    assert.equal(calls, 1);
  } finally {
    globalThis.fetch = original;
  }
});

test("a clean draft and a second draft each call Gemini once", async () => {
  const original = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async (_url, options) => {
    calls += 1;
    const body = JSON.parse(options.body);
    assert.equal(body.contents.length, 1);
    assert.equal((body.contents[0].parts[0].text.match(/Article:/g) || []).length, 1);
    return new Response(
      JSON.stringify({
        candidates: [{ content: { parts: [{ text: JSON.stringify({ posts: ["The council delayed the bridge vote until June."] }) }] } }],
      }),
      { status: 200, headers: { "content-type": "application/json" } },
    );
  };
  const article = { title: "Bridge", siteName: "Desk", byline: "", truncated: false, text: "The council delayed the bridge vote until June." };
  try {
    await writePosts({ apiKey: "server-key", model: "gemini-3.5-flash", mode: "standard", article });
    await writePosts({ apiKey: "server-key", model: "gemini-3.5-flash", mode: "standard", article });
    assert.equal(calls, 2);
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
