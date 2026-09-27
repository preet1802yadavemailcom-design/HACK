'use client';

import React, { useState } from 'react';
import VideoIntroOverlay from '@/components/ui/VideoIntroOverlay';
import ModernNavbar from '@/components/ui/ModernNavbar';
import HeroSection from '@/components/ui/HeroSection';
import TracksSection from '@/components/ui/TracksSection';
import SquadSection from '@/components/ui/SquadSection';
import ScheduleSection from '@/components/ui/ScheduleSection';
import VenueSection from '@/components/ui/VenueSection';
import RegistrationModal from '@/components/ui/RegistrationModal';
import { soundEngine } from '@/lib/audio';
import { ArrowRight, Terminal } from 'lucide-react';

export default function Home() {
  const [isVideoIntroActive, setIsVideoIntroActive] = useState(true);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <main className="relative min-h-screen w-full bg-neutral-950 text-white overflow-x-hidden selection:bg-amber-500 selection:text-black">
      {/* 1. Fullscreen Edge-to-Edge Video Intro (Supports all devices including laptops) */}
      {isVideoIntroActive && (
        <VideoIntroOverlay
          onComplete={() => {
            setIsVideoIntroActive(false);
            soundEngine.startAmbient();
          }}
        />
      )}

      {/* 2. Ultra-HD 2K Landscape Mountain Background Video Loop (Rotated & Optimized) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          src="/home-bg-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* 3. Deep Cinematic Contrast Vignette Overlay for Crystal-Clear Readability */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 pointer-events-none backdrop-blur-[0.5px]" />

      {/* 4. Modern Sticky Navigation */}
      <ModernNavbar onOpenRegister={() => setIsRegisterOpen(true)} />

      {/* 5. Main Hackathon Event Content */}
      <div
        className={`relative z-10 flex flex-col items-center transition-all duration-700 ${
          isVideoIntroActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Hero Section */}
        <HeroSection onOpenRegister={() => setIsRegisterOpen(true)} />

        {/* Focus Tracks */}
        <TracksSection />

        {/* Squad & Team Formation */}
        <SquadSection onOpenRegister={() => setIsRegisterOpen(true)} />

        {/* Schedule */}
        <ScheduleSection />

        {/* Campus Venue & Details */}
        <VenueSection />

        {/* Final CTA Banner */}
        <section className="relative w-full py-20 px-4 max-w-4xl mx-auto text-center z-20">
          <div className="p-8 sm:p-12 rounded-3xl bg-black/85 border border-white/10 backdrop-blur-2xl shadow-2xl">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              READY TO BUILD IN JAUNPUR?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-300 max-w-lg mx-auto font-light">
              Saturday, October 24, 2026 • 09:30 AM to 03:00 PM IST at Prasad Institute of Technology. Free registration for all university students.
            </p>
            <div className="mt-8 flex justify-center">
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
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative w-full py-12 px-4 border-t border-white/10 bg-black/85 backdrop-blur-xl text-center font-mono text-xs text-zinc-400 z-20">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-zinc-200">
              <Terminal className="w-4 h-4 text-amber-400" />
              <span className="font-bold">HACKTOBERFEST HACK DAY JAUNPUR</span>
              <span>×</span>
              <span>PRASAD INSTITUTE OF TECHNOLOGY</span>
            </div>
            <p className="text-[11px] text-zinc-400 max-w-md">
              Organized by Shubhasheesh Kundu &amp; Preet Yadav • 100% Offline On-Campus Hackathon.
            </p>
            <div className="text-[10px] text-zinc-500">
              Prasad Institute of Technology, Jaunpur, Uttar Pradesh 222002, India
            </div>
          </div>
        </footer>
      </div>

      {/* 6. Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </main>
  );
}
