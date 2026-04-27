"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const serviceLinks = [
  { label: "Balloon Arches", href: "/services#arches" },
  { label: "Balloon Columns", href: "/services#columns" },
  { label: "Centerpieces & Pedestals", href: "/services#centerpieces" },
  { label: "Party Rentals", href: "/services#rentals" },
  { label: "Charcuterie Boxes", href: "/services#charcuterie" },
  { label: "Repurposed Floral Art", href: "/services#floral-art" },
  { label: "Specialty Items", href: "/services#specialty" },
  { label: "Event Packages", href: "/services#packages" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Boutique", href: "/shop" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Home and About pages have dark hero images at the top, allowing for a transparent navbar.
  // All other pages have a light background at the top, requiring a solid navbar immediately.
  const forceSolid = pathname !== "/" && pathname !== "/about";
  const isSolid = scrolled || forceSolid;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isSolid
            ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(183,110,121,0.12)]"
            : "bg-transparent"
        }`}
      >
        <div className="container-glam">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="flex flex-col leading-none group mt-1">
              <span
                className="font-script text-4xl transition-opacity group-hover:opacity-80 drop-shadow-sm"
                style={{ 
                  color: isSolid ? "var(--color-rose-gold)" : "var(--color-blush-light)", 
                  fontFamily: "var(--font-script)" 
                }}
              >
                Angel&apos;s
              </span>
              <span
                className="font-display text-[0.65rem] tracking-[0.2em] uppercase mt-[-6px] ml-1"
                style={{ 
                  color: isSolid ? "var(--color-charcoal)" : "rgba(255,255,255,0.9)", 
                  fontFamily: "var(--font-body)", 
                  fontWeight: 700 
                }}
              >
                Sparkle &amp; Shine Design Co.
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-colors duration-200 cursor-pointer ${
                    pathname.startsWith("/services")
                      ? "text-rose-gold"
                      : isSolid
                      ? "text-charcoal hover:text-rose-gold"
                      : "text-white/90 hover:text-white"
                  }`}
                  style={{
                    color: pathname.startsWith("/services")
                      ? "var(--color-rose-gold)"
                      : isSolid
                      ? "var(--color-charcoal)"
                      : "rgba(255,255,255,0.9)",
                  }}
                >
                  Services
                  <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 bg-white rounded-xl shadow-[0_8px_40px_rgba(61,53,53,0.14)] border border-[var(--color-border-light)] overflow-hidden transition-all duration-200 ${
                    servicesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {serviceLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-5 py-3 text-sm transition-colors duration-150 hover:bg-[var(--color-blush-light)]"
                      style={{ color: "var(--color-charcoal)", fontFamily: "var(--font-body)" }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-colors duration-200"
                  style={{
                    color: isActive(link.href)
                      ? "var(--color-rose-gold)"
                      : isSolid
                      ? "var(--color-charcoal)"
                      : "rgba(255,255,255,0.9)",
                  }}
                >
                  {link.label}
                </Link>
              ))}

              <Link href="/book" className="btn-glam ml-4" style={{ padding: "0.6rem 1.4rem", fontSize: "0.8rem" }}>
                ✨ Book Now
              </Link>
            </nav>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`block w-6 h-0.5 transition-all duration-300 ${
                    mobileOpen && i === 0 ? "rotate-45 translate-y-2" :
                    mobileOpen && i === 1 ? "opacity-0" :
                    mobileOpen && i === 2 ? "-rotate-45 -translate-y-2" : ""
                  }`}
                  style={{
                    backgroundColor: isSolid ? "var(--color-charcoal)" : "white"
                  }}
                />
              ))}
            </button>
          </div>
        </div>

      </header>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-all duration-300 ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />
        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 w-80 h-full bg-white shadow-2xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          } flex flex-col`}
        >
          <div className="flex items-center justify-between p-6 border-b border-[var(--color-border-light)]">
            <span className="font-script text-2xl" style={{ color: "var(--color-rose-gold)", fontFamily: "var(--font-script)" }}>
              Angel&apos;s S&amp;S Design Co.
            </span>
            <button onClick={() => setMobileOpen(false)} className="p-2 cursor-pointer" aria-label="Close menu">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "var(--color-charcoal)" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-6 flex flex-col gap-1">
            <Link href="/" onClick={() => setMobileOpen(false)} className="px-3 py-3 text-sm font-bold uppercase tracking-wide border-b border-[var(--color-border-light)]" style={{ color: "var(--color-charcoal)" }}>
              Home
            </Link>
            <div>
              <p className="px-3 py-3 text-sm font-bold uppercase tracking-wide border-b border-[var(--color-border-light)]" style={{ color: "var(--color-charcoal)" }}>
                Services
              </p>
              {serviceLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-2.5 text-sm transition-colors hover:bg-[var(--color-blush-light)]"
                  style={{ color: "var(--color-muted)" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-3 text-sm font-bold uppercase tracking-wide border-b border-[var(--color-border-light)]"
                style={{ color: "var(--color-charcoal)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="p-6">
            <Link href="/book" onClick={() => setMobileOpen(false)} className="btn-glam w-full justify-center">
              ✨ Book a Consultation
            </Link>
            <a
              href="tel:9374140357"
              className="flex items-center justify-center gap-2 mt-3 text-sm"
              style={{ color: "var(--color-rose-gold)", fontFamily: "var(--font-body)" }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (937) 414-0357
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
