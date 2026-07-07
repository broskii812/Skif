import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ТОО «Скиф» — Лабораторное оборудование для строительства | Казахстан",
  description:
    "ТОО «Скиф» — приборы и оборудование для строительных и дорожно-строительных лабораторий с 1996 года. Поставки по Казахстану. Работа с юридическими лицами.",
  keywords: [
    "лабораторное оборудование",
    "строительные приборы",
    "дорожно-строительная лаборатория",
    "контроль качества бетона",
    "асфальтобетон",
    "Актобе",
    "ТОО Скиф",
    "B2B",
  ],
  openGraph: {
    title: "ТОО «Скиф» — Лабораторное оборудование",
    description:
      "Приборы и оборудование для контроля качества в строительстве. Более 300 клиентов по Казахстану.",
    locale: "ru_KZ",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${manrope.variable} scroll-smooth`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
