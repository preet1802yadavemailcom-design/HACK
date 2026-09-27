'use client';

import React, { useState } from 'react';
import { soundEngine } from '@/lib/audio';
import { Clock, Terminal, Code2, Rocket, Award, Sparkles, MapPin } from 'lucide-react';

export default function EventTimeline() {
  const [activeStep, setActiveStep] = useState<number>(2); // Default to "BUILD"

  const schedule = [
    {
      time: '09:30 IST',
      phase: 'ON-CAMPUS CHECK-IN',
      shortTitle: 'CHECK-IN',
      icon: MapPin,
      realmReference: 'Dimension 01: Genesis',
      description: 'Physical campus check-in at Prasad Institute of Technology auditorium. Badge issuance, table station allocations & opening briefing.',
      milestone: 'Environment verification & Git setup confirmed on-site.',
    },
    {
      time: '10:00 IST',
      phase: 'IDEATE & SQUAD FORMATION',
      shortTitle: 'IDEATE',
      icon: Terminal,
      realmReference: 'Dimension 02: Architecture',
      description: 'Problem statement discovery, open-source repo selection, issue scoping, and in-person team mixer.',
      milestone: 'First issue claimed & feature branch created.',
    },
    {
      time: '11:00 IST',
      phase: 'THE SPRINT BUILD BLOCK',
      shortTitle: 'BUILD',
      icon: Code2,
      realmReference: 'Dimension 06: Plasma Forge',
      description: 'Intense physical hacking session. Hosts and mentors physically circulate across campus lab tables to resolve blockers and review architecture.',
      milestone: 'Core features implemented, tests passing.',
    },
    {
      time: '13:30 IST',
      phase: 'SHIP THE PULL REQUEST',
      shortTitle: 'SHIP THE PR',
      icon: Rocket,
      realmReference: 'Dimension 07: Breakthrough',
      description: 'Code freeze for PR submissions. Open pull requests to upstream Hacktoberfest participating repos or tag live project release.',
      milestone: 'Pull request submitted for maintainer review.',
    },
    {
      time: '14:30 IST',
      phase: 'LIVE AUDITORIUM SHOWCASE',
      shortTitle: 'SHOWCASE',
      icon: Sparkles,
      realmReference: 'Dimension 08: Sanctuary',
      description: 'Stage demos of student builds, open-source pull requests, and software prototypes on the main auditorium projector.',
      milestone: 'In-person stage presentation to peers and faculty.',
    },
    {
      time: '15:00 IST',
      phase: 'CULMINATION & CLOSE',
      shortTitle: 'CLOSE',
      icon: Award,
      realmReference: 'Dimension 09: Apex',
      description: 'Closing remarks by organizers, group photograph, contributor acknowledgments, and event wrap-up.',
      milestone: 'Hacktoberfest Hack Day Jaunpur successfully concluded.',
    },
  ];

  return (
    <section className="relative w-full py-16 px-4 max-w-5xl mx-auto z-30 pointer-events-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 font-mono text-xs uppercase tracking-widest mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>SATURDAY, OCTOBER 24, 2026 • OFFLINE SPRINT</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-celestial font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-gold-400 to-amber-500 text-gold-glow">
          IN-PERSON HACK SCHEDULE
        </h2>
        <p className="mt-3 text-zinc-400 max-w-xl mx-auto text-sm sm:text-base font-light">
          Six focused milestones at Prasad Institute of Technology, navigating from 09:30 morning check-in to final stage demos.
        </p>
      </div>

      {/* Glowing Pathway Timeline */}
      <div className="relative">
        {/* Central glowing vertical spine for desktop */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-amber-500 via-cyan-400 to-purple-500 shadow-[0_0_15px_rgba(245,158,11,0.5)] rounded-full" />

        <div className="space-y-8">
          {schedule.map((item, idx) => {
            const isSelected = activeStep === idx;
            const Icon = item.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveStep(idx);
                }}
                className={`relative flex flex-col md:flex-row items-center cursor-pointer transition-all duration-300 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Content Card */}
                <div className="w-full md:w-[45%]">
                  <div
                    className={`p-6 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
                      isSelected
                        ? 'bg-midnight-900/90 border-gold-500/60 shadow-[0_0_30px_rgba(245,158,11,0.25)] scale-[1.02]'
                        : 'bg-midnight-950/60 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs px-2.5 py-1 rounded bg-gold-500/20 text-gold-300 font-bold tracking-wider">
                        {item.time}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">
                        {item.realmReference}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white tracking-wide">
                      {item.phase}
                    </h3>
                    <p className="mt-2 text-xs text-zinc-400 font-light leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>{item.milestone}</span>
                    </div>
                  </div>
                </div>

                {/* Node Center Marker */}
                <div className="my-3 md:my-0 md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-gold-500 text-midnight-950 shadow-[0_0_20px_#fbbf24] scale-125'
                        : 'bg-midnight-900 border border-zinc-700 text-zinc-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Blank spacer for opposing side */}
                <div className="hidden md:block w-full md:w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
