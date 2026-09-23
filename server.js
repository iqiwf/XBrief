import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "./lib/env.js";
import { fail } from "./lib/errors.js";
import { LIMITS } from "./lib/count.js";
import { extractArticle } from "./lib/extract.js";
import { validateUrlShape } from "./lib/ssrf.js";
import { writePosts } from "./lib/gemini.js";
import { getArticle, saveArticle } from "./lib/store.js";

const root = fileURLToPath(new URL(".", import.meta.url));
loadEnv(join(root, ".env"));

const publicDir = join(root, "public");
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
};

function send(res, status, body, type = "application/json; charset=utf-8") {
  const payload = typeof body === "string" || Buffer.isBuffer(body) ? body : JSON.stringify(body);
  res.writeHead(status, {
    "content-type": type,
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
  });
  res.end(payload);
}

async function readJson(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 20_000) throw fail(413, "Request is too large.");
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
  } catch {
    throw fail(400, "Request body must be JSON.");
  }
}

function modeOf(value) {
  return value === "premium" ? "premium" : value === "standard" ? "standard" : null;
}

function key() {
  const value = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
  if (!value.trim()) throw fail(503, "Set GEMINI_API_KEY in .env on the server, then restart.");
  return value.trim();
}

function model() {
  return (process.env.GEMINI_MODEL || "gemini-3.5-flash").trim();
}

async function compose(article, mode) {
  const written = await writePosts({ apiKey: key(), model: model(), mode, article });
  return {
    id: saveArticle(article),
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

async function handleApi(req, res, url) {
  if (req.method === "GET" && url.pathname === "/api/status") {
    const configured = Boolean((process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "").trim());
    return send(res, 200, { configured, limits: LIMITS, model: configured ? model() : null });
  }
  if (req.method !== "POST") return send(res, 405, { error: "Method not allowed." });
  const body = await readJson(req);
  const mode = modeOf(body.mode);
  if (!mode) throw fail(400, "Pick Standard or Premium.");

  if (url.pathname === "/api/generate") {
    validateUrlShape(body.url);
    key();
    const article = await extractArticle(body.url);
    return send(res, 200, await compose(article, mode));
  }
  if (url.pathname === "/api/regenerate") {
    const article = getArticle(body.id);
    if (!article) throw fail(404, "That draft expired. Generate again from the URL.");
    return send(res, 200, await compose(article, mode));
  }
  return send(res, 404, { error: "Not found." });
}

async function handleStatic(res, pathname) {
  const requested = (pathname === "/" ? "index.html" : pathname).replace(/^[/\\]+/, "");
  if (!requested || requested.includes("\0")) return send(res, 404, { error: "Not found." });
  const file = resolve(publicDir, requested);
  if (file !== publicDir && !file.startsWith(publicDir + sep)) return send(res, 404, { error: "Not found." });
  try {
    const data = await readFile(file);
    send(res, 200, data, types[extname(file)] || "application/octet-stream");
  } catch {
    send(res, 404, { error: "Not found." });
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", "http://127.0.0.1");
  try {
    if (url.pathname.startsWith("/api/")) await handleApi(req, res, url);
    else if (req.method === "GET") await handleStatic(res, url.pathname);
    else send(res, 405, { error: "Method not allowed." });
  } catch (error) {
    const status = error.status || 500;
    const message = error.expose ? error.message : "Something went wrong.";
    if (!error.expose) console.error(error);
    send(res, status, { error: message });
  }
});

server.listen(port, host, () => {
  console.log(`news-to-x  http://${host}:${port}`);
});
