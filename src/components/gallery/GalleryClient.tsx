"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Home, Camera, ChevronRight, RefreshCw, Layers } from "lucide-react";
import Link from "next/link";

interface GalleryImage {
  id: string;
  url: string;
  caption: string | null;
  collection: string;
  aspect: string;
  order: number;
}

interface GalleryClientProps {
  initialImages: GalleryImage[];
}

export default function GalleryClient({ initialImages }: GalleryClientProps) {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  const collections = Array.from(new Set(initialImages.map(img => img.collection)));
  
  const filteredImages = selectedCollection 
    ? initialImages.filter(img => img.collection === selectedCollection)
    : [];

  const getCollectionCover = (name: string) => {
    return initialImages.find(img => img.collection === name)?.url || "/hero-image.jpg";
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header Section */}
      <section className="relative bg-brand-blue-deep text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <Image src="/hero-image.jpg" alt="Background" fill sizes="100vw" className="object-cover grayscale" />
        </div>
        {/* Paytm-style gradient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal opacity-10 rounded-full blur-[100px] -mr-48 -mt-48" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 text-center md:text-left">
            <div className="max-w-2xl mx-auto md:mx-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold uppercase tracking-widest mb-6"
              >
                <Camera size={14} className="text-brand-teal" />
                Hospital Gallery
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold leading-tight"
              >
                {selectedCollection ? (
                  <>
                    Collection: <br />
                    <span className="text-brand-teal">{selectedCollection}</span>
                  </>
                ) : (
                  <>
                    Visual <br />
                    <span className="text-brand-teal">Collections</span>
                  </>
                )}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl font-medium"
              >
                {selectedCollection 
                  ? `Viewing the ${selectedCollection} collection at M L Hospital.` 
                  : "Explore our facilities, specialized departments, and staff excellence through curated visual collections."}
              </motion.p>
              
              {selectedCollection && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => setSelectedCollection(null)}
                  className="mt-8 flex items-center gap-2 text-brand-teal font-black uppercase tracking-widest text-[11px] hover:text-white transition-colors"
                >
                  <ArrowLeft size={16} /> Back to Collections
                </motion.button>
              )}
            </div>
            
            <div className="flex items-center gap-6 border-l border-white/10 pl-8 hidden md:flex shrink-0">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">{initialImages.length}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Total Assets</span>
              </div>
              <div className="h-12 w-px bg-white/10 mx-2" />
              <div className="flex flex-col items-center text-brand-teal">
                <Layers size={28} />
                <span className="text-[10px] font-bold uppercase tracking-widest mt-2">{collections.length} Categories</span>
              </div>
            </div>
          </div>
        </div>

        {/* Curved Divider */}
        <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px]">
            <path d="M0,0 C300,10 600,100 1200,50 V120 H0 Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12">
        <AnimatePresence mode="wait">
          {!selectedCollection ? (
            <motion.div 
              key="collections"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {collections.map((col, idx) => (
                <motion.div
                  key={col}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedCollection(col)}
                  className="group relative h-[400px] rounded-[40px] overflow-hidden cursor-pointer bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <Image 
                    src={getCollectionCover(col)} 
                    alt={col} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001e3c] via-[#001e3c]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                    <div>
                      <div className="h-1 w-12 bg-[#00baf2] rounded-full mb-4" />
                      <h3 className="text-3xl font-bold text-white mb-2">{col}</h3>
                      <p className="text-slate-300 text-sm font-medium">{initialImages.filter(img => img.collection === col).length} Images</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-[#00baf2] group-hover:border-[#00baf2] transition-all">
                      <ChevronRight size={24} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-[40px] border border-slate-100 bg-white shadow-sm hover:shadow-2xl transition-all duration-500 group aspect-square"
                >
                  <Image
                    src={image.url}
                    alt={image.caption || ""}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {image.caption && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001e3c]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-7">
                      <div>
                        <div className="h-1 w-8 bg-[#00baf2] rounded-full mb-3" />
                        <p className="text-white font-bold text-sm tracking-wide leading-tight">{image.caption}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="mt-24 text-center">
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.3em] mb-10">Medical Excellence in Vision</p>
          <Link 
            href="/" 
            className="inline-flex items-center gap-4 bg-white text-slate-900 border border-slate-200 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-sm"
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
