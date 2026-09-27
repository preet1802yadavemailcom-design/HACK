'use client';

import React, { useState } from 'react';
import { REALMS } from '@/data/realmsData';
import { soundEngine } from '@/lib/audio';
import { Compass, ChevronRight, Orbit } from 'lucide-react';

interface CelestialNavRingProps {
  currentRealmIndex: number;
  onSelectRealm: (index: number) => void;
}

export default function CelestialNavRing({
  currentRealmIndex,
  onSelectRealm,
}: CelestialNavRingProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const activeRealm = REALMS[currentRealmIndex] || REALMS[0];
  const displayedRealm = hoveredIndex !== null ? REALMS[hoveredIndex] : activeRealm;

  const handleSelect = (idx: number) => {
    soundEngine.playRealmWarp();
    soundEngine.playTempleBell(0.9 + idx * 0.05);
    onSelectRealm(idx);
    setIsExpanded(false);
  };

  const handleHover = (idx: number) => {
    soundEngine.playHover();
    setHoveredIndex(idx);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-auto">
      {/* Holographic Realm Preview Tooltip */}
      <div
        className={`mb-3 px-4 py-2.5 rounded-xl border border-gold-500/40 bg-midnight-950/90 backdrop-blur-xl shadow-[0_0_30px_rgba(245,158,11,0.25)] transition-all duration-300 max-w-sm text-center ${
          hoveredIndex !== null || isExpanded ? 'opacity-100 translate-y-0' : 'opacity-90'
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold-500/20 text-gold-300 uppercase tracking-widest font-bold">
            DIMENSION 0{displayedRealm.index}
          </span>
          <span className="text-xs font-mono text-zinc-400 uppercase">
            {displayedRealm.tagline}
          </span>
        </div>
        <h4 className="text-base font-bold text-white tracking-wide mt-0.5">
          {displayedRealm.name}
        </h4>
        <p className="text-[11px] text-cyan-400 font-mono tracking-tight mt-0.5">
          {displayedRealm.hacktoberfestTheme}
        </p>
      </div>

      {/* Main Celestial Dial Controller */}
      <div className="relative flex items-center gap-2 px-3 py-2 rounded-full border border-gold-500/30 bg-midnight-900/85 backdrop-blur-2xl shadow-[0_0_25px_rgba(6,9,19,0.9)]">
        {/* Toggle Dial / Accessible Menu */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 text-xs font-mono tracking-wider transition-colors"
          title="Toggle Realm Explorer"
          aria-label="Toggle Nine Realms Explorer"
        >
          <Orbit className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
          <span className="hidden sm:inline">REALMS</span>
        </button>

        <div className="h-4 w-[1px] bg-zinc-700/60" />

        {/* 9 Realm Orbital Points */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {REALMS.map((realm, idx) => {
            const isCurrent = idx === currentRealmIndex;

            return (
              <button
                key={realm.id}
                onClick={() => handleSelect(idx)}
                onMouseEnter={() => handleHover(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                aria-label={`Travel to Realm ${idx + 1}: ${realm.name}`}
                className={`relative group flex items-center justify-center transition-all duration-300 ${
                  isCurrent
                    ? 'w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-gold-400 text-midnight-950 font-bold shadow-[0_0_15px_#fbbf24] scale-110'
                    : 'w-7 h-7 rounded-full bg-midnight-800/80 hover:bg-gold-500/30 text-zinc-300 hover:text-gold-200 border border-zinc-700/50 hover:border-gold-400/60'
                }`}
              >
                <span className="text-[11px] font-mono">
                  {idx + 1}
                </span>

                {/* Particle ping ring on active realm */}
                {isCurrent && (
                  <span className="absolute inset-0 rounded-full border border-gold-300 animate-ping opacity-60" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accessible Expanded Realm Drawer */}
      {isExpanded && (
        <div className="absolute bottom-20 w-80 sm:w-96 p-3 rounded-2xl border border-gold-500/30 bg-midnight-950/95 backdrop-blur-2xl shadow-2xl animate-fade-in flex flex-col gap-1 max-h-80 overflow-y-auto">
          <div className="px-2 py-1 text-xs font-mono text-zinc-400 uppercase tracking-widest border-b border-zinc-800 mb-1 flex items-center justify-between">
            <span>The Nine Open Source Realms</span>
            <Compass className="w-3.5 h-3.5 text-gold-400" />
          </div>
          {REALMS.map((r, i) => (
            <button
              key={r.id}
              onClick={() => handleSelect(i)}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                i === currentRealmIndex
                  ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40'
                  : 'hover:bg-zinc-800/60 text-zinc-300 hover:text-white'
              }`}
            >
              <div>
                <div className="text-xs font-bold flex items-center gap-1.5">
                  <span className="text-gold-400 font-mono">0{r.index}.</span>
                  <span>{r.name}</span>
                </div>
                <div className="text-[10px] text-zinc-400 font-mono">{r.hacktoberfestTheme}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
