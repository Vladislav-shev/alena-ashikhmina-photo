/* eslint-disable @next/next/no-html-link-for-pages -- shared by the static ISPmanager build */
import type { ReactNode } from "react";
import { legalProfile } from "../content/site-config";

type LegalShellProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};

export default function LegalShell({ eyebrow, title, intro, children }: LegalShellProps) {
  return (
    <div className="legal-site">
      <header className="legal-nav">
        <a className="legal-logo" href="/" aria-label="КАПСУЛА — на главную">КАПСУЛА<i>✦</i></a>
        <nav aria-label="Правовые страницы">
          <a href="/legal/">Условия и реквизиты</a>
          <a href="/privacy/">Персональные данные</a>
        </nav>
        <a className="legal-home" href="/">Вернуться на сайт <span>↗</span></a>
      </header>

      <main className="legal-main">
        <header className="legal-hero">
          <span>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
          <small>Редакция от {legalProfile.siteUpdatedAt}</small>
        </header>
        <div className="legal-content">{children}</div>
      </main>

      <footer className="legal-footer">
        <a href="/">КАПСУЛА<i>✦</i></a>
        <p>Алёна Ашихмина · Екатерина Ерохина<br />Луганск и область · 2027</p>
        <a href="/privacy/">Политика обработки персональных данных</a>
      </footer>
    </div>
  );
}
