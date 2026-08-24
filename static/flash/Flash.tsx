import { useEffect, useRef, useState, type PointerEvent } from "react";

const moods = [
  { level: "00", title: "Тише не будет.", note: "Начинаем спокойно. Через пять минут камера уже никого не смущает." },
  { level: "50", title: "Не моргай.", note: "Тот самый момент, когда все перестали позировать и стали собой." },
  { level: "100", title: "Это наш момент.", note: "Громко, близко, честно. Ни одного кадра из школьного шаблона." },
];

export default function Flash() {
  const [mood, setMood] = useState(1);
  const [sent, setSent] = useState(false);
  const hero = useRef<HTMLElement>(null);

  useEffect(() => {
    const nodes = [...document.querySelectorAll<HTMLElement>("[data-flash-in]")];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("flash-in")), { threshold: .14 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const move = (event: PointerEvent<HTMLElement>) => {
    if (!hero.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = hero.current.getBoundingClientRect();
    hero.current.style.setProperty("--fx", `${((event.clientX - box.left) / box.width - .5) * 18}px`);
    hero.current.style.setProperty("--fy", `${((event.clientY - box.top) / box.height - .5) * 12}px`);
  };

  return <main className={`flash-shell mood-${mood}`}>
    <header className="flash-nav">
      <a className="flash-logo" href="/"><b>ГЛАВА</b><i>⚡</i><span>FLASH CUT</span></a>
      <nav><a href="#signal">Сигнал</a><a href="#frames">Кадры</a><a href="#start">Старт</a></nav>
      <div className="flash-versions"><a href="/kino/">01—03</a><a className="active" href="/flash/">Вспышка</a><a href="/2046/">2046</a><a href="/museum/">Музей</a></div>
    </header>

    <section className="flash-hero" ref={hero} onPointerMove={move}>
      <img src="/assets/flash-hero.webp" alt="Выпускники на яркой съёмке с прямой вспышкой" />
      <div className="flash-noise" />
      <p className="flash-kicker"><b>Алёна Ашихмина × Екатерина Ерохина</b><span>Луганск / выпуск 2027</span></p>
      <h1><span>{moods[mood].title.split(" ").slice(0, -1).join(" ") || "НЕ"}</span><em>{moods[mood].title.split(" ").at(-1)}</em></h1>
      <p className="flash-note">{moods[mood].note}</p>
      <div className="flash-meter" aria-label="Настроение съёмки">
        <span>ENERGY</span>
        {moods.map((item, index) => <button key={item.level} className={mood === index ? "active" : ""} aria-pressed={mood === index} onClick={() => setMood(index)}><i />{item.level}</button>)}
      </div>
      <a className="flash-jump" href="#signal"><span>↓</span>Лови момент</a>
    </section>

    <section className="flash-signal" id="signal">
      <div className="flash-index" data-flash-in>00:00:01<br />REC ●</div>
      <div data-flash-in><p>МЫ НЕ СНИМАЕМ «КАК ПОЛОЖЕНО».</p><h2>Мы включаем<br />камеру — и<br /><em>случается жизнь.</em></h2></div>
      <aside data-flash-in>Не надо уметь позировать. Не надо репетировать улыбку. Надо просто прийти всем классом.</aside>
    </section>

    <section className="flash-frames" id="frames">
      <article className="flash-frame f1" data-flash-in><img src="/assets/gallery-candid.webp" alt="Живой кадр на перемене" /><span>01 / НЕ ПО ПЛАНУ</span><h3>Смех<br />между<br />дублями</h3></article>
      <article className="flash-frame f2" data-flash-in><b>NO<br />BAD<br />ANGLES</b><p>Покажем, куда деть руки. Всё остальное сделаете вы — просто общаясь друг с другом.</p></article>
      <article className="flash-frame f3" data-flash-in><img src="/assets/gallery-studio.webp" alt="Портрет выпускницы с характером" /><span>02 / ЛИЧНЫЙ КАДР</span><div>Аватарка<br />на годы</div></article>
      <article className="flash-frame f4" data-flash-in><img src="/assets/gallery-group.webp" alt="Компания друзей на выпускной съёмке" /><span>03 / СВОИ ЛЮДИ</span></article>
    </section>

    <section className="flash-take">
      <div className="take-line">ONE CLASS <i>×</i> ONE DAY <i>×</i> NO REHEARSAL <i>×</i> ONE CLASS <i>×</i> ONE DAY <i>×</i> NO REHEARSAL <i>×</i></div>
      <div className="take-copy" data-flash-in><p>FINAL TAKE / 11A</p><h2>Альбом, который<br />не придётся<br /><em>прятать.</em></h2><ul><li>каждый выбирает свой портрет</li><li>компании снимаем компаниями</li><li>макет согласуем до печати</li></ul></div>
    </section>

    <section className="flash-start" id="start">
      <div data-flash-in><span>READY?</span><h2>Включаем<br /><em>вспышку?</em></h2><p>Алёна и Екатерина покажут полные съёмки и помогут собрать формат под ваш класс.</p></div>
      {sent ? <div className="flash-done"><b>СНЯТО!</b><p>Это демонстрация формы. Перед рекламой подключим реальную отправку заявок.</p><button onClick={() => setSent(false)}>Ещё дубль</button></div> : <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
        <label>ИМЯ<input required placeholder="Например, Ольга" /></label>
        <label>КЛАСС<select defaultValue="11"><option value="4">4 класс</option><option value="9">9 класс</option><option value="11">11 класс</option></select></label>
        <label>ТЕЛЕФОН / TELEGRAM<input required placeholder="+7 959 000-00-00" /></label>
        <button>ЗАБРОНИРОВАТЬ ДЕНЬ <span>↗</span></button>
      </form>}
    </section>

    <footer><a href="/">ГЛАВА⚡</a><p>Алёна Ашихмина × Екатерина Ерохина · выпускные истории</p><a href="/">Основная версия ↗</a></footer>
  </main>;
}
