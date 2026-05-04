"use client";

import { motion } from "framer-motion";
import RSVPForm from "./RSVPForm";
import PublicGallery from "./PublicGallery";
import TipJar from "./TipJar";

export default function VIPClientPage({ 
  event, 
  gallery, 
  activeTheme, 
  themeIndex, 
  eventType 
}: any) {
  const formattedDate = new Date(event.event_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const wordingVariant = themeIndex;

  const scrollToRSVP = () => {
    document.getElementById('rsvp-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: activeTheme.bgColor }}>
      
      {/* 1. The Saved Invitation Card */}
      <section className="min-h-[80vh] flex items-center justify-center p-4 py-20 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full flex justify-center"
        >
          {/* Elegant Layout */}
          {activeTheme.layout === "elegant" && (
            <div 
              className="w-full max-w-xl p-12 shadow-2xl text-center relative"
              style={{ backgroundColor: activeTheme.bgColor, border: `12px solid ${activeTheme.bgColor === 'white' ? '#f5f5f5' : 'white'}` }}
            >
              <div className="absolute top-0 left-0 w-full h-full border m-[-6px] pointer-events-none opacity-50" style={{ borderColor: activeTheme.borderColor }}></div>
              <p className="text-xs uppercase tracking-[0.3em] mb-10 font-bold" style={{ color: activeTheme.accentColor }}>
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
              
              <h2 className="font-script text-6xl mb-8 leading-tight" style={{ color: activeTheme.textColor }}>{event.title}</h2>
              <div className="w-16 h-[1px] mx-auto mb-8" style={{ backgroundColor: activeTheme.borderColor }}></div>
              <p className="font-editorial text-xl mb-3" style={{ color: activeTheme.textColor }}>{formattedDate}</p>
              <p className="text-base mb-12" style={{ color: activeTheme.accentColor, opacity: 0.8 }}>{event.location || "Location to be announced"}</p>
              
              <button onClick={scrollToRSVP} className="inline-block px-10 py-4 text-sm uppercase tracking-widest font-bold hover:opacity-80 transition-opacity" style={{ backgroundColor: activeTheme.accentColor, color: activeTheme.bgColor }}>
                RSVP Now
              </button>
            </div>
          )}

          {/* Modern Layout */}
          {activeTheme.layout === "modern" && (
            <div 
              className="w-full max-w-xl p-16 border-4 shadow-2xl text-left"
              style={{ backgroundColor: activeTheme.bgColor, borderColor: activeTheme.borderColor }}
            >
              <div className="mb-8">
                <span className="px-4 py-2 text-xs uppercase tracking-widest font-bold" style={{ backgroundColor: activeTheme.accentColor, color: activeTheme.bgColor }}>
                  {eventType === "wedding" && "Wedding Celebration"}
                  {eventType === "birthday" && "Birthday Party"}
                  {eventType === "babyshower" && "Baby Shower"}
                  {eventType === "corporate" && "Exclusive Event"}
                </span>
              </div>
              
              <h2 className="font-display font-bold text-6xl uppercase tracking-tight mb-12 leading-[0.9]" style={{ color: activeTheme.textColor }}>
                {event.title.split(' ').map((word: string, i: number) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h2>
              
              <div className="space-y-6 mb-16">
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold" style={{ color: activeTheme.accentColor }}>When</p>
                  <p className="text-lg font-medium" style={{ color: activeTheme.textColor }}>{formattedDate}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold" style={{ color: activeTheme.accentColor }}>Where</p>
                  <p className="text-lg font-medium" style={{ color: activeTheme.textColor }}>{event.location || "TBA"}</p>
                </div>
              </div>
              
              <button onClick={scrollToRSVP} className="w-full py-5 border-2 text-center text-sm uppercase tracking-widest font-bold hover:bg-[var(--color-charcoal)] hover:text-white transition-colors" style={{ borderColor: activeTheme.borderColor, color: activeTheme.textColor }}>
                Submit RSVP
              </button>
            </div>
          )}

          {/* Floral Layout */}
          {activeTheme.layout === "floral" && (
            <div 
              className="w-full max-w-xl p-14 shadow-2xl text-center rounded-t-full"
              style={{ backgroundColor: activeTheme.bgColor }}
            >
              <div className="w-20 h-20 mx-auto mb-8" style={{ color: activeTheme.accentColor }}>
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
              </div>
              
              <h2 className="font-script text-6xl mb-6 leading-tight" style={{ color: activeTheme.textColor }}>{event.title}</h2>
              
              <p className="font-editorial text-lg mb-10 px-6 leading-relaxed" style={{ color: activeTheme.accentColor }}>
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
              
              <p className="text-base font-bold uppercase tracking-widest mb-2" style={{ color: activeTheme.textColor }}>{formattedDate}</p>
              <p className="text-sm mb-12" style={{ color: activeTheme.accentColor }}>{event.location || "Location TBA"}</p>
              
              <button onClick={scrollToRSVP} className="inline-block px-10 py-4 rounded-full text-sm uppercase tracking-widest font-bold hover:opacity-80 transition-opacity" style={{ backgroundColor: activeTheme.accentColor, color: activeTheme.bgColor }}>
                Kindly RSVP
              </button>
            </div>
          )}
        </motion.div>
      </section>

      {/* 2. RSVP Form Section */}
      <section id="rsvp-section" className="py-20 bg-white/50 backdrop-blur-md">
        <div className="container-glam max-w-3xl">
          <RSVPForm eventId={event.id} activeTheme={activeTheme} />
        </div>
      </section>

      {/* 3. Public Gallery Section */}
      <section className="py-20">
        <div className="container-glam max-w-5xl">
          <PublicGallery eventId={event.id} initialImages={gallery} activeTheme={activeTheme} />
        </div>
      </section>

      {/* 4. Digital Tip Jar */}
      <section className="py-20 bg-black/5 backdrop-blur-md">
        <div className="container-glam">
          <TipJar eventId={event.id} />
        </div>
      </section>
    </div>
  );
}
