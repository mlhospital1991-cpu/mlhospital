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
    icon: Activity,
    title: "Orthopedic Surgery",
    description:
      "Expert joint replacement, spinal care, and fracture management specialized for mobility and long-term health.",
    color: "bg-[#00baf2]",
    shadow: "shadow-sky-500/20",
    highlights: [
      "Total Hip & Knee Replacement",
      "Spinal Surgery & Disc Treatments",
      "Sports Injury Management",
      "Fracture Fixation & Trauma Care",
    ],
  },
  {
    icon: Flame,
    title: "Advanced Burn Care",
    description:
      "State-of-the-art treatment for burn injuries with a focus on recovery, skin grafting, and reconstruction.",
    color: "bg-orange-500",
    shadow: "shadow-orange-500/20",
    highlights: [
      "Acute Burn Treatment",
      "Skin Grafting & Reconstruction",
      "Contracture Release Surgery",
      "Post-Burn Rehabilitation",
    ],
  },
  {
    icon: Scissors,
    title: "Plastic & Reconstructive Surgery",
    description:
      "Specialized reconstructive procedures restoring form and function after trauma, burns, or congenital conditions.",
    color: "bg-violet-600",
    shadow: "shadow-violet-500/20",
    highlights: [
      "Microsurgery & Flap Coverage",
      "Cleft Lip & Palate Repair",
      "Hand Surgery & Replantation",
      "Scar Revision & Cosmetic Procedures",
    ],
  },
  {
    icon: Baby,
    title: "Maternity & Gynaecology",
    description:
      "Comprehensive women's healthcare from prenatal care to delivery and gynaecological surgeries with 34+ years of experience.",
    color: "bg-pink-500",
    shadow: "shadow-pink-500/20",
    highlights: [
      "Normal & Caesarean Deliveries",
      "High-Risk Pregnancy Management",
      "Laparoscopic Gynaecology",
      "Infertility Evaluation & Support",
    ],
  },
  {
    icon: Ambulance,
    title: "24/7 Emergency & Trauma",
    description:
      "Immediate medical response for accidents, trauma, and critical conditions with a fully equipped emergency ward.",
    color: "bg-red-500",
    shadow: "shadow-red-500/20",
    highlights: [
      "Round-the-Clock Emergency Care",
      "Accident & Trauma Stabilization",
      "Emergency Surgical Theatre",
      "Ambulance Services",
    ],
  },
  {
    icon: HeartPulse,
    title: "Critical Care (ICU)",
    description:
      "Highly specialized intensive care monitoring for complex medical and surgical patients with advanced life-support.",
    color: "bg-rose-500",
    shadow: "shadow-rose-500/20",
    highlights: [
      "24/7 Intensivist-Led Care",
      "Ventilator & Life-Support Systems",
      "Post-Surgical Critical Monitoring",
      "Multi-Organ Failure Management",
    ],
  },
];

const supportServices = [
  {
    icon: Microscope,
    title: "Advanced Diagnostics",
    description:
      "Modern laboratory and imaging services for accurate and timely health assessments.",
    color: "bg-indigo-600",
  },
  {
    icon: Pill,
    title: "In-House Pharmacy",
    description:
      "Quick and reliable access to essential medications and medical supplies onsite.",
    color: "bg-emerald-500",
  },
  {
    icon: Stethoscope,
    title: "General Medicine",
    description:
      "Expert consultation for a wide range of medical conditions and preventive health checkups.",
    color: "bg-teal-500",
  },
  {
    icon: Syringe,
    title: "Vaccination & Immunization",
    description:
      "Complete vaccination programs for children and adults following national immunization schedules.",
    color: "bg-amber-500",
  },
  {
    icon: Eye,
    title: "Physiotherapy",
    description:
      "Rehabilitation programs for post-surgery recovery, sports injuries, and chronic pain management.",
    color: "bg-cyan-600",
  },
  {
    icon: ShieldCheck,
    title: "Health Checkup Packages",
    description:
      "Comprehensive annual health screening packages designed for early detection and prevention.",
    color: "bg-lime-600",
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
            for over 34&nbsp;years.
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
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

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Why Choose{" "}
              <span className="text-brand-teal">M&nbsp;L&nbsp;Hospital?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                stat: "34+",
                label: "Years of Excellence",
              },
              {
                icon: ShieldCheck,
                stat: "24/7",
                label: "Emergency Services",
              },
              {
                icon: BrainCircuit,
                stat: "15+",
                label: "Specialist Doctors",
              },
              {
                icon: HeartPulse,
                stat: "50,000+",
                label: "Patients Served",
              },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-[28px] bg-slate-50 border border-slate-100"
              >
                <div className="w-14 h-14 rounded-full bg-brand-teal/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-brand-teal" />
                </div>
                <p className="text-4xl font-bold text-brand-blue-deep mb-2">
                  {item.stat}
                </p>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">
                  {item.label}
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
