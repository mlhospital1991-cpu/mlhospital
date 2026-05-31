// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Calendar, Clock, MessageSquare, Check, User } from "lucide-react";
import Image from "next/image";

interface Doctor {
  id: number | string;
  name: string;
  specialty: string;
  image?: string;
}

const doctors: Doctor[] = [
  { id: "general", name: "General Consultation", specialty: "Any Available Doctor", image: "" },
  { id: 1, name: "Dr. S. Manimekalai", specialty: "Founder, Gynaecologist", image: "/doctors/dr-manimekalai.jpg" },
  { id: 2, name: "Dr. M. Radhakrishnan", specialty: "Co-Founder, Plastic Surgeon", image: "/doctors/dr-radhakrishnan.jpg" },
  { id: 3, name: "Dr. R. Aravind", specialty: "Consultant Orthopedic Surgeon", image: "/doctors/dr-aravind.jpg" },
  { id: 4, name: "Dr. Keerthana", specialty: "Medical Specialist", image: "/doctors/dr-keerthana.jpg" },
  { id: 5, name: "Dr. Aarthy", specialty: "Medical Specialist", image: "/doctors/dr-aarthy.jpg" },
];

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  centralNumber: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, centralNumber }) => {
  // ---------- State ----------
  const [dates, setDates] = useState<Date[]>([]);
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [time, setTime] = useState<{ hour: string; minute: string; period: string } | null>(null);
  const [patientDetails, setPatientDetails] = useState({ name: "", location: "", issue: "", opNumber: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // ---------- Helper functions ----------
  const getNextValidTime = (date: Date) => {
    const now = new Date();
    const buffer = new Date(now.getTime() + 15 * 60000);
    const isToday = date.toDateString() === now.toDateString();

    if (!isToday) return { hour: "10", minute: "00", period: "AM" };

    let h = buffer.getHours();
    const m = buffer.getMinutes();
    const period = h >= 12 ? "PM" : "AM";
    let h12 = h % 12 || 12;
    let mSnapped = "00";
    if (m > 45) { h12++; mSnapped = "00"; }
    else if (m > 30) mSnapped = "45";
    else if (m > 15) mSnapped = "30";
    else if (m > 0) mSnapped = "15";

    const finalHour = h12 >= 12 && period === "AM" ? 12 : h12 % 12 || 12;
    const finalPeriod = h12 >= 12 && period === "AM" ? "PM" : period;
    return { hour: finalHour.toString().padStart(2, "0"), minute: mSnapped, period: finalPeriod };
  };

  const getDates = () => {
    const list: Date[] = [];
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const isTodayOver = hour > 20 || (hour === 20 && minute >= 45);
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      if (i === 0 && isTodayOver) continue;
      list.push(d);
    }
    return list;
  };

  // ---------- Effects ----------
  useEffect(() => {
    const fresh = getDates();
    setDates(fresh);
    if (fresh.length) {
      setSelectedDate(fresh[0]);
      setTime(getNextValidTime(fresh[0]));
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const resetModal = () => {
    const fresh = getDates();
    setStep(1);
    setSelectedDoctor(null);
    if (fresh.length) {
      setSelectedDate(fresh[0]);
      setTime(getNextValidTime(fresh[0]));
    }
    setPatientDetails({ name: "", location: "", issue: "", opNumber: "" });
    setIsSaving(false);
    setSaveError(null);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetModal, 300);
  };

  const handleConfirm = async () => {
    if (!selectedDoctor || !selectedDate || !patientDetails.name || !time) return;
    setIsSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: patientDetails.name,
          location: patientDetails.location,
          issue: patientDetails.issue,
          doctor: selectedDoctor.name,
          date: selectedDate.toISOString(),
          time: `${time.hour}:${time.minute} ${time.period}`,
          opNumber: patientDetails.opNumber,
        }),
      });
      if (!res.ok) throw new Error("Failed to save appointment");

      const formatted = selectedDate.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" });
      const msg = encodeURIComponent(
        `*New Appointment Request*\n\n` +
        `*Doctor:* ${selectedDoctor.name}\n` +
        `*Date:* ${formatted}\n` +
        `*Time:* ${time.hour}:${time.minute} ${time.period}\n\n` +
        `*Patient Name:* ${patientDetails.name}\n` +
        (patientDetails.opNumber ? `*OP Number:* ${patientDetails.opNumber}\n` : "") +
        `*Location:* ${patientDetails.location || "Not specified"}\n` +
        `*Issue:* ${patientDetails.issue || "Not specified"}\n\n` +
        `Please confirm availability.`
      );
      window.open(`https://wa.me/${centralNumber}?text=${msg}`, "_blank");
      handleClose();
    } catch (e) {
      console.error(e);
      setSaveError("System busy. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const getStepTitle = () => {
    if (step === 1) return "Select Specialist";
    if (step === 2) return "Choose Date";
    if (step === 3) return "Pick Time Slot";
    return "Final Details";
  };

  const isNextDisabled = () => {
    if (step === 1) return !selectedDoctor;
    if (step === 2) return !selectedDate;
    if (step === 3) return !time;
    return false;
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const getNextButtonText = () => {
    if (step === 1) return "Continue: Select Date";
    if (step === 2) return "Continue: Pick Time";
    return "Continue: Details";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-brand-blue-deep/60 backdrop-blur-md z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4 md:p-6 z-[101] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-4xl rounded-[24px] shadow-2xl overflow-hidden pointer-events-auto flex flex-col md:flex-row h-[90vh] md:h-[650px] relative"
            >
              {/* Sidebar Info (Desktop Only) */}
              <div className="hidden md:flex bg-brand-blue-deep w-80 p-10 text-white flex-col justify-between relative overflow-hidden shrink-0">
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-brand-teal/20 rounded-2xl flex items-center justify-center mb-8">
                    <Calendar className="text-brand-teal" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Book Your Appointment</h3>
                  <p className="text-slate-300 text-sm font-medium leading-relaxed">
                    Easy steps to secure your time with our specialists.
                  </p>
                </div>

                {/* Desktop Step list */}
                <div className="relative z-10 space-y-6">
                  {[
                    { s: 1, t: "Specialist" },
                    { s: 2, t: "Select Date" },
                    { s: 3, t: "Pick Time" },
                    { s: 4, t: "Your Details" },
                  ].map((item) => (
                    <div key={item.s} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                        step >= item.s ? "bg-brand-teal border-brand-teal text-white" : "border-slate-700 text-slate-500"
                      }`}>
                        {step > item.s ? <Check size={16} /> : <User size={14} />}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                        step >= item.s ? "text-white" : "text-slate-600"
                      }`}>{item.t}</span>
                    </div>
                  ))}
                </div>

                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 rounded-full blur-[80px] -mr-32 -mt-32" />
              </div>

              {/* Workflow Column */}
              <div className="flex-1 flex flex-col h-full min-w-0 bg-white relative">
                {/* Mobile top-bar header */}
                <div className="md:hidden flex items-center justify-between px-4 py-3 bg-brand-blue-deep text-white shrink-0">
                  <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition" aria-label="Close modal">
                    <X size={20} />
                  </button>
                  <span className="font-bold text-sm">Appointment Booking</span>
                  <div className="w-8" />
                </div>

                {/* Header (desktop step bar & mobile back button support) */}
                <div className="flex justify-between items-center px-4 py-3 md:px-8 md:py-6 border-b border-slate-100 bg-white shrink-0">
                  <div className="flex items-center gap-3">
                    {step > 1 && (
                      <button onClick={() => setStep(step - 1)} className="p-2 hover:bg-slate-100 rounded-xl transition" aria-label="Go back">
                        <ChevronLeft size={20} className="text-slate-800" />
                      </button>
                    )}
                    <h4 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">
                      {getStepTitle()}
                    </h4>
                  </div>
                  {/* Close button (desktop version) */}
                  <button onClick={handleClose} className="hidden md:flex p-2 hover:bg-slate-100 rounded-xl transition" aria-label="Close modal">
                    <X size={20} className="text-slate-600" />
                  </button>
                </div>

                {/* Workflow scroll area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 pb-24 md:pb-24">
                  {/* STEP 1: Specialist Picker */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {doctors.map((doc) => (
                        <button
                          key={doc.id}
                          onClick={() => { setSelectedDoctor(doc); setStep(2); }}
                          className={`flex items-center gap-4 p-4 rounded-[20px] border-2 transition-all text-left ${
                            selectedDoctor?.id === doc.id 
                              ? "border-brand-teal bg-brand-teal/5" 
                              : "border-slate-100 hover:border-slate-200"
                          }`}
                        >
                          <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden relative flex-shrink-0 flex items-center justify-center">
                            {doc.image ? (
                              <Image src={doc.image} alt={doc.name} fill sizes="48px" className="object-cover" />
                            ) : (
                              <User size={20} className="text-slate-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm leading-snug">{doc.name}</p>
                            <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest mt-0.5">{doc.specialty}</p>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {/* STEP 2: Date Picker */}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {dates.map((date) => {
                          const isSelected = selectedDate?.toDateString() === date.toDateString();
                          return (
                            <button
                              key={date.toISOString()}
                              onClick={() => {
                                setSelectedDate(date);
                                const nxt = getNextValidTime(date);
                                if (nxt) setTime(nxt);
                              }}
                              className={`flex flex-col items-center justify-center p-3 rounded-[16px] border-2 transition-all ${
                                isSelected 
                                  ? "border-brand-teal bg-brand-teal text-white shadow-md shadow-brand-teal/10" 
                                  : "border-slate-100 text-slate-500 hover:border-slate-200 bg-slate-50/50"
                              }`}
                            >
                              <span className="text-[10px] font-bold uppercase tracking-wider mb-1">
                                {date.toLocaleDateString("en-US", { weekday: "short" })}
                              </span>
                              <span className="text-lg font-black leading-none">
                                {date.getDate()}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Time Picker Grid */}
                  {step === 3 && time && selectedDate && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      {/* Hour Grid */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block text-center">Select Hour</label>
                        <div className="flex flex-wrap justify-center gap-2">
                          {(time.period === "AM" ? [10, 11] : [12, 1, 2, 6, 7, 8, 9]).map((h) => {
                            const isToday = selectedDate.toDateString() === new Date().toDateString();
                            const now = new Date();
                            const buffer = new Date(now.getTime() + 15 * 60000);
                            let h24 = h;
                            if (time.period === "PM" && h < 12) h24 += 12;
                            if (time.period === "AM" && h === 12) h24 = 0;
                            
                            const slot = new Date(selectedDate);
                            slot.setHours(h24, 45, 0, 0);
                            const isPast = isToday && slot < buffer;
                            const formattedHour = h.toString().padStart(2, "0");
                            const isSelected = time.hour === formattedHour;

                            return (
                              <button
                                key={h}
                                disabled={isPast}
                                type="button"
                                onClick={() => setTime({ ...time, hour: formattedHour })}
                                className={`w-12 h-12 rounded-full font-bold flex items-center justify-center transition-all ${
                                  isPast 
                                    ? "opacity-20 cursor-not-allowed bg-slate-50 text-slate-300" 
                                    : isSelected 
                                      ? "bg-brand-teal text-white shadow-md shadow-brand-teal/20" 
                                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                              >
                                {formattedHour}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Minute Grid */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block text-center">Select Minute</label>
                        <div className="flex flex-wrap justify-center gap-2">
                          {["00", "15", "30", "45"].map((m) => {
                            const isToday = selectedDate.toDateString() === new Date().toDateString();
                            const now = new Date();
                            const buffer = new Date(now.getTime() + 15 * 60000);
                            const hNum = parseInt(time.hour);
                            let h24 = hNum;
                            if (time.period === "PM" && hNum < 12) h24 += 12;
                            if (time.period === "AM" && hNum === 12) h24 = 0;
                            
                            const slot = new Date(selectedDate);
                            slot.setHours(h24, parseInt(m), 0, 0);
                            const isPast = isToday && slot < buffer;
                            const isSelected = time.minute === m;

                            return (
                              <button
                                key={m}
                                disabled={isPast}
                                type="button"
                                onClick={() => setTime({ ...time, minute: m })}
                                className={`w-12 h-12 rounded-full font-bold flex items-center justify-center transition-all ${
                                  isPast 
                                    ? "opacity-20 cursor-not-allowed bg-slate-50 text-slate-300" 
                                    : isSelected 
                                      ? "bg-brand-teal text-white shadow-md shadow-brand-teal/20" 
                                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                              >
                                {m}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* AM / PM Swapper */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block text-center">Select Session</label>
                        <div className="flex justify-center gap-3">
                          {["AM", "PM"].map((p) => {
                            const validHours = p === "AM" ? [10, 11] : [12, 1, 2, 6, 7, 8, 9];
                            const hasValid = validHours.some(h => {
                              let h24 = h;
                              if (p === "PM" && h < 12) h24 += 12;
                              if (p === "AM" && h === 12) h24 = 0;
                              const slotEnd = new Date(selectedDate);
                              slotEnd.setHours(h24, 45, 0, 0);
                              const isToday = selectedDate.toDateString() === new Date().toDateString();
                              const now = new Date();
                              const buffer = new Date(now.getTime() + 15 * 60000);
                              return !isToday || slotEnd >= buffer;
                            });
                            const isSelected = time.period === p;

                            return (
                              <button
                                key={p}
                                disabled={!hasValid}
                                type="button"
                                onClick={() => {
                                  const nxt = getNextValidTime(selectedDate);
                                  if (nxt) setTime({ ...time, period: p, hour: nxt.hour, minute: nxt.minute });
                                }}
                                className={`w-16 h-11 rounded-xl font-bold flex items-center justify-center transition-all ${
                                  !hasValid 
                                    ? "opacity-20 cursor-not-allowed bg-slate-50 text-slate-300" 
                                    : isSelected 
                                      ? "bg-brand-teal text-white shadow-md shadow-brand-teal/20" 
                                      : "border-2 border-slate-150 text-slate-600 hover:bg-slate-50"
                                }`}
                              >
                                {p}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Patient Details */}
                  {step === 4 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-600 uppercase">Patient Name</label>
                          <input
                            type="text"
                            placeholder="Enter full name"
                            className="w-full bg-slate-50 border border-slate-200 rounded-[14px] px-4 py-2.5 text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition"
                            value={patientDetails.name}
                            onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-600 uppercase">Location</label>
                          <input
                            type="text"
                            placeholder="Area / Landmark"
                            className="w-full bg-slate-50 border border-slate-200 rounded-[14px] px-4 py-2.5 text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition"
                            value={patientDetails.location}
                            onChange={(e) => setPatientDetails({ ...patientDetails, location: e.target.value })}
                          />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <label className="text-xs font-bold text-slate-600 uppercase">OP Number (Optional)</label>
                          <input
                            type="text"
                            placeholder="If you have an existing OP record"
                            className="w-full bg-slate-50 border border-slate-200 rounded-[14px] px-4 py-2.5 text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition"
                            value={patientDetails.opNumber}
                            onChange={(e) => setPatientDetails({ ...patientDetails, opNumber: e.target.value })}
                          />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <label className="text-xs font-bold text-slate-600 uppercase">Describe Issue</label>
                          <textarea
                            rows={3}
                            placeholder="Briefly describe the medical issue..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-[14px] px-4 py-2.5 text-sm focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition resize-none"
                            value={patientDetails.issue}
                            onChange={(e) => setPatientDetails({ ...patientDetails, issue: e.target.value })}
                          />
                        </div>
                      </div>
                      {saveError && <p className="text-red-600 text-center text-sm font-semibold">{saveError}</p>}
                      <button
                        onClick={handleConfirm}
                        disabled={!patientDetails.name || isSaving}
                        className="w-full bg-brand-teal text-white py-4 rounded-[18px] font-bold text-lg flex items-center justify-center gap-2 shadow-md hover:brightness-110 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSaving ? (
                          <span className="flex items-center gap-2">
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Saving enquiry...
                          </span>
                        ) : (
                          <>
                            <MessageSquare size={20} />
                            Confirm on WhatsApp
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* Footer action bar (Sticky to the bottom of the content column, floating cleanly inside the card overlay) */}
                {step < 4 && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent border-t border-slate-50 flex justify-end shrink-0 z-30">
                    <button
                      onClick={handleNext}
                      disabled={isNextDisabled()}
                      className="w-full md:w-auto md:px-8 bg-brand-teal text-white py-3.5 rounded-[16px] font-bold text-md flex items-center justify-center gap-2 shadow-lg shadow-brand-teal/15 hover:brightness-105 transition active:scale-98 disabled:opacity-40 disabled:pointer-events-none"
                    >
                      <span>{getNextButtonText()}</span>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AppointmentModal;
