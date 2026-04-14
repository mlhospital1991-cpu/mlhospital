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
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md px-6 md:px-12 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm">
              <Image
                src="/logo.jpg"
                alt="M L Hospital Logo - Trauma Care Nagercoil"
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-600 hover:text-brand-teal transition-colors text-[14px] font-bold uppercase tracking-wider"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-6 border-l border-slate-200 pl-8">
              <a href={`tel:${callNumber}`} className="flex items-center gap-2 text-slate-800 font-bold hover:text-brand-teal transition-colors text-sm">
                <Phone size={16} className="text-brand-teal" />
                24/7: {callNumber}
              </a>
              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="bg-brand-blue-deep hover:brightness-110 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-brand-blue-deep/10"
              >
                Emergency Appointment
              </button>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button className="lg:hidden text-slate-800 p-2 bg-slate-50 rounded-xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                  {link.name}
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
