"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Phone, ChevronRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import EmergencyModal from "./EmergencyModal";
import AppointmentModal from "./AppointmentModal";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Insurance", href: "/insurance" },
  { name: "Second Opinion", href: "/second-opinion", isFree: true },
  { name: "About", href: "/about" },
  { name: "Doctors", href: "/#doctors" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  // Do not show the main Navbar on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const whatsappNumber = "918885553193";
  const callNumber = "8885553193";

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md px-4 md:px-8 py-4 shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="h-11 w-11 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm transition-transform group-hover:scale-105">
              <Image
                src="/logo.jpg"
                alt="M L Hospital Logo"
                width={44}
                height={44}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden xl:block">
              <span className="text-[14px] font-black text-brand-blue-deep uppercase tracking-tighter leading-none block">M L Hospital</span>
              <span className="text-[10px] font-bold text-brand-teal uppercase tracking-[0.2em] leading-none">Since 1991</span>
            </div>
          </Link>

          {/* Desktop Nav - Neater & Aligned */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.filter(l => l.name !== "Home").map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-[12px] font-black uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isActive 
                      ? "text-brand-teal bg-brand-teal/5" 
                      : "text-slate-600 hover:text-brand-teal hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                  {link.isFree && (
                    <span className="px-1.5 py-0.5 rounded-md bg-[#FF9900] text-[8px] font-black text-white uppercase tracking-tighter animate-bounce shadow-[0_0_10px_rgba(255,153,0,0.5)]">
                      Free
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Group */}
          <div className="hidden lg:flex items-center gap-5 shrink-0 pl-4 border-l border-slate-100">
            <a href={`tel:${callNumber}`} className="flex flex-col items-end group">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">24/7 Helpline</span>
              <span className="flex items-center gap-1.5 text-[15px] font-black text-slate-900 group-hover:text-brand-teal transition-colors">
                <Phone size={14} className="text-brand-teal" />
                {callNumber}
              </span>
            </a>
            <button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="bg-brand-blue-deep hover:bg-brand-blue-deep/90 text-white px-6 py-3.5 rounded-2xl font-black text-[12px] uppercase tracking-widest transition-all shadow-xl shadow-brand-blue-deep/10 active:scale-95"
            >
              Emergency Appointment
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="lg:hidden text-slate-800 p-2.5 bg-slate-50 rounded-2xl border border-slate-100 transition-all active:scale-90" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed top-[76px] left-0 right-0 z-40 bg-white border-b border-slate-100 shadow-2xl overflow-hidden rounded-b-[32px]"
          >
            <div className="p-6 pb-2 border-b border-slate-50 flex items-center justify-between">
              <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm">
                <Image
                  src="/logo.jpg"
                  alt="M L Hospital Logo"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em]">M L Hospital</span>
            </div>
            <nav className="flex flex-col p-6 pt-2 gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center justify-between text-slate-700 hover:text-brand-teal transition-colors text-lg font-bold py-3 border-b border-slate-50 last:border-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    {link.name}
                    {link.isFree && (
                      <span className="px-2 py-0.5 rounded-lg bg-[#FF9900] text-[10px] font-black text-white uppercase tracking-widest animate-pulse shadow-[0_0_12px_rgba(255,153,0,0.6)]">
                        Free
                      </span>
                    )}
                  </div>
                  <ChevronRight size={18} className="text-slate-300" />
                </Link>
              ))}
              <div className="mt-6 flex flex-col gap-4">
                <a
                  href={`tel:${callNumber}`}
                  className="flex items-center justify-center gap-3 bg-slate-50 text-slate-900 py-4.5 rounded-[22px] font-bold border border-slate-100"
                >
                  <Phone size={20} className="text-brand-teal" />
                  Call Emergency
                </a>
                <button
                  onClick={() => {
                    setIsAppointmentModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-3 bg-brand-teal text-white py-4.5 rounded-[22px] font-bold shadow-xl shadow-brand-teal/20"
                >
                  <MessageSquare size={20} />
                  Emergency Appointment
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emergency Modal */}
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
    </>
  );
};

export default Navbar;
