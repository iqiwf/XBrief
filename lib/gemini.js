import { fail } from "./errors.js";
import { LIMITS, xCount } from "./count.js";
import { fitPosts } from "./posts.js";
import { checkGrounding, stripUngrounded } from "./ground.js";

const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";

function systemPrompt(mode) {
  const limit = LIMITS[mode];
  return `You rewrite a news article into an X post or a short thread.

Voice:
- Fluent, natural, casual English, the way a sharp person actually posts.
- No press-release tone. Never open with "In a significant development", "It's worth noting", "Let's dive in", or "Here's what you need to know".
- No hashtags, no emoji, no "Thread:" label, no "Follow for more", no call to action.
- Do not add the article URL.

Accuracy, strictly:
- Use only facts that are explicit in the article.
- Do not invent, infer, round, convert, or embellish facts, quotes, numbers, dates, names, causes, reactions, or context.
- Copy numbers exactly as written (keep $ , % , and commas).
- Only quote words that appear in the article, and only name the speaker if the article does.
- If a detail is missing, leave it out. Do not guess.

Shape:
- Mode is ${mode}. Each post must be at most ${limit} on X's weighted count: most letters are 1, CJK characters and emoji are 2, and a URL is 23.
- Aim about 15 characters under the limit so nothing overflows.
- Prefer ONE post when the important facts fit naturally and still sound like a person, not a crammed list.
- If they do not fit, write a thread. Split only at sentence or clause boundaries. Never stop mid-sentence or mid-word.
- Each post must read as a complete thought. The first post stands alone. Later posts continue without repeating the opening.
- For 2 or more posts, start each post with "n/N " (example: "2/4 "). That prefix counts toward the limit.
- ${mode === "premium" ? "Premium room is large. Stay concise anyway. One post is usually right. Do not pad." : "Standard room is tight. A thread of a few posts is better than one breathless post."}
- Usually 1 to ${mode === "premium" ? "2" : "6"} posts. Never more than ${mode === "premium" ? "4" : "10"}.

Return JSON only: {"posts":["..."]}`;
}

function userPrompt(article, issues) {
  const note = article.truncated
    ? "\nSome paragraphs were omitted. A line that says [...] is a gap, not part of the story. Do not invent the missing text, and do not write [...]. The ending that is present is the ending.\n"
    : "";
  const repair = issues?.length
    ? `\nYour previous draft included items that are NOT in the article. Remove them. Do not replace them with new details.\nNot in the source:\n${issues
        .map((issue) => `- ${issue.type}: ${issue.value}`)
        .join("\n")}\n`
    : "";
  return `Source: ${article.siteName}
Title: ${article.title}
${article.byline ? `Byline: ${article.byline}\n` : ""}${note}${repair}
Article:
${article.text}`;
}

function schema() {
  return {
    type: "object",
    properties: {
      posts: {
        type: "array",
        minItems: 1,
        maxItems: 10,
        items: { type: "string" },
      },
    },
    required: ["posts"],
  };
}

const MAX_TRANSIENT_RETRIES = 2;
const MAX_GEMINI_CALLS = 3;

export function geminiKind(status, body) {
  const error = body?.error || {};
  const message = String(error.message || "");
  const statusText = String(error.status || "");
  const reasons = (Array.isArray(error.details) ? error.details : [])
    .map((detail) => `${detail?.reason || ""}`)
    .join(" ");
  const blob = `${statusText} ${reasons} ${message}`.toLowerCase();
  if (status === 401 || status === 403 || /unauthenticated|permission_denied|api key/.test(blob)) return "auth";
  if (status === 400) return /thinking/.test(message) ? "thinking" : "permanent";
  if (/quota_exceeded|exceeded your current quota|daily quota|per day|billing|check your plan/.test(blob)) return "quota";
  if (status === 429 || /rate_limit|rate limit|too many requests|too_many_requests|resource_exhausted/.test(blob)) return "rate";
  if (status === 500 || status === 502 || status === 503 || status === 504) return "transient";
  return "permanent";
}

function providerDetail(status, message, apiKey) {
  let text = String(message || `Gemini returned ${status}.`);
  if (apiKey) text = text.replaceAll(String(apiKey), "[redacted]");
  return text.replace(/AIza[0-9A-Za-z_-]{10,}/g, "[redacted]").replace(/\s+/g, " ").slice(0, 180);
}

export function retryDelayMs(response, attempt) {
  const header = response?.headers?.get?.("retry-after");
  if (header) {
    const seconds = Number(header);
    if (Number.isFinite(seconds) && seconds >= 0) return Math.min(Math.round(seconds * 1000), 4_000);
    const when = Date.parse(header);
    if (Number.isFinite(when)) return Math.min(Math.max(0, when - Date.now()), 4_000);
  }
  return Math.min(1_000 * 2 ** attempt, 4_000) + Math.floor(Math.random() * 250);
}

function retryAfterSeconds(response) {
  const header = response?.headers?.get?.("retry-after");
  if (!header) return null;
  const seconds = Number(header);
  if (Number.isFinite(seconds) && seconds >= 0) return seconds;
  const when = Date.parse(header);
  if (!Number.isFinite(when)) return null;
  return Math.max(0, Math.round((when - Date.now()) / 1000));
}

function throwGemini(kind, response) {
  if (kind === "auth") throw fail(502, "Gemini rejected the API key.");
  if (kind === "quota") throw fail(429, "Gemini's daily quota is used up. Try again tomorrow.");
  if (kind === "rate") {
    const seconds = retryAfterSeconds(response);
    if (seconds >= 1 && seconds <= 3600) {
      throw fail(429, `Gemini is rate-limiting. Try again in ${Math.ceil(seconds)} seconds.`);
    }
    throw fail(429, "Gemini is rate-limiting. Wait a moment and try again.");
  }
  if (kind === "transient") throw fail(503, "Gemini is busy right now. Try again in a moment.");
  throw fail(502, "Gemini could not write the post. Try again.");
}

