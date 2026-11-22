import React, { useState } from 'react';
import { SERVICES } from '../data/dentalData';
import {
  Sparkles, ShieldCheck, Clock, CheckCircle2, ArrowRight,
  Zap, Sun, Gem, HeartHandshake, Activity, Info, X, Calendar
} from 'lucide-react';

export default function ServicesSection({ onSelectService }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [detailModalService, setDetailModalService] = useState(null);

  const categories = ['All', 'Cosmetics', 'Restorative', 'Orthodontics', 'Emergency', 'Preventive', 'Kids Care'];

  const filtered = activeCategory === 'All'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Sun': return <Sun className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Gem': return <Gem className="w-5 h-5" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5" />;
      case 'Activity': return <Activity className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const handleBookService = (service) => {
    if (onSelectService) {
      onSelectService(service.title);
    }
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3 border border-sky-200">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Complete Dental Clinic Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Specialized Care for <span className="sky-gradient-text">Every Smile</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            From pain-free root canals and crystal aligners to full-mouth dental implants. Everything under one roof with German precision technology.
          </p>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-500/25 scale-105'
                    : 'bg-slate-50 text-slate-700 hover:bg-sky-50 hover:text-sky-700 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-sky-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative"
            >
              {service.popular && (
                <div className="absolute -top-3 right-5 bg-gradient-to-r from-sky-600 to-sky-500 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  Most Requested
                </div>
              )}

              <div>
                {/* Icon & Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors shadow-sm">
                    {renderIcon(service.icon)}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                    {service.category}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Key feature bullets */}
                <ul className="mt-4 space-y-1.5 text-[11px] text-slate-600">
                  {service.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Price & Booking CTA */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Starts From</span>
                    <span className="text-base font-black text-slate-900">{service.price}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Duration</span>
                    <span className="font-semibold text-sky-700">{service.time}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDetailModalService(service)}
                    className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-700 text-xs font-semibold border border-slate-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>

                  <button
                    onClick={() => handleBookService(service)}
                    className="py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-sm hover:shadow"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Emergency Night Service Callout Box */}
        <div className="mt-14 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-sky-400/20">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              <span>Severe Toothache Tonight?</span>
            </span>
            <h3 className="text-2xl font-black">24/7 Night Emergency Dental Protocol</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Don't endure pain through the night. Our Inderlok clinic operates from <strong>9:00 PM to 6:00 AM</strong> with on-call endodontists and dental trauma surgeons.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <a
              href="tel:+917275478585"
              className="py-3.5 px-6 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm text-center shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Emergency Call: +91 72754 78585</span>
            </a>
            <a
              href="#booking"
              className="py-3.5 px-5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm text-center border border-white/20 transition-all"
            >
              <span>Book Night Slot</span>
            </a>
          </div>
        </div>

      </div>

      {/* SERVICE DETAILS MODAL */}
      {detailModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-sky-100 relative">
            <div className="flex justify-between items-start pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-50 px-2.5 py-0.5 rounded-full">
                  {detailModalService.category}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{detailModalService.title}</h3>
              </div>
              <button
                onClick={() => setDetailModalService(null)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs text-slate-600 leading-relaxed">
              <p>{detailModalService.longDesc}</p>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                  What is included in this treatment:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {detailModalService.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="font-medium text-slate-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-sky-50 rounded-2xl border border-sky-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Cost</span>
                  <span className="text-lg font-black text-slate-900">{detailModalService.price}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Procedure Time</span>
                  <span className="text-sm font-bold text-sky-700">{detailModalService.time}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  const s = detailModalService;
                  setDetailModalService(null);
                  handleBookService(s);
                }}
                className="flex-1 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Treatment</span>
              </button>
              <button
                onClick={() => setDetailModalService(null)}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
