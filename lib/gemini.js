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

async function generate(apiKey, model, mode, article, issues) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45_000);
  let response;
  try {
    response = await fetch(`${ENDPOINT}/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "content-type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt(mode) }] },
        contents: [{ role: "user", parts: [{ text: userPrompt(article, issues) }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: schema(),
          maxOutputTokens: 4096,
          thinkingConfig: { thinkingLevel: "LOW" },
        },
      }),
    });
  } catch (error) {
    if (error?.name === "AbortError") throw fail(504, "Gemini took too long. Try again.");
    throw fail(502, "Could not reach Gemini.");
  } finally {
    clearTimeout(timer);
  }

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    const message = body?.error?.message || `Gemini returned ${response.status}.`;
    if (response.status === 400 && /thinking/i.test(message)) {
      return generateLegacy(apiKey, model, mode, article, issues);
    }
    if (response.status === 401 || response.status === 403) {
      throw fail(502, "Gemini rejected the API key.");
    }
    if (response.status === 429) throw fail(429, "Gemini is rate-limiting. Wait a moment and try again.");
    throw fail(502, "Gemini could not write the post. Try again.");
  }
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

async function generateLegacy(apiKey, model, mode, article, issues) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45_000);
  let response;
  try {
    response = await fetch(`${ENDPOINT}/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "content-type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt(mode) }] },
        contents: [{ role: "user", parts: [{ text: userPrompt(article, issues) }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: schema(),
          maxOutputTokens: 4096,
        },
      }),
    });
  } catch (error) {
    if (error?.name === "AbortError") throw fail(504, "Gemini took too long. Try again.");
    throw fail(502, "Could not reach Gemini.");
  } finally {
    clearTimeout(timer);
  }
  const body = await response.json().catch(() => null);
  if (!response.ok) throw fail(502, "Gemini could not write the post. Try again.");
  const parts = body?.candidates?.[0]?.content?.parts || [];
  const text = parts.filter((part) => part?.text && !part.thought).map((part) => part.text).join("");
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
  let draft = await generate(apiKey, model, mode, article);
  let grounded = checkGrounding(draft, article.text);
  if (!grounded.ok) {
    draft = await generate(apiKey, model, mode, article, grounded.issues);
    grounded = checkGrounding(draft, article.text);
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
    draft = await generate(apiKey, model, mode, article, [
      { type: "length", value: `Every post must be a complete sentence under ${limit} characters.` },
    ]);
    const again = checkGrounding(draft, article.text);
    if (!again.ok) {
      const stripped = stripUngrounded(draft, article.text);
      draft = stripped.posts;
      dropped += stripped.removed;
    }
    fitted = draft.length ? fitPosts(draft, limit) : null;
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
