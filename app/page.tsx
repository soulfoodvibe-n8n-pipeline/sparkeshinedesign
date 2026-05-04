"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─── Sparkle Particle ─── */
function SparkleParticle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="pointer-events-none absolute rounded-full"
      style={{
        width: 5,
        height: 5,
        background: "rgba(212,165,116,0.75)",
        filter: "blur(0.5px)",
        ...style,
      }}
    />
  );
}

import { motion } from "framer-motion";

/* ─── Animated Section wrapper ─── */
function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay: delay / 1000, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Service Card ─── */
const services = [
  {
    title: "Balloon Arches",
    desc: "Stunning custom arches that frame your moment perfectly — every color, every style.",
    emoji: "🎈",
    href: "/services#arches",
    from: "#F4C2C2",
    to: "#B76E79",
  },
  {
    title: "Centerpiece Pedestals",
    desc: "Gold-accented pedestal creations with bobo balloons, florals, and pearl accents.",
    emoji: "✨",
    href: "/services#centerpieces",
    from: "#D4A574",
    to: "#B76E79",
  },
  {
    title: "Full Theme Design",
    desc: "Complete event transformations — from concept to cleanup. We come to your venue.",
    emoji: "🌸",
    href: "/services#theme",
    from: "#8B5E6B",
    to: "#B76E79",
  },
  {
    title: "Charcuterie Boxes",
    desc: "Personalized artisan grazing boxes, beautifully styled and branded for your event.",
    emoji: "🧀",
    href: "/services#charcuterie",
    from: "#8FAE7E",
    to: "#D4A574",
  },
];

