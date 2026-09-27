'use client';

import React, { useState } from 'react';
import { soundEngine } from '@/lib/audio';
import { Terminal, Volume2, VolumeX, Menu, X, Shield, Sparkles, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

interface ModernNavbarProps {
  onOpenRegister: () => void;
  isBgmOn?: boolean;
  onToggleBgm?: () => void;
}

export default function ModernNavbar({
  onOpenRegister,
  isBgmOn = false,
  onToggleBgm,
}: ModernNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAudioToggle = () => {
    if (onToggleBgm) {
      onToggleBgm();
    } else {
      soundEngine.toggleMute();
    }
  };

  const navLinks = [
    { label: 'About', href: '/#about' },
    { label: 'Tracks', href: '/#tracks' },
    { label: 'Prizes', href: '/#prizes' },
    { label: 'Resources', href: '/#resources' },
    { label: 'Timeline', href: '/#schedule' },
    { label: 'Venue', href: '/#venue' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none transition-all">
      <nav className="max-w-7xl mx-auto rounded-2xl sm:rounded-full bg-black/80 hover:bg-black/90 border border-white/12 shadow-[0_8px_32px_rgba(0,0,0,0.85),0_0_20px_rgba(245,158,11,0.08)] backdrop-blur-2xl py-2 px-3.5 sm:px-6 flex items-center justify-between pointer-events-auto transition-all duration-300">
        {/* Left: Brand Identity & Creator Credit */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Animated Cyber Terminal Icon */}
            <div className="relative p-2 rounded-xl bg-gradient-to-br from-amber-500/25 to-yellow-500/10 text-amber-400 border border-amber-400/40 group-hover:scale-105 group-hover:border-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)]">
              <Terminal className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="font-sans font-black text-sm tracking-wider text-white group-hover:text-amber-300 transition-colors">
                  HACKTOBERFEST
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/35 font-bold uppercase tracking-wide">
                  PIT JAUNPUR
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                <span>By CSE Dept</span>
                <span>•</span>
                <span className="text-amber-400 font-semibold group-hover:underline">Preet Yadav</span>
              </div>
            </div>
          </Link>

          {/* Vertical Divider */}
          <div className="hidden xl:block h-6 w-[1px] bg-white/15" />

          {/* MLH Supported Badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/35 text-[10px] font-mono text-red-300">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>MLH Supported</span>
          </div>
        </div>

        {/* Center: Sleek Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 text-xs font-mono text-zinc-300">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => soundEngine.playClick()}
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-all duration-200 relative group font-medium"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-amber-400 group-hover:w-1/2 transition-all duration-300 rounded-full" />
            </Link>
          ))}
        </div>

        {/* Right: Sound Equalizer, VIP Passport, & Register CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Animated Music Equalizer Pill */}
          <button
            onClick={handleAudioToggle}
            className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              isBgmOn
                ? 'bg-amber-500/20 border-amber-400/60 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.4)] animate-pulse'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
            title={isBgmOn ? 'Mute Background Music' : 'Play Background Music'}
            aria-label="Toggle background music"
          >
            {isBgmOn ? (
              <>
                {/* 4 Dancing Equalizer Bars */}
                <div className="flex items-end gap-[2px] h-3.5">
                  <span className="w-[2px] bg-amber-400 rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
                  <span className="w-[2px] bg-amber-300 rounded-full animate-bounce h-3.5" style={{ animationDelay: '150ms' }} />
                  <span className="w-[2px] bg-amber-400 rounded-full animate-bounce h-2.5" style={{ animationDelay: '300ms' }} />
                  <span className="w-[2px] bg-yellow-300 rounded-full animate-bounce h-3" style={{ animationDelay: '450ms' }} />
                </div>
                <span className="hidden sm:inline text-[10px] font-bold text-amber-300">Sound: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                <span className="hidden sm:inline text-[10px]">Sound: OFF</span>
              </>
            )}
          </button>

          {/* VIP Hacker Passport Button */}
          <Link
            href="/badge"
            onClick={() => soundEngine.playClick()}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-amber-500/20 text-amber-300 hover:text-white border border-amber-400/50 hover:border-amber-300 hover:bg-amber-400/25 font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>VIP Passport</span>
          </Link>

          {/* Register Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenRegister();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-mono font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Register</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 text-zinc-300 border border-white/10 hover:text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 max-w-7xl mx-auto p-5 rounded-3xl bg-neutral-950/95 border border-white/15 backdrop-blur-2xl flex flex-col gap-2.5 font-mono text-sm shadow-2xl pointer-events-auto animate-in fade-in zoom-in-95 duration-200">
          <div className="pb-3 mb-1 border-b border-white/10 flex items-center justify-between text-xs text-zinc-400">
            <span>Created by CSE Dept</span>
            <span className="text-amber-400 font-bold">Preet Yadav</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => {
                  soundEngine.playClick();
                  setMobileMenuOpen(false);
                }}
                className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors text-xs"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/badge"
              onClick={() => {
                soundEngine.playClick();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/50 text-amber-300 font-bold text-center text-xs uppercase"
            >
              ⚡ Create VIP Passport
            </Link>

            <button
              onClick={() => {
                soundEngine.playClick();
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full py-3 rounded-xl bg-amber-500 text-black font-black uppercase text-xs cursor-pointer shadow-md"
            >
              Register for In-Person Pass
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
