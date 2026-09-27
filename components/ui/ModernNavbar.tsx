'use client';

import React, { useState } from 'react';
import { soundEngine } from '@/lib/audio';
import { Terminal, Volume2, VolumeX, Menu, X, ShieldCheck, Sparkles, Award, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface ModernNavbarProps {
  onOpenRegister: () => void;
}

export default function ModernNavbar({ onOpenRegister }: ModernNavbarProps) {
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted()); // default true (OFF)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const nextMuted = soundEngine.toggleMute();
    setIsMuted(nextMuted);
  };

  const navLinks = [
    { label: 'About', href: '/#about' },
    { label: 'Tracks', href: '/#tracks' },
    { label: '🏆 Prizes', href: '/#prizes' },
    { label: '📚 Resources', href: '/#resources' },
    { label: 'Squads', href: '/#squads' },
    { label: 'Schedule', href: '/#schedule' },
    { label: 'Venue', href: '/#venue' },
    { label: '💬 Contact', href: '/#contact' },
    { label: '⚡ VIP Passport', href: '/badge', isSpecial: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-2.5 bg-black/65 backdrop-blur-2xl border-b border-white/10 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand + Organizer Credits */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm tracking-wider text-white">
                  HACKTOBERFEST
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold uppercase">
                  PIT JAUNPUR
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 -mt-0.5">
                <span>By CSE Dept</span>
                <span>•</span>
                <span className="text-amber-400 font-medium">Preet Yadav</span>
              </div>
            </div>
          </Link>

          {/* MLH Community Partner Tag */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-[10px] font-mono text-red-300">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span>MLH Supported</span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-zinc-300">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => soundEngine.playClick()}
              className={`transition-all ${
                link.isSpecial
                  ? 'px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-400/50 hover:bg-amber-400/30 font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)] animate-pulse'
                  : 'hover:text-amber-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Audio Controller (Default OFF) + CTA */}
        <div className="flex items-center gap-2.5">
          {/* Cyber Ambient BGM Controller */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
              !isMuted
                ? 'bg-amber-500/20 border-amber-400/50 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
            title={isMuted ? 'Turn BGM Music ON' : 'Turn BGM Music OFF'}
            aria-label="Toggle background music"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                <span className="hidden sm:inline text-[10px]">BGM: Off</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                <span className="hidden sm:inline text-[10px] text-amber-300 font-bold">BGM: On 🎵</span>
              </>
            )}
          </button>

          {/* Registration CTA */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenRegister();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Register</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 text-zinc-300 border border-white/10 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 p-4 rounded-2xl bg-black/95 border border-white/15 backdrop-blur-2xl flex flex-col gap-2.5 font-mono text-sm shadow-2xl animate-fade-in">
          {/* Creator Tag in Mobile */}
          <div className="pb-2 mb-1 border-b border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Created by CSE Dept</span>
            <span className="text-amber-400 font-bold">Preet Yadav</span>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => {
                soundEngine.playClick();
                setMobileMenuOpen(false);
              }}
              className={`py-2 px-3 rounded-lg transition-colors ${
                link.isSpecial
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-zinc-300 hover:text-amber-400'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={() => {
              soundEngine.playClick();
              setMobileMenuOpen(false);
              onOpenRegister();
            }}
            className="w-full mt-2 py-2.5 rounded-xl bg-amber-500 text-black font-bold uppercase text-xs cursor-pointer shadow-md"
          >
            Register for In-Person Pass
          </button>
        </div>
      )}
    </nav>
  );
}
