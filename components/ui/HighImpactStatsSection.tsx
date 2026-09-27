'use client';

import React from 'react';
import Tilt3DCard from './Tilt3DCard';
import { Cpu, Zap, Shield, Trophy, Users, Flame, Star, Sparkles } from 'lucide-react';

export default function HighImpactStatsSection() {
  const stats = [
    {
      value: '5.5h',
      label: 'HIGH-INTENSITY SPRINT',
      description: 'Rapid prototyping from problem statement to shipping working code on GitHub.',
      icon: Zap,
      gradient: 'from-amber-400 via-yellow-300 to-amber-500',
      border: 'border-amber-400/50',
      glow: 'shadow-[0_0_35px_rgba(245,158,11,0.25)]',
    },
    {
      value: '100+',
      label: 'PIT CAMPUS BUILDERS',
      description: 'Exclusive to students of Prasad Institute of Technology, Jaunpur across all branches.',
      icon: Users,
      gradient: 'from-emerald-400 via-teal-300 to-emerald-500',
      border: 'border-emerald-400/50',
      glow: 'shadow-[0_0_35px_rgba(16,185,129,0.25)]',
    },
    {
      value: '100%',
      label: 'OFFLINE IN-PERSON EVENT',
      description: 'Zero remote lag. Physical collaboration, hands-on git mentorship, and networking.',
      icon: Shield,
      gradient: 'from-cyan-400 via-sky-300 to-blue-500',
      border: 'border-cyan-400/50',
      glow: 'shadow-[0_0_35px_rgba(6,182,212,0.25)]',
    },
    {
      value: 'LVL 99',
      label: 'VIP DIGITAL PASSPORT',
      description: 'Instant 9:16 WhatsApp Status poster generation with verified college credentials.',
      icon: Flame,
      gradient: 'from-purple-400 via-pink-300 to-rose-500',
      border: 'border-purple-400/50',
      glow: 'shadow-[0_0_35px_rgba(168,85,247,0.25)]',
    },
  ];

  return (
    <section className="relative w-full py-16 px-4 max-w-6xl mx-auto z-20 pointer-events-auto">
      {/* 4 Holographic 3D Metric Cubes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Tilt3DCard
              key={i}
              maxTilt={12}
              className={`rounded-3xl p-6 bg-gradient-to-b from-neutral-900/90 via-black to-neutral-950/95 border-2 ${stat.border} ${stat.glow} backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between group`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <Sparkles className="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-400 transition-colors animate-pulse" />
              </div>

              <div>
                <span className={`text-3xl sm:text-4xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} drop-shadow-md`}>
                  {stat.value}
                </span>
                <h4 className="mt-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
                  {stat.label}
                </h4>
                <p className="mt-1 text-[11px] text-zinc-400 font-light leading-relaxed">
                  {stat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                <span>Verified Metric</span>
                <span className="text-emerald-400">● Live</span>
              </div>
            </Tilt3DCard>
          );
        })}
      </div>
    </section>
  );
}
