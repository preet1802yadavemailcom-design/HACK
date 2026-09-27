'use client';

import React, { useState } from 'react';
import { EVENT_TRACKS } from '@/data/eventData';
import { soundEngine } from '@/lib/audio';
import { GitPullRequest, Globe, Cpu, Wrench, Sparkles, Layers, CheckCircle2 } from 'lucide-react';

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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest mb-3 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>HACKATHON FOCUS TRACKS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          CHOOSE YOUR SPRINT FOCUS
        </h2>
        <p className="mt-3 text-zinc-300 max-w-xl mx-auto text-sm sm:text-base font-light">
          Whether you want to solve existing open-source issues on GitHub or build a full-stack product from scratch, there is a dedicated track for you.
        </p>
      </div>

      {/* Tracks Grid with Animated Glow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EVENT_TRACKS.map((track, index) => {
          const isSelected = selectedTrack === track.id;
          const Icon = getIcon(track.id);

          return (
            <div
              key={track.id}
              onClick={() => {
                soundEngine.playClick();
                setSelectedTrack(track.id);
              }}
              className={`cursor-pointer rounded-3xl p-7 transition-all duration-300 backdrop-blur-2xl border relative overflow-hidden group ${
                isSelected
                  ? 'bg-gradient-to-b from-neutral-900 via-black to-neutral-950 border-amber-500/80 shadow-[0_0_50px_rgba(245,158,11,0.3)] scale-[1.02]'
                  : 'bg-black/60 border-white/10 hover:border-amber-400/40 hover:bg-black/85 hover:scale-[1.01]'
              }`}
            >
              {/* Subtle hover radiance */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/20 transition-all duration-500" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3.5 rounded-2xl border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                    isSelected 
                      ? 'bg-amber-500/20 border-amber-400/60 text-amber-400 shadow-md' 
                      : 'bg-white/5 border-white/10 text-zinc-300'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 text-amber-300 border border-white/10 uppercase tracking-wider font-semibold">
                      {track.category}
                    </span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-wide">
                  {track.title}
                </h3>

                <p className="mt-3 text-sm text-zinc-300 leading-relaxed font-light">
                  {track.description}
                </p>

                {/* Technologies */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {track.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-3 py-1 rounded-xl bg-white/5 text-zinc-200 border border-white/10 transition-colors group-hover:border-amber-400/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Deliverable info */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500 uppercase text-[10px]">DELIVERABLE</span>
                  <span className="text-amber-300 font-bold">{track.deliverable}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
