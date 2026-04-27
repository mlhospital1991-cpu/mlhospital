"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import EmergencyModal from "@/components/EmergencyModal";
import AppointmentModal from "@/components/AppointmentModal";
import {
  HeartPulse,
  Activity,
  Flame,
  Stethoscope,
  Microscope,
  Pill,
  Clock,
  ChevronRight,
  Phone,
  MessageSquare,
  Baby,
  Bone,
  Syringe,
  ShieldCheck,
  Ambulance,
  Scissors,
  Eye,
  BrainCircuit,
  Zap,
  CheckCircle2,
} from "lucide-react";

const mainServices = [
  {
    icon: Bone,
    title: "Ortho, Spine, Arthroscopy & Joint Replacement",
    description:
      "Comprehensive musculoskeletal care including advanced spinal surgeries, keyhole joint procedures, and total joint replacements.",
    color: "bg-[#00baf2]",
    shadow: "shadow-sky-500/20",
    highlights: [
      "Total Hip & Knee Replacement",
      "Spinal Surgery & Disc Treatments",
      "Arthroscopic (Keyhole) Surgery",
      "Complex Fracture Management",
    ],
  },
  {
    icon: Scissors,
    title: "Plastic, Reconstructive & Cosmetic Surgery",
    description:
      "Expert surgical procedures focused on restoring function and enhancing aesthetics through advanced microsurgery and cosmetic techniques.",
    color: "bg-violet-600",
    shadow: "shadow-violet-500/20",
    highlights: [
      "Microsurgery & Flap Coverage",
      "Cosmetic Face & Body Contouring",
      "Reconstructive Hand Surgery",
      "Scar Revision & Laser Treatments",
    ],
  },
  {
    icon: Flame,
    title: "Advanced Burns Unit",
    description:
      "State-of-the-art dedicated facility for acute burn management, skin grafting, and post-burn reconstruction.",
    color: "bg-orange-500",
    shadow: "shadow-orange-500/20",
    highlights: [
      "Acute Burn ICU Care",
      "Skin Grafting & Bio-Dressings",
      "Contracture Release Surgery",
      "Post-Burn Rehabilitation",
    ],
  },
  {
    icon: Activity,
    title: "Liposuction",
    description:
      "Advanced body sculpting and fat removal procedures performed by senior plastic surgeons using modern equipment.",
    color: "bg-cyan-600",
    shadow: "shadow-cyan-500/20",
    highlights: [
      "Targeted Fat Removal",
      "Body Contouring & Sculpting",
      "Minimally Invasive Techniques",
      "Quick Recovery Protocols",
    ],
  },
  {
    icon: Baby,
    title: "Maternity & Gynecology",
    description:
      "Compassionate women's healthcare from prenatal care to complex gynecological surgeries with 35+ years of expertise.",
    color: "bg-pink-500",
    shadow: "shadow-pink-500/20",
    highlights: [
      "Normal & C-Section Deliveries",
      "High-Risk Pregnancy Care",
      "Laparoscopic Gynae Surgery",
      "Infertility & Wellness Clinics",
    ],
  },
  {
    icon: Ambulance,
    title: "24/7 Emergency & Trauma",
    description:
      "Immediate, life-saving medical response for accidents and critical emergencies with a fully equipped trauma center.",
    color: "bg-red-500",
    shadow: "shadow-red-500/20",
    highlights: [
      "Round-the-Clock Emergency Care",
      "Accident & Trauma Stabilization",
      "Emergency OT Facilities",
      "Advanced Ambulance Support",
    ],
  },
];

const supportServices = [
  {
    icon: Ambulance,
    title: "24/7 Emergency",
    description:
      "Immediate medical response for trauma and critical conditions available round the clock.",
    color: "bg-red-500",
  },
  {
    icon: Eye,
    title: "Physiotherapy",
    description:
      "Advanced rehabilitation programs for post-surgery recovery and chronic pain management.",
    color: "bg-cyan-600",
  },
  {
    icon: Pill,
    title: "In-House Pharmacy",
    description:
      "24/7 access to essential medications and medical supplies located within the hospital.",
    color: "bg-emerald-500",
  },
  {
    icon: Scissors,
    title: "Modular Operation Theatre",
    description:
      "State-of-the-art infection-controlled surgical suites equipped with modern medical technology.",
    color: "bg-indigo-600",
  },
  {
    icon: Flame,
    title: "Exclusive Burns Theatre",
    description:
      "Specialized surgical facility dedicated specifically for burn surgeries and reconstruction.",
    color: "bg-orange-500",
  },
  {
    icon: Zap,
    title: "400 mah X-Ray Machine",
    description:
      "High-precision digital imaging for accurate diagnostic assessment and fracture management.",
    color: "bg-blue-600",
  },
  {
    icon: Activity,
    title: "Flat Panel C-Arm",
    description:
      "Intra-operative real-time imaging for precision during orthopedic and spinal surgeries.",
    color: "bg-teal-600",
  },
  {
    icon: Microscope,
    title: "Advanced Diagnostics",
    description:
      "Comprehensive laboratory and imaging services for accurate health assessments.",
    color: "bg-violet-600",
  },
  {
    icon: Baby,
    title: "Infertility Services",
    description:
      "Specialized evaluation and treatment options for couples seeking fertility support.",
    color: "bg-pink-500",
  },
];

