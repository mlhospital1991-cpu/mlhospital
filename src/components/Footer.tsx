"use client";

import React from "react";
import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  MessageCircle, 
  Share2, 
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
              Providing world-class medical facilities and compassionate care to Nagercoil for over 35 years. Specialized in trauma, burns, and advanced surgeries.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <a 
                href="https://www.facebook.com/share/18aNE88L9B/?mibextid=wwXIfr" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300 group"
                title="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/ml_hospital_nagercoil?igsh=MTgwYjVxZTJla2hwaw%3D%3D&utm_source=qr" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white transition-all duration-300 group"
                title="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-teal hover:text-white transition-all duration-300"
              >
                <Share2 size={18} />
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
