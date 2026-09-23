import { Readability } from "@mozilla/readability";
import { parseHTML } from "linkedom";
import { fail } from "./errors.js";
import { selectArticle } from "./select.js";
import { dispatcherFor, resolvePublic } from "./ssrf.js";

const MAX_BYTES = 1_500_000;
const MAX_REDIRECTS = 3;
const TIMEOUT_MS = 8_000;
const FETCH_BUDGET_MS = 20_000;

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

function decode(buffer, contentType) {
  const match = /charset=([^;]+)/i.exec(contentType || "");
  const charset = (match?.[1] || "utf-8").replace(/['"]/g, "").trim();
  try {
    return new TextDecoder(charset).decode(buffer);
  } catch {
    return new TextDecoder("utf-8").decode(buffer);
  }
}

export async function readLimited(body, maxBytes) {
  if (!body) throw fail(502, "The site returned an empty page.");
  const reader = body.getReader();
  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      throw fail(422, "That page is too large to read.");
    }
    chunks.push(Buffer.from(value));
  }
  return Buffer.concat(chunks);
}

async function fetchHtml(start) {
  const deadline = Date.now() + FETCH_BUDGET_MS;
  let current = start;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    const remaining = deadline - Date.now();
    if (remaining < 1_000) throw fail(504, "The site took too long to respond.");
    const pinned = await resolvePublic(current);
    current = pinned.url;
    const agent = dispatcherFor(pinned.address);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), Math.min(TIMEOUT_MS, remaining));
    let response;
    try {
      response = await fetch(current, {
        redirect: "manual",
        dispatcher: agent,
        signal: controller.signal,
        headers: {
          "user-agent": UA,
          accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
          "accept-language": "en-US,en;q=0.9",
        },
      });
    } catch (error) {
      clearTimeout(timer);
      await agent.close();
      if (error?.name === "AbortError") throw fail(504, "The site took too long to respond.");
      throw fail(502, "Could not open that page. It may be down or blocking fetches.");
    }

    const finish = async () => {
      clearTimeout(timer);
      await agent.close();
    };

    if (response.status >= 300 && response.status < 400) {
      await response.body?.cancel();
      const next = response.headers.get("location");
      await finish();
      if (!next) throw fail(502, "The site redirected without a destination.");
      current = new URL(next, current);
      continue;
    }
    if (response.status === 401 || response.status === 403) {
      await response.body?.cancel();
      await finish();
      throw fail(422, "The site refused the request. It may require a login.");
    }
    if (response.status === 404) {
      await response.body?.cancel();
      await finish();
      throw fail(422, "That page was not found.");
    }
    if (!response.ok) {
      await response.body?.cancel();
      await finish();
      throw fail(502, `The site returned ${response.status}.`);
    }

    const type = response.headers.get("content-type") || "";
    if (!/text\/html|application\/xhtml\+xml/i.test(type)) {
      await response.body?.cancel();
      await finish();
      throw fail(422, "That link is not an HTML article.");
    }
    const length = Number(response.headers.get("content-length") || 0);
    if (length > MAX_BYTES) {
      await response.body?.cancel();
      await finish();
      throw fail(422, "That page is too large to read.");
    }
    try {
      const buffer = await readLimited(response.body, MAX_BYTES);
      return { html: decode(buffer, type), finalUrl: current.href };
    } finally {
      await finish();
    }
  }
  throw fail(502, "Too many redirects.");
}

function meta(document, key) {
  const node =
    document.querySelector(`meta[property="${key}"]`) ||
    document.querySelector(`meta[name="${key}"]`);
  return node?.getAttribute("content")?.trim() || "";
}

function fallbackText(document) {
  const root =
    document.querySelector("article") ||
    document.querySelector("[itemprop='articleBody']") ||
    document.querySelector("main");
  if (!root) return "";
  root.querySelectorAll("script,style,noscript,nav,footer,aside,form").forEach((node) => node.remove());
  return root.textContent || "";
}

function paragraphs(content) {
  if (!content) return "";
  const { document } = parseHTML(`<article>${content}</article>`);
  const blocks = [...document.querySelectorAll("p, h2, h3, li, blockquote")];
  if (blocks.length < 2) return "";
  return blocks
    .map((node) => node.textContent.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n\n");
}

function cleanLead(text) {
  const parts = text.split(/\n\n/).map((part) => part.trim()).filter(Boolean);
  while (parts.length && /^\d+\s+(?:second|minute|hour|day|week|month)s?\s+ago$/i.test(parts[0])) {
    parts.shift();
  }
  if (parts.length >= 2) {
    const first = parts[0].replace(/\s+/g, " ");
    const second = parts[1].replace(/\s+/g, " ");
    const byline = first.length < 240 && !/[.!?]/.test(first);
    if (byline && (second.startsWith(first.slice(0, 40)) || first.length < 90)) parts.shift();
  }
  return parts
    .map((part) => (/[.!?]$/.test(part) ? part : part.replace(/([a-z])([A-Z])/g, "$1 $2")))
    .join("\n\n");
}

function clean(text) {
  return String(text || "")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

export function parseArticle(html, finalUrl) {
  const { document } = parseHTML(html);
  try {
    Object.defineProperty(document, "documentURI", { value: finalUrl });
  } catch {
    /* linkedom may already define it */
  }
  let parsed = null;
  try {
    parsed = new Readability(document, { charThreshold: 180 }).parse();
  } catch {
    parsed = null;
  }
  let text = clean(paragraphs(parsed?.content) || parsed?.textContent || "");
  let title = clean(parsed?.title || "");
  let byline = clean(parsed?.byline || "");
  if (text.length < 280) {
    const fresh = parseHTML(html).document;
    text = clean(fallbackText(fresh));
    title = title || clean(fresh.querySelector("h1")?.textContent || "");
  }
  text = cleanLead(text);
  title = title || meta(document, "og:title") || clean(document.querySelector("title")?.textContent || "");
  const siteName = meta(document, "og:site_name") || new URL(finalUrl).hostname.replace(/^www\./, "");
  if (text.length < 280) {
    throw fail(422, "Could not find a full article on that page. Try the canonical story link, not a homepage or a video.");
  }
  const selected = selectArticle(text);
  return {
    title: title || "Untitled",
    byline,
    siteName,
    url: finalUrl,
    text: selected.text,
    truncated: selected.truncated,
    words: selected.text.split(/\s+/).filter(Boolean).length,
  };
}

export async function extractArticle(input) {
  const { html, finalUrl } = await fetchHtml(input);
  return parseArticle(html, finalUrl);
}
