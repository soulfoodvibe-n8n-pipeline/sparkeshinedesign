"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LoginPage() {
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
      router.push("/client-portal");
      router.refresh();
    }
  };

  return (
    <div style={{ background: "var(--color-warm-white)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="container-glam max-w-md w-full">
        <motion.div 
          className="glass-card p-10 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-script text-4xl text-[var(--color-rose-gold)] mb-4">Welcome</span>
          <h1 className="font-display text-2xl text-[var(--color-charcoal)] mb-8 text-center">
            Client Command Center
          </h1>

          {message && (
            <div className={`w-full p-4 mb-6 rounded-md text-sm text-center ${message.type === "error" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>
              {message.text}
            </div>
          )}

          {/* Email & Password Login */}
          <form onSubmit={handleLogin} className="w-full space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-glam w-full"
                placeholder="VIP Email Address"
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
                className="input-glam w-full"
                placeholder="Access Code / Password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-glam w-full justify-center"
            >
              {loading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>
          
        </motion.div>
      </div>
    </div>
  );
}
