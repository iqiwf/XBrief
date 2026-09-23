import assert from "node:assert/strict";
import test from "node:test";
import { xCount } from "../lib/count.js";
import { sealArticle, openArticle } from "../lib/draft.js";
import { readLimited } from "../lib/extract.js";
import { createGuard } from "../lib/guard.js";
import { generate, regenerate, status } from "../lib/routes.js";
import { selectArticle } from "../lib/select.js";
import { xCount as browserCount } from "../public/count.js";

function mockRes() {
  return {
    headersSent: false,
    writableEnded: false,
    statusCode: 0,
    body: "",
    writeHead(code) {
      this.statusCode = code;
    },
    end(payload) {
      this.body = String(payload);
      this.writableEnded = true;
    },
  };
}

function jsonRequest(body) {
  const payload = Buffer.from(JSON.stringify(body));
  return {
    method: "POST",
    headers: { "x-real-ip": "203.0.113.10" },
    socket: { remoteAddress: "127.0.0.1" },
    async *[Symbol.asyncIterator]() {
      yield payload;
    },
  };
}

test("weighted counts match twitter-text, including urls, CJK, and emoji", () => {
  assert.equal(xCount("plain"), 5);
  assert.equal(xCount("https://example.com/a/b"), 23);
  assert.equal(xCount("See https://example.com/a/b."), 4 + 23 + 1);
  assert.equal(xCount("東京"), 4);
  assert.equal(xCount("👍"), 2);
  assert.equal(browserCount("See https://example.com/a/b. 東京👍"), xCount("See https://example.com/a/b. 東京👍"));
});

test("long articles keep the ending and sourced figures", () => {
  const paragraphs = [
    ...Array.from({ length: 6 }, (_, index) => `Opening paragraph ${index} sets the scene before any decision is made.`),
    "A bland recap of the weather and the crowd with nothing to cite.",
    'The auditor said "the gap is 12 percent and not a typo".',
    "In the end the council adjourned without setting a construction date.",
  ];
  const source = paragraphs.join("\n\n");
  const selected = selectArticle(source, 420);
  assert.equal(selected.truncated, true);
  assert.match(selected.text, /adjourned/);
  assert.match(selected.text, /12 percent/);
  assert.ok(selected.text.length < source.length);
});

test("signed drafts round-trip without shared memory", () => {
  const previous = process.env.SESSION_SECRET;
  process.env.SESSION_SECRET = "test-secret";
  try {
    const token = sealArticle({
      title: "Bridge",
      byline: "",
      siteName: "Desk",
      url: "https://desk.example/bridge",
      text: "The council delayed the vote.",
      truncated: false,
      words: 5,
    });
    assert.equal(openArticle(token).text, "The council delayed the vote.");
    assert.doesNotMatch(token, /council delayed/);
    assert.throws(() => openArticle(`${token.slice(0, -8)}tampered`));
  } finally {
    if (previous === undefined) delete process.env.SESSION_SECRET;
    else process.env.SESSION_SECRET = previous;
  }
});

test("guard limits rate and concurrency", () => {
  const guard = createGuard({ limit: 2, windowMs: 60_000, maxActive: 1 });
  const release = guard.enter("203.0.113.8");
  assert.throws(() => guard.enter("203.0.113.9"));
  release();
  guard.enter("203.0.113.8");
  assert.throws(() => guard.enter("203.0.113.8"));
});

test("response bodies stop at the size limit", async () => {
  const body = new ReadableStream({
    start(controller) {
      controller.enqueue(new Uint8Array(80));
      controller.enqueue(new Uint8Array(80));
      controller.close();
    },
  });
  await assert.rejects(readLimited(body, 100), /too large/);
  const small = new ReadableStream({
    start(controller) {
      controller.enqueue(new Uint8Array([1, 2, 3]));
      controller.close();
    },
  });
  assert.equal((await readLimited(small, 10)).length, 3);
});

test("vercel's public host is accepted for same-origin posts", async () => {
  const res = mockRes();
  const req = jsonRequest({ url: "http://127.0.0.1/secret", mode: "standard" });
  req.headers["x-vercel-id"] = "sfo1::abc";
  req.headers["x-forwarded-host"] = "xbrief.vercel.app";
  req.headers.host = "internal.vercel";
  req.headers.origin = "https://xbrief.vercel.app";
  await generate(req, res);
  assert.equal(res.statusCode, 400);
  assert.match(res.body, /not allowed/);
});

test("cross-site posts are rejected", async () => {
  const res = mockRes();
  const req = jsonRequest({ url: "https://example.com", mode: "standard" });
  req.headers.origin = "https://evil.example";
  req.headers.host = "xbrief.vercel.app";
  await generate(req, res);
  assert.equal(res.statusCode, 403);
});

test("private urls are rejected before any fetch", async () => {
  const res = mockRes();
  await generate(jsonRequest({ url: "http://127.0.0.1/secret", mode: "standard" }), res);
  assert.equal(res.statusCode, 400);
  assert.match(res.body, /not allowed/);
  assert.doesNotMatch(res.body, /AIza|GEMINI_API_KEY/);
});

test("status does not reveal a key", async () => {
  const res = mockRes();
  await status({ method: "GET", headers: {} }, res);
  const payload = JSON.parse(res.body);
  assert.equal(res.statusCode, 200);
  assert.equal(typeof payload.configured, "boolean");
  assert.equal(payload.limits.standard, 280);
  assert.equal(payload.limits.premium, 25000);
  assert.doesNotMatch(res.body, /AIza|SESSION_SECRET/);
});

test("regenerate uses the signed article and returns a valid thread", async () => {
  const previousSecret = process.env.SESSION_SECRET;
  const previousKey = process.env.GEMINI_API_KEY;
  process.env.SESSION_SECRET = "test-secret";
  process.env.GEMINI_API_KEY = "server-key";
  const original = globalThis.fetch;
  const article = {
    title: "Bridge",
    byline: "",
    siteName: "Desk",
    url: "https://desk.example/bridge",
    text: "The council delayed the bridge vote until June. Ada Quinn said staff would publish the cost memo. The hearing is set for June 12 at city hall.",
    truncated: false,
    words: 28,
  };
  globalThis.fetch = async (_url, options) => {
    assert.equal(options.headers["x-goog-api-key"], "server-key");
    const posts = ["The council delayed the bridge vote until June. Ada Quinn said the hearing is set for June 12."];
    return new Response(
      JSON.stringify({ candidates: [{ content: { parts: [{ text: JSON.stringify({ posts }) }] } }] }),
      { status: 200, headers: { "content-type": "application/json" } },
    );
  };
  try {
    const res = mockRes();
    await regenerate(jsonRequest({ id: sealArticle(article), mode: "standard" }), res);
    assert.equal(res.statusCode, 200);
    const payload = JSON.parse(res.body);
    assert.equal(payload.posts.length, 1);
    assert.ok(payload.posts[0].chars <= 280);
    assert.equal(payload.posts[0].chars, xCount(payload.posts[0].text));
    assert.match(payload.posts[0].text, /June 12/);
    assert.equal(openArticle(payload.id).text, article.text);
  } finally {
    globalThis.fetch = original;
    if (previousSecret === undefined) delete process.env.SESSION_SECRET;
    else process.env.SESSION_SECRET = previousSecret;
    if (previousKey === undefined) delete process.env.GEMINI_API_KEY;
    else process.env.GEMINI_API_KEY = previousKey;
  }
});
