'use client';

import React from 'react';
import { REALMS } from '@/data/realmsData';
import { soundEngine } from '@/lib/audio';
import { ArrowRight, Terminal, Compass, Layers, MapPin } from 'lucide-react';

interface RealmHeroCardProps {
  currentRealmIndex: number;
  onNextRealm: () => void;
  onOpenRegister: () => void;
}

export default function RealmHeroCard({
  currentRealmIndex,
  onNextRealm,
  onOpenRegister,
}: RealmHeroCardProps) {
  const activeRealm = REALMS[currentRealmIndex] || REALMS[0];

  return (
    <div className="relative z-30 flex flex-col items-center text-center px-4 max-w-4xl mx-auto pt-24 sm:pt-28 pb-12 pointer-events-auto">
      {/* Top Dimension Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-midnight-950/80 border border-gold-500/40 backdrop-blur-xl shadow-[0_0_20px_rgba(245,158,11,0.25)] mb-4">
        <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
        <span className="text-xs font-mono text-gold-300 uppercase tracking-widest">
          DIMENSION 0{activeRealm.index} • {activeRealm.tagline}
        </span>
        <span className="text-zinc-600">|</span>
        <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          <span>PIT JAUNPUR (OFFLINE)</span>
        </span>
      </div>

      {/* Main Dimension Hero Title */}
      <h1 className="text-4xl sm:text-7xl font-celestial font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400 tracking-wider drop-shadow-2xl">
        {activeRealm.name.toUpperCase()}
      </h1>

      {/* Dimension Subtitle */}
      <p className="mt-2 text-sm sm:text-lg font-light text-zinc-300 tracking-wide max-w-xl">
        {activeRealm.dimensionType}
      </p>

      {/* Quote */}
      <blockquote className="mt-4 text-xs sm:text-sm font-mono italic text-gold-300/90 max-w-2xl px-6 py-2 rounded-2xl bg-midnight-900/60 border border-gold-500/20 backdrop-blur-md">
        “{activeRealm.quote}”
      </blockquote>

      {/* Hacktoberfest Tech Layer Bridge */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-cyan-300">
        <span className="px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>{activeRealm.hacktoberfestTheme}</span>
        </span>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => {
            soundEngine.playClick();
            onOpenRegister();
          }}
          className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-gold-500 to-amber-600 text-midnight-950 font-mono font-bold text-xs tracking-wider uppercase shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:shadow-[0_0_45px_rgba(245,158,11,0.8)] hover:scale-105 transition-all"
        >
          <span>REGISTER FOR IN-PERSON SPRINT</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            onNextRealm();
          }}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-midnight-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 hover:border-gold-400/50 font-mono text-xs uppercase tracking-wider backdrop-blur-md transition-all"
        >
          <Compass className="w-4 h-4 text-gold-400" />
          <span>Next Realm (0{(activeRealm.index % 9) + 1})</span>
        </button>
      </div>
    </div>
  );
}
