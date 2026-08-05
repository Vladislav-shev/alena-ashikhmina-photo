#!/usr/bin/env bash
set -Eeuo pipefail

WEB_ROOT="/var/www/www-root/data/www/xn----7sbd3bcejew7i.xn--p1ai"
ARCHIVE_URL="https://github.com/Vladislav-shev/alena-ashikhmina-photo/archive/refs/heads/main.tar.gz"
PUBLIC_URL="https://альбом-лнр.рф"
BACKUP_DIR="/var/backups/alena-ashikhmina-photo"

if [[ "${EUID}" -ne 0 ]]; then
  echo "Запустите команду через sudo или от пользователя root."
  exit 1
fi

if [[ ! -d "${WEB_ROOT}" ]]; then
  echo "Каталог сайта не найден: ${WEB_ROOT}"
  exit 1
fi

if [[ "$(readlink -f "${WEB_ROOT}")" != "${WEB_ROOT}" ]]; then
  echo "Путь каталога сайта не прошёл проверку безопасности."
  exit 1
fi

. /etc/os-release
if [[ "${ID:-}" != "ubuntu" && "${ID:-}" != "debian" ]]; then
  echo "Автоустановка поддерживает Ubuntu и Debian."
  exit 1
fi

apt-get update
apt-get install -y ca-certificates curl rsync tar

TMP_DIR="$(mktemp -d)"
trap 'rm -rf -- "${TMP_DIR}"' EXIT

curl -fL --retry 3 --connect-timeout 20 "${ARCHIVE_URL}" -o "${TMP_DIR}/site.tar.gz"
tar -xzf "${TMP_DIR}/site.tar.gz" -C "${TMP_DIR}"

SOURCE_DIR="$(find "${TMP_DIR}" -mindepth 2 -maxdepth 2 -type d -name ispmanager-dist -print -quit)"
if [[ -z "${SOURCE_DIR}" || ! -f "${SOURCE_DIR}/index.html" ]]; then
  echo "В архиве не найдена готовая сборка для ISPmanager."
  exit 1
fi

SITE_OWNER="$(stat -c '%U' "${WEB_ROOT}")"
SITE_GROUP="$(stat -c '%G' "${WEB_ROOT}")"
mkdir -p "${BACKUP_DIR}"

if find "${WEB_ROOT}" -mindepth 1 -maxdepth 1 -print -quit | grep -q .; then
  BACKUP_FILE="${BACKUP_DIR}/before-deploy-$(date +%Y%m%d-%H%M%S).tar.gz"
  tar -czf "${BACKUP_FILE}" -C "${WEB_ROOT}" .
  echo "Резервная копия прежних файлов: ${BACKUP_FILE}"
fi

rsync -a --delete --exclude='.well-known/' "${SOURCE_DIR}/" "${WEB_ROOT}/"
chown -R "${SITE_OWNER}:${SITE_GROUP}" "${WEB_ROOT}"
find "${WEB_ROOT}" -type d -exec chmod 755 {} +
find "${WEB_ROOT}" -type f -exec chmod 644 {} +

echo
echo "Сайт установлен в ${WEB_ROOT}"
echo "Откройте: ${PUBLIC_URL}"
echo "PHP можно оставить включённым: сайт раздаётся как статические файлы."
