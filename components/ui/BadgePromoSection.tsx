'use client';

import React from 'react';
import Link from 'next/link';
import { soundEngine } from '@/lib/audio';
import { Sparkles, ArrowRight, Shield, QrCode, Zap, Share2 } from 'lucide-react';

export default function BadgePromoSection() {
  return (
    <section className="relative w-full py-16 px-4 max-w-5xl mx-auto z-20 pointer-events-auto">
      <div className="relative rounded-3xl bg-gradient-to-r from-amber-500/10 via-neutral-900/90 to-emerald-500/10 border-2 border-amber-500/30 p-8 sm:p-12 backdrop-blur-2xl shadow-[0_0_50px_rgba(245,158,11,0.2)] overflow-hidden">
        {/* Glow ambient circle */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Text Content */}
          <div className="md:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NEW: OFFICIAL HACKER PASS GENERATOR</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              CREATE YOUR OFFICIAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200">
                HACKER ID CARD
              </span>
            </h2>

            <p className="text-sm text-zinc-300 font-light leading-relaxed max-w-lg">
              Every Prasad Institute of Technology participant gets a unique 3D holographic digital ID card with photo, department, year, custom hacker archetype, and scannable QR verification.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-zinc-300">
              <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>PIT Students Exclusive</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-amber-400" />
                <span>WhatsApp Status Ready</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ultra-HD PNG Export</span>
              </span>
            </div>

            <div className="pt-4">
              <Link
                href="/badge"
                onClick={() => soundEngine.playClick()}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>⚡ Create Your ID Card Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Visual Mini Badge Preview */}
          <div className="md:col-span-5 flex justify-center">
            <Link
              href="/badge"
              onClick={() => soundEngine.playClick()}
              className="group block relative w-full max-w-[270px] rounded-2xl p-4 bg-gradient-to-b from-neutral-900 to-black border-2 border-amber-400/50 shadow-2xl transition-transform group-hover:scale-105 group-hover:rotate-1"
            >
              {/* Lanyard Hole */}
              <div className="w-12 h-2.5 mx-auto rounded-full bg-black/80 border border-white/20 mb-3" />

              <div className="text-center border-b border-white/10 pb-2">
                <span className="text-[9px] font-mono text-zinc-400 block tracking-widest">PIT JAUNPUR</span>
                <span className="text-xs font-black text-amber-400 font-sans tracking-tight">HACKTOBERFEST 2026</span>
              </div>

              <div className="py-3 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 to-emerald-400 mb-2">
                  <div className="w-full h-full rounded-full bg-neutral-950 flex items-center justify-center font-mono text-[9px] text-amber-300">
                    YOUR PHOTO
                  </div>
                </div>
                <span className="text-sm font-bold text-white font-mono">ADITYA SHARMA</span>
                <span className="text-[10px] font-mono text-amber-300 mt-0.5">⚡ Full-Stack Developer</span>
                <span className="text-[9px] font-mono text-zinc-400 mt-1">CSE • 3rd Year • PIT Campus</span>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[8px] font-mono text-zinc-400">
                <span className="text-emerald-400 font-bold">● VERIFIED PASS</span>
                <span>#PIT-HKTB-2026</span>
              </div>

              {/* Hover Badge Click Tag */}
              <div className="absolute inset-0 bg-black/75 backdrop-blur-xs rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-black font-mono font-bold text-xs uppercase tracking-wider">
                  Open Generator →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
