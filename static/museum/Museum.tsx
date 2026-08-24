import { useEffect, useState } from "react";

const works = [
  { number: "I", title: "Портрет", image: "/assets/gallery-studio.webp", caption: "Человек, каким его запомнит класс: со своим взглядом, жестом и характером." },
  { number: "II", title: "Компания", image: "/assets/gallery-candid.webp", caption: "Маленькие союзы внутри большого класса. Не расставляем — наблюдаем." },
  { number: "III", title: "Собрание", image: "/assets/gallery-group.webp", caption: "Общий портрет поколения. Без строя по росту и одинаковых выражений лица." },
];

export default function Museum() {
  const [work, setWork] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const nodes = [...document.querySelectorAll<HTMLElement>("[data-exhibit]")];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("exhibited")), { threshold: .14 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return <main className="museum-shell">
    <header className="museum-nav">
      <a className="museum-logo" href="/"><b>ГЛАВА</b><i>◆</i><span>PRIVATE COLLECTION</span></a>
      <nav><a href="#curator">Куратор</a><a href="#collection">Коллекция</a><a href="#visit">Визит</a></nav>
      <div className="museum-versions"><a href="/kino/">01—03</a><a href="/flash/">Вспышка</a><a href="/2046/">2046</a><a className="active" href="/museum/">Музей</a></div>
    </header>

    <section className="museum-hero">
      <img src="/assets/museum-hero.webp" alt="Современный групповой портрет выпускников в музейном пространстве" />
      <div className="museum-plaque"><span>COLLECTION № 11—А</span><b>2027</b></div>
      <div className="museum-title"><p>АЛЁНА АШИХМИНА × ЕКАТЕРИНА ЕРОХИНА ПРЕДСТАВЛЯЮТ</p><h1>ЧАСТНАЯ<br /><em>КОЛЛЕКЦИЯ</em><br />ВАШЕГО КЛАССА</h1></div>
      <p className="museum-caption">Пять людей. Один момент.<br />Экспонат с неограниченным сроком ценности.</p>
      <a className="museum-ticket" href="#curator"><span>Войти<br />в зал</span><b>↓</b></a>
    </section>

    <section className="museum-curator" id="curator">
      <aside data-exhibit>ЗАЛ I<br />КУРАТОРСКИЙ ТЕКСТ</aside>
      <div data-exhibit><span>Уважаемый посетитель,</span><h2>перед вами люди,<br />которые пока не знают,<br /><em>что уже стали историей.</em></h2><p>Мы привыкли считать школьные годы черновиком взрослой жизни. Но именно сейчас рядом находятся люди, которые видят друг друга каждый день. Эта коллекция создана, чтобы однажды вернуть не лица — ощущение близости.</p><b>Алёна Ашихмина × Екатерина Ерохина <i>авторы и хранители</i></b></div>
    </section>

    <section className="museum-work" id="collection">
      <div className="museum-work-image" data-exhibit><span>CAT. {String(work + 1).padStart(3, "0")}</span><img key={works[work].image} src={works[work].image} alt={works[work].title} /></div>
      <div className="museum-work-copy" data-exhibit>
        <p>ЗАЛ II / ОСНОВНОЕ СОБРАНИЕ</p><div className="work-number">{works[work].number}</div><h2>{works[work].title}</h2><p className="work-caption">{works[work].caption}</p>
        <div className="work-tabs">{works.map((item, index) => <button key={item.title} className={work === index ? "active" : ""} aria-pressed={work === index} onClick={() => setWork(index)}><span>{item.number}</span>{item.title}</button>)}</div>
      </div>
    </section>

    <section className="museum-manifest">
      <div data-exhibit><span>ЗАЛ III / МАНИФЕСТ</span><h2>Не виньетка.<br />Не шаблон.<br /><em>Произведение.</em></h2></div>
      <blockquote data-exhibit>«Через двадцать лет стоимость будет измеряться не рублями, а количеством воспоминаний, которые вернулись за секунду».</blockquote>
    </section>

    <section className="museum-catalogue">
      <div className="catalogue-heading" data-exhibit><span>КАТАЛОГ КОЛЛЕКЦИИ</span><h2>Каждый<br />заслуживает<br /><em>своей стены.</em></h2></div>
      <div className="catalogue-grid">
        <article data-exhibit><div><img src="/assets/gallery-classroom.webp" alt="Выпускники в школьном классе" /></div><span>CAT. 004</span><h3>Среда</h3><p>Школа остаётся узнаваемой, но перестаёт быть скучной декорацией.</p></article>
        <article data-exhibit><div><img src="/assets/alena-ashikhmina.webp" alt="Стилизованный образ фотографа" /></div><span>CAT. 005</span><h3>Авторы</h3><p>Люди за камерой, рядом с которыми не нужно играть чужую роль.</p></article>
        <article data-exhibit><div><img src="/assets/album-flatlay.webp" alt="Печатный выпускной альбом" /></div><span>CAT. 006</span><h3>Объект</h3><p>Печатное издание, которое можно держать, передавать и открывать снова.</p></article>
      </div>
    </section>

    <section className="museum-provenance">
      <div data-exhibit><span>ПРОИСХОЖДЕНИЕ ЭКСПОНАТА</span><h2>От живого дня<br />до личной<br /><em>коллекции.</em></h2></div>
      <ol><li data-exhibit><b>01</b><h3>Знакомство</h3><p>Собираем характер класса, идеи и ограничения.</p></li><li data-exhibit><b>02</b><h3>Съёмка</h3><p>Создаём пространство, где каждый остаётся собой.</p></li><li data-exhibit><b>03</b><h3>Отбор</h3><p>Каждый ученик сам утверждает личный портрет.</p></li><li data-exhibit><b>04</b><h3>Издание</h3><p>Печатаем, проверяем и передаём готовую коллекцию.</p></li></ol>
    </section>

    <section className="museum-visit" id="visit">
      <div data-exhibit><span>PRIVATE VIEWING</span><h2>Заказать<br />частный<br /><em>просмотр.</em></h2><p>Алёна и Екатерина покажут полные альбомы, расскажут о съёмке и рассчитают формат для вашего класса.</p></div>
      {sent ? <div className="museum-done"><span>◆</span><b>ВИЗИТ ЗАПИСАН</b><p>Это демонстрационная форма. Перед рекламным запуском подключим реальную отправку.</p><button onClick={() => setSent(false)}>Записать ещё</button></div> : <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
        <label>ИМЯ ПОСЕТИТЕЛЯ<input required placeholder="Например, Ольга" /></label><label>КЛАСС<select defaultValue="11"><option value="4">4 класс</option><option value="9">9 класс</option><option value="11">11 класс</option></select></label><label>КОНТАКТ<input required placeholder="Телефон или Telegram" /></label><button>ЗАБРОНИРОВАТЬ ПРОСМОТР <span>↗</span></button>
      </form>}
    </section>

    <footer><a href="/">ГЛАВА ◆</a><p>Алёна Ашихмина × Екатерина Ерохина · Луганск · 2027</p><span>Коллекция открыта ежедневно в памяти владельца.</span></footer>
  </main>;
}
