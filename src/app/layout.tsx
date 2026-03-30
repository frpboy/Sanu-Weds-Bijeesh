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

export const metadata: Metadata = {
  title: "Sanu & Bijeesh - Project Eternal Scroll",
  description: "A cinematic wedding tribute celebrating the union of Sanu and Bijeesh.",
  openGraph: {
    title: "Sanu & Bijeesh - The Next Chapter",
    description: "Witness the celestial journey of Sanu and Bijeesh.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${cinzel.variable} ${greatVibes.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
