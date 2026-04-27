"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageSquare, Phone, Star, Navigation, Stethoscope } from "lucide-react";
import { useState } from "react";
import EmergencyModal from "./EmergencyModal";
import AppointmentModal from "./AppointmentModal";

const Hero = () => {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  
  const whatsappNumber = "918885553193";
  const callNumber = "8885553193";

  return (
    <section className="relative min-h-[850px] w-full overflow-hidden flex flex-col bg-brand-blue-deep">
      {/* Background with Strengthened Gradient for Text Legibility */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-image.jpg"
          alt="Emergency trauma care hospital in Nagercoil"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Stronger left-side gradient to protect text visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-deep via-brand-blue-deep/95 via-brand-blue-deep/80 to-brand-blue-deep/30" />
      </div>
      
      {/* Subtle Paytm-style Accent Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-teal/10 rounded-full blur-[140px] -mr-48 -mt-48 animate-pulse" />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 max-w-7xl mx-auto w-full py-16 md:py-24 pb-52">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl drop-shadow-2xl"
        >
          {/* Rating & Trust Pill */}
          <div className="inline-flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/20 shadow-lg">
              <div className="flex text-brand-teal">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <span className="text-[11px] font-bold text-white uppercase tracking-widest pl-1 border-l border-white/10">
                Expert Trauma Specialists
              </span>
            </div>
            <div className="flex items-center gap-2 bg-brand-teal/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-brand-teal/30">
               <span className="h-1.5 w-1.5 rounded-full bg-brand-teal animate-pulse" />
               <span className="text-[11px] font-bold text-brand-teal uppercase tracking-widest">
                 Rapid Response Team
               </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-6 [text-shadow:_0_4px_8px_rgba(0,0,0,0.3)]">
            <span className="text-brand-teal">M L Hospital</span> <br />
            24/7 Emergency <br />
            Trauma Care Center <br />
            <span className="text-xl md:text-3xl font-bold text-slate-100 italic [text-shadow:_0_2px_4px_rgba(0,0,0,0.4)]">in Nagercoil, Tamil Nadu</span>
          </h1>

          <p className="text-base md:text-lg text-white mb-10 leading-relaxed max-w-xl font-bold [text-shadow:_0_2px_6px_rgba(0,0,0,0.5)]">
            Immediate treatment for accidents, fractures, spine injuries, and critical trauma care. Our expert team is ready to respond instantly.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-14">
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsAppointmentModalOpen(true)}
              className="flex items-center justify-center gap-2.5 bg-brand-teal text-white px-8 py-4.5 rounded-2xl font-bold text-base shadow-[0_20px_40px_-10px_rgba(0,185,241,0.4)] transition-all cursor-pointer"
            >
              <MessageSquare size={20} />
              Schedule an Appointment
            </motion.button>

            <motion.a
              whileHover={{ y: -2, backgroundColor: "rgba(0,185,241,0.1)" }}
              whileTap={{ scale: 0.98 }}
              href="/second-opinion"
              className="flex items-center justify-center gap-2.5 bg-white/5 backdrop-blur-md border border-brand-teal/40 hover:border-brand-teal text-white px-8 py-4.5 rounded-2xl font-bold text-base transition-all"
            >
              <Stethoscope size={20} className="text-brand-teal" />
              Get Second Opinion
            </motion.a>

            <motion.a
              whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.98 }}
              href={`tel:${callNumber}`}
              className="flex items-center justify-center gap-2.5 bg-white/5 backdrop-blur-md border border-white/20 hover:border-white text-white px-8 py-4.5 rounded-2xl font-bold text-base transition-all"
            >
              <Phone size={20} className="text-brand-teal" />
              Call Emergency
            </motion.a>

            <motion.a
              whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.98 }}
              href="https://maps.app.goo.gl/UKf1gtRV4BevzFU2A"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-white/5 backdrop-blur-md border border-white/20 hover:border-white text-white px-8 py-4.5 rounded-2xl font-bold text-base transition-all"
            >
              <Navigation size={20} className="text-brand-teal" />
              Get Directions
            </motion.a>
          </div>

          {/* Emergency Highlight Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/20">
            {[
              "Accident & Trauma Care",
              "Fracture & Orthopedic Surgery",
              "Spine & Joint Treatment",
              "Plastic & Reconstruction Surgery"
            ].map((text) => (
              <div key={text} className="flex flex-col gap-2">
                <div className="h-0.5 w-6 bg-brand-teal rounded-full" />
                <span className="text-[11px] md:text-[12px] font-bold text-white uppercase tracking-widest leading-snug drop-shadow-md">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sticky Bottom CTA for Mobile */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[60] flex items-center gap-3">
        <a 
          href={`tel:${callNumber}`}
          className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl text-brand-teal shadow-2xl border border-slate-100 flex items-center justify-center"
        >
          <Phone size={20} fill="currentColor" className="text-brand-teal" />
        </a>
        <button 
          onClick={() => setIsAppointmentModalOpen(true)}
          className="flex-1 bg-red-600/95 backdrop-blur-md text-white py-3.5 rounded-2xl font-semibold text-sm shadow-2xl flex items-center justify-center gap-2 border border-red-500/20 uppercase tracking-wide"
        >
          <MessageSquare size={18} />
          Schedule Appointment
        </button>
      </div>

      {/* Bottom Wave Curve */}
      <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[80px] md:h-[120px]"
        >
          <path 
            d="M0,0 C300,10 600,100 1200,50 V120 H0 Z" 
            fill="white"
          />
        </svg>
      </div>
      {/* Floating Pulse Dot Decorative */}
      <div className="absolute top-[40%] right-[15%] hidden lg:block">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-teal"></span>
        </div>
      </div>
      <EmergencyModal 
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        whatsappNumber={whatsappNumber}
      />
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        centralNumber={whatsappNumber}
      />
    </section>
  );
};

export default Hero;
