"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, MessageSquare, Phone, MapPin, ArrowLeft, Clock, ShieldAlert } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function EmergencyPage() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    issue: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const whatsappNumber = "918885553193";
  const emergencyCall = "8885553193";

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, location, issue } = formData;
    if (!name || !location || !issue) {
      alert("Please fill in all fields for a faster response.");
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          location,
          issue,
          doctor: "EMERGENCY",
          date: now.toISOString(),
          time: formattedTime,
          status: "emergency"
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      const message = encodeURIComponent(
        `*URGENT EMERGENCY INTAKE*\n\n` +
        `*Name:* ${name}\n` +
        `*Location:* ${location}\n` +
        `*Issue:* ${issue}\n\n` +
        `Sent via Emergency Page.`
      );
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    } catch (error) {
      setSaveError("System busy. Redirecting to WhatsApp...");
      const message = encodeURIComponent(`Emergency! Name: ${name}, Location: ${location}, Issue: ${issue}`);
      setTimeout(() => {
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
      }, 1500);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full px-6 py-12 md:py-24 gap-12">
        {/* Left Side: Information */}
        <div className="flex-1 space-y-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-3 bg-red-50 px-4 py-2 rounded-2xl border border-red-100">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-[11px] font-black text-red-600 uppercase tracking-[0.2em]">Live Emergency Response</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1]">
              Critical Care <br />
              <span className="text-red-600">When Every Second</span> <br />
              Counts.
            </h1>
            
            <p className="text-lg text-slate-500 font-medium max-w-xl leading-relaxed">
              M L Hospital's Trauma Center is equipped with state-of-the-art facilities and a specialized response team available 24/7 in Nagercoil.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: Clock, title: "24/7 Availability", desc: "Our trauma specialists are always on duty." },
              { icon: ShieldAlert, title: "Advanced Trauma", desc: "Equipped for complex orthopedic surgeries." },
              { icon: MapPin, title: "Prime Location", desc: "Easily accessible center in the heart of Nagercoil." },
              { icon: Phone, title: "Direct Hotline", desc: "Instant connection to our emergency dispatch." }
            ].map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-red-600 mb-4">
                  <item.icon size={24} />
                </div>
                <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-xs text-slate-400 font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-200">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Emergency Hotline</p>
            <a 
              href={`tel:${emergencyCall}`}
              className="inline-flex items-center gap-4 text-3xl md:text-4xl font-black text-red-600 hover:scale-105 transition-transform"
            >
              <Phone size={32} fill="currentColor" />
              +91 88855 53193
            </a>
          </div>
        </div>

        {/* Right Side: Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full md:w-[480px] bg-white rounded-[48px] shadow-2xl shadow-red-600/5 border border-slate-100 overflow-hidden"
        >
          <div className="bg-red-600 p-10 text-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="flex items-center gap-4 mb-3 relative z-10">
              <div className="bg-white/20 p-3 rounded-2xl">
                <AlertCircle size={28} />
              </div>
              <h3 className="text-3xl font-bold">Intake Form</h3>
            </div>
            <p className="text-red-100 text-sm font-semibold opacity-90 relative z-10">Details provided here help our team prepare for your arrival.</p>
          </div>

          <form onSubmit={handleSend} className="p-10 space-y-8">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">Patient Full Name</label>
              <input
                required
                type="text"
                placeholder="Enter patient name"
                className="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-red-600/5 focus:border-red-600 transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">Current Location</label>
              <input
                required
                type="text"
                placeholder="Area or Landmark in Nagercoil"
                className="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-red-600/5 focus:border-red-600 transition-all"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">Describe Situation</label>
              <textarea
                required
                placeholder="Briefly describe the injury or medical issue..."
                rows={4}
                className="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-red-600/5 focus:border-red-600 transition-all resize-none"
                value={formData.issue}
                onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
              />
            </div>

            {saveError && <p className="text-red-500 text-xs font-bold text-center animate-pulse">{saveError}</p>}

            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-red-600 hover:brightness-110 text-white py-6 rounded-[28px] font-bold text-xl flex items-center justify-center gap-4 transition-all shadow-xl shadow-red-600/20 active:scale-95 disabled:opacity-70"
            >
              {isSaving ? (
                <div className="w-7 h-7 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <MessageSquare size={24} />
                  Notify Hospital Team
                </>
              )}
            </button>
            
            <p className="text-center text-slate-400 text-[11px] font-bold uppercase tracking-widest">
              * Immediate WhatsApp alert sent to triage
            </p>
          </form>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
