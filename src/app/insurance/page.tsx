"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShieldCheck, Building2, UserCheck, SearchX } from "lucide-react";

const categories = [
  {
    id: "govt",
    title: "Government & Employee Schemes",
    icon: Building2,
    partners: [
      { name: "CMCHIS (Chief Minister’s Comprehensive Health Insurance Scheme)", domain: "cmchistn.com" },
      { name: "TNNHIS – Government Employees", domain: "tnhealth.tn.gov.in" },
      { name: "TNNHIS – Government Pensioners", domain: "tnhealth.tn.gov.in" },
      { name: "Co-operative Insurance Scheme", domain: "tn.gov.in" },
      { name: "National Health Insurance Scheme", domain: "india.gov.in" },
    ],
  },
  {
    id: "private",
    title: "Private Insurance Partners",
    icon: ShieldCheck,
    partners: [
      { name: "Star Health Insurance", domain: "starhealth.in" },
      { name: "ICICI Lombard", domain: "icicilombard.com" },
      { name: "TATA AIG", domain: "tataaig.com" },
      { name: "Niva Bupa (formerly Max Bupa)", domain: "nivabupa.com" },
      { name: "Care Health Insurance", domain: "careinsurance.com" },
      { name: "Aditya Birla Health Insurance", domain: "adityabirlacapital.com" },
      { name: "ManipalCigna Health Insurance", domain: "manipalcigna.com" },
      { name: "SBI General Insurance", domain: "sbigeneral.in" },
      { name: "Go Digit Health Insurance", domain: "godigit.com" },
      { name: "New India Assurance", domain: "newindia.co.in" },
      { name: "United India Insurance", domain: "uiic.co.in" },
      { name: "HDFC ERGO (formerly Apollo Munich)", domain: "hdfcergo.com" },
      { name: "Magma General Insurance", domain: "magmahdi.com" },
      { name: "Liberty Health Insurance", domain: "libertyinsurance.in" },
      { name: "Galaxy Health Insurance", domain: "galaxyhealth.com" },
    ],
  },
  {
    id: "tpa",
    title: "Third-Party Administrators (TPAs)",
    icon: UserCheck,
    partners: [
      { name: "MD India Insurance", domain: "mdindiaonline.com" },
      { name: "Medi Assist", domain: "mediassist.in" },
      { name: "Family Health Plan (FHPL)", domain: "fhpl.net" },
      { name: "Health India Insurance", domain: "healthindia.com" },
      { name: "Paramount Health", domain: "paramounttpa.com" },
      { name: "Heritage Health", domain: "heritagehealthtpa.com" },
      { name: "Genins India (Genius Health)", domain: "geninsindia.com" },
      { name: "Akna Health", domain: "aknatpa.com" },
    ],
  },
];

const LogoCard = ({ partner, idx }: { partner: any, idx: number }) => {
  const [imageStatus, setImageStatus] = useState<"loading" | "error" | "success">("loading");

  const logoUrl = `https://www.google.com/s2/favicons?sz=128&domain=${partner.domain}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.05 }}
      className="group bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-500 flex flex-col items-center justify-center text-center h-56 relative overflow-hidden"
    >
      <div className="mb-6 relative w-20 h-20 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {imageStatus !== "error" ? (
            <motion.div
              key="logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: imageStatus === "success" ? 1 : 0.5 }}
              exit={{ opacity: 0 }}
              className="grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100 flex items-center justify-center w-full h-full"
            >
              <img
                src={logoUrl}
                alt={partner.name}
                className="w-16 h-16 object-contain"
                onLoad={() => setImageStatus("success")}
                onError={() => setImageStatus("error")}
              />
            </motion.div>
          ) : (
            <motion.div
              key="fallback"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-brand-teal/5 group-hover:border-brand-teal/20 transition-all"
            >
              <span className="text-xl font-black text-slate-300 group-hover:text-brand-teal uppercase">
                {partner.name.substring(0, 1)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <p className="text-[13px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors leading-snug px-2">
        {partner.name}
      </p>

      <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default function InsurancePage() {
  const [search, setSearch] = useState("");

  const filteredCategories = categories.map((cat) => ({
    ...cat,
    partners: cat.partners.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(cat => cat.partners.length > 0);

  const totalFilteredCount = filteredCategories.reduce((acc, cat) => acc + cat.partners.length, 0);

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-blue-deep pt-24 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal rounded-full blur-[100px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-teal rounded-full blur-[100px] -ml-48 -mb-48" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-teal font-bold text-[11px] uppercase tracking-widest mb-6 backdrop-blur-sm"
          >
            <ShieldCheck size={14} />
            Cashless Hospitalization
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-8"
          >
            Insurance & <span className="text-brand-teal">Cashless</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-lg max-w-2xl mx-auto font-medium"
          >
            M L Hospital partners with major insurance providers and TPAs to ensure 
            a seamless, cashless recovery journey for our patients.
          </motion.p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-[32px] p-4 shadow-2xl shadow-brand-blue-deep/10 border border-slate-100">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
            <input
              type="text"
              placeholder="Find your insurance provider..."
              className="w-full bg-slate-50 rounded-[22px] pl-16 pr-8 py-5 text-lg font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-brand-teal/5 focus:outline-none transition-all placeholder:text-slate-400 placeholder:font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Partners List */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        {totalFilteredCount > 0 ? (
          <div className="space-y-24">
            {filteredCategories.map((category, catIdx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                    <category.icon size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{category.title}</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.partners.map((partner, idx) => (
                    <LogoCard key={partner.name} partner={partner} idx={idx} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <SearchX size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No matching partners found</h3>
            <p className="text-slate-500 font-medium">Try searching with a different keyword or contact our help desk.</p>
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="bg-brand-teal p-10 md:p-16 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-brand-teal/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />

          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Have Questions about Cashless Facility?</h2>
            <p className="text-brand-teal-light text-slate-100 opacity-90 font-medium leading-relaxed">
              Our dedicated insurance desk is available 24/7 to help you with pre-authorization and eligibility checks.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <a
              href="tel:8885553193"
              className="bg-white text-brand-teal px-10 py-5 rounded-[22px] font-bold text-lg hover:bg-slate-50 transition-all shadow-xl shadow-brand-teal/10 inline-block"
            >
              Contact Insurance Desk
            </a>
          </div>
        </div>
        
        <p className="mt-12 text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] max-w-3xl mx-auto leading-loose">
          Cashless facility is subject to the terms and conditions of your policy. 
          Please contact our insurance desk at the hospital for pre-authorization.
          The list of empaneled partners is subject to change.
        </p>
      </section>
    </main>
  );
}
