'use client';

import React from 'react';
import { soundEngine } from '@/lib/audio';
import { EVENT_DETAILS } from '@/data/eventData';
import { Calendar, Clock, MapPin, ArrowRight, Sparkles, Terminal, Code2, Users, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onOpenRegister: () => void;
}

export default function HeroSection({ onOpenRegister }: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center text-center px-4 pt-28 pb-16 max-w-5xl mx-auto z-20 pointer-events-auto">
      {/* Offline Status Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-emerald-500/40 backdrop-blur-xl shadow-lg mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider uppercase">
          OFFLINE IN-PERSON EVENT
        </span>
        <span className="text-zinc-600">|</span>
        <span className="text-xs font-mono text-zinc-300">
          PIT JAUNPUR CAMPUS
        </span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-7xl font-sans font-black tracking-tight text-white drop-shadow-xl">
        HACKTOBERFEST <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">
          HACK DAY JAUNPUR
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-sm sm:text-xl font-mono text-amber-200/90 font-medium tracking-wide">
        PRASAD INSTITUTE OF TECHNOLOGY
      </p>

      <p className="mt-3 text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
        The premier on-campus open-source hackathon in Eastern Uttar Pradesh. Join fellow university students for an intense 5.5-hour in-person sprint of building, contributing, and shipping real code.
      </p>

      {/* Date, Time & Location Quick Chips */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md text-zinc-200">
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>Saturday, October 24, 2026</span>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md text-zinc-200">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>09:30 AM – 3:00 PM IST</span>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md text-zinc-200">
          <MapPin className="w-4 h-4 text-amber-400" />
          <span>Prasad Institute of Technology, Jaunpur</span>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => {
            soundEngine.playClick();
            onOpenRegister();
          }}
          className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:shadow-[0_0_50px_rgba(245,158,11,0.8)] hover:scale-105 active:scale-95 transition-all cursor-pointer overflow-hidden"
        >
          <span className="relative z-10">Register for In-Person Pass</span>
          <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>

        <a
          href="#schedule"
          onClick={() => soundEngine.playClick()}
          className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-black/60 hover:bg-black/80 text-white font-mono text-xs uppercase tracking-wider border border-white/15 hover:border-amber-400/50 backdrop-blur-md transition-all"
        >
          <span>View Event Schedule</span>
        </a>
      </div>

      {/* Event Metrics */}
      <div className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-white/10 text-left">
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 backdrop-blur-sm">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block">FORMAT</span>
          <span className="text-base font-bold text-white font-mono">100% Offline</span>
        </div>
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 backdrop-blur-sm">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block">DURATION</span>
          <span className="text-base font-bold text-amber-400 font-mono">5.5 Hours Sprint</span>
        </div>
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 backdrop-blur-sm">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block">ELIGIBILITY</span>
          <span className="text-base font-bold text-white font-mono">All College Students</span>
        </div>
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 backdrop-blur-sm">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block">ADMISSION</span>
          <span className="text-base font-bold text-emerald-400 font-mono">Free Registration</span>
        </div>
      </div>
    </section>
  );
}
