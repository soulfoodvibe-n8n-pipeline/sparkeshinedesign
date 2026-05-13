import type { Metadata } from "next";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Lato,
  Great_Vibes,
} from "next/font/google";
import "./globals.css";

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

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingBookBtn from "@/components/layout/FloatingBookBtn";
import { createClient } from "@supabase/supabase-js";

// Initialize a generic client for the layout (read-only)
// Note: We use the anon key here since RLS allows public read access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
  // Fetch global site settings
  let siteSettings = {
    phoneNumber: "(937) 414-0357",
    emailAddress: "hello@sparkleshine.com"
  };
  
  try {
    if (supabaseUrl && supabaseAnonKey) {
      const { data } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .single();
        
      if (data) {
        siteSettings = {
          phoneNumber: data.phone_number || siteSettings.phoneNumber,
          emailAddress: data.email_address || siteSettings.emailAddress
        };
      }
    }
  } catch (e) {
    console.error("Failed to load site settings:", e);
  }

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${lato.variable} ${greatVibes.variable}`}
    >
      <body>
        <Navbar settings={siteSettings} />
        <main>{children}</main>
        <Footer settings={siteSettings} />
        <FloatingBookBtn />
      </body>
    </html>
  );
}
