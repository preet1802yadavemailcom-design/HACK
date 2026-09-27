'use client';

import React from 'react';
import Link from 'next/link';
import { soundEngine } from '@/lib/audio';
import { X, Clock, Sparkles, MessageSquare, Zap, Shield, ArrowRight, Bell } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
      <div className="relative w-full max-w-lg p-7 sm:p-9 rounded-3xl bg-gradient-to-b from-neutral-900/95 via-black to-neutral-950 border-2 border-amber-400/50 shadow-[0_0_80px_rgba(245,158,11,0.35)] text-white text-center overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Status Indicator */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold uppercase tracking-widest mb-5 shadow-md animate-pulse">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>PORTAL ACTIVATING SOON</span>
        </div>

        {/* Official College Seal */}
        <div className="w-20 h-20 mx-auto rounded-full bg-white p-1 border-2 border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.5)] mb-5 flex items-center justify-center">
          <img
            src="/pit-logo.png"
            alt="Prasad Institute of Technology Logo"
            className="w-full h-full object-contain rounded-full"
          />
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
          REGISTRATIONS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 drop-shadow-md">
            OPENING SHORTLY!
          </span>
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm text-zinc-300 font-light leading-relaxed max-w-md mx-auto">
          Prasad Institute of Technology ke students ke liye official in-person registration form abhi finalize ho raha hai. Total seats <span className="text-amber-400 font-bold">100 offline auditorium passes</span> tak strictly limited hain.
        </p>

        {/* Micro Notice Box */}
        <div className="mt-6 p-4 rounded-2xl bg-black/70 border border-white/10 text-xs font-mono text-left space-y-2">
          <div className="flex items-center justify-between text-zinc-400 pb-2 border-b border-white/5">
            <span className="uppercase text-[10px]">EVENT DATE:</span>
            <span className="text-white font-bold">Saturday, Oct 24, 2026</span>
          </div>
          <div className="flex items-center justify-between text-zinc-400 pb-2 border-b border-white/5">
            <span className="uppercase text-[10px]">CAMPUS VENUE:</span>
            <span className="text-amber-300 font-bold">PIT Auditorium, Jaunpur</span>
          </div>
          <div className="flex items-center justify-between text-zinc-400">
            <span className="uppercase text-[10px]">SLOT RESERVATION:</span>
            <span className="text-emerald-400 font-bold">VIP Pass Holders Get Priority</span>
          </div>
        </div>

        {/* Action Buttons: 1. Create VIP Passport First, 2. WhatsApp Notification */}
        <div className="mt-7 space-y-3">
          {/* Create VIP Pass First (Immediate Action!) */}
          <Link
            href="/badge"
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-mono font-black text-xs uppercase tracking-wider shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>⚡ Claim VIP Hacker Passport &amp; Poster First</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* WhatsApp Direct Notification */}
          <a
            href="https://wa.me/916306588533?text=Hi%20Shubhasheesh%20Sir%2C%20please%20notify%20me%20when%20Hacktoberfest%20PIT%20registrations%20open%21"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playClick()}
            className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Notify Me on WhatsApp for First Access</span>
          </a>
        </div>

        <p className="mt-4 text-[10px] font-mono text-zinc-500">
          Prasad Institute of Technology • Department of Computer Science &amp; Engineering
        </p>
      </div>
    </div>
  );
}
