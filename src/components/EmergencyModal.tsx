"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, AlertCircle } from "lucide-react";

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber: string;
}

const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose, whatsappNumber }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    issue: "",
  });

  const handleSend = () => {
    const { name, location, issue } = formData;
    if (!name || !location || !issue) {
      alert("Please fill in all fields for a faster response.");
      return;
    }

    const message = encodeURIComponent(
      `Emergency! \nName: ${name}\nLocation: ${location}\nIssue: ${issue}`
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-6 z-[101] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden pointer-events-auto border border-slate-100"
            >
              {/* Header */}
              <div className="bg-red-600 p-8 text-white relative">
                <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 p-1.5 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-white/20 p-2.5 rounded-2xl">
                    <AlertCircle size={24} />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">Emergency Intake</h3>
                </div>
                <p className="text-red-100 text-sm font-semibold opacity-90">Providing details helps us respond faster.</p>
              </div>

              {/* Form */}
              <div className="p-10 space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-[22px] px-6 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-red-600/5 focus:border-red-600 transition-all placeholder:text-slate-300"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">Current Location</label>
                  <input
                    type="text"
                    placeholder="Area or landmark in Nagercoil"
                    className="w-full bg-slate-50 border border-slate-200 rounded-[22px] px-6 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-red-600/5 focus:border-red-600 transition-all placeholder:text-slate-300"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">Describe Issue</label>
                  <textarea
                    placeholder="e.g. Fracture, Accident, Critical pain"
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-200 rounded-[22px] px-6 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-red-600/5 focus:border-red-600 transition-all resize-none placeholder:text-slate-300"
                    value={formData.issue}
                    onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                  />
                </div>

                <button
                  onClick={handleSend}
                  className="w-full bg-red-600 hover:brightness-110 text-white py-5 rounded-[24px] font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-red-600/20 group text-lg"
                >
                  <MessageSquare size={22} className="group-hover:scale-110 transition-transform" />
                  Send to WhatsApp
                </button>
                
                <p className="text-center text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-4">
                  * Opens WhatsApp automatically
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EmergencyModal;
