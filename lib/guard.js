import { fail } from "./errors.js";

export function createGuard({ limit = 8, windowMs = 10 * 60 * 1000, maxActive = 1 } = {}) {
  let active = 0;
  const hits = new Map();

  return {
    enter(ip) {
      const now = Date.now();
      const key = String(ip || "unknown");
      const recent = (hits.get(key) || []).filter((time) => now - time < windowMs);
      if (recent.length >= limit) {
        hits.set(key, recent);
        throw fail(429, "Too many drafts from this network. Wait a few minutes and try again.");
      }
      if (active >= maxActive) {
        throw fail(429, "The writer is busy. Try again in a moment.");
      }
      recent.push(now);
      hits.set(key, recent);
      if (hits.size > 5000) {
        for (const [name, times] of hits) {
          if (times.every((time) => now - time >= windowMs)) hits.delete(name);
        }
      }
      active += 1;
      let released = false;
      return () => {
        if (released) return;
        released = true;
        active = Math.max(0, active - 1);
      };
    },
  };
}

export const guard = createGuard();

export function clientIp(req) {
  const headers = req.headers || {};
  const real = headers["x-real-ip"];
  if (real) return String(Array.isArray(real) ? real[0] : real).split(",")[0].trim();
  const forwarded = headers["x-forwarded-for"];
  if (forwarded) return String(Array.isArray(forwarded) ? forwarded[0] : forwarded).split(",")[0].trim();
  return req.socket?.remoteAddress || "local";
}