/* ─── Portfolio Teaser Items ─── */
const portfolioItems = [
  { src: "/images/portfolio/1000010451.png", alt: "Gold pedestal balloon centerpiece with stuffed animal", label: "Centerpieces" },
  { src: "/images/portfolio/1000010492.png", alt: "Pink and rose gold balloon arch birthday backdrop", label: "Balloon Arches" },
  { src: "/images/portfolio/1000010482.png", alt: "Branded charcuterie boxes with pink bow balloons", label: "Charcuterie" },
  { src: "/images/portfolio/1000010468.png", alt: "Elegant floral pedestal with pearl draping", label: "Pedestal Art" },
  { src: "/images/portfolio/1000010511.jpg", alt: "Full flamingo-themed party setup with greenery wall", label: "Full Events" },
  { src: "/images/portfolio/1000010471.png", alt: "Mothers Day pink and gold balloon arrangement", label: "Seasonal" },
];

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sparkle positions
  const sparkles = [
    { top: "15%", left: "8%",  animationDelay: "0s",    animationDuration: "3.5s" },
    { top: "25%", right: "12%", animationDelay: "0.8s", animationDuration: "4s" },
    { top: "60%", left: "5%",  animationDelay: "1.5s",  animationDuration: "3s" },
    { top: "70%", right: "8%", animationDelay: "2s",    animationDuration: "4.5s" },
    { top: "40%", left: "50%", animationDelay: "0.3s",  animationDuration: "3.8s" },
    { top: "85%", left: "30%", animationDelay: "1.2s",  animationDuration: "3.2s" },
  ];

  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ paddingTop: "80px" }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <Image
            src="/images/hero/hero_banner.png"
            alt="Luxury balloon event setup"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(61,53,53,0.82) 0%, rgba(139,94,107,0.7) 50%, rgba(183,110,121,0.6) 100%)",
          }}
        />

        {/* Sparkle Particles */}
        {sparkles.map((s, i) => (
          <SparkleParticle
            key={i}
            style={{
              ...s,
              animation: `sparkle ${s.animationDuration} ease-in-out ${s.animationDelay} infinite`,
            }}
          />
        ))}

        {/* Content */}
        <div className="container-glam relative z-10 text-center" style={{ padding: "5rem 1.5rem" }}>
          {/* Pre-heading */}
          <div
            className="inline-flex items-center gap-2 mb-6 animate-fade-in"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "9999px",
              padding: "0.4rem 1.2rem",
              color: "rgba(255,255,255,0.9)",
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
            }}
          >
            ✨ Dayton, Ohio&apos;s Premier Event Designer ✨
          </div>

          {/* Main Headline */}
          <h1
            className="animate-fade-up"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              fontWeight: 600,
              color: "white",
              lineHeight: 1.1,
              marginBottom: "1rem",
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}
          >
            You Dream,<br />
            <em style={{ fontStyle: "italic", color: "#F4C2C2" }}>I Create.</em>
          </h1>

          {/* Script subline */}
          <p
            className="animate-fade-up delay-200"
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "var(--color-champagne-light)",
              marginBottom: "0.75rem",
            }}
          >
            Angel&apos;s Sparkle &amp; Shine Design Co.
          </p>

          {/* Tagline */}
          <p
            className="animate-fade-up delay-300"
            style={{
              fontFamily: "var(--font-editorial)",
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.8)",
              marginBottom: "2.5rem",
            }}
          >
            Balloon Art · Theme Design · Party Planning · Handcrafted Creations
          </p>

          {/* CTAs */}
          <div
            className="animate-fade-up delay-500 flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/book"
              className="btn-glam"
              style={{ fontSize: "0.95rem", padding: "1rem 2.25rem", boxShadow: "0 0 32px rgba(183,110,121,0.45)" }}
            >
              ✨ Book Your Celebration
            </Link>
            <Link
              href="/portfolio"
              className="btn-glam-outline"
              style={{ borderColor: "rgba(255,255,255,0.75)", color: "white", fontSize: "0.95rem", padding: "1rem 2.25rem" }}
            >
              View Our Work
            </Link>
          </div>

          {/* Phone */}
          <a
            href="tel:9374140357"
            className="animate-fade-up delay-700 inline-flex items-center gap-2 mt-6 text-sm"
            style={{ color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)", textDecoration: "none" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Us: (937) 414-0357
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES OVERVIEW
          ═══════════════════════════════════════════ */}
      <section id="services" style={{ padding: "6rem 0", background: "var(--color-warm-white)" }}>
        <div className="container-glam">
          <RevealSection className="text-center mb-14">
            <span className="section-label">What We Do</span>
            <h2 className="section-title">Celebrations Crafted<br />With Love &amp; Glam</h2>
            <hr className="gold-divider" />
            <p className="section-subtitle">Every event is unique — we design to match your vision exactly</p>
          </RevealSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            {services.map((svc, i) => (
              <RevealSection key={svc.title} delay={i * 100}>
                <Link href={svc.href} className="service-card block" style={{ textDecoration: "none" }}>
                  {/* Color band top */}
                  <div style={{ height: 6, background: `linear-gradient(90deg, ${svc.from}, ${svc.to})` }} />
                  <div style={{ padding: "2rem 1.75rem" }}>
                    <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "1rem" }}>{svc.emoji}</span>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        color: "var(--color-charcoal)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {svc.title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-muted)", lineHeight: 1.6 }}>
                      {svc.desc}
                    </p>
                    <p
                      className="mt-4 text-sm font-semibold flex items-center gap-1"
                      style={{ color: "var(--color-rose-gold)", fontFamily: "var(--font-body)" }}
                    >
                      Explore →
                    </p>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>

          <RevealSection className="text-center mt-12" delay={400}>
            <Link href="/services" className="btn-glam-outline">
              View All Services
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MANIFESTO SECTION
          ═══════════════════════════════════════════ */}
      <section
        id="manifesto"
        style={{
          position: "relative",
          padding: "8rem 0",
          background: "linear-gradient(135deg, var(--color-mauve) 0%, var(--color-rose-gold-dark) 60%, var(--color-charcoal) 100%)",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: 300, height: 300, borderRadius: "50%", background: "rgba(212,165,116,0.1)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: 220, height: 220, borderRadius: "50%", background: "rgba(244,194,194,0.08)", pointerEvents: "none" }} />

        <div className="container-glam" style={{ position: "relative", zIndex: 1 }}>
          <RevealSection>
            <p
              style={{
                fontFamily: "var(--font-script)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "var(--color-blush)",
                marginBottom: "1.5rem",
              }}
            >
              Every Celebration Deserves Magic
            </p>
            <hr style={{ width: 100, height: 1, background: "rgba(212,165,116,0.5)", border: "none", margin: "0 auto 2rem" }} />
            <p
              style={{
                fontFamily: "var(--font-editorial)",
                fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                fontStyle: "italic",
                color: "rgba(255,255,255,0.85)",
                maxWidth: 680,
                margin: "0 auto 1.5rem",
                lineHeight: 1.8,
              }}
            >
              &ldquo;My goal is to use my creativity to make Celebrations as beautiful as dreamed,
              as memorable as possible.&rdquo;
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                color: "var(--color-champagne-light)",
                letterSpacing: "0.05em",
              }}
            >
              — Angel Valerio
            </p>
            <div className="mt-8">
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "1.5rem",
                }}
              >
                Starting at $25 · Balloon Art · Serving Dayton &amp; Surrounding Areas
              </p>
              <Link href="/book" className="btn-glam-outline" style={{ borderColor: "rgba(255,255,255,0.6)", color: "white" }}>
                ✨ Book a Consultation — $50 In-Person
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PORTFOLIO TEASER
          ═══════════════════════════════════════════ */}
      <section id="portfolio-preview" style={{ padding: "6rem 0", background: "var(--color-ivory)" }}>
        <div className="container-glam">
          <RevealSection className="text-center mb-12">
            <span className="section-label">Portfolio</span>
            <h2 className="section-title">A Glimpse of Our Work</h2>
            <hr className="gold-divider" />
            <p className="section-subtitle">Handcrafted for every occasion, every theme, every dream</p>
          </RevealSection>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {portfolioItems.map((item, i) => (
              <RevealSection key={item.src} delay={i * 80}>
                <div className="portfolio-card" style={{ height: 280 }}>
                  <Image src={item.src} alt={item.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                  <div className="portfolio-card-overlay">
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "white",
                        background: "rgba(183,110,121,0.8)",
                        padding: "0.35rem 0.85rem",
                        borderRadius: "9999px",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection className="text-center mt-12" delay={500}>
            <Link href="/portfolio" className="btn-glam">
              ✨ View Full Portfolio
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PUBLIC FAQ SECTION
          ═══════════════════════════════════════════ */}
      <section id="faq" style={{ padding: "6rem 0", background: "var(--color-ivory)" }}>
        <div className="container-glam max-w-4xl">
          <RevealSection className="text-center mb-12">
            <span className="section-label">Common Questions</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <hr className="gold-divider" />
            <p className="section-subtitle">Everything you need to know before booking your celebration</p>
          </RevealSection>

          <div className="space-y-4 text-left">
            {[
              {
                q: "How far in advance should I book my event?",
                a: "For full theme designs and large balloon arches, we recommend booking at least 4 to 6 weeks in advance to ensure availability and allow time for custom prop sourcing. For smaller arrangements like charcuterie boxes or pedestal centerpieces, 2 weeks is usually sufficient!"
              },
              {
                q: "Do you require a deposit?",
                a: "Yes! To secure your date on our calendar, a non-refundable 50% retainer is required at the time of booking. The remaining balance is due 7 days prior to your event. You can easily manage your payments through your private Client Command Center."
              },
              {
                q: "Do you travel outside of Dayton, Ohio?",
                a: "Absolutely! While we are based in Dayton, we frequently travel to surrounding areas including Cincinnati and Columbus. A standard travel fee applies for locations further than 20 miles from our headquarters."
              },
              {
                q: "What happens to the balloons after the event?",
                a: "The balloons are yours to keep! However, any rented props (like metal arches, pedestals, or custom backdrops) must be returned or picked up by our team after your event concludes."
              }
            ].map((faq, i) => (
              <RevealSection key={i} delay={i * 100}>
                <details className="group glass-card p-6 cursor-pointer marker:content-['']">
                  <summary className="font-display text-xl text-[var(--color-charcoal)] font-semibold flex justify-between items-center outline-none">
                    {faq.q}
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="font-body text-[var(--color-muted)] mt-4 leading-relaxed opacity-0 group-open:opacity-100 transition-opacity duration-300">
                    {faq.a}
                  </p>
                </details>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONSULTATION CTA
          ═══════════════════════════════════════════ */}
      <section
        id="book-cta"
        style={{
          padding: "7rem 0",
          background: "var(--color-warm-white)",
        }}
      >
        <div className="container-glam">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            {/* Image side */}
            <RevealSection>
              <div style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", boxShadow: "var(--shadow-lifted)", aspectRatio: "4/3", position: "relative" }}>
                <Image
                  src="/images/hero/booking_banner.png"
                  alt="Book a consultation - styled stationery with pink roses"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </RevealSection>

            {/* Text side */}
            <RevealSection delay={150}>
              <span className="section-label">Get Started</span>
              <h2 className="section-title" style={{ marginBottom: "1rem" }}>
                Let&apos;s Design Your<br />
                <em style={{ fontStyle: "italic", color: "var(--color-rose-gold)" }}>Dream Celebration</em>
              </h2>
              <hr className="gold-divider" style={{ margin: "1rem 0" }} />
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  color: "var(--color-muted)",
                  lineHeight: 1.8,
                  marginBottom: "1.5rem",
                }}
              >
                I&apos;m delighted to help you design your dream Celebration! Fill out a quick inquiry and I&apos;ll be in touch within 48 hours.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontSize: "0.95rem",
                  fontStyle: "italic",
                  color: "var(--color-rose-gold)",
                  marginBottom: "2rem",
                }}
              >
                For a $50 consultation fee, I&apos;ll meet you in person at your venue for hands-on planning.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/book" className="btn-glam">
                  ✨ Book a Consultation
                </Link>
                <a href="tel:9374140357" className="btn-glam-outline">
                  Call Us
                </a>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>
    </>
  );
}
