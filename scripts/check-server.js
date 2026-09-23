import { spawn } from "node:child_process";
import { createServer } from "node:net";

function freePort() {
  return new Promise((resolve, reject) => {
    const probe = createServer();
    probe.on("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const address = probe.address();
      const port = typeof address === "object" && address ? address.port : 0;
      probe.close(() => resolve(port));
    });
  });
}

const port = await freePort();
const child = spawn(process.execPath, ["server.ts"], {
  env: {
    ...process.env,
    HOST: "127.0.0.1",
    PORT: String(port),
    GEMINI_API_KEY: "build-check-key",
    SESSION_SECRET: "build-check-secret",
  },
  stdio: ["ignore", "pipe", "pipe"],
});
let logs = "";
child.stdout.on("data", (chunk) => {
  logs += chunk;
});
child.stderr.on("data", (chunk) => {
  logs += chunk;
});

try {
  const status = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(logs || "server.ts did not start")), 8000);
    const tick = async () => {
      if (child.exitCode !== null) {
        clearTimeout(timer);
        reject(new Error(logs || "server.ts exited"));
        return;
      }
      try {
        const res = await fetch(`http://127.0.0.1:${port}/api/status`);
        if (res.ok) {
          clearTimeout(timer);
          resolve(await res.json());
          return;
        }
      } catch {
        /* not up yet */
      }
      setTimeout(tick, 150);
    };
    tick();
  });
  if (!status || typeof status.configured !== "boolean" || status.limits?.standard !== 280) {
    throw new Error("server.ts status route is not wired");
  }
  const blocked = await fetch(`http://127.0.0.1:${port}/api/generate`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ url: "http://127.0.0.1/secret", mode: "standard" }),
  });
  if (blocked.status !== 400) throw new Error(`generate route returned ${blocked.status}`);
  const again = await fetch(`http://127.0.0.1:${port}/api/regenerate`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: "not-a-draft", mode: "standard" }),
  });
  if (again.status !== 400) throw new Error(`regenerate route returned ${again.status}`);
} finally {
  child.kill();
}

console.log("server.ts routes ok");
