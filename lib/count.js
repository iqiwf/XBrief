export const LIMITS = {
  standard: 280,
  premium: 25000,
};

export function xCount(text) {
  const value = String(text ?? "");
  const re = /https?:\/\/[^\s<>"']+/gi;
  let without = "";
  let last = 0;
  let urls = 0;
  for (const match of value.matchAll(re)) {
    const raw = match[0];
    const trail = raw.match(/[.,!?;:]+$/);
    without += value.slice(last, match.index);
    if (trail) without += trail[0];
    urls += 1;
    last = match.index + raw.length;
  }
  without += value.slice(last);
  return [...without].length + urls * 23;
}
