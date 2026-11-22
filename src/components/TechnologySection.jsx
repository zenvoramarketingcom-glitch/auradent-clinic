import React from 'react';
import { Sparkles, Scan, Zap, ShieldCheck, Microscope, Cpu, CheckCircle } from 'lucide-react';

export default function TechnologySection() {
  const techList = [
    {
      icon: Scan,
      title: '3D Intra-Oral Digital Scanner',
      subtitle: 'No More Gagging with Putty',
      desc: 'Takes 6,000 optical photos per second to reconstruct your complete dental anatomy in real-time 3D color. High precision bite matching within 5 microns.',
      badge: 'German Optics'
    },
    {
      icon: Zap,
      title: 'Waterlase® Dental Hard-Tissue Laser',
      subtitle: 'Drill-Free & Needle-Free Cavity Removal',
      desc: 'Harnesses energized water droplets to excise decay without mechanical friction, heat, or distressing drill sounds. Most patients require zero injections.',
      badge: 'Painless Care'
    },
    {
      icon: Microscope,
      title: 'Carl Zeiss Surgical Dental Microscope',
      subtitle: '30X High-Definition Magnification',
      desc: 'Visualizes micro-cracks and hidden extra root canals that standard X-rays miss. Guarantees 99.8% single-sitting RCT success rate.',
      badge: 'Micro-Endodontics'
    },
    {
      icon: Cpu,
      title: 'AI 3D Smile Simulator & Aligner Planning',
      subtitle: 'Preview Your Dream Smile in 5 Minutes',
      desc: 'Algorithms calculate precise orthodontic tooth movements and generate a custom 3D video of your entire smile transformation before treatment begins.',
      badge: 'AI Biomechanics'
    }
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background soft ambient glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider mb-3 border border-sky-400/30">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Futuristic Clinical Equipment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            High-Tech Dentistry, <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-200">Zero Anxiety</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            We replaced outdated noisy dental drills and messy impression trays with ultra-gentle lasers, 3D digital scanners, and AI diagnostics.
          </p>
        </div>

        {/* Tech Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-950/70 p-6 sm:p-8 rounded-3xl border border-sky-900/40 hover:border-sky-500/50 shadow-xl transition-all duration-300 group hover:-translate-y-1 relative"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-sky-500/15 text-sky-400 flex items-center justify-center border border-sky-500/30 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-300 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/30">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-sky-400/90 mt-1">
                  {item.subtitle}
                </p>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Sterilization Protocol Bar */}
        <div className="mt-12 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Class-B 6-Stage Hospital Sterilization Suite</h4>
              <p className="text-xs text-slate-400">100% individual sealed pouch packaging opened directly in front of the patient.</p>
            </div>
          </div>
          <a
            href="#booking"
            className="shrink-0 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors shadow-md"
          >
            Experience Modern Care
          </a>
        </div>

      </div>
    </section>
  );
}
