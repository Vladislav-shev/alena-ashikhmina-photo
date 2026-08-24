import { useEffect, useState } from "react";

const covers = {
  "4": ["ПЕРВЫЙ", "БОЛЬШОЙ", "ВЫПУСК"],
  "9": ["МЫ", "МЕНЯЕМ", "ПРАВИЛА"],
  "11": ["ЭТО", "НАШ", "ГОД"],
};

export default function Glianets(){
  const [grade,setGrade]=useState<keyof typeof covers>("11");
  const [sent,setSent]=useState(false);
  useEffect(()=>{const n=[...document.querySelectorAll<HTMLElement>("[data-pop]")];const o=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add("pop")),{threshold:.15});n.forEach(x=>o.observe(x));return()=>o.disconnect()},[]);
  return <main className="gloss-shell">
    <header className="gloss-nav"><a className="gloss-logo" href="/"><b>ГЛАВА</b><span>ISSUE №27</span></a><nav><a href="#cover">Обложка</a><a href="#inside">Внутри</a><a href="#order">Заказать</a></nav><div className="gloss-versions"><a href="/kino/">Кино</a><a className="active" href="/glianets/">Глянец</a><a href="/kapsula/">Капсула</a><a href="/flash/">Ещё ↗</a></div></header>
    <section className="gloss-hero" id="cover">
      <div className="issue-rail"><span>АЛЁНА АШИХМИНА × ЕКАТЕРИНА ЕРОХИНА</span><span>ВЫПУСКНЫЕ АЛЬБОМЫ</span><span>ЛУГАНСК 2027</span></div>
      <div className="cover-card"><img src="/assets/gloss-hero.webp" alt="Выпускники на журнальной фотосессии"/><span className="cover-code">AA / 026</span><span className="cover-price">НЕ ПРОДАЁТСЯ<br/>ОСТАЁТСЯ НАВСЕГДА</span></div>
      <div className="gloss-title"><p>Не альбом. <b>Ваш личный выпуск журнала.</b></p><h1>{covers[grade].map((word,index)=><span key={word} className={`line l${index}`}>{word}</span>)}</h1><div className="grade-pills">{(["4","9","11"] as const).map(item=><button key={item} onClick={()=>setGrade(item)} className={grade===item?"active":""}>{item} класс</button>)}</div></div>
      <div className="gloss-sticker">ТВОЁ<br/><i>ЛИЦО</i><br/>ТВОИ<br/>ПРАВИЛА</div>
      <a className="gloss-scroll" href="#inside">Листать выпуск ↓</a>
    </section>

    <section className="gloss-manifest" data-pop><p>EDITOR'S LETTER</p><h2>Хватит делать вид,<br/>что выпускники —<br/><em>одинаковые.</em></h2><div><b>Мы собираем номер вокруг вашего класса.</b><span>У каждого — своя обложка. У каждой компании — свой разворот. У всего выпуска — единый визуальный нерв.</span></div></section>

    <section className="gloss-grid" id="inside">
      <article className="feature feature-main" data-pop><img src="/assets/gallery-studio.webp" alt="Студийный портрет выпускницы"/><span>BEAUTY / 01</span><h3>Портрет,<br/>который хочется<br/><i>поставить на аватарку.</i></h3></article>
      <article className="feature feature-acid" data-pop><span>GROUP CHAT / 02</span><h3>Ваша компания.<br/>Ваши мемы.<br/><i>Ваш разворот.</i></h3><p>Не мешаем дружбе выглядеть как дружба.</p></article>
      <article className="feature feature-photo" data-pop><img src="/assets/gallery-classroom.webp" alt="Друзья в школьном классе"/><span>REAL LIFE / 03</span></article>
      <article className="feature feature-quote" data-pop><blockquote>«Они впервые не спросили: а можно меня не фотографировать?»</blockquote><p>— классный руководитель,<br/>после съёмки</p></article>
    </section>

    <section className="gloss-pages">
      <div className="pages-title" data-pop><span>104—160</span><h2>Страниц,<br/>где нет<br/><em>случайных</em><br/>людей.</h2></div>
      <div className="page-stack" data-pop><div className="page p1"><img src="/assets/gallery-candid.webp" alt="Репортажная школьная съёмка"/><span>04 / AFTER CLASS</span></div><div className="page p2"><img src="/assets/album-flatlay.webp" alt="Готовый выпускной альбом"/><span>05 / OBJECT OF DESIRE</span></div><div className="page p3"><b>ВАШ<br/>КЛАСС</b><small>НА ОБЛОЖКЕ<br/>2027</small></div></div>
    </section>

    <section className="gloss-order" id="order"><div data-pop><span>SUBSCRIBE TO YOURSELF</span><h2>Следующий<br/>номер — <em>ваш.</em></h2><p>Расскажите, какой у вас класс. Алёна и Екатерина покажут полные альбомы и соберут точный формат.</p></div>{sent?<div className="gloss-done"><b>ВЫ В НОМЕРЕ!</b><p>Пока это демонстрация. Перед запуском подключим реальную отправку.</p><button onClick={()=>setSent(false)}>Заполнить снова</button></div>:<form onSubmit={e=>{e.preventDefault();setSent(true)}}><input required placeholder="Имя"/><input required placeholder="Телефон или Telegram"/><select defaultValue="11"><option value="4">4 класс</option><option value="9">9 класс</option><option value="11">11 класс</option></select><button>Хочу свою обложку ↗</button></form>}</section>
    <footer><b>ГЛАВА<span>●</span></b><p>© 2027 Алёна Ашихмина × Екатерина Ерохина</p><a href="/">Основная версия ↗</a></footer>
  </main>
}
