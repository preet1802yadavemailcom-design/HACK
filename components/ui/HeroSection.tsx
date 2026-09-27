'use client';

import React, { useState, useEffect } from 'react';
import { soundEngine } from '@/lib/audio';
import { Calendar, Clock, MapPin, ArrowRight, Sparkles, Terminal, Flame, Zap, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onOpenRegister: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function HeroSection({ onOpenRegister }: HeroSectionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target: Saturday, October 24, 2026, 09:30:00 AM IST
    const targetDate = new Date('2026-10-24T09:30:00+05:30').getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center items-center text-center px-4 pt-28 pb-16 max-w-5xl mx-auto z-20 pointer-events-auto">
      {/* Dynamic Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-emerald-500/15 rounded-full blur-[100px] pointer-events-none animate-pulse" />

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
            Department of Computer Science & Engineering
          </span>
          <span className="text-xs sm:text-sm font-sans font-bold text-white tracking-wide">
            Prasad Institute of Technology, Jaunpur
          </span>
        </div>
      </div>

      {/* Offline Status Badge */}
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/75 border border-emerald-500/50 backdrop-blur-xl shadow-[0_0_25px_rgba(16,185,129,0.3)] mb-6 transition-all hover:scale-105">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
        </span>
        <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider uppercase">
          100% OFFLINE IN-PERSON EVENT
        </span>
        <span className="text-zinc-600">|</span>
        <span className="text-xs font-mono text-amber-300 font-semibold">
          PIT JAUNPUR CAMPUS
        </span>
      </div>

      {/* Main Title with Radiant Gradient & Glow */}
      <h1 className="text-3xl sm:text-6xl md:text-7xl font-sans font-black tracking-tight text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.2)] break-words">
        HACKTOBERFEST <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 drop-shadow-[0_0_40px_rgba(245,158,11,0.5)]">
          HACK DAY JAUNPUR
        </span>
      </h1>

      {/* Subtitle */}
      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-200/90 font-mono text-sm sm:text-lg font-bold tracking-wide">
        <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
        <span>PRASAD INSTITUTE OF TECHNOLOGY</span>
      </div>

      <p className="mt-4 text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
        The premier on-campus open-source hackathon in Eastern Uttar Pradesh. Join fellow Prasad Institute of Technology students for an intense 5.5-hour in-person sprint of building, contributing, and shipping real code.
      </p>

      {/* LIVE COUNTDOWN TIMER (Eliminates Static Feel!) */}
      <div className="mt-8 w-full max-w-xl mx-auto p-4 sm:p-5 rounded-3xl bg-black/80 border border-amber-500/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(245,158,11,0.2)]">
        <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold mb-3 flex items-center justify-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>HACKATHON COUNTDOWN TO OCT 24, 2026</span>
        </div>

        <div className="grid grid-cols-4 gap-1.5 sm:gap-3 text-center">
          {/* Days */}
          <div className="p-2 sm:p-3 rounded-2xl bg-neutral-900/90 border border-white/10 shadow-inner flex flex-col items-center">
            <span className="text-xl sm:text-4xl font-mono font-black text-white drop-shadow-md">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[8px] sm:text-[10px] font-mono text-zinc-400 uppercase mt-0.5">DAYS</span>
          </div>

          {/* Hours */}
          <div className="p-2 sm:p-3 rounded-2xl bg-neutral-900/90 border border-white/10 shadow-inner flex flex-col items-center">
            <span className="text-xl sm:text-4xl font-mono font-black text-amber-400 drop-shadow-md">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[8px] sm:text-[10px] font-mono text-zinc-400 uppercase mt-0.5">HOURS</span>
          </div>

          {/* Minutes */}
          <div className="p-2 sm:p-3 rounded-2xl bg-neutral-900/90 border border-white/10 shadow-inner flex flex-col items-center">
            <span className="text-xl sm:text-4xl font-mono font-black text-emerald-400 drop-shadow-md">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[8px] sm:text-[10px] font-mono text-zinc-400 uppercase mt-0.5">MINUTES</span>
          </div>

          {/* Seconds */}
          <div className="p-2 sm:p-3 rounded-2xl bg-neutral-900/90 border border-white/10 shadow-inner flex flex-col items-center">
            <span className="text-xl sm:text-4xl font-mono font-black text-cyan-400 drop-shadow-md animate-pulse">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[8px] sm:text-[10px] font-mono text-zinc-400 uppercase mt-0.5">SECONDS</span>
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
          <span>09:30 AM – 3:00 PM IST</span>
        </div>

        <div className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md text-zinc-200 shadow-md text-[11px] sm:text-xs">
          <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-400 flex-shrink-0" />
          <span>PIT Campus, Jaunpur</span>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
        <button
          onClick={() => {
            soundEngine.playClick();
            onOpenRegister();
          }}
          className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-mono font-black text-xs uppercase tracking-wider shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:shadow-[0_0_55px_rgba(245,158,11,0.85)] hover:scale-105 active:scale-95 transition-all cursor-pointer overflow-hidden"
        >
          <span className="relative z-10">Register for In-Person Pass</span>
          <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>

        <a
          href="/badge"
          onClick={() => soundEngine.playClick()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-emerald-600/20 to-teal-600/20 hover:from-emerald-600/30 hover:to-teal-600/30 text-emerald-300 hover:text-emerald-200 font-mono font-bold text-xs uppercase tracking-wider border border-emerald-500/50 hover:border-emerald-400 backdrop-blur-md transition-all shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>Create Hacker ID Card (9:16)</span>
        </a>

        <a
          href="#schedule"
          onClick={() => soundEngine.playClick()}
          className="inline-flex items-center gap-2 px-5 py-4 rounded-xl bg-black/70 hover:bg-black/90 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider border border-white/15 hover:border-amber-400/50 backdrop-blur-md transition-all cursor-pointer"
        >
          <span>Schedule</span>
        </a>
      </div>

      {/* Event Metrics (Glowing Cards) */}
      <div className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-white/10 text-left">
        <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md hover:border-amber-400/40 transition-colors shadow-lg">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block">FORMAT</span>
          <span className="text-base font-bold text-white font-mono flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            100% Offline
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md hover:border-amber-400/40 transition-colors shadow-lg">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block">DURATION</span>
          <span className="text-base font-bold text-amber-400 font-mono block mt-0.5">5.5 Hours Sprint</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md hover:border-amber-400/40 transition-colors shadow-lg">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block">ELIGIBILITY</span>
          <span className="text-base font-bold text-amber-300 font-mono block mt-0.5">PIT Students Only</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md hover:border-amber-400/40 transition-colors shadow-lg">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block">ADMISSION</span>
          <span className="text-base font-bold text-emerald-400 font-mono block mt-0.5">Free Registration</span>
        </div>
      </div>
    </section>
  );
}
