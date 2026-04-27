"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Check, X, Star, RefreshCw, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface Review {
  id: string;
  author: string;
  authorPhoto: string;
  rating: number;
  text: string;
  relativeTime: string;
  isApproved: boolean;
  createdAt: string;
}

interface ReviewManagementProps {
  initialReviews?: Review[];
}

export default function AdminReviews({ initialReviews = [] }: ReviewManagementProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loading, setLoading] = useState(initialReviews.length === 0);
  const [collecting, setCollecting] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/admin/reviews");
      const data = await res.json();
      if (Array.isArray(data)) {
        setReviews(data);
      } else {
        console.error("API returned non-array data:", data);
        setReviews([]);
      }
    } catch (error) {
      toast.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleCollect = async () => {
    setCollecting(true);
    try {
      const res = await fetch("/api/admin/reviews", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        fetchReviews();
      }
    } catch (error) {
      toast.error("Failed to collect reviews");
    } finally {
      setCollecting(false);
    }
  };

  const toggleApproval = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isApproved: !currentStatus }),
      });
      if (res.ok) {
        setReviews(reviews.map(r => r.id === id ? { ...r, isApproved: !currentStatus } : r));
        toast.success(!currentStatus ? "Review Approved" : "Approval Revoked");
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Update failed");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
      if (res.ok) {
        setReviews(reviews.filter(r => r.id !== id));
        toast.success("Review Deleted");
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Google Reviews</h1>
            <p className="text-slate-500">Collect and moderate patient feedback for the homepage.</p>
          </div>
          <button
            onClick={handleCollect}
            disabled={collecting}
            className="flex items-center justify-center gap-2 bg-brand-teal text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-600 transition-all disabled:opacity-50"
          >
            {collecting ? <RefreshCw className="animate-spin" size={20} /> : <Download size={20} />}
            {collecting ? "Collecting..." : "Collect Latest Reviews"}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <RefreshCw className="animate-spin text-brand-teal" size={40} />
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <p className="text-slate-400 text-lg">No reviews collected yet. Click the button above to fetch from Google.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white p-6 rounded-2xl border-2 transition-all flex flex-col md:flex-row gap-6 ${
                  review.isApproved ? "border-teal-100" : "border-slate-100"
                }`}
              >
                <div className="flex-shrink-0">
                  <img
                    src={review.authorPhoto || "https://api.dicebear.com/7.x/initials/svg?seed=" + review.author}
                    alt={review.author}
                    className="w-16 h-16 rounded-full border-2 border-slate-100"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900 text-lg">{review.author}</h3>
                    <span className="text-xs text-slate-400">{review.relativeTime}</span>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}
                      />
                    ))}
                  </div>
                  <p className="text-slate-600 line-clamp-3">{review.text}</p>
                </div>

                <div className="flex md:flex-col gap-2 justify-center">
                  <button
                    onClick={() => toggleApproval(review.id, review.isApproved)}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      review.isApproved 
                        ? "bg-amber-50 text-amber-600 hover:bg-amber-100" 
                        : "bg-teal-50 text-brand-teal hover:bg-teal-100"
                    }`}
                  >
                    {review.isApproved ? <X size={18} /> : <Check size={18} />}
                    {review.isApproved ? "Revoke" : "Approve"}
                  </button>
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
