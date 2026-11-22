import React, { useState } from 'react';
import { CLINIC_INFO } from '../data/dentalData';
import { Phone, MessageSquare, Calendar, Menu, X, Shield, Sparkles, LayoutDashboard } from 'lucide-react';

export default function Navbar({ onNavigateToAdmin, onBookClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: '3D Anatomy', href: '#anatomy' },
    { name: 'Services', href: '#services' },
    { name: 'Before & After', href: '#transformation' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'Location & Map', href: '#booking' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQs', href: '#faqs' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-sky-100 shadow-sm transition-all">
      {/* Top Super-banner for Grand Opening & Night Hours */}
      <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-700 text-white text-[11px] sm:text-xs py-1.5 px-4 font-semibold">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
              NEW OPENING
            </span>
            <span>Inderlok Branch: Flat 30% OFF + Free 3D Oral Scan</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden md:inline-flex items-center gap-1 text-sky-100">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Night Clinic: {CLINIC_INFO.timing}</span>
            </span>
            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="hover:underline font-bold text-white flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-sky-200" />
              <span>{CLINIC_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo (Sky Blue Luxury Motif) */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-600 via-sky-500 to-sky-400 flex items-center justify-center shadow-lg shadow-sky-500/25 group-hover:scale-105 transition-transform">
            {/* Custom Modern Tooth & Sparkle SVG */}
            <svg className="w-6 h-6 text-white" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 12 C34 12 24 24 24 44 C24 64 34 74 40 92 C44 84 47 78 50 78 C53 78 56 84 60 92 C66 74 76 64 76 44 C76 24 66 12 50 12 Z" />
              <circle cx="68" cy="24" r="5" fill="#bae6fd" />
              <polygon points="75,18 77,24 83,26 77,28 75,34 73,28 67,26 73,24" fill="#38bdf8" />
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black text-slate-900 tracking-tight font-display">AuraDent</span>
              <span className="text-xs font-bold text-sky-600 tracking-widest uppercase">Studio</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">Luxury 3D Dental Clinic • Inderlok</p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-700">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-sky-600 transition-colors py-1 relative group"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Admin Panel Toggle Button */}
          <button
            onClick={onNavigateToAdmin}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-sky-700 hover:bg-sky-50 border border-slate-200 transition-all"
            title="Open Clinic Admin & Appointments Dashboard"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-sky-600" />
            <span>Admin Portal</span>
          </button>

          {/* Book Appointment CTA */}
          <a
            href="#booking"
            onClick={onBookClick}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white text-xs font-bold shadow-md shadow-sky-500/20 hover:shadow-sky-500/35 transition-all active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book VIP Slot</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={onNavigateToAdmin}
            className="p-2 rounded-xl bg-sky-50 text-sky-700 text-xs font-semibold flex items-center gap-1"
          >
            <LayoutDashboard className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-sky-100 px-4 py-5 shadow-xl animate-fade-in">
          <div className="flex flex-col space-y-3 text-sm font-semibold text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl hover:bg-sky-50 hover:text-sky-600 transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="#booking"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onBookClick) onBookClick();
                }}
                className="w-full py-3 rounded-xl bg-sky-600 text-white text-center font-bold text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </a>

              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-800 text-center font-bold text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-sky-600" />
                <span>Call Hotline: {CLINIC_INFO.phoneDisplay}</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigateToAdmin();
                }}
                className="w-full py-2.5 rounded-xl border border-sky-200 text-sky-700 text-center font-bold text-xs flex items-center justify-center gap-2 bg-sky-50"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Open Reception Admin Portal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
