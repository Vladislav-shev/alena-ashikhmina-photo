import { useEffect, useState } from "react";

const scenes = [
  { image: "/assets/cinema-hero.webp", code: "SC.01", title: "Последний учебный день", text: "Никаких команд «улыбнулись». Камера просто остаётся рядом, пока происходит настоящее." },
  { image: "/assets/gallery-candid.webp", code: "SC.02", title: "Между дублями", text: "Лучшие кадры случаются в секунду, когда все перестают стараться хорошо получиться." },
  { image: "/assets/gallery-group.webp", code: "SC.03", title: "Финальные титры", text: "Большой общий кадр — тот самый, который через десять лет соберёт всех обратно." },
];

export default function Kino() {
  const [scene, setScene] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const nodes = [...document.querySelectorAll<HTMLElement>("[data-in]")];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("shown")), { threshold: .16 });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return <main className="kino-shell">
    <header className="kino-nav">
      <a className="kino-logo" href="/"><b>ГЛАВА</b><i>●</i><span>director's cut</span></a>
      <nav><a href="#trailer">Трейлер</a><a href="#scenes">Сцены</a><a href="#contact">Съёмка</a></nav>
      <div className="version-switch"><a className="active" href="/kino/">Кино</a><a href="/glianets/">Глянец</a><a href="/kapsula/">Капсула</a></div>
    </header>

    <section className="kino-hero" id="trailer">
      <img src="/assets/cinema-hero.webp" alt="Выпускники в кинематографичной школьной сцене" />
      <div className="kino-grade">11 <span>класс</span></div>
      <div className="kino-hero-copy">
        <p><span>Алёна Ашихмина представляет</span><b>Луганск · 2026</b></p>
        <h1>Ваш класс.<br /><em>Главные роли.</em></h1>
        <div className="kino-intro"><b>Не фотосессия.</b><span>Полнометражная история про людей, с которыми вы выросли.</span></div>
      </div>
      <a className="kino-play" href="#scenes"><span>▶</span><b>Смотреть<br />историю</b></a>
      <div className="kino-bars"><span /><span /><span /><span /><span /><span /><span /><span /></div>
    </section>

    <section className="kino-statement" data-in>
      <p className="kino-label">LOGLINE / 001</p>
      <h2>Одна школа.<br />Один класс.<br /><em>Тысяча моментов,</em><br />которые нельзя переснять.</h2>
      <aside>Поэтому мы не строим вас в ряд. Мы снимаем, как вы спорите, смеётесь, опаздываете и держитесь друг за друга.</aside>
    </section>

    <section className="kino-scenes" id="scenes">
      <div className="kino-scene-image" data-in><img key={scenes[scene].image} src={scenes[scene].image} alt={scenes[scene].title} /><div>REC <i /> 00:0{scene + 1}:24</div></div>
      <div className="kino-scene-copy" data-in>
        <p className="kino-label">SELECTED SCENES / 0{scene + 1}</p>
        <h2>{scenes[scene].title}</h2><p>{scenes[scene].text}</p>
        <div className="scene-tabs">{scenes.map((item, index) => <button className={scene === index ? "active" : ""} onClick={() => setScene(index)} key={item.code}><span>{item.code}</span><b>{item.title}</b></button>)}</div>
      </div>
    </section>

    <section className="kino-cast">
      <div className="kino-cast-heading" data-in><p className="kino-label">THE CAST / ВСЕ НА СВОИХ МЕСТАХ</p><h2>Ни одного<br /><em>второстепенного</em><br />героя.</h2></div>
      <div className="kino-cast-grid">
        <article data-in><span>01</span><h3>Портрет</h3><p>Кадр, где человек узнаёт себя — уверенного, живого, настоящего.</p></article>
        <article data-in><span>02</span><h3>Компания</h3><p>Ваши шутки, свои микрогруппы и тот самый хаос между уроками.</p></article>
        <article data-in><span>03</span><h3>Весь класс</h3><p>Финальная сцена сезона. Без строя по росту и пластиковых улыбок.</p></article>
      </div>
    </section>

    <section className="kino-contact" id="contact">
      <div data-in><p className="kino-label">START PRODUCTION</p><h2>Ваш фильм уже<br />начался.<br /><em>Сохраним?</em></h2></div>
      {sent ? <div className="kino-success"><b>ЗАЯВКА В КАДРЕ</b><p>Это демо-форма. Подключим Telegram или CRM перед рекламным запуском.</p><button onClick={() => setSent(false)}>Ещё дубль</button></div> : <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
        <label>Ваше имя<input required placeholder="Например, Ольга" /></label>
        <label>Класс<select defaultValue="11"><option value="4">4 класс</option><option value="9">9 класс</option><option value="11">11 класс</option></select></label>
        <label>Телефон / Telegram<input required placeholder="+7 959 000-00-00" /></label>
        <button>Запустить съёмку <span>↗</span></button>
      </form>}
    </section>
    <footer><b>ГЛАВА<span>●</span></b><p>Алёна Ашихмина · выпускные истории</p><a href="/">Основная версия ↗</a></footer>
  </main>;
}
