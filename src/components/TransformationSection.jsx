import React from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';
import { Sparkles, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export default function TransformationSection() {
  return (
    <section id="transformation" className="py-20 bg-gradient-to-b from-white via-sky-50/40 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3 border border-sky-200">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Interactive Real Patient Transformations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Witness the <span className="sky-gradient-text">Radiant Change</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Slide horizontally to see the actual clinical results achieved by our dental surgeons in Delhi. No digital filters, pure dental mastery.
          </p>
        </div>

        {/* The Interactive Slider */}
        <BeforeAfterSlider />

        {/* Clinical Statistics Cards */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto text-center">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-2xl sm:text-3xl font-black text-sky-600">8 Shades</span>
            <span className="block text-xs font-semibold text-slate-700 mt-1">Average Whitening Lift</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600">99.4%</span>
            <span className="block text-xs font-semibold text-slate-700 mt-1">Implant Integration Rate</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-2xl sm:text-3xl font-black text-purple-600">6 Months</span>
            <span className="block text-xs font-semibold text-slate-700 mt-1">Avg. Aligner Completion</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-2xl sm:text-3xl font-black text-sky-600">100%</span>
            <span className="block text-xs font-semibold text-slate-700 mt-1">Painless Protocol</span>
          </div>
        </div>

      </div>
    </section>
  );
}
