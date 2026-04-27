"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";

type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  venue: string;
  services: string[];
  vision: string;
  budget: string;
};

const serviceOptions = [
  "Balloon Arches",
  "Centerpieces/Pedestals",
  "Charcuterie Boxes",
  "Full Theme Design",
  "Backdrops",
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const totalSteps = 3;

  const { register, handleSubmit, control, trigger, formState: { errors } } = useForm<BookingFormData>({
    defaultValues: {
      services: [],
    }
  });

  const nextStep = async (currentStep: number) => {
    let isStepValid = false;
    
    if (currentStep === 1) {
      isStepValid = await trigger(["firstName", "lastName", "email", "phone"]);
    } else if (currentStep === 2) {
      isStepValid = await trigger(["eventType", "eventDate", "venue"]);
    }
    
    if (isStepValid) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      // 1. Send the form data to n8n webhook API for logging/CRM
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      // 2. Generate a Stripe Checkout Session for the $50 deposit
      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail: data.email,
          successUrl: `${window.location.origin}/book?success=true`,
          cancelUrl: `${window.location.origin}/book?canceled=true`,
          metadata: { orderType: "Booking_Deposit", eventDate: data.eventDate },
          items: [
            {
              name: "In-Person Venue Consultation & Design Walk-through",
              description: "A preliminary design consultation. This $50 fee secures your date for a walk-through and is applied toward your final balance.",
              price: 50.00,
              quantity: 1
            }
          ]
        }),
      });

      const session = await checkoutRes.json();

      if (session.url) {
        // Redirect to Stripe Hosted Checkout
        window.location.href = session.url;
      } else {
        alert("Payment gateway error. Please try again.");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Listen for Stripe redirect success/cancel in URL params
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true" && !isSuccess) {
      setIsSuccess(true);
    }
  }

  if (isSuccess) {
    return (
      <div style={{ background: "var(--color-warm-white)", minHeight: "100vh", paddingTop: "120px" }}>
        <div className="container-glam pb-24 flex items-center justify-center pt-24">
          <motion.div 
            className="bg-white p-12 rounded-3xl shadow-lg border border-[var(--color-border-light)] text-center max-w-2xl w-full"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-20 h-20 bg-[var(--color-rose-gold-light)] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-4xl">
              ✨
            </div>
            <h1 className="font-display text-4xl text-[var(--color-charcoal)] mb-4">Request Received!</h1>
            <p className="font-body text-lg text-[var(--color-muted)] mb-8">
              Thank you for reaching out to Angel&apos;s Sparkle &amp; Shine Design Co.<br/>
              I will review your vision and contact you within 48 hours to discuss next steps.
            </p>
            <Link href="/" className="btn-glam">
              Return Home
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--color-warm-white)", minHeight: "100vh", paddingTop: "120px" }}>
      <div className="container-glam pb-24 max-w-4xl">
        
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          <span className="section-label">Consultation Request</span>
          <h1 className="section-title">Design Your Dream Event</h1>
          <hr className="gold-divider" />
          <p className="font-editorial text-lg italic text-[var(--color-muted)] max-w-2xl mx-auto mt-4 leading-relaxed">
            Fill out the form below to initiate your $50 in-person consultation at your venue. 
            I look forward to discussing your exact vision!
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-10 w-full bg-[var(--color-border-light)] h-2 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[var(--color-rose-gold)]"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <motion.div 
          className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-[var(--color-border-light)]"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            
            {/* ─── STEP 1 ─── */}
            <div className={step === 1 ? "block animate-fade-in" : "hidden"}>
              <h2 className="font-display text-2xl text-[var(--color-charcoal)] border-b border-[var(--color-border-light)] pb-4 mb-6">
                Step 1: Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-charcoal)] mb-1">First Name *</label>
                  <input 
                    type="text" 
                    className={`input-glam ${errors.firstName ? 'border-red-400 focus:border-red-500 shadow-none' : ''}`}
                    placeholder="Your first name" 
                    {...register("firstName", { required: true })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-charcoal)] mb-1">Last Name *</label>
                  <input 
                    type="text" 
                    className={`input-glam ${errors.lastName ? 'border-red-400 focus:border-red-500 shadow-none' : ''}`}
                    placeholder="Your last name" 
                    {...register("lastName", { required: true })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-charcoal)] mb-1">Email Address *</label>
                  <input 
                    type="email" 
                    className={`input-glam ${errors.email ? 'border-red-400 focus:border-red-500 shadow-none' : ''}`}
                    placeholder="you@email.com" 
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-charcoal)] mb-1">Phone Number *</label>
                  <input 
                    type="tel" 
                    className={`input-glam ${errors.phone ? 'border-red-400 focus:border-red-500 shadow-none' : ''}`}
                    placeholder="(123) 456-7890" 
                    {...register("phone", { required: true })}
                  />
                </div>
              </div>
              <div className="pt-6 flex justify-end">
                <button type="button" onClick={() => nextStep(1)} className="btn-glam">Next Step →</button>
              </div>
            </div>

            {/* ─── STEP 2 ─── */}
            <div className={step === 2 ? "block animate-fade-in" : "hidden"}>
              <h2 className="font-display text-2xl text-[var(--color-charcoal)] border-b border-[var(--color-border-light)] pb-4 mb-6">
                Step 2: Event Details
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[var(--color-charcoal)] mb-1">Type of Event *</label>
                <select 
                  className={`input-glam bg-white appearance-none ${errors.eventType ? 'border-red-400 focus:border-red-500 shadow-none' : ''}`}
                  {...register("eventType", { required: true })}
                >
                  <option value="">Select an event type...</option>
                  <option value="Birthday Party">Birthday Party</option>
                  <option value="Baby Shower">Baby Shower</option>
                  <option value="Bridal Shower / Bachelorette">Bridal Shower / Bachelorette</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Graduation">Graduation</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-charcoal)] mb-1">Estimated Date *</label>
                  <input 
                    type="date" 
                    className={`input-glam ${errors.eventDate ? 'border-red-400 focus:border-red-500 shadow-none' : ''}`}
                    {...register("eventDate", { required: true })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-charcoal)] mb-1">Venue / Location (City) *</label>
                  <input 
                    type="text" 
                    className={`input-glam ${errors.venue ? 'border-red-400 focus:border-red-500 shadow-none' : ''}`}
                    placeholder="e.g. Dayton Country Club" 
                    {...register("venue", { required: true })}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[var(--color-charcoal)] mb-1">Primary Services Needed</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  <Controller
                    control={control}
                    name="services"
                    render={({ field }) => (
                      <>
                        {serviceOptions.map((svc) => (
                          <label key={svc} className="flex items-center gap-3 p-3 border border-[var(--color-border-light)] rounded-xl cursor-pointer hover:border-[var(--color-rose-gold)] transition-colors">
                            <input 
                              type="checkbox" 
                              value={svc}
                              checked={field.value.includes(svc)}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (e.target.checked) {
                                  field.onChange([...field.value, val]);
                                } else {
                                  field.onChange(field.value.filter(v => v !== val));
                                }
                              }}
                              className="w-5 h-5 text-[var(--color-rose-gold)] accent-[var(--color-rose-gold)]" 
                            />
                            <span className="text-sm font-body text-[var(--color-charcoal)]">{svc}</span>
                          </label>
                        ))}
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="pt-6 flex justify-between">
                <button type="button" onClick={() => setStep(1)} className="btn-glam-outline text-sm px-6">← Back</button>
                <button type="button" onClick={() => nextStep(2)} className="btn-glam">Next Step →</button>
              </div>
            </div>

            {/* ─── STEP 3 ─── */}
            <div className={step === 3 ? "block animate-fade-in" : "hidden"}>
              <h2 className="font-display text-2xl text-[var(--color-charcoal)] border-b border-[var(--color-border-light)] pb-4 mb-6">
                Step 3: Vision &amp; Style
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[var(--color-charcoal)] mb-1">Describe Your Vision</label>
                <textarea 
                  className="input-glam min-h-[120px] resize-y" 
                  placeholder="Theme, colors, style, and any specific inspiration you have in mind..." 
                  {...register("vision")}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-[var(--color-charcoal)] mb-1">Estimated Budget Range</label>
                <select className="input-glam bg-white appearance-none" {...register("budget")}>
                  <option value="">Select budget...</option>
                  <option value="$100 - $300">$100 - $300 (Small Arrangements)</option>
                  <option value="$300 - $800">$300 - $800 (Focal Points & Arches)</option>
                  <option value="$800 - $1500">$800 - $1500 (Partial Theme Coverage)</option>
                  <option value="$1500+">$1500+ (Full Venue Transformation)</option>
                </select>
              </div>
              
              <div className="p-5 bg-[var(--color-surface-2)] rounded-xl mt-6 border border-[var(--color-border)]">
                <p className="text-sm text-[var(--color-charcoal)] leading-relaxed font-semibold">
                  Note: A non-refundable $50 consultation fee is required to officially secure an in-person venue walk-through. This fee will be applied toward your final balance if you book our services.
                </p>
              </div>

              <div className="pt-6 flex justify-between">
                <button type="button" onClick={() => setStep(2)} className="btn-glam-outline text-sm px-6">← Back</button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-glam bg-[var(--color-charcoal)] disabled:opacity-70 disabled:cursor-wait"
                >
                  {isSubmitting ? "Submitting..." : "Submit Inquiry ✨"}
                </button>
              </div>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
}