function readPosts(body) {
  const block = body?.promptFeedback?.blockReason;
  if (block) throw fail(422, "Gemini declined to rewrite this article.");
  const parts = body?.candidates?.[0]?.content?.parts || [];
  const text = parts
    .filter((part) => part?.text && !part.thought)
    .map((part) => part.text)
    .join("");
  let parsed;
  try {
    parsed = JSON.parse(text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, ""));
  } catch {
    throw fail(502, "Gemini returned something that was not a post. Try again.");
  }
  const posts = Array.isArray(parsed?.posts) ? parsed.posts.map((post) => String(post).trim()).filter(Boolean) : [];
  if (!posts.length) throw fail(502, "Gemini returned an empty draft. Try again.");
  return posts;
}

function requestBody(mode, article, issues, thinking) {
  const generationConfig = {
    responseMimeType: "application/json",
    responseSchema: schema(),
    maxOutputTokens: 4096,
  };
  if (thinking) generationConfig.thinkingConfig = { thinkingLevel: "LOW" };
  return {
    systemInstruction: { parts: [{ text: systemPrompt(mode) }] },
    contents: [{ role: "user", parts: [{ text: userPrompt(article, issues) }] }],
    generationConfig,
  };
}

async function complete(apiKey, model, mode, article, issues, budget) {
  let thinking = true;
  let transient = 0;
  let last = { kind: "transient", response: null };
  while (true) {
    if (budget.used >= budget.max) throwGemini(last.kind, last.response);
    budget.used += 1;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20_000);
    let response;
    try {
      response = await fetch(`${ENDPOINT}/${encodeURIComponent(model)}:generateContent`, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "content-type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify(requestBody(mode, article, issues, thinking)),
      });
    } catch (error) {
      if (error?.name === "AbortError") throw fail(504, "Gemini took too long. Try again.");
      console.error(`[gemini] network ${error?.name || "Error"} ${error?.message || ""}`);
      throw fail(502, "Could not reach Gemini.");
    } finally {
      clearTimeout(timer);
    }

    const body = await response.json().catch(() => null);
    if (response.ok) return readPosts(body);
    const kind = geminiKind(response.status, body);
    const message = body?.error?.message || "";
    console.error(`[gemini] ${response.status} ${kind} ${body?.error?.status || ""} ${providerDetail(response.status, message, apiKey)}`);
    last = { kind, response };
    if (kind === "thinking" && thinking) {
      thinking = false;
      continue;
    }
    if (kind !== "rate" && kind !== "transient") throwGemini(kind, response);
    if (transient >= MAX_TRANSIENT_RETRIES) throwGemini(kind, response);
    const delay = retryDelayMs(response, transient);
    transient += 1;
    if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

function numberThread(posts) {
  if (posts.length < 2) {
    return posts.map((post) => post.replace(/^\d{1,2}\/\d{1,2}\s+/, ""));
  }
  const total = posts.length;
  return posts.map((post, index) => {
    const body = post.replace(/^\d{1,2}\/\d{1,2}\s+/, "");
    return `${index + 1}/${total} ${body}`;
  });
}

export async function writePosts({ apiKey, model, mode, article }) {
  const limit = LIMITS[mode];
  if (!limit) throw fail(400, "Pick Standard or Premium.");
  const budget = { used: 0, max: MAX_GEMINI_CALLS };
  let repaired = false;
  const repair = (issues) => {
    if (repaired || budget.used >= budget.max) return null;
    repaired = true;
    return complete(apiKey, model, mode, article, issues, budget);
  };
  let draft = await complete(apiKey, model, mode, article, null, budget);
  let grounded = checkGrounding(draft, article.text);
  if (!grounded.ok) {
    const revised = await repair(grounded.issues);
    if (revised) {
      draft = revised;
      grounded = checkGrounding(draft, article.text);
    }
  }
  let dropped = 0;
  if (!grounded.ok) {
    const stripped = stripUngrounded(draft, article.text);
    draft = stripped.posts;
    dropped = stripped.removed;
  }
  if (!draft.length) {
    throw fail(422, "The draft kept adding details that are not in the article. Try again.");
  }
  let fitted = fitPosts(draft, limit);
  if (!fitted) {
    const revised = await repair([
      { type: "length", value: `Every post must be a complete sentence under ${limit} characters.` },
    ]);
    if (revised) {
      draft = revised;
      const again = checkGrounding(draft, article.text);
      if (!again.ok) {
        const stripped = stripUngrounded(draft, article.text);
        draft = stripped.posts;
        dropped += stripped.removed;
      }
      fitted = draft.length ? fitPosts(draft, limit) : null;
    }
  }
  if (!fitted) {
    throw fail(422, "A sentence was too long to fit without chopping it. Try Premium, or regenerate.");
  }
  const numbered = numberThread(fitted);
  if (numbered.some((post) => xCount(post) > limit)) {
    const refit = fitPosts(
      numbered.map((post) => post.replace(/^\d{1,2}\/\d{1,2}\s+/, "")),
      limit - 6,
    );
    if (!refit) throw fail(422, "Could not fit the thread without cutting a sentence. Try again.");
    const finalPosts = numberThread(refit);
    if (finalPosts.some((post) => xCount(post) > limit)) {
      throw fail(422, "Could not fit the thread without cutting a sentence. Try again.");
    }
    return { posts: shape(finalPosts), dropped };
  }
  return { posts: shape(numbered), dropped };
}

function shape(posts) {
  return posts.map((text) => ({ text, chars: xCount(text) }));
}
