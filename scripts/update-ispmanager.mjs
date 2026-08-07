#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function run(command, args, capture = false) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    encoding: "utf8",
    stdio: capture ? "pipe" : "inherit",
  });

  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
  return result.stdout?.trim() || "";
}

const status = run("git", ["status", "--porcelain", "--untracked-files=normal"], true);
if (status) {
  console.error("\nОшибка: в проекте есть локальные изменения. Сохраните или отмените их перед обновлением.");
  process.exit(1);
}

run("git", ["pull", "--ff-only"]);
run(process.execPath, [path.join(projectRoot, "scripts/deploy-ispmanager.mjs")]);
