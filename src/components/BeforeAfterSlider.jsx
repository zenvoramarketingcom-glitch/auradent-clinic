import React, { useState, useRef } from 'react';
import { BEFORE_AFTER_CASES } from '../data/dentalData';
import { Sparkles, ArrowLeftRight, CheckCircle2 } from 'lucide-react';

export default function BeforeAfterSlider() {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const activeCase = BEFORE_AFTER_CASES[selectedCaseIdx];

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="w-full">
      {/* Category selector pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {BEFORE_AFTER_CASES.map((item, idx) => (
          <button
            key={item.category}
            onClick={() => {
              setSelectedCaseIdx(idx);
              setSliderPosition(50);
            }}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              selectedCaseIdx === idx
                ? 'bg-sky-600 text-white shadow-md shadow-sky-500/25 scale-105'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-sky-300 hover:bg-sky-50'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${selectedCaseIdx === idx ? 'text-sky-200' : 'text-sky-500'}`} />
            <span>{item.category}</span>
          </button>
        ))}
      </div>

      {/* Main Comparison Stage */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-4 md:p-6 shadow-xl border border-sky-100">
        <div
          ref={containerRef}
          onMouseMove={(e) => {
            if (isDragging || e.buttons === 1) handleMove(e.clientX);
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-slate-200 bg-slate-100"
        >
          {/* AFTER Image (Full width background) */}
          <img
            src={activeCase.afterImg}
            alt="After treatment result"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 z-10 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>After Result</span>
          </div>

          {/* BEFORE Image (Clipped from left using sliderPosition %) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={activeCase.beforeImg}
              alt="Before treatment"
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                height: '100%'
              }}
            />
            <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
              Before Treatment
            </div>
          </div>

          {/* Vertical Divider Line & Draggable Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-sky-500 shadow-xl flex items-center justify-center text-sky-600">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
          </div>

          {/* Interactive Hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-slate-900/70 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5">
            <ArrowLeftRight className="w-3 h-3 text-sky-400" />
            <span>Slide left / right to compare transformation</span>
          </div>
        </div>

        {/* Case Info bar */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div>
            <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>{activeCase.title}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 font-semibold">
                Verified Patient
              </span>
            </h4>
            <p className="text-sm text-slate-500 mt-1">{activeCase.details}</p>
          </div>
          <div className="text-xs text-slate-500 bg-sky-50/70 p-3 rounded-xl border border-sky-100 md:text-right">
            <span className="block font-semibold text-slate-700">Patient Case:</span>
            <span>{activeCase.patient}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
