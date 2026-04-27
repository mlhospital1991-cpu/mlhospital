"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";

export default function AdminLoginForm() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (res.ok) {
        window.location.reload(); // Refresh to trigger server-side auth check
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-blue-deep flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-full blur-3xl -mr-16 -mt-16" />
        
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-brand-teal/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Stethoscope className="text-brand-teal" size={40} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">ML Hospital Admin</h1>
          <p className="text-slate-500 text-sm font-medium">Global Portal Authentication</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-2">Username</label>
              <input
                type="text"
                placeholder="staff_id"
                className="w-full bg-slate-50 border border-slate-200 rounded-[22px] px-6 py-4 text-sm font-bold focus:border-brand-teal focus:outline-none focus:ring-4 focus:ring-brand-teal/5 transition-all text-center"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-2">Access Key</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-[22px] px-6 py-4 text-sm font-bold focus:border-brand-teal focus:outline-none focus:ring-4 focus:ring-brand-teal/5 transition-all text-center tracking-[0.3em]"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-xs font-bold text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-blue-deep text-white py-5 rounded-[22px] font-bold text-lg shadow-xl shadow-brand-blue-deep/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Access System"}
          </button>
        </form>

        <p className="mt-10 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          Identity Managed Security
        </p>
      </motion.div>
    </div>
  );
}
