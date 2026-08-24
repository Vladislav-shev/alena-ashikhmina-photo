#!/usr/bin/env bash
set -Eeuo pipefail

PROJECT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

if [[ ! -f "${PROJECT_DIR}/package.json" ]]; then
  echo "Файл package.json не найден. Откройте папку проекта и выполните: npm run deploy"
  exit 1
fi

cd -- "${PROJECT_DIR}"
exec npm run deploy
