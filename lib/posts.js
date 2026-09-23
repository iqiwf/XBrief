import { xCount } from "./count.js";

const ABBR =
  /\b(?:U\.S\.|U\.K\.|a\.m\.|p\.m\.|Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.|Sr\.|Jr\.|Gen\.|Rep\.|Sen\.|Gov\.|Ltd\.|Inc\.|Co\.|vs\.|etc\.|St\.)/g;

export function splitSentences(text) {
  const hidden = String(text || "").replace(ABBR, (match) => match.replaceAll(".", "\u0001"));
  const parts = hidden.split(/(?<=[.!?])\s+(?=[A-Z0-9“"'])/);
  return parts
    .map((part) => part.replaceAll("\u0001", ".").trim())
    .filter(Boolean);
}

function breakLong(sentence, limit) {
  if (xCount(sentence) <= limit) return [sentence];
  let bits = sentence
    .split(/\s*;\s*|\s+—\s+|\s+–\s+|\s+--\s+/)
    .map((bit) => bit.trim())
    .filter(Boolean);
  if (bits.length === 1) {
    bits = sentence
      .split(/,\s+/)
      .map((bit) => bit.trim())
      .filter(Boolean);
  }
  if (bits.length <= 1) return null;
  const finer = [];
  for (const bit of bits) {
    if (xCount(bit) <= limit) {
      finer.push(bit);
      continue;
    }
    const commas = bit
      .split(/,\s+/)
      .map((part) => part.trim())
      .filter(Boolean);
    if (commas.length <= 1 || commas.some((part) => xCount(part) > limit)) return null;
    finer.push(...commas);
  }
  return finer;
}

function pack(units, limit) {
  const out = [];
  let buf = "";
  for (const unit of units) {
    const next = buf ? `${buf} ${unit}` : unit;
    if (xCount(next) <= limit) {
      buf = next;
      continue;
    }
    if (!buf || xCount(unit) > limit) return null;
    out.push(buf);
    buf = unit;
  }
  if (buf) out.push(buf);
  return out;
}

export function fitPosts(posts, limit) {
  const out = [];
  for (const post of posts) {
    const text = String(post || "").trim();
    if (!text) continue;
    if (xCount(text) <= limit) {
      out.push(text);
      continue;
    }
    const units = [];
    for (const sentence of splitSentences(text)) {
      const pieces = breakLong(sentence, limit);
      if (!pieces) return null;
      units.push(...pieces);
    }
    const packed = pack(units, limit);
    if (!packed) return null;
    out.push(...packed);
  }
  return out.length ? out : null;
}
