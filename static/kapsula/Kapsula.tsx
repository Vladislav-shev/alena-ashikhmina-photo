"use client";

import { useEffect, useState } from "react";

const years = [
  {
    year: "2027",
    title: "Сейчас",
    text: "Вы каждый день видите друг друга и думаете, что так будет всегда.",
  },
  {
    year: "2032",
    title: "Через пять лет",
    text: "Кто-то уедет, кто-то изменится, а одна фотография внезапно вернёт знакомый смех.",
  },
  {
    year: "2037",
    title: "Через десять лет",
    text: "Имена учителей начнут забываться. Лица — нет, если сохранить их правильно.",
  },
];

const tariffs = [
  {
    code: "01",
    name: "Первый кадр",
    volume: "3 разворота / 6 страниц",
    price: "3 000 ₽",
    shoots: "1 фотосессия",
    location: "Школа, студия или парк — на выбор",
    cta: "Запечатать первый кадр",
    features: [
      "Ваше фото на обложке",
      "Общая виньетка с портретами всех одноклассников",
      "Разворот с классным руководителем: общее фото класса, отдельный кадр девочек с классным руководителем, отдельный кадр мальчиков с классным руководителем + портрет классного руководителя",
      "Разворот с групповыми фотографиями по 3–5 человек",
    ],
  },
  {
    code: "02",
    name: "На память",
    volume: "5 разворотов / 10 страниц",
    price: "4 700 ₽",
    shoots: "1 фотосессия",
    location: "Школа, студия или парк — на выбор",
    cta: "Сохранить на память",
    features: [
      "Ваше фото на обложке или на первой странице альбома",
      "1–2 разворота с портретами всех одноклассников",
      "Разворот с учителями",
      "Общее фото на весь разворот",
      "1–2 разворота с групповыми фотографиями по 3–5 человек",
    ],
  },
  {
    code: "03",
    name: "Яркие моменты",
    volume: "7 разворотов / 14 страниц",
    price: "5 500 ₽",
    shoots: "2 фотосессии",
    location: "Школа, студия или парк — на выбор",
    cta: "Собрать яркие моменты",
    features: [
      "Ваше фото на обложке или на первой странице альбома",
      "1–2 разворота с портретами всех одноклассников + цитаты по желанию",
      "Разворот с учителями",
      "Общее фото на весь разворот",
      "2–3 разворота с групповыми фотографиями по 3–5 человек",
    ],
  },
  {
    code: "04",
    name: "Вся история",
    volume: "10 разворотов / 20 страниц",
    price: "7 500 ₽",
    shoots: "3 фотосессии",
    location: "Школа, студия или парк — на выбор",
    cta: "Запечатать всю историю",
    featured: true,
    features: [
      "Индивидуальный разворот: портрет на всю страницу + 2 фотографии с друзьями на ваш выбор",
      "1–2 разворота с портретами всех одноклассников + цитаты по желанию",
      "Разворот с учителями",
      "Общее фото на весь разворот",
      "3–5 разворотов с групповыми фотографиями по 3–5 человек",
    ],
  },
  {
    code: "05",
    name: "Специальный выпуск",
    volume: "15–18 разворотов / 30–36 страниц",
    price: "9 000–12 000 ₽",
    shoots: "2 фотосессии",
    location: "Школа, студия или парк — на выбор",
    cta: "Создать специальный выпуск",
    premium: true,
    intro: "Самый премиальный формат: каждый ученик становится главным героем собственного глянцевого выпуска.",
    features: [
      "Ваше фото на обложке — как у настоящего глянцевого журнала",
      "Отдельная страница для каждого ученика: фотография во всю страницу, мысли, цитата и пожелания друзьям",
      "Разворот с учителями",
      "Общее фото на весь разворот",
      "2–3 разворота с групповыми фотографиями по 3–5 человек",
    ],
  },
];

const contacts = [
  { name: "Алёна Ашихмина", phone: "+7 (959) 123-68-76", href: "tel:+79591236876" },
  { name: "Екатерина Ерохина", phone: "+7 (959) 162-18-07", href: "tel:+79591621807" },
];

