import Link from "next/link";

const serviceLinks = [
  { label: "Balloon Arches", href: "/services#arches" },
  { label: "Balloon Columns", href: "/services#columns" },
  { label: "Centerpieces & Pedestals", href: "/services#centerpieces" },
  { label: "Party Rentals", href: "/services#rentals" },
  { label: "Charcuterie Boxes", href: "/services#charcuterie" },
  { label: "Repurposed Floral Art", href: "/services#floral-art" },
  { label: "Specialty Items", href: "/services#specialty" },
];

const quickLinks = [
  { label: "Boutique", href: "/shop" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About Angel", href: "/about" },
  { label: "Book a Consultation", href: "/book" },
  { label: "Contact", href: "/contact" },
  { label: "Client Portal", href: "/client-portal" },
  { label: "Owner Login", href: "/admin/login" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-charcoal)", color: "white" }}>
      {/* CTA Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--color-rose-gold) 0%, var(--color-mauve) 100%)",
          padding: "4rem 0",
          textAlign: "center",
        }}
      >
        <div className="container-glam">
          <p
            className="font-script text-5xl mb-3"
            style={{ fontFamily: "var(--font-script)", color: "white", opacity: 0.9 }}
          >
            You Dream, I Create
          </p>
          <p
            className="mb-6 text-lg"
            style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", color: "rgba(255,255,255,0.85)" }}
          >
            Let&apos;s make your celebration as beautiful as you&apos;ve imagined.
          </p>
          <Link href="/book" className="btn-glam-outline" style={{ borderColor: "white", color: "white" }}>
            ✨ Book Your Celebration
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-glam" style={{ padding: "4rem 1.5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", marginBottom: "3rem" }}>

          {/* Brand Column */}
          <div>
            <p className="font-script text-4xl mb-2" style={{ fontFamily: "var(--font-script)", color: "var(--color-blush)" }}>
              Angel&apos;s
            </p>
            <p
              className="text-xs tracking-widest uppercase mb-4"
              style={{ fontFamily: "var(--font-body)", fontWeight: 700, color: "var(--color-champagne)" }}
            >
              Sparkle &amp; Shine Design Co.
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)" }}>
              Dayton&apos;s premier event designer bringing your vision to life with balloon art, custom decor, and unforgettable celebrations.
            </p>
            <a
              href="tel:9374140357"
              className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ color: "var(--color-champagne)", fontFamily: "var(--font-body)" }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (937) 414-0357
            </a>
          </div>

          {/* Services */}
          <div>
            <h3
              className="text-xs font-bold tracking-widest uppercase mb-4"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-champagne)" }}
            >
              Services
            </h3>
            <ul className="flex flex-col gap-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)", textDecoration: "none" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-xs font-bold tracking-widest uppercase mb-4"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-champagne)" }}
            >
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)", textDecoration: "none" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Hours */}
          <div>
            <h3
              className="text-xs font-bold tracking-widest uppercase mb-4"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-champagne)" }}
            >
              Service Area
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}>
              Dayton, Ohio<br />
              &amp; Surrounding Areas<br />
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>
                We come to your venue
              </span>
            </p>
            <div className="mt-4">
              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-body)", color: "var(--color-champagne)" }}>
                Response Time
              </p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}>
                Within 48 hours
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "2rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}>
            © {new Date().getFullYear()} Angel&apos;s Sparkle &amp; Shine Design Co. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}>
            Dayton, Ohio · Balloon Art · Theme Design · Party Planning
          </p>
        </div>
      </div>
    </footer>
  );
}
