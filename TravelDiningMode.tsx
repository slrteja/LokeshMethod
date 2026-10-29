'use client';

import React, { useState } from 'react';
import { Plane, Home, UtensilsCrossed, AlertCircle, ArrowRightLeft, ShieldCheck } from 'lucide-react';

interface MacroProfile {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  bufferNote: string;
}

const HOME_MACROS: MacroProfile = {
  calories: 2350,
  protein: 210,
  carbs: 210,
  fats: 70,
  bufferNote: 'Precision Kitchen Prep • Measured cooked weights',
};

const TRAVEL_MACROS: MacroProfile = {
  calories: 2200, // 150 cal buffer for restaurant cooking fats/oils
  protein: 215, // Raised slightly for satiety & lean mass preservation
  carbs: 160, // Lowered to account for hidden carbs in dressings/sauces
  fats: 78,  // Adjusted for inevitable olive oil / pan-frying buffer
  bufferNote: '150 kcal Hidden Fat/Oil Buffer active • High Satiety Protocol',
};

const DINING_RULES = [
  'Request all sauces & compound dressings strictly on the side.',
  'Order double lean protein (filet mignon, chicken paillard, sea bass).',
  'Swap starches for double grilled greens or steamed asparagus.',
  'Pacing protocol: sparkling water with citrus between bites.',
];

export default function TravelDiningMode() {
  const [isDiningOut, setIsDiningOut] = useState(false);
  const macros = isDiningOut ? TRAVEL_MACROS : HOME_MACROS;

  return (
    <div className="w-full bg-[#171A1D] border border-[#272B30] rounded-2xl p-6 lg:p-8 shadow-2xl relative overflow-hidden transition-all duration-500">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#24282D]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-medium tracking-[0.2em] text-[#D4AF37] uppercase">
              Adaptive Protocol
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60" />
          </div>
          <h2 className="text-xl font-light tracking-wide text-zinc-100">
            1-Tap Travel & Dining Engine
          </h2>
          <p className="text-xs text-zinc-400 font-light mt-0.5">
            Auto-recalibrate targets for restaurant preparation, hidden oils, and social dining.
          </p>
        </div>

        {/* Quiet Luxury Switch */}
        <div className="flex items-center self-start sm:self-auto bg-[#101214] p-1.5 rounded-full border border-[#262A2F]">
          <button
            type="button"
            onClick={() => setIsDiningOut(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
              !isDiningOut
                ? 'bg-[#22262B] text-[#D4AF37] shadow-lg border border-[#D4AF37]/20'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Kitchen Prep
          </button>
          <button
            type="button"
            onClick={() => setIsDiningOut(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
              isDiningOut
                ? 'bg-[#22262B] text-[#D4AF37] shadow-lg border border-[#D4AF37]/20'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            Travel / Dining
          </button>
        </div>
      </div>

      {/* Target Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
        {[
          { label: 'Energy Target', val: macros.calories, unit: 'kcal' },
          { label: 'Protein Target', val: macros.protein, unit: 'g' },
          { label: 'Carbohydrates', val: macros.carbs, unit: 'g' },
          { label: 'Dietary Fats', val: macros.fats, unit: 'g' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-[#121416]/80 border border-[#23272C] flex flex-col justify-between"
          >
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium">
              {item.label}
            </span>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-2xl font-light tracking-tight text-zinc-100">
                {item.val}
              </span>
              <span className="text-xs text-[#D4AF37]/80 font-mono uppercase">{item.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Context Banner */}
      <div className="bg-[#101214] border border-[#22262B] rounded-xl p-4 flex items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 shrink-0">
            {isDiningOut ? <UtensilsCrossed className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
          </div>
          <div>
            <div className="text-xs font-medium text-zinc-200">
              {isDiningOut ? 'Dining Out Protocol Engaged' : 'Home Precision Tracking Engaged'}
            </div>
            <p className="text-[11px] text-zinc-400 font-light mt-0.5">{macros.bufferNote}</p>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-1.5 text-[10px] tracking-wider text-[#D4AF37] uppercase font-mono">
          <ArrowRightLeft className="w-3 h-3" />
          Realtime Sync
        </div>
      </div>

      {/* Executive Dining Out Guardrails */}
      {isDiningOut && (
        <div className="mt-6 pt-5 border-t border-[#23272C] animate-fadeIn">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
            <h4 className="text-xs font-medium tracking-wider text-zinc-300 uppercase">
              Sommelier & Culinary Protocol Rules
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {DINING_RULES.map((rule, idx) => (
              <div
                key={idx}
                className="text-xs text-zinc-400 font-light bg-[#121416]/50 p-2.5 rounded-lg border border-[#22262B]/80 flex items-start gap-2"
              >
                <span className="text-[#D4AF37] font-mono text-[10px] mt-0.5">0{idx + 1}</span>
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}