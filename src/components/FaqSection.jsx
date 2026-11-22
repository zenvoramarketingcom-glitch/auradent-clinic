import React, { useState } from 'react';
import { FAQS, CLINIC_INFO } from '../data/dentalData';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faqs" className="py-20 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3 border border-sky-200">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked <span className="sky-gradient-text">Questions</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Everything you need to know about our treatments, Inderlok location, and night hours.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-sky-600 transition-colors text-sm sm:text-base"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-sky-600 shrink-0 transition-transform duration-300 ${
                    openIdx === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIdx === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions bar */}
        <div className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-sky-600 to-sky-700 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div>
            <h4 className="font-bold text-base">Still have questions regarding your toothache?</h4>
            <p className="text-xs text-sky-100 mt-1">Speak directly with our senior dental consultant right now.</p>
          </div>
          <a
            href={`tel:${CLINIC_INFO.phone}`}
            className="px-5 py-3 rounded-xl bg-white text-sky-800 font-bold text-xs hover:bg-sky-50 shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            <Phone className="w-4 h-4 text-sky-600" />
            <span>Call: {CLINIC_INFO.phoneDisplay}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
