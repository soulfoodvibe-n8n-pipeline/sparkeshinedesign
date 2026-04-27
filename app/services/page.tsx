"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const servicesList = [
  {
    id: "arches",
    title: "Balloon Arches & Garlands",
    price: "Starting at $150",
    desc: "The ultimate focal point for any entry, stage, or photo backdrop. Custom built to match your venue's size and your event's exact color palette.",
    features: ["Classic Spiral", "Organic / Freeform", "Add-ons: Florals, Foils, Custom Vinyl"],
    image: "/images/portfolio/1000010492.png",
    reverse: false,
  },
  {
    id: "centerpieces",
    title: "Centerpieces & Pedestals",
    price: "Starting at $45 each",
    desc: "Elevate your tablescapes with custom balloon centerpieces. From elegant gold and acrylic pedestals to playful character-themed designs.",
    features: ["Bobo Balloons with stuffed animals", "Floral & Pearl draping", "Personalized lettering"],
    image: "/images/portfolio/1000010451.png",
    reverse: true,
  },
  {
    id: "charcuterie",
    title: "Personalized Charcuterie",
    price: "Starting at $65",
    desc: "Beautifully styled artisan grazing boxes and boards. Perfect for bridal parties, VIP tables, or elegant corporate gifts.",
    features: ["Premium meats & cheeses", "Custom branded ribbons & boxes", "Mini balloon accents"],
    image: "/images/portfolio/1000010482.png",
    reverse: false,
  },
  {
    id: "theme",
    title: "Full Theme Design",
    price: "Custom Quote",
    desc: "You dream it, we create it. We handle the complete visual transformation of your venue including backdrops, table settings, and large-scale balloon art.",
    features: ["On-site installation & teardown", "Pre-event 3D mockup consultation", "Vendor coordination"],
    image: "/images/portfolio/1000010511.jpg",
    reverse: true,
  }
];

export default function ServicesPage() {
  return (
    <div style={{ background: "var(--color-warm-white)", minHeight: "100vh" }}>
      
      {/* Header */}
      <section className="pt-32 pb-16 bg-blush-gradient text-center">
        <div className="container-glam">
          <motion.h1 
            className="font-display text-4xl md:text-5xl lg:text-6xl text-[var(--color-charcoal)] mb-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          >
            Our Services
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <hr className="gold-divider" />
            <p className="font-editorial text-xl italic text-[var(--color-muted)] max-w-2xl mx-auto mt-4">
              From a single gorgeous centerpiece to a complete venue transformation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16">
        <div className="container-glam">
          <div className="flex flex-col gap-24">
            {servicesList.map((svc, i) => (
              <motion.div 
                key={svc.id}
                id={svc.id}
                className={`flex flex-col md:flex-row gap-8 lg:gap-16 items-center ${svc.reverse ? 'md:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                {/* Image */}
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-square md:aspect-[4/5] rounded-tl-[4rem] rounded-br-[4rem] overflow-hidden shadow-xl border-4 border-white">
                    <Image src={svc.image} alt={svc.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  </div>
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2 space-y-6">
                  <span className="text-[var(--color-rose-gold)] font-bold text-sm tracking-widest uppercase">{svc.price}</span>
                  <h2 className="font-display text-3xl md:text-4xl text-[var(--color-charcoal)]">{svc.title}</h2>
                  <p className="font-body text-[var(--color-muted)] text-lg leading-relaxed">{svc.desc}</p>
                  
                  <ul className="space-y-3 pt-4 border-t border-[var(--color-border-light)]">
                    {svc.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-[var(--color-foreground)]">
                        <svg className="w-5 h-5 text-[var(--color-rose-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6">
                    <Link href={`/book?service=${svc.id}`} className="btn-glam">
                      Inquire About This Service
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
