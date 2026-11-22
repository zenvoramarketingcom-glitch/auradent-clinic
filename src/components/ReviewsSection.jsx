import React from 'react';
import { REVIEWS } from '../data/dentalData';
import { Star, CheckCircle, Quote, MessageSquare } from 'lucide-react';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3 border border-sky-200">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>4.9 / 5.0 Star Rated on Google</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Loved by <span className="sky-gradient-text">Delhi Patients</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Read authentic experiences from patients treated at our Inderlok clinic — from nocturnal toothache relief to smile transformations.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50/80 rounded-3xl p-6 border border-slate-200/80 hover:border-sky-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Verified badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span>Verified Visit</span>
                    </span>
                  )}
                </div>

                {/* Treatment Pill */}
                <span className="inline-block text-[11px] font-bold text-sky-700 bg-sky-100/70 px-2.5 py-1 rounded-lg mb-3">
                  {rev.treatment}
                </span>

                {/* Comment */}
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author footer */}
              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{rev.name}</h4>
                  <span className="text-[11px] text-slate-400">{rev.location}</span>
                </div>
                <span className="text-[10px] text-slate-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Trust Bar */}
        <div className="mt-12 bg-sky-50/60 rounded-2xl p-4 sm:p-6 border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-slate-900 font-black flex items-center justify-center shadow-sm border border-slate-200 text-lg">
              G
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">Google Verified Reviews</span>
                <span className="text-amber-500 font-bold text-xs flex items-center">
                  4.9 ★★★★★
                </span>
              </div>
              <p className="text-xs text-slate-500">Based on 350+ genuine patient ratings across Delhi NCR</p>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Inderlok+Metro+Station+Delhi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-sky-700 hover:text-sky-900 underline"
          >
            Read All Reviews on Google Maps →
          </a>
        </div>

      </div>
    </section>
  );
}
