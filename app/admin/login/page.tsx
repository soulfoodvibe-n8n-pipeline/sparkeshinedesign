"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  // Hardcoded for testing, just like the client portal
  const [email, setEmail] = useState("vip@example.com");
  const [password, setPassword] = useState("Sparkle2026!");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const router = useRouter();

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage({ text: error.message, type: "error" });
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div style={{ background: "var(--color-charcoal)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="container-glam max-w-md w-full">
        <motion.div 
          className="glass-card p-10 flex flex-col items-center !bg-white/5 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-script text-4xl text-[var(--color-rose-gold)] mb-4">Admin</span>
          <h1 className="font-display text-2xl text-white mb-8 text-center">
            God Mode
          </h1>

          {message && (
            <div className={`w-full p-4 mb-6 rounded-md text-sm text-center ${message.type === "error" ? "bg-red-900/50 text-red-200" : "bg-green-900/50 text-green-200"}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleLogin} className="w-full space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Owner Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-glam w-full !bg-black/20 !text-white !border-white/20"
                placeholder="Owner Email Address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-glam w-full !bg-black/20 !text-white !border-white/20"
                placeholder="Master Password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-glam w-full justify-center !bg-[var(--color-rose-gold)] !text-white"
            >
              {loading ? "Authenticating..." : "Access God Mode"}
            </button>
          </form>
          
        </motion.div>
      </div>
    </div>
  );
}
