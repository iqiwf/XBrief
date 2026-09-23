import { Readability } from "@mozilla/readability";
import { parseHTML } from "linkedom";
import { fetch as pinnedFetch } from "undici";
import { fail } from "./errors.js";
import { selectArticle } from "./select.js";
import { describeFailure, dispatcherFor, resolvePublic } from "./ssrf.js";

const MIN_ARTICLE = 200;
const MAX_BYTES = 3_000_000;
const MAX_REDIRECTS = 3;
const TIMEOUT_MS = 8_000;
const FETCH_BUDGET_MS = 20_000;

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

function isHtml(contentType, buffer) {
  if (/text\/html|application\/xhtml\+xml/i.test(contentType || "")) return true;
  const start = buffer.subarray(0, 400).toString("utf8").trimStart().toLowerCase();
  return start.startsWith("<!doctype html") || start.startsWith("<html") || start.includes("<head");
}

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

function logFetchError(url, addresses, error) {
  const via = addresses?.length ? ` via ${addresses.join(",")}` : "";
  console.error(`[fetch] ${url}${via} failed: ${describeFailure(error)}`);
}

async function closeAgent(agent) {
  try {
    await agent.close();
  } catch (error) {
    console.error(`[fetch] closing dispatcher failed: ${describeFailure(error)}`);
  }
}

