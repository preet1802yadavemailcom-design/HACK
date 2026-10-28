'use client';

import React, { useState } from 'react';
import {
  Trophy, Award, Crown, Sparkles, Star, Medal, Zap, CheckCircle2,
  Users, Volume2, ShieldCheck, Flame, Compass, Gift, ArrowRight,
  ExternalLink, HeartHandshake, Eye, Flag, ChevronRight
} from 'lucide-react';
import { soundEngine } from '@/lib/audio';

export default function GrandAwardCeremonySection() {
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const [activeTab, setActiveTab] = useState<'podium' | 'categories' | 'jury'>('podium');

  const triggerCeremonyHype = () => {
    soundEngine.playCeremonyFanfare();
    setHasCelebrated(true);
    // Reset pulse after 4s so user can re-trigger
    setTimeout(() => setHasCelebrated(false), 4500);
  };

  return (
    <section id="ceremony" className="relative w-full py-24 px-4 max-w-6xl mx-auto z-20 pointer-events-auto">
      {/* ── Ambient Royal Lighting & Glow ───────────────────────────── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-amber-500/25 via-yellow-400/20 to-emerald-500/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Section Header ─────────────────────────────────────────── */}
      <div className="text-center max-w-4xl mx-auto mb-16 relative z-10">
        {/* Crown Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/25 via-yellow-400/20 to-amber-500/25 border border-amber-400/50 text-amber-300 font-mono text-xs sm:text-sm font-black uppercase tracking-widest mb-4 shadow-[0_0_35px_rgba(245,158,11,0.35)] animate-pulse">
          <Crown className="w-4 h-4 sm:w-5 h-5 text-amber-400" />
          <span>ARE YOU READY FOR THE GRAND FINALE?</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>

        {/* Main Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-sans font-black tracking-tight text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.25)]">
          THE GRAND <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 drop-shadow-[0_0_50px_rgba(245,158,11,0.6)]">
            AWARD CEREMONY
          </span>
        </h2>

        <p className="mt-5 text-base sm:text-xl text-zinc-200 font-light max-w-3xl mx-auto leading-relaxed">
          The code freeze is in effect. The evaluation jury has graded 35+ project repos. <br className="hidden sm:inline" />
          Join us at the <span className="text-amber-400 font-bold">PIT Main Campus Auditorium</span> as we unveil the Champions, Trailblazers, and Innovators of Hacktoberfest Hack Day Jaunpur 2026!
        </p>

        {/* Interactive "ARE YOU READY?" Fanfare Trigger */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={triggerCeremonyHype}
            className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-mono font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-2xl overflow-hidden ${
              hasCelebrated
                ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-black scale-105 shadow-[0_0_60px_rgba(16,185,129,0.7)]'
                : 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black hover:scale-105 active:scale-95 shadow-[0_0_45px_rgba(245,158,11,0.5)]'
            }`}
          >
            <Trophy className="w-5 h-5 text-black group-hover:rotate-12 transition-transform duration-300" />
            <span>{hasCelebrated ? '🎉 FELICITATIONS IN PROGRESS!' : '🎺 ARE YOU READY? CLICK FOR CEREMONY FANFARE!'}</span>
            <Sparkles className="w-4 h-4 text-black animate-spin" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          <a
            href="#schedule"
            onClick={() => soundEngine.playClick()}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-black/75 hover:bg-black/90 text-zinc-200 border border-white/20 hover:border-amber-400/60 font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-xl transition-all cursor-pointer"
          >
            <span>Stage Protocol &amp; Timings</span>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </a>
        </div>

        {/* Stage Status Strip */}
        <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 p-3 sm:p-4 rounded-2xl bg-black/85 border border-white/10 backdrop-blur-2xl text-xs font-mono text-zinc-300 shadow-xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-white font-bold">125+ Builders Registered</span>
          </div>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-300 font-bold">6 Grand Honor Categories</span>
          </div>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-cyan-300 font-bold">Verified MLH Recognition</span>
          </div>
        </div>
      </div>

      {/* ── Tab Switcher ────────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-2 mb-12 relative z-10">
        <button
          onClick={() => { soundEngine.playClick(); setActiveTab('podium'); }}
          className={`px-5 py-2.5 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'podium'
              ? 'bg-amber-500 text-black shadow-[0_0_25px_rgba(245,158,11,0.4)] scale-105'
              : 'bg-black/60 text-zinc-400 hover:text-white border border-white/10'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>The Champions Podium</span>
        </button>

        <button
          onClick={() => { soundEngine.playClick(); setActiveTab('categories'); }}
          className={`px-5 py-2.5 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'categories'
              ? 'bg-amber-500 text-black shadow-[0_0_25px_rgba(245,158,11,0.4)] scale-105'
              : 'bg-black/60 text-zinc-400 hover:text-white border border-white/10'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Track &amp; Special Awards</span>
        </button>

        <button
          onClick={() => { soundEngine.playClick(); setActiveTab('jury'); }}
          className={`px-5 py-2.5 rounded-xl font-mono text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'jury'
              ? 'bg-amber-500 text-black shadow-[0_0_25px_rgba(245,158,11,0.4)] scale-105'
              : 'bg-black/60 text-zinc-400 hover:text-white border border-white/10'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Jury &amp; Evaluation Rigor</span>
        </button>
      </div>

      {/* ── 1. THE CHAMPIONS PODIUM (ROYAL 3D STAGE) ───────────────── */}
      {activeTab === 'podium' && (
        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            
            {/* 🥈 SECOND PLACE: 1st Runner-Up (Left, Order 2 on mobile, Order 1 on Desktop) */}
            <div className="lg:col-span-4 order-2 lg:order-1">
              <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-neutral-900/90 via-black to-neutral-950 border-2 border-slate-400/40 shadow-[0_0_45px_rgba(148,163,184,0.15)] backdrop-blur-2xl text-center group hover:border-slate-300 transition-all duration-300">
                {/* Silver Crest */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-slate-200 via-slate-400 to-slate-600 p-0.5 shadow-[0_0_30px_rgba(203,213,225,0.4)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-full h-full rounded-[14px] bg-neutral-950 flex items-center justify-center">
                    <Medal className="w-8 h-8 text-slate-300" />
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-slate-400/15 border border-slate-400/40 text-slate-300 font-mono text-[10px] font-bold uppercase tracking-widest inline-block mb-2">
                  🥈 2ND PLACE
                </span>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                  1ST RUNNER-UP
                </h3>
                <p className="text-xs text-zinc-400 font-light mt-1">
                  High Merit &amp; Exceptional Execution
                </p>

                {/* Prize Breakdown */}
                <div className="mt-6 pt-5 border-t border-white/10 space-y-2.5 text-left text-xs font-mono">
                  <div className="flex items-start gap-2 text-zinc-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-300 flex-shrink-0 mt-0.5" />
                    <span>Official 1st Runner-Up Silver Trophy</span>
                  </div>
                  <div className="flex items-start gap-2 text-zinc-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-300 flex-shrink-0 mt-0.5" />
                    <span>Certificate of High Merit &amp; Excellence</span>
                  </div>
                  <div className="flex items-start gap-2 text-zinc-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-300 flex-shrink-0 mt-0.5" />
                    <span>MLH Official Runner-Up Swag Kit</span>
                  </div>
                  <div className="flex items-start gap-2 text-zinc-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-300 flex-shrink-0 mt-0.5" />
                    <span>Developer Cloud Credits &amp; Tools</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 🥇 FIRST PLACE: Grand Champion (Center, Elevated & Shining Gold) */}
            <div className="lg:col-span-4 order-1 lg:order-2 -mt-4 lg:-mt-10">
              <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-amber-950/80 via-black to-neutral-950 border-2 border-amber-400 shadow-[0_0_80px_rgba(245,158,11,0.45)] backdrop-blur-2xl text-center group hover:scale-[1.02] transition-all duration-300 overflow-hidden">
                {/* Radiant Backdrop Beacon */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

                {/* Top Champion Ribbon */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-500 text-black font-mono text-[9px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
                  <Star className="w-3 h-3 fill-black text-black" />
                  <span>THE PINNACLE</span>
                </div>

                {/* Gold Trophy Crown */}
                <div className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-600 p-0.5 shadow-[0_0_50px_rgba(245,158,11,0.7)] flex items-center justify-center group-hover:rotate-6 transition-transform">
                  <div className="w-full h-full rounded-[22px] bg-neutral-950 flex items-center justify-center">
                    <Trophy className="w-12 h-12 text-amber-400 animate-pulse" />
                  </div>
                </div>

                <span className="px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/60 text-amber-300 font-mono text-xs font-black uppercase tracking-widest inline-block mb-2">
                  👑 OVERALL WINNER • 1ST PLACE
                </span>

                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  GRAND CHAMPION
                </h3>
                <p className="text-xs sm:text-sm text-amber-200/90 font-light mt-1">
                  Highest Overall Score Across Architecture, Innovation, Utility &amp; Presentation
                </p>

                {/* Prize Breakdown */}
                <div className="mt-6 pt-6 border-t border-amber-500/30 space-y-3 text-left text-xs font-mono">
                  <div className="flex items-start gap-2.5 text-white font-bold">
                    <Crown className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Grand Champion Golden Cup Trophy</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-zinc-100">
                    <Award className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Gold Certificate of Institutional Distinction</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-zinc-100">
                    <Gift className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>VIP MLH Winner Swag Bags &amp; Goodies</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-zinc-100">
                    <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Sponsor Bounties &amp; Cloud Infrastructure</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-emerald-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Permanent Induction into PIT CSE Hall of Fame</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 🥉 THIRD PLACE: 2nd Runner-Up (Right, Order 3) */}
            <div className="lg:col-span-4 order-3">
              <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-neutral-900/90 via-black to-neutral-950 border-2 border-amber-700/40 shadow-[0_0_45px_rgba(180,83,9,0.15)] backdrop-blur-2xl text-center group hover:border-amber-600 transition-all duration-300">
                {/* Bronze Crest */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 p-0.5 shadow-[0_0_30px_rgba(217,119,6,0.3)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-full h-full rounded-[14px] bg-neutral-950 flex items-center justify-center">
                    <Medal className="w-8 h-8 text-amber-500" />
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-amber-700/20 border border-amber-700/40 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-widest inline-block mb-2">
                  🥉 3RD PLACE
                </span>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                  2ND RUNNER-UP
                </h3>
                <p className="text-xs text-zinc-400 font-light mt-1">
                  Remarkable Engineering &amp; Teamwork
                </p>

                {/* Prize Breakdown */}
                <div className="mt-6 pt-5 border-t border-white/10 space-y-2.5 text-left text-xs font-mono">
                  <div className="flex items-start gap-2 text-zinc-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Official 2nd Runner-Up Bronze Trophy</span>
                  </div>
                  <div className="flex items-start gap-2 text-zinc-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Certificate of Merit &amp; Innovation</span>
                  </div>
                  <div className="flex items-start gap-2 text-zinc-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>MLH Official Hackathon Swag Pack</span>
                  </div>
                  <div className="flex items-start gap-2 text-zinc-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>Developer Vouchers &amp; Credits</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── 2. TRACK & SPECIAL RECOGNITION AWARDS ──────────────────── */}
      {activeTab === 'categories' && (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Category 1 */}
          <div className="p-6 rounded-3xl bg-black/80 border border-emerald-500/40 backdrop-blur-xl shadow-xl hover:border-emerald-400 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
              OPEN SOURCE TRACK
            </span>
            <h4 className="text-lg font-bold text-white mt-1">
              Best Open-Source Impact &amp; PR Sprint
            </h4>
            <p className="text-xs text-zinc-300 font-light mt-2 leading-relaxed">
              Awarded to the squad that delivered the most impactful contributions, pull requests, and bug resolutions to upstream open-source repositories.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-emerald-300 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Track Winner Trophy &amp; Certificate</span>
            </div>
          </div>

          {/* Category 2 */}
          <div className="p-6 rounded-3xl bg-black/80 border border-cyan-500/40 backdrop-blur-xl shadow-xl hover:border-cyan-400 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
              WEB &amp; CLOUD TRACK
            </span>
            <h4 className="text-lg font-bold text-white mt-1">
              Best Full-Stack Architecture &amp; Utility
            </h4>
            <p className="text-xs text-zinc-300 font-light mt-2 leading-relaxed">
              Recognizing the most production-ready, beautifully deployed web product that solves real-world campus or societal problems.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-cyan-300 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Track Winner Trophy &amp; Certificate</span>
            </div>
          </div>

          {/* Category 3 */}
          <div className="p-6 rounded-3xl bg-black/80 border border-purple-500/40 backdrop-blur-xl shadow-xl hover:border-purple-400 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/50 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-400">
              AI &amp; AGENT TRACK
            </span>
            <h4 className="text-lg font-bold text-white mt-1">
              Most Innovative AI &amp; Intelligent System
            </h4>
            <p className="text-xs text-zinc-300 font-light mt-2 leading-relaxed">
              Honoring breakthrough implementations of LLMs, agentic workflows, local AI models, or automated tooling.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-purple-300 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Track Winner Trophy &amp; Certificate</span>
            </div>
          </div>

          {/* Category 4 */}
          <div className="p-6 rounded-3xl bg-black/80 border border-amber-500/40 backdrop-blur-xl shadow-xl hover:border-amber-400 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <Star className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
              DESIGN &amp; CRAFTSMANSHIP
            </span>
            <h4 className="text-lg font-bold text-white mt-1">
              Best UI/UX Design &amp; Aesthetics
            </h4>
            <p className="text-xs text-zinc-300 font-light mt-2 leading-relaxed">
              For the interface that wowed the jury with responsive design, intuitive usability, animations, and micro-interactions.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-amber-300 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Special Distinction &amp; Certificate</span>
            </div>
          </div>

          {/* Category 5 */}
          <div className="p-6 rounded-3xl bg-black/80 border border-rose-500/40 backdrop-blur-xl shadow-xl hover:border-rose-400 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-400/50 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
              <Crown className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-rose-400">
              FRESH TALENT SPOTLIGHT
            </span>
            <h4 className="text-lg font-bold text-white mt-1">
              Rising Star / Best First-Year Squad
            </h4>
            <p className="text-xs text-zinc-300 font-light mt-2 leading-relaxed">
              Special jury award celebrating first-time hackathon attendees who showed phenomenal courage, learning agility, and determination.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-rose-300 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Emerging Builders Trophy</span>
            </div>
          </div>

          {/* Category 6 */}
          <div className="p-6 rounded-3xl bg-black/80 border border-yellow-500/40 backdrop-blur-xl shadow-xl hover:border-yellow-400 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 border border-yellow-400/50 flex items-center justify-center text-yellow-400 mb-4 group-hover:scale-110 transition-transform">
              <Gift className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-yellow-400">
              ALL PARTICIPANTS
            </span>
            <h4 className="text-lg font-bold text-white mt-1">
              Official Participation Accolade
            </h4>
            <p className="text-xs text-zinc-300 font-light mt-2 leading-relaxed">
              Every confirmed hacker receives an authentic Certificate of Participation issued by the Department of CSE &amp; Major League Hacking partners.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-yellow-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Certificate for 125+ Attendees</span>
            </div>
          </div>
        </div>
      )}

      {/* ── 3. EVALUATION JURY & RIGOR ──────────────────────────────── */}
      {activeTab === 'jury' && (
        <div className="relative z-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="p-5 rounded-2xl bg-black/80 border border-white/10">
              <span className="text-3xl font-mono font-black text-amber-400">30%</span>
              <p className="text-xs font-bold text-white uppercase mt-1">Code Quality &amp; Architecture</p>
              <p className="text-[11px] text-zinc-400 mt-1">Clean Git commits, modular code, error handling &amp; efficiency.</p>
            </div>
            <div className="p-5 rounded-2xl bg-black/80 border border-white/10">
              <span className="text-3xl font-mono font-black text-emerald-400">25%</span>
              <p className="text-xs font-bold text-white uppercase mt-1">Innovation &amp; Originality</p>
              <p className="text-[11px] text-zinc-400 mt-1">Creative problem-solving and novelty of concept.</p>
            </div>
            <div className="p-5 rounded-2xl bg-black/80 border border-white/10">
              <span className="text-3xl font-mono font-black text-cyan-400">25%</span>
              <p className="text-xs font-bold text-white uppercase mt-1">Real-World Utility</p>
              <p className="text-[11px] text-zinc-400 mt-1">Practical value to students, college, or open-source community.</p>
            </div>
            <div className="p-5 rounded-2xl bg-black/80 border border-white/10">
              <span className="text-3xl font-mono font-black text-purple-400">20%</span>
              <p className="text-xs font-bold text-white uppercase mt-1">Live Demo &amp; Q&amp;A Defense</p>
              <p className="text-[11px] text-zinc-400 mt-1">Clarity of presentation, live prototype proof, and answering jury queries.</p>
            </div>
          </div>

          {/* Evaluator Panel Mention */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-black to-neutral-900 border border-amber-500/30 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Users className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white">
                Evaluated by Distinguished Faculty &amp; Industry Coordinators
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                Led by <span className="text-amber-400 font-semibold">Shubhashish Kundu Sir</span> (Faculty Coordinator) and <span className="text-amber-400 font-semibold">Preet Yadav</span> (Lead Student Organizer), alongside senior reviewers from the Department of Computer Science &amp; Engineering.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Ceremony Banner Footer ─────────────────────────────────── */}
      <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-950 via-amber-950/40 to-neutral-950 border border-amber-500/40 text-center relative z-10">
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide">
          BE SEATED IN THE AUDITORIUM FOR THE LIVE CEREMONY
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto font-light">
          All 125+ attendees are requested to be present for the announcement of results, trophy handovers, and the official Hacktoberfest community group photo!
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://chat.whatsapp.com/JFsE2mm3c8l4wnnwjYI9Th"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playClick()}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg"
          >
            <span>Join WhatsApp Community for Live Updates</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="/login"
            onClick={() => soundEngine.playClick()}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 border border-white/20"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>View Your Ticket ID &amp; Squad</span>
          </a>
        </div>
      </div>
    </section>
  );
}
