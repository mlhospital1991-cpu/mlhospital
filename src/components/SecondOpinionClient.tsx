"use client";

import React, { useState } from "react";
import SecondOpinionForm from "@/components/SecondOpinionForm";
import WhatsAppChatAutomation from "@/components/WhatsAppChatAutomation";
import { ClipboardCheck, MessageSquare } from "lucide-react";

export default function SecondOpinionClient() {
  const [preference, setPreference] = useState<null | "form" | "whatsapp">(null);

  return (
    <div className="w-full">
      {preference === null && (
        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 px-4">
          <button
            onClick={() => setPreference("form")}
            className="bg-white p-8 rounded-[32px] shadow-xl hover:shadow-2xl transition-all border border-slate-100/50 flex flex-col items-center text-center group"
          >
            <div className="w-16 h-16 bg-slate-50 group-hover:bg-brand-teal/10 text-slate-400 group-hover:text-brand-teal rounded-2xl flex items-center justify-center mb-6 transition-colors">
              <ClipboardCheck size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Complete Form on Website</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Fill out our secure 3-step form directly on our portal.
            </p>
          </button>

          <button
            onClick={() => setPreference("whatsapp")}
            className="bg-white p-8 rounded-[32px] shadow-xl hover:shadow-2xl transition-all border border-slate-100/50 flex flex-col items-center text-center group"
          >
            <div className="w-16 h-16 bg-slate-50 group-hover:bg-green-500/10 text-slate-400 group-hover:text-green-500 rounded-2xl flex items-center justify-center mb-6 transition-colors">
              <MessageSquare size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Interactive WhatsApp Chat</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Chat with our automated assistant just like on WhatsApp.
            </p>
          </button>
        </div>
      )}

      {preference === "form" && (
        <div>
          <div className="max-w-4xl mx-auto mb-6 flex justify-start px-4">
            <button 
              onClick={() => setPreference(null)}
              className="text-xs font-bold text-slate-400 hover:text-brand-teal flex items-center gap-2"
            >
              &larr; Back to Options
            </button>
          </div>
          <SecondOpinionForm />
        </div>
      )}

      {preference === "whatsapp" && (
        <WhatsAppChatAutomation onBack={() => setPreference(null)} />
      )}
    </div>
  );
}