async function fetchHtml(start) {
  const deadline = Date.now() + FETCH_BUDGET_MS;
  let current = start;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    const remaining = deadline - Date.now();
    if (remaining < 1_000) throw fail(504, "The site took too long to respond.");
    const pinned = await resolvePublic(current);
    current = pinned.url;
    const agent = dispatcherFor(pinned.addresses);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), Math.min(TIMEOUT_MS, remaining));
    let closed = false;
    const finish = async () => {
      clearTimeout(timer);
      if (closed) return;
      closed = true;
      await closeAgent(agent);
    };
    let response;
    try {
      // Node's built-in fetch rejects an Agent from the installed undici.
      response = await pinnedFetch(current, {
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
      await finish();
      logFetchError(current.href, pinned.addresses, error);
      if (error?.name === "AbortError" || error?.name === "TimeoutError") {
        throw fail(504, "The site took too long to respond.");
      }
      throw fail(502, "Could not open that page. It may be down or blocking fetches.");
    }


    if (response.status >= 300 && response.status < 400) {
      await response.body?.cancel();
      const next = response.headers.get("location");
      await finish();
      if (!next) throw fail(502, "The site redirected without a destination.");
      current = new URL(next, current);
      continue;
    }
    if (response.status === 429 || response.status === 503) {
      await response.body?.cancel();
      await finish();
      throw fail(422, "The site is busy or blocking automated access. Try again later.");
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
    if (type && !/text\/html|application\/xhtml\+xml|text\/plain|application\/octet-stream/i.test(type)) {
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
      if (!isHtml(type, buffer)) throw fail(422, "That link is not an HTML article.");
      return { html: decode(buffer, type), finalUrl: current.href };
    } catch (error) {
      if (!error?.expose) logFetchError(current.href, pinned.addresses, error);
      if (error?.expose) throw error;
      throw fail(502, "Could not open that page. It may be down or blocking fetches.");
    } finally {
      await finish();
    }
  }
  throw fail(502, "Too many redirects.");
}

const CHROME = "script,style,noscript,nav,footer,aside,form,iframe,svg,[role='navigation'],[role='banner'],[role='contentinfo'],[aria-hidden='true'],[class*='related'],[id*='related'],[class*='newsletter'],[class*='recommend'],[class*='outbrain'],[class*='taboola']";
const BLOCKED_PAGE = /just a moment|verify you are human|enable javascript|access denied|captcha|sign in to continue|subscribe to read|already a subscriber/i;

function meta(document, key) {
  const node =
    document.querySelector(`meta[property="${key}"]`) ||
    document.querySelector(`meta[name="${key}"]`);
  return node?.getAttribute("content")?.trim() || "";
}

function textValue(value) {
  if (Array.isArray(value)) return value.map(textValue).filter(Boolean).join("\n\n");
  if (typeof value === "string") return value.trim();
  return "";
}

function plainText(value) {
  const text = textValue(value);
  if (!text) return "";
  if (!/</.test(text)) return text;
  const { document } = parseHTML(`<div>${text}</div>`);
  return bodyFrom(document.querySelector("div"));
}

function jsonLdText(document) {
  let best = "";
  for (const node of document.querySelectorAll("script[type='application/ld+json']")) {
    let data;
    try {
      data = JSON.parse(node.textContent || "");
    } catch {
      continue;
    }
    const items = Array.isArray(data) ? data : [data, ...(data?.["@graph"] || [])];
    for (const item of items) {
      const type = String(item?.["@type"] || "");
      if (!/Article|NewsArticle|ReportageNewsArticle|BlogPosting|AnalysisNewsArticle/i.test(type)) continue;
      const body = plainText(item.articleBody || item.text || "");
      if (body.length > best.length) best = body;
    }
  }
  return best;
}

function ownBlocks(root) {
  const blocks = [];
  for (const node of root.querySelectorAll("div, span, li, h2, h3, blockquote")) {
    const own = [...node.childNodes]
      .filter((child) => child.nodeType === 3)
      .map((child) => child.textContent.replace(/\s+/g, " ").trim())
      .join(" ")
      .trim();
    if (own.length >= 80) blocks.push(own);
  }
  return blocks.length >= 2 ? blocks.join("\n\n") : "";
}

function bodyFrom(root) {
  if (!root) return "";
  root.querySelectorAll(CHROME).forEach((node) => node.remove());
  const blocks = [...root.querySelectorAll("p, h2, h3, blockquote")];
  if (blocks.length >= 2) return blocks.map((node) => node.textContent).join("\n\n");
  return ownBlocks(root) || root.textContent || "";
}

function fallbackText(document) {
  const roots = [
    document.querySelector("[itemprop='articleBody']"),
    document.querySelector("article"),
    document.querySelector("[role='article']"),
    document.querySelector("[role='main']"),
    document.querySelector("main"),
  ].filter(Boolean);
  let best = "";
  for (const root of roots) {
    const text = bodyFrom(root.cloneNode(true));
    if (text.length > best.length) best = text;
  }
  return best;
}

function densityText(document) {
  const root = document.body?.cloneNode(true);
  if (!root) return "";
  root.querySelectorAll(`${CHROME},header`).forEach((node) => node.remove());
  const scored = [];
  for (const node of root.querySelectorAll("article, main, section, div")) {
    const text = bodyFrom(node.cloneNode(true));
    if (text.length < MIN_ARTICLE) continue;
    const linkLength = [...node.querySelectorAll("a")].reduce((sum, anchor) => sum + (anchor.textContent || "").length, 0);
    if (linkLength > text.length * 0.45) continue;
    scored.push(text);
  }
  if (!scored.length) return "";
  const longest = scored.reduce((best, text) => (text.length > best.length ? text : best));
  return scored.filter((text) => text.length >= longest.length * 0.8).sort((a, b) => a.length - b.length)[0];
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
  while (parts.length && parts[0].length < 40 && !/[.!?]/.test(parts[0])) parts.shift();
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

function prose(value) {
  return (String(value).match(/[.!?](?:\s|$)/g) || []).length >= 2;
}

function chooseArticle(readable, linked, structural) {
  const longest = [readable, structural].sort((a, b) => b.length - a.length)[0] || "";
  if (linked.length >= MIN_ARTICLE && prose(linked)) {
    if (linked.length >= longest.length * 0.55) return linked;
    const sample = linked.slice(0, 80).toLowerCase();
    if (sample && longest.toLowerCase().includes(sample.slice(0, 40))) return longest;
    return linked;
  }
  return longest;
}

function clean(text) {
  return String(text || "")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\bhide caption\b/gi, "")
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
  const fresh = parseHTML(html).document;
  const readable = cleanLead(clean(paragraphs(parsed?.content) || parsed?.textContent || ""));
  const linked = cleanLead(clean(jsonLdText(fresh)));
  const structural = cleanLead(clean(fallbackText(fresh)));
  let text = chooseArticle(readable, linked, structural);
  if (text.length < MIN_ARTICLE) text = cleanLead(clean(densityText(fresh)));
  let title = clean(parsed?.title || "");
  let byline = clean(parsed?.byline || "");
  title = title || meta(fresh, "og:title") || clean(fresh.querySelector("h1")?.textContent || "") || clean(fresh.querySelector("title")?.textContent || "");
  const siteName = meta(fresh, "og:site_name") || new URL(finalUrl).hostname.replace(/^www\./, "");
  const pageText = `${title}\n${clean(fresh.body?.textContent || "")}`;
  if (text.length < MIN_ARTICLE && BLOCKED_PAGE.test(pageText.slice(0, 1500))) {
    throw fail(422, "The site blocked the fetch or requires a login. Open the article in a browser and try the story link.");
  }
  if (text.length < MIN_ARTICLE) {
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
