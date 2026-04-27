"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, MessageSquare, Award, CheckCircle2, AlertCircle } from "lucide-react";
import EmergencyModal from "./EmergencyModal";
import AppointmentModal from "./AppointmentModal";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experience: string;
  image: string;
  tags: string[];
  whatsapp: string;
  isAvailable: boolean;
  showOnHome: boolean;
}

const Doctors = ({ doctors }: { doctors: Doctor[] }) => {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [selectedDoctorWhatsapp, setSelectedDoctorWhatsapp] = useState("918885553193");
  
  const centralNumber = "918885553193";

  // Filter out doctors that shouldn't be shown on home
  const displayDoctors = doctors.filter(d => d.showOnHome);

  if (displayDoctors.length === 0) return null;

  return (
    <section className="py-24 bg-white" id="doctors">
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
          {displayDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-slate-50/50 rounded-[40px] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-brand-teal/5 transition-all duration-500 w-full sm:w-[calc(50%-20px)] lg:w-[calc(33.333%-27px)] max-w-[400px] flex flex-col relative"
            >
              {/* Availability Badge */}
              <div className={`absolute top-6 right-6 z-20 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md ${
                doctor.isAvailable ? "bg-green-500/90 text-white" : "bg-rose-500/90 text-white"
              }`}>
                {doctor.isAvailable ? "Available Today" : "Away / In Surgery"}
              </div>

              {/* Doctor Image */}
              <div className="relative h-96 w-full overflow-hidden bg-slate-200">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Doctor Info */}
              <div className="p-8 flex flex-col flex-1">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-brand-teal transition-colors">{doctor.name}</h3>
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
                    onClick={() => {
                      setSelectedDoctorWhatsapp(doctor.whatsapp || centralNumber);
                      setIsEmergencyModalOpen(true);
                    }}
                    className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-sm transition-all shadow-lg ${
                      doctor.isAvailable 
                        ? "bg-brand-teal text-white shadow-brand-teal/10 hover:brightness-110" 
                        : "bg-slate-200 text-slate-500 cursor-not-allowed"
                    }`}
                    disabled={!doctor.isAvailable}
                  >
                    {doctor.isAvailable ? <MessageSquare size={16} /> : <AlertCircle size={16} />}
                    {doctor.isAvailable ? "Contact Doctor" : "Doctor Unavailable"}
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
              onClick={() => {
                setSelectedDoctorWhatsapp(centralNumber);
                setIsAppointmentModalOpen(true);
              }}
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
        whatsappNumber={selectedDoctorWhatsapp}
      />
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        centralNumber={centralNumber}
      />
    </section>
  );
};

export default Doctors;
