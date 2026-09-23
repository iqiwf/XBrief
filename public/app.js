const form = document.querySelector("#form");
const urlInput = document.querySelector("#url");
const go = document.querySelector("#go");
const status = document.querySelector("#status");
const result = document.querySelector("#result");
const postsEl = document.querySelector("#posts");
const again = document.querySelector("#again");
const copyAll = document.querySelector("#copy-all");
const note = document.querySelector("#note");

let draft = null;

function mode() {
  return new FormData(form).get("mode");
}

function setStatus(message, isError = false) {
  status.textContent = message;
  status.classList.toggle("error", isError);
}

function count(text) {
  const re = /https?:\/\/[^\s<>"']+/gi;
  let without = "";
  let last = 0;
  let urls = 0;
  for (const match of String(text).matchAll(re)) {
    const raw = match[0];
    const trail = raw.match(/[.,!?;:]+$/);
    without += text.slice(last, match.index);
    if (trail) without += trail[0];
    urls += 1;
    last = match.index + raw.length;
  }
  without += text.slice(last);
  return [...without].length + urls * 23;
}

function render() {
  document.querySelector("#kicker").textContent = `${draft.siteName} · ${draft.words.toLocaleString()} words read`;
  document.querySelector("#title").textContent = draft.title;
  const bits = [];
  if (draft.truncated) bits.push("The story was long, so only the first part was used.");
  if (draft.dropped) bits.push("A line was dropped because it added something the article did not say.");
  note.hidden = bits.length === 0;
  note.textContent = bits.join(" ");
  document.querySelector("#excerpt").textContent = draft.excerpt;
  postsEl.replaceChildren();
  draft.posts.forEach((post, index) => {
    const card = document.createElement("article");
    card.className = "post";
    const head = document.createElement("header");
    head.innerHTML = `<strong>${draft.posts.length > 1 ? `Post ${index + 1}` : "Post"}</strong>`;
    const area = document.createElement("textarea");
    area.value = post.text;
    area.rows = Math.min(12, Math.max(3, Math.ceil(post.text.length / 72)));
    const foot = document.createElement("footer");
    const counter = document.createElement("span");
    counter.className = "count";
    const copy = document.createElement("button");
    copy.type = "button";
    copy.className = "ghost";
    copy.textContent = "Copy";
    const paint = () => {
      const n = count(area.value);
      post.text = area.value;
      post.chars = n;
      counter.textContent = `${n.toLocaleString()} / ${draft.limit.toLocaleString()}`;
      counter.classList.toggle("over", n > draft.limit);
    };
    area.addEventListener("input", paint);
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(area.value);
        copy.textContent = "Copied";
      } catch {
        area.focus();
        area.select();
        copy.textContent = "Select and copy";
      }
      setTimeout(() => { copy.textContent = "Copy"; }, 1200);
    });
    foot.append(counter, copy);
    card.append(head, area, foot);
    postsEl.append(card);
    paint();
  });
  result.hidden = false;
  copyAll.hidden = draft.posts.length < 2;
}

async function request(path, body) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Something went wrong.");
  return data;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  go.disabled = true;
  setStatus("Reading the article…");
  try {
    draft = await request("/api/generate", { url: urlInput.value.trim(), mode: mode() });
    render();
    setStatus(draft.posts.length > 1 ? `Thread of ${draft.posts.length} posts.` : "Single post.");
  } catch (error) {
    setStatus(error.message, true);
  } finally {
    go.disabled = false;
  }
});

again.addEventListener("click", async () => {
  if (!draft?.id) return;
  again.disabled = true;
  setStatus("Rewriting…");
  try {
    draft = await request("/api/regenerate", { id: draft.id, mode: mode() });
    render();
    setStatus("New draft.");
  } catch (error) {
    setStatus(error.message, true);
  } finally {
    again.disabled = false;
  }
});

copyAll.addEventListener("click", async () => {
  const text = [...postsEl.querySelectorAll("textarea")].map((node) => node.value.trim()).filter(Boolean).join("\n\n");
  try {
    await navigator.clipboard.writeText(text);
    copyAll.textContent = "Copied";
  } catch {
    copyAll.textContent = "Copy failed";
  }
  setTimeout(() => { copyAll.textContent = "Copy thread"; }, 1200);
});

fetch("/api/status")
  .then((response) => response.json())
  .then((data) => {
    if (!data.configured) setStatus("Add GEMINI_API_KEY to .env and restart the server.", true);
  })
  .catch(() => {});
