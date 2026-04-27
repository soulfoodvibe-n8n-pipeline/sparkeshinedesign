import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanity Studio | Angel's Sparkle & Shine",
  description: "Content Management Studio for Angel's Sparkle and Shine Design Co.",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
