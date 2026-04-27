"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  User, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Eye, 
  Download,
  Calendar,
  Phone,
  Mail,
  Stethoscope,
  ChevronRight,
  MessageSquare
} from "lucide-react";
import toast from "react-hot-toast";

interface SecondOpinionRequest {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  age: number | null;
  gender: string | null;
  symptoms: string;
  currentDiagnosis: string | null;
  questions: string | null;
  reportUrls: string[];
  status: string;
  createdAt: string;
}

interface SecondOpinionManagementProps {
  initialRequests?: SecondOpinionRequest[];
}

export default function SecondOpinionManagement({ initialRequests = [] }: SecondOpinionManagementProps) {
  const [requests, setRequests] = useState<SecondOpinionRequest[]>(initialRequests);
  const [loading, setLoading] = useState(initialRequests.length === 0);
  const [selectedRequest, setSelectedRequest] = useState<SecondOpinionRequest | null>(null);

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/admin/second-opinion");
      const data = await res.json();
      if (Array.isArray(data)) setRequests(data);
    } catch (error) {
      toast.error("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialRequests.length === 0) {
      fetchRequests();
    }
  }, [initialRequests.length]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/second-opinion/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
        if (selectedRequest?.id === id) setSelectedRequest({ ...selectedRequest, status });
        toast.success(`Status updated to ${status}`);
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const deleteRequest = async (id: string) => {
    if (!confirm("Are you sure you want to delete this request?")) return;
    try {
      const res = await fetch(`/api/admin/second-opinion/${id}`, { method: "DELETE" });
      if (res.ok) {
        setRequests(requests.filter(r => r.id !== id));
        setSelectedRequest(null);
        toast.success("Request deleted");
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Second Opinion Requests</h1>
          <p className="text-slate-500 text-sm">Review medical reports and provide expert consultations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List Section */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Clock size={18} className="text-brand-teal" />
                Recent Requests
              </h3>
            </div>
            <div className="divide-y divide-slate-50 max-h-[600px] overflow-y-auto">
              {requests.length === 0 && !loading && (
                <div className="p-10 text-center text-slate-400 text-sm">No requests found</div>
              )}
              {requests.map((req) => (
                <button
                  key={req.id}
                  onClick={() => setSelectedRequest(req)}
                  className={`w-full text-left p-6 hover:bg-slate-50 transition-all group relative ${
                    selectedRequest?.id === req.id ? "bg-teal-50/30" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      req.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                      req.status === 'reviewed' ? 'bg-blue-50 text-blue-600' :
                      'bg-green-50 text-green-600'
                    }`}>
                      {req.status}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 group-hover:text-brand-teal transition-colors">{req.patientName}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{req.symptoms}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                      <FileText size={12} /> {req.reportUrls.length} Files
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Detail Section */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedRequest ? (
              <motion.div
                key={selectedRequest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden"
              >
                <div className="p-8 md:p-10">
                  <div className="flex justify-between items-start mb-10">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-3xl bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                        <User size={32} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">{selectedRequest.patientName}</h2>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-widest">
                            {selectedRequest.gender || 'N/A'}, {selectedRequest.age || 'N/A'} yrs
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => updateStatus(selectedRequest.id, 'reviewed')}
                        className="p-3 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-100 transition-all"
                        title="Mark as Reviewed"
                      >
                        <CheckCircle2 size={20} />
                      </button>
                      <button 
                        onClick={() => deleteRequest(selectedRequest.id)}
                        className="p-3 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-100 transition-all"
                        title="Delete Request"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-600">
                        <Phone size={18} className="text-brand-teal" />
                        <span className="text-sm font-bold">{selectedRequest.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <Mail size={18} className="text-brand-teal" />
                        <span className="text-sm font-bold">{selectedRequest.email}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-600">
                        <Calendar size={18} className="text-brand-teal" />
                        <span className="text-sm font-bold">Submitted: {new Date(selectedRequest.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <Stethoscope size={18} className="text-brand-teal" />
                        <span className="text-sm font-bold">Status: {selectedRequest.status.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <section>
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Symptoms & Medical History</h4>
                      <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                        <p className="text-slate-700 leading-relaxed">{selectedRequest.symptoms}</p>
                      </div>
                    </section>

                    {selectedRequest.currentDiagnosis && (
                      <section>
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Current Diagnosis</h4>
                        <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                          <p className="text-slate-700 leading-relaxed">{selectedRequest.currentDiagnosis}</p>
                        </div>
                      </section>
                    )}

                    {selectedRequest.questions && (
                      <section>
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Specific Questions</h4>
                        <div className="bg-teal-50/20 p-6 rounded-3xl border border-teal-50">
                          <p className="text-brand-blue-deep leading-relaxed font-medium">{selectedRequest.questions}</p>
                        </div>
                      </section>
                    )}

                    <section>
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Medical Reports & Files ({selectedRequest.reportUrls.length})</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedRequest.reportUrls.map((url, idx) => (
                          <a
                            key={idx}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl hover:border-brand-teal hover:shadow-lg hover:shadow-brand-teal/5 transition-all group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-brand-teal/10 group-hover:text-brand-teal transition-colors">
                                <FileText size={20} />
                              </div>
                              <span className="text-xs font-bold text-slate-600 truncate max-w-[150px]">
                                {url.split('/').pop()}
                              </span>
                            </div>
                            <Download size={18} className="text-slate-300 group-hover:text-brand-teal transition-colors" />
                          </a>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[500px] bg-slate-50/50 rounded-[40px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 text-slate-200">
                  <MessageSquare size={40} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No Request Selected</h3>
                <p className="text-sm text-slate-400 max-w-xs">Select a patient request from the list on the left to review their medical records.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
