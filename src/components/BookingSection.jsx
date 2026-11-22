import React, { useState } from 'react';
import { CLINIC_INFO, SERVICES, DOCTORS } from '../data/dentalData';
import { addBooking } from '../lib/supabaseClient';
import confetti from 'canvas-confetti';
import {
  Calendar, Clock, User, Phone, Mail, MapPin, CheckCircle, 
  Sparkles, ShieldCheck, Download, Share2, AlertCircle, ArrowRight,
  ExternalLink, MessageSquare, Car, Train
} from 'lucide-react';

export default function BookingSection({ preselectedService, onBookingSuccess }) {
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    address: '',
    service: preselectedService || SERVICES[0].title,
    doctor: DOCTORS[0].name,
    date: new Date().toISOString().split('T')[0],
    time: '09:30 PM',
    painLevel: 'Cosmetic Consultation',
    symptoms: '',
    promoCode: 'NEWIND30'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [promoApplied, setPromoApplied] = useState(true);

  // Night-time friendly slots (9:00 PM to 6:00 AM)
  const timeSlots = [
    '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM', 
    '11:00 PM', '11:45 PM', '12:30 AM', '01:30 AM', 
    '03:00 AM', '04:30 AM', '05:15 AM'
  ];

  const painLevels = [
    'Cosmetic Consultation',
    'Routine Cleaning / Checkup',
    'Mild Sensitivity / Ache',
    'Severe Throbbing Pain',
    'Broken Tooth / Emergency'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (serviceTitle) => {
    setFormData((prev) => ({ ...prev, service: serviceTitle }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    setIsSubmitting(true);

    const bookingId = `AUR-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking = {
      id: bookingId,
      patientName: formData.patientName,
      phone: formData.phone.startsWith('+91') ? formData.phone : `+91 ${formData.phone}`,
      email: formData.email || 'patient@auradent.com',
      service: formData.service,
      doctor: formData.doctor,
      date: formData.date,
      time: formData.time,
      address: formData.address || 'Delhi NCR',
      symptoms: `${formData.painLevel}${formData.symptoms ? ' — ' + formData.symptoms : ''}`,
      status: 'Confirmed',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      promoApplied: promoApplied ? 'NEWIND30 (30% OFF Applied)' : 'None'
    };

    // Save to Supabase (with automatic local storage fallback)
    await addBooking(newBooking);

    setIsSubmitting(false);
    setConfirmedBooking(newBooking);

    // Trigger celebration confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#0ea5e9', '#38bdf8', '#0284c7', '#ffffff']
    });

    if (onBookingSuccess) {
      onBookingSuccess(newBooking);
    }
  };

  const handlePrintSlip = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    if (!confirmedBooking) return;
    const msg = `Hello AuraDent Studio, I have booked an appointment!\n\n*Token ID:* ${confirmedBooking.id}\n*Patient:* ${confirmedBooking.patientName}\n*Phone:* ${confirmedBooking.phone}\n*Service:* ${confirmedBooking.service}\n*Doctor:* ${confirmedBooking.doctor}\n*Date & Time:* ${confirmedBooking.date} at ${confirmedBooking.time}\n*Clinic:* AuraDent Studio, Inderlok Near Metro Station, Delhi\n\nPlease confirm my slot. Thank you!`;
    const url = `https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="booking" className="py-20 bg-gradient-to-b from-sky-50/50 via-white to-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm border border-sky-200">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Instant Patient Appointment Booking</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Book Your <span className="sky-gradient-text">VIP Dental Session</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Experience gentle, painless care with our leading dental surgeons. Operating exclusive night & emergency hours (<span className="font-semibold text-sky-700">9:00 PM – 6:00 AM</span>).
          </p>

          {/* Grand Opening Banner */}
          <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-3 bg-gradient-to-r from-sky-600 to-sky-700 text-white p-3 sm:px-6 rounded-2xl shadow-glow-sky text-sm">
            <span className="font-extrabold uppercase tracking-wide bg-white/20 px-2.5 py-0.5 rounded-full text-xs">
              {CLINIC_INFO.openingOffer.badge}
            </span>
            <span>{CLINIC_INFO.openingOffer.discount} + Free 3D Oral Scan (Coupon: <strong>{CLINIC_INFO.openingOffer.code}</strong>)</span>
          </div>
        </div>

        {/* Side-by-side Container: Left = Booking Form, Right = Google Maps & Clinic Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Premium Patient Booking Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-sky-100 relative">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Patient Appointment Form</h3>
                <p className="text-xs text-slate-500">Fill your details below — instant confirmation & WhatsApp token</p>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Painless Guarantee</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Select Dental Concern / Service *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SERVICES.map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => handleServiceChange(s.title)}
                      className={`text-left p-2.5 rounded-xl text-xs font-semibold transition-all border ${
                        formData.service === s.title
                          ? 'border-sky-500 bg-sky-50 text-sky-800 shadow-sm ring-2 ring-sky-400/30'
                          : 'border-slate-200 hover:border-sky-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="block truncate">{s.title}</span>
                      <span className="text-[10px] text-sky-600 block mt-0.5">{s.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Doctor Preference */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  2. Choose Preferred Specialist Doctor
                </label>
                <select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                >
                  {DOCTORS.map((doc) => (
                    <option key={doc.id} value={doc.name}>
                      {doc.name} — {doc.speciality} ({doc.experience})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Night Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sky-600" />
                    <span>3. Appointment Date *</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    <span>4. Night Slot (9 PM - 6 AM) *</span>
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot} {slot.includes('AM') ? '🌙 Late Night/Early Morning' : '✨ Evening'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Patient Personal Details */}
              <div className="space-y-4 pt-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  5. Patient Information
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      name="patientName"
                      placeholder="Patient Full Name *"
                      value={formData.patientName}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="WhatsApp / Phone Number *"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address (Optional)"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Patient Address (Client noted: map beside address input) */}
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      name="address"
                      placeholder="Your Address / Area in Delhi *"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Symptom / Pain Level Chips */}
                <div>
                  <span className="block text-xs font-semibold text-slate-600 mb-2">
                    Primary Symptom / Consultation Type:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {painLevels.map((lvl) => (
                      <button
                        type="button"
                        key={lvl}
                        onClick={() => setFormData((prev) => ({ ...prev, painLevel: lvl }))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          formData.painLevel === lvl
                            ? 'bg-sky-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Note */}
                <textarea
                  name="symptoms"
                  rows="2"
                  placeholder="Any specific dental concerns, allergies, or previous treatments? (Optional)"
                  value={formData.symptoms}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                />
              </div>

              {/* Promo Code & Discount Check */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-sky-50 border border-sky-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-600" />
                  <div>
                    <span className="text-xs font-bold text-sky-900 block">Promo Code Applied: NEWIND30</span>
                    <span className="text-[11px] text-sky-700">30% Flat Grand Opening Discount + Free 3D Scan</span>
                  </div>
                </div>
                <span className="text-xs font-black text-emerald-600 bg-white px-2.5 py-1 rounded-md shadow-sm border border-emerald-100">
                  SAVINGS: ₹1,500+
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 hover:from-sky-500 hover:to-sky-700 text-white font-bold text-base shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Booking Your VIP Appointment...</span>
                  </div>
                ) : (
                  <>
                    <span>Confirm Appointment & Generate Pass</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-6 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> No Advance Payment Needed
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-sky-500" /> Free Rescheduling Anytime
                </span>
              </div>
            </form>
          </div>

          {/* RIGHT: Live Google Maps Embed & Location Info (5 Cols) */}
          {/* As explicitly requested: "Google Maps add krna hai client ne kaha hai form bharne ke side me rhna chahiye jb vo apna addres bhare" */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Interactive Google Maps Box */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-sky-100 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Clinic Location & Live Map</h4>
                    <p className="text-xs text-slate-500">Opposite Inderlok Metro Station, Delhi</p>
                  </div>
                </div>
                <a
                  href={CLINIC_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-800 bg-sky-50 px-2.5 py-1.5 rounded-lg border border-sky-200 transition-colors"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Embedded Google Maps Iframe */}
              <div className="relative w-full h-[280px] sm:h-[320px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                <iframe
                  title="AuraDent Studio Inderlok Metro Location Map"
                  src={CLINIC_INFO.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                {/* Floating Map Marker Overlay Badge */}
                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-xl border border-sky-400/40 shadow-lg flex items-center gap-1.5 pointer-events-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
                  <span className="font-semibold text-sky-300">AuraDent Studio</span>
                </div>
              </div>

              {/* Metro & Commute Guide */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-sky-50/70 p-2.5 rounded-xl border border-sky-100 flex items-start gap-2">
                  <Train className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">Metro Access</span>
                    <span className="text-slate-500 text-[11px]">2 Min Walk from Inderlok Metro (Red/Green line)</span>
                  </div>
                </div>
                <div className="bg-sky-50/70 p-2.5 rounded-xl border border-sky-100 flex items-start gap-2">
                  <Car className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">Free Valet</span>
                    <span className="text-slate-500 text-[11px]">Dedicated patient parking at Pillar 148</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Clinic Contact Details & Night Timing Card */}
            <div className="bg-gradient-to-br from-slate-900 via-navy-900 to-sky-950 text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-sky-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-400/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>NIGHT & EMERGENCY CLINIC</span>
                </span>
              </div>

              <h4 className="text-xl font-bold text-white mb-2">AuraDent Studio — Inderlok</h4>
              <p className="text-xs text-sky-200/80 mb-6 leading-relaxed">
                {CLINIC_INFO.address}
              </p>

              {/* Hours Box */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 mb-6">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-400">Operating Schedule:</span>
                  <span className="font-bold text-sky-400">Open Tonight</span>
                </div>
                <div className="text-lg font-black text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-sky-400" />
                  <span>{CLINIC_INFO.timing}</span>
                </div>
                <span className="text-[11px] text-slate-300 block mt-1">
                  Monday to Saturday: 9:00 PM to 6:00 AM (Night Clinic)
                </span>
              </div>

              {/* Quick Contact Buttons */}
              <div className="space-y-2.5">
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition-all flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Call Clinic Hotline:</span>
                  </span>
                  <span className="font-mono text-sky-300">{CLINIC_INFO.phoneDisplay}</span>
                </a>

                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent("Hello AuraDent Studio, I want to book a dental consultation.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-between shadow-md"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </span>
                  <span className="font-mono">{CLINIC_INFO.phoneDisplay}</span>
                </a>

                <a
                  href={`mailto:${CLINIC_INFO.email}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-all flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-sky-400" />
                    <span>Official Email:</span>
                  </span>
                  <span className="text-slate-300">{CLINIC_INFO.email}</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* CONFIRMATION / DIGITAL APPOINTMENT PASS MODAL */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-sky-100 relative">
            
            {/* Header with success badge */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4 shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                Token: {confirmedBooking.id}
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">Appointment Confirmed!</h3>
              <p className="text-xs text-slate-500 mt-1">
                Your VIP slot has been successfully registered at AuraDent Inderlok.
              </p>
            </div>

            {/* Printable Pass Ticket Card */}
            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-sky-50 to-slate-50 border border-sky-100 text-slate-800 text-xs space-y-3">
              <div className="flex justify-between pb-2 border-b border-sky-200/60">
                <span className="text-slate-500">Patient:</span>
                <span className="font-bold text-slate-900 text-sm">{confirmedBooking.patientName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-sky-200/60">
                <span className="text-slate-500">Treatment:</span>
                <span className="font-semibold text-sky-700">{confirmedBooking.service}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-sky-200/60">
                <span className="text-slate-500">Doctor:</span>
                <span className="font-semibold text-slate-800">{confirmedBooking.doctor}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-sky-200/60">
                <span className="text-slate-500">Scheduled:</span>
                <span className="font-bold text-slate-900">{confirmedBooking.date} at {confirmedBooking.time}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-sky-200/60">
                <span className="text-slate-500">Clinic:</span>
                <span className="font-medium text-slate-700 text-right">{CLINIC_INFO.shortAddress}</span>
              </div>
              <div className="flex justify-between items-center pt-1 text-emerald-600 font-bold">
                <span>Offer Benefit:</span>
                <span>30% Grand Opening Discount + Free 3D Scan</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={handleWhatsAppShare}
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <Share2 className="w-4 h-4" />
                <span>Send to WhatsApp</span>
              </button>

              <button
                onClick={handlePrintSlip}
                className="py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Print Pass / PDF</span>
              </button>
            </div>

            <button
              onClick={() => setConfirmedBooking(null)}
              className="w-full mt-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 text-center"
            >
              Done & Close
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
