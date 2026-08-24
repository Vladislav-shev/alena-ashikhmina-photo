#!/usr/bin/env node

import { createReadStream, constants as fsConstants } from "node:fs";
import { createHash } from "node:crypto";
import {
  access,
  chmod,
  chown,
  cp,
  lstat,
  mkdir,
  mkdtemp,
  readdir,
  realpath,
  rm,
  stat,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { checkProduction } from "./check-production.mjs";
import { checkLegalProfile } from "./check-legal-profile.mjs";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = path.join(PROJECT_ROOT, "ispmanager-dist");
const WEB_ROOT = "/var/www/www-root/data/www/xn----7sbd3bcejew7i.xn--p1ai";
const PUBLIC_URL = "https://альбом-лнр.рф";
const MAX_BACKUPS = 5;

const routes = [
  ["Главная", "", "index.html"],
  ["Условия и реквизиты", "legal/", "legal/index.html"],
  ["Политика персональных данных", "privacy/", "privacy/index.html"],
];

function isInside(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return relative === "" || (relative !== ".." && !relative.startsWith(`..${path.sep}`));
}

async function exists(target) {
  try {
    await access(target, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function copyEntries(from, to, excluded = new Set()) {
  const entries = await readdir(from, { withFileTypes: true });
  for (const entry of entries) {
    if (excluded.has(entry.name)) continue;
    await cp(path.join(from, entry.name), path.join(to, entry.name), {
      recursive: true,
      force: true,
      errorOnExist: false,
      dereference: false,
      verbatimSymlinks: true,
    });
  }
}

async function removeDeployableEntries(target) {
  const entries = await readdir(target, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === ".well-known") continue;
    await rm(path.join(target, entry.name), { recursive: true, force: true });
  }
}

async function applyEntryOwnershipAndMode(target, uid, gid) {
  const entryStat = await lstat(target);
  if (entryStat.isSymbolicLink()) {
    throw new Error(`Символическая ссылка запрещена при установке: ${target}`);
  }

  if (typeof process.getuid === "function" && process.getuid() === 0) {
    await chown(target, uid, gid);
  }

  await chmod(target, entryStat.isDirectory() ? 0o755 : 0o644);
  if (!entryStat.isDirectory()) return;

  const children = await readdir(target, { withFileTypes: true });
  for (const child of children) {
    await applyEntryOwnershipAndMode(path.join(target, child.name), uid, gid);
  }
}

async function applyDeployedOwnershipAndModes(root, uid, gid) {
  const children = await readdir(root, { withFileTypes: true });
  for (const child of children) {
    if (child.name === ".well-known") continue;
    await applyEntryOwnershipAndMode(path.join(root, child.name), uid, gid);
  }
}

async function sha256(file) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(file)) hash.update(chunk);
  return hash.digest("hex");
}

async function buildManifest(root, excludedTopLevel = new Set()) {
  const manifest = new Map();

  async function visit(current, relative = "") {
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      if (!relative && excludedTopLevel.has(entry.name)) continue;

      const absolute = path.join(current, entry.name);
      const relativePath = path.join(relative, entry.name);
      const normalized = relativePath.split(path.sep).join("/");

      if (entry.isSymbolicLink()) {
        throw new Error(`Символическая ссылка запрещена в сборке: ${normalized}`);
      }
      if (entry.isDirectory()) {
        await visit(absolute, relativePath);
      } else if (entry.isFile()) {
        manifest.set(normalized, await sha256(absolute));
      } else {
        throw new Error(`Недопустимый тип файла в сборке: ${normalized}`);
      }
    }
  }

  await visit(root);
  return manifest;
}

function assertSameManifest(expected, actual) {
  if (expected.size !== actual.size) {
    throw new Error(`Проверка установки не пройдена: ожидалось ${expected.size} файлов, найдено ${actual.size}.`);
  }

  for (const [file, expectedHash] of expected) {
    if (actual.get(file) !== expectedHash) {
      throw new Error(`Проверка установки не пройдена: файл ${file} отличается от сборки.`);
    }
  }
}

function backupName() {
  return `before-deploy-${new Date().toISOString().replace(/[:.]/g, "-")}`;
}

async function chooseBackupRoot() {
  if (process.env.BACKUP_DIR) {
    const configured = path.resolve(process.env.BACKUP_DIR);
    await mkdir(configured, { recursive: true });
    await access(configured, fsConstants.W_OK);
    return configured;
  }

  const systemBackup = "/var/backups/alena-ashikhmina-photo";
  try {
    await mkdir(systemBackup, { recursive: true });
    await access(systemBackup, fsConstants.W_OK);
    return systemBackup;
  } catch {
    const localBackup = path.join(PROJECT_ROOT, ".deploy-backups");
    await mkdir(localBackup, { recursive: true });
    return localBackup;
  }
}

