"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function ClientHelpPage() {
  return (
    <div style={{ background: "var(--color-warm-white)", minHeight: "100vh" }}>
      {/* Header */}
      <section className="pt-32 pb-12 bg-hero-gradient text-center relative">
        <Link href="/client-portal" className="absolute top-24 left-8 text-white/70 hover:text-white text-sm uppercase tracking-widest font-bold">
          ← Back to Dashboard
        </Link>
        <div className="container-glam relative z-10">
          <motion.h1 
            className="font-display text-4xl md:text-5xl text-white mb-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          >
            Help &amp; Support
          </motion.h1>
          <motion.p 
            className="font-editorial text-xl italic text-[var(--color-blush-light)]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          >
            Everything you need to manage your Angel's Sparkle experience.
          </motion.p>
        </div>
      </section>

      {/* FAQ Grid */}
      <section className="py-16">
        <div className="container-glam max-w-4xl">
          <div className="mb-12">
            <h2 className="font-display text-3xl text-[var(--color-charcoal)] mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {[
                {
                  q: "How do I share my VIP Invitation link?",
                  a: "Head over to the 'Invitation Studio' from your dashboard. Once you've designed your invitation, click 'Save & Publish Design'. You can then copy the generated link and text or email it to all your guests!"
                },
                {
                  q: "When is my final balance due?",
                  a: "Your final balance is due 7 days prior to your event date. You can view your current remaining balance and pay it instantly via secure credit card checkout directly from the 'Remaining Balance' widget on your dashboard."
                },
                {
                  q: "How do I approve guest photos in the Live Gallery?",
                  a: "Click 'Moderate Photos' on your dashboard. You will see a grid of all photos uploaded by your guests. By default, photos are hidden from the public until you click the 'Approve' button. Once approved, they instantly appear on your public VIP page!"
                },
                {
                  q: "How does the Social Auto-Pilot work?",
                  a: "If you've connected your Facebook account using the 'Social Auto-Pilot' card, our system will automatically post exciting countdowns and event updates to your Facebook Page so you don't have to lift a finger. You can disconnect it at any time from your Facebook settings."
                }
              ].map((faq, i) => (
                <motion.details 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group glass-card p-6 cursor-pointer marker:content-['']"
                >
                  <summary className="font-display text-xl text-[var(--color-charcoal)] font-semibold flex justify-between items-center outline-none">
                    {faq.q}
                    <span className="transition group-open:rotate-180 text-[var(--color-rose-gold)]">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="font-body text-[var(--color-muted)] mt-4 leading-relaxed opacity-0 group-open:opacity-100 transition-opacity duration-300">
                    {faq.a}
                  </p>
                </motion.details>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="glass-card p-10 flex flex-col items-center text-center border-t-4 border-[var(--color-rose-gold)]">
            <div className="w-16 h-16 rounded-full bg-[var(--color-champagne)] flex items-center justify-center text-white mb-6 shadow-soft">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-display text-2xl text-[var(--color-charcoal)] mb-2">Still need help?</h3>
            <p className="font-body text-[var(--color-muted)] max-w-md mb-8">
              Angie is always here to help ensure your celebration is absolutely perfect. Send a quick message and she'll get right back to you.
            </p>
            <a href="mailto:angels.sparkleshinedesign@gmail.com?subject=Client%20Portal%20Support%20Request" className="btn-glam">
              Email Angie Directly
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
