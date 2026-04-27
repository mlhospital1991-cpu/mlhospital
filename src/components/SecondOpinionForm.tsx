"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  FileText, 
  Upload, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  X,
  Stethoscope,
  Activity,
  MessageSquare
} from "lucide-react";

const SecondOpinionForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    symptoms: "",
    currentDiagnosis: "",
    questions: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      files.forEach((file) => {
        data.append("reports", file);
      });

      const response = await fetch("/api/second-opinion", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 rounded-[40px] shadow-2xl text-center max-w-2xl mx-auto"
      >
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="text-green-500" size={48} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Request Submitted!</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Our specialists will review your reports and clinical details. 
          You will receive an email and a phone call within 24-48 hours.
        </p>
        <button 
          onClick={() => window.location.href = "/"}
          className="bg-brand-blue-deep text-white px-10 py-4 rounded-2xl font-bold hover:brightness-110 transition-all"
        >
          Back to Home
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-12 px-4">
        {[
          { step: 1, label: "Personal", icon: User },
          { step: 2, label: "Clinical", icon: Activity },
          { step: 3, label: "Reports", icon: Upload },
        ].map((item) => (
          <div key={item.step} className="flex flex-col items-center gap-2 relative z-10">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
              step >= item.step ? "bg-brand-teal text-white shadow-lg shadow-brand-teal/20" : "bg-slate-100 text-slate-400"
            }`}>
              <item.icon size={20} />
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${
              step >= item.step ? "text-brand-teal" : "text-slate-400"
            }`}>
              {item.label}
            </span>
          </div>
        ))}
        {/* Connector Line */}
        <div className="absolute top-6 left-0 w-full h-[2px] bg-slate-100 -z-0" />
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[48px] shadow-2xl border border-slate-50">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <span className="p-2 bg-brand-teal/10 rounded-xl"><User className="text-brand-teal" size={20} /></span>
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      name="patientName"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.patientName}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm focus:bg-white focus:border-brand-teal outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm focus:bg-white focus:border-brand-teal outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm focus:bg-white focus:border-brand-teal outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    placeholder="Years"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-brand-teal outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-brand-teal outline-none transition-all appearance-none"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.patientName || !formData.email || !formData.phone}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all disabled:opacity-50"
                >
                  Continue to Clinical Details
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <span className="p-2 bg-brand-teal/10 rounded-xl"><Stethoscope className="text-brand-teal" size={20} /></span>
                Clinical Details
              </h3>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Current Symptoms</label>
                <textarea
                  name="symptoms"
                  required
                  rows={4}
                  placeholder="Describe what you are feeling..."
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-brand-teal outline-none transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Current Diagnosis (if any)</label>
                <textarea
                  name="currentDiagnosis"
                  rows={2}
                  placeholder="What has been diagnosed so far?"
                  value={formData.currentDiagnosis}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:bg-white focus:border-brand-teal outline-none transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Specific Questions for Doctor</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-slate-400" size={18} />
                  <textarea
                    name="questions"
                    rows={3}
                    placeholder="Is there anything specific you want to ask?"
                    value={formData.questions}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm focus:bg-white focus:border-brand-teal outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-1/3 bg-slate-100 text-slate-600 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
                >
                  <ChevronLeft size={20} />
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.symptoms}
                  className="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all disabled:opacity-50"
                >
                  Upload Reports
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <span className="p-2 bg-brand-teal/10 rounded-xl"><Upload className="text-brand-teal" size={20} /></span>
                Upload Medical Reports
              </h3>

              <div 
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-[32px] p-10 text-center transition-all ${
                  dragActive ? "border-brand-teal bg-brand-teal/5 scale-[1.02]" : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="w-16 h-16 bg-brand-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Upload className="text-brand-teal" size={24} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Drag and drop files here</h4>
                <p className="text-xs text-slate-400 mb-6">Support for PDF, JPG, PNG (Max 10MB per file)</p>
                <label className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl text-sm font-bold cursor-pointer hover:bg-slate-50 transition-all inline-block">
                  Browse Files
                  <input type="file" multiple onChange={handleFileChange} className="hidden" />
                </label>
              </div>

              {files.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Selected Files ({files.length})</p>
                  <div className="grid grid-cols-1 gap-3">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileText className="text-brand-teal shrink-0" size={18} />
                          <span className="text-sm font-medium text-slate-700 truncate">{file.name}</span>
                          <span className="text-[10px] text-slate-400 font-bold">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => removeFile(index)}
                          className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-1/3 bg-slate-100 text-slate-600 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
                >
                  <ChevronLeft size={20} />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-brand-teal text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-brand-teal/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <>
                      Submit Request
                      <CheckCircle2 size={20} />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default SecondOpinionForm;
