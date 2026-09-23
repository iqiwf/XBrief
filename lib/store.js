import { randomBytes } from "node:crypto";

const TTL_MS = 60 * 60 * 1000;
const MAX = 40;
const sessions = new Map();

function prune(now) {
  for (const [id, entry] of sessions) {
    if (now - entry.created > TTL_MS) sessions.delete(id);
  }
  while (sessions.size > MAX) {
    const oldest = sessions.keys().next().value;
    sessions.delete(oldest);
  }
}

export function saveArticle(article) {
  const now = Date.now();
  prune(now);
  const id = randomBytes(12).toString("hex");
  sessions.set(id, { article, created: now });
  return id;
}

export function getArticle(id) {
  if (!/^[a-f0-9]{24}$/.test(String(id || ""))) return null;
  const entry = sessions.get(id);
  if (!entry) return null;
  if (Date.now() - entry.created > TTL_MS) {
    sessions.delete(id);
    return null;
  }
  return entry.article;
}
