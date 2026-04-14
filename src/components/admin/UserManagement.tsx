"use client";

import React, { useState, useEffect } from "react";
import { 
  UserPlus, 
  Trash2, 
  Shield, 
  User as UserIcon,
  Check,
  X,
  ShieldCheck,
  ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface User {
  id: string;
  username: string;
  name: string;
  role: string;
  permissions: string[];
}

const AVAILABLE_PERMISSIONS = [
  { id: "view_all", label: "View All Appointments", description: "Can see all doctor appointments" },
  { id: "edit_status", label: "Edit Status", description: "Can change appointment status" },
  { id: "forward", label: "Forward to WhatsApp", description: "Can send details to doctors" },
  { id: "delete", label: "Delete Records", description: "Can permanently remove data" },
  { id: "manage_users", label: "Manage Users", description: "Can add/edit admin users" },
];

const ROLES = ["ADMIN", "DOCTOR", "NURSE"];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    role: "NURSE",
    permissions: [] as string[]
  });

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (err) {
      console.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowAddModal(false);
        setFormData({ username: "", password: "", name: "", role: "NURSE", permissions: [] });
        fetchUsers();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to create user");
      }
    } catch (err) {
      alert("Error creating user");
    }
  };

  const handleUpdatePermissions = async (userId: string, permissionId: string, currentPermissions: string[]) => {
    let newPermissions: string[];
    if (currentPermissions.includes(permissionId)) {
      newPermissions = currentPermissions.filter(p => p !== permissionId);
    } else {
      newPermissions = [...currentPermissions, permissionId];
    }

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ permissions: newPermissions }),
      });
      if (res.ok) {
        fetchUsers();
      }
    } catch (err) {
      console.error("Failed to update permissions");
    }
  };

  const handleUpdateRole = async (userId: string, role: string) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (res.ok) {
        fetchUsers();
      }
    } catch (err) {
      console.error("Failed to update role");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchUsers();
      } else {
        const data = await res.json();
        alert(data.error);
      }
    } catch (err) {
      console.error("Failed to delete user");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
          <p className="text-slate-500 text-sm">Manage staff roles and access permissions</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-brand-blue-deep text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-brand-blue-deep/20 hover:brightness-110 active:scale-95 transition-all"
        >
          <UserPlus size={18} />
          Add New User
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-8 pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Staff Member</th>
                <th className="p-8 pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Role</th>
                <th className="p-8 pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Permissions</th>
                <th className="p-8 pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/20 transition-colors">
                  <td className="p-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                        <UserIcon size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-400 font-medium italic">@{user.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <select 
                      value={user.role}
                      onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                      className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border focus:outline-none transition-all ${
                        user.role === "ADMIN" ? "bg-purple-50 text-purple-600 border-purple-200" :
                        user.role === "DOCTOR" ? "bg-blue-50 text-blue-600 border-blue-200" :
                        "bg-green-50 text-green-600 border-green-200"
                      }`}
                    >
                      {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </td>
                  <td className="p-8">
                    <div className="flex flex-wrap gap-2">
                      {AVAILABLE_PERMISSIONS.map(perm => (
                        <button
                          key={perm.id}
                          onClick={() => handleUpdatePermissions(user.id, perm.id, user.permissions)}
                          className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tight border transition-all flex items-center gap-1.5 ${
                            user.permissions.includes(perm.id) 
                              ? "bg-brand-teal text-white border-brand-teal shadow-sm" 
                              : "bg-white text-slate-300 border-slate-100 hover:border-slate-300"
                          }`}
                          title={perm.description}
                        >
                          {user.permissions.includes(perm.id) ? <ShieldCheck size={10} /> : <ShieldAlert size={10} />}
                          {perm.label}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="p-8">
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title="Delete user"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[40px] p-10 w-full max-w-lg shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-1">Create Staff Account</h3>
                <p className="text-sm text-slate-500">Provide login credentials for the new member</p>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 ml-2 uppercase tracking-widest">Display Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Dr. Keerthana"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-teal/5 focus:bg-white transition-all"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 ml-2 uppercase tracking-widest">Username</label>
                    <input 
                      required
                      type="text" 
                      placeholder="unique_id"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-teal/5 focus:bg-white transition-all"
                      value={formData.username}
                      onChange={e => setFormData({ ...formData, username: e.target.value.toLowerCase() })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 ml-2 uppercase tracking-widest">Password</label>
                  <input 
                    required
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-teal/5 focus:bg-white transition-all"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 ml-2 uppercase tracking-widest">Base Role</label>
                  <div className="grid grid-cols-3 gap-3">
                    {ROLES.map(role => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setFormData({ ...formData, role })}
                        className={`py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest border transition-all ${
                          formData.role === role 
                            ? "bg-brand-blue-deep text-white border-brand-blue-deep shadow-lg shadow-brand-blue-deep/20" 
                            : "bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-4.5 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-brand-teal text-white py-4.5 rounded-2xl font-bold shadow-xl shadow-brand-teal/20 hover:brightness-110 active:scale-95 transition-all"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
