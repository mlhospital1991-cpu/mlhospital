import React from "react";
import SecondOpinionForm from "@/components/SecondOpinionForm";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Second Opinion - ML Hospital",
  description: "Upload your medical reports and get expert diagnosis and advice from our senior specialists for free.",
};

export default function SecondOpinionPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1 bg-brand-teal/10 text-brand-teal rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            Expert Review
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Get a <span className="text-brand-teal">Second Opinion</span> for Free
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Upload your medical reports and clinical details. Our senior specialists will review your case and provide expert guidance and diagnosis advice.
          </p>
        </div>

        <SecondOpinionForm />
      </div>

      {/* Footer-like info */}
      <div className="max-w-4xl mx-auto pb-20 px-4 text-center">
        <p className="text-slate-400 text-sm">
          * This service is provided for informational purposes and does not replace an in-person consultation in emergency cases.
        </p>
      </div>
    </main>
  );
}
