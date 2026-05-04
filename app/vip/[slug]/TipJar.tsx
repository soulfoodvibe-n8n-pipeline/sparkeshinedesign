"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function TipJar({ eventId }: { eventId: string }) {
  const [amount, setAmount] = useState<number>(20);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(false);

  const predefinedAmounts = [10, 20, 50];

  const handleCheckout = async () => {
    const finalAmount = isCustom ? parseFloat(customAmount) : amount;
    
    if (!finalAmount || finalAmount < 1) {
      alert("Please enter a valid amount (minimum $1).");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/tip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, amount: finalAmount })
      });
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to launch tip jar.");
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      alert("Network error.");
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-8 md:p-10 text-center relative overflow-hidden max-w-lg mx-auto !bg-white/5 border border-white/10">
      {/* Sparkle Decoration */}
      <div className="absolute -top-6 -right-6 text-[var(--color-rose-gold)] opacity-20">
        <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z"/>
        </svg>
      </div>

      <h3 className="font-display text-3xl text-[var(--color-rose-gold)] mb-2 relative z-10">Show Some Love</h3>
      <p className="font-body text-white/70 mb-8 relative z-10 text-sm">
        Did the team do an amazing job? Send a quick tip to show your appreciation!
      </p>

      {/* Preset Amounts */}
      <div className="flex justify-center gap-3 mb-4 relative z-10">
        {predefinedAmounts.map((preset) => (
          <button
            key={preset}
            onClick={() => {
              setIsCustom(false);
              setAmount(preset);
            }}
            className={`w-16 h-16 rounded-full font-display text-xl transition-all ${!isCustom && amount === preset ? 'bg-[var(--color-rose-gold)] text-white shadow-[0_0_20px_rgba(183,110,121,0.4)] scale-110' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
          >
            ${preset}
          </button>
        ))}
      </div>

      {/* Custom Amount */}
      <div className="mb-8 relative z-10 flex flex-col items-center">
        <button 
          onClick={() => setIsCustom(true)}
          className={`text-sm mb-2 transition-colors ${isCustom ? 'text-[var(--color-rose-gold)] font-bold' : 'text-white/50 hover:text-white/80 underline'}`}
        >
          or enter custom amount
        </button>
        
        {isCustom && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="flex items-center gap-2">
            <span className="text-xl text-white/50">$</span>
            <input 
              type="number" 
              min="1"
              step="1"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="input-glam w-24 text-center !bg-black/40 !text-white !border-white/20"
              placeholder="0.00"
            />
          </motion.div>
        )}
      </div>

      <button 
        onClick={handleCheckout}
        disabled={loading}
        className="btn-glam w-full !bg-white !text-[var(--color-charcoal)] relative z-10 flex items-center justify-center gap-2"
      >
        {loading ? (
          "Loading Secure Checkout..."
        ) : (
          <>
            <span>Send Tip via Stripe</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-white/30 text-xs relative z-10">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Secure payment processed by Stripe
      </div>
    </div>
  );
}
