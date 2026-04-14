"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Camera, Award } from "lucide-react";

const galleryImages = [
  { src: "/WhatsApp Image 2026-04-10 at 4.44.28 PM (1).jpeg", alt: "M L Hospital Facility 1" },
  { src: "/WhatsApp Image 2026-04-10 at 4.44.28 PM.jpeg", alt: "M L Hospital Facility 2" },
  { src: "/WhatsApp Image 2026-04-10 at 4.44.29 PM (1).jpeg", alt: "Modern Equipment" },
  { src: "/WhatsApp Image 2026-04-10 at 4.44.29 PM.jpeg", alt: "Patient Care Ward" },
  { src: "/WhatsApp Image 2026-04-10 at 4.44.30 PM (1).jpeg", alt: "Trauma Care Unit" },
  { src: "/WhatsApp Image 2026-04-10 at 4.44.30 PM (2).jpeg", alt: "Orthopedic OT" },
  { src: "/WhatsApp Image 2026-04-10 at 4.44.30 PM (3).jpeg", alt: "Hospital Building Interior" },
  { src: "/WhatsApp Image 2026-04-10 at 4.44.30 PM.jpeg", alt: "Care Management" },
  { src: "/WhatsApp Image 2026-04-10 at 4.44.31 PM (1).jpeg", alt: "Emergency Room" },
  { src: "/WhatsApp Image 2026-04-10 at 4.44.31 PM.jpeg", alt: "Advanced ICU" },
  { src: "/WhatsApp Image 2026-04-10 at 4.44.32 PM (1).jpeg", alt: "Diagnostic Lab" },
  { src: "/WhatsApp Image 2026-04-10 at 4.44.32 PM.jpeg", alt: "Recovery Area" },
  { src: "/WhatsApp Image 2026-04-10 at 4.44.33 PM.jpeg", alt: "Waiting Lounge" },
  { src: "/WhatsApp Image 2026-04-10 at 4.44.34 PM.jpeg", alt: "Surgical Suite" },
  { src: "/WhatsApp Image 2026-04-10 at 4.44.35 PM (1).jpeg", alt: "Burn Care Ward" },
  { src: "/WhatsApp Image 2026-04-10 at 4.44.35 PM.jpeg", alt: "Hospital Entrance" },
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header Section */}
      <section className="bg-brand-blue-deep text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Image src="/Hero image.jpeg" alt="Background" fill sizes="100vw" className="object-cover" />
        </div>
        {/* Paytm-style gradient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal opacity-10 rounded-full blur-[100px] -mr-48 -mt-48" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 text-center md:text-left">
            <div className="max-w-2xl mx-auto md:mx-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold uppercase tracking-widest mb-4"
              >
                <Camera size={14} className="text-brand-teal" />
                Hospital Gallery
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold leading-tight"
              >
                Facilities & <span className="text-brand-teal">Infrastructure</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-slate-300 text-base md:text-lg leading-relaxed font-medium"
              >
                Take a virtual tour of M L Hospital's state-of-the-art trauma care environment in Nagercoil. 
                Our facilities are designed for rapid response and patient comfort.
              </motion.p>
            </div>
            
            <div className="flex items-center gap-6 border-l border-white/10 pl-8 hidden md:flex">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">16</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">High-Res Shots</span>
              </div>
              <div className="h-12 w-px bg-white/10 mx-2" />
              <div className="flex flex-col items-center text-brand-teal">
                <Award size={28} />
                <span className="text-[10px] font-bold uppercase tracking-widest mt-2">Certified Care</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Curved Divider */}
        <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[60px]">
            <path d="M0,0 C300,10 600,100 1200,50 V120 H0 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 4) * 0.1 }}
              className="group relative h-72 rounded-[32px] overflow-hidden border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-brand-teal/10 transition-all duration-500"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, (max-width: 1536px) 33vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-7">
                <div>
                  <div className="h-1 w-8 bg-brand-teal rounded-full mb-3" />
                  <p className="text-white font-bold text-sm tracking-wide leading-tight">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-24 text-center">
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.3em] mb-10">End of Gallery</p>
          <Link 
            href="/" 
            className="inline-flex items-center gap-4 bg-brand-blue-deep text-white px-10 py-5 rounded-2xl font-bold text-lg hover:brightness-110 transition-all shadow-2xl shadow-brand-blue-deep/10"
          >
            <Home size={22} />
            Return to Homepage
          </Link>
        </div>
      </section>

      {/* Footer Support */}
      <footer className="py-12 border-t border-slate-200 bg-white text-center">
        <p className="text-slate-500 text-sm font-medium">© 2026 M L Hospital Nagercoil. Modern Trauma Care.</p>
      </footer>
    </main>
  );
}
