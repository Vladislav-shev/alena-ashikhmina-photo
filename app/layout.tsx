import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://xn----7sbd3bcejew7i.xn--p1ai"),
  title: "КАПСУЛА — выпускные альбомы 2027 | Алёна Ашихмина и Екатерина Ерохина",
  description: "Выпускные альбомы и школьные фотосессии в Луганске и области. Пять тарифов от Алёны Ашихминой и Екатерины Ерохиной.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "КАПСУЛА — выпускные альбомы 2027",
    description: "Выпускные альбомы как капсула времени. Алёна Ашихмина и Екатерина Ерохина, Луганск и область.",
    url: "/",
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "КАПСУЛА — выпускные альбомы 2027" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "КАПСУЛА — выпускные альбомы 2027",
    description: "Выпускные альбомы как капсула времени в Луганске и области.",
    images: ["/og.jpg"],
  },
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
