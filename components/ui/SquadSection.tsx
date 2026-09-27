'use client';

import React, { useState } from 'react';
import { soundEngine } from '@/lib/audio';
import { Users, UserPlus, UserCheck, Check, ShieldCheck, ArrowRight } from 'lucide-react';

interface SquadSectionProps {
  onOpenRegister: () => void;
}

export default function SquadSection({ onOpenRegister }: SquadSectionProps) {
  const [activeTab, setActiveTab] = useState<'HAVE_TEAM' | 'NEED_TEAM' | 'SOLO'>('NEED_TEAM');

  const handleTabChange = (tab: 'HAVE_TEAM' | 'NEED_TEAM' | 'SOLO') => {
    soundEngine.playClick();
    setActiveTab(tab);
  };

  return (
    <section id="squads" className="relative w-full py-20 px-4 max-w-5xl mx-auto z-20 pointer-events-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
          <Users className="w-3.5 h-3.5" />
          <span>TEAM FORMATION GUIDELINES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          TEAM UP OR SPRINT SOLO
        </h2>
        <p className="mt-3 text-zinc-300 max-w-xl mx-auto text-sm sm:text-base font-light">
          Whether you arrive with a squad from your department or join peers on event morning, everyone gets seated and supported.
        </p>
      </div>

      {/* 3-Way Tab Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
        <button
          onClick={() => handleTabChange('HAVE_TEAM')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all ${
            activeTab === 'HAVE_TEAM'
              ? 'bg-amber-500 text-black font-bold shadow-lg scale-105'
              : 'bg-black/60 text-zinc-400 border border-white/10 hover:border-white/20 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>I Have a Team</span>
        </button>

        <button
          onClick={() => handleTabChange('NEED_TEAM')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all ${
            activeTab === 'NEED_TEAM'
              ? 'bg-amber-500 text-black font-bold shadow-lg scale-105'
              : 'bg-black/60 text-zinc-400 border border-white/10 hover:border-white/20 hover:text-white'
          }`}
        >
          <UserPlus className="w-4 h-4" />
          <span>I Need a Team</span>
        </button>

        <button
          onClick={() => handleTabChange('SOLO')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all ${
            activeTab === 'SOLO'
              ? 'bg-amber-500 text-black font-bold shadow-lg scale-105'
              : 'bg-black/60 text-zinc-400 border border-white/10 hover:border-white/20 hover:text-white'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>I&apos;m Going Solo</span>
        </button>
      </div>

      {/* Details Box */}
      <div className="p-7 sm:p-9 rounded-3xl bg-black/75 border border-white/10 backdrop-blur-2xl shadow-2xl">
        {activeTab === 'HAVE_TEAM' && (
          <div className="animate-fade-in space-y-5">
            <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
              <span className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                <Users className="w-5 h-5" />
              </span>
              <span>Pre-Formed Squads (2 to 4 Members)</span>
            </h3>
            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              Arrive together with your team! Each member must register individually with their student details and select <strong>“Bringing a team”</strong>. On hack day, our on-ground volunteers will seat your entire squad at a shared lab table.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-amber-400 block mb-1">01. REGISTER INDIVIDUALLY</span>
                <span className="text-zinc-300 font-sans">Every teammate gets their unique campus access pass.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-amber-400 block mb-1">02. CHOOSE SPRINT TRACK</span>
                <span className="text-zinc-300 font-sans">Align on your focus (Open Source, Web, AI, or Tools).</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-amber-400 block mb-1">03. CHECK-IN AT 09:30 AM</span>
                <span className="text-zinc-300 font-sans">Claim your squad table at the PIT auditorium.</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'NEED_TEAM' && (
          <div className="animate-fade-in space-y-5">
            <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
              <span className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                <UserPlus className="w-5 h-5" />
              </span>
              <span>Morning Team Matchmaking Mixer</span>
            </h3>
            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              Don&apos;t have a team yet? No problem at all! At 10:00 AM after the opening briefing, we host a fast-paced physical team matchmaking mixer in the auditorium. You can team up with fellow students across different branches and semesters.
            </p>
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200 flex items-center gap-3">
              <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <span>Mentors and student hosts will actively assist anyone looking for teammates to ensure no one is left behind.</span>
            </div>
          </div>
        )}

        {activeTab === 'SOLO' && (
          <div className="animate-fade-in space-y-5">
            <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
              <span className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <UserCheck className="w-5 h-5" />
              </span>
              <span>Solo Ranger Contributors</span>
            </h3>
            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              Prefer contributing directly to open-source pull requests on your own? You are completely welcome to build solo. Select <strong>“Solo”</strong> on the registration portal. You retain full individual authorship of all commits and showcase your work during the afternoon lightning demos.
            </p>
          </div>
        )}

        {/* Organizer notice */}
        <div className="mt-7 pt-5 border-t border-white/10 flex items-start gap-3 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p>
            <strong className="text-zinc-200">Campus Coordination:</strong> Table assignments, power stations, Wi-Fi credentials, and squad check-ins are handled directly on-site at Prasad Institute of Technology by student coordinators.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenRegister();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all"
          >
            <span>Confirm Your Spot</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
