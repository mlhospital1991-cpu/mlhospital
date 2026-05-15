import React from "react";
import { ShieldCheck } from "lucide-react";
import InsuranceClient from "@/components/insurance/InsuranceClient";

export const dynamic = "force-dynamic";

export default function InsurancePage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Hero Section - Static SSR */}
      <section className="bg-[#001e3c] pt-24 pb-32 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00baf2] rounded-full blur-[100px] -mr-48 -mt-48" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#00baf2] font-bold text-[11px] uppercase tracking-widest mb-6 backdrop-blur-sm">
            <ShieldCheck size={14} />
            Cashless Hospitalization
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Insurance & <span className="text-[#00baf2]">Cashless</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto font-medium">
            M L Hospital partners with major insurance providers and TPAs to ensure 
            a seamless, cashless recovery journey for our patients.
          </p>
        </div>
      </section>

      {/* Interactive Insurance List (Client Side Hydration) */}
      <InsuranceClient />

      {/* Contact Section - Static SSR */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="bg-[#00baf2] p-10 md:p-16 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Have Questions about Cashless Facility?</h2>
            <p className="opacity-90 font-medium leading-relaxed">
              Our dedicated insurance desk is available 24/7 to help you with pre-authorization and eligibility checks.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <a
              href="tel:8885553193"
              className="bg-white text-[#00baf2] px-10 py-5 rounded-[22px] font-bold text-lg hover:bg-slate-50 transition-all shadow-xl inline-block"
            >
              Contact Insurance Desk
            </a>
          </div>
        </div>
        
        <p className="mt-12 text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] max-w-3xl mx-auto leading-loose">
          Cashless facility is subject to the terms and conditions of your policy. 
          The list of empaneled partners is subject to change.
        </p>
      </section>
    </main>
  );
}
