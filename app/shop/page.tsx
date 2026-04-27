"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const categories = ["All", "Mugs & Favors", "Apparel", "Printables"];

// Placeholder data since Sanity is not fully connected to the data layer yet
const products = [
  {
    slug: "family-reunion-tee-1",
    title: "Custom 'Smith Family' Reunion Tee",
    price: 24.99,
    category: "Apparel",
    image: "/images/hero/booking_banner.png", // using an existing asset as placeholder
    description: "Premium cotton tee customized with your family name and event year."
  },
  {
    slug: "bridesmaid-mug-set",
    title: "Bridesmaid Proposal Mug",
    price: 18.50,
    category: "Mugs & Favors",
    image: "/images/hero/about_banner.png",
    description: "The perfect custom mug to pop the question to your bridal party."
  },
  {
    slug: "baby-shower-welcome-sign",
    title: "Digital Baby Shower Welcome Sign",
    price: 14.00,
    category: "Printables",
    image: "/images/hero/hero_banner.png",
    description: "A high-res digital file you can print locally."
  }
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "6rem", background: "var(--color-warm-white)", minHeight: "100vh" }}>
      <div className="container-glam">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Merchandise &amp; Favors</span>
          <h1 className="section-title">The Sparkle Boutique</h1>
          <hr className="gold-divider" />
          <p className="font-editorial text-lg italic text-[var(--color-muted)] max-w-2xl mx-auto mt-4 leading-relaxed">
            Exclusive customized apparel, party favors, and digital assets to make your event truly yours.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                  isActive 
                    ? "bg-[var(--color-charcoal)] text-white shadow-md" 
                    : "bg-white text-[var(--color-charcoal)] border border-[var(--color-border)] hover:border-[var(--color-rose-gold)]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col bg-white rounded-2xl shadow-sm border border-[var(--color-border-light)] overflow-hidden cursor-pointer"
              >
                <Link href={`/shop/${product.slug}`} className="block flex-1">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-surface-2)]">
                    {/* Placeholder image rendering */}
                    <div className="absolute inset-0 flex items-center justify-center p-6 grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105">
                      <Image 
                        src={product.image} 
                        alt={product.title} 
                        fill 
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                      />
                    </div>
                    {/* Quick View overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-center font-bold text-sm uppercase tracking-widest">
                        Quick View
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <span className="text-[var(--color-rose-gold)] font-bold text-xs uppercase tracking-widest mb-1 block">
                      {product.category}
                    </span>
                    <h3 className="font-display text-2xl text-[var(--color-charcoal)] mb-2 mt-1 line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="font-body text-gray-500 text-sm line-clamp-2 mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-editorial text-2xl text-[var(--color-charcoal)] font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                      <button className="w-10 h-10 rounded-full bg-[var(--color-rose-gold-light)] text-white flex items-center justify-center hover:bg-[var(--color-rose-gold)] transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24 text-[var(--color-muted)] font-editorial text-xl italic">
            Check back soon for new additions to this collection!
          </div>
        )}

      </div>
    </div>
  );
}
