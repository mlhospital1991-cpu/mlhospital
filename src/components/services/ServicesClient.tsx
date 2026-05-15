"use client";

import React, { useState } from "react";
import EmergencyModal from "@/components/EmergencyModal";
import AppointmentModal from "@/components/AppointmentModal";
import { Phone, MessageSquare } from "lucide-react";

export default function ServicesClient() {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const whatsappNumber = "918885553193";

  return (
    <>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-[#001e3c] rounded-[40px] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
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
                  className="flex items-center justify-center gap-3 bg-white text-[#001e3c] px-10 py-4.5 rounded-2xl font-bold text-base hover:bg-slate-100 transition-all shadow-xl"
                >
                  <Phone size={20} />
                  Call Hotline Now
                </a>
                <button
                  onClick={() => setIsEmergencyModalOpen(true)}
                  className="flex items-center justify-center gap-3 bg-[#00baf2] text-white px-10 py-4.5 rounded-2xl font-bold text-base hover:brightness-110 transition-all shadow-xl"
                >
                  <MessageSquare size={20} />
                  Emergency Appointment
                </button>
              </div>
            </div>
          </div>
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
    </>
  );
}
