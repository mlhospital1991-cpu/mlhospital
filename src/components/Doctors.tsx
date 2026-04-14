"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, MessageSquare, Award, CheckCircle2 } from "lucide-react";
import EmergencyModal from "./EmergencyModal";
import AppointmentModal from "./AppointmentModal";

const doctors = [
  {
    id: 1,
    name: "Dr. S. Manimekalai",
    specialty: "Founder, Gynaecologist",
    qualification: "MBBS, DGO",
    experience: "34+ Years of Excellence",
    image: "/doctors/Dr Manimekalai.jpeg",
    tags: ["Maternity", "Gynaecology", "General Surgery"]
  },
  {
    id: 2,
    name: "Dr. M. Radhakrishnan",
    specialty: "Co-Founder, Plastic Surgeon",
    qualification: "MBBS, MS, MCh (Plastic Surgery)",
    experience: "Trauma & Reconstructive Expert",
    image: "/doctors/Dr Radhakrishnan.jpeg",
    tags: ["Plastic Surgery", "Burns Care", "Trauma"]
  },
  {
    id: 3,
    name: "Dr. R. Aravind",
    specialty: "Consultant Orthopedic Surgeon",
    qualification: "MBBS, MS (Ortho)",
    experience: "Fracture & Spine Specialist",
    image: "/doctors/Dr Aravind.jpeg",
    tags: ["Orthopaedics", "Trauma Surgery", "Fracture Care"]
  },
  {
    id: 4,
    name: "Dr. Keerthana",
    specialty: "Medical Specialist",
    qualification: "MBBS",
    experience: "Emergency & Critical Care",
    image: "/doctors/Dr Keerthana.jpeg",
    tags: ["Internal Medicine", "Specialist Care"]
  },
  {
    id: 5,
    name: "Dr. Aarthy",
    specialty: "Medical Specialist",
    qualification: "MBBS",
    experience: "Primary & Emergency Care",
    image: "/doctors/Dr Aarthy.jpeg",
    tags: ["Medical Specialist", "Emergency Care"]
  }
];

const Doctors = () => {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const whatsappNumber = "918885553193";

  return (
    <section className="py-24 bg-white" id="doctors">
      {/* ... (header and grid) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-[11px] uppercase tracking-widest mb-6"
          >
            <Award size={16} />
            Expert Medical Team
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Meet Our <span className="text-brand-teal">Expert Doctors</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-slate-600 leading-relaxed font-medium"
          >
            Our team of highly qualified specialists is dedicated to providing compassionate care and advanced medical healing for your well-being.
          </motion.p>
        </div>

        {/* Doctors Grid */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-10">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-slate-50/50 rounded-[40px] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-brand-teal/5 transition-all duration-500 w-full sm:w-[calc(50%-20px)] lg:w-[calc(33.333%-27px)] max-w-[400px] flex flex-col"
            >
              {/* Doctor Image */}
              <div className="relative h-96 w-full overflow-hidden bg-slate-200">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Doctor Info */}
              <div className="p-8 flex flex-col flex-1">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{doctor.name}</h3>
                  <p className="text-brand-teal font-bold text-[11px] uppercase tracking-widest mb-3">{doctor.specialty}</p>
                  <p className="text-slate-500 text-[13px] font-semibold line-clamp-1">{doctor.qualification}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-8">
                  {doctor.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-4 mt-auto">
                   <div className="flex items-center gap-2 text-slate-500 text-[13px] font-semibold">
                      <div className="w-5 h-5 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                        <CheckCircle2 size={12} />
                      </div>
                      {doctor.experience}
                   </div>
                   
                   <button
                    onClick={() => setIsEmergencyModalOpen(true)}
                    className="flex items-center justify-center gap-2 w-full bg-brand-teal text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-brand-teal/10 hover:brightness-110"
                  >
                    <MessageSquare size={16} />
                    Emergency Appointment
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Schedule Appointment CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-1.5 rounded-[32px] bg-gradient-to-r from-brand-teal/20 to-brand-blue-deep/20">
            <button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="flex items-center gap-4 bg-brand-blue-deep text-white px-12 py-5 rounded-[26px] font-bold text-lg hover:brightness-110 transition-all shadow-2xl shadow-brand-blue-deep/20 group"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Phone size={20} />
              </div>
              Schedule an Appointment
            </button>
          </div>
          <p className="mt-8 text-slate-500 font-bold text-sm uppercase tracking-widest">
            Available 24/7 for Emergency & General Consultations
          </p>
        </motion.div>
      </div>
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
    </section>
  );
};

export default Doctors;
