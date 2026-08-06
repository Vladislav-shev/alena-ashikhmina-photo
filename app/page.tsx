"use client";

import { useEffect, useRef, useState, type FormEvent, type PointerEvent as ReactPointerEvent } from "react";

type Grade = "4" | "9" | "11";

const gradeCopy: Record<Grade, { eyebrow: string; line: string }> = {
  "4": {
    eyebrow: "Первая большая глава",
    line: "Лёгкие, живые кадры и немного игры — чтобы дети оставались детьми.",
  },
  "9": {
    eyebrow: "Время, когда всё меняется",
    line: "Больше характера, свободы и настоящих эмоций — без школьных клише.",
  },
  "11": {
    eyebrow: "Финальный сезон",
    line: "Съёмка как для обложки журнала и альбом, который хочется пересматривать.",
  },
};

const packages = [
  {
    name: "Короткая история",
    tag: "01",
    shoots: "1 съёмочный день",
    price: "от 3 000 ₽",
    description: "Портрет, класс и самое важное — в лаконичном альбоме без визуального шума.",
    features: ["Персональная обложка", "Общая виньетка", "2 групповых разворота", "Все фото в электронном виде"],
  },
  {
    name: "Главная глава",
    tag: "02",
    shoots: "1 съёмочный день",
    price: "от 3 700 ₽",
    description: "Полноценная история класса: от личных портретов до большой общей фотографии.",
    features: ["Персональная обложка", "Учителя и классный руководитель", "4 групповых разворота", "Выбор портрета самим учеником"],
    featured: true,
  },
  {
    name: "Два эпизода",
    tag: "03",
    shoots: "школа + студия",
    price: "от 4 900 ₽",
    description: "Две разные атмосферы в одном альбоме: живой школьный день и журнальная студийная съёмка.",
    features: ["2 съёмочных дня", "До 9 разворотов", "Школа и фотостудия", "Расширенная электронная галерея"],
  },
];

const gallery = [
  { src: "/assets/gallery-classroom.webp", alt: "Живая съёмка выпускников в классе", label: "Школа как декорация", className: "gallery-a" },
  { src: "/assets/gallery-studio.webp", alt: "Студийный портрет выпускницы", label: "Портрет с характером", className: "gallery-b" },
  { src: "/assets/gallery-group.webp", alt: "Друзья на выпускной фотосессии", label: "Свои люди", className: "gallery-c" },
  { src: "/assets/gallery-candid.webp", alt: "Репортажный кадр школьного дня", label: "Между дублями", className: "gallery-d" },
];

