import { lookup, resolve4, resolve6 } from "node:dns/promises";
import { isIP } from "node:net";
import { Agent } from "undici";
import { fail } from "./errors.js";

const BLOCKED_HOSTS = new Set([
  "metadata.google.internal",
  "metadata.google.com",
  "metadata",
  "instance-data",
  "kubernetes",
  "kubernetes.default",
  "kubernetes.default.svc",
]);

const DNS_TIMEOUT_MS = 4_000;
const PER_FAMILY = 4;
const SOFT_DNS = new Set([
  "ENOTFOUND",
  "ENODATA",
  "ESERVFAIL",
  "EREFUSED",
  "EFORMERR",
  "EBADNAME",
  "EBADRESP",
  "ENONAME",
]);

export function describeFailure(error) {
  const lines = [];
  const seen = new Set();
  let current = error;
  while (current && typeof current === "object" && !seen.has(current) && lines.length < 8) {
    seen.add(current);
    const code = current.code ? ` ${current.code}` : "";
    lines.push(`${current.name || "Error"}${code}: ${current.message || ""}`);
    if (Array.isArray(current.errors)) {
      for (const item of current.errors) {
        if (lines.length >= 8) break;
        const itemCode = item?.code ? ` ${item.code}` : "";
        lines.push(`caused by ${item?.name || "Error"}${itemCode}: ${item?.message || ""}`);
      }
    }
    current = current.cause;
  }
  return lines.join(" | ") || "unknown error";
}

export function failureCode(error) {
  const seen = new Set();
  let current = error;
  while (current && typeof current === "object" && !seen.has(current)) {
    seen.add(current);
    if (current.code && current.code !== 20 && current.code !== "ABORT_ERR") return String(current.code);
    if (Array.isArray(current.errors)) {
      const coded = current.errors.find((item) => item?.code && item.code !== 20);
      if (coded) return String(coded.code);
    }
    current = current.cause;
  }
  return error?.name || "Error";
}

function ipv6Hextets(ip) {
  let value = ip;
  if (value.includes(".")) {
    const colon = value.lastIndexOf(":");
    const parts = value.slice(colon + 1).split(".").map(Number);
    if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return null;
    const hi = ((parts[0] << 8) | parts[1]).toString(16);
    const lo = ((parts[2] << 8) | parts[3]).toString(16);
    value = `${value.slice(0, colon)}:${hi}:${lo}`;
  }
  const halves = value.split("::");
  if (halves.length > 2) return null;
  const left = halves[0] ? halves[0].split(":") : [];
  const right = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  if (halves.length === 1) {
    if (left.length !== 8) return null;
    return left.map((part) => Number.parseInt(part || "0", 16));
  }
  const missing = 8 - left.length - right.length;
  if (missing < 0) return null;
  return [...left, ...Array(missing).fill("0"), ...right].map((part) => Number.parseInt(part || "0", 16));
}

function isReservedIpv6(value) {
  const hextets = ipv6Hextets(value);
  if (!hextets || hextets.length !== 8 || hextets.some((part) => !Number.isFinite(part) || part < 0 || part > 0xffff)) {
    return true;
  }
  const [a, b, c, d, e, f] = hextets;
  if (a === 0x64 && b === 0xff9b && ((c === 0 && d === 0 && e === 0 && f === 0) || c === 1)) return true;
  if (a === 0x100 && b === 0 && c === 0 && d === 0) return true;
  if (a === 0x2001 && (b === 0xdb8 || b === 0x2)) return true;
  return false;
}

