import React from "react";
import Link from "next/link";
import { Scale, Info, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service | M L Hospital",
  description: "Terms and conditions for using M L Hospital services and website.",
};

const TermsOfService = () => {
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
              <Scale size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
              <p className="text-slate-500">Last Updated: May 6, 2026</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Info size={20} className="text-brand-teal" />
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing this website or using our WhatsApp automated services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our digital services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <AlertCircle size={20} className="text-brand-teal" />
                2. Medical Disclaimer (Critical)
              </h2>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-2xl">
                <p className="text-amber-900 font-bold mb-2 uppercase tracking-wide text-xs">Emergency Warning</p>
                <p className="text-amber-800 text-sm">
                  Our website and WhatsApp automated chat are <strong>NOT for emergency use</strong>. If you are experiencing a life-threatening medical emergency, please visit our trauma center immediately or call our emergency line at +91 88855 53193.
                </p>
              </div>
              <p className="mt-4">
                The information provided on this website and via WhatsApp is for informational purposes only and does not constitute a professional medical diagnosis or treatment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle size={20} className="text-brand-teal" />
                3. WhatsApp Automation Usage
              </h2>
              <p>Our WhatsApp service allows you to request second opinions and book appointments. By using this service:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>You agree to receive automated messages from M L Hospital.</li>
                <li>You confirm that the information you provide is accurate and pertains to the patient in question.</li>
                <li>You understand that response times may vary depending on doctor availability.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">4. User Responsibilities</h2>
              <p>Users are responsible for:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Providing accurate contact information.</li>
                <li>Safeguarding their own devices to ensure the privacy of their medical chats.</li>
                <li>Ensuring they have the right to share medical documents if uploaded via WhatsApp.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">5. Limitation of Liability</h2>
              <p>
                M L Hospital shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our digital services, or for any unauthorized access to your transmissions or data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">6. Governing Law</h2>
              <p>
                These terms are governed by the laws of India. Any disputes arising from the use of our services shall be subject to the exclusive jurisdiction of the courts in Nagercoil, Tamil Nadu.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
