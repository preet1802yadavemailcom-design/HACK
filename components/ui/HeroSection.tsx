'use client';

import React from 'react';
import { soundEngine } from '@/lib/audio';
import {
  Calendar, Clock, MapPin, ArrowRight, Sparkles, Terminal, Flame, Zap,
  ShieldCheck, Trophy, Crown, Award, ChevronRight, Star, Gift, CheckCircle2
} from 'lucide-react';

interface HeroSectionProps {
  onOpenRegister: () => void;
}

export default function HeroSection({ onOpenRegister }: HeroSectionProps) {
  const triggerCeremonyClick = () => {
    soundEngine.playCeremonyFanfare();
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center items-center text-center px-4 pt-28 pb-16 max-w-5xl mx-auto z-20 pointer-events-auto">
      {/* Dynamic Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] bg-gradient-to-r from-amber-500/25 via-yellow-400/20 to-emerald-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      {/* Official Prasad Institute of Technology Jaunpur Logo Badge */}
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-black/85 border border-amber-400/40 backdrop-blur-xl shadow-[0_0_30px_rgba(245,158,11,0.25)] mb-4 hover:border-amber-400 transition-all group">
        <div className="w-10 h-10 rounded-full bg-white p-0.5 border border-amber-400 shadow-md flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
          <img
            src="/pit-logo.png"
            alt="Prasad Institute of Technology Logo"
            className="w-full h-full object-contain rounded-full"
          />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
            Department of Computer Science &amp; Engineering
          </span>
          <span className="text-xs sm:text-sm font-sans font-bold text-white tracking-wide">
            Prasad Institute of Technology, Jaunpur
          </span>
        </div>
      </div>

      {/* Offline Status & Ceremony Milestone Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 backdrop-blur-xl shadow-[0_0_25px_rgba(245,158,11,0.35)] text-xs font-mono font-bold uppercase tracking-wider animate-pulse">
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span>ARE YOU READY? • GRAND FINALE</span>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 border border-emerald-500/50 backdrop-blur-xl shadow-[0_0_25px_rgba(16,185,129,0.3)] text-xs font-mono font-bold text-emerald-400 tracking-wider uppercase">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span>LIVE AT PIT AUDITORIUM</span>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/15 border border-red-500/40 text-red-300 backdrop-blur-xl shadow-[0_0_20px_rgba(239,68,68,0.25)] text-xs font-mono font-bold uppercase tracking-wider">
          <Trophy className="w-3.5 h-3.5 text-red-400" />
          <span>125+ BUILDERS EVALUATED</span>
        </div>
      </div>

      {/* Main Title with Radiant Gradient & Glow */}
      <h1 className="text-3xl sm:text-6xl md:text-7xl font-sans font-black tracking-tight text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.25)] break-words">
        ARE YOU READY FOR THE <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 drop-shadow-[0_0_50px_rgba(245,158,11,0.65)]">
          GRAND AWARD CEREMONY?
        </span>
      </h1>

      {/* Subtitle */}
      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-200/90 font-mono text-sm sm:text-lg font-bold tracking-wide">
        <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
        <span>HACKTOBERFEST HACK DAY JAUNPUR 2026</span>
      </div>

      <p className="mt-4 text-sm sm:text-base md:text-lg text-zinc-300 max-w-3xl mx-auto font-light leading-relaxed">
        The code is submitted, the evaluation jury has finalized the scores, and 125+ builders pushed their limits. Join us in the <span className="text-amber-400 font-bold">PIT Main Campus Auditorium</span> as we celebrate the winners, award the championship trophies, and unveil the champions of Hack Day Jaunpur 2026!
      </p>

      {/* STAGE SPOTLIGHT CARD (Royal trophy & awards showcase) */}
      <div className="mt-8 w-full max-w-2xl mx-auto p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-neutral-900/95 via-black to-neutral-950/95 border-2 border-amber-500/40 backdrop-blur-2xl shadow-[0_0_60px_rgba(245,158,11,0.25)]">
        <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold mb-4 flex items-center justify-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>OFFICIAL TROPHY &amp; FELICITATION PODIUM</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-center">
          {/* Trophy 1 */}
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex flex-col items-center">
            <span className="text-2xl sm:text-3xl">🥇</span>
            <span className="text-xs sm:text-sm font-bold text-amber-300 font-mono mt-1">GRAND CHAMPION</span>
            <span className="text-[9px] font-mono text-zinc-400 uppercase">GOLD CUP &amp; MLH KIT</span>
          </div>

          {/* Trophy 2 */}
          <div className="p-3 rounded-2xl bg-slate-500/10 border border-slate-400/30 flex flex-col items-center">
            <span className="text-2xl sm:text-3xl">🥈</span>
            <span className="text-xs sm:text-sm font-bold text-slate-300 font-mono mt-1">1ST RUNNER-UP</span>
            <span className="text-[9px] font-mono text-zinc-400 uppercase">SILVER CUP &amp; SWAG</span>
          </div>

          {/* Trophy 3 */}
          <div className="p-3 rounded-2xl bg-amber-700/10 border border-amber-600/30 flex flex-col items-center">
            <span className="text-2xl sm:text-3xl">🥉</span>
            <span className="text-xs sm:text-sm font-bold text-amber-400 font-mono mt-1">2ND RUNNER-UP</span>
            <span className="text-[9px] font-mono text-zinc-400 uppercase">BRONZE CUP &amp; MERIT</span>
          </div>

          {/* Trophy 4 */}
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 flex flex-col items-center">
            <span className="text-2xl sm:text-3xl">🌟</span>
            <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono mt-1">TRACK WINNERS</span>
            <span className="text-[9px] font-mono text-zinc-400 uppercase">4 EXCELLENCE CUPS</span>
          </div>
        </div>
      </div>

      {/* Date, Time & Location Quick Chips */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md text-zinc-200 shadow-md text-[11px] sm:text-xs">
          <Calendar className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-400 flex-shrink-0" />
          <span>Saturday, October 24, 2026</span>
        </div>

        <div className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md text-zinc-200 shadow-md text-[11px] sm:text-xs">
          <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-400 flex-shrink-0" />
          <span>Valedictory &amp; Award Presentation</span>
        </div>

        <div className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md text-zinc-200 shadow-md text-[11px] sm:text-xs">
          <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-400 flex-shrink-0" />
          <span>PIT Auditorium, Jaunpur</span>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
        <a
          href="#ceremony"
          onClick={() => {
            soundEngine.playClick();
            triggerCeremonyClick();
          }}
          className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-mono font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_40px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer overflow-hidden"
        >
          <Trophy className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
          <span className="relative z-10">ARE YOU READY? • ENTER THE CEREMONY 🏆</span>
          <ArrowRight className="w-4 h-4 text-black relative z-10 transition-transform group-hover:translate-x-1" />
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </a>

        <a
          href="/login"
          onClick={() => soundEngine.playClick()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-600/20 to-teal-600/20 hover:from-emerald-600/30 hover:to-teal-600/30 text-emerald-300 hover:text-emerald-200 font-mono font-bold text-xs uppercase tracking-wider border border-emerald-500/50 hover:border-emerald-400 backdrop-blur-md transition-all shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>View Ticket ID &amp; Squad</span>
        </a>

        <a
          href="#schedule"
          onClick={() => soundEngine.playClick()}
          className="inline-flex items-center gap-2 px-5 py-4 rounded-xl bg-black/70 hover:bg-black/90 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider border border-white/15 hover:border-amber-400/50 backdrop-blur-md transition-all cursor-pointer"
        >
          <span>Ceremony Order</span>
        </a>
      </div>

      {/* Event Metrics (Glowing Cards) */}
      <div className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-white/10 text-left">
        <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md hover:border-amber-400/40 transition-colors shadow-lg">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block">VENUE</span>
          <span className="text-base font-bold text-white font-mono flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            PIT Auditorium
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md hover:border-amber-400/40 transition-colors shadow-lg">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block">BUILDERS</span>
          <span className="text-base font-bold text-amber-400 font-mono block mt-0.5">125+ Registered</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md hover:border-amber-400/40 transition-colors shadow-lg">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block">HONORS</span>
          <span className="text-base font-bold text-amber-300 font-mono block mt-0.5">Trophies &amp; MLH Kits</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md hover:border-amber-400/40 transition-colors shadow-lg">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block">EVALUATOR</span>
          <span className="text-base font-bold text-emerald-400 font-mono block mt-0.5">CSE Faculty Jury</span>
        </div>
      </div>
    </section>
  );
}