export default function ServicesPage() {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const whatsappNumber = "918885553193";

  return (
    <main className="bg-white">
      {/* Hero Banner */}
      <section className="relative bg-brand-blue-deep overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal opacity-10 rounded-full -mr-60 -mt-60 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-teal opacity-10 rounded-full -ml-40 -mb-40 blur-[80px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-teal font-bold text-[11px] uppercase tracking-widest mb-6 backdrop-blur-sm"
          >
            <Zap size={14} />
            World-Class Medical Care
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Our Medical <br />
            <span className="text-brand-teal">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-lg max-w-2xl font-medium leading-relaxed"
          >
            From emergency trauma response to specialized surgeries,
            M&nbsp;L&nbsp;Hospital has been providing a full spectrum of
            world-class medical facilities to Nagercoil and surrounding regions
            for over 35&nbsp;years.
          </motion.p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-[11px] uppercase tracking-widest mb-6">
              Core Specialties
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Specialized{" "}
              <span className="text-brand-teal">Departments</span>
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-medium">
              Each department is led by senior specialists with decades of
              experience, supported by modern infrastructure and compassionate
              nursing staff.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mainServices.map((service, index) => (
              <motion.div
                key={service.title}
                id={service.title.toLowerCase().includes('ortho') ? 'ortho' : service.title.toLowerCase().includes('burn') ? 'burns' : service.title.toLowerCase().includes('plastic') ? 'plastic' : service.title.toLowerCase().includes('maternity') ? 'maternity' : service.title.toLowerCase().includes('emergency') ? 'emergency' : service.title.toLowerCase().includes('icu') ? 'icu' : service.title.toLowerCase().includes('lipo') ? 'lipo' : ''}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: index * 0.08 
                }}
                whileHover={{ 
                  scale: 1.015, 
                  y: -5,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
                className="bg-white p-8 md:p-10 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-brand-teal/5 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-slate-50 rounded-full -mr-20 -mt-20 transition-transform duration-500 group-hover:scale-125" />

                <div className="relative z-10 flex items-start gap-6">
                  <div
                    className={`w-16 h-16 rounded-[20px] ${service.color} flex items-center justify-center shrink-0 shadow-xl ${service.shadow} group-hover:scale-110 transition-transform duration-500`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-teal transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium mb-6">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.highlights.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-slate-600 text-[13px] font-medium"
                        >
                          <CheckCircle2
                            size={14}
                            className="text-brand-teal shrink-0"
                          />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-[11px] uppercase tracking-widest mb-6">
              Support Facilities
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Additional{" "}
              <span className="text-brand-teal">Facilities</span>
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-medium">
              Beyond our core specialties, we provide a range of support
              facilities ensuring comprehensive patient care under one roof.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-white p-8 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
              >
                <div
                  className={`w-14 h-14 rounded-[18px] ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                >
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-brand-teal transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-blue-deep rounded-[40px] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-blue-deep/20"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-teal opacity-10 rounded-full -mr-40 -mt-40 blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-teal opacity-10 rounded-full -ml-40 -mb-40 blur-[80px]" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Need Emergency Assistance?
              </h3>
              <p className="text-slate-300 mb-10 text-base font-medium">
                Our emergency department is open 24/7. Contact us immediately
                for any critical care requirements.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-5">
                <a
                  href="tel:8885553193"
                  className="flex items-center justify-center gap-3 bg-white text-brand-blue-deep px-10 py-4.5 rounded-2xl font-bold text-base hover:bg-slate-100 transition-all shadow-xl shadow-white/5"
                >
                  <Phone size={20} />
                  Call Hotline Now
                </a>
                <button
                  onClick={() => setIsEmergencyModalOpen(true)}
                  className="flex items-center justify-center gap-3 bg-brand-teal text-white px-10 py-4.5 rounded-2xl font-bold text-base hover:brightness-110 transition-all shadow-xl shadow-brand-teal/20"
                >
                  <MessageSquare size={20} />
                  Emergency Appointment
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        whatsappNumber={whatsappNumber}
      />
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        centralNumber={whatsappNumber}
      />
    </main>
  );
}
