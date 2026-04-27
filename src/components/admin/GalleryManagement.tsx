"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, Check, X, RefreshCw, Image as ImageIcon, LayoutGrid, Maximize2, MoveVertical } from "lucide-react";
import toast from "react-hot-toast";

interface GalleryImage {
  id: string;
  url: string;
  caption: string | null;
  collection: string;
  aspect: string;
  order: number;
}

interface GalleryManagementProps {
  initialImages?: GalleryImage[];
}

export default function GalleryManagement({ initialImages = [] }: GalleryManagementProps) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [loading, setLoading] = useState(initialImages.length === 0);
  const [editingImage, setEditingImage] = useState<Partial<GalleryImage> | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      if (Array.isArray(data)) setImages(data);
    } catch (error) {
      toast.error("Failed to fetch gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSave = async (id: string | undefined, data: any) => {
    try {
      const method = id ? "PATCH" : "POST";
      const url = id ? `/api/admin/gallery/${id}` : "/api/admin/gallery";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success(id ? "Image updated" : "Image added");
        fetchImages();
        setEditingImage(null);
        setIsAdding(false);
      }
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Image deleted");
        fetchImages();
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const collections = Array.from(new Set(images.map(img => img.collection)));

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gallery Management</h1>
          <p className="text-slate-500 text-sm">Organize hospital images into collections and manage layouts.</p>
        </div>
        <button 
          onClick={() => {
            setEditingImage({ collection: "Infrastructure", aspect: "square", order: images.length });
            setIsAdding(true);
          }}
          className="bg-brand-teal text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-brand-teal/20"
        >
          <Plus size={20} /> Add Image
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><RefreshCw className="animate-spin text-brand-teal" size={40} /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <motion.div
              key={img.id}
              layout
              className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm group hover:shadow-xl transition-all"
            >
              <div className={`relative aspect-square overflow-hidden bg-slate-100 ${img.aspect === 'wide' ? 'aspect-video' : img.aspect === 'tall' ? 'aspect-[3/4]' : ''}`}>
                <img src={img.url} alt={img.caption || ""} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-teal">
                  {img.collection}
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm font-bold text-slate-900 truncate mb-1">{img.caption || "No caption"}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Maximize2 size={10} /> {img.aspect}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setEditingImage(img)}
                    className="flex items-center justify-center gap-2 bg-slate-50 text-slate-600 py-2 rounded-xl text-[11px] font-bold hover:bg-slate-100 transition-all"
                  >
                    <Edit2 size={12} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(img.id)}
                    className="flex items-center justify-center gap-2 bg-rose-50 text-rose-600 py-2 rounded-xl text-[11px] font-bold hover:bg-rose-100 transition-all"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {editingImage && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[40px] p-8 md:p-10 w-full max-w-lg shadow-2xl my-8"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-8">{isAdding ? "Add New Image" : "Edit Image"}</h2>
              
              <div className="space-y-5">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Image Source</label>
                  <div 
                    onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-brand-teal', 'bg-brand-teal/5'); }}
                    onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-brand-teal', 'bg-brand-teal/5'); }}
                    onDrop={async (e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove('border-brand-teal', 'bg-brand-teal/5');
                      const file = e.dataTransfer.files[0];
                      if (file) {
                        const formData = new FormData();
                        formData.append("file", file);
                        toast.loading("Uploading...", { id: "upload" });
                        try {
                          const res = await fetch("/api/admin/gallery/upload", { method: "POST", body: formData });
                          const data = await res.json();
                          if (data.url) {
                            setEditingImage({ ...editingImage, url: data.url });
                            toast.success("Uploaded!", { id: "upload" });
                          }
                        } catch (err) {
                          toast.error("Upload failed", { id: "upload" });
                        }
                      }
                    }}
                    className="w-full border-2 border-dashed border-slate-200 rounded-[32px] p-8 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer hover:border-brand-teal/50 hover:bg-slate-50 relative overflow-hidden"
                  >
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const formData = new FormData();
                          formData.append("file", file);
                          toast.loading("Uploading...", { id: "upload" });
                          try {
                            const res = await fetch("/api/admin/gallery/upload", { method: "POST", body: formData });
                            const data = await res.json();
                            if (data.url) {
                              setEditingImage({ ...editingImage, url: data.url });
                              toast.success("Uploaded!", { id: "upload" });
                            }
                          } catch (err) {
                            toast.error("Upload failed", { id: "upload" });
                          }
                        }
                      }}
                    />
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
                      <ImageIcon size={24} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-slate-900">Drag & Drop Image</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">or click to browse files</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Image URL (Auto-filled)</label>
                  <input 
                    type="text" 
                    placeholder="https://..."
                    value={editingImage.url || ""} 
                    onChange={(e) => setEditingImage({...editingImage, url: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-3 text-sm font-bold focus:ring-2 focus:ring-brand-teal/20 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Collection</label>
                    <input 
                      type="text" 
                      list="collections-list"
                      value={editingImage.collection || ""} 
                      onChange={(e) => setEditingImage({...editingImage, collection: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-3 text-sm font-bold focus:ring-2 focus:ring-brand-teal/20 outline-none"
                    />
                    <datalist id="collections-list">
                      <option value="Infrastructure" />
                      <option value="Maternity" />
                      <option value="Trauma Care" />
                      <option value="Staff" />
                      <option value="Events" />
                    </datalist>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Alignment (Aspect)</label>
                    <select 
                      value={editingImage.aspect || "square"} 
                      onChange={(e) => setEditingImage({...editingImage, aspect: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-3 text-sm font-bold focus:ring-2 focus:ring-brand-teal/20 outline-none appearance-none"
                    >
                      <option value="square">Square (1:1)</option>
                      <option value="wide">Wide (16:9)</option>
                      <option value="tall">Tall (3:4)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Order</label>
                  <input 
                    type="number" 
                    value={editingImage.order || 0} 
                    onChange={(e) => setEditingImage({...editingImage, order: parseInt(e.target.value)})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-3 text-sm font-bold focus:ring-2 focus:ring-brand-teal/20 outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-10">
                <button 
                  onClick={() => handleSave(editingImage.id, editingImage)}
                  className="flex-grow bg-brand-teal text-white py-4 rounded-2xl font-bold shadow-lg shadow-brand-teal/20"
                >
                  {isAdding ? "Add to Gallery" : "Save Changes"}
                </button>
                <button 
                  onClick={() => { setEditingImage(null); setIsAdding(false); }}
                  className="px-8 bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold"
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
