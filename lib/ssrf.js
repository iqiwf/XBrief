import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { fail } from "./errors.js";

export function isPrivateIp(ip) {
  let value = String(ip || "").toLowerCase().replace(/^\[|\]$/g, "");
  if (value.startsWith("::ffff:")) value = value.slice(7);
  if (value.includes(":")) {
    if (value === "::" || value === "::1") return true;
    if (value.startsWith("fe80:")) return true;
    if (value.startsWith("fc") || value.startsWith("fd")) return true;
    return false;
  }
  if (!isIP(value)) return true;
  const parts = value.split(".").map(Number);
  if (parts.length !== 4 || parts.some((n) => n < 0 || n > 255)) return true;
  const [a, b] = parts;
  if (a === 0 || a === 10 || a === 127) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 100 && b >= 64 && b <= 127) return true;
  if (a === 192 && b === 0) return true;
  if (a >= 224) return true;
  return false;
}

export function validateUrlShape(input) {
  let url;
  try {
    url = input instanceof URL ? new URL(input.href) : new URL(String(input));
  } catch {
    throw fail(400, "Enter a full article URL, including https://.");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw fail(400, "Only http and https links work.");
  }
  if (url.username || url.password) throw fail(400, "That URL is not allowed.");
  const hostname = url.hostname.replace(/\.$/, "").toLowerCase();
  if (!hostname) throw fail(400, "That URL is not allowed.");
  if (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal")
  ) {
    throw fail(400, "That URL is not allowed.");
  }
  if (/^(?:\d+|0x[0-9a-f]+)$/i.test(hostname)) throw fail(400, "That URL is not allowed.");
  if (/^[\d.]+$/.test(hostname) && !isIP(hostname)) throw fail(400, "That URL is not allowed.");
  if (!hostname.includes(".") && !isIP(hostname)) throw fail(400, "That URL is not allowed.");
  if (isIP(hostname) && isPrivateIp(hostname)) throw fail(400, "That URL is not allowed.");
  return url;
}

export async function assertPublicHttpUrl(input) {
  const url = validateUrlShape(input);
  const hostname = url.hostname.replace(/\.$/, "").toLowerCase();
  if (isIP(hostname)) return url;
  let records;
  try {
    records = await lookup(hostname, { all: true, verbatim: true });
  } catch {
    throw fail(422, "Could not find that site. Check the link and try again.");
  }
  if (!records.length || records.some((record) => isPrivateIp(record.address))) {
    throw fail(400, "That URL is not allowed.");
  }
  return url;
}
