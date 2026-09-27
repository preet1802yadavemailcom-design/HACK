'use client';

import React from 'react';
import { Trophy, Gift, Award, Sparkles, Clock, ShieldCheck, Flame, Star, Zap } from 'lucide-react';

export default function PrizesSection() {
  return (
    <section id="prizes" className="relative w-full py-20 px-4 max-w-6xl mx-auto z-20 pointer-events-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-3 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <Trophy className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>REWARDS &amp; RECOGNITION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          PRIZES, SWAG &amp; PERKS
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-300 font-light max-w-xl mx-auto">
          Every participant at Prasad Institute of Technology gets recognized. Build real projects, get mentored, and compete for top honors.
        </p>
      </div>

      {/* Main Announcement Teaser Banner with Magical Animated Aura */}
      <div className="relative mb-12 rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-amber-950/40 via-neutral-900/90 to-yellow-950/40 border-2 border-amber-500/50 shadow-[0_0_70px_rgba(245,158,11,0.3)] backdrop-blur-2xl text-center overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/50 font-mono text-xs font-bold uppercase tracking-widest shadow-lg animate-pulse">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>OFFICIAL REVEAL AT KEYNOTE BRIEFING</span>
          </div>

          <h3 className="text-3xl sm:text-6xl font-black text-white tracking-tight drop-shadow-[0_0_35px_rgba(245,158,11,0.4)]">
            🏆 PRIZES ANNOUNCING SOON!
          </h3>

          <p className="text-sm sm:text-base text-zinc-200 font-light leading-relaxed">
            The full prize pool, winner trophies, official certifications, and sponsor bounty perks are currently being finalized with community partners and will be officially unveiled during the <span className="text-amber-400 font-bold underline decoration-amber-400/50 underline-offset-4">10:00 AM Keynote Briefing on Saturday, October 24, 2026</span> in the PIT Auditorium!
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-zinc-300">
            <span className="px-3.5 py-1.5 rounded-xl bg-black/70 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5 shadow-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified by Prasad Institute of Technology</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-black/70 border border-amber-500/40 text-amber-300 flex items-center gap-1.5 shadow-md">
              <Star className="w-4 h-4 text-amber-400" />
              <span>GitHub &amp; Open Source Goodies</span>
            </span>
          </div>
        </div>
      </div>

      {/* Prize Categories Grid Preview with Holographic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* First Place Card */}
        <div className="relative rounded-3xl p-7 bg-gradient-to-b from-neutral-900/90 via-black to-neutral-950/90 border-2 border-amber-500/50 backdrop-blur-xl shadow-[0_0_40px_rgba(245,158,11,0.2)] hover:shadow-[0_0_60px_rgba(245,158,11,0.4)] hover:scale-102 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/20 transition-colors" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500/30 to-yellow-500/20 border border-amber-400/50 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
              <Trophy className="w-7 h-7" />
            </div>
            <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest block font-bold">
              TOP PODIUM
            </span>
            <h4 className="text-2xl font-black text-white mt-1">Champion Squad 🥇</h4>
            <p className="text-xs text-zinc-300 font-light mt-3 leading-relaxed">
              Grand Winner Trophy, Gold Winner Certificates of Excellence, exclusive Hacktoberfest contributor swag kits &amp; spotlight on PIT college showcase.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/10 font-mono text-xs text-amber-300 flex items-center justify-between">
            <span>Revealed at Briefing</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          </div>
        </div>

        {/* Runner-Up Card */}
        <div className="relative rounded-3xl p-7 bg-gradient-to-b from-neutral-900/90 via-black to-neutral-950/90 border border-white/20 backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.08)] hover:shadow-[0_0_45px_rgba(255,255,255,0.15)] hover:scale-102 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:bg-white/10 transition-colors" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 text-zinc-100 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
              <Award className="w-7 h-7" />
            </div>
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
              RUNNER-UP PODIUM
            </span>
            <h4 className="text-2xl font-black text-white mt-1">First &amp; Second Runners-Up 🥈🥉</h4>
            <p className="text-xs text-zinc-300 font-light mt-3 leading-relaxed">
              Silver &amp; Bronze distinction honors, official certificates, and tech swag packs recognizing outstanding sprint implementation.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/10 font-mono text-xs text-zinc-400 flex items-center justify-between">
            <span>Revealed at Briefing</span>
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
          </div>
        </div>

        {/* All Participants Card */}
        <div className="relative rounded-3xl p-7 bg-gradient-to-b from-neutral-900/90 via-black to-neutral-950/90 border-2 border-emerald-500/40 backdrop-blur-xl shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:shadow-[0_0_45px_rgba(16,185,129,0.3)] hover:scale-102 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/20 transition-colors" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
              <Gift className="w-7 h-7" />
            </div>
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">
              EVERY PARTICIPANT
            </span>
            <h4 className="text-2xl font-black text-white mt-1">All Attendees Perks 🎁</h4>
            <p className="text-xs text-zinc-300 font-light mt-3 leading-relaxed">
              Official Hacktoberfest Digital Certificates, offline sprint stickers, access to dev community groups, hands-on git mentorship, and networking refreshments.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/10 font-mono text-xs text-emerald-300 flex items-center justify-between">
            <span>100% Guaranteed</span>
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
