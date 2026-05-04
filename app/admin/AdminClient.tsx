"use client";

import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface AdminProps {
  user: User;
  clients: any[];
  events: any[];
  totalRevenue: number;
}

export default function AdminClient({ user, clients, events, totalRevenue }: AdminProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  // Client Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Event Form State
  const [selectedClientId, setSelectedClientId] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [balanceDue, setBalanceDue] = useState("0");

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('clients').insert({
      user_id: user.id, // In a real app, you'd create a separate auth user. For this prototype, we map it to the admin so RLS passes.
      first_name: firstName,
      last_name: lastName,
      email: email,
    });

    setLoading(false);
    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Client Created!");
      setFirstName("");
      setLastName("");
      setEmail("");
      router.refresh();
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Auto-generate slug from title
    const slug = eventTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const { error } = await supabase.from('events').insert({
      client_id: selectedClientId,
      title: eventTitle,
      slug: slug,
      event_date: new Date(eventDate).toISOString(),
      balance_due: parseFloat(balanceDue)
    });

    setLoading(false);
    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Event Provisioned!");
      setEventTitle("");
      setEventDate("");
      setBalanceDue("0");
      router.refresh();
    }
  };

  return (
    <div style={{ background: "var(--color-charcoal)", minHeight: "100vh", color: "white" }}>
      {/* Header */}
      <section className="pt-24 pb-12 bg-black/40 text-center relative border-b border-white/10">
        <button 
          onClick={handleSignOut}
          className="absolute top-10 right-8 text-white/50 hover:text-white text-sm uppercase tracking-widest font-bold transition-colors"
        >
          Lock Console
        </button>
        <div className="container-glam relative z-10">
          <motion.h1 
            className="font-display text-4xl md:text-5xl text-[var(--color-rose-gold)] mb-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          >
            Owner's Command Center
          </motion.h1>
          <motion.p 
            className="font-editorial text-xl italic text-white/70"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          >
            Provision new clients, deploy events, and track revenue.
          </motion.p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16">
        <div className="container-glam max-w-6xl">
          
          {/* Revenue Widget */}
          <div className="mb-12 glass-card p-10 flex flex-col md:flex-row items-center justify-between gap-8 !bg-white/5 border border-white/10">
            <div>
              <span className="section-label mb-2 text-green-400">Financial Overview</span>
              <h2 className="font-display text-3xl text-white mb-2">Total Pending Revenue</h2>
              <p className="font-body text-white/50 max-w-lg">
                The total amount of outstanding invoices across all active client events.
              </p>
            </div>
            <div className="text-right">
              <span className="font-body text-5xl font-bold text-green-400">
                ${totalRevenue.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Create Client Form */}
            <div className="glass-card p-8 !bg-white/5 border border-white/10">
              <h3 className="font-display text-2xl text-[var(--color-rose-gold)] mb-6">1. Add New Client</h3>
              <form onSubmit={handleCreateClient} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">First Name</label>
                    <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} className="input-glam w-full !bg-black/40 !text-white !border-white/20" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Last Name</label>
                    <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)} className="input-glam w-full !bg-black/40 !text-white !border-white/20" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Email</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="input-glam w-full !bg-black/40 !text-white !border-white/20" />
                </div>
                <button type="submit" disabled={loading} className="btn-glam w-full !bg-[var(--color-rose-gold)] !text-white border-none mt-4">
                  Create Client Profile
                </button>
              </form>
            </div>

            {/* Create Event Form */}
            <div className="glass-card p-8 !bg-white/5 border border-white/10">
              <h3 className="font-display text-2xl text-[var(--color-rose-gold)] mb-6">2. Provision Event</h3>
              <form onSubmit={handleCreateEvent} className="space-y-4">
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Select Client</label>
                  <select required value={selectedClientId} onChange={e => setSelectedClientId(e.target.value)} className="input-glam w-full !bg-black/40 !text-white !border-white/20">
                    <option value="">-- Choose a Client --</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.first_name} {c.last_name} ({c.email})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Event Title</label>
                  <input type="text" required value={eventTitle} onChange={e => setEventTitle(e.target.value)} placeholder="e.g. The Smith Wedding" className="input-glam w-full !bg-black/40 !text-white !border-white/20" />
                  <p className="text-[10px] text-white/30 mt-1">URL will auto-generate based on title.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Event Date</label>
                    <input type="date" required value={eventDate} onChange={e => setEventDate(e.target.value)} className="input-glam w-full !bg-black/40 !text-white !border-white/20" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 uppercase tracking-widest mb-1">Invoice Balance ($)</label>
                    <input type="number" step="0.01" required value={balanceDue} onChange={e => setBalanceDue(e.target.value)} className="input-glam w-full !bg-black/40 !text-white !border-white/20" />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-glam w-full !bg-white !text-black border-none mt-4">
                  Deploy Event Dashboard
                </button>
              </form>
            </div>

          </div>

          {/* Active Events Table */}
          <div className="mt-12 glass-card p-8 !bg-white/5 border border-white/10">
            <h3 className="font-display text-2xl text-[var(--color-rose-gold)] mb-6">Active Deployments</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 uppercase tracking-widest">
                    <th className="pb-3 font-medium">Event Title</th>
                    <th className="pb-3 font-medium">Client</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Balance</th>
                    <th className="pb-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {events.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-white/30 italic">No active events found.</td>
                    </tr>
                  ) : events.map(evt => (
                    <tr key={evt.id} className="border-b border-white/5 text-white/80">
                      <td className="py-4 font-bold">{evt.title}</td>
                      <td className="py-4">{evt.clients?.first_name} {evt.clients?.last_name}</td>
                      <td className="py-4">{new Date(evt.event_date).toLocaleDateString()}</td>
                      <td className="py-4 text-green-400">${Number(evt.balance_due).toFixed(2)}</td>
                      <td className="py-4 text-right">
                        <a href={`/vip/${evt.slug}`} target="_blank" className="text-[var(--color-rose-gold)] hover:text-white underline text-xs">View VIP Page</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
