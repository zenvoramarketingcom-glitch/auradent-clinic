import React from 'react';
import { CLINIC_INFO, SERVICES } from '../data/dentalData';
import {
  Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck,
  Instagram, Facebook, Twitter, Youtube, Linkedin, ArrowUp
} from 'lucide-react';

export default function Footer({ onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 font-sans pt-16 pb-12 border-t border-sky-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Philosophy (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center text-white shadow-md">
                <svg className="w-6 h-6" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 12 C34 12 24 24 24 44 C24 64 34 74 40 92 C44 84 47 78 50 78 C53 78 56 84 60 92 C66 74 76 64 76 44 C76 24 66 12 50 12 Z" />
                  <circle cx="68" cy="24" r="5" fill="#bae6fd" />
                  <polygon points="75,18 77,24 83,26 77,28 75,34 73,28 67,26 73,24" fill="#38bdf8" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight font-display">AuraDent Studio</span>
                <span className="text-[10px] text-sky-400 block tracking-widest uppercase font-semibold">Luxury 3D Dental Clinic</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              State-of-the-art painless dentistry, AI clear aligners, laser tooth whitening, and dental implants. Proudly serving patients across Delhi NCR with specialized night clinic hours.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 text-xs font-semibold border border-emerald-800/60">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ISO 9001:2015 Sterilization Certified</span>
              </span>
            </div>
          </div>

          {/* Col 2: Services Quick Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Specialized Treatments
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <a href="#services" className="hover:text-sky-400 transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Contact Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Clinic Contact & Hours
            </h4>

            <div className="space-y-2.5 text-xs text-slate-400">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-200">Inderlok Near Metro Station:</span>
                  <p className="text-[11px] text-slate-400">{CLINIC_INFO.address}</p>
                </div>
              </div>

              {/* Timing */}
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-200">Clinic Working Hours:</span>
                  <p className="text-[11px] text-sky-300 font-medium">Monday to Saturday: 9:00 PM to 6:00 AM (Night Clinic)</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-slate-200">Phone: </span>
                  <a href={`tel:${CLINIC_INFO.phone}`} className="font-mono text-white hover:text-sky-400">
                    {CLINIC_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-slate-200">WhatsApp: </span>
                  <a
                    href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent("Hello AuraDent Studio")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-emerald-400 hover:underline"
                  >
                    {CLINIC_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <div>
                  <span className="text-slate-200">Email: </span>
                  <a href={`mailto:${CLINIC_INFO.email}`} className="text-white hover:text-sky-400">
                    {CLINIC_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip: Social Media Links (Small as requested) + Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          <div>
            <span>© {new Date().getFullYear()} AuraDent Studio Clinic. All rights reserved.</span>
          </div>

          {/* Social media icons - small & elegant */}
          {/* As explicitly requested: "social media link niche footer me rhega chhote chhote me" */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 mr-1">Follow Us:</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-sky-600 hover:text-white text-slate-400 flex items-center justify-center transition-colors border border-slate-800"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-sky-600 hover:text-white text-slate-400 flex items-center justify-center transition-colors border border-slate-800"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-sky-600 hover:text-white text-slate-400 flex items-center justify-center transition-colors border border-slate-800"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-sky-600 hover:text-white text-slate-400 flex items-center justify-center transition-colors border border-slate-800"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-sky-600 hover:text-white text-slate-400 flex items-center justify-center transition-colors border border-slate-800"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Admin shortcut & back to top */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-sky-400 text-[11px] underline"
            >
              Reception Admin Access
            </button>
            <button
              onClick={scrollToTop}
              className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 flex items-center justify-center border border-slate-800 transition-colors"
              title="Scroll to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
