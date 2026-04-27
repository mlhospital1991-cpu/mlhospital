"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, Baby, Users, HeartPulse, Activity } from "lucide-react";

const stats = [
  {
    icon: Clock,
    value: "35+",
    label: "Years of Excellence",
    color: "bg-blue-50 text-blue-500",
  },
  {
    icon: Activity,
    value: "40,000+",
    label: "Major Surgeries",
    color: "bg-cyan-50 text-cyan-500",
  },
  {
    icon: Baby,
    value: "20,000+",
    label: "Deliveries",
    color: "bg-pink-50 text-pink-500",
  },
  {
    icon: Users,
    value: "7 Lakh+",
    label: "Patients Served",
    color: "bg-indigo-50 text-indigo-500",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Why Choose <span className="text-brand-teal">M L Hospital?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-50/50 border border-slate-100 p-10 rounded-[40px] text-center hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all group"
            >
              <div className={`mx-auto mb-8 transition-all duration-500 relative flex items-center justify-center h-24 ${
                stat.label === "Major Surgeries" ? "w-full bg-brand-teal/5 rounded-3xl" : "w-16 h-16 rounded-full " + stat.color
              }`}>
                {stat.label === "Major Surgeries" ? (
                  <div className="relative w-full h-full flex items-center overflow-hidden bg-brand-teal/[0.02]">
                    <div className="relative w-full h-12 flex items-center justify-center px-8">
                      <svg className="w-full h-full text-brand-teal" viewBox="0 0 400 50" preserveAspectRatio="none">
                        <motion.path
                          d="M0,25 L30,25 L40,10 L50,40 L60,25 L100,25 L110,5 L125,45 L140,25 L180,25 L190,15 L200,35 L210,25 L250,25 L260,5 L275,45 L290,25 L330,25 L340,15 L350,35 L360,25 L400,25"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ 
                            pathLength: [0, 1],
                            opacity: [0, 1, 1, 0]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            ease: "linear",
                            times: [0, 0.1, 0.9, 1]
                          }}
                        />
                      </svg>
                      
                      {/* Traveling Scan Head Dot */}
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-brand-teal rounded-full shadow-[0_0_8px_rgba(20,184,166,0.6)] z-20"
                        animate={{ 
                          left: ["8%", "92%"],
                          opacity: [0, 1, 1, 0]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          ease: "linear",
                          times: [0, 0.1, 0.9, 1]
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <stat.icon size={28} className="group-hover:scale-110 transition-transform duration-500" />
                )}
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-teal/5 rounded-full blur-[120px] -z-0" />
    </section>
  );
};

export default Features;
