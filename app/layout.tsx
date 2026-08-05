import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ГЛАВА — Алёна Ашихмина | Выпускные альбомы в Луганске",
  description: "Алёна Ашихмина — фотограф выпускных альбомов и школьных фотосессий в Луганске. Живые кадры, продуманный дизайн и согласование до печати.",
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
