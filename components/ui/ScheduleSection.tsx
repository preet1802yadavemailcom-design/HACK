'use client';

import React from 'react';
import { EVENT_SCHEDULE } from '@/data/eventData';
import { Clock, Calendar, CheckCircle2 } from 'lucide-react';

export default function ScheduleSection() {
  return (
    <section id="schedule" className="relative w-full py-20 px-4 max-w-5xl mx-auto z-20 pointer-events-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>SATURDAY, OCTOBER 24, 2026</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          EVENT SCHEDULE
        </h2>
        <p className="mt-3 text-zinc-300 max-w-xl mx-auto text-sm sm:text-base font-light">
          A focused 5.5-hour in-person sprint on campus at Prasad Institute of Technology, Jaunpur.
        </p>
      </div>

      {/* Schedule Cards */}
      <div className="space-y-4">
        {EVENT_SCHEDULE.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-xl hover:border-amber-500/40 transition-all gap-4"
          >
            <div className="flex items-start sm:items-center gap-4">
              <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold whitespace-nowrap">
                {item.time}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <span className="hidden sm:inline-block w-2.5 h-2.5 rounded-full bg-emerald-400/80 shadow-[0_0_10px_#34d399]" />
          </div>
        ))}
      </div>
    </section>
  );
}
