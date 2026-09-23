import { splitSentences } from "./posts.js";

const BUDGET = 24_000;

function unitsOf(text, budget) {
  const paragraphs = text.split(/\n\n/).map((part) => part.trim()).filter(Boolean);
  const base = paragraphs.length >= 4 ? paragraphs : splitSentences(text);
  const pieces = [];
  for (const part of base.length ? base : paragraphs) {
    if (part.length > budget * 0.5) pieces.push(...splitSentences(part));
    else pieces.push(part);
  }
  return pieces.filter(Boolean);
}

function takeFromStart(units, budget) {
  const picked = [];
  let used = 0;
  for (let index = 0; index < units.length; index += 1) {
    const next = used + units[index].length + (picked.length ? 2 : 0);
    if (next > budget) break;
    picked.push(index);
    used = next;
  }
  return picked;
}

function takeFromEnd(units, budget, earliest) {
  const picked = [];
  let used = 0;
  for (let index = units.length - 1; index >= earliest; index -= 1) {
    const next = used + units[index].length + (picked.length ? 2 : 0);
    if (next > budget) break;
    picked.push(index);
    used = next;
  }
  return picked.reverse();
}

function score(text) {
  return (/\d/.test(text) ? 2 : 0) + (/["“”]/.test(text) ? 2 : 0);
}

export function selectArticle(text, budget = BUDGET) {
  const source = String(text || "").trim();
  if (source.length <= budget) return { text: source, truncated: false };
  const units = unitsOf(source, budget);
  if (units.length < 2) {
    const cut = source.lastIndexOf(" ", budget);
    return { text: source.slice(0, cut > 200 ? cut : budget).trim(), truncated: true };
  }

  const headBudget = Math.floor(budget * 0.55);
  const tailBudget = Math.floor(budget * 0.25);
  const head = takeFromStart(units, headBudget);
  const afterHead = head.length ? head[head.length - 1] + 1 : 0;
  let tail = takeFromEnd(units, tailBudget, afterHead);
  if (!tail.length && units[units.length - 1].length <= budget * 0.4 && units.length - 1 >= afterHead) {
    tail = [units.length - 1];
  }
  const used = new Set([...head, ...tail]);
  const middleBudget = budget - [...used].reduce((sum, index) => sum + units[index].length, 0) - 40;
  const middle = [];
  let middleUsed = 0;
  const ranked = units
    .map((unit, index) => ({ index, score: score(unit) }))
    .filter((item) => item.score > 0 && !used.has(item.index) && item.index >= afterHead)
    .sort((a, b) => b.score - a.score || a.index - b.index);
  for (const item of ranked) {
    const next = middleUsed + units[item.index].length + 2;
    if (next > middleBudget) continue;
    middle.push(item.index);
    middleUsed = next;
  }

  const chosen = [...head, ...middle, ...tail].sort((a, b) => a - b);
  if (!chosen.length) {
    const cut = source.lastIndexOf(" ", budget);
    return { text: source.slice(0, cut > 200 ? cut : budget).trim(), truncated: true };
  }
  const parts = [];
  let previous = -1;
  for (const index of chosen) {
    if (previous !== -1 && index !== previous + 1) parts.push("[...]");
    parts.push(units[index]);
    previous = index;
  }
  if (chosen.length && chosen[chosen.length - 1] !== units.length - 1 && !parts.includes("[...]")) {
    parts.push("[...]");
  }
  return { text: parts.join("\n\n").trim(), truncated: true };
}