export function isPrivateIp(ip) {
  let value = String(ip || "").toLowerCase().replace(/^\[|\]$/g, "").split("%")[0];
  if (value.startsWith("::ffff:")) value = value.slice(7);
  if (value === "0.0.0.0" || value === "255.255.255.255" || value === "100.100.100.200") return true;
  if (value.includes(":")) {
    if (value === "::" || value === "::1") return true;
    const head = value.split(":")[0] || "0";
    const n = Number.parseInt(head, 16);
    if (!Number.isFinite(n)) return true;
    if (n >= 0xfe80 && n <= 0xfebf) return true;
    if (n >= 0xfec0 && n <= 0xfeff) return true;
    if (n >= 0xfc00 && n <= 0xfdff) return true;
    if (n >= 0xff00) return true;
    if (isReservedIpv6(value)) return true;
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
  if (a === 198 && (b === 18 || b === 19)) return true;
  if (a === 198 && b === 51 && parts[2] === 100) return true;
  if (a === 203 && b === 0 && parts[2] === 113) return true;
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
  if (!hostname || BLOCKED_HOSTS.has(hostname)) throw fail(400, "That URL is not allowed.");
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
  if (url.hostname !== hostname) url.hostname = hostname;
  return url;
}

function normalizeIp(ip) {
  let value = String(ip || "").trim().toLowerCase().replace(/^\[|\]$/g, "").split("%")[0];
  if (value.startsWith("::ffff:")) value = value.slice(7);
  return value;
}

export function orderAddresses(records) {
  const seen = new Set();
  const v4 = [];
  const v6 = [];
  for (const record of records || []) {
    const address = normalizeIp(typeof record === "string" ? record : record?.address);
    if (!address || !isIP(address) || isPrivateIp(address) || seen.has(address)) continue;
    seen.add(address);
    const bucket = address.includes(":") ? v6 : v4;
    if (bucket.length < PER_FAMILY) bucket.push({ address, family: address.includes(":") ? 6 : 4 });
  }
  // IPv4 first so a network with no IPv6 route still connects. IPv6 stays in
  // the list so a dead IPv4 address can fall over instead of failing the fetch.
  return [...v4, ...v6];
}

export function pickAddress(records) {
  return orderAddresses(records)[0] || null;
}

export function pinnedLookup(addresses) {
  const list = orderAddresses(Array.isArray(addresses) ? addresses : addresses ? [addresses] : []);
  return function lookup(_hostname, options, callback) {
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    const requested = options?.family === 4 || options?.family === 6 ? list.filter((item) => item.family === options.family) : list;
    if (!requested.length) {
      const error = new Error("No public address");
      error.code = "EBADADDR";
      callback(error);
      return;
    }
    if (options?.all) callback(null, requested.map((item) => ({ address: item.address, family: item.family })));
    else callback(null, requested[0].address, requested[0].family);
  };
}

export function dispatcherFor(addresses) {
  return new Agent({
    // HTTP/2 streams fail on some CDNs (ERR_HTTP2_STREAM_ERROR). One request
    // per page does not need multiplexing, and HTTP/1.1 works for those sites.
    allowH2: false,
    connect: {
      timeout: 10_000,
      autoSelectFamily: true,
      autoSelectFamilyAttemptTimeout: 300,
      lookup: pinnedLookup(addresses),
    },
  });
}

function timed(promise, ms, label) {
  let timer;
  const guarded = Promise.resolve(promise).then(
    (value) => ({ ok: true, value }),
    (error) => ({ ok: false, error }),
  );
  const timeout = new Promise((resolve) => {
    timer = setTimeout(() => {
      const error = new Error(`${label} timed out`);
      error.code = "ETIMEOUT";
      resolve({ ok: false, error });
    }, ms);
  });
  return Promise.race([guarded, timeout]).finally(() => clearTimeout(timer));
}

async function resolveFamily(hostname, family) {
  const query = family === 4 ? resolve4(hostname) : resolve6(hostname);
  const result = await timed(query, DNS_TIMEOUT_MS, family === 4 ? "A" : "AAAA");
  if (result.ok) return { records: result.value.map((address) => ({ address, family })), error: null };
  if (SOFT_DNS.has(result.error?.code)) return { records: [], error: null };
  return { records: [], error: result.error };
}

export async function resolvePublic(input) {
  const url = validateUrlShape(input);
  const hostname = url.hostname.replace(/\.$/, "").toLowerCase();
  if (isIP(hostname)) return { url, addresses: [normalizeIp(hostname)] };

  const [v4, v6] = await Promise.all([resolveFamily(hostname, 4), resolveFamily(hostname, 6)]);
  let records = [...v4.records, ...v6.records];
  const failures = [v4.error, v6.error].filter(Boolean);
  if (!records.length) {
    const looked = await timed(lookup(hostname, { all: true, verbatim: true }), DNS_TIMEOUT_MS, "lookup");
    if (looked.ok) records = looked.value || [];
    else if (looked.error && !SOFT_DNS.has(looked.error.code)) failures.push(looked.error);
  }

  const addresses = orderAddresses(records).map((item) => item.address);
  if (!addresses.length) {
    if (records.length) {
      console.error(`[fetch] dns ${hostname} resolved only to non-public addresses`);
      throw fail(400, "That URL is not allowed.");
    }
    const detail = failures.length ? describeFailure(failures[0]) : "no public records";
    console.error(`[fetch] dns ${hostname} failed: ${detail}`);
    throw fail(422, "Could not find that site. Check the link and try again.");
  }
  return { url, addresses };
}
