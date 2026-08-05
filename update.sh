#!/usr/bin/env bash
set -Eeuo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Запустите обновление от root: sudo bash update.sh"
  exit 1
fi

git pull --ff-only
docker compose up -d --build --remove-orphans
docker image prune -f

echo "Сайт обновлён."
