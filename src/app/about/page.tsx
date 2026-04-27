"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Award, Heart, Shield, Users, Globe, History, Activity } from "lucide-react";

export default function AboutPage() {
  const coreTeam = [
    { 
      name: "Dr. M. Radhakrishnan", 
      role: "Retd. Dean Kanyakumari medical college, Consultant plastic and reconstructive surgeon", 
      qualification: "M.S.,Mch. Plastic surgery",
      image: "/doctors/dr-radhakrishnan.jpg",
      tags: ["40 years of excellence", "burns specialist", "liposuction", "flap cover", "skin graft", "microssurgery", "trauma specialist"]
    },
    { 
      name: "Dr. S. Manimekalai", 
      role: "Director of ML Hospital, Consultant obstetrician and gynecologist", 
      qualification: "M.D.,DGO",
      image: "/doctors/dr-manimekalai.jpg",
      tags: ["40 years of excellence", "pregnancy", "obstetrics", "gynecology", "Laparoscopy specialist"]
    },
    { 
      name: "Dr. R. Keerthana", 
      role: "Consultant gynaecologist & laparoscopic surgeon", 
      qualification: "MS (OBG)., DNB OG,PDF( Endogynaecology)",
      image: "/doctors/dr-keerthana.jpg",
      tags: ["infertility specialist", "pregnancy", "laparoscopy specialist", "fertility"]
    },
    { 
      name: "Dr. R. Aravind", 
      role: "Consultant Orthopaedic surgeon", 
      qualification: "M.S.,Ortho.",
      image: "/doctors/dr-aravind.jpg",
      tags: ["trauma specialist", "fracture", "spine surgery", "joint replacement", "arthroscopy", "key hole surgery", "deformity correction"]
    },
    { 
      name: "Dr. B. Aarthy", 
      role: "Consultant plastic and cosmetic surgeon", 
      qualification: "M.S.,MCH ( plastic surgery)",
      image: "/doctors/dr-aarthy.jpg",
      tags: ["cosmetic surgery", "aesthetic surgery", "flap cover", "microsurgery", "trauma and reconstructive surgery"]
    },
  ];

  const values = [
    { icon: Heart, title: "Compassionate Care", desc: "Treating every patient with dignity and deep empathy since 1991." },
    { icon: Shield, title: "Unwavering Trust", desc: "A pillar of reliability during Tsunami, Oki, and the COVID era." },
    { icon: Activity, title: "Specialized Excellence", desc: "Focused expertise in Trauma, Orthopedics, and Maternity services." },
  ];

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* Hero Header */}
      <section className="bg-brand-blue-deep text-white py-20 md:py-32 relative">
        <div className="absolute inset-0 opacity-15">
          <Image src="/hero-image.jpg" alt="ML Hospital History" fill sizes="100vw" className="object-cover grayscale" />
        </div>
        {/* Paytm-style gradient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal opacity-10 rounded-full blur-[100px] -mr-48 -mt-48" />
        
        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold uppercase tracking-widest mb-6"
          >
            <History size={14} className="text-brand-teal" />
            35 Years of Dedication
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-tight"
          >
            Our Story & <br />
            <span className="text-brand-teal">Core Heritage</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl"
          >
            ML Hospital began in 1991 as a small dream of an aspiring medico couple. Today, it stands as a pillar of specialized trauma and maternity care in Nagercoil.
          </motion.p>
        </div>
        
        {/* Curved Divider */}
        <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px]">
            <path d="M0,0 C300,10 600,100 1200,50 V120 H0 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-3">
              <div className="w-10 h-1 bg-brand-teal rounded-full" />
              Institutional Heritage
            </h2>
            <div className="space-y-6 text-slate-600 leading-[1.8] text-base md:text-lg font-medium">
              <p>
                Our institution has been a trusted presence in the community for over <span className="text-brand-teal font-bold">35 years</span>, delivering comprehensive healthcare services with a strong emphasis on surgical care. We specialize in trauma and emergency management, ensuring rapid, coordinated, and high-quality interventions for critical cases.
              </p>
              <p>
                Committed to providing accessible and affordable healthcare, we offer a wide range of services under one roof. Our dedicated trauma team, supported by efficient emergency ambulance services, enables us to deliver timely and effective care when it matters most.
              </p>
            </div>
          </div>
          
          <div className="bg-slate-50/50 p-8 md:p-10 rounded-[40px] border border-slate-100 relative shadow-sm">
            <QuoteIcon className="absolute top-8 right-8 text-slate-200 w-12 h-12" />
            <h3 className="text-xl font-bold text-slate-900 mb-8 tracking-tight">Core Medical Team</h3>
            <div className="grid grid-cols-1 gap-6">
              {coreTeam.map((doctor, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-5 p-5 bg-white rounded-[28px] border border-slate-100 shadow-sm group hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-300"
                >
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                    <Image 
                      src={doctor.image} 
                      alt={doctor.name}
                      fill
                      sizes="256px"
                      className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-[16px] leading-tight">{doctor.name}</p>
                    <p className="text-[12px] text-brand-teal font-bold uppercase tracking-widest mt-1.5">{doctor.role}</p>
                    <p className="text-[11px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">{doctor.qualification}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 flex items-center justify-center text-brand-teal mb-8">
              <Globe size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-6 text-slate-900">Our Vision</h3>
            <div className="text-slate-500 leading-relaxed italic font-medium space-y-4">
              <p>
                "Our vision is to deliver comprehensive, holistic, and compassionate trauma care that addresses not only the immediate medical needs of patients but also their overall physical and emotional well-being. We aspire to create an integrated healthcare environment where advanced treatment, multidisciplinary expertise, and patient-centered care come together seamlessly under one roof."
              </p>
              <p>
                "Through a commitment to clinical excellence, timely intervention, and continuous improvement, we aim to set a benchmark in trauma care by ensuring that every patient receives coordinated, efficient, and empathetic treatment from admission through recovery."
              </p>
            </div>
          </div>
          
          <div className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 flex items-center justify-center text-brand-teal mb-8">
              <Award size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-6 text-slate-900">Our Mission</h3>
            <p className="text-slate-500 leading-relaxed italic font-medium">
              "Our mission is to deliver patient-centered care by understanding individual needs and responding with empathy and compassion. We are committed to providing timely and efficient evaluation through a structured triage system, ensuring that every patient receives prompt and appropriate management. We strive to offer the highest standards of treatment while maintaining affordability and accessibility for all."
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 max-w-6xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl font-bold mb-16 inline-block border-b-4 border-brand-teal pb-4">Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {values.map((val, idx) => (
            <div key={idx} className="space-y-6 px-4">
              <div className="mx-auto w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center text-brand-teal shadow-inner">
                <val.icon size={30} />
              </div>
              <h4 className="font-bold text-lg text-slate-900 tracking-tight">{val.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Back CTA */}
      <section className="py-24 bg-brand-blue-deep text-center text-white relative overflow-hidden">
        {/* Paytm-style background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal opacity-10 rounded-full blur-[100px] -mr-32 -mt-32" />
        
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h3 className="text-3xl md:text-5xl font-bold mb-8">Serving Nagercoil Since 1991</h3>
          <p className="text-slate-400 mb-12 text-lg font-medium">
            Experience our 35-year legacy of compassionate care. Our trauma and emergency experts are available 24/7.
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center gap-4 bg-brand-teal text-white px-12 py-5 rounded-2xl font-bold text-lg hover:brightness-110 transition-all shadow-2xl shadow-brand-teal/20"
          >
            <Home size={22} />
            Visit Homepage
          </Link>
        </div>
      </section>
    </main>
  );
}

function QuoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H13.017C12.4647 13 12.017 12.5523 12.017 12V9C12.017 7.34315 13.3601 6 15.017 6H19.017C20.6739 6 22.017 7.34315 22.017 9V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM3.01704 21L3.01704 18C3.01704 16.8954 3.91242 16 5.01704 16H8.01704C8.56932 16 9.01704 15.5523 9.01704 15V9C9.01704 8.44772 8.56932 8 8.01704 8H5.01704C4.46476 8 4.01704 8.44772 4.01704 9V12C4.01704 12.5523 3.56932 13 3.01704 13H2.01704C1.46476 13 1.01704 12.5523 1.01704 12V9C1.01704 7.34315 2.36019 6 4.01704 6H8.01704C9.67389 6 11.017 7.34315 11.017 9V15C11.017 18.3137 8.33074 21 5.01704 21H3.01704Z" />
    </svg>
  );
}
