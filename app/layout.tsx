import type { Metadata } from "next";
import "./globals.css";
import { organizationJsonLd, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "../content/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Выпускные альбомы 2027 в Луганске — КАПСУЛА",
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "КАПСУЛА",
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "КАПСУЛА — выпускные альбомы 2027" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Выпускные альбомы 2027 в Луганске — КАПСУЛА",
    description: SITE_DESCRIPTION,
    images: ["/og.jpg"],
  },
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
