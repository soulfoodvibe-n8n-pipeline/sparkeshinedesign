"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const portfolioCategories = [
  "All",
  "Balloon Arches",
  "Centerpieces",
  "Charcuterie",
  "Pedestal Art",
  "Full Events",
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<{ src: string; alt: string; title: string; category: string } | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPortfolio() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('portfolio_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        // Map database columns to component props
        const mappedData = data.map(item => ({
          src: item.image_url,
          alt: item.title,
          title: item.title,
          category: item.category
        }));
        setPortfolioItems(mappedData);
      }
      setLoading(false);
    }
    loadPortfolio();
  }, []);

  const filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

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
          <h1 className="section-title">The Gallery</h1>
          <hr className="gold-divider" />
          <p className="section-subtitle">A collection of our favorite hand-crafted celebrations.</p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {portfolioCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                  isActive 
                    ? "bg-[var(--color-rose-gold)] text-white shadow-md" 
                    : "bg-white text-[var(--color-charcoal)] border border-[var(--color-border)] hover:border-[var(--color-rose-gold)]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-rose-gold)]"></div>
          </div>
        )}

        {/* Masonry Grid */}
        {!loading && (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.src + i}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedItem(item)}
                  className="portfolio-card group relative overflow-hidden rounded-xl bg-white shadow-sm cursor-pointer"
                  style={{ height: i % 2 === 0 ? "400px" : "320px" }}
                >
                  <Image 
                    src={item.src} 
                    alt={item.alt} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-[var(--color-rose-gold-light)] text-xs font-bold uppercase tracking-widest mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-white font-display text-xl leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-xs uppercase tracking-widest mt-2 font-body font-bold flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                      Expand
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <AnimatePresence>
          {!loading && filteredItems.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 text-[var(--color-muted)] font-editorial text-lg italic"
            >
              No items currently available in this category.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="p-8 md:p-12 rounded-2xl bg-hero-gradient text-white shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="font-display text-3xl md:text-4xl mb-4 text-white">Inspired by what you see?</h2>
              <p className="font-body text-white/80 mb-8 max-w-xl mx-auto">Let&apos;s create something beautiful and entirely unique for your next celebration.</p>
              <Link href="/book" className="btn-glam bg-white text-[var(--color-charcoal)] hover:bg-white hover:scale-105 inline-block">
                ✨ Start Your Design
              </Link>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[100] bg-black/90 p-4 md:p-10 flex items-center justify-center cursor-pointer flex-col"
          >
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/70 hover:text-white z-10 cursor-pointer"
              onClick={(e) => { e.stopPropagation(); setSelectedItem(null); }}
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl aspect-[4/3] md:aspect-video rounded-xl overflow-hidden shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={selectedItem.src} 
                alt={selectedItem.alt}
                fill
                className="object-contain bg-black"
                sizes="100vw"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-6"
            >
              <span className="text-[var(--color-rose-gold)] font-bold text-xs uppercase tracking-widest">{selectedItem.category}</span>
              <h3 className="font-display text-white text-2xl md:text-3xl mt-2 mb-4">{selectedItem.title}</h3>
              <Link href={`/book?service=${selectedItem.category.replace(' ', '+')}`} className="btn-glam-outline text-white border-white/40 hover:border-white">
                Inquire About This Design
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
