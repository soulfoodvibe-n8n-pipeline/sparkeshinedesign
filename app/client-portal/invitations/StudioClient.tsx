"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface EventData {
  id: string;
  title: string;
  slug: string;
  event_date: string;
  location: string;
}

const templateThemes = [
  { layout: "elegant", bgColor: "var(--color-warm-white)", borderColor: "var(--color-rose-gold)", textColor: "var(--color-rose-gold)", accentColor: "var(--color-charcoal)", name: "Classic Rose" },
  { layout: "modern", bgColor: "white", borderColor: "var(--color-charcoal)", textColor: "var(--color-charcoal)", accentColor: "var(--color-charcoal)", name: "Monochrome Modern" },
  { layout: "floral", bgColor: "#F2F4F0", borderColor: "transparent", textColor: "#4A5D4E", accentColor: "#8C9B8F", name: "Sage Garden" },
  { layout: "elegant", bgColor: "#FDFBF7", borderColor: "#D4AF37", textColor: "#D4AF37", accentColor: "#111111", name: "Royal Gold" },
  { layout: "modern", bgColor: "#1A1A1A", borderColor: "var(--color-champagne)", textColor: "var(--color-champagne)", accentColor: "white", name: "Midnight Glamour" },
  { layout: "floral", bgColor: "#F5F0F6", borderColor: "transparent", textColor: "#6A4C93", accentColor: "#B594C4", name: "Lavender Dream" },
];

