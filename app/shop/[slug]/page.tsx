"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Simplified active product for Phase 2 scaffolding
const product = {
  id: "family-reunion-tee-1",
  title: "Custom 'Smith Family' Reunion Tee",
  price: 24.99,
  category: "Apparel",
  image: "/images/hero/booking_banner.png",
  description: "Make your family reunion unforgettable with matching premium cotton t-shirts! Each shirt is crafted to order. Enter your specific family name and the year of the reunion below, and our designers will prepare the artwork.",
  hasSizes: true,
  requiresPersonalization: true,
};

export default function ProductDetailPage() {
  const [size, setSize] = useState("M");
  const [personalization, setPersonalization] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // In the future this posts to /api/checkout and gets a Stripe Session ID
    setTimeout(() => {
      alert(`Stripe Checkout Session Triggered for ${quantity}x ${size} shirts. Custom Text: "${personalization}"`);
      setIsCheckingOut(false);
    }, 1500);
  };

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "6rem", background: "var(--color-warm-white)", minHeight: "100vh" }}>
      <div className="container-glam max-w-6xl">
        
        {/* Breadcrumb */}
        <div className="mb-8 font-body text-sm font-semibold tracking-wide text-[var(--color-muted)] uppercase flex items-center gap-2">
          <Link href="/shop" className="hover:text-[var(--color-charcoal)] transition-colors">Boutique</Link>
          <span>/</span>
          <span className="text-[var(--color-rose-gold)]">{product.category}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Image Gallery Side */}
          <motion.div 
            className="w-full lg:w-1/2 aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-[var(--color-pearl)]"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image 
              src={product.image} 
              alt={product.title} 
              fill 
              className="object-cover" 
            />
          </motion.div>

          {/* Product Info Side */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="font-display text-4xl lg:text-5xl text-[var(--color-charcoal)] mb-4 leading-tight">
              {product.title}
            </h1>
            <p className="font-editorial text-3xl font-bold text-[var(--color-rose-gold)] mb-6">
              ${product.price.toFixed(2)}
            </p>
            
            <p className="font-body text-lg text-[var(--color-foreground)] leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Interactive Options */}
            <div className="space-y-6 mb-8 border-y border-[var(--color-border-light)] py-8">
              
              {product.hasSizes && (
                <div>
                  <label className="block text-sm font-bold text-[var(--color-charcoal)] uppercase tracking-widest mb-3">
                    Select Size
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 transition-colors font-bold ${
                          size === s 
                            ? "border-[var(--color-charcoal)] bg-[var(--color-charcoal)] text-white" 
                            : "border-[var(--color-border)] text-[var(--color-charcoal)] hover:border-[var(--color-rose-gold-light)]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.requiresPersonalization && (
                <div>
                  <label className="block text-sm font-bold text-[var(--color-charcoal)] uppercase tracking-widest mb-3">
                    Personalization Details
                  </label>
                  <input 
                    type="text" 
                    value={personalization}
                    onChange={(e) => setPersonalization(e.target.value)}
                    className="input-glam bg-white" 
                    placeholder="e.g. Smith Family, 2026"
                  />
                  <p className="text-xs text-[var(--color-muted)] mt-2 font-semibold">
                    Please double-check spelling before submitting!
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-[var(--color-charcoal)] uppercase tracking-widest mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4 bg-white border border-[var(--color-border)] rounded-xl w-fit p-1">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-xl text-[var(--color-charcoal)] hover:bg-[var(--color-surface-2)] rounded-lg transition-colors">−</button>
                  <span className="w-10 text-center font-bold text-[var(--color-charcoal)]">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-xl text-[var(--color-charcoal)] hover:bg-[var(--color-surface-2)] rounded-lg transition-colors">+</button>
                </div>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut || (product.requiresPersonalization && personalization.trim() === '')}
              className="btn-glam bg-[var(--color-rose-gold)] disabled:opacity-50 disabled:cursor-not-allowed text-lg w-full py-4 shadow-xl"
            >
              {isCheckingOut ? "Processing..." : "Buy Now with Stripe"}
            </button>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mt-4 flex items-center justify-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure Checkout
            </p>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
