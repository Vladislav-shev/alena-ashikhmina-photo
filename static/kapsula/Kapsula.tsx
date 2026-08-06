import { useEffect, useState } from "react";

const years=[{year:"2026",title:"Сейчас",text:"Вы каждый день видите друг друга и думаете, что так будет всегда."},{year:"2031",title:"Через пять лет",text:"Кто-то уедет, кто-то изменится, а одна фотография внезапно вернёт знакомый смех."},{year:"2036",title:"Через десять",text:"Имена учителей начнут забываться. Лица — нет, если сохранить их правильно."}];

export default function Kapsula(){
 const [memory,setMemory]=useState(0);const[sent,setSent]=useState(false);
 useEffect(()=>{const n=[...document.querySelectorAll<HTMLElement>("[data-rise]")];const o=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("rise")),{threshold:.15});n.forEach(x=>o.observe(x));return()=>o.disconnect()},[]);
 return <main className="capsule-shell">
  <header className="capsule-nav"><a href="/" className="capsule-logo">ГЛАВА<i>✦</i><span>архив чувств</span></a><nav><a href="#letter">Письмо</a><a href="#timeline">Время</a><a href="#save">Сохранить</a></nav><div className="capsule-versions"><a href="/kino/">Кино</a><a href="/glianets/">Глянец</a><a className="active" href="/kapsula/">Капсула</a><a href="/flash/">Ещё ↗</a></div></header>
  <section className="capsule-hero">
   <div className="capsule-number">№ 2026—11A</div><img src="/assets/archive-hero.webp" alt="Друзья после уроков в тёплом вечернем свете"/>
   <div className="capsule-title"><p>Капсула времени для тех,<br/>кто пока ещё рядом.</p><h1>Однажды<br/>это станет<br/><em>бесценным.</em></h1></div>
   <div className="capsule-note">открыть<br/>через<br/><b>10 лет</b></div>
   <a href="#letter" className="capsule-arrow">↓</a>
  </section>

  <section className="capsule-letter" id="letter" data-rise><aside>Луганск<br/>май, 2026</aside><div><span>Дорогой будущий ты,</span><h2>сейчас тебе кажется,<br/>что всё самое важное<br/><em>ещё впереди.</em></h2><p>Но прямо сейчас рядом сидят люди, которые знают твой смех, почерк, любимую парту и то, кем ты хотел стать. Мы сохраняем не внешность. Мы сохраняем это чувство — «мы вместе».</p><b>Алёна Ашихмина<br/><i>фотограф ваших настоящих историй</i></b></div></section>

  <section className="capsule-objects">
   <div className="object-photo op1" data-rise><img src="/assets/gallery-candid.webp" alt="Школьная репортажная фотография"/><span>перемена, которую никто не планировал</span></div>
   <div className="object-quote" data-rise>«Сфотографируй<br/>нас такими,<br/><em>как есть</em>»</div>
   <div className="object-photo op2" data-rise><img src="/assets/gallery-group.webp" alt="Компания школьных друзей"/><span>те самые люди</span></div>
   <div className="tape tape1">НЕ ЗАБУДЬ</div><div className="tape tape2">11-А / 2026</div>
  </section>

  <section className="capsule-timeline" id="timeline">
   <div className="timeline-left" data-rise><span>ЭФФЕКТ ВРЕМЕНИ</span><h2>{years[memory].year}</h2><p>Перетащите время — и смысл фотографии изменится.</p><input aria-label="Год воспоминания" type="range" min="0" max="2" value={memory} onChange={e=>setMemory(Number(e.target.value))}/><div><span>сейчас</span><span>+5 лет</span><span>+10 лет</span></div></div>
   <div className="timeline-card" data-rise><span>0{memory+1} / 03</span><h3>{years[memory].title}</h3><p>{years[memory].text}</p><div className="timeline-picture"><img src={memory===0?"/assets/gallery-classroom.webp":memory===1?"/assets/album-flatlay.webp":"/assets/alena-ashikhmina.webp"} alt="Фотография как воспоминание"/></div></div>
  </section>

  <section className="capsule-how"><div className="how-title" data-rise><span>КАК МЫ СОХРАНЯЕМ</span><h2>Не лица.<br/><em>Связи.</em></h2></div><div className="how-list"><article data-rise><b>01</b><h3>Слушаем</h3><p>Кто с кем дружит, что для класса важно и над чем вы смеётесь.</p></article><article data-rise><b>02</b><h3>Наблюдаем</h3><p>Не прерываем жизнь ради кадра. Ждём, когда кадр случится внутри жизни.</p></article><article data-rise><b>03</b><h3>Собираем</h3><p>Портреты, компании, детали и маленькие свидетельства вашего общего времени.</p></article><article data-rise><b>04</b><h3>Печатаем</h3><p>Вещь, которую можно держать в руках, передавать и однажды открыть снова.</p></article></div></section>

  <section className="capsule-save" id="save"><div data-rise><span>ДАТА ЗАКРЫТИЯ КАПСУЛЫ</span><h2>Пока все<br/>ещё рядом —<br/><em>успейте.</em></h2><p>Оставьте контакт. Алёна покажет полные истории и поможет выбрать формат без спешки и обязательств.</p></div>{sent?<div className="capsule-done"><b>СОХРАНЕНО</b><p>Это демонстрация формы. Перед запуском подключим Telegram, почту или CRM.</p><button onClick={()=>setSent(false)}>Ещё одна заявка</button></div>:<form onSubmit={e=>{e.preventDefault();setSent(true)}}><label>Кто пишет?<input required placeholder="Имя"/></label><label>Как связаться?<input required placeholder="Телефон или Telegram"/></label><label>Какой класс?<select defaultValue="11"><option value="4">4 класс</option><option value="9">9 класс</option><option value="11">11 класс</option></select></label><button>Сохранить нашу главу <span>→</span></button></form>}</section>
  <footer><a href="/">ГЛАВА<i>✦</i></a><p>Алёна Ашихмина · Луганск · 2026</p><span>Сделано, чтобы не забыть.</span></footer>
 </main>
}