export default function Kapsula() {
  const [memory, setMemory] = useState(0);
  const [selectedTariff, setSelectedTariff] = useState("Вся история");

  useEffect(() => {
    const elements = [...document.querySelectorAll<HTMLElement>("[data-rise]")];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("rise")),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const chooseTariff = (name: string) => {
    setSelectedTariff(name);
    document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="capsule-shell">
      <header className="capsule-nav">
        <a href="#top" className="capsule-logo" aria-label="Капсула — на главную">
          КАПСУЛА<i>✦</i><span>архив чувств</span>
        </a>
        <nav aria-label="Основная навигация">
          <a href="#letter">Идея</a>
          <a href="#tariffs">Тарифы</a>
          <a href="#process">Как проходит</a>
          <a href="#contacts">Контакты</a>
        </nav>
        <a className="capsule-nav-cta" href="#tariffs">Выбрать тариф <span>↓</span></a>
      </header>

      <section className="capsule-hero" id="top">
        <div className="capsule-number">КОЛЛЕКЦИЯ 2027 · ЛУГАНСК И ОБЛАСТЬ</div>
        <img src="/assets/archive-hero.webp" alt="Друзья после уроков в тёплом вечернем свете" />
        <div className="capsule-title">
          <p>Выпускной альбом как капсула времени<br />для тех, кто пока ещё рядом.</p>
          <h1>Однажды<br />это станет<br /><em>бесценным.</em></h1>
          <a href="#tariffs" className="hero-tariff-link">Выбрать свою капсулу <span>↘</span></a>
        </div>
        <div className="capsule-note">сезон<br /><b>2027</b><span>открыть через 10 лет</span></div>
        <a href="#letter" className="capsule-arrow" aria-label="Читать дальше">↓</a>
      </section>

      <section className="capsule-letter" id="letter" data-rise>
        <aside>Луганск<br />выпуск 2027</aside>
        <div>
          <span>Дорогой будущий ты,</span>
          <h2>сейчас тебе кажется,<br />что всё самое важное<br /><em>ещё впереди.</em></h2>
          <p>Но прямо сейчас рядом сидят люди, которые знают твой смех, почерк, любимую парту и то, кем ты хотел стать. Мы сохраняем не внешность. Мы сохраняем это чувство — «мы вместе».</p>
          <b>Алёна Ашихмина и Екатерина Ерохина<br /><i>фотографы ваших настоящих историй</i></b>
        </div>
      </section>

      <section className="capsule-objects" aria-label="Школьные воспоминания">
        <div className="object-photo op1" data-rise>
          <img src="/assets/gallery-candid.webp" alt="Живой кадр выпускников на перемене" />
          <span>перемена, которую никто не планировал</span>
        </div>
        <div className="object-quote" data-rise>«Сфотографируйте<br />нас такими,<br /><em>как есть</em>»</div>
        <div className="object-photo op2" data-rise>
          <img src="/assets/gallery-group.webp" alt="Компания школьных друзей" />
          <span>те самые люди</span>
        </div>
        <div className="tape tape1">НЕ ЗАБУДЬ</div>
        <div className="tape tape2">ВАШ КЛАСС / 2027</div>
      </section>

      <section className="capsule-tariffs" id="tariffs">
        <div className="tariffs-heading" data-rise>
          <div>
            <span>ПЯТЬ СПОСОБОВ СОХРАНИТЬ ВАШУ ИСТОРИЮ</span>
            <h2>Выберите тариф<br /><em>для себя.</em></h2>
          </div>
          <p>Стоимость актуальна при заказе от 15 альбомов. При меньшем количестве условия обсуждаются отдельно.</p>
        </div>
        <div className="tariff-list">
          {tariffs.map((tariff) => (
            <article
              key={tariff.name}
              className={`tariff-card${tariff.featured ? " tariff-card-featured" : ""}${tariff.premium ? " tariff-card-premium" : ""}`}
              data-rise
            >
              <div className="tariff-card-top">
                <span>{tariff.code} / 05</span>
                {tariff.featured && <b>оптимальный формат</b>}
                {tariff.premium && <b>premium edition</b>}
              </div>
              <div className="tariff-card-title">
                <div>
                  <p>Тариф</p>
                  <h3>{tariff.name}</h3>
                </div>
                <strong>{tariff.price}</strong>
              </div>
              <div className="tariff-meta">
                <span>{tariff.volume}</span>
                <span>{tariff.shoots}</span>
              </div>
              {tariff.intro && <p className="tariff-intro">{tariff.intro}</p>}
              <ul>
                {tariff.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <div className="tariff-location"><span>Локации</span><p>{tariff.location}</p></div>
              <button type="button" onClick={() => chooseTariff(tariff.name)}>
                {tariff.cta} <span>→</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="capsule-timeline" id="timeline">
        <div className="timeline-left" data-rise>
          <span>ЭФФЕКТ ВРЕМЕНИ</span>
          <h2>{years[memory].year}</h2>
          <p>Переместите время — и смысл одной и той же фотографии изменится.</p>
          <input aria-label="Год воспоминания" type="range" min="0" max="2" value={memory} onChange={(event) => setMemory(Number(event.target.value))} />
          <div><span>сейчас</span><span>+5 лет</span><span>+10 лет</span></div>
        </div>
        <div className="timeline-card" data-rise>
          <span>0{memory + 1} / 03</span>
          <h3>{years[memory].title}</h3>
          <p>{years[memory].text}</p>
          <div className="timeline-picture">
            <img src={memory === 0 ? "/assets/gallery-classroom.webp" : memory === 1 ? "/assets/album-flatlay.webp" : "/assets/gallery-candid.webp"} alt="Фотография как воспоминание" />
          </div>
        </div>
      </section>

      <section className="capsule-how" id="process">
        <div className="how-title" data-rise><span>КАК МЫ СОХРАНЯЕМ</span><h2>Не лица.<br /><em>Связи.</em></h2></div>
        <div className="how-list">
          <article data-rise><b>01</b><h3>Знакомимся</h3><p>Узнаём, кто с кем дружит, что для класса важно и над чем вы смеётесь.</p></article>
          <article data-rise><b>02</b><h3>Снимаем</h3><p>Помогаем чувствовать себя уверенно, но оставляем место живым эмоциям.</p></article>
          <article data-rise><b>03</b><h3>Собираем</h3><p>Соединяем портреты, компании, учителей и детали в одну цельную историю.</p></article>
          <article data-rise><b>04</b><h3>Печатаем</h3><p>Создаём вещь, которую можно держать в руках и однажды открыть снова.</p></article>
        </div>
      </section>

      <section className="capsule-contacts" id="contacts">
        <div className="contacts-copy" data-rise>
          <span>ДАТА ЗАКРЫТИЯ КАПСУЛЫ</span>
          <h2>Пока все<br />ещё рядом —<br /><em>успейте.</em></h2>
          <p>Работаем в Луганске и области. Позвоните — покажем полные альбомы, обсудим ваш класс и спокойно подберём формат.</p>
          <div className="selected-tariff" aria-live="polite"><small>Вы выбрали</small><b>Тариф «{selectedTariff}»</b></div>
        </div>
        <div className="contact-cards" data-rise>
          {contacts.map((contact, index) => (
            <article key={contact.phone}>
              <span>0{index + 1} / ФОТОГРАФ</span>
              <h3>{contact.name}</h3>
              <a href={contact.href}>{contact.phone}<i>↗</i></a>
              <p>Нажмите на номер, чтобы позвонить</p>
            </article>
          ))}
          <div className="contact-location"><span>ГЕОГРАФИЯ</span><strong>Луганск<br />и область</strong></div>
        </div>
      </section>

      <footer>
        <a href="#top">КАПСУЛА<i>✦</i></a>
        <p>Алёна Ашихмина · Екатерина Ерохина<br />Луганск и область · 2027</p>
        <span>Сделано, чтобы не забыть.</span>
      </footer>
    </main>
  );
}
