"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, Phone, Check, X, RefreshCw, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experience: string;
  image: string;
  tags: string[];
  whatsapp: string;
  isAvailable: boolean;
  showOnHome: boolean;
  order: number;
}

interface DoctorManagementProps {
  initialDoctors?: Doctor[];
  onUpdate?: () => void;
}

export default function DoctorManagement({ initialDoctors = [], onUpdate }: DoctorManagementProps) {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [loading, setLoading] = useState(initialDoctors.length === 0);
  const [editingDoc, setEditingDoc] = useState<Partial<Doctor> | null>(null);

  const fetchDoctors = async () => {
    try {
      const res = await fetch("/api/admin/doctors");
      const data = await res.json();
      if (Array.isArray(data)) setDoctors(data);
    } catch (error) {
      toast.error("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setDoctors(initialDoctors);
    if (initialDoctors.length === 0) {
      fetchDoctors();
    }
  }, [initialDoctors]);

  const handleUpdate = async (id: string, data: any) => {
    try {
      const res = await fetch(`/api/admin/doctors/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success("Doctor updated");
        if (onUpdate) onUpdate();
        fetchDoctors();
        setEditingDoc(null);
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/admin/doctors/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Doctor deleted");
        if (onUpdate) onUpdate();
        fetchDoctors();
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Doctor Management</h1>
          <p className="text-slate-500 text-sm">Manage doctor profiles, availability, and contact details.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><RefreshCw className="animate-spin text-brand-teal" size={40} /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <motion.div
              key={doc.id}
              layout
              className={`bg-white p-6 rounded-[32px] border-2 transition-all ${doc.showOnHome ? "border-teal-50" : "border-slate-100 opacity-75"}`}
            >
              <div className="flex items-start gap-4 mb-6">
                <img src={doc.image} alt={doc.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100" />
                <div className="flex-grow">
                  <h3 className="font-bold text-slate-900 text-lg">{doc.name}</h3>
                  <p className="text-brand-teal text-[11px] font-bold uppercase tracking-widest">{doc.specialty}</p>
                  <p className="text-slate-400 text-xs mt-1">{doc.qualification}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 font-medium flex items-center gap-2"><Phone size={14} /> WhatsApp</span>
                  <span className="font-bold text-slate-900">{doc.whatsapp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm font-medium">Availability</span>
                  <button 
                    onClick={() => handleUpdate(doc.id, { isAvailable: !doc.isAvailable })}
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                      doc.isAvailable ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    }`}
                  >
                    {doc.isAvailable ? "Available" : "Unavailable"}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm font-medium">Display on Website</span>
                  <button 
                    onClick={() => handleUpdate(doc.id, { showOnHome: !doc.showOnHome })}
                    className={`p-2 rounded-xl transition-all ${
                      doc.showOnHome ? "bg-teal-50 text-brand-teal" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {doc.showOnHome ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-50">
                <button 
                  onClick={() => setEditingDoc(doc)}
                  className="flex items-center justify-center gap-2 bg-slate-50 text-slate-600 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all"
                >
                  <Edit2 size={14} /> Edit Profile
                </button>
                <button 
                  onClick={() => handleDelete(doc.id)}
                  className="flex items-center justify-center gap-2 bg-rose-50 text-rose-600 py-2.5 rounded-xl text-xs font-bold hover:bg-rose-100 transition-all"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editingDoc && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[40px] p-8 md:p-10 w-full max-w-2xl shadow-2xl my-8"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Edit Profile: {editingDoc.name}</h2>
                <button onClick={() => setEditingDoc(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Doctor Name</label>
                  <input 
                    type="text" 
                    value={editingDoc.name} 
                    onChange={(e) => setEditingDoc({...editingDoc, name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-3 text-sm font-bold focus:ring-2 focus:ring-brand-teal/20 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Specialty / Designation</label>
                  <input 
                    type="text" 
                    value={editingDoc.specialty} 
                    onChange={(e) => setEditingDoc({...editingDoc, specialty: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-3 text-sm font-bold focus:ring-2 focus:ring-brand-teal/20 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Qualifications</label>
                  <input 
                    type="text" 
                    value={editingDoc.qualification} 
                    onChange={(e) => setEditingDoc({...editingDoc, qualification: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-3 text-sm font-bold focus:ring-2 focus:ring-brand-teal/20 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Experience Tagline</label>
                  <input 
                    type="text" 
                    value={editingDoc.experience} 
                    onChange={(e) => setEditingDoc({...editingDoc, experience: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-3 text-sm font-bold focus:ring-2 focus:ring-brand-teal/20 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">WhatsApp Number</label>
                  <input 
                    type="text" 
                    value={editingDoc.whatsapp} 
                    onChange={(e) => setEditingDoc({...editingDoc, whatsapp: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-3 text-sm font-bold focus:ring-2 focus:ring-brand-teal/20 outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Expertise Tags (Keywords) - Separate with commas</label>
                  <textarea 
                    value={editingDoc.tags?.join(", ")} 
                    onChange={(e) => setEditingDoc({...editingDoc, tags: e.target.value.split(",").map(t => t.trim()).filter(t => t !== "")})}
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-3 text-sm font-bold focus:ring-2 focus:ring-brand-teal/20 outline-none resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-10">
                <button 
                  onClick={() => handleUpdate(editingDoc.id!, editingDoc)}
                  className="flex-grow bg-brand-teal text-white py-4 rounded-2xl font-bold shadow-lg shadow-brand-teal/20 hover:brightness-105 transition-all"
                >
                  Save All Changes
                </button>
                <button 
                  onClick={() => setEditingDoc(null)}
                  className="px-10 bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
