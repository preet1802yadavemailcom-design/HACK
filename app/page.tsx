'use client';

import React, { useState, useRef, useEffect } from 'react';
import VideoIntroOverlay from '@/components/ui/VideoIntroOverlay';
import ModernNavbar from '@/components/ui/ModernNavbar';
import HeroSection from '@/components/ui/HeroSection';
import HighImpactStatsSection from '@/components/ui/HighImpactStatsSection';
import MLHSponsorBanner from '@/components/ui/MLHSponsorBanner';
import CollegeAccreditationBanner from '@/components/ui/CollegeAccreditationBanner';
import TracksSection from '@/components/ui/TracksSection';
import BadgePromoSection from '@/components/ui/BadgePromoSection';
import PrizesSection from '@/components/ui/PrizesSection';
import ResourcesSection from '@/components/ui/ResourcesSection';
import SquadSection from '@/components/ui/SquadSection';
import ScheduleSection from '@/components/ui/ScheduleSection';
import VenueSection from '@/components/ui/VenueSection';
import OrganizerHotlineSection from '@/components/ui/OrganizerHotlineSection';
import FloatingWhatsAppWidget from '@/components/ui/FloatingWhatsAppWidget';
import RegistrationModal from '@/components/ui/RegistrationModal';
import CyberMatrixTerminal from '@/components/ui/CyberMatrixTerminal';
import MagicalAuraCanvas from '@/components/ui/MagicalAuraCanvas';
import { soundEngine } from '@/lib/audio';
import { ArrowRight, Terminal, Volume2, VolumeX, MessageSquare, Phone } from 'lucide-react';

