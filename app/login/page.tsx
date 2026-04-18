"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.refresh(); 
        router.push("/admin");
      } else {
        alert("Access Denied: Invalid Token");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-page-shell">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="login-card"
      >
        <div className="login-header">
          <span className="eyebrow !text-[#C8A988]">Security</span>
          <h1 className="text-white font-serif text-4xl mt-4 italic">Studio Access</h1>
          <p className="text-white/40 text-[10px] tracking-[3px] uppercase mt-2">
            Enter your private studio token
          </p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="login-input-wrapper">
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-field"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="secondary-button !w-full"
          >
            {isSubmitting ? "Verifying..." : "Authenticate"}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/5">
          <p className="text-[9px] tracking-[4px] text-white/20 uppercase">
            Clicksandkids © 2026
          </p>
        </div>
      </motion.div>
    </main>
  );
}