"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { motion } from "framer-motion";

interface ImageRecord {
  id: string;
  image_url: string;
  is_approved: boolean;
  created_at: string;
}

export default function GalleryClient({ activeEvent, initialImages }: { activeEvent: any, initialImages: ImageRecord[] }) {
  const [images, setImages] = useState<ImageRecord[]>(initialImages);
  const supabase = createClient();

  const toggleApproval = async (id: string, currentStatus: boolean) => {
    // Optimistic UI update
    setImages(images.map(img => img.id === id ? { ...img, is_approved: !currentStatus } : img));

    const { error } = await supabase
      .from("gallery_images")
      .update({ is_approved: !currentStatus })
      .eq("id", id);

    if (error) {
      console.error("Error updating image status", error);
      // Revert on error
      setImages(images.map(img => img.id === id ? { ...img, is_approved: currentStatus } : img));
    }
  };

  const approvedCount = images.filter(i => i.is_approved).length;

  return (
    <div className="min-h-screen bg-[var(--color-warm-white)]">
      {/* Header */}
      <section className="pt-32 pb-12 bg-hero-gradient text-white">
        <div className="container-glam">
          <Link href="/client-portal" className="text-sm uppercase tracking-widest font-bold text-white/70 hover:text-white mb-6 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="font-display text-4xl mb-2">Live Gallery Moderation</h1>
          <p className="font-editorial text-xl italic text-[var(--color-blush-light)]">
            Review and approve photos captured at {activeEvent.title}.
          </p>
        </div>
      </section>

      {/* Stats & Actions */}
      <section className="py-8 border-b border-[var(--color-border-light)] bg-white/50">
        <div className="container-glam max-w-7xl flex flex-wrap gap-6 justify-between items-center">
          <div className="flex gap-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-1">Total Photos</p>
              <p className="font-display text-2xl text-[var(--color-charcoal)]">{images.length}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-1">Approved for Public</p>
              <p className="font-display text-2xl text-[var(--color-sage)]">{approvedCount}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12">
        <div className="container-glam max-w-7xl">
          {images.length === 0 ? (
            <div className="text-center py-20 bg-white/50 rounded-xl border border-dashed border-[var(--color-border-light)]">
              <div className="w-16 h-16 rounded-full bg-[var(--color-blush-light)] flex items-center justify-center mx-auto mb-4 text-white">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl text-[var(--color-charcoal)] mb-2">No photos yet</h3>
              <p className="text-[var(--color-muted)]">When your photographer drops photos into the folder, they will auto-sync here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((img) => (
                <motion.div 
                  key={img.id} 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`group relative aspect-square overflow-hidden rounded-xl border-4 transition-all duration-300 ${img.is_approved ? 'border-transparent shadow-md' : 'border-[var(--color-rose-gold)] opacity-60'}`}
                >
                  <img src={img.image_url} alt="Gallery Event" className="w-full h-full object-cover" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      onClick={() => toggleApproval(img.id, img.is_approved)}
                      className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest ${img.is_approved ? 'bg-white text-[var(--color-charcoal)] hover:bg-red-50 hover:text-red-600' : 'bg-[var(--color-rose-gold)] text-white hover:bg-[var(--color-champagne)]'}`}
                    >
                      {img.is_approved ? "Hide Image" : "Approve Image"}
                    </button>
                  </div>

                  {/* Status Badge */}
                  <div className={`absolute top-3 left-3 px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full ${img.is_approved ? 'bg-[var(--color-sage)] text-white' : 'bg-[var(--color-rose-gold)] text-white'}`}>
                    {img.is_approved ? "Public" : "Hidden"}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
