'use client';

import React, { useState } from 'react';
import { soundEngine } from '@/lib/audio';
import { Terminal, Volume2, VolumeX, MapPin, Menu, X } from 'lucide-react';

interface ModernNavbarProps {
  onOpenRegister: () => void;
}

export default function ModernNavbar({ onOpenRegister }: ModernNavbarProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const next = soundEngine.toggleMute();
    setIsMuted(next);
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Tracks', href: '#tracks' },
    { label: 'Squads', href: '#squads' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Venue', href: '#venue' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 bg-black/40 backdrop-blur-xl border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 group-hover:scale-105 transition-transform">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm tracking-wider text-white">
                HACKTOBERFEST
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold uppercase">
                OFFLINE
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-400 block -mt-0.5">
              JAUNPUR × PIT 2026
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-mono text-zinc-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => soundEngine.playClick()}
              className="hover:text-amber-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Controls & CTA */}
        <div className="flex items-center gap-3">
          {/* Audio Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Registration CTA */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenRegister();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Register Now</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 text-zinc-400 border border-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 rounded-2xl bg-black/90 border border-white/10 backdrop-blur-2xl flex flex-col gap-3 font-mono text-sm animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                soundEngine.playClick();
                setMobileMenuOpen(false);
              }}
              className="py-1.5 text-zinc-300 hover:text-amber-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              soundEngine.playClick();
              setMobileMenuOpen(false);
              onOpenRegister();
            }}
            className="w-full mt-2 py-2.5 rounded-xl bg-amber-500 text-black font-bold uppercase text-xs"
          >
            Register for Hack Day
          </button>
        </div>
      )}
    </nav>
  );
}