async function trimBackups(backupRoot) {
  const entries = (await readdir(backupRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("before-deploy-"))
    .map((entry) => entry.name)
    .sort()
    .reverse();

  for (const expired of entries.slice(MAX_BACKUPS)) {
    await rm(path.join(backupRoot, expired), { recursive: true, force: true });
  }
}

async function main() {
  for (const [, , routeFile] of routes) {
    await access(path.join(SOURCE_DIR, routeFile), fsConstants.R_OK);
  }

  const webRootLinkStat = await lstat(WEB_ROOT);
  if (!webRootLinkStat.isDirectory() || webRootLinkStat.isSymbolicLink()) {
    throw new Error(`Каталог сайта должен быть обычной директорией, а не ссылкой: ${WEB_ROOT}`);
  }

  const [realProjectRoot, realSourceDir, realWebRoot] = await Promise.all([
    realpath(PROJECT_ROOT),
    realpath(SOURCE_DIR),
    realpath(WEB_ROOT),
  ]);

  if (realWebRoot !== WEB_ROOT) {
    throw new Error(`Физический путь каталога сайта не совпадает с разрешённым: ${WEB_ROOT}`);
  }

  if (isInside(realWebRoot, realProjectRoot) || isInside(realWebRoot, realSourceDir)) {
    throw new Error(
      `Репозиторий нельзя размещать внутри каталога сайта ${realWebRoot}. ` +
        "Клонируйте его, например, в /root/alena-ashikhmina-photo и повторите команду.",
    );
  }

  await access(realWebRoot, fsConstants.R_OK | fsConstants.W_OK);
  const webRootStat = await stat(realWebRoot);
  const backupRoot = await chooseBackupRoot();
  const realBackupRoot = await realpath(backupRoot);

  if (isInside(realWebRoot, realBackupRoot)) {
    throw new Error("Каталог резервных копий не может находиться внутри каталога сайта.");
  }

  const sourceManifest = await buildManifest(realSourceDir);
  const lockDir = path.join(realBackupRoot, ".deploy.lock");
  try {
    await mkdir(lockDir, { recursive: false });
  } catch (error) {
    if (error.code === "EEXIST") {
      throw new Error("Другая установка уже выполняется. Дождитесь её завершения и повторите команду.");
    }
    throw error;
  }

  try {
    const currentEntries = (await readdir(realWebRoot, { withFileTypes: true })).filter(
      (entry) => entry.name !== ".well-known",
    );

    let backupDir = null;
    if (currentEntries.length > 0) {
      backupDir = path.join(realBackupRoot, backupName());
      await mkdir(backupDir, { recursive: false });
      await copyEntries(realWebRoot, backupDir, new Set([".well-known"]));
      console.log(`Резервная копия: ${backupDir}`);
    }

    const stageRoot = await mkdtemp(path.join(tmpdir(), "alena-photo-deploy-"));
    const stagedSite = path.join(stageRoot, "site");

    try {
      await cp(realSourceDir, stagedSite, { recursive: true, force: true });
      await removeDeployableEntries(realWebRoot);
      await copyEntries(stagedSite, realWebRoot);
      await applyDeployedOwnershipAndModes(realWebRoot, webRootStat.uid, webRootStat.gid);
      const installedManifest = await buildManifest(realWebRoot, new Set([".well-known"]));
      assertSameManifest(sourceManifest, installedManifest);
    } catch (error) {
      if (backupDir && (await exists(backupDir))) {
        try {
          await removeDeployableEntries(realWebRoot);
          await copyEntries(backupDir, realWebRoot);
          await applyDeployedOwnershipAndModes(realWebRoot, webRootStat.uid, webRootStat.gid);
          throw new Error(`Установка прервана, прежняя версия восстановлена. Причина: ${error.message}`);
        } catch (rollbackError) {
          if (rollbackError.message.startsWith("Установка прервана")) throw rollbackError;
          throw new Error(
            `Установка и автоматическое восстановление не завершились. ` +
              `Резервная копия: ${backupDir}. Причина: ${error.message}`,
          );
        }
      }
      throw error;
    } finally {
      await rm(stageRoot, { recursive: true, force: true });
    }

    await trimBackups(realBackupRoot);

    console.log(`\nГотово: сайт установлен в ${realWebRoot}`);
    for (const [label, route] of routes) {
      console.log(`${label}: ${PUBLIC_URL}/${route}`);
    }
    console.log("\nДля следующего обновления: npm run update");
    await checkLegalProfile({ strict: false });
    console.log("\nПроверяю сайт снаружи…");
    await checkProduction({ strict: false });
  } finally {
    await rm(lockDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(`\nОшибка: ${error.message}`);
  process.exitCode = 1;
});
