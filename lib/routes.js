import { LIMITS } from "./count.js";
import { sealArticle, openArticle } from "./draft.js";
import { extractArticle } from "./extract.js";
import { writePosts } from "./gemini.js";
import { clientIp, guard } from "./guard.js";
import { apiKey, assertSameOrigin, createHandler, modeOf, modelName, readJson, send } from "./http.js";
import { validateUrlShape } from "./ssrf.js";

async function compose(article, mode) {
  const written = await writePosts({ apiKey: apiKey(), model: modelName(), mode, article });
  return {
    id: sealArticle(article),
    mode,
    limit: LIMITS[mode],
    title: article.title,
    siteName: article.siteName,
    url: article.url,
    words: article.words,
    excerpt: article.text.slice(0, 420).trim(),
    truncated: article.truncated,
    dropped: written.dropped,
    posts: written.posts,
  };
}

async function withGuard(req, run) {
  const release = guard.enter(clientIp(req));
  try {
    return await run();
  } finally {
    release();
  }
}

export const status = createHandler(async (req, res) => {
  if (req.method !== "GET") return send(res, 405, { error: "Method not allowed." });
  const configured = Boolean((process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "").trim());
  send(res, 200, { configured, limits: LIMITS, model: configured ? modelName() : null });
});

export const generate = createHandler(async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "Method not allowed." });
  assertSameOrigin(req);
  const body = await readJson(req);
  const mode = modeOf(body.mode);
  if (!mode) return send(res, 400, { error: "Pick Standard or Premium." });
  validateUrlShape(body.url);
  apiKey();
  const payload = await withGuard(req, async () => compose(await extractArticle(body.url), mode));
  send(res, 200, payload);
});

export const regenerate = createHandler(async (req, res) => {
  if (req.method !== "POST") return send(res, 405, { error: "Method not allowed." });
  assertSameOrigin(req);
  const body = await readJson(req);
  const mode = modeOf(body.mode);
  if (!mode) return send(res, 400, { error: "Pick Standard or Premium." });
  apiKey();
  const payload = await withGuard(req, async () => compose(openArticle(body.id), mode));
  send(res, 200, payload);
});
