'use client';

import React, { useState } from 'react';
import { soundEngine } from '@/lib/audio';
import { Users2, UserPlus, UserCheck, ArrowRight, ShieldAlert, Sparkles, Check } from 'lucide-react';

interface FindYourSquadProps {
  onOpenRegister: () => void;
}

export default function FindYourSquad({ onOpenRegister }: FindYourSquadProps) {
  const [activeTab, setActiveTab] = useState<'HAVE_TEAM' | 'NEED_TEAM' | 'SOLO'>('NEED_TEAM');

  const handleTabChange = (tab: 'HAVE_TEAM' | 'NEED_TEAM' | 'SOLO') => {
    soundEngine.playClick();
    setActiveTab(tab);
  };

  return (
    <section className="relative w-full py-16 px-4 max-w-5xl mx-auto z-30 pointer-events-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TEAM FORMATION PROTOCOL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-celestial font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-300 to-indigo-300 text-cyan-glow">
          FIND YOUR SQUAD
        </h2>
        <p className="mt-3 text-zinc-400 max-w-xl mx-auto text-sm sm:text-base font-light">
          Whether you walk into the arena as an unbroken guild or an independent solo ranger, there is a place for your craft.
        </p>
      </div>

      {/* Interactive 3-Way Path Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <button
          onClick={() => handleTabChange('HAVE_TEAM')}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
            activeTab === 'HAVE_TEAM'
              ? 'bg-gradient-to-r from-amber-500 to-gold-400 text-midnight-950 font-bold shadow-[0_0_20px_rgba(251,191,36,0.4)] scale-105'
              : 'bg-midnight-900/80 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white'
          }`}
        >
          <Users2 className="w-4 h-4" />
          <span>I Have a Team</span>
        </button>

        <button
          onClick={() => handleTabChange('NEED_TEAM')}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
            activeTab === 'NEED_TEAM'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-midnight-950 font-bold shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-105'
              : 'bg-midnight-900/80 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white'
          }`}
        >
          <UserPlus className="w-4 h-4" />
          <span>I Need a Team</span>
        </button>

        <button
          onClick={() => handleTabChange('SOLO')}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
            activeTab === 'SOLO'
              ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-midnight-950 font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-105'
              : 'bg-midnight-900/80 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>I&apos;m Going Solo</span>
        </button>
      </div>

      {/* Path Details Card */}
      <div className="p-8 rounded-3xl bg-midnight-950/80 border border-zinc-800/80 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        {activeTab === 'HAVE_TEAM' && (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center gap-3">
              <span className="p-3 rounded-xl bg-gold-500/20 text-gold-400 border border-gold-500/30">
                <Users2 className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-white">Full Squad Readiness</h3>
                <p className="text-xs text-zinc-400 font-mono">Teams of 2 to 4 members are recommended.</p>
              </div>
            </div>

            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              Arrive with your team already synchronized! Each teammate must register individually with their college credentials and indicate that they are <strong className="text-gold-300 font-medium">“Bringing a team”</strong>. On hack day, your squad will be seated together and assigned a mentor station.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-midnight-900/60 border border-zinc-800/70">
                <span className="text-gold-400 font-mono text-xs font-bold block mb-1">STEP 01</span>
                <span className="text-sm text-zinc-200">All members register on this portal.</span>
              </div>
              <div className="p-4 rounded-xl bg-midnight-900/60 border border-zinc-800/70">
                <span className="text-gold-400 font-mono text-xs font-bold block mb-1">STEP 02</span>
                <span className="text-sm text-zinc-200">Agree on your project quest track.</span>
              </div>
              <div className="p-4 rounded-xl bg-midnight-900/60 border border-zinc-800/70">
                <span className="text-gold-400 font-mono text-xs font-bold block mb-1">STEP 03</span>
                <span className="text-sm text-zinc-200">Confirm squad desk with organizers at 09:30 AM.</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'NEED_TEAM' && (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center gap-3">
              <span className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <UserPlus className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-white">Open Team Matchmaking</h3>
                <p className="text-xs text-zinc-400 font-mono">Meet peers across departments and skill levels.</p>
              </div>
            </div>

            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              Don&apos;t have a team yet? No problem at all! Many of the best Hacktoberfest creations are born from serendipitous connections on event morning. Select <strong className="text-cyan-300 font-medium">“Looking for teammates”</strong> in your registration.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-midnight-900/60 border border-zinc-800/70">
                <span className="text-cyan-400 font-mono text-xs font-bold block mb-1">10:00 AM MIXER</span>
                <span className="text-sm text-zinc-200">Join the rapid team formation circle at the auditorium.</span>
              </div>
              <div className="p-4 rounded-xl bg-midnight-900/60 border border-zinc-800/70">
                <span className="text-cyan-400 font-mono text-xs font-bold block mb-1">SKILL BALANCING</span>
                <span className="text-sm text-zinc-200">Pair frontend designers with backend & logic hackers.</span>
              </div>
              <div className="p-4 rounded-xl bg-midnight-900/60 border border-zinc-800/70">
                <span className="text-cyan-400 font-mono text-xs font-bold block mb-1">MENTOR GUIDANCE</span>
                <span className="text-sm text-zinc-200">Hosts & mentors will help finalize unplaced students.</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'SOLO' && (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center gap-3">
              <span className="p-3 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <UserCheck className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-white">Solo Ranger Protocol</h3>
                <p className="text-xs text-zinc-400 font-mono">Laser focus, autonomous execution.</p>
              </div>
            </div>

            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              Prefer diving deep into open-source pull requests or crafting a focused solo prototype? You are completely welcome to build solo. Select <strong className="text-purple-300 font-medium">“Solo”</strong> on the registration portal.
            </p>

            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-purple-200 flex items-center gap-3">
              <Check className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <span>You retain full ownership of your commits and can showcase independently during the 14:30 showcase.</span>
            </div>
          </div>
        )}

        {/* Official Coordination Disclosure Notice */}
        <div className="mt-8 pt-6 border-t border-zinc-800/90 flex items-start gap-3 text-xs text-zinc-400">
          <ShieldAlert className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
          <p>
            <strong className="text-zinc-300">Official Notice:</strong> Team coordination, table allocation, and matchmaking are handled directly on-site at Prasad Institute of Technology according to organizer instructions.
          </p>
        </div>

        {/* Action CTA */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenRegister();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-midnight-950 font-mono font-bold text-xs uppercase tracking-wider transition-all"
          >
            <span>Lock In Your Spot</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
