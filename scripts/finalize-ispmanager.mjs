#!/usr/bin/env node

import { access, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "ispmanager-dist");
const PRERENDER_DIR = path.join(PROJECT_ROOT, ".prerender");
const PRERENDER_ENTRY = path.join(PRERENDER_DIR, "prerender-entry.mjs");

const renderedRoutes = [
  ["/", "index.html"],
  ["/legal/", "legal/index.html"],
  ["/privacy/", "privacy/index.html"],
];

const retiredRoutes = ["kapsula", "kino", "glianets", "flash", "2046", "museum"];
const unusedPublicFiles = [
  "assets/alena-ashikhmina.webp",
  "assets/cinema-hero.webp",
  "assets/flash-hero.webp",
  "assets/future-hero.webp",
  "assets/gallery-studio.webp",
  "assets/gloss-hero.webp",
  "assets/hero-school.webp",
  "assets/museum-hero.webp",
  "file.svg",
  "globe.svg",
  "window.svg",
];

function injectMarkup(html, markup, file) {
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) {
    throw new Error(`Не найден контейнер пререндера в ${file}`);
  }
  return html.replace(marker, `<div id="root">${markup}</div>`);
}

function retiredPage(route) {
  const destination = "/";
  return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="robots" content="noindex,follow">
    <link rel="canonical" href="https://xn----7sbd3bcejew7i.xn--p1ai/">
    <meta http-equiv="refresh" content="0;url=${destination}">
    <title>Версия «${route}» перенесена — КАПСУЛА</title>
    <script>location.replace(${JSON.stringify(destination)}+location.search+location.hash)</script>
  </head>
  <body><p>Эта версия перенесена на <a href="/">главную страницу проекта «КАПСУЛА»</a>.</p></body>
</html>`;
}

async function main() {
  await access(PRERENDER_ENTRY);
  const entryUrl = pathToFileURL(PRERENDER_ENTRY);
  entryUrl.searchParams.set("build", `${Date.now()}`);
  const { renderRoute } = await import(entryUrl.href);

  for (const [route, relativeFile] of renderedRoutes) {
    const file = path.join(OUTPUT_DIR, relativeFile);
    const html = await readFile(file, "utf8");
    const markup = renderRoute(route);
    await writeFile(file, injectMarkup(html, markup, relativeFile));
  }

  for (const route of retiredRoutes) {
    const directory = path.join(OUTPUT_DIR, route);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, "index.html"), retiredPage(route));
  }

  await Promise.all(unusedPublicFiles.map((file) => rm(path.join(OUTPUT_DIR, file), { force: true })));

  await rm(PRERENDER_DIR, { recursive: true, force: true });
  console.log("ISPmanager artifact finalized: prerendered pages, SEO files and retired-route redirects are ready.");
}

main().catch(async (error) => {
  await rm(PRERENDER_DIR, { recursive: true, force: true });
  console.error(error);
  process.exitCode = 1;
});
