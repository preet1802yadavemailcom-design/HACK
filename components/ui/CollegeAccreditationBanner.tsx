'use client';

import React from 'react';
import Tilt3DCard from './Tilt3DCard';
import { soundEngine } from '@/lib/audio';
import { ShieldCheck, Award, MapPin, Sparkles, Building2, ExternalLink, GraduationCap, Flame } from 'lucide-react';

interface CollegeAccreditationBannerProps {
  onOpenRegister?: () => void;
}

export default function CollegeAccreditationBanner({ onOpenRegister }: CollegeAccreditationBannerProps) {
  const highlights = [
    {
      icon: Award,
      title: 'AICTE & PCI Approved',
      subtitle: 'Govt. of India & Govt. of UP',
      glow: 'text-amber-400 border-amber-400/30 bg-amber-500/10',
    },
    {
      icon: GraduationCap,
      title: 'AKTU Affiliated',
      subtitle: 'Dr. A.P.J. Abdul Kalam Technical University',
      glow: 'text-emerald-400 border-emerald-400/30 bg-emerald-500/10',
    },
    {
      icon: Building2,
      title: 'Department of CSE',
      subtitle: 'Centre for Advanced Computing & AI',
      glow: 'text-cyan-400 border-cyan-400/30 bg-cyan-500/10',
    },
    {
      icon: MapPin,
      title: 'Panchhatiya Campus',
      subtitle: 'Jaunpur, Uttar Pradesh 222002',
      glow: 'text-rose-400 border-rose-400/30 bg-rose-500/10',
    },
  ];

  return (
    <section className="relative w-full py-12 px-4 max-w-6xl mx-auto z-20 pointer-events-auto">
      {/* Background Animated Ambient Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-red-600/15 via-amber-500/15 to-emerald-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <Tilt3DCard maxTilt={6} className="w-full">
        <div className="relative rounded-[32px] p-6 sm:p-10 bg-gradient-to-b from-neutral-900/90 via-black to-neutral-950 border-2 border-amber-400/50 shadow-[0_0_80px_rgba(245,158,11,0.25),0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-3xl overflow-hidden group">
          {/* Animated Prismatic Rainbow Laser Light Sweep */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 mix-blend-color-dodge transition-opacity duration-700 group-hover:opacity-50"
            style={{
              background:
                'linear-gradient(105deg, transparent 20%, rgba(245, 158, 11, 0.25) 40%, rgba(239, 68, 68, 0.3) 50%, rgba(16, 185, 129, 0.25) 60%, transparent 80%)',
              backgroundSize: '200% 100%',
              animation: 'shimmerSweep 8s linear infinite',
            }}
          />

          {/* Top Pill - Institutional Badge */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-red-500/20 to-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              <ShieldCheck className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>OFFICIAL HOST INSTITUTION • ESTABLISHED EXCELLENCE</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-400 font-bold">CAMPUS ACCREDITED</span>
              <span className="text-zinc-600">|</span>
              <span>JAUNPUR, UP</span>
            </div>
          </div>

          {/* Main Visual: Illuminated Institution Banner Canvas */}
          <div className="relative z-10 my-8">
            <div className="relative rounded-2xl bg-white p-3 sm:p-6 shadow-[0_15px_45px_rgba(0,0,0,0.8),0_0_40px_rgba(255,255,255,0.15)] border-2 border-amber-400/60 overflow-hidden group-hover:border-amber-300 transition-all duration-500">
              {/* Subtle glossy glass reflection across the white plinth */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none opacity-40" />

              {/* The High-Resolution College Banner Image */}
              <img
                src="/pit-banner.png"
                alt="Prasad Institute of Technology - Approved by AICTE, PCI, Govt. of India & Affiliated to AKTU"
                className="w-full h-auto max-h-[140px] sm:max-h-[180px] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* Micro Bottom Status Strip */}
              <div className="mt-3 pt-3 border-t border-neutral-200/80 flex flex-wrap items-center justify-between text-[10px] sm:text-xs font-sans font-semibold text-neutral-600 gap-2">
                <span className="text-red-700 font-bold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-red-600 inline" />
                  Prasad Institute of Technology, Jaunpur
                </span>
                <span className="text-neutral-500 font-mono">
                  Affiliated to Dr. A.P.J. Abdul Kalam Technical University (AKTU)
                </span>
              </div>
            </div>
          </div>

          {/* 4 Pillars of Accreditation Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-105 backdrop-blur-xl ${item.glow}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-black/60 border border-white/10 shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold font-sans text-white tracking-wide">
                        {item.title}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-300 mt-0.5">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Call to Action strip */}
          <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="text-left">
              <div className="text-xs font-mono text-zinc-400">
                HOST CAMPUS &bull; ORGANIZING BODY
              </div>
              <div className="text-sm font-bold text-white font-sans">
                Department of Computer Science &amp; Engineering &bull; PIT Jaunpur
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#venue"
                onClick={() => soundEngine.playClick()}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all border border-white/15 cursor-pointer"
              >
                Campus Venue Details &rarr;
              </a>
              {onOpenRegister && (
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    onOpenRegister();
                  }}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-mono text-xs font-black uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  Join Hack Day
                </button>
              )}
            </div>
          </div>
        </div>
      </Tilt3DCard>
    </section>
  );
}
