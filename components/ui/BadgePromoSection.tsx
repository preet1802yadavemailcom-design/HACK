'use client';

import React from 'react';
import Link from 'next/link';
import { soundEngine } from '@/lib/audio';
import { Sparkles, ArrowRight, Shield, Zap, Flame, Cpu, Smartphone } from 'lucide-react';

export default function BadgePromoSection() {
  return (
    <section className="relative w-full py-16 px-4 max-w-5xl mx-auto z-20 pointer-events-auto">
      <div className="relative rounded-3xl bg-gradient-to-r from-amber-500/15 via-neutral-900/95 to-emerald-500/15 border-2 border-amber-400/40 p-8 sm:p-12 backdrop-blur-2xl shadow-[0_0_60px_rgba(245,158,11,0.25)] overflow-hidden group">
        {/* Glow ambient circles */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-500/25 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-emerald-500/25 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Text Content */}
          <div className="md:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-400/40 text-xs font-mono font-bold uppercase tracking-wider shadow-md">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>COLLEGE SWAG SPOTLIGHT</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              CLAIM YOUR VIP <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.5)]">
                HACKER PASSPORT
              </span>
            </h2>

            <p className="text-sm text-zinc-300 font-light leading-relaxed max-w-lg">
              Dikhaye apna tech swag poore college ko! Upload your photo, pick your viral hacker title, and get an authentic <span className="text-amber-400 font-bold">PIT Campus 1080×1920 WhatsApp Status Poster</span> and 3D Holographic VIP Pass that will make everyone ask for your link.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-zinc-300">
              <span className="px-3 py-1.5 rounded-xl bg-black/60 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5 shadow-md">
                <Shield className="w-3.5 h-3.5" />
                <span>PIT Campus Exclusive</span>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-black/60 border border-amber-500/30 text-amber-300 flex items-center gap-1.5 shadow-md">
                <Smartphone className="w-3.5 h-3.5" />
                <span>WhatsApp Status Ready (9:16)</span>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-black/60 border border-cyan-500/30 text-cyan-300 flex items-center gap-1.5 shadow-md">
                <Zap className="w-3.5 h-3.5" />
                <span>Level 99 Hacker Titles</span>
              </span>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/badge"
                onClick={() => soundEngine.playClick()}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-mono font-black text-xs uppercase tracking-wider shadow-[0_0_35px_rgba(245,158,11,0.6)] hover:shadow-[0_0_50px_rgba(245,158,11,0.9)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>⚡ Create Your VIP Passport Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Visual Mini 9:16 Mockup with Campus Photo Preview */}
          <div className="md:col-span-5 flex justify-center">
            <Link
              href="/badge"
              onClick={() => soundEngine.playClick()}
              className="group block relative w-full max-w-[280px] rounded-3xl p-4 bg-gradient-to-b from-neutral-900 via-black to-neutral-950 border-2 border-amber-400/60 shadow-[0_0_50px_rgba(245,158,11,0.35)] transition-all group-hover:scale-105 group-hover:rotate-1 overflow-hidden"
            >
              {/* Campus Photo Background Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none"
                style={{ backgroundImage: "url('/pit-campus.png')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black/95 pointer-events-none" />

              {/* Lanyard Strap Header */}
              <div className="relative z-10 w-16 h-3 mx-auto rounded-b-md bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 mb-2 shadow-md flex items-center justify-center">
                <div className="w-8 h-1 rounded-full bg-black/60" />
              </div>

              <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/10">
                <div className="w-7 h-5 rounded bg-gradient-to-tr from-amber-300 to-amber-600 flex items-center justify-center shadow">
                  <Cpu className="w-3 h-3 text-black" />
                </div>
                <div className="text-right">
                  <span className="text-[8px] font-mono text-zinc-400 uppercase block">PIT JAUNPUR</span>
                  <span className="text-[10px] font-mono font-black text-amber-400">LEVEL 99 VIP</span>
                </div>
              </div>

              <div className="relative z-10 py-3 flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl p-1 bg-gradient-to-tr from-amber-400 via-yellow-300 to-emerald-400 shadow-xl mb-2">
                  <div className="w-full h-full rounded-xl bg-neutral-950 flex flex-col items-center justify-center font-mono text-[9px] text-amber-300">
                    <Sparkles className="w-5 h-5 text-amber-400 mb-0.5 animate-spin" />
                    <span>YOUR PHOTO</span>
                  </div>
                </div>
                <span className="text-base font-black text-white font-sans tracking-tight">ADITYA SHARMA</span>
                <span className="text-[10px] font-mono text-amber-300 font-semibold mt-0.5">
                  10x PIT Full-Stack Ninja ⚔️
                </span>
                <span className="text-[9px] font-mono text-zinc-400 mt-1">
                  CSE • 3rd Year • Oct 24, 2026
                </span>
              </div>

              <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[8px] font-mono">
                <span className="text-emerald-400 font-bold">● VERIFIED PIT STUDENT</span>
                <span className="text-amber-400 font-bold">#PIT-HKTB-2026</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
