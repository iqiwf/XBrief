import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { fail } from "./errors.js";

const TTL_MS = 60 * 60 * 1000;
const MAX_TEXT = 30_000;

function secret() {
  const value = process.env.SESSION_SECRET || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
  if (!value.trim()) throw fail(503, "Set GEMINI_API_KEY in the server environment.");
  return value.trim();
}

function key() {
  return createHash("sha256").update(`xbrief-draft:${secret()}`).digest();
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
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(payload), "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString("base64url");
}

export function openArticle(token) {
  let payload;
  try {
    const raw = Buffer.from(String(token || ""), "base64url");
    if (raw.length < 30) throw new Error("short");
    const decipher = createDecipheriv("aes-256-gcm", key(), raw.subarray(0, 12));
    decipher.setAuthTag(raw.subarray(12, 28));
    const json = Buffer.concat([decipher.update(raw.subarray(28)), decipher.final()]).toString("utf8");
    payload = JSON.parse(json);
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
