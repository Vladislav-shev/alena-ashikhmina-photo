import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, developmentPreviewMeta);
  assert.match(html, /КАПСУЛА/);
  assert.match(html, /Первый кадр/);
  assert.match(html, /На память/);
  assert.match(html, /Яркие моменты/);
  assert.match(html, /Вся история/);
  assert.match(html, /Специальный выпуск/);
  assert.match(html, /tel:\+79591236876/);
  assert.match(html, /tel:\+79591621807/);
  assert.match(html, /Луганск и область/);
  assert.match(html, /2027/);
  assert.doesNotMatch(html, /\b2026\b/);
});
