import type { Metadata } from "next";
import { Montserrat, Cinzel, Great_Vibes } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

const BASE_URL = "https://sanu-weds-bijeesh.vercel.app";

export const metadata: Metadata = {
  title: "Sanu & Bijeesh — A Grand Union",
  description:
    "You're invited to the wedding of Sanu & Bijeesh on April 8th, 2026 in Mannarmala, Kerala.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Sanu & Bijeesh — A Grand Union",
    description:
      "You're invited to the wedding of Sanu & Bijeesh on April 8th, 2026 in Mannarmala, Kerala.",
    url: BASE_URL,
    siteName: "Sanu Weds Bijeesh",
    images: [{ url: `${BASE_URL}/api/og`, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanu & Bijeesh — A Grand Union",
    description: "Wedding · April 8th, 2026 · Mannarmala, Kerala",
    images: [`${BASE_URL}/api/og`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${montserrat.variable} ${cinzel.variable} ${greatVibes.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
