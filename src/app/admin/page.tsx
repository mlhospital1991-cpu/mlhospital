"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  BarChart3, 
  Calendar, 
  Clock, 
  Filter, 
  LogOut, 
  MessageSquare, 
  RefreshCw, 
  Search, 
  User as UserIcon, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  ChevronRight,
  Stethoscope,
  MapPin,
  ClipboardList,
  Phone,
  Trash2,
  Users as UsersIcon,
  LayoutDashboard
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import UserManagement from "@/components/admin/UserManagement";

// Doctor Number Mapping for Forwarding
const DOCTOR_NUMBERS: Record<string, string> = {
  "Dr. S. Manimekalai": "918885553193",
  "Dr. M. Radhakrishnan": "918885553193",
  "Dr. R. Aravind": "918885553193",
  "Dr. Keerthana": "918885553193",
  "Dr. Aarthy": "918885553193",
  "General Consultation": "918885553193",
};

interface Appointment {
  id: string;
  name: string;
  location: string | null;
  issue: string | null;
  doctor: string;
  date: string;
  time: string;
  status: string;
  opNumber: string | null;
  createdAt: string;
}

interface UserProfile {
  id: string;
  username: string;
  role: string;
  name: string;
  permissions: string[];
}

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "users">("dashboard");
  
  // Login State
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  // Check for existing session on mount
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        setUserProfile(data.user);
      }
    } catch (err) {
      console.error("Auth check failed");
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/appointments");
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setAppointments(data);
        setLastRefreshed(new Date());
      }
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auth check
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (res.ok) {
        setIsAuthenticated(true);
        setUserProfile(data.user);
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsAuthenticated(false);
    setUserProfile(null);
  };

  // Auto Refresh Every 60 Seconds
  useEffect(() => {
    if (isAuthenticated && activeTab === "dashboard") {
      fetchAppointments();
      const interval = setInterval(fetchAppointments, 60000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, activeTab, fetchAppointments]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchAppointments(); // Refresh list
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update status");
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const forwardToDoctor = (apt: Appointment) => {
    const doctorNumber = DOCTOR_NUMBERS[apt.doctor] || "918885553193";
    
    // Format a nice message for the doctor
    const message = encodeURIComponent(
      `*M L Hospital - Appointment Forward*\n\n` +
      `You have a new appointment scheduled via the Admin Panel.\n\n` +
      `*Patient:* ${apt.name}\n` +
      (apt.opNumber ? `*OP Number:* ${apt.opNumber}\n` : "") +
      `*Location:* ${apt.location || "N/A"}\n` +
      `*Time:* ${apt.time}\n` +
      `*Date:* ${new Date(apt.date).toLocaleDateString()}\n` +
      `*Issue:* ${apt.issue || "General Consultation"}\n\n` +
      `Please acknowledge receipt of this enquiry.`
    );

    window.open(`https://wa.me/${doctorNumber}?text=${message}`, "_blank");
    
    // Update status to "forwarded" if it was pending
    if (apt.status === "pending") {
      updateStatus(apt.id, "forwarded");
    }
  };

  const deleteAppointment = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this appointment?")) return;
    
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchAppointments();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete");
      }
    } catch (err) {
      console.error("Failed to delete appointment:", err);
    }
  };

  const hasPermission = (perm: string) => {
    if (!userProfile) return false;
    if (userProfile.role === "ADMIN") return true;
    return userProfile.permissions.includes(perm);
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.name.toLowerCase().includes(search.toLowerCase()) || 
                          apt.doctor.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || apt.status === filter;
    return matchesSearch && matchesFilter;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-blue-deep flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-full blur-3xl -mr-16 -mt-16" />
          
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-brand-teal/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Stethoscope className="text-brand-teal" size={40} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">ML Hospital Admin</h1>
            <p className="text-slate-500 text-sm font-medium">Global Portal Authentication</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-2">Username</label>
                <input
                  type="text"
                  placeholder="staff_id"
                  className="w-full bg-slate-50 border border-slate-200 rounded-[22px] px-6 py-4 text-sm font-bold focus:border-brand-teal focus:outline-none focus:ring-4 focus:ring-brand-teal/5 transition-all text-center"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-2">Access Key</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-[22px] px-6 py-4 text-sm font-bold focus:border-brand-teal focus:outline-none focus:ring-4 focus:ring-brand-teal/5 transition-all text-center tracking-[0.3em]"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs font-bold text-center animate-shake">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-brand-blue-deep text-white py-5 rounded-[22px] font-bold text-lg shadow-xl shadow-brand-blue-deep/20 hover:brightness-110 active:scale-95 transition-all"
            >
              Access System
            </button>
          </form>

          <p className="mt-10 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            Identity Managed Security
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-brand-blue-deep flex items-center justify-center">
                <Stethoscope className="text-brand-teal" size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 leading-none">Administration</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">M L Hospital Nagercoil</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="hidden lg:flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-100">
              <button 
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === "dashboard" ? "bg-white text-brand-blue-deep shadow-sm" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <LayoutDashboard size={14} />
                Enquiries
              </button>
              {hasPermission("manage_users") && (
                <button 
                  onClick={() => setActiveTab("users")}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === "users" ? "bg-white text-brand-blue-deep shadow-sm" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <UsersIcon size={14} />
                  Staff
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 pr-6 border-r border-slate-100">
              <div className="text-right">
                <p className="text-[11px] font-bold text-slate-900 leading-none">{userProfile?.name}</p>
                <p className="text-[9px] font-bold text-brand-teal uppercase tracking-widest mt-1">{userProfile?.role}</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                <UserIcon size={18} />
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="p-3 text-slate-400 hover:text-red-500 transition-colors"
              title="Sign Out"
            >
              <LogOut size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                {[
                  { label: "Bookings", value: appointments.length, icon: ClipboardList, color: "text-brand-blue-deep", bg: "bg-brand-blue-deep/5" },
                  { label: "New Alerts", value: appointments.filter(a => a.status === 'pending').length, icon: Clock, color: "text-amber-500", bg: "bg-amber-500/5" },
                  { label: "Acknowledged", value: appointments.filter(a => a.status === 'forwarded').length, icon: MessageSquare, color: "text-brand-teal", bg: "bg-brand-teal/5" },
                  { label: "Completed", value: appointments.filter(a => a.status === 'completed').length, icon: CheckCircle2, color: "text-slate-400", bg: "bg-slate-400/5" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm"
                  >
                    <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                      <stat.icon size={24} />
                    </div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Filters & Actions */}
              <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden mb-10">
                <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row gap-6 justify-between items-center">
                  <div className="relative w-full md:w-96">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text"
                      placeholder="Search appointments..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 py-3.5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-teal/5 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="flex h-12 bg-slate-50 rounded-2xl p-1 border border-slate-100 overflow-x-auto">
                      {["all", "pending", "forwarded", "completed", "archived"].map((f) => (
                        <button
                          key={f}
                          onClick={() => setFilter(f)}
                          className={`px-6 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all ${
                            filter === f ? "bg-white text-brand-blue-deep shadow-sm" : "text-slate-400"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                    <button 
                      onClick={fetchAppointments}
                      className={`p-3.5 bg-brand-teal/10 text-brand-teal rounded-2xl border border-brand-teal/20 transition-all ${loading ? 'animate-spin' : ''}`}
                      title="Refresh manually"
                    >
                      <RefreshCw size={20} />
                    </button>
                  </div>
                </div>

                {/* Table Area */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th className="p-8 pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Patient Detail</th>
                        <th className="p-8 pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Doctor Requested</th>
                        <th className="p-8 pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Schedule</th>
                        <th className="p-8 pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Status</th>
                        <th className="p-8 pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      <AnimatePresence>
                        {filteredAppointments.length > 0 ? filteredAppointments.map((apt) => (
                          <motion.tr 
                            key={apt.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="hover:bg-slate-50/20 transition-colors group"
                          >
                            <td className="p-8 py-10">
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 bg-slate-100 sticky top-0 ${apt.status === 'pending' ? 'ring-4 ring-brand-teal/20' : ''}`}>
                                  <UserIcon size={20} />
                                </div>
                                <div>
                                  <p className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                                    {apt.name} 
                                    {apt.status === 'pending' && <span className="w-2 h-2 rounded-full bg-brand-teal inline-block animate-pulse" />}
                                  </p>
                                  <div className="flex flex-col gap-1">
                                    <span className="text-[10px] flex items-center gap-1.5 text-slate-500 font-bold uppercase tracking-tight">
                                      <MapPin size={10} className="text-slate-300" />
                                      {apt.location || "N/A"}
                                    </span>
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-md self-start border ${
                                      apt.opNumber 
                                        ? "text-brand-teal bg-brand-teal/5 border-brand-teal/10" 
                                        : "text-slate-400 bg-slate-50 border-slate-200"
                                    }`}>
                                      OP: {apt.opNumber || "N/A"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-8">
                              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-brand-blue-deep/5 rounded-xl border border-brand-blue-deep/10">
                                <UserIcon size={14} className="text-brand-blue-deep" />
                                <span className="text-[13px] font-bold text-brand-blue-deep">{apt.doctor}</span>
                              </div>
                            </td>
                            <td className="p-8">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
                                   <Calendar size={14} className="text-slate-400" />
                                   {new Date(apt.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2 text-[13px] font-bold text-brand-teal">
                                   <Clock size={14} />
                                   {apt.time}
                                </div>
                              </div>
                            </td>
                            <td className="p-8">
                              <select 
                                disabled={!hasPermission("edit_status")}
                                value={apt.status}
                                onChange={(e) => updateStatus(apt.id, e.target.value)}
                                className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border focus:outline-none transition-all disabled:opacity-50 ${
                                  apt.status === "pending" ? "bg-amber-50 text-amber-600 border-amber-200" :
                                  apt.status === "forwarded" ? "bg-blue-50 text-blue-600 border-blue-200" :
                                  apt.status === "archived" ? "bg-slate-100 text-slate-500 border-slate-200" :
                                  "bg-green-50 text-green-600 border-green-200"
                                }`}
                              >
                                <option value="pending">Pending</option>
                                <option value="forwarded">Forwarded</option>
                                <option value="completed">Completed</option>
                                <option value="archived">Archived</option>
                              </select>
                            </td>
                            <td className="p-8">
                              <div className="flex items-center gap-2">
                                {hasPermission("forward") && (
                                  <button 
                                    onClick={() => forwardToDoctor(apt)}
                                    className="flex items-center gap-3 bg-brand-teal text-white px-5 py-3 rounded-2xl font-bold text-xs shadow-lg shadow-brand-teal/10 hover:brightness-110 active:scale-95 transition-all"
                                  >
                                    <MessageSquare size={16} />
                                    Forward
                                  </button>
                                )}
                                {hasPermission("delete") && (
                                  <button 
                                    onClick={() => deleteAppointment(apt.id)}
                                    className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    title="Delete permanently"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </motion.tr>
                        )) : (
                          <tr>
                            <td colSpan={5} className="p-20 text-center">
                              <div className="max-w-xs mx-auto text-slate-400 space-y-4">
                                 <ClipboardList size={48} className="mx-auto text-slate-200" />
                                 <p className="font-bold text-sm">No enquiries found at the moment.</p>
                                 <p className="text-[11px] font-medium tracking-tight">Your dashboard is clean. Sit back, we'll pulse when a new booking arrives.</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="users"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <UserManagement />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">
           M L Hospital Administrative Portal • Session: {userProfile?.username?.toUpperCase()} ({lastRefreshed.toLocaleTimeString()})
        </p>
      </div>
    </div>
  );
};

export default AdminPage;
