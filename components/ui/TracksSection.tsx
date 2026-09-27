'use client';

import React, { useState } from 'react';
import { EVENT_TRACKS } from '@/data/eventData';
import { soundEngine } from '@/lib/audio';
import { GitPullRequest, Globe, Cpu, Wrench, ArrowRight, CheckCircle2, Layers } from 'lucide-react';

export default function TracksSection() {
  const [selectedTrack, setSelectedTrack] = useState(EVENT_TRACKS[0].id);

  const getIcon = (id: string) => {
    switch (id) {
      case 'open-source':
        return GitPullRequest;
      case 'web-cloud':
        return Globe;
      case 'ai-ml':
        return Cpu;
      default:
        return Wrench;
    }
  };

  return (
    <section id="tracks" className="relative w-full py-20 px-4 max-w-6xl mx-auto z-20 pointer-events-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>HACKATHON FOCUS TRACKS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          CHOOSE YOUR SPRINT FOCUS
        </h2>
        <p className="mt-3 text-zinc-300 max-w-xl mx-auto text-sm sm:text-base font-light">
          Whether you want to solve existing open-source issues on GitHub or build a full-stack product from scratch, there is a dedicated track for you.
        </p>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {EVENT_TRACKS.map((track) => {
          const isSelected = selectedTrack === track.id;
          const Icon = getIcon(track.id);

          return (
            <div
              key={track.id}
              onClick={() => {
                soundEngine.playClick();
                setSelectedTrack(track.id);
              }}
              className={`cursor-pointer rounded-2xl p-6 sm:p-7 transition-all duration-300 backdrop-blur-xl border ${
                isSelected
                  ? 'bg-black/85 border-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.2)] scale-[1.01]'
                  : 'bg-black/50 border-white/10 hover:border-white/20 hover:bg-black/70'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 text-zinc-400 border border-white/10 uppercase tracking-wider">
                  {track.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white tracking-wide">
                {track.title}
              </h3>

              <p className="mt-2 text-sm text-zinc-300 leading-relaxed font-light">
                {track.description}
              </p>

              {/* Technologies */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {track.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/5 text-zinc-300 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Deliverable info */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500 uppercase text-[10px]">DELIVERABLE:</span>
                <span className="text-amber-300 font-semibold">{track.deliverable}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
