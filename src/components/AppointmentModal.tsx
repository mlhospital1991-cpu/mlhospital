"use client";

import React, { useState, useRef, useEffect } from "react";
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
  { id: 1, name: "Dr. S. Manimekalai", specialty: "Founder, Gynaecologist", image: "/doctors/Dr Manimekalai.jpeg" },
  { id: 2, name: "Dr. M. Radhakrishnan", specialty: "Co-Founder, Plastic Surgeon", image: "/doctors/Dr Radhakrishnan.jpeg" },
  { id: 3, name: "Dr. R. Aravind", specialty: "Consultant Orthopedic Surgeon", image: "/doctors/Dr Aravind.jpeg" },
  { id: 4, name: "Dr. Keerthana", specialty: "Medical Specialist", image: "/doctors/Dr Keerthana.jpeg" },
  { id: 5, name: "Dr. Aarthy", specialty: "Medical Specialist", image: "/doctors/Dr Aarthy.jpeg" },
];

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  centralNumber: string;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, centralNumber }) => {

  const getNextValidTime = (date: Date) => {
    const now = new Date();
    const bufferTime = new Date(now.getTime() + 15 * 60000);
    const isToday = date.toDateString() === now.toDateString();

    if (!isToday) return { hour: "10", minute: "00", period: "AM" };

    let h = bufferTime.getHours();
    const m = bufferTime.getMinutes();
    let period = h >= 12 ? "PM" : "AM";
    let h12 = h % 12 || 12;
    
    let mSnapped = "00";
    if (m > 45) { h12++; mSnapped = "00"; }
    else if (m > 30) mSnapped = "45";
    else if (m > 15) mSnapped = "30";
    else if (m > 0) mSnapped = "15";

    if (h12 >= 12 && period === "AM") { period = "PM"; }
    else if (h12 > 12) h12 = h12 % 12;

    const validAM = [10, 11];
    const validPM = [12, 1, 2, 6, 7, 8, 9];

    if (period === "AM" && !validAM.includes(h12)) {
      if (h12 < 10) return { hour: "10", minute: "00", period: "AM" };
      // Jump to evening
      return { hour: "12", minute: "00", period: "PM" };
    }
    if (period === "PM" && !validPM.includes(h12)) {
      if (h12 < 6) return { hour: "06", minute: "00", period: "PM" };
      // No more slots today!
      return null;
    }

    return { hour: h12.toString().padStart(2, '0'), minute: mSnapped, period };
  };

  const getDates = () => {
    const availableDates = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Hospital closes at 9 PM. With a 15 min buffer, last booking is 8:45 PM (20:45)
    const isTodayOver = currentHour > 20 || (currentHour === 20 && currentMinute >= 45);

    for (let i = 0; i < 14; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        if (i === 0 && isTodayOver) continue;
        availableDates.push(d);
    }
    return availableDates;
  };

  const [dates, setDates] = useState<Date[]>([]);
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [time, setTime] = useState<{hour: string, minute: string, period: string} | null>(null);
  const [patientDetails, setPatientDetails] = useState({ name: "", location: "", issue: "", opNumber: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const resetModal = () => {
    const initialDates = getDates();
    setStep(1);
    setSelectedDoctor(null);
    if (initialDates.length > 0) {
      setSelectedDate(initialDates[0]);
      setTime(getNextValidTime(initialDates[0]));
    }
    setPatientDetails({ name: "", location: "", issue: "", opNumber: "" });
    setIsSaving(false);
    setSaveError(null);
  };

  // Initialize dates and defaults on mount to avoid hydration mismatch
  useEffect(() => {
    const freshDates = getDates();
    setDates(freshDates);
    if (freshDates.length > 0) {
      setSelectedDate(freshDates[0]);
      setTime(getNextValidTime(freshDates[0]));
    }
  }, []);

  const handleClose = () => {
    onClose();
    setTimeout(resetModal, 300);
  };

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

      if (!res.ok) {
        throw new Error("Failed to save appointment to the hospital records.");
      }

      // If we reach here, save was successful
      const formattedDate = selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });

      const message = encodeURIComponent(
        `*New Appointment Request*\n\n` +
        `*Doctor:* ${selectedDoctor.name}\n` +
        `*Date:* ${formattedDate}\n` +
        `*Time:* ${time.hour}:${time.minute} ${time.period}\n\n` +
        `*Patient Name:* ${patientDetails.name}\n` +
        (patientDetails.opNumber ? `*OP Number:* ${patientDetails.opNumber}\n` : "") +
        `*Location:* ${patientDetails.location || "Not specified"}\n` +
        `*Issue:* ${patientDetails.issue || "Not specified"}\n\n` +
        `Please confirm availability.`
      );

      window.open(`https://wa.me/${centralNumber}?text=${message}`, "_blank");
      handleClose();

    } catch (error) {
      console.error("Failed to save to admin panel:", error);
      setSaveError("System busy. Please try clicking 'Confirm' again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-brand-blue-deep/60 backdrop-blur-md z-[100]"
          />

          <div className="fixed inset-0 flex items-center justify-center p-4 md:p-10 z-[101] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-white w-full max-w-4xl rounded-[48px] shadow-2xl overflow-hidden pointer-events-auto flex flex-col md:flex-row min-h-[600px] max-h-[90vh]"
            >
              {/* Sidebar Info */}
              <div className="bg-brand-blue-deep w-full md:w-80 p-10 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-brand-teal/20 rounded-2xl flex items-center justify-center mb-8">
                    <Calendar className="text-brand-teal" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Book Your Appointment</h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">
                    Easy steps to secure your time with our specialists.
                  </p>
                </div>

                {/* Progress Indicators */}
                <div className="relative z-10 space-y-6 mt-12 md:mt-0">
                  {[
                    { s: 1, t: "Specialist", icon: User },
                    { s: 2, t: "Select Date", icon: Calendar },
                    { s: 3, t: "Clock Slot", icon: Clock },
                    { s: 4, t: "Your Details", icon: MessageSquare },
                  ].map((item) => (
                    <div key={item.s} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                        step >= item.s ? "bg-brand-teal border-brand-teal text-white" : "border-slate-700 text-slate-500"
                      }`}>
                        {step > item.s ? <Check size={16} /> : <item.icon size={14} />}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                        step >= item.s ? "text-white" : "text-slate-600"
                      }`}>{item.t}</span>
                    </div>
                  ))}
                </div>

                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 rounded-full blur-[80px] -mr-32 -mt-32" />
              </div>

              {/* Main Workflow Area */}
              <div className="flex-1 p-8 md:p-14 flex flex-col h-full overflow-y-auto">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-4">
                    {step > 1 && (
                      <button onClick={() => setStep(step - 1)} className="p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                        <ChevronLeft size={24} className="text-slate-800" />
                      </button>
                    )}
                    <h4 className="text-2xl font-bold text-slate-900">
                      {step === 1 && "Select Specialist"}
                      {step === 2 && "Choose Date"}
                      {step === 3 && "Pick Time Slot"}
                      {step === 4 && "Final Details"}
                    </h4>
                  </div>
                  <button onClick={handleClose} className="p-3 hover:bg-slate-50 rounded-2xl transition-colors">
                    <X size={24} className="text-slate-400" />
                  </button>
                </div>

                <div className="flex-1">
                  {/* Step 1: Doctor Picker */}
                  {step === 1 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      {doctors.map((doc) => (
                        <button
                          key={doc.id}
                          onClick={() => { setSelectedDoctor(doc); setStep(2); }}
                          className={`flex items-center gap-4 p-5 rounded-[32px] border-2 transition-all text-left ${
                            selectedDoctor?.id === doc.id 
                              ? "border-brand-teal bg-brand-teal/5" 
                              : "border-slate-100 hover:border-slate-200"
                          }`}
                        >
                          <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden relative flex-shrink-0">
                            {doc.image ? (
                              <Image src={doc.image} alt={doc.name} fill sizes="60px" className="object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-50">
                                <User size={24} />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 leading-tight">{doc.name}</p>
                            <p className="text-[11px] font-bold text-brand-teal uppercase tracking-widest mt-1">{doc.specialty}</p>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {/* Step 2: Date Picker */}
                  {step === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      <div className="flex flex-wrap gap-3">
                        {dates.map((date) => {
                          const isSelected = selectedDate?.toDateString() === date.toDateString();
                          return (
                            <button
                              key={date.toISOString()}
                              onClick={() => {
                                setSelectedDate(date);
                                const nextTime = getNextValidTime(date);
                                if (nextTime) setTime(nextTime);
                              }}
                              className={`flex flex-col items-center justify-center min-w-[100px] h-[100px] rounded-3xl border-2 transition-all ${
                                isSelected ? "border-brand-teal bg-brand-teal text-white" : "border-slate-100 text-slate-500 hover:border-slate-200"
                              }`}
                            >
                              <span className="text-[10px] font-bold uppercase tracking-widest mb-1">
                                {date.toLocaleDateString("en-US", { weekday: "short" })}
                              </span>
                              <span className="text-2xl font-bold">
                                {date.getDate()}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      
                      {selectedDate && (
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={() => setStep(3)}
                          className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-bold text-lg flex items-center justify-center gap-3 mt-8 shadow-xl"
                        >
                          Continue to Time
                          <ChevronRight size={20} />
                        </motion.button>
                      )}
                    </motion.div>
                  )}

                  {/* Step 3: Time Picker (Clock Sliders) */}
                  {step === 3 && time && selectedDate && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-12"
                    >
                      <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 py-10">
                        {/* Hour Slider */}
                        <div className="flex flex-col items-center">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">Hour</label>
                          <div className="h-[210px] overflow-y-auto no-scrollbar snap-y snap-mandatory px-4 py-[74px]">
                            {(time.period === "AM" ? [10, 11] : [12, 1, 2, 6, 7, 8, 9]).map((h) => {
                              const isToday = selectedDate.toDateString() === new Date().toDateString();
                              const now = new Date();
                              const bufferTime = new Date(now.getTime() + 15 * 60000);
                              
                              let h24 = h;
                              if (time.period === "PM" && h < 12) h24 += 12;
                              if (time.period === "AM" && h === 12) h24 = 0;
                              
                              // We disable an hour if even its last minute (:45) is in the past
                              const slotTime = new Date(selectedDate);
                              slotTime.setHours(h24, 45, 0, 0);
                              const isPast = isToday && slotTime < bufferTime;

                              return (
                                <button
                                  key={h}
                                  disabled={isPast}
                                  onClick={() => setTime({ ...time, hour: h.toString().padStart(2, '0') })}
                                  className={`h-16 w-16 text-2xl font-bold flex items-center justify-center rounded-2xl snap-center shrink-0 transition-all ${
                                    isPast ? "opacity-20 cursor-not-allowed" :
                                    parseInt(time.hour) === h ? "bg-brand-teal text-white scale-125 shadow-lg shadow-brand-teal/20" : "text-slate-300 hover:text-slate-500"
                                  }`}
                                >
                                  {h.toString().padStart(2, '0')}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <span className="text-4xl font-bold text-slate-200 hidden md:block pt-4">:</span>

                        {/* Minute Slider */}
                        <div className="flex flex-col items-center">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">Minute</label>
                          <div className="h-[210px] overflow-y-auto no-scrollbar snap-y snap-mandatory px-4 py-[74px]">
                            {["00", "15", "30", "45"].map((m) => {
                              const isToday = selectedDate.toDateString() === new Date().toDateString();
                              const now = new Date();
                              const bufferTime = new Date(now.getTime() + 15 * 60000);
                              
                              const hNum = parseInt(time.hour);
                              let h24 = hNum;
                              if (time.period === "PM" && hNum < 12) h24 += 12;
                              if (time.period === "AM" && hNum === 12) h24 = 0;
                              
                              const slotTime = new Date(selectedDate);
                              slotTime.setHours(h24, parseInt(m), 0, 0);
                              const isPast = isToday && slotTime < bufferTime;

                              return (
                                <button
                                  key={m}
                                  disabled={isPast}
                                  onClick={() => setTime({ ...time, minute: m })}
                                  className={`h-16 w-16 text-2xl font-bold flex items-center justify-center rounded-2xl snap-center shrink-0 transition-all ${
                                    isPast ? "opacity-20 cursor-not-allowed" :
                                    time.minute === m ? "bg-brand-teal text-white scale-125 shadow-lg shadow-brand-teal/20" : "text-slate-300 hover:text-slate-500"
                                  }`}
                                >
                                  {m}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Period Toggle */}
                        <div className="flex flex-col items-center">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">AM/PM</label>
                          <div className="flex flex-col gap-3">
                            {["AM", "PM"].map((p) => {
                              const isToday = selectedDate.toDateString() === new Date().toDateString();
                              const now = new Date();
                              const bufferTime = new Date(now.getTime() + 15 * 60000);
                              
                              // Check if there are ANY valid hours in this period
                              const validHours = p === "AM" ? [10, 11] : [12, 1, 2, 6, 7, 8, 9];
                              const hasValidSlot = validHours.some(h => {
                                let h24 = h;
                                if (p === "PM" && h < 12) h24 += 12;
                                if (p === "AM" && h === 12) h24 = 0;
                                const slotEnd = new Date(selectedDate);
                                slotEnd.setHours(h24, 45, 0, 0);
                                return !isToday || slotEnd >= bufferTime;
                              });

                              return (
                                <button
                                  key={p}
                                  disabled={!hasValidSlot}
                                  onClick={() => {
                                    const defaultTime = getNextValidTime(selectedDate);
                                    if (defaultTime) {
                                      setTime({ ...time!, period: p, hour: defaultTime.hour, minute: defaultTime.minute });
                                    }
                                  }}
                                  className={`h-16 w-16 text-lg font-bold flex items-center justify-center rounded-2xl transition-all ${
                                    !hasValidSlot ? "opacity-10 cursor-not-allowed" :
                                    time.period === p ? "bg-brand-teal text-white" : "border-2 border-slate-100 text-slate-300 hover:border-slate-200"
                                  }`}
                                >
                                  {p}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setStep(4)}
                        className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-bold text-lg flex items-center justify-center gap-3 mt-8 shadow-xl"
                      >
                        Patient Details
                        <ChevronRight size={20} />
                      </button>
                    </motion.div>
                  )}

                  {/* Step 4: Patient Details */}
                  {step === 4 && time && selectedDate && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">Patient Name</label>
                          <input
                            type="text"
                            placeholder="Enter full name"
                            className="w-full bg-slate-50 border border-slate-200 rounded-[22px] px-6 py-4 text-sm font-medium focus:border-brand-teal focus:outline-none focus:ring-4 focus:ring-brand-teal/5 transition-all"
                            value={patientDetails.name}
                            onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">Location</label>
                          <input
                            type="text"
                            placeholder="Area / Landmark"
                            className="w-full bg-slate-50 border border-slate-200 rounded-[22px] px-6 py-4 text-sm font-medium focus:border-brand-teal focus:outline-none focus:ring-4 focus:ring-brand-teal/5 transition-all"
                            value={patientDetails.location}
                            onChange={(e) => setPatientDetails({ ...patientDetails, location: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">OP Number (Optional)</label>
                        <input
                          type="text"
                          placeholder="If you have an existing OP record"
                          className="w-full bg-slate-50 border border-slate-200 rounded-[22px] px-6 py-4 text-sm font-medium focus:border-brand-teal focus:outline-none focus:ring-4 focus:ring-brand-teal/5 transition-all"
                          value={patientDetails.opNumber}
                          onChange={(e) => setPatientDetails({ ...patientDetails, opNumber: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">Describe Issue</label>
                        <textarea
                          placeholder="Briefly describe the medical issue..."
                          rows={3}
                          className="w-full bg-slate-50 border border-slate-200 rounded-[22px] px-6 py-4 text-sm font-medium focus:border-brand-teal focus:outline-none focus:ring-4 focus:ring-brand-teal/5 transition-all resize-none"
                          value={patientDetails.issue}
                          onChange={(e) => setPatientDetails({ ...patientDetails, issue: e.target.value })}
                        />
                      </div>

                      {saveError && (
                        <p className="text-red-500 text-xs font-bold text-center animate-pulse">{saveError}</p>
                      )}

                      <button
                        onClick={handleConfirm}
                        disabled={!patientDetails.name || isSaving}
                        className="w-full bg-brand-teal text-white py-6 rounded-[28px] font-bold text-xl flex items-center justify-center gap-4 mt-4 shadow-[0_20px_40px_-10px_rgba(0,185,241,0.4)] hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSaving ? (
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Saving enquiry...</span>
                          </div>
                        ) : (
                          <>
                            <MessageSquare size={24} />
                            Confirm on WhatsApp
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AppointmentModal;
