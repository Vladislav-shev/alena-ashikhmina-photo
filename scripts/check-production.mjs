#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";

const HTTP_URL = "http://xn----7sbd3bcejew7i.xn--p1ai";
const HTTPS_URL = "https://xn----7sbd3bcejew7i.xn--p1ai";

async function request(url, options = {}) {
  return fetch(url, {
    redirect: "manual",
    signal: AbortSignal.timeout(10_000),
    headers: { "user-agent": "alena-photo-production-check/1.0" },
    ...options,
  });
}

export async function checkProduction({ strict = true } = {}) {
  const issues = [];
  const passes = [];

  try {
    const response = await request(`${HTTP_URL}/`);
    const location = response.headers.get("location") ?? "";
    if (![301, 302, 307, 308].includes(response.status) || !location.startsWith("https://")) {
      issues.push("HTTP не перенаправляет посетителей на HTTPS.");
    } else {
      passes.push("HTTP → HTTPS");
    }
  } catch (error) {
    issues.push(`Не удалось проверить HTTP: ${error.message}`);
  }

  try {
    const response = await fetch(`${HTTPS_URL}/`, {
      signal: AbortSignal.timeout(10_000),
      headers: { "user-agent": "alena-photo-production-check/1.0" },
    });
    const html = await response.text();
    if (!response.ok) issues.push(`HTTPS-главная отвечает кодом ${response.status}.`);
    else if (/regru\.cloud is ready|content is to be added/i.test(html)) {
      issues.push("HTTPS открывает заглушку REG.RU, а не сайт «КАПСУЛА».");
    } else if (!/<div id=["']root["']>\s*(?:<link[^>]+>)?<main\b/i.test(html)) {
      issues.push("HTTPS-главная загружает приложение, но основной текст ещё отсутствует в исходном HTML (нет пререндера). Запустите npm run update.");
    } else if (!/<h1[^>]*>Выпускные[\s\S]{0,80}альбомы[\s\S]{0,80}2027/i.test(html)) {
      issues.push("В пререндеренном HTML не найден H1 о выпускных альбомах 2027.");
    } else {
      passes.push("HTTPS-главная и пререндер");
    }
  } catch (error) {
    issues.push(`Не удалось открыть HTTPS: ${error.message}`);
  }

  for (const [pathName, expected, label] of [
    ["/robots.txt", "Sitemap:", "robots.txt"],
    ["/sitemap.xml", "<urlset", "sitemap.xml"],
    ["/legal/", "Правовая информация", "правовая страница"],
    ["/privacy/", "Политика обработки персональных данных", "политика ПД"],
  ]) {
    try {
      const response = await fetch(`${HTTPS_URL}${pathName}`, { signal: AbortSignal.timeout(10_000) });
      const body = await response.text();
      if (!response.ok || !body.includes(expected)) issues.push(`${label}: нет корректного ответа на HTTPS.`);
      else passes.push(label);
    } catch (error) {
      issues.push(`${label}: проверка не выполнена (${error.message}).`);
    }
  }

  if (passes.length) console.log(`Проверено: ${passes.join(", ")}.`);
  if (issues.length) {
    console.warn("\nВнимание: сайт скопирован, но внешняя проверка нашла проблемы:");
    issues.forEach((issue) => console.warn(`- ${issue}`));
    console.warn(
      "\nВ ISPmanager откройте «Сайты» → «альбом-лнр.рф»: назначьте этому сайту сертификат Let's Encrypt, " +
        "проверьте корневой каталог /var/www/www-root/data/www/xn----7sbd3bcejew7i.xn--p1ai и включите перенаправление HTTP → HTTPS. " +
        "Затем выполните: npm run check:production",
    );
    if (strict) throw new Error(`Производственная проверка не пройдена: ${issues.length} проблем.`);
  } else {
    console.log("Внешняя проверка пройдена: HTTPS и SEO-файлы доступны.");
  }

  return { issues, passes };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  checkProduction().catch((error) => {
    console.error(`\nОшибка: ${error.message}`);
    process.exitCode = 1;
  });
}
