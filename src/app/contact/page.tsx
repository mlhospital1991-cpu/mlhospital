"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import EmergencyModal from "@/components/EmergencyModal";
import AppointmentModal from "@/components/AppointmentModal";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Navigation,
  Zap,
  Send,
  Globe,
  Heart,
  Play,
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Emergency Hotline",
    value: "8885553193",
    subtext: "Available 24/7 for emergencies",
    href: "tel:8885553193",
    color: "bg-red-500",
  },
  {
    icon: Phone,
    label: "Reception",
    value: "04652-230 530",
    subtext: "Mon–Sat, 8 AM – 8 PM",
    href: "tel:04652230530",
    color: "bg-brand-teal",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "info@mlhospital.in",
    subtext: "We reply within 24 hours",
    href: "mailto:info@mlhospital.in",
    color: "bg-indigo-600",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "M L Hospital, Court Road",
    subtext: "Nagercoil, Tamil Nadu 629001",
    href: "https://maps.app.goo.gl/UKf1gtRV4BevzFU2A",
    color: "bg-emerald-500",
  },
];

const timings = [
  { day: "Monday – Saturday", time: "8:00 AM – 8:00 PM", highlight: false },
  { day: "Sunday", time: "9:00 AM – 1:00 PM", highlight: false },
  { day: "Emergency / ICU", time: "24 Hours / 7 Days", highlight: true },
];

export default function ContactPage() {
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
            Get In Touch
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Contact <span className="text-brand-teal">Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-lg max-w-2xl font-medium leading-relaxed mb-8"
          >
            We&apos;re here to help you 24/7. Reach out for appointments,
            emergencies, or any enquiry — our team is always ready to assist.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="tel:8885553193"
              className="flex items-center gap-3 bg-white text-brand-blue-deep px-8 py-4 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all shadow-xl"
            >
              <Phone size={18} />
              Call 8885553193
            </a>
            <a
              href="https://maps.app.goo.gl/UKf1gtRV4BevzFU2A"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-brand-teal text-white px-8 py-4 rounded-2xl font-bold text-sm hover:brightness-110 transition-all shadow-xl shadow-brand-teal/20"
            >
              <Navigation size={18} />
              Get Directions
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white p-8 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-brand-teal/5 transition-all duration-500 group block"
              >
                <div
                  className={`w-14 h-14 rounded-[18px] ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                >
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {item.label}
                </p>
                <p className="text-lg font-bold text-slate-900 mb-1 group-hover:text-brand-teal transition-colors">
                  {item.value}
                </p>
                <p className="text-slate-500 text-sm font-medium">
                  {item.subtext}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Map + Timings + Quick Actions */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 rounded-[32px] overflow-hidden border border-slate-200 shadow-sm h-[400px] lg:h-auto"
            >
              <iframe
                src="https://www.google.com/maps?q=M+L+Hospital,+Court+Road,+Nagercoil,+Tamil+Nadu&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 400 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="M L Hospital Nagercoil Location"
              />
            </motion.div>

            {/* Right Column */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Operating Hours */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-[28px] p-8 border border-slate-100 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-teal/10 flex items-center justify-center">
                    <Clock size={20} className="text-brand-teal" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Operating Hours
                  </h3>
                </div>
                <div className="space-y-4">
                  {timings.map((t) => (
                    <div
                      key={t.day}
                      className={`flex items-center justify-between py-3 px-4 rounded-2xl ${
                        t.highlight
                          ? "bg-red-50 border border-red-100"
                          : "bg-slate-50"
                      }`}
                    >
                      <span
                        className={`text-sm font-bold ${
                          t.highlight ? "text-red-600" : "text-slate-700"
                        }`}
                      >
                        {t.day}
                      </span>
                      <span
                        className={`text-sm font-bold ${
                          t.highlight ? "text-red-500" : "text-brand-teal"
                        }`}
                      >
                        {t.time}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-[28px] p-8 border border-slate-100 shadow-sm"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-6">
                  Quick Actions
                </h3>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setIsAppointmentModalOpen(true)}
                    className="flex items-center justify-center gap-3 bg-brand-blue-deep text-white py-4 rounded-2xl font-bold text-sm hover:brightness-110 transition-all shadow-xl shadow-brand-blue-deep/10"
                  >
                    <Send size={18} />
                    Book Appointment
                  </button>
                  <button
                    onClick={() => setIsEmergencyModalOpen(true)}
                    className="flex items-center justify-center gap-3 bg-brand-teal text-white py-4 rounded-2xl font-bold text-sm hover:brightness-110 transition-all shadow-xl shadow-brand-teal/10"
                  >
                    <MessageSquare size={18} />
                    Emergency WhatsApp
                  </button>
                  <a
                    href="https://maps.app.goo.gl/UKf1gtRV4BevzFU2A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-slate-100 text-slate-700 py-4 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all"
                  >
                    <Navigation size={18} />
                    Get Directions
                  </a>
                </div>
              </motion.div>

              {/* Socials */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-[28px] p-8 border border-slate-100 shadow-sm"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                  >
                    <Globe size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                  >
                    <Heart size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                  >
                    <Play size={20} />
                  </a>
                </div>
              </motion.div>
            </div>
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
                Need Immediate Help?
              </h3>
              <p className="text-slate-300 mb-10 text-base font-medium">
                Don&apos;t wait — in a medical emergency, every second counts.
                Call us directly or send your details via WhatsApp for the
                fastest response.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-5">
                <a
                  href="tel:8885553193"
                  className="flex items-center justify-center gap-3 bg-white text-brand-blue-deep px-10 py-4.5 rounded-2xl font-bold text-base hover:bg-slate-100 transition-all shadow-xl shadow-white/5"
                >
                  <Phone size={20} />
                  Call 8885553193
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-brand-teal text-white px-10 py-4.5 rounded-2xl font-bold text-base hover:brightness-110 transition-all shadow-xl shadow-brand-teal/20"
                >
                  <MessageSquare size={20} />
                  WhatsApp Us
                </a>
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
