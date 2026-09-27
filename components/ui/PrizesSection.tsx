'use client';

import React from 'react';
import { Trophy, Gift, Award, Sparkles, Clock, ShieldCheck, Flame, Star } from 'lucide-react';

export default function PrizesSection() {
  return (
    <section id="prizes" className="relative w-full py-20 px-4 max-w-6xl mx-auto z-20 pointer-events-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-3 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>REWARDS &amp; RECOGNITION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          PRIZES, SWAG &amp; PERKS
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-300 font-light max-w-xl mx-auto">
          Every participant at Prasad Institute of Technology gets recognized. Build real projects, get mentored, and compete for top honors.
        </p>
      </div>

      {/* Main Announcement Teaser Banner */}
      <div className="relative mb-12 rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-amber-950/40 via-neutral-900/90 to-yellow-950/40 border-2 border-amber-500/50 shadow-[0_0_60px_rgba(245,158,11,0.25)] backdrop-blur-2xl text-center overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/50 font-mono text-xs font-bold uppercase tracking-widest animate-pulse">
            <Clock className="w-3.5 h-3.5" />
            <span>OFFICIAL REVEAL AT BRIEFING</span>
          </div>

          <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            🏆 PRIZES ANNOUNCING SOON!
          </h3>

          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
            The full prize pool, winner trophies, official certifications, and sponsor bounty perks are currently being finalized with community partners and will be officially unveiled during the <span className="text-amber-400 font-semibold">10:00 AM Keynote Briefing on October 24, 2026</span> in the PIT Auditorium!
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-zinc-300">
            <span className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified by Prasad Institute of Technology</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400" />
              <span>GitHub &amp; Open Source Goodies</span>
            </span>
          </div>
        </div>
      </div>

      {/* Prize Categories Grid Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* First Place Card */}
        <div className="relative rounded-3xl p-6 bg-black/75 border border-amber-500/40 backdrop-blur-xl shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Trophy className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block font-bold">
              TOP PODIUM
            </span>
            <h4 className="text-xl font-bold text-white mt-1">Champion Squad 🥇</h4>
            <p className="text-xs text-zinc-400 font-light mt-2 leading-relaxed">
              Grand Winner Trophy, Gold Winner Certificates of Excellence, exclusive Hacktoberfest contributor swag kits &amp; spotlight on PIT college showcase.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[11px] text-amber-300">
            Details revealed at venue briefing →
          </div>
        </div>

        {/* Runner-Up Card */}
        <div className="relative rounded-3xl p-6 bg-black/75 border border-white/15 backdrop-blur-xl shadow-xl hover:border-white/30 transition-all flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 text-zinc-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
              RUNNER-UP PODIUM
            </span>
            <h4 className="text-xl font-bold text-white mt-1">First &amp; Second Runners-Up 🥈🥉</h4>
            <p className="text-xs text-zinc-400 font-light mt-2 leading-relaxed">
              Silver &amp; Bronze distinction honors, official certificates, and tech swag packs recognizing outstanding sprint implementation.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[11px] text-zinc-400">
            Details revealed at venue briefing →
          </div>
        </div>

        {/* All Participants Card */}
        <div className="relative rounded-3xl p-6 bg-black/75 border border-emerald-500/30 backdrop-blur-xl shadow-xl hover:border-emerald-400 transition-all flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Gift className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">
              EVERY ATTENDEE
            </span>
            <h4 className="text-xl font-bold text-white mt-1">Participant Pass Perks 🎁</h4>
            <p className="text-xs text-zinc-400 font-light mt-2 leading-relaxed">
              Official In-Person Hackathon Certificate for your resume, verified digital hacker passport, campus networking, and hands-on mentor support.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[11px] text-emerald-400">
            Free for all registered PIT students ✓
          </div>
        </div>
      </div>
    </section>
  );
}