const faqs = [
  ["Что, если кто-то плохо получился?", "Каждый ученик сам выбирает портрет для альбома. Если кадр не нравится, спокойно переснимаем — без споров и доплат за один повторный портрет."],
  ["Сколько длится съёмка?", "Обычно 3–5 часов на один класс. Мы заранее составляем тайминг, чтобы не срывать уроки и не превращать день в марафон ожидания."],
  ["Можно выбрать дизайн и локацию?", "Да. До съёмки класс выбирает настроение, одежду и места. Дизайн согласовываем до печати, поэтому итог не становится сюрпризом."],
  ["Когда будут готовы альбомы?", "Точный срок фиксируем в договоре после выбора формата. Сначала вы получаете электронное согласование, и только после него альбомы уходят в печать."],
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [grade, setGrade] = useState<Grade>("11");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<(typeof gallery)[number] | null>(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [sent, setSent] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && activeImage && setActiveImage(null);
    window.addEventListener("keydown", close);
    document.body.style.overflow = activeImage || menuOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [activeImage, menuOpen]);

  const handleHeroMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!heroRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = heroRef.current.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    heroRef.current.style.setProperty("--move-x", `${x * 12}px`);
    heroRef.current.style.setProperty("--move-y", `${y * 12}px`);
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main>
      <header className="site-header">
        <a className="logo" href="#top" aria-label="Глава — на главную">
          ГЛАВА<span>•</span>
        </a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="#gallery">Истории</a>
          <a href="#albums">Альбомы</a>
          <a href="#about">Фотограф</a>
        </nav>
        <a className="header-cta" href="#contact">Обсудить съёмку <ArrowIcon /></a>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Открыть меню">
          <span /> <span />
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Меню">
          <button type="button" onClick={() => setMenuOpen(false)} aria-label="Закрыть меню">×</button>
          {["gallery", "albums", "about", "contact"].map((id, index) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              <small>0{index + 1}</small>{["Истории", "Альбомы", "Фотограф", "Контакты"][index]}
            </a>
          ))}
        </div>
      )}

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Выпускные альбомы • Луганск</p>
          <h1>
            Школьные годы<br />
            не должны выглядеть<br />
            <em>школьно.</em>
          </h1>
          <div className="hero-bottom">
            <p>Снимаем ваш класс как героев любимого сериала. Живо, честно и без одинаковых улыбок по команде.</p>
            <a className="circle-link" href="#gallery" aria-label="Смотреть истории">
              <span>Смотреть<br />истории</span><ArrowIcon />
            </a>
          </div>
        </div>

        <div className="hero-visual" ref={heroRef} onPointerMove={handleHeroMove}>
          <img src="/assets/hero-school.webp" alt="Выпускники на современной школьной фотосессии" />
          <div className="hero-stamp">
            <strong>11</strong>
            <span>класс<br />как он есть</span>
          </div>
          <div className="hero-note">Не позируйте.<br />Просто будьте собой.</div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div>БЕЗ НАТЯНУТЫХ УЛЫБОК <i>✦</i> БЕЗ СКУЧНЫХ ШАБЛОНОВ <i>✦</i> ЗАТО НАВСЕГДА <i>✦</i> БЕЗ НАТЯНУТЫХ УЛЫБОК <i>✦</i> БЕЗ СКУЧНЫХ ШАБЛОНОВ <i>✦</i> ЗАТО НАВСЕГДА <i>✦</i></div>
      </div>

      <section className="manifest section-pad" data-reveal>
        <div className="section-index">01 / Манифест</div>
        <div className="manifest-copy">
          <p className="lead">Однажды прозвенит последний звонок.</p>
          <p>Забудется расписание, потеряются переписки, а эти люди разъедутся по разным городам.</p>
          <p className="accent-line">Поэтому мы снимаем не «выпускной альбом». Мы сохраняем вашу общую главу.</p>
        </div>
        <div className="scribble">не идеальные —<br />настоящие</div>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="gallery-heading section-pad" data-reveal>
          <div>
            <div className="section-index light">02 / Истории</div>
            <h2>Кадры, в которых<br /><em>слышен смех</em></h2>
          </div>
          <p>Наведи, открой, почувствуй. Каждая съёмка строится вокруг характера конкретного класса, а не готового шаблона.</p>
        </div>
        <div className="gallery-grid section-pad">
          {gallery.map((image, index) => (
            <button
              className={`gallery-card ${image.className}`}
              key={image.src}
              type="button"
              onClick={() => setActiveImage(image)}
              data-reveal
              aria-label={`Открыть фото: ${image.label}`}
            >
              <img src={image.src} alt={image.alt} />
              <span className="gallery-number">0{index + 1}</span>
              <span className="gallery-label">{image.label}</span>
              <span className="gallery-open">+</span>
            </button>
          ))}
        </div>
      </section>

      {activeImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={activeImage.label} onClick={() => setActiveImage(null)}>
          <button type="button" onClick={() => setActiveImage(null)} aria-label="Закрыть фото">×</button>
          <img src={activeImage.src} alt={activeImage.alt} onClick={(event) => event.stopPropagation()} />
          <p>{activeImage.label}</p>
        </div>
      )}

      <section className="albums section-pad" id="albums">
        <div className="albums-top" data-reveal>
          <div className="section-index">03 / Форматы</div>
          <h2>Сначала выберите<br /><em>свою главу</em></h2>
          <div className="grade-switch" aria-label="Выберите класс">
            {(["4", "9", "11"] as Grade[]).map((item) => (
              <button type="button" className={grade === item ? "active" : ""} onClick={() => setGrade(item)} key={item}>
                {item} класс
              </button>
            ))}
          </div>
          <div className="grade-copy" key={grade}>
            <strong>{gradeCopy[grade].eyebrow}</strong>
            <span>{gradeCopy[grade].line}</span>
          </div>
        </div>

        <div className="package-grid">
          {packages.map((item) => (
            <article className={`package-card ${item.featured ? "featured" : ""}`} key={item.name} data-reveal>
              {item.featured && <div className="popular">Выбирают чаще</div>}
              <div className="package-tag">{item.tag}</div>
              <h3>{item.name}</h3>
              <p className="shoots">{item.shoots}</p>
              <p className="package-description">{item.description}</p>
              <ul>
                {item.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <div className="package-bottom">
                <strong>{item.price}</strong>
                <a href="#contact" aria-label={`Узнать о формате ${item.name}`}><ArrowIcon /></a>
              </div>
            </article>
          ))}
        </div>
        <p className="price-note">Демо‑цены для макета. Финальные форматы и стоимость заменим перед запуском.</p>
      </section>

      <section className="album-story">
        <div className="album-image" data-reveal>
          <img src="/assets/album-flatlay.webp" alt="Премиальный выпускной альбом на столе" />
          <span>Тактильный.<br />Настоящий.</span>
        </div>
        <div className="album-copy section-pad" data-reveal>
          <div className="section-index light">04 / В деталях</div>
          <h2>Альбом, который<br />не живёт <em>в шкафу</em></h2>
          <div className="detail-list">
            <div><strong>01</strong><p><b>Без шаблонного дизайна</b><span>Вёрстка поддерживает фотографии, а не спорит с ними.</span></p></div>
            <div><strong>02</strong><p><b>Вы сами выбираете портрет</b><span>Показываем материал и ничего не решаем за вас.</span></p></div>
            <div><strong>03</strong><p><b>Согласование до печати</b><span>Имена, кадры и детали проверяются заранее.</span></p></div>
          </div>
        </div>
      </section>

      <section className="process section-pad">
        <div className="process-heading" data-reveal>
          <div className="section-index">05 / Всё спокойно</div>
          <h2>От первого сообщения<br />до коробки альбомов</h2>
        </div>
        <div className="process-grid">
          {[
            ["Знакомимся", "Понимаем класс, бюджет и желаемое настроение."],
            ["Готовим", "Выбираем идею, локации, одежду и удобный день."],
            ["Снимаем", "Помогаем с позами, но оставляем место настоящему."],
            ["Согласуем", "Вы выбираете портреты и проверяете макет до печати."],
          ].map((step, index) => (
            <article key={step[0]} data-reveal>
              <span>0{index + 1}</span>
              <h3>{step[0]}</h3>
              <p>{step[1]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about section-pad" id="about">
        <div className="about-photo" data-reveal>
          <img src="/assets/alena-ashikhmina.webp" alt="Фотограф Алёна Ашихмина" />
          <div className="placeholder-label">Алёна Ашихмина • фотограф</div>
        </div>
        <div className="about-copy" data-reveal>
          <div className="section-index">06 / За камерой</div>
          <p className="about-kicker">Привет, я — <span>Алёна Ашихмина</span></p>
          <h2>Не заставляю<br />улыбаться.<br /><em>Рассмешу.</em></h2>
          <p>Мне важно, чтобы на съёмке никто не чувствовал себя «нефотогеничным». Я нахожу подход к тихим, громким, серьёзным и тем, кто пришёл только потому, что уговорил класс.</p>
          <p>В итоге каждый узнаёт себя — только чуть увереннее и красивее.</p>
          <a href="#contact">Познакомиться до съёмки <ArrowIcon /></a>
        </div>
      </section>

      <section className="faq section-pad">
        <div className="faq-title" data-reveal>
          <div className="section-index">07 / Без неловких вопросов</div>
          <h2>О чём обычно<br />спрашивают</h2>
        </div>
        <div className="faq-list" data-reveal>
          {faqs.map(([question, answer], index) => (
            <article className={openFaq === index ? "open" : ""} key={question}>
              <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>
                <span>0{index + 1}</span>{question}<i>{openFaq === index ? "−" : "+"}</i>
              </button>
              <div aria-hidden={openFaq !== index}><p>{answer}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="contact-copy" data-reveal>
          <div className="section-index light">08 / Ваша очередь</div>
          <h2>Следующая глава<br />может быть <em>вашей</em></h2>
          <p>Оставьте контакт — обсудим класс, покажем полные альбомы и посчитаем точную стоимость без обязательств.</p>
          <div className="contact-meta">
            <span>Луганск и область</span>
            <span>+7 (959) 000-00-00</span>
          </div>
        </div>
        <form onSubmit={submitForm} className={sent ? "sent" : ""} data-reveal>
          {sent ? (
            <div className="success-message" role="status" aria-live="polite">
              <span>✓</span>
              <h3>Заявка выглядит именно так.</h3>
              <p>Сейчас это демонстрация. Перед запуском подключим Telegram, CRM или почту — куда удобнее.</p>
              <button type="button" onClick={() => setSent(false)}>Заполнить ещё раз</button>
            </div>
          ) : (
            <>
              <label><span>Как вас зовут?</span><input name="name" required placeholder="Например, Ольга" /></label>
              <label><span>Какой класс?</span>
                <select name="grade" defaultValue="11 класс">
                  <option>4 класс</option><option>9 класс</option><option>11 класс</option><option>Детский сад</option><option>Другое</option>
                </select>
              </label>
              <label><span>Телефон или Telegram</span><input name="contact" required placeholder="+7 999 000-00-00" /></label>
              <button className="submit-button" type="submit">Обсудить альбом <ArrowIcon /></button>
              <small>Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.</small>
            </>
          )}
        </form>
      </section>

      <footer>
        <a className="logo footer-logo" href="#top">ГЛАВА<span>•</span></a>
        <p>Выпускные истории без школьных клише</p>
        <div>
          <a href="#albums">Альбомы</a>
          <a href="#gallery">Портфолио</a>
          <a href="/kino/">Кино</a>
          <a href="/glianets/">Глянец</a>
          <a href="/kapsula/">Капсула</a>
          <a href="/flash/">Вспышка</a>
          <a href="/2046/">2046</a>
          <a href="/museum/">Музей</a>
          <a href="#contact">Контакты</a>
        </div>
        <span>© 2026 • Алёна Ашихмина</span>
      </footer>
    </main>
  );
}
