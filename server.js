import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "./lib/env.js";
import { generate, regenerate, status } from "./lib/routes.js";

const root = fileURLToPath(new URL(".", import.meta.url));
loadEnv(join(root, ".env"));

const publicDir = join(root, "public");
const host = process.env.HOST || (process.env.VERCEL ? "0.0.0.0" : "127.0.0.1");
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
};

async function handleStatic(res, pathname) {
  const requested = (pathname === "/" ? "index.html" : pathname).replace(/^[/\\]+/, "");
  if (!requested || requested.includes("\0")) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  const file = resolve(publicDir, requested);
  if (file !== publicDir && !file.startsWith(publicDir + sep)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  try {
    const data = await readFile(file);
    res.writeHead(200, {
      "content-type": types[extname(file)] || "application/octet-stream",
      "cache-control": "no-store",
    });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}

const routes = {
  "/api/status": status,
  "/api/generate": generate,
  "/api/regenerate": regenerate,
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", "http://127.0.0.1");
  const route = routes[url.pathname];
  if (route) {
    await route(req, res);
    return;
  }
  if (req.method === "GET") {
    await handleStatic(res, url.pathname);
    return;
  }
  res.writeHead(405, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify({ error: "Method not allowed." }));
});

server.listen(port, host, () => {
  console.log(`news-to-x  http://${host}:${port}`);
});
