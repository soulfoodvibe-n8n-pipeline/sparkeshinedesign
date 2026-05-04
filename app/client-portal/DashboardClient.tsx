"use client";

import { motion } from "framer-motion";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DashboardProps {
  user: User;
  clientData: any;
  activeEvent: any;
  rsvpCount: number;
  galleryCount: number;
}

export default function DashboardClient({ user, clientData, activeEvent, rsvpCount, galleryCount }: DashboardProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/client-portal/login");
    router.refresh();
  };

  const clientName = clientData ? clientData.first_name : "VIP";
  const eventTitle = activeEvent ? activeEvent.title : "Your Command Center";

  return (
    <div style={{ background: "var(--color-warm-white)", minHeight: "100vh" }}>
      {/* Header */}
      <section className="pt-32 pb-12 bg-hero-gradient text-center relative">
        <div className="absolute top-24 right-8 flex items-center gap-6">
          <Link href="/client-portal/help" className="text-[var(--color-champagne)] hover:text-white text-sm uppercase tracking-widest font-bold">
            Help &amp; Support
          </Link>
          <button 
            onClick={handleSignOut}
            className="text-white/70 hover:text-white text-sm uppercase tracking-widest font-bold"
          >
            Sign Out
          </button>
        </div>
        <div className="container-glam relative z-10">
          <motion.h1 
            className="font-display text-4xl md:text-5xl text-white mb-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          >
            {eventTitle}
          </motion.h1>
          <motion.p 
            className="font-editorial text-xl italic text-[var(--color-blush-light)]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          >
            Welcome back, {clientName}. Manage your event, review RSVPs, and moderate your gallery.
          </motion.p>
        </div>
      </section>

      {/* Dashboard Grid */}
      <section className="py-16">
        <div className="container-glam max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Widget 1: RSVPs */}
            <div className="glass-card p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-rose-gold)] flex items-center justify-center text-white mb-4 shadow-soft">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-[var(--color-charcoal)] mb-2">Guest RSVPs</h3>
              <p className="font-body text-4xl font-bold text-[var(--color-rose-gold)] mb-4">{rsvpCount}</p>
              <Link href="/client-portal/rsvps" className="btn-glam w-full text-sm py-2 block">View Guest List</Link>
            </div>

            {/* Widget 2: Financials */}
            <div className="glass-card p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-champagne)] flex items-center justify-center text-white mb-4 shadow-soft">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-[var(--color-charcoal)] mb-2">Remaining Balance</h3>
              <p className="font-body text-4xl font-bold text-[var(--color-charcoal)] mb-4">
                ${activeEvent?.balance_due ? Number(activeEvent.balance_due).toFixed(2) : "0.00"}
              </p>
              <button 
                onClick={async () => {
                  if (!activeEvent || !activeEvent.balance_due || activeEvent.balance_due <= 0) {
                    alert("You have no outstanding balance!");
                    return;
                  }
                  
                  try {
                    const res = await fetch('/api/checkout', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ eventId: activeEvent.id })
                    });
                    const data = await res.json();
                    if (data.url) {
                      window.location.href = data.url;
                    } else {
                      alert(data.error || "Failed to create checkout session");
                    }
                  } catch (e) {
                    console.error(e);
                    alert("Network error.");
                  }
                }}
                className="btn-glam-outline w-full text-sm py-2 border-[var(--color-champagne)] text-[var(--color-champagne)] hover:bg-[var(--color-champagne)] hover:text-white"
              >
                Make Payment
              </button>
            </div>

            {/* Widget 3: Live Gallery */}
            <div className="glass-card p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-mauve)] flex items-center justify-center text-white mb-4 shadow-soft">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-[var(--color-charcoal)] mb-2">Live Gallery</h3>
              <p className="font-body text-4xl font-bold text-[var(--color-mauve)] mb-4">{galleryCount}</p>
              <Link href="/client-portal/gallery" className="btn-glam-outline w-full text-sm py-2 block border-[var(--color-mauve)] text-[var(--color-mauve)] hover:bg-[var(--color-mauve)] hover:text-white text-center">Moderate Photos</Link>
            </div>

          </div>

          {/* Invitation Studio Banner */}
          <div className="mt-12 glass-card p-10 flex flex-col md:flex-row items-center justify-between gap-8 border-l-4 border-[var(--color-rose-gold)]">
            <div>
              <span className="section-label mb-2">Exclusive Access</span>
              <h2 className="font-display text-3xl text-[var(--color-charcoal)] mb-2">Invitation Studio</h2>
              <p className="font-body text-[var(--color-muted)] max-w-lg">
                Generate your custom digital VIP passes for your guests. Track opens, collect RSVPs, and manage your custom merch store link.
              </p>
            </div>
            <Link href="/client-portal/invitations" className="btn-glam whitespace-nowrap">
              Launch Studio ✨
            </Link>
          </div>

          {/* Social Auto-Pilot Banner */}
          <div className="mt-8 glass-card p-10 flex flex-col md:flex-row items-center justify-between gap-8 border-l-4" style={{ borderColor: clientData?.facebook_access_token ? '#1877F2' : 'var(--color-border-light)' }}>
            <div>
              <span className="section-label mb-2" style={{ color: clientData?.facebook_access_token ? '#1877F2' : '' }}>
                {clientData?.facebook_access_token ? 'Active Add-on' : 'SaaS Upgrade'}
              </span>
              <h2 className="font-display text-3xl text-[var(--color-charcoal)] mb-2">Social Auto-Pilot</h2>
              <p className="font-body text-[var(--color-muted)] max-w-lg">
                Automatically post exciting updates, countdowns, and galleries to your Facebook Page without lifting a finger.
              </p>
            </div>
            {clientData?.facebook_access_token ? (
              <div className="flex flex-col items-center">
                <span className="px-6 py-3 bg-[#1877F2]/10 text-[#1877F2] font-bold rounded-full uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Page Connected
                </span>
                <span className="text-xs text-[var(--color-muted)]">Auto-Posting is ON</span>
              </div>
            ) : (
              <button 
                onClick={async () => {
                  await supabase.auth.signInWithOAuth({
                    provider: 'facebook',
                    options: {
                      scopes: 'pages_manage_posts,pages_read_engagement',
                      redirectTo: `${window.location.origin}/auth/callback`
                    }
                  });
                }}
                className="btn-glam whitespace-nowrap !bg-[#1877F2] hover:!bg-[#1877F2]/90 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Connect Facebook
              </button>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
