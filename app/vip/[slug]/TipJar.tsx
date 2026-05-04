"use client";

import { motion } from "framer-motion";

export default function TipJar({ cashGiftLink }: { cashGiftLink: string }) {
  if (!cashGiftLink) return null;

  return (
    <div className="glass-card p-8 md:p-10 text-center relative overflow-hidden max-w-lg mx-auto !bg-white/5 border border-white/10">
      {/* Sparkle Decoration */}
      <div className="absolute -top-6 -right-6 text-[#00D632] opacity-20">
        <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z"/>
        </svg>
      </div>

      <h3 className="font-display text-3xl text-[var(--color-charcoal)] mb-2 relative z-10">Send a Gift</h3>
      <p className="font-body text-[var(--color-muted)] mb-8 relative z-10 text-sm">
        Wish to send a cash gift or contribute to the fund? Click below to send your gift directly via the host's preferred app.
      </p>

      <a 
        href={cashGiftLink.startsWith('http') ? cashGiftLink : `https://${cashGiftLink}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-glam w-full !bg-[#00D632] hover:!bg-[#00b029] !text-white relative z-10 flex items-center justify-center gap-2"
      >
        <span>Send Cash Gift</span>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>
      
      <div className="mt-4 flex items-center justify-center gap-2 text-white/40 text-xs relative z-10">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Secure external link
      </div>
    </div>
  );
}
