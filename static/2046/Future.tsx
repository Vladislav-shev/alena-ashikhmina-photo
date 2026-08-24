import { useEffect, useState } from "react";

const years = [
  { year: 2027, value: "сейчас", title: "Обычный вторник", text: "Вы видите друг друга каждый день — и пока не замечаете, насколько это редкое время." },
  { year: 2032, value: "+5 лет", title: "Первый большой сбор", text: "Встреча назначена за месяц. Но один кадр возвращает класс быстрее любого чата." },
  { year: 2037, value: "+10 лет", title: "Знакомый смех", text: "Города и профессии изменились. Манера смеяться у каждого осталась прежней." },
  { year: 2042, value: "+15 лет", title: "Имена на полях", text: "Тетради потерялись. Подписи, взгляды и свои компании остались внутри альбома." },
  { year: 2047, value: "+20 лет", title: "Архив оживает", text: "Это уже не школьные фотографии. Это координаты места, где вы были вместе." },
];

export default function Future() {
  const [moment, setMoment] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const nodes = [...document.querySelectorAll<HTMLElement>("[data-sync]")];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("synced")), { threshold: .14 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return <main className="future-shell">
    <header className="future-nav">
      <a className="future-logo" href="/"><b>ГЛАВА</b><i>2046</i><span>MEMORY SYSTEM</span></a>
      <nav><a href="#memory">Память</a><a href="#timeline">Время</a><a href="#backup">Копия</a></nav>
      <div className="future-versions"><a href="/kino/">01—03</a><a href="/flash/">Вспышка</a><a className="active" href="/2046/">2046</a><a href="/museum/">Музей</a></div>
    </header>

    <section className="future-hero">
      <img src="/assets/future-hero.webp" alt="Выпускники в светлом футуристическом школьном атриуме" />
      <div className="future-grid" />
      <div className="future-status"><i /> MEMORY CAPTURE ACTIVE <span>11-А / 2027</span></div>
      <div className="future-title"><p>АЛЁНА АШИХМИНА × ЕКАТЕРИНА ЕРОХИНА СОХРАНЯЮТ</p><h1>ВАС.<br /><em>ПОКА ВЫ</em><br />НАСТОЯЩИЕ.</h1><div><b>20</b><span>лет до момента,<br />когда эти кадры<br />станут бесценными</span></div></div>
      <a href="#memory" className="future-enter"><span>Открыть архив</span><b>↘</b></a>
      <div className="future-coords">48.5740° N<br />39.3078° E</div>
    </section>

    <section className="future-data" aria-hidden="true"><span>04 FRIEND GROUPS</span><span>01 CLASS</span><span>∞ INSIDE JOKES</span><span>100% HUMAN</span><span>04 FRIEND GROUPS</span><span>01 CLASS</span></section>

    <section className="future-memory" id="memory">
      <p data-sync>01 / ПАРАДОКС ПАМЯТИ</p>
      <div data-sync><h2>Фотография не<br />останавливает время.<br /><em>Она запускает его.</em></h2><aside>Каждый год этот альбом будет становиться ценнее — без обновлений, подписок и срока хранения.</aside></div>
    </section>

    <section className="future-timeline" id="timeline">
      <div className="future-time-control" data-sync>
        <span>TIME VALUE SIMULATOR</span><h2>{years[moment].year}</h2><b>{years[moment].value}</b>
        <input aria-label="Год просмотра альбома" type="range" min="0" max="4" value={moment} onChange={(event) => setMoment(Number(event.target.value))} />
        <div>{years.map((item) => <small key={item.year}>{item.year}</small>)}</div>
      </div>
      <div className="future-time-card" data-sync>
        <div className="time-card-top"><span>MEMORY_{String(moment + 1).padStart(2, "0")}</span><i>SYNCED ●</i></div>
        <h3>{years[moment].title}</h3><p>{years[moment].text}</p>
        <div className="future-picture"><img key={moment} src={moment < 2 ? "/assets/gallery-classroom.webp" : moment < 4 ? "/assets/gallery-group.webp" : "/assets/album-flatlay.webp"} alt="Фотография класса, ценность которой меняется со временем" /><span>{years[moment].year}</span></div>
      </div>
    </section>

    <section className="future-archive">
      <div className="archive-heading" data-sync><span>02 / СОСТАВ АРХИВА</span><h2>Не файлы.<br /><em>Свидетельства.</em></h2></div>
      <div className="archive-grid">
        <article data-sync><span>PORTRAIT.DNA</span><img src="/assets/gallery-studio.webp" alt="Персональный портрет выпускницы" /><h3>Лицо</h3><p>Не ретушируем человека до неузнаваемости. Сохраняем характер.</p></article>
        <article data-sync><span>SOCIAL.GRAPH</span><img src="/assets/gallery-candid.webp" alt="Друзья в естественной школьной сцене" /><h3>Связи</h3><p>Кто с кем смеялся, сидел и пережил контрольную в понедельник.</p></article>
        <article data-sync><span>PHYSICAL.COPY</span><img src="/assets/album-flatlay.webp" alt="Печатный выпускной альбом" /><h3>Носитель</h3><p>Настоящий предмет. Не потеряется при смене телефона или пароля.</p></article>
      </div>
    </section>

    <section className="future-protocol">
      <div data-sync><span>03 / HUMAN PROTOCOL</span><h2>Технология<br />проста:<br /><em>быть рядом.</em></h2></div>
      <ol><li data-sync><b>01</b><h3>Слушаем</h3><p>Узнаём характер класса и не навязываем чужую роль.</p></li><li data-sync><b>02</b><h3>Наблюдаем</h3><p>Лучший кадр случается, когда команда уже не нужна.</p></li><li data-sync><b>03</b><h3>Печатаем</h3><p>Собираем физическую резервную копию вашей общей жизни.</p></li></ol>
    </section>

    <section className="future-backup" id="backup">
      <div data-sync><span>BACKUP REQUEST</span><h2>Сохранить<br />ваш класс?</h2><p>Оставьте контакт. Алёна и Екатерина покажут полные проекты и предложат точный формат.</p></div>
      {sent ? <div className="future-done"><i>✓</i><b>КОПИЯ СОЗДАНА</b><p>Пока это демонстрация. Перед запуском подключим Telegram, CRM или почту.</p><button onClick={() => setSent(false)}>Новая запись</button></div> : <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
        <label>ИМЯ<input required placeholder="Как к вам обращаться" /></label><label>КЛАСС<select defaultValue="11"><option value="4">4 класс</option><option value="9">9 класс</option><option value="11">11 класс</option></select></label><label>КАНАЛ СВЯЗИ<input required placeholder="Телефон или Telegram" /></label><button>CREATE BACKUP <span>→</span></button>
      </form>}
    </section>

    <footer><a href="/">ГЛАВА / 2046</a><p>Алёна Ашихмина × Екатерина Ерохина · Луганск</p><span>END OF ARCHIVE_</span></footer>
  </main>;
}
