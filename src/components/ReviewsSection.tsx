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

        <div className="relative h-[450px] md:h-[320px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 100, damping: 20 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.3 }
              }}
              className="absolute w-full"
            >
              <div className="max-w-3xl mx-auto">
                <motion.div 
                  whileHover={{ scale: 1.01, y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-white p-8 md:p-10 rounded-[32px] border border-slate-100 shadow-lg shadow-slate-200/20 relative group overflow-hidden"
                >
                  {/* Background Quote Decoration */}
                  <div className="absolute -top-4 -right-4 text-slate-50 group-hover:text-brand-teal/[0.02] transition-colors -rotate-12">
                    <Quote size={120} />
                  </div>
                  <div className="relative z-10 text-center max-w-xl mx-auto">
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-100/30 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < reviews[currentIndex].rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}
                          />
                        ))}
                      </div>

                      <p className="text-slate-600 text-lg md:text-xl leading-relaxed italic mb-6 font-medium">
                        "{reviews[currentIndex].text}"
                      </p>

                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xl font-bold text-slate-900">{reviews[currentIndex].author}</h4>
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white" title="Verified Reviewer">
                            <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-current">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-slate-400">
                          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Verified</span>
                          </div>
                          <span className="text-xs font-semibold text-slate-400">{reviews[currentIndex].relativeTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
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
