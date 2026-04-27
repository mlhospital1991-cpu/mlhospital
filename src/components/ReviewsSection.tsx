"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  id: string;
  author: string;
  authorPhoto: string;
  rating: number;
  text: string;
  relativeTime: string;
}

const ReviewsSection = ({ reviews }: { reviews: Review[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play effect
  useEffect(() => {
    if (reviews.length <= 1) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 4000);

    return () => clearInterval(timer);
  }, [currentIndex, reviews.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = reviews.length - 1;
      if (nextIndex >= reviews.length) nextIndex = 0;
      return nextIndex;
    });
  };

  if (reviews.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Patient <span className="text-brand-teal">Experiences</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            See what our patients have to say about their journey with M L Hospital.
          </p>
        </div>

        <div className="relative h-[550px] md:h-[400px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.3 }
              }}
              className="absolute w-full"
            >
              <div className="max-w-4xl mx-auto">
                <div className="bg-white p-10 md:p-14 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 relative group overflow-hidden">
                  {/* Background Quote Decoration */}
                  <div className="absolute -top-6 -right-6 text-slate-50 group-hover:text-brand-teal/[0.03] transition-colors -rotate-12">
                    <Quote size={200} />
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
                    <div className="flex-shrink-0 relative">
                      <div className="absolute inset-0 bg-brand-teal/20 blur-2xl rounded-full scale-110" />
                      <img
                        src={reviews[currentIndex].authorPhoto || "https://api.dicebear.com/7.x/initials/svg?seed=" + reviews[currentIndex].author}
                        alt={reviews[currentIndex].author}
                        className="w-24 h-24 md:w-32 md:h-32 rounded-3xl border-4 border-white shadow-lg object-cover relative z-10"
                      />
                    </div>

                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h4 className="text-2xl font-black text-slate-900">{reviews[currentIndex].author}</h4>
                        <div className="flex gap-0.5 bg-yellow-50 px-3 py-1 rounded-full">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < reviews[currentIndex].rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-slate-600 text-lg md:text-xl leading-relaxed italic mb-6">
                        "{reviews[currentIndex].text}"
                      </p>

                      <div className="flex items-center gap-4 text-slate-400">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-teal">Google Review</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        <span className="text-sm font-medium">{reviews[currentIndex].relativeTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-4 md:-mx-8 z-20">
            <button
              onClick={() => paginate(-1)}
              className="w-14 h-14 rounded-full bg-white border border-slate-100 shadow-lg flex items-center justify-center text-slate-400 hover:text-brand-teal hover:border-brand-teal transition-all pointer-events-auto active:scale-95 group"
            >
              <ChevronLeft className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="w-14 h-14 rounded-full bg-white border border-slate-100 shadow-lg flex items-center justify-center text-slate-400 hover:text-brand-teal hover:border-brand-teal transition-all pointer-events-auto active:scale-95 group"
            >
              <ChevronRight className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Pagination Dots */}
        {reviews.length > 1 && (
          <div className="flex justify-center gap-3 mt-12">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`transition-all duration-500 rounded-full ${
                  idx === currentIndex 
                    ? "w-8 h-2.5 bg-brand-teal shadow-[0_0_10px_rgba(20,184,166,0.3)]" 
                    : "w-2.5 h-2.5 bg-slate-200 hover:bg-slate-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-[100px] -z-0 -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-blue-deep/5 rounded-full blur-[80px] -z-0 -ml-32 -mb-32" />
    </section>
  );
};

export default ReviewsSection;
