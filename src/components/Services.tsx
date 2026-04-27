"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import EmergencyModal from "./EmergencyModal";
import { 
  HeartPulse, 
  Activity, 
  Flame, 
  Stethoscope, 
  Thermometer, 
  Microscope, 
  Pill, 
  Clock,
  ChevronRight
} from "lucide-react";

const services = [
  {
    icon: Activity,
    title: "Orthopedic Surgery",
    description: "Expert joint replacement and spinal care specialized for mobility and long-term health.",
    color: "bg-[#00baf2]", // Paytm Sky Blue
    shadow: "shadow-sky-500/20",
    href: "/services#ortho"
  },
  {
    icon: Flame,
    title: "Advanced Burn Care",
    description: "State-of-the-art treatment for burn injuries with a focus on recovery and reconstruction.",
    color: "bg-orange-500",
    shadow: "shadow-orange-500/20",
    href: "/services#burns"
  },
  {
    icon: Activity, // Using Activity for heartbeat look in red box
    title: "24/7 Emergency",
    description: "Immediate medical response for trauma and critical conditions, available round the clock.",
    color: "bg-red-500",
    shadow: "shadow-red-500/20",
    href: "/services#emergency"
  },
  {
    icon: HeartPulse,
    title: "Critical Care (ICU)",
    description: "Highly specialized intensive care monitoring for complex medical and surgical patients.",
    color: "bg-rose-500",
    shadow: "shadow-rose-500/20",
    href: "/services#icu"
  },
  {
    icon: Microscope,
    title: "Advanced Diagnostics",
    description: "Modern laboratory and imaging services for accurate and timely health assessments.",
    color: "bg-indigo-600",
    shadow: "shadow-indigo-500/20",
    href: "/services"
  },
  {
    icon: Pill,
    title: "In-House Pharmacy",
    description: "Quick and reliable access to essential medications and medical supplies onsite.",
    color: "bg-emerald-500",
    shadow: "shadow-emerald-500/20",
    href: "/services"
  },
  {
    icon: Stethoscope,
    title: "FREE Second Opinion",
    description: "Get expert advice and diagnosis review from our senior specialists at zero cost.",
    color: "bg-brand-teal",
    shadow: "shadow-brand-teal/20",
    href: "/second-opinion"
  }
];

const Services = () => {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const whatsappNumber = "918885553193";

  return (
    <section className="py-24 bg-slate-50" id="services">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-[11px] uppercase tracking-widest mb-6"
          >
            Our Specialties
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Comprehensive <br />
            <span className="text-brand-teal">Healthcare Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-slate-600 leading-relaxed font-medium"
          >
            From emergency response to specialized surgeries, M L Hospital provides a full spectrum of world-class medical facilities tailored for Nagercoil.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-brand-teal/5 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-110" />
              
              <div className={`relative z-10 w-16 h-16 rounded-[24px] ${service.color} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 shadow-xl ${service.shadow}`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="relative z-10 text-xl font-bold text-slate-900 mb-4 group-hover:text-brand-teal transition-colors">{service.title}</h3>
              <p className="relative z-10 text-slate-500 text-[14px] leading-relaxed mb-10 font-medium">
                {service.description}
              </p>

              <Link 
                href={service.href}
                className="relative z-10 flex items-center gap-2 text-brand-teal font-bold text-[11px] uppercase tracking-widest cursor-pointer hover:gap-3 transition-all duration-300 w-fit"
              >
                Explore Service
                <ChevronRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 bg-brand-blue-deep rounded-[40px] p-10 md:p-14 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-blue-deep/20"
        >
          {/* Paytm-style background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-teal opacity-10 rounded-full -mr-40 -mt-40 blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-teal opacity-10 rounded-full -ml-40 -mb-40 blur-[80px]" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Need Emergency Assistance?</h3>
            <p className="text-slate-300 mb-10 text-base font-medium">
              Our emergency department is open 24/7. Contact us immediately for any critical care requirements.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <a 
                href="tel:8885553193" 
                className="bg-white text-brand-blue-deep px-10 py-4.5 rounded-2xl font-bold text-base hover:bg-slate-100 transition-all shadow-xl shadow-white/5"
              >
                Call Hotline Now
              </a>
              <button 
                onClick={() => setIsEmergencyModalOpen(true)}
                className="bg-brand-teal text-white px-10 py-4.5 rounded-2xl font-bold text-base hover:brightness-110 transition-all shadow-xl shadow-brand-teal/20"
              >
                Emergency Appointment
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      <EmergencyModal 
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        whatsappNumber={whatsappNumber}
      />
    </section>
  );
};

export default Services;
