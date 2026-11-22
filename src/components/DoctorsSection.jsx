import React from 'react';
import { DOCTORS } from '../data/dentalData';
import { Sparkles, Star, Award, Calendar, CheckCircle } from 'lucide-react';

export default function DoctorsSection({ onBookWithDoctor }) {
  const handleConsultDoctor = (docName) => {
    if (onBookWithDoctor) {
      onBookWithDoctor(docName);
    }
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="doctors" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3 border border-sky-200">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Master Dental Surgeons & Specialists</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Meet Your <span className="sky-gradient-text">Smile Architects</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Our doctors hold Masters degrees (MDS) from premier institutions with international fellowships in Implantology, Aligners, and Micro-Endodontics.
          </p>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-sky-300 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              {/* Doctor Image with gradient overlay and badge */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                
                {/* Doctor Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-sky-800 shadow-sm border border-sky-200">
                  {doc.badge}
                </div>

                {/* Rating overlay */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-xl text-white text-xs">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-bold">{doc.rating}</span>
                  <span className="text-slate-400 text-[10px]">({doc.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-semibold text-sky-600 mt-0.5">
                    {doc.speciality}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {doc.degrees}
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <Award className="w-4 h-4 text-sky-600 shrink-0" />
                    <span className="font-medium">{doc.experience}</span>
                  </div>
                </div>

                {/* Consult Button */}
                <button
                  onClick={() => handleConsultDoctor(doc.name)}
                  className="mt-5 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-sky-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Consult with {doc.name.split(' ')[1]}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Sterilization & Protocol Strip */}
        <div className="mt-14 p-6 sm:p-8 bg-white rounded-3xl border border-sky-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">German 4-Tier Sterilization</h4>
              <p className="text-xs text-slate-500 mt-1">Class-B autoclaves with 100% biological spore testing verification.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Painless Computerized Numbing</h4>
              <p className="text-xs text-slate-500 mt-1">Single-tooth targeted anesthesia with zero cheek numbness or fear.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Zero-Wait VIP Lounge</h4>
              <p className="text-xs text-slate-500 mt-1">Pre-scheduled slots mean zero lobby waiting time with private treatment suites.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
