'use client';

import React from 'react';
import { EVENT_SCHEDULE } from '@/data/eventData';
import { Clock, Calendar, CheckCircle2, Sparkles, MapPin } from 'lucide-react';

export default function ScheduleSection() {
  return (
    <section id="schedule" className="relative w-full py-20 px-4 max-w-5xl mx-auto z-20 pointer-events-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest mb-3 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>SATURDAY, OCTOBER 24, 2026</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          EVENT SCHEDULE &amp; TIMELINE
        </h2>
        <p className="mt-3 text-zinc-300 max-w-xl mx-auto text-sm sm:text-base font-light">
          A focused 5.5-hour in-person sprint on campus at Prasad Institute of Technology, Jaunpur.
        </p>
      </div>

      {/* Schedule Timeline Cards */}
      <div className="relative space-y-4">
        {/* Subtle vertical cyber glow track (Desktop) */}
        <div className="hidden sm:block absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-amber-500/60 via-emerald-500/40 to-amber-500/60 pointer-events-none" />

        {EVENT_SCHEDULE.map((item, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 sm:p-7 rounded-3xl bg-black/75 border border-white/10 hover:border-amber-400/50 backdrop-blur-2xl transition-all duration-300 gap-4 shadow-xl hover:shadow-[0_0_35px_rgba(245,158,11,0.2)] hover:scale-[1.01] overflow-hidden"
          >
            {/* Ambient hover light */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/15 transition-all" />

            <div className="flex items-start sm:items-center gap-4 relative z-10">
              <div className="px-4 py-2 rounded-2xl bg-amber-500/15 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold whitespace-nowrap shadow-sm group-hover:scale-105 group-hover:border-amber-400 transition-all flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{item.time}</span>
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-bold text-white tracking-wide group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-2 font-mono text-[11px] text-zinc-400">
              <span className="hidden sm:inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399] group-hover:animate-ping" />
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 group-hover:text-emerald-400 transition-colors">
                STAGE {idx + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
