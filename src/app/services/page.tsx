import React from "react";
import ServicesClient from "@/components/services/ServicesClient";
import {
  Bone,
  Scissors,
  Flame,
  Activity,
  Baby,
  Ambulance,
  Eye,
  Pill,
  Microscope,
  Zap,
  CheckCircle2,
} from "lucide-react";

export const dynamic = "force-dynamic";

const mainServices = [
  {
    icon: Bone,
    title: "Ortho, Spine, Arthroscopy & Joint Replacement",
    description: "Comprehensive musculoskeletal care including advanced spinal surgeries, keyhole joint procedures, and total joint replacements.",
    color: "bg-[#00baf2]",
    highlights: ["Total Hip & Knee Replacement", "Spinal Surgery & Disc Treatments", "Arthroscopic (Keyhole) Surgery", "Complex Fracture Management"],
  },
  {
    icon: Scissors,
    title: "Plastic, Reconstructive & Cosmetic Surgery",
    description: "Expert surgical procedures focused on restoring function and enhancing aesthetics through advanced microsurgery and cosmetic techniques.",
    color: "bg-violet-600",
    highlights: ["Microsurgery & Flap Coverage", "Cosmetic Face & Body Contouring", "Reconstructive Hand Surgery", "Scar Revision & Laser Treatments"],
  },
  {
    icon: Flame,
    title: "Advanced Burns Unit",
    description: "State-of-the-art dedicated facility for acute burn management, skin grafting, and post-burn reconstruction.",
    color: "bg-orange-500",
    highlights: ["Acute Burn ICU Care", "Skin Grafting & Bio-Dressings", "Contracture Release Surgery", "Post-Burn Rehabilitation"],
  },
  {
    icon: Activity,
    title: "Liposuction",
    description: "Advanced body sculpting and fat removal procedures performed by senior plastic surgeons using modern equipment.",
    color: "bg-cyan-600",
    highlights: ["Targeted Fat Removal", "Body Contouring & Sculpting", "Minimally Invasive Techniques", "Quick Recovery Protocols"],
  },
  {
    icon: Baby,
    title: "Maternity & Gynecology",
    description: "Compassionate women's healthcare from prenatal care to complex gynecological surgeries with 35+ years of expertise.",
    color: "bg-pink-500",
    highlights: ["Normal & C-Section Deliveries", "High-Risk Pregnancy Care", "Laparoscopic Gynae Surgery", "Infertility & Wellness Clinics"],
  },
  {
    icon: Ambulance,
    title: "24/7 Emergency & Trauma",
    description: "Immediate, life-saving medical response for accidents and critical emergencies with a fully equipped trauma center.",
    color: "bg-red-500",
    highlights: ["Round-the-Clock Emergency Care", "Accident & Trauma Stabilization", "Emergency OT Facilities", "Advanced Ambulance Support"],
  },
];

const supportServices = [
  { icon: Ambulance, title: "24/7 Emergency", description: "Immediate medical response for trauma and critical conditions available round the clock.", color: "bg-red-500" },
  { icon: Eye, title: "Physiotherapy", description: "Advanced rehabilitation programs for post-surgery recovery and chronic pain management.", color: "bg-cyan-600" },
  { icon: Pill, title: "In-House Pharmacy", description: "24/7 access to essential medications and medical supplies located within the hospital.", color: "bg-emerald-500" },
  { icon: Scissors, title: "Modular Operation Theatre", description: "State-of-the-art infection-controlled surgical suites equipped with modern medical technology.", color: "bg-indigo-600" },
  { icon: Flame, title: "Exclusive Burns Theatre", description: "Specialized surgical facility dedicated specifically for burn surgeries and reconstruction.", color: "bg-orange-500" },
  { icon: Zap, title: "400 mah X-Ray Machine", description: "High-precision digital imaging for accurate diagnostic assessment and fracture management.", color: "bg-blue-600" },
  { icon: Activity, title: "Flat Panel C-Arm", description: "Intra-operative real-time imaging for precision during orthopedic and spinal surgeries.", color: "bg-teal-600" },
  { icon: Microscope, title: "Advanced Diagnostics", description: "Comprehensive laboratory and imaging services for accurate health assessments.", color: "bg-violet-600" },
  { icon: Baby, title: "Infertility Services", description: "Specialized evaluation and treatment options for couples seeking fertility support.", color: "bg-pink-500" },
];

export default function ServicesPage() {
  return (
    <main className="bg-white">
      {/* Hero Banner - SSR */}
      <section className="relative bg-[#001e3c] overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#00baf2] font-bold text-[11px] uppercase tracking-widest mb-6 backdrop-blur-sm">
            <Zap size={14} />
            World-Class Medical Care
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Our Medical <br />
            <span className="text-[#00baf2]">Services</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl font-medium leading-relaxed">
            From emergency trauma response to specialized surgeries, M L Hospital has been providing world-class medical facilities for over 35 years.
          </p>
        </div>
      </section>

      {/* Main Services - SSR */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00baf2]/10 text-[#00baf2] font-bold text-[11px] uppercase tracking-widest mb-6">
            Core Specialties
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Specialized <span className="text-[#00baf2]">Departments</span>
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mainServices.map((service) => (
            <div key={service.title} className="bg-white p-8 md:p-10 rounded-[32px] border border-slate-100 shadow-sm flex items-start gap-6 relative overflow-hidden group">
              <div className={`w-16 h-16 rounded-[20px] ${service.color} flex items-center justify-center shrink-0 shadow-xl`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#00baf2] transition-colors">{service.title}</h3>
                <p className="text-slate-500 text-sm mb-6">{service.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.highlights.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-slate-600 text-[13px] font-medium">
                      <CheckCircle2 size={14} className="text-[#00baf2]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Support Services - SSR */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportServices.map((service) => (
            <div key={service.title} className="bg-white p-8 rounded-[28px] border border-slate-100 shadow-sm">
              <div className={`w-14 h-14 rounded-[18px] ${service.color} flex items-center justify-center mb-6 shadow-lg`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactivity Handler (Modals) */}
      <ServicesClient />
    </main>
  );
}
