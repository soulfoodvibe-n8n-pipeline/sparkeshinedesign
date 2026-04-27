import type { Metadata } from "next";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Lato,
  Great_Vibes,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingBookBtn from "@/components/layout/FloatingBookBtn";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Angel's Sparkle & Shine Design Co. | Event Planner & Balloon Artist — Dayton, Ohio",
    template: "%s | Angel's Sparkle & Shine Design Co.",
  },
  description:
    "Dayton Ohio's premier event designer specializing in balloon art, theme design, party planning, floral pedestal creations, and personalized charcuterie boxes. You dream, I create. Serving Dayton & surrounding areas.",
  keywords: [
    "event planner Dayton Ohio",
    "balloon artist Dayton",
    "balloon arch Dayton OH",
    "party planner Dayton",
    "balloon garland Dayton",
    "party decoration Dayton Ohio",
    "Angel's Sparkle and Shine",
    "theme design Dayton",
    "charcuterie boxes Dayton",
    "balloon centerpieces Dayton",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Angel's Sparkle & Shine Design Co.",
    title: "Angel's Sparkle & Shine Design Co. | Event Planner — Dayton, Ohio",
    description:
      "Balloon art, theme design, party planning, and handcrafted event creations. Serving Dayton, Ohio and surrounding areas.",
    images: [{ url: "/images/hero/hero_banner.png", width: 1200, height: 630, alt: "Angel's Sparkle and Shine Design Co." }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${lato.variable} ${greatVibes.variable}`}
    >
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingBookBtn />
      </body>
    </html>
  );
}