export default function StudioClient({ activeEvent }: { activeEvent: EventData }) {
  const [eventType, setEventType] = useState<"wedding" | "birthday" | "babyshower" | "corporate">("wedding");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // Dynamic preview title & slug for dummy data demo
  let displayTitle = activeEvent.title;
  let dynamicSlug = activeEvent.slug;

  if (activeEvent.title.includes("Wedding")) {
    if (eventType === "birthday") {
      displayTitle = "Sarah's 30th Birthday";
      dynamicSlug = "sarahs-30th-birthday";
    }
    if (eventType === "babyshower") {
      displayTitle = "Baby Smith's Shower";
      dynamicSlug = "baby-smiths-shower";
    }
    if (eventType === "corporate") {
      displayTitle = "Annual Corporate Gala";
      dynamicSlug = "annual-corporate-gala";
    }
  }

  const vipUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/vip/${dynamicSlug}`;
  const formattedDate = new Date(activeEvent.event_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const handleCopy = () => {
    navigator.clipboard.writeText(vipUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSave = async () => {
    setLoading(true);
    const { createClient } = await import('@/lib/supabase/client');
    const supabase = createClient();
    
    const { error } = await supabase
      .from('events')
      .update({
        theme_index: currentIndex,
        event_type: eventType
      })
      .eq('id', activeEvent.id);
      
    if (error) {
      alert("Failed to save design. Please try again.");
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setLoading(false);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % templateThemes.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + templateThemes.length) % templateThemes.length);
  };

  const activeTheme = templateThemes[currentIndex];
  const wordingVariant = currentIndex; // Tie wording directly to the theme index

  return (
    <div className="min-h-screen bg-[var(--color-warm-white)]">
      {/* Header */}
      <section className="pt-32 pb-12 bg-hero-gradient text-white">
        <div className="container-glam">
          <Link href="/client-portal" className="text-sm uppercase tracking-widest font-bold text-white/70 hover:text-white mb-6 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="font-display text-4xl mb-2">Invitation Studio</h1>
          <p className="font-editorial text-xl italic text-[var(--color-blush-light)]">
            Design your digital VIP pass and share it with your guests.
          </p>
        </div>
      </section>

      {/* Workspace */}
      <section className="py-12">
        <div className="container-glam max-w-7xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Controls (4 cols) */}
            <div className="lg:col-span-4 space-y-6">

              {/* Event Type Selector */}
              <div className="glass-card p-6 border-l-4 border-[var(--color-rose-gold)]">
                <h3 className="font-display text-xl text-[var(--color-charcoal)] mb-4 border-b border-[var(--color-border-light)] pb-2">1. Select Event Type</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "wedding", label: "Wedding" },
                    { id: "birthday", label: "Birthday" },
                    { id: "babyshower", label: "Baby Shower" },
                    { id: "corporate", label: "Corporate" }
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setEventType(type.id as any);
                        setCurrentIndex(0); // reset to first design
                      }}
                      className={`py-2 px-3 text-xs uppercase tracking-widest font-bold rounded transition-colors ${eventType === type.id ? "bg-[var(--color-charcoal)] text-white" : "bg-white text-[var(--color-muted)] border border-[var(--color-border-light)] hover:border-[var(--color-charcoal)]"}`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Share Link */}
              <div className="glass-card p-6 border-l-4 border-[var(--color-champagne)]">
                <h3 className="font-display text-xl text-[var(--color-charcoal)] mb-4 border-b border-[var(--color-border-light)] pb-2">2. Share Your Link</h3>
                <p className="text-sm text-[var(--color-muted)] mb-4">
                  Copy this link and send it via Text, Email, or post it on Facebook. When guests click it, they will see your invitation and be asked to RSVP.
                </p>
                <div className="bg-white p-3 rounded border border-[var(--color-border-light)] text-xs truncate mb-4 select-all text-[var(--color-charcoal)] font-mono">
                  {vipUrl}
                </div>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={handleSave}
                    disabled={loading}
                    className={`btn-glam w-full flex items-center justify-center gap-2 ${saved ? '!bg-[var(--color-sage)]' : ''}`}
                  >
                    {loading ? "Saving..." : saved ? "Design Saved!" : "✨ Save & Publish Design"}
                  </button>
                  <button 
                    onClick={handleCopy}
                    className="w-full py-2 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-xs uppercase tracking-widest font-bold hover:bg-[var(--color-charcoal)] hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    {copied ? "Copied to Clipboard!" : "Copy Digital VIP Link"}
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Live Preview Carousel (8 cols) */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl text-[var(--color-charcoal)]">Live Preview Carousel</h3>
                <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-rose-gold)]">
                  {activeTheme.name} ({currentIndex + 1} of {templateThemes.length})
                </p>
              </div>
              
              <div className="bg-white p-4 md:p-12 rounded-xl shadow-lg border border-[var(--color-border-light)] flex items-center justify-center min-h-[600px] relative overflow-hidden group">
                
                {/* Carousel Navigation Arrows */}
                <button onClick={goPrev} className="absolute left-4 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-[var(--color-border-light)] text-[var(--color-charcoal)] flex items-center justify-center hover:bg-[var(--color-warm-white)] transition-colors opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={goNext} className="absolute right-4 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-[var(--color-border-light)] text-[var(--color-charcoal)] flex items-center justify-center hover:bg-[var(--color-warm-white)] transition-colors opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>

                {/* Animated Template Rendering */}
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={`${activeTheme.name}-${eventType}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex justify-center"
                  >
                    {/* Elegant Layout */}
                    {activeTheme.layout === "elegant" && (
                      <div 
                        className="w-full max-w-md p-10 shadow-2xl text-center relative"
                        style={{ backgroundColor: activeTheme.bgColor, border: `12px solid ${activeTheme.bgColor === 'white' ? '#f5f5f5' : 'white'}` }}
                      >
                        <div className="absolute top-0 left-0 w-full h-full border m-[-6px] pointer-events-none opacity-50" style={{ borderColor: activeTheme.borderColor }}></div>
                        
                        <p className="text-[10px] uppercase tracking-[0.3em] mb-8 font-bold" style={{ color: activeTheme.accentColor }}>
                          {eventType === "wedding" && wordingVariant === 0 && "You are joyfully invited to"}
                          {eventType === "wedding" && wordingVariant === 1 && "Together with their families"}
                          {eventType === "wedding" && wordingVariant === 2 && "Please join us for the wedding of"}
                          {eventType === "wedding" && wordingVariant === 3 && "With joyful hearts we invite you to"}
                          {eventType === "wedding" && wordingVariant === 4 && "Celebrate the marriage of"}
                          {eventType === "wedding" && wordingVariant === 5 && "The honor of your presence is requested at"}
                          
                          {eventType === "birthday" && wordingVariant === 0 && "Join us in celebrating"}
                          {eventType === "birthday" && wordingVariant === 1 && "You're invited to a birthday bash"}
                          {eventType === "birthday" && wordingVariant === 2 && "Let's party! It's time for"}
                          {eventType === "birthday" && wordingVariant === 3 && "Cheers to another great year for"}
                          {eventType === "birthday" && wordingVariant === 4 && "Eat, drink, and celebrate with"}
                          {eventType === "birthday" && wordingVariant === 5 && "A special milestone deserves a celebration for"}

                          {eventType === "babyshower" && wordingVariant === 0 && "A new arrival is coming soon"}
                          {eventType === "babyshower" && wordingVariant === 1 && "Join us for a baby shower honoring"}
                          {eventType === "babyshower" && wordingVariant === 2 && "Let's shower the parents-to-be"}
                          {eventType === "babyshower" && wordingVariant === 3 && "Twinkle twinkle, it's time for a shower honoring"}
                          {eventType === "babyshower" && wordingVariant === 4 && "A grand adventure is about to begin for"}
                          {eventType === "babyshower" && wordingVariant === 5 && "Bottles, booties, and joy! A shower for"}

                          {eventType === "corporate" && wordingVariant === 0 && "You are cordially invited to"}
                          {eventType === "corporate" && wordingVariant === 1 && "Join us for our annual event"}
                          {eventType === "corporate" && wordingVariant === 2 && "An evening of excellence"}
                          {eventType === "corporate" && wordingVariant === 3 && "We request the pleasure of your company at"}
                          {eventType === "corporate" && wordingVariant === 4 && "A premier networking experience"}
                          {eventType === "corporate" && wordingVariant === 5 && "Celebrating our partners and success at"}
                        </p>
                        
                        <h2 className="font-script text-5xl mb-6 leading-tight" style={{ color: activeTheme.textColor }}>{displayTitle}</h2>
                        
                        <div className="w-12 h-[1px] mx-auto mb-6" style={{ backgroundColor: activeTheme.borderColor }}></div>
                        
                        <p className="font-editorial text-lg mb-2" style={{ color: activeTheme.textColor }}>{formattedDate}</p>
                        <p className="text-sm mb-10" style={{ color: activeTheme.accentColor, opacity: 0.8 }}>{activeEvent.location || "Location to be announced"}</p>
                        
                        <div className="inline-block px-8 py-3 text-xs uppercase tracking-widest font-bold cursor-pointer" style={{ backgroundColor: activeTheme.accentColor, color: activeTheme.bgColor }}>
                          RSVP Now
                        </div>
                      </div>
                    )}

                    {/* Modern Layout */}
                    {activeTheme.layout === "modern" && (
                      <div 
                        className="w-full max-w-md p-12 border-2 shadow-2xl text-left"
                        style={{ backgroundColor: activeTheme.bgColor, borderColor: activeTheme.borderColor }}
                      >
                        <div className="mb-6">
                          <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold" style={{ backgroundColor: activeTheme.accentColor, color: activeTheme.bgColor }}>
                            {eventType === "wedding" && "Wedding Celebration"}
                            {eventType === "birthday" && "Birthday Party"}
                            {eventType === "babyshower" && "Baby Shower"}
                            {eventType === "corporate" && "Exclusive Event"}
                          </span>
                        </div>
                        
                        <h2 className="font-display font-bold text-4xl uppercase tracking-tight mb-8 leading-none" style={{ color: activeTheme.textColor }}>
                          {displayTitle.split(' ').map((word, i) => (
                            <span key={i} className="block">{word}</span>
                          ))}
                        </h2>
                        
                        <div className="space-y-4 mb-12">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: activeTheme.accentColor }}>When</p>
                            <p className="text-sm font-medium" style={{ color: activeTheme.textColor }}>{formattedDate}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: activeTheme.accentColor }}>Where</p>
                            <p className="text-sm font-medium" style={{ color: activeTheme.textColor }}>{activeEvent.location || "TBA"}</p>
                          </div>
                        </div>
                        
                        <div className="w-full py-4 border text-center text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer" style={{ borderColor: activeTheme.borderColor, color: activeTheme.textColor }}>
                          Submit RSVP
                        </div>
                      </div>
                    )}

                    {/* Floral Layout */}
                    {activeTheme.layout === "floral" && (
                      <div 
                        className="w-full max-w-md p-10 shadow-2xl text-center rounded-t-full"
                        style={{ backgroundColor: activeTheme.bgColor }}
                      >
                        <div className="w-16 h-16 mx-auto mb-6" style={{ color: activeTheme.accentColor }}>
                          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                        </div>
                        
                        <h2 className="font-script text-4xl mb-4 leading-tight" style={{ color: activeTheme.textColor }}>{displayTitle}</h2>
                        
                        <p className="font-editorial mb-8 px-4" style={{ color: activeTheme.accentColor }}>
                          {eventType === "wedding" && wordingVariant === 0 && "Two hearts, one journey. Join us as we tie the knot."}
                          {eventType === "wedding" && wordingVariant === 1 && "We can't wait to share our special day with you."}
                          {eventType === "wedding" && wordingVariant === 2 && "Celebrate love, laughter, and our happily ever after."}
                          {eventType === "wedding" && wordingVariant === 3 && "A day of love, a lifetime of happiness."}
                          {eventType === "wedding" && wordingVariant === 4 && "Because you have shared in our lives, please share in our joy."}
                          {eventType === "wedding" && wordingVariant === 5 && "Join us for dinner, dancing, and our vows."}
                          
                          {eventType === "birthday" && wordingVariant === 0 && "Another year of wonderful memories. Let's celebrate!"}
                          {eventType === "birthday" && wordingVariant === 1 && "Good food, good friends, and good times ahead."}
                          {eventType === "birthday" && wordingVariant === 2 && "Bring your dancing shoes and a big appetite!"}
                          {eventType === "birthday" && wordingVariant === 3 && "Join the fun and help us make this birthday unforgettable."}
                          {eventType === "birthday" && wordingVariant === 4 && "A little older, a lot more fabulous."}
                          {eventType === "birthday" && wordingVariant === 5 && "No gifts, just your wonderful presence required!"}

                          {eventType === "babyshower" && wordingVariant === 0 && "Showering the parents-to-be with love and joy."}
                          {eventType === "babyshower" && wordingVariant === 1 && "A sweet little bundle is almost here!"}
                          {eventType === "babyshower" && wordingVariant === 2 && "Join us for games, gifts, and baby giggles."}
                          {eventType === "babyshower" && wordingVariant === 3 && "Ten little fingers, ten little toes, the love in our hearts just overflows."}
                          {eventType === "babyshower" && wordingVariant === 4 && "Help us prepare the nest for our newest addition."}
                          {eventType === "babyshower" && wordingVariant === 5 && "A baby is brewing! Come celebrate the upcoming arrival."}

                          {eventType === "corporate" && wordingVariant === 0 && "Join us for an evening of connection and celebration."}
                          {eventType === "corporate" && wordingVariant === 1 && "Celebrating our milestones and looking to the future."}
                          {eventType === "corporate" && wordingVariant === 2 && "An exclusive gathering for our most valued partners."}
                          {eventType === "corporate" && wordingVariant === 3 && "Drinks, hors d'oeuvres, and excellent conversation."}
                          {eventType === "corporate" && wordingVariant === 4 && "Reflecting on a successful year with our dedicated team."}
                          {eventType === "corporate" && wordingVariant === 5 && "Network with industry leaders and innovators."}
                        </p>
                        
                        <p className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: activeTheme.textColor }}>{formattedDate}</p>
                        <p className="text-xs mb-8" style={{ color: activeTheme.accentColor }}>{activeEvent.location || "Location TBA"}</p>
                        
                        <div className="inline-block px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold cursor-pointer" style={{ backgroundColor: activeTheme.accentColor, color: activeTheme.bgColor }}>
                          Kindly RSVP
                        </div>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>

              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
