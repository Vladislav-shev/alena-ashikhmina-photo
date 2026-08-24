import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const readArtifact = (file) => readFile(new URL(`../ispmanager-dist/${file}`, import.meta.url), "utf8");

test("ISPmanager main page contains indexable content and complete SEO metadata", async () => {
  const html = await readArtifact("index.html");
  assert.match(html, /<div id="root">(?:<link[^>]+>)?<main/);
  assert.match(html, /<h1>Выпускные/);
  assert.match(html, /для 4, 9 и 11 классов/);
  assert.match(html, /Первый кадр/);
  assert.match(html, /Специальный выпуск/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /https:\/\/xn----7sbd3bcejew7i\.xn--p1ai\//);
  assert.doesNotMatch(html, /<div id="root"><\/div>/);
  assert.doesNotMatch(html, /<form\b/i);
  assert.doesNotMatch(html, /\b2026\b/);
});

test("robots, sitemap and legal pages are packaged", async () => {
  const [robots, sitemap, legal, privacy] = await Promise.all([
    readArtifact("robots.txt"),
    readArtifact("sitemap.xml"),
    readArtifact("legal/index.html"),
    readArtifact("privacy/index.html"),
  ]);
  assert.match(robots, /Sitemap: https:\/\/xn----7sbd3bcejew7i\.xn--p1ai\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/xn----7sbd3bcejew7i\.xn--p1ai\/legal\/<\/loc>/);
  assert.match(legal, /<div id="root"><div class="legal-site"/);
  assert.match(legal, /Плательщик НПД формирует и передаёт заказчику чек/);
  assert.match(privacy, /На сайте нет формы заявки/);
  assert.match(privacy, /Согласие на обработку персональных данных оформляется отдельным документом/);
});

test("retired concepts cannot be indexed as competing pages", async () => {
  for (const route of ["kapsula", "kino", "glianets", "flash", "2046", "museum"]) {
    const html = await readArtifact(`${route}/index.html`);
    assert.match(html, /name="robots" content="noindex,follow"/);
    assert.match(html, /rel="canonical" href="https:\/\/xn----7sbd3bcejew7i\.xn--p1ai\/"/);
    assert.doesNotMatch(html, /<form\b/i);
  }
});

test("all production photos are compact WebP files", async () => {
  for (const file of ["archive-hero.webp", "gallery-candid.webp", "gallery-classroom.webp", "gallery-group.webp", "album-flatlay.webp"]) {
    const info = await stat(new URL(`../ispmanager-dist/assets/${file}`, import.meta.url));
    assert.ok(info.size < 180_000, `${file} is unexpectedly large: ${info.size}`);
  }
});

test("project installers do not invoke apt or Docker", async () => {
  for (const file of ["install.sh", "install-ispmanager.sh"]) {
    const script = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
    assert.match(script, /npm run deploy/);
    assert.doesNotMatch(script, /apt-get|docker compose|download\.docker\.com/i);
  }
});
