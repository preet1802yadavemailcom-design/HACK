'use client';

import React from 'react';
import { soundEngine } from '@/lib/audio';
import { ArrowRight, Sparkles, Orbit, Award } from 'lucide-react';

interface FinalExperienceProps {
  onOpenRegister: () => void;
}

export default function FinalExperience({ onOpenRegister }: FinalExperienceProps) {
  return (
    <section className="relative w-full py-24 px-4 max-w-4xl mx-auto text-center z-30 pointer-events-auto">
      {/* Sacred Convergence Aura */}
      <div className="relative inline-flex items-center justify-center mb-8">
        <div className="absolute w-48 h-48 rounded-full bg-gold-500/20 blur-3xl animate-pulse" />
        <div className="relative p-4 rounded-3xl bg-midnight-950/80 border border-gold-500/50 shadow-[0_0_40px_rgba(245,158,11,0.4)]">
          <Orbit className="w-12 h-12 text-gold-400 animate-spin-slow" />
        </div>
      </div>

      {/* The 3 Pillars */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-6 font-mono text-xl sm:text-3xl font-black tracking-widest text-zinc-300">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-gold-300 text-gold-glow">
          BUILD.
        </span>
        <span className="text-zinc-600">•</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300 text-cyan-glow">
          COLLABORATE.
        </span>
        <span className="text-zinc-600">•</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
          CONTRIBUTE.
        </span>
      </div>

      <div className="h-[1px] w-32 mx-auto bg-gradient-to-r from-transparent via-gold-500 to-transparent my-6" />

      {/* Event Destination Stamp */}
      <h2 className="text-3xl sm:text-6xl font-celestial font-bold text-white tracking-wider">
        HACKTOBERFEST HACK DAY
      </h2>
      <p className="mt-2 text-base sm:text-xl font-mono uppercase tracking-[0.25em] text-gold-400 font-semibold">
        JAUNPUR · 24 OCTOBER 2026
      </p>
      <p className="mt-1 text-xs sm:text-sm font-mono text-zinc-400">
        Prasad Institute of Technology, Jaunpur
      </p>

      {/* Final Climax CTA */}
      <div className="mt-10 flex flex-col items-center">
        <button
          onClick={() => {
            soundEngine.playRealmWarp();
            soundEngine.playTempleBell(1.3);
            onOpenRegister();
          }}
          className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-amber-500 via-gold-500 to-amber-600 text-midnight-950 font-mono font-extrabold text-sm sm:text-base uppercase tracking-widest shadow-[0_0_40px_rgba(245,158,11,0.6)] hover:shadow-[0_0_60px_rgba(245,158,11,0.9)] hover:scale-105 active:scale-95 transition-all"
        >
          <span>ENTER THE HACK DAY</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
        </button>

        <span className="mt-4 text-xs font-mono text-zinc-500 tracking-wider">
          LIMITED ATTENDEE CAPACITY • FREE ADMISSION FOR REGISTERED STUDENTS
        </span>
      </div>
    </section>
  );
}
