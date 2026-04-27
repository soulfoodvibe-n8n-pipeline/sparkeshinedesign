"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div style={{ background: "var(--color-warm-white)", minHeight: "100vh" }}>
      {/* Hero Banner */}
      <div className="relative h-[40vh] md:h-[50vh] w-full pt-20">
        <Image 
          src="/images/hero/about_banner.png" 
          alt="Elegant tablescape" 
          fill 
          sizes="100vw"
          className="object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)]/80 to-transparent flex items-end justify-center pb-12">
          <motion.h1 
            className="font-display text-5xl md:text-6xl text-white text-center"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          >
            Meet Angel
          </motion.h1>
        </div>
      </div>

      <div className="container-glam py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Main Photo block */}
          <motion.div 
            className="w-full md:w-5/12 relative"
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            {/* Background decorative blob */}
            <div className="absolute inset-0 bg-[var(--color-rose-gold-light)] rounded-[3rem] rotate-3 scale-105 -z-10 opacity-30" />
            
            {/* Real placeholder for Angel's photo once she uploads */}
            <div className="relative aspect-[3/4] w-full rounded-[3rem] overflow-hidden shadow-xl border-8 border-white bg-[var(--color-pearl)] flex items-center justify-center">
              <span className="font-editorial text-[var(--color-muted)] italic text-lg">[ Angel&apos;s Photo Placeholder ]</span>
            </div>
          </motion.div>

          {/* Bio text block */}
          <motion.div 
            className="w-full md:w-7/12"
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <span className="section-label">The Designer</span>
            <h2 className="font-display text-4xl lg:text-5xl text-[var(--color-charcoal)] mb-6">
              Turning Your Dreams into Reality
            </h2>
            
            <div className="font-body text-[var(--color-foreground)] text-lg space-y-5 leading-relaxed">
              <p>
                Hello! I&apos;m Angel Valerio, the creative heart behind Angel&apos;s Sparkle &amp; Shine Design Co. Based in beautiful Dayton, Ohio, I specialize in transforming ordinary spaces into unforgettable experiences.
              </p>
              <p>
                My journey began with a simple passion: I love seeing the joy on people&apos;s faces when they walk into a room specifically curated for their celebration. What started as making balloon arches for family birthdays has blossomed into a full-scale event design business.
              </p>
              <p>
                Whether it&apos;s an elegant bridal shower centered around our custom charcuterie boxes, or a massive corporate event featuring towering pedestal balloon art, my goal remains the same — <strong>to use my creativity to make your celebration as beautiful as dreamed, and as memorable as possible.</strong>
              </p>
              <p className="pt-4 font-script text-3xl text-[var(--color-rose-gold)]">
                With love &amp; sparkle,
              </p>
              <p className="font-display font-bold text-[var(--color-charcoal)] uppercase tracking-widest text-sm mt-1">
                — Angel Valerio
              </p>
            </div>
            
            <div className="mt-10 pt-10 border-t border-[var(--color-border)]">
              <p className="font-editorial italic text-[var(--color-muted)] text-xl mb-6">
                Ready to start planning together?
              </p>
              <Link href="/book" className="btn-glam pb-4">
                ✨ Book Your Consultation
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
