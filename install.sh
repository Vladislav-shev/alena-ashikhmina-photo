#!/usr/bin/env bash
set -Eeuo pipefail

REPOSITORY_URL="https://github.com/Vladislav-shev/alena-ashikhmina-photo.git"
INSTALL_DIR="/opt/alena-ashikhmina-photo"
PUBLIC_URL="https://альбом-лнр.рф"

if [[ "${EUID}" -ne 0 ]]; then
  echo "Запустите установку через sudo."
  exit 1
fi

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]:-$0}")" 2>/dev/null && pwd -P || true)"

if [[ -n "${SCRIPT_DIR}" && -f "${SCRIPT_DIR}/compose.yaml" ]]; then
  APP_DIR="${SCRIPT_DIR}"
else
  if [[ ! -f /etc/os-release ]]; then
    echo "Не удалось определить операционную систему. Нужна Ubuntu или Debian."
    exit 1
  fi

  . /etc/os-release
  if [[ "${ID:-}" != "ubuntu" && "${ID:-}" != "debian" ]]; then
    echo "Автоустановка поддерживает Ubuntu и Debian."
    exit 1
  fi

  apt-get update
  apt-get install -y ca-certificates curl git

  if [[ -d "${INSTALL_DIR}/.git" ]]; then
    git -C "${INSTALL_DIR}" pull --ff-only
  elif [[ -e "${INSTALL_DIR}" ]]; then
    echo "Каталог ${INSTALL_DIR} уже существует, но не является репозиторием проекта."
    exit 1
  else
    git clone --depth 1 "${REPOSITORY_URL}" "${INSTALL_DIR}"
  fi

  APP_DIR="${INSTALL_DIR}"
fi

if ! command -v docker >/dev/null 2>&1; then
  . /etc/os-release
  if [[ "${ID:-}" != "ubuntu" && "${ID:-}" != "debian" ]]; then
    echo "Автоустановка Docker поддерживает Ubuntu и Debian."
    exit 1
  fi

  apt-get update
  apt-get install -y ca-certificates curl
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL "https://download.docker.com/linux/${ID}/gpg" -o /etc/apt/keyrings/docker.asc
  chmod a+r /etc/apt/keyrings/docker.asc

  ARCH="$(dpkg --print-architecture)"
  CODENAME="${VERSION_CODENAME}"
  echo "deb [arch=${ARCH} signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/${ID} ${CODENAME} stable" > /etc/apt/sources.list.d/docker.list
  apt-get update
  apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
fi

cd "${APP_DIR}"

if ! docker compose version >/dev/null 2>&1; then
  echo "Не найден Docker Compose v2. Установите docker-compose-plugin и повторите."
  exit 1
fi

if [[ ! -f .env ]]; then
  cp .env.example .env
fi

docker compose up -d --build --remove-orphans

SERVER_IP="$(hostname -I 2>/dev/null | awk '{print $1}' || true)"
echo
echo "Сайт установлен и будет автоматически запускаться после перезагрузки сервера."
echo "Основной адрес: ${PUBLIC_URL}"
[[ -n "${SERVER_IP}" ]] && echo "IP сервера для A-записи: ${SERVER_IP}"
echo "HTTPS включится автоматически, когда A-запись домена укажет на этот сервер."
echo "Если страница не открывается, разрешите входящие подключения на порты 80 и 443 в панели сервера."
