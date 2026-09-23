import { splitSentences } from "./posts.js";

const STOP = new Set(
  `a,an,the,and,or,but,if,so,as,at,by,for,from,in,into,of,on,off,onto,out,over,to,up,with,without,within,about,after,before,between,during,since,until,while,when,where,who,whom,whose,what,why,how,this,that,these,those,it,its,he,she,they,them,we,you,his,her,their,our,your,not,no,nor,yes,than,then,also,just,only,more,most,some,any,all,many,much,few,both,each,other,such,own,same,very,can,could,may,might,must,shall,should,will,would,do,did,does,is,are,was,were,be,been,being,have,has,had,having,said,says,say,according,however,still,already,now,here,there,which,because,though,although,across,against,through,under,again,even,ever,never,always,often,once,meanwhile,overall,notably,importantly,ultimately,recently,reportedly,apparently,suddenly,currently,then,later,earlier,afterward,afterwards`.split(
    ",",
  ),
);

const CALENDAR = new Set(
  `monday,tuesday,wednesday,thursday,friday,saturday,sunday,january,february,march,april,june,july,august,september,october,november,december`.split(
    ",",
  ),
);

function norm(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function escapeReg(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasWord(sourceNorm, word) {
  const re = new RegExp(`(?:^|[^a-z0-9])${escapeReg(word)}(?:[^a-z0-9]|$)`);
  return re.test(sourceNorm);
}

function numberSig(raw) {
  return {
    raw,
    bare: raw.replace(/[$,%]/g, "").replace(/,/g, ""),
    money: raw.startsWith("$"),
    percent: raw.endsWith("%"),
  };
}

function sourceHasNumber(sig, sourceNumbers, sourceNorm) {
  if (
    sourceNumbers.some(
      (item) => item.bare === sig.bare && item.money === sig.money && item.percent === sig.percent,
    )
  ) {
    return true;
  }
  if (!sig.percent && !sig.money) return false;
  if (sig.percent) {
    return new RegExp(`(?:^|[^a-z0-9])${escapeReg(sig.bare)}\\s*(?:%|percent|per cent)\\b`).test(
      sourceNorm,
    );
  }
  return new RegExp(`(?:\\$|usd\\s*|us\\$\\s*)${escapeReg(sig.bare)}\\b`).test(sourceNorm);
}

function acronymsIn(source) {
  const set = new Set();
  for (const match of source.matchAll(/\b[A-Z]{2,6}\b/g)) set.add(match[0]);
  for (const match of source.matchAll(/\b(?:[A-Z]\.){2,}/g)) {
    set.add(match[0].replace(/\./g, ""));
  }
  return set;
}

export function checkGrounding(posts, source) {
  const text = posts.join("\n");
  const numberText = posts.map((post) => post.replace(/^\d{1,2}\/\d{1,2}\s+/, "")).join("\n");
  const sourceNorm = norm(source);
  const sourceNumbers = [...String(source).matchAll(/\$?\d[\d,]*(?:\.\d+)?%?/g)].map((match) =>
    numberSig(match[0]),
  );
  const knownAcronyms = acronymsIn(String(source));
  const issues = [];
  const seen = new Set();
  const add = (type, value) => {
    const key = `${type}:${value.toLowerCase()}`;
    if (seen.has(key)) return;
    seen.add(key);
    issues.push({ type, value });
  };

  for (const match of numberText.matchAll(/\$?\d[\d,]*(?:\.\d+)?%?/g)) {
    const sig = numberSig(match[0]);
    if (!sourceHasNumber(sig, sourceNumbers, sourceNorm)) add("number", match[0]);
  }

  for (const match of text.matchAll(/["“]([^"”]{12,}?)["”]/g)) {
    if (!sourceNorm.includes(norm(match[1]))) add("quote", match[1]);
  }

  for (const match of text.matchAll(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+\b/g)) {
    if (!hasWord(sourceNorm, norm(match[0]))) add("name", match[0]);
  }

  for (const match of text.matchAll(/\b[A-Z][a-z][A-Za-z'-]{1,}\b/g)) {
    const word = match[0];
    const lower = word.toLowerCase();
    if (CALENDAR.has(lower)) {
      if (!hasWord(sourceNorm, lower)) add("date", word);
      continue;
    }
    if (STOP.has(lower)) continue;
    const at = match.index ?? 0;
    const before = text.slice(Math.max(0, at - 2), at);
    const sentenceStart = at === 0 || /[.!?]\s$/.test(before) || before.endsWith("\n");
    if (sentenceStart) continue;
    if (!hasWord(sourceNorm, lower)) add("name", word);
  }

  for (const match of text.matchAll(/\b[A-Z]{2,6}\b/g)) {
    if (match[0] === "OK") continue;
    if (!knownAcronyms.has(match[0])) add("name", match[0]);
  }

  return { ok: issues.length === 0, issues };
}

export function stripUngrounded(posts, source) {
  const kept = [];
  let removed = 0;
  for (const post of posts) {
    const safe = [];
    for (const sentence of splitSentences(post)) {
      if (checkGrounding([sentence], source).ok) safe.push(sentence);
      else removed += 1;
    }
    if (safe.length) kept.push(safe.join(" "));
  }
  return { posts: kept, removed };
}
