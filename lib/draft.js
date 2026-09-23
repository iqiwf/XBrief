import { createHmac, timingSafeEqual } from "node:crypto";
import { fail } from "./errors.js";

const TTL_MS = 60 * 60 * 1000;
const MAX_TEXT = 30_000;

function secret() {
  const value = process.env.SESSION_SECRET || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
  if (!value.trim()) throw fail(503, "Set GEMINI_API_KEY in the server environment.");
  return value.trim();
}

function sign(body) {
  return createHmac("sha256", secret()).update(body).digest("base64url");
}

export function sealArticle(article) {
  const payload = {
    title: String(article.title || "Untitled").slice(0, 300),
    byline: String(article.byline || "").slice(0, 300),
    siteName: String(article.siteName || "").slice(0, 120),
    url: String(article.url || "").slice(0, 2000),
    text: String(article.text || "").slice(0, MAX_TEXT),
    truncated: Boolean(article.truncated),
    words: Number(article.words) || 0,
    exp: Date.now() + TTL_MS,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function openArticle(token) {
  const value = String(token || "");
  const cut = value.lastIndexOf(".");
  if (cut < 1) throw fail(400, "That draft expired. Generate again from the URL.");
  const body = value.slice(0, cut);
  const given = value.slice(cut + 1);
  const expected = sign(body);
  const left = Buffer.from(given);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) {
    throw fail(400, "That draft expired. Generate again from the URL.");
  }
  let payload;
  try {
    payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    throw fail(400, "That draft expired. Generate again from the URL.");
  }
  if (!payload || typeof payload.text !== "string" || payload.text.length > MAX_TEXT || !payload.exp) {
    throw fail(400, "That draft expired. Generate again from the URL.");
  }
  if (Date.now() > payload.exp) throw fail(400, "That draft expired. Generate again from the URL.");
  return {
    title: String(payload.title || "Untitled"),
    byline: String(payload.byline || ""),
    siteName: String(payload.siteName || ""),
    url: String(payload.url || ""),
    text: payload.text,
    truncated: Boolean(payload.truncated),
    words: Number(payload.words) || payload.text.split(/\s+/).filter(Boolean).length,
  };
}
