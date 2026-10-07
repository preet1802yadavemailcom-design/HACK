'use client';

import React, { useState } from 'react';
import {
  Trophy, Gift, Award, Sparkles, ShieldCheck, Flame, Star, Zap,
  ExternalLink, Download, Maximize2, X, Cpu, Globe, Rocket,
  CheckCircle2, HeartHandshake, Layers, Tag, Bell
} from 'lucide-react';
import { soundEngine } from '@/lib/audio';

export default function PrizesSection() {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  return (
    <section id="prizes" className="relative w-full py-20 px-4 max-w-6xl mx-auto z-20 pointer-events-auto">
      {/* ── Section Ambient Glows ──────────────────────────────────── */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-80 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* ── Section Header ────────────────────────────────────────── */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider mb-4 shadow-[0_0_25px_rgba(245,158,11,0.25)]">
          <Trophy className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>OFFICIAL PRIZES &amp; SWAG SHOWCASE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          PRIZES, SWAG &amp; SPONSOR PERKS 🎁
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
          In official collaboration with <span className="text-amber-400 font-semibold">Major League Hacking (MLH)</span> &amp; <span className="text-white font-semibold">Prasad Institute of Technology</span>. Check out the official swags, hardware kits, developer cloud credits, and challenge bounties awaiting our hackers!
        </p>
      </div>

      {/* ── 1. OFFICIAL MLH PRIZE POSTER SHOWCASE CARD ─────────────── */}
      <div className="relative mb-14 rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-neutral-900/95 via-black to-neutral-950/95 border-2 border-amber-500/50 shadow-[0_0_80px_rgba(245,158,11,0.25)] backdrop-blur-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Poster Card with Zoom Trigger */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              onClick={() => { soundEngine.playClick(); setIsZoomOpen(true); }}
              className="group relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-[0_0_50px_rgba(245,158,11,0.35)] cursor-pointer bg-neutral-950"
            >
              <img
                src="/mlh-prizes-poster.jpg"
                alt="Hacktoberfest Hack Day Jaunpur MLH Hackathon Prizes Official Poster"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover Overlay with Action Pill */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 backdrop-blur-xs p-4 text-center">
                <span className="p-3 rounded-full bg-amber-500 text-black shadow-lg scale-90 group-hover:scale-100 transition-transform">
                  <Maximize2 className="w-6 h-6" />
                </span>
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider bg-black/80 px-3.5 py-1.5 rounded-full border border-amber-400/50">
                  Click to View Full Poster 🔍
                </span>
              </div>

              {/* Top Banner Tag */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 border border-amber-400/50 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-md">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>OFFICIAL MLH SHEET</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 w-full max-w-md">
              <button
                onClick={() => { soundEngine.playClick(); setIsZoomOpen(true); }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/15 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Enlarge Poster</span>
              </button>
              <a
                href="/mlh-prizes-poster.jpg"
                download="Hacktoberfest_MLH_Prizes_Poster.jpg"
                onClick={() => soundEngine.playClick()}
                className="py-2.5 px-4 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>
          </div>

          {/* Right Column: Key Prize Highlights from the Official Sheet */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFFICIAL ANNOUNCED REWARDS</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Major League Hacking Prizes &amp; Exclusive Sponsor Goodies
            </h3>

            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              Every participant checking in at Prasad Institute of Technology on <span className="text-amber-400 font-semibold">Saturday, October 24, 2026</span> is eligible for global perks, hardware challenges, and partner credits!
            </p>

            {/* Quick Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-black/60 border border-amber-500/30 shadow-md">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase mb-1">
                  <Trophy className="w-4 h-4" />
                  <span>Up to 8 MLH Belt Bags</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Awarded across 2 main challenges: <span className="text-white font-medium">Best Open-Source AI Project</span> (4 Belt Bags) &amp; <span className="text-white font-medium">Gemma Challenge</span> (4 Belt Bags).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 shadow-md">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase mb-1">
                  <Globe className="w-4 h-4" />
                  <span>Free .xyz Domain (1 Year)</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Every hacker who completes in-person check-in receives a free custom <span className="text-white font-medium">.xyz domain</span> to host and showcase their hackathon projects!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-cyan-500/30 shadow-md">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase mb-1">
                  <Cpu className="w-4 h-4" />
                  <span>Hardware &amp; Physical Swag</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  <span className="text-white font-medium">Arduino microcontrollers</span> for IoT builds, official MLH T-Shirts, die-cut vinyl stickers &amp; collector info cards.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-purple-500/30 shadow-md">
                <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold uppercase mb-1">
                  <Zap className="w-4 h-4" />
                  <span>$65+ Cloud &amp; AI Credits</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  $50 Render cloud credit, 3 Months ElevenLabs Creator plan, $10 Tinker API credit, and $5 Backboard developer balance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. FULL PRIZE CATEGORIES BREAKDOWN GRID ───────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Card 1: Challenge Champions */}
        <div className="relative rounded-3xl p-7 bg-gradient-to-b from-neutral-900/90 via-black to-neutral-950/90 border-2 border-amber-500/50 backdrop-blur-xl shadow-[0_0_40px_rgba(245,158,11,0.2)] hover:shadow-[0_0_60px_rgba(245,158,11,0.35)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/50 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
              <Trophy className="w-7 h-7" />
            </div>
            <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest block font-bold">
              PODIUM &amp; CHALLENGE WINNERS
            </span>
            <h4 className="text-2xl font-black text-white mt-1">Podium Honors &amp; Belt Bags 🏆</h4>
            <ul className="mt-4 space-y-2 text-xs text-zinc-300 font-light leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Up to 8 MLH Belt Bags:</strong> Top open-source AI &amp; Gemma sprint teams</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Champion Trophies:</strong> Gold, Silver &amp; Bronze honors by CSE Dept</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">College Spotlight:</strong> Featured on Prasad Institute of Technology portals</span>
              </li>
            </ul>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 font-mono text-xs text-amber-300 flex items-center justify-between">
            <span>Official Recognition</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          </div>
        </div>

        {/* Card 2: Developer Cloud & AI Bounty Packs */}
        <div className="relative rounded-3xl p-7 bg-gradient-to-b from-neutral-900/90 via-black to-neutral-950/90 border-2 border-purple-500/40 backdrop-blur-xl shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:shadow-[0_0_50px_rgba(168,85,247,0.3)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-400/50 text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
              <Zap className="w-7 h-7" />
            </div>
            <span className="text-[11px] font-mono text-purple-400 uppercase tracking-widest block font-bold">
              SPONSOR CREDITS &amp; INFRASTRUCTURE
            </span>
            <h4 className="text-2xl font-black text-white mt-1">Cloud &amp; AI Stack Credits ⚡</h4>
            <ul className="mt-4 space-y-2 text-xs text-zinc-300 font-light leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">$50 Render Credits:</strong> Deploy web services, PostgreSQL, and full-stack apps</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">3 Months ElevenLabs Creator:</strong> Ultra-realistic voice AI synthesis</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">$10 Tinker &amp; $5 Backboard:</strong> AI modeling and serverless developer credits</span>
              </li>
            </ul>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 font-mono text-xs text-purple-300 flex items-center justify-between">
            <span>Direct Sponsor Codes</span>
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          </div>
        </div>

        {/* Card 3: All Participants Perks */}
        <div className="relative rounded-3xl p-7 bg-gradient-to-b from-neutral-900/90 via-black to-neutral-950/90 border-2 border-emerald-500/40 backdrop-blur-xl shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:shadow-[0_0_50px_rgba(16,185,129,0.3)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
              <Gift className="w-7 h-7" />
            </div>
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">
              ALL 125+ ATTENDEES
            </span>
            <h4 className="text-2xl font-black text-white mt-1">100% Guaranteed Swag &amp; Certs 🎖️</h4>
            <ul className="mt-4 space-y-2 text-xs text-zinc-300 font-light leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Free .xyz Domain (1 Year):</strong> Custom domain for every checked-in hacker</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">MLH &amp; College Certs:</strong> Official digital credentials &amp; virtual stickers</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Refreshments &amp; Mentorship:</strong> In-person food, snacks, and faculty git support</span>
              </li>
            </ul>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 font-mono text-xs text-emerald-300 flex items-center justify-between">
            <span>Guaranteed For Everyone</span>
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* ── 3. EXCLUSIVE TEASER BANNER (VERBATIM TEXT AS REQUESTED) ── */}
      <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-amber-950/50 via-neutral-900/95 to-yellow-950/50 border-2 border-amber-500/70 shadow-[0_0_80px_rgba(245,158,11,0.35)] backdrop-blur-2xl text-center overflow-hidden">
        {/* Animated aura background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/60 text-amber-300 font-mono text-xs font-bold uppercase tracking-widest shadow-lg">
            <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>EXCLUSIVE SPONSOR UPDATE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          </div>

          <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-[0_0_35px_rgba(245,158,11,0.4)]">
            Something Special Is Coming Soon!
          </h3>

          <p className="text-lg sm:text-xl font-bold text-amber-300 tracking-wide">
            But wait… there’s more! 👀🔥
          </p>

          <div className="space-y-3 text-sm sm:text-base text-zinc-200 font-normal leading-relaxed text-left sm:text-center max-w-2xl mx-auto pt-2">
            <p>
              We’re currently working on bringing additional sponsors and exclusive benefits for our participants and team members.
            </p>
            <p className="text-amber-200 font-medium">
              🎁 More sponsor rewards &amp; goodies may be added soon, including benefits for participating teams.
            </p>
            <p className="text-zinc-300">
              🤝 The exact rewards will depend on the sponsors and their available offerings.
            </p>
            <p className="text-zinc-300">
              📢 All confirmed sponsor benefits will be officially revealed soon.
            </p>
            <p className="text-amber-400 font-bold text-base pt-2">
              So stay tuned… more surprises are on the way! 🚀✨
            </p>
          </div>

          <div className="pt-4 border-t border-amber-500/30 flex flex-col items-center justify-center gap-1.5 font-mono text-xs text-zinc-400">
            <span className="text-white font-bold tracking-wide">
              Hacktoberfest Hack Day Jaunpur × Prasad Institute of Technology
            </span>
            <span className="text-amber-400 font-semibold tracking-wider">
              Build • Learn • Collaborate • Win 💻🔥
            </span>
          </div>
        </div>
      </div>

      {/* ── 4. FULL-SCREEN POSTER ZOOM MODAL ───────────────────────── */}
      {isZoomOpen && (
        <div
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-fadeIn cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[92vh] w-full rounded-3xl overflow-hidden border-2 border-amber-400/80 shadow-[0_0_100px_rgba(245,158,11,0.5)] bg-black flex flex-col items-center cursor-default"
          >
            {/* Modal Top Bar */}
            <div className="w-full px-5 py-3.5 bg-neutral-900 border-b border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-amber-400 font-bold flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                <span>OFFICIAL MLH HACKATHON PRIZES &amp; SWAG SHEET</span>
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="/mlh-prizes-poster.jpg"
                  download="Hacktoberfest_MLH_Prizes_Poster.jpg"
                  onClick={() => soundEngine.playClick()}
                  className="px-3 py-1 rounded-lg bg-amber-500 text-black font-bold uppercase hover:bg-amber-400 transition-colors flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => { soundEngine.playClick(); setIsZoomOpen(false)} }
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Poster Image */}
            <div className="w-full overflow-y-auto max-h-[calc(92vh-55px)] flex items-center justify-center p-2 bg-neutral-950">
              <img
                src="/mlh-prizes-poster.jpg"
                alt="Hacktoberfest Hack Day Jaunpur MLH Hackathon Prizes Full Sheet"
                className="w-auto h-auto max-h-[85vh] max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