export default function Home() {
  const [isVideoIntroActive, setIsVideoIntroActive] = useState(true);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isBgmOn, setIsBgmOn] = useState(false); // By default OFF
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  // Global Keyboard Shortcut: Ctrl + K or ` (backtick) to launch Hacker Matrix Terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key.toLowerCase() === 'k') || e.key === '`') {
        e.preventDefault();
        soundEngine.playClick();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleBgm = () => {
    const nextState = !isBgmOn;
    setIsBgmOn(nextState);

    // Unmute/mute the authentic home background video music with 100% full rich volume
    if (bgVideoRef.current) {
      bgVideoRef.current.muted = !nextState;
      bgVideoRef.current.volume = 1.0;
      if (nextState) {
        bgVideoRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-neutral-950 text-white overflow-x-hidden selection:bg-amber-500 selection:text-black">
      {/* 1. Fullscreen Edge-to-Edge Video Intro (Supports all devices including laptops) */}
      {isVideoIntroActive && (
        <VideoIntroOverlay
          onComplete={() => {
            setIsVideoIntroActive(false);
            if (bgVideoRef.current) {
              bgVideoRef.current.play().catch(() => {});
            }
          }}
        />
      )}

      {/* 2. Ultra-HD 2K Landscape Mountain Background Video Loop (Rotated & Optimized) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={bgVideoRef}
          src="/home-bg-video.mp4"
          poster="/home-bg-poster.jpg"
          preload={isVideoIntroActive ? "none" : "auto"}
          autoPlay={!isVideoIntroActive}
          loop
          muted={!isBgmOn}
          playsInline
          className="w-full h-full object-cover filter contrast-[1.06] saturate-[1.12] brightness-[0.96]"
        />
      </div>

      {/* 3. Deep Cinematic Contrast Vignette Overlay for Crystal-Clear Readability */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/80 via-black/65 to-black/90 pointer-events-none backdrop-blur-[0.5px]" />

      {/* 4. Interactive Magical Stardust & Cyber Embers Particle Canvas */}
      <MagicalAuraCanvas />

      {/* 5. Modern Sticky Navigation */}
      <ModernNavbar
        isBgmOn={isBgmOn}
        onToggleBgm={toggleBgm}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* 6. Main Hackathon Event Content */}
      <div
        className={`relative z-10 flex flex-col items-center transition-all duration-700 ${
          isVideoIntroActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Hero Section with Live Countdown */}
        <HeroSection onOpenRegister={() => setIsRegisterOpen(true)} />

        {/* 3D High-Impact Stats Cubes */}
        <HighImpactStatsSection />

        {/* Major League Hacking (MLH) Official Sponsorship Banner */}
        <MLHSponsorBanner />

        {/* Official College Accreditation & AKTU Institutional Showcase Banner */}
        <CollegeAccreditationBanner onOpenRegister={() => setIsRegisterOpen(true)} />

        {/* Focus Tracks */}
        <TracksSection />

        {/* Official Hacker ID Card Studio Promo */}
        <BadgePromoSection />

        {/* Prizes & Perks (Announcing Soon) */}
        <PrizesSection />

        {/* Developer Links & Resources (8 Spec Guides & Gemma Docs) */}
        <ResourcesSection />

        {/* Squad & Team Formation */}
        <SquadSection onOpenRegister={() => setIsRegisterOpen(true)} />

        {/* Schedule & Timeline */}
        <ScheduleSection />

        {/* Campus Venue & Details */}
        <VenueSection />

        {/* 24/7 Organizer Hotline (Shubhasheesh Kundu Sir & Preet Yadav) */}
        <OrganizerHotlineSection />

        {/* Final CTA Banner */}
        <section className="relative w-full py-20 px-4 max-w-4xl mx-auto text-center z-20">
          <div className="p-8 sm:p-12 rounded-3xl bg-black/85 border border-white/10 backdrop-blur-2xl shadow-2xl">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              READY TO BUILD IN JAUNPUR?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-300 max-w-lg mx-auto font-light">
              Saturday, October 24, 2026 • 09:30 AM to 03:00 PM IST at Prasad Institute of Technology. Free registration exclusive to Prasad Institute of Technology students.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setIsRegisterOpen(true);
                }}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Register for In-Person Pass</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="/badge"
                onClick={() => soundEngine.playClick()}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 font-mono font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>⚡ Create Your Hacker ID Card</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer with Creator Credits & Direct WhatsApp Hotline */}
        <footer className="relative w-full py-12 px-4 border-t border-white/10 bg-black/90 backdrop-blur-xl text-center font-mono text-xs text-zinc-400 z-20">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 text-zinc-200">
              <div className="w-9 h-9 rounded-full bg-white p-0.5 border border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center justify-center flex-shrink-0">
                <img
                  src="/pit-logo.png"
                  alt="Prasad Institute of Technology Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-white font-sans text-sm">
                  PRASAD INSTITUTE OF TECHNOLOGY, JAUNPUR
                </span>
                <span className="text-[10px] text-amber-400 font-mono">
                  HACKTOBERFEST HACK DAY 2026 • CSE DEPARTMENT
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-zinc-300 text-xs max-w-lg">
              Crafted &amp; Engineered by <span className="text-amber-400 font-bold">Preet Yadav</span>
              <br />
              <span className="text-zinc-400 text-[11px]">
                Department of Computer Science &amp; Engineering (CSE) • Prasad Institute of Technology
              </span>
            </div>

            {/* Direct Contact Numbers Strip */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-[11px]">
              <a
                href={`https://wa.me/916306588533?text=${encodeURIComponent(
                  'Hi Shubhasheesh Sir, I have a query regarding Hacktoberfest PIT Jaunpur.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-black/80 border border-white/15 hover:border-emerald-400/50 text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Shubhasheesh Kundu Sir: <strong>+91 63065 88533</strong></span>
              </a>

              <a
                href={`https://wa.me/916394530549?text=${encodeURIComponent(
                  'Hi Preet, I have a query regarding Hacktoberfest PIT Jaunpur.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-black/80 border border-white/15 hover:border-emerald-400/50 text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Preet Yadav: <strong>+91 63945 30549</strong></span>
              </a>
            </div>

            <p className="text-[11px] text-zinc-400 max-w-md pt-2">
              Organized by Shubhasheesh Kundu &amp; Preet Yadav • Sponsored by Major League Hacking (MLH).
            </p>
            <div className="text-[10px] text-zinc-500">
              Prasad Institute of Technology, Jaunpur, Uttar Pradesh 222002, India
            </div>
          </div>
        </footer>
      </div>

      {/* Floating 1-Tap Direct WhatsApp Support Widget (Bottom-Left) */}
      <FloatingWhatsAppWidget />

      {/* Floating Cyber Matrix Terminal Launcher (Bottom-Right, above BGM) */}
      <div className="fixed bottom-16 sm:bottom-20 right-3 sm:right-6 z-40">
        <button
          onClick={() => {
            soundEngine.playClick();
            setIsTerminalOpen(true);
          }}
          className="group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-full bg-black/85 hover:bg-emerald-950/80 border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-xl"
          title="Open Hacker Terminal (Ctrl+K or `)"
          aria-label="Open Cyber Terminal"
        >
          <Terminal className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">Hacker Terminal</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-normal">
            Ctrl+K
          </span>
        </button>
      </div>

      {/* Floating BGM Toggle Pill (Bottom-Right, Default OFF) */}
      <div className="fixed bottom-3 sm:bottom-6 right-3 sm:right-6 z-40">
        <button
          onClick={toggleBgm}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full backdrop-blur-2xl border font-mono text-xs uppercase tracking-wider transition-all shadow-2xl cursor-pointer ${
            isBgmOn
              ? 'bg-amber-500 text-black font-bold border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.6)] animate-pulse'
              : 'bg-black/80 hover:bg-black/95 text-zinc-400 hover:text-white border-white/15'
          }`}
          title={isBgmOn ? 'Mute Background Music' : 'Play Background Music'}
        >
          {isBgmOn ? (
            <>
              <Volume2 className="w-4 h-4 text-black" />
              <span>Music: Playing 🎵</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-zinc-500" />
              <span>Music: Off 🔇</span>
            </>
          )}
        </button>
      </div>

      {/* Registration Modal (Opening Soon Teaser) */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      {/* Cyber Matrix Terminal HUD */}
      <CyberMatrixTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </main>
  );
}
