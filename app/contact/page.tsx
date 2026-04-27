"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div style={{ background: "var(--color-warm-white)", minHeight: "100vh", paddingTop: "120px" }}>
      <div className="container-glam pb-24">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          <span className="section-label">Get In Touch</span>
          <h1 className="section-title">Contact Us</h1>
          <hr className="gold-divider" />
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 max-w-5xl mx-auto">
          
          {/* Info Side */}
          <motion.div 
            className="w-full md:w-5/12 bg-white p-10 rounded-2xl shadow-sm border border-[var(--color-border-light)]"
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-8">Direct Contact</h2>
            
            <div className="space-y-6 font-body text-[var(--color-foreground)]">
              <div>
                <p className="text-sm font-bold text-[var(--color-muted)] uppercase tracking-wider mb-1">Phone / Text</p>
                <a href="tel:9374140357" className="text-lg hover:text-[var(--color-rose-gold)] transition-colors">(937) 414-0357</a>
              </div>
              
              <div>
                <p className="text-sm font-bold text-[var(--color-muted)] uppercase tracking-wider mb-1">Service Area</p>
                <p className="text-lg">Dayton, OH &amp; Surrounding Areas</p>
              </div>
              
              <div>
                <p className="text-sm font-bold text-[var(--color-muted)] uppercase tracking-wider mb-1">Hours</p>
                <p className="text-lg">Mon-Fri: 9am - 6pm</p>
                <p className="text-md text-[var(--color-muted)] mt-1">Weekend installations by appointment</p>
              </div>
            </div>

            <div className="mt-10 p-6 bg-[var(--color-surface-2)] rounded-xl">
              <p className="font-editorial text-lg italic text-[var(--color-charcoal)]">
                Looking to request a custom quote or secure a date? Head over to our booking form!
              </p>
              <a href="/book" className="text-[var(--color-rose-gold)] font-bold text-sm uppercase tracking-widest mt-3 inline-block">
                Go to Booking Form →
              </a>
            </div>
          </motion.div>

          {/* Simple Form Side */}
          <motion.div 
            className="w-full md:w-7/12 bg-white p-10 rounded-2xl shadow-sm border border-[var(--color-border-light)]"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="font-display text-2xl text-[var(--color-charcoal)] mb-8">Send a Message</h2>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-charcoal)] mb-1">First Name</label>
                  <input type="text" className="input-glam" placeholder="Jane" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-charcoal)] mb-1">Last Name</label>
                  <input type="text" className="input-glam" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-[var(--color-charcoal)] mb-1">Email Address</label>
                <input type="email" className="input-glam" placeholder="jane@example.com" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-[var(--color-charcoal)] mb-1">Message</label>
                <textarea className="input-glam min-h-[150px] resize-y" placeholder="How can we help you today?" />
              </div>

              <button type="button" className="btn-glam w-full mt-4">
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
