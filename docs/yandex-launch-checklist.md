# Запуск в Яндексе после установки

## Сначала сервер

1. В ISPmanager назначить сайту `альбом-лнр.рф` сертификат Let's Encrypt.
2. Убедиться, что HTTPS использует каталог `/var/www/www-root/data/www/xn----7sbd3bcejew7i.xn--p1ai`, а не заглушку REG.RU.
3. Включить постоянное перенаправление HTTP → HTTPS.
4. В каталоге репозитория выполнить `npm run check:production`. Все проверки должны стать зелёными.

## Яндекс Вебмастер

1. Добавить именно `https://альбом-лнр.рф/` — протокол и адрес важны.
2. Подтвердить права метатегом или HTML-файлом, который выдаст Вебмастер. Файл положить в `public/`, затем выполнить `npm run build:ispmanager` и `npm run deploy`.
3. Добавить `https://альбом-лнр.рф/sitemap.xml`.
4. Проверить `robots.txt`, ответ сервера, мобильную версию и главную страницу.
5. Указать регион «Луганск» и добавить организацию в Яндекс Бизнес с теми же именем, телефонами, сайтом и территорией работы.
6. Отправить `/`, `/legal/` и `/privacy/` на переобход после исправления HTTPS.
7. Старые версии `/kino/`, `/glianets/`, `/kapsula/`, `/flash/`, `/2046/`, `/museum/` исключены из Sitemap, помечены `noindex` и ведут на главную.

Основной контент уже пререндерен в HTML: робот видит заголовок, тарифы, географию и контакты без выполнения JavaScript. В проект также включены `robots.txt`, `sitemap.xml`, canonical, Open Graph и JSON-LD `Organization`.

Справка Яндекса: [рендеринг JavaScript](https://yandex.ru/support/webmaster/ru/yandex-indexing/rendering), [Sitemap](https://yandex.ru/support/webmaster/ru/indexing-options/sitemap), [диагностика](https://yandex.ru/support/webmaster/ru/diagnosis/recommendations), [регион сайта](https://www.yandex.ru/support/webmaster/ru/site-geography/site-region), [Яндекс Бизнес](https://www.yandex.ru/support/business-priority/ru/).
