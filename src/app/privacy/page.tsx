import React from "react";
import Link from "next/link";
import { Shield, Lock, Eye, FileText, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | M L Hospital",
  description: "Privacy Policy and data protection practices for M L Hospital Nagercoil.",
};

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-teal mb-8 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </Link>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-brand-teal/10 rounded-2xl flex items-center justify-center text-brand-teal">
              <Shield size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
              <p className="text-slate-500">Last Updated: May 6, 2026</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Eye size={20} className="text-brand-teal" />
                1. Introduction
              </h2>
              <p>
                At M L Hospital, we are committed to protecting your personal and medical information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website, use our automated WhatsApp services, or visit our facility in Nagercoil.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText size={20} className="text-brand-teal" />
                2. Information We Collect
              </h2>
              <p>We may collect information in several ways:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Personal Details:</strong> Name, age, gender, and contact information (phone number, email).</li>
                <li><strong>Medical Information:</strong> Symptoms, current diagnosis, and medical history provided during consultation requests or through our Second Opinion service.</li>
                <li><strong>WhatsApp Data:</strong> Messages sent to our official WhatsApp Business account for appointment scheduling or medical inquiries.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Lock size={20} className="text-brand-teal" />
                3. How We Use Your Information
              </h2>
              <p>Your information is used strictly for medical and administrative purposes, including:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Providing medical consultations and second opinions.</li>
                <li>Managing appointments and hospital visits.</li>
                <li>Communicating via WhatsApp for urgent updates or health reports.</li>
                <li>Internal record keeping in compliance with medical regulations in India.</li>
              </ul>
            </section>

            <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-4">WhatsApp Communication Disclosure</h2>
              <p className="text-sm">
                By opting into our WhatsApp services, you acknowledge that while WhatsApp uses end-to-end encryption, the information shared is stored in our hospital management system to facilitate your care. We do not sell or share your WhatsApp contact details with third-party marketing agencies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Shield size={20} className="text-brand-teal" />
                4. Data Security
              </h2>
              <p>
                We implement robust security measures to prevent unauthorized access, disclosure, or modification of your data. Access to medical records is restricted to authorized medical personnel and administrative staff directly involved in your care.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or your data, please contact our privacy officer:
              </p>
              <div className="mt-4 p-6 bg-brand-teal/5 rounded-2xl border border-brand-teal/10">
                <p className="font-bold text-slate-900">M L Hospital</p>
                <p className="text-sm text-slate-600">P.W.D Road, Nagercoil, Tamil Nadu 629001</p>
                <p className="text-sm text-slate-600">Email: info@mlhospital.com</p>
                <p className="text-sm text-slate-600">Phone: +91 88855 53193</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
