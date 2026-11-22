import React, { useState } from 'react';
import { CLINIC_INFO } from '../data/dentalData';
import { MessageSquare, Phone, X, Send, Sparkles, LayoutDashboard } from 'lucide-react';

export default function FloatingWidgets({ onToggleAdmin, isAdminOpen }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const text = chatMessage.trim() || 'Hello AuraDent Studio, I would like to inquire about booking a dental consultation.';
    const url = `https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setChatMessage('');
    setIsChatOpen(false);
  };

  return (
    <>
      {/* Floating Admin Switcher Pill (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={onToggleAdmin}
          className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-bold px-3.5 py-2.5 rounded-2xl border border-sky-400/40 shadow-xl backdrop-blur-md transition-all hover:scale-105"
        >
          <LayoutDashboard className="w-4 h-4 text-sky-400" />
          <span>{isAdminOpen ? 'Close Admin' : 'Admin Panel (Live)'}</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      </div>

      {/* Floating Right Actions (WhatsApp & Emergency Call) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        
        {/* WhatsApp Popup Card */}
        {isChatOpen && (
          <div className="w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden mb-2 animate-fade-in text-slate-800">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 ring-2 ring-emerald-700 absolute bottom-0 right-0" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">AuraDent Clinic Desk</h4>
                  <p className="text-[10px] text-emerald-100">Typically replies in under 2 mins</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white/80 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Chat Message Bubble */}
            <div className="p-4 bg-slate-50 space-y-3 text-xs">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm max-w-[85%] text-slate-700">
                <p>Hello! 👋 Welcome to AuraDent Studio (Inderlok, Delhi).</p>
                <p className="mt-1 font-semibold text-emerald-700">Special Grand Opening 30% discount is currently live!</p>
                <p className="mt-1 text-[11px] text-slate-500">How can we assist you with your smile today?</p>
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="px-4 py-1.5 bg-slate-50 flex flex-wrap gap-1.5">
              {[
                'Book Teeth Whitening',
                'Emergency Toothache',
                'Clear Aligners Cost',
                'Clinic Location Map'
              ].map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const url = `https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent(`Hello, I'm inquiring about: ${prompt}`)}`;
                    window.open(url, '_blank');
                    setIsChatOpen(false);
                  }}
                  className="text-[10px] bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-medium px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendWhatsApp} className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input
                type="text"
                placeholder="Type your question..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Action Buttons Row */}
        <div className="flex items-center gap-3">
          
          {/* Emergency Call Pill */}
          <a
            href={`tel:${CLINIC_INFO.phone}`}
            className="flex items-center gap-2 bg-white text-slate-900 text-xs font-bold px-3.5 py-3 rounded-full border border-sky-200 shadow-xl hover:bg-sky-50 transition-all group"
            title="Emergency Night Call"
          >
            <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center animate-pulse">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <span className="hidden sm:inline text-slate-800 font-semibold">Emergency Call</span>
          </a>

          {/* WhatsApp Floating Trigger */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all relative"
            title="Chat on WhatsApp (+91 7275478585)"
          >
            <MessageSquare className="w-7 h-7" />
            <span className="w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white absolute top-0 right-0 animate-bounce" />
          </button>

        </div>

      </div>
    </>
  );
}
