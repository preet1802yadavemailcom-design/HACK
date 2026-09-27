'use client';

import React from 'react';
import { ShieldCheck, Sparkles, Award } from 'lucide-react';

export default function MLHSponsorBanner() {
  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 my-8 z-20 pointer-events-auto">
      <div className="relative rounded-2xl p-4 sm:p-5 bg-neutral-950/85 border border-red-500/30 hover:border-red-500/60 shadow-[0_0_40px_rgba(239,68,68,0.18)] backdrop-blur-2xl flex flex-col sm:flex-row items-center justify-between gap-4 transition-all overflow-hidden group">
        {/* Subtle background red aura */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-red-600/10 rounded-full blur-2xl pointer-events-none group-hover:bg-red-600/20 transition-all" />

        {/* MLH Logo + Partner Tag */}
        <div className="flex items-center gap-4 text-center sm:text-left relative z-10">
          {/* Official MLH SVG Vector Badge */}
          <div className="w-16 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-800 p-2 flex items-center justify-center flex-shrink-0 shadow-lg border border-red-400/40 group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 160 70" className="w-full h-full fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h34.6v70H0V0zm62.7 0h34.6v70H62.7V0zm62.7 0H160v70h-34.6V0z" opacity="0.3"/>
              <text x="50%" y="54" fontSize="48" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#FFFFFF" letterSpacing="4">
                MLH
              </text>
            </svg>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-red-400">
              <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
              <span>OFFICIAL SPONSOR &amp; COMMUNITY PARTNER</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2 justify-center sm:justify-start">
              <span>MAJOR LEAGUE HACKING</span>
              <span className="text-xs font-mono font-normal text-zinc-400 hidden sm:inline">(MLH)</span>
            </h3>
            <p className="text-xs text-zinc-300 font-light mt-0.5">
              Supporting Prasad Institute of Technology hackers with official developer toolkits, workshops &amp; community perks.
            </p>
          </div>
        </div>

        {/* Verified Partner Badge (NO EXTERNAL LINK per user request) */}
        <div className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600/20 via-red-700/20 to-red-800/20 text-red-300 border border-red-500/40 font-mono text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-red-400 animate-spin" />
          <span>Verified Partner</span>
        </div>
      </div>
    </div>
  );
}
