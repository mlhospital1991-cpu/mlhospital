"use client";

import React from "react";
import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin, 
  ChevronRight,
  ShieldCheck,
  Activity
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = "918885553193";

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Medical Services", href: "/services" },
    { name: "Our Doctors", href: "/#doctors" },
    { name: "Insurance Partners", href: "/insurance" },
    { name: "Hospital Gallery", href: "/gallery" },
    { name: "Contact Us", href: "/contact" },
  ];

  const specialties = [
    { name: "Orthopedics & Spine", href: "/services#ortho" },
    { name: "Plastic & Cosmetic", href: "/services#plastic" },
    { name: "Advanced Burns Care", href: "/services#burns" },
    { name: "Maternity & Gynecology", href: "/services#maternity" },
    { name: "Critical Care (ICU)", href: "/services#icu" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-teal rounded-xl flex items-center justify-center shadow-lg shadow-brand-teal/20">
                <Activity className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                M&nbsp;L&nbsp;<span className="text-brand-teal">Hospital</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 font-medium">
              Providing world-class medical facilities and compassionate care to Nagercoil for over 34 years. Specialized in trauma, burns, and advanced surgeries.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-teal hover:text-white transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-teal hover:text-white transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-teal hover:text-white transition-all duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="group flex items-center gap-2 hover:text-brand-teal transition-colors text-sm font-medium"
                  >
                    <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8">Specialties</h4>
            <ul className="space-y-4">
              {specialties.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="group flex items-center gap-2 hover:text-brand-teal transition-colors text-sm font-medium"
                  >
                    <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h4 className="text-white font-bold text-lg mb-2">Get in Touch</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-800 flex items-center justify-center text-brand-teal">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-1">Our Location</p>
                  <p className="text-[13px] leading-relaxed text-slate-400">P.W.D Road, Nagercoil,<br />Tamil Nadu 629001</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-800 flex items-center justify-center text-brand-teal">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-1">Emergency 24/7</p>
                  <a href={`tel:${whatsappNumber}`} className="text-[13px] text-slate-400 hover:text-brand-teal transition-colors">+91 88855 53193</a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-800 flex items-center justify-center text-brand-teal">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-1">Email Us</p>
                  <a href="mailto:info@mlhospital.com" className="text-[13px] text-slate-400 hover:text-brand-teal transition-colors">info@mlhospital.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-slate-800 mb-10" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p className="text-slate-500 font-medium">
            © {currentYear} M L Hospital. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              <ShieldCheck size={14} className="text-brand-teal" />
              Google Verified Business
            </div>
            <Link href="/admin" className="text-slate-500 hover:text-white transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
