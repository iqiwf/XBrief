import { fail } from "./errors.js";

const MAX_BODY = 100_000;

export function send(res, status, body) {
  const payload = JSON.stringify(body);
  if (res.headersSent || res.writableEnded) return;
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
  });
  res.end(payload);
}

export async function readJson(req) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) return req.body;
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body || "{}");
    } catch {
      throw fail(400, "Request body must be JSON.");
    }
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY) throw fail(413, "Request is too large.");
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
  } catch {
    throw fail(400, "Request body must be JSON.");
  }
}

export function modeOf(value) {
  return value === "premium" ? "premium" : value === "standard" ? "standard" : null;
}

export function apiKey() {
  const value = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
  if (!value.trim()) throw fail(503, "Set GEMINI_API_KEY in the server environment.");
  return value.trim();
}

export function modelName() {
  return (process.env.GEMINI_MODEL || "gemini-3.5-flash").trim();
}

export function createHandler(run) {
  return async function handler(req, res) {
    try {
      await run(req, res);
    } catch (error) {
      const status = error.status || 500;
      const message = error.expose ? error.message : "Something went wrong.";
      if (!error.expose) console.error(error);
      send(res, status, { error: message });
    }
  };
}
