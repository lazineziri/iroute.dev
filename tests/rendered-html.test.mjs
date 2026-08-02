import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
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
  assert.match(html, /@iroute\/sdk/);
});
