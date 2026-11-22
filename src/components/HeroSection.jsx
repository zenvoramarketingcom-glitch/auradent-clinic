import React from 'react';
import Tooth3DCanvas from './Tooth3DCanvas';
import { CLINIC_INFO } from '../data/dentalData';
import {
  Calendar, Phone, MessageSquare, Sparkles, ShieldCheck, 
  Clock, MapPin, ArrowUpRight, Star, Heart
} from 'lucide-react';

export default function HeroSection({ onBookClick }) {
  return (
    <section id="hero" className="relative pt-6 pb-20 lg:py-20 overflow-hidden bg-gradient-to-b from-sky-50/80 via-white to-slate-50">
      
      {/* Background Decorative Mesh Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Hero Copy & Actions (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Grand Opening Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/90 border border-sky-300 text-sky-800 text-xs font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>GRAND OPENING — INDERLOK BRANCH • FLAT 30% OFF</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Next-Gen <span className="sky-gradient-text">3D Dentistry</span> & Exclusive Night Care.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Welcome to <strong>AuraDent Studio</strong> — Delhi's premier luxury dental clinic. From painless single-visit root canals to AI-guided clear aligners and immediate implants.
            </p>

            {/* Highlight Badges (Inderlok Metro + Night Timing) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-sky-100 shadow-sm text-xs font-semibold text-slate-800">
                <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Inderlok Metro (2 min walk)</span>
              </div>

              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-sky-100 shadow-sm text-xs font-semibold text-slate-800">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Night Care: 9:00 PM – 6:00 AM</span>
              </div>

              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-sky-100 shadow-sm text-xs font-semibold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Painless Guarantee</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
              <a
                href="#booking"
                onClick={onBookClick}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 hover:from-sky-500 hover:to-sky-700 text-white font-extrabold text-sm shadow-xl shadow-sky-500/30 hover:shadow-sky-500/45 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Instant Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-sky-50 text-slate-800 font-bold text-sm border border-slate-200 hover:border-sky-300 shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-sky-600" />
                <span>Call: {CLINIC_INFO.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent("Hello AuraDent Studio, I want to book an appointment.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-sm border border-emerald-200 shadow-sm transition-all flex items-center justify-center"
                title="WhatsApp Direct Chat"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>

            {/* Social Proof Strip */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1.5">
                  <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Patient" />
                  <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Patient" />
                  <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" alt="Patient" />
                </div>
                <div className="flex text-amber-400 ml-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-slate-800 ml-1">4.9/5.0</span>
                <span>(350+ Google Reviews)</span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>12,000+ Smiles Transformed in Delhi</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive 3D Tooth Canvas Experience (5 Cols) */}
          <div className="lg:col-span-5 relative" id="anatomy">
            
            {/* 3D Model Stage Card */}
            <div className="bg-gradient-to-b from-white/95 to-sky-50/70 rounded-3xl p-3 sm:p-5 shadow-2xl border border-sky-100 relative overflow-hidden backdrop-blur-xl">
              
              {/* Badge */}
              <div className="flex items-center justify-between pb-3 px-2 border-b border-sky-100/60">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping" />
                  <span className="text-xs font-black uppercase tracking-wider text-sky-900">
                    Live 3D Dental Scanner
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  Interactive View
                </span>
              </div>

              {/* The 3D Three.js Interactive Component */}
              <Tooth3DCanvas />

              {/* Bottom scan indicators */}
              <div className="grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-sky-100/60 text-center">
                <div className="p-2 rounded-xl bg-white/80 border border-sky-100">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Resolution</span>
                  <span className="text-xs font-black text-sky-600">5 Micron 3D</span>
                </div>
                <div className="p-2 rounded-xl bg-white/80 border border-sky-100">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Radiation</span>
                  <span className="text-xs font-black text-emerald-600">Zero Laser</span>
                </div>
                <div className="p-2 rounded-xl bg-white/80 border border-sky-100">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Scan Time</span>
                  <span className="text-xs font-black text-purple-600">60 Seconds</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
