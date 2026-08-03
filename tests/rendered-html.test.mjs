import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import test, { after, before } from "node:test";

const port = 31_000 + (process.pid % 1_000);
const origin = `http://127.0.0.1:${port}`;
let server;
let serverOutput = "";

before(async () => {
  server = spawn(
    process.platform === "win32" ? "npm.cmd" : "npm",
    ["run", "start", "--", "--hostname", "127.0.0.1", "--port", String(port)],
    { cwd: new URL("..", import.meta.url), stdio: ["ignore", "pipe", "pipe"] },
  );
  server.stdout.on("data", chunk => { serverOutput += chunk; });
  server.stderr.on("data", chunk => { serverOutput += chunk; });

  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Next.js exited before it became ready:\n${serverOutput}`);
    }
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {
      // The server has not bound its port yet.
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error(`Next.js did not become ready:\n${serverOutput}`);
});

after(() => {
  server?.kill("SIGTERM");
});

async function render(path = "/") {
  return fetch(`${origin}${path}`, { headers: { accept: "text/html" } });
}

test("renders the iRoute landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>iRoute — task-aware AI execution<\/title>/i);
  assert.match(html, /Run the router/);
  assert.match(html, /One runtime, thin clients/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("renders versioned documentation", async () => {
  const response = await render("/docs/sdk/node");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Node\.js SDK/);
  assert.match(html, /@iroute-dev\/sdk/);
});
