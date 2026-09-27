'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import CinematicIntro from '@/components/ui/CinematicIntro';
import LiveHackHUD from '@/components/ui/LiveHackHUD';
import RealmHeroCard from '@/components/ui/RealmHeroCard';
import CelestialNavRing from '@/components/ui/CelestialNavRing';
import BuildQuestSection from '@/components/ui/BuildQuestSection';
import FindYourSquad from '@/components/ui/FindYourSquad';
import EventTimeline from '@/components/ui/EventTimeline';
import EventInfoSection from '@/components/ui/EventInfoSection';
import FinalExperience from '@/components/ui/FinalExperience';
import RegistrationModal from '@/components/ui/RegistrationModal';
import { REALMS } from '@/data/realmsData';
import { soundEngine } from '@/lib/audio';

// Dynamically import Three.js Canvas Scene without SSR to guarantee smooth WebGL initialization
const CelestialScene = dynamic(() => import('@/components/canvas/CelestialScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-transparent flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border-2 border-gold-500 border-t-transparent animate-spin" />
        <span className="font-mono text-xs uppercase tracking-widest text-gold-400">
          INITIALIZING CELESTIAL ENGINE...
        </span>
      </div>
    </div>
  ),
});

export default function Home() {
  const [isIntroActive, setIsIntroActive] = useState<boolean>(true);
  const [currentRealmIndex, setCurrentRealmIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [quality, setQuality] = useState<'low' | 'med' | 'high'>('high');
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [isCoreHovered, setIsCoreHovered] = useState<boolean>(false);

  // Auto-detect mobile devices or low-power hardware to adjust quality gracefully
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768 || navigator.maxTouchPoints > 1;
      if (isMobile) {
        setQuality('med');
      }
    }
  }, []);

  // Mouse Parallax movement tracking
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMousePos({ x, y });
  }, []);

  // Scroll Progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
        setScrollProgress(progress);

        // Scroll-linked realm adaptation
        const calculatedIndex = Math.min(8, Math.floor(progress * 9));
        if (progress > 0.05 && progress < 0.95 && calculatedIndex !== currentRealmIndex) {
          setCurrentRealmIndex(calculatedIndex);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentRealmIndex]);

  const handleNextRealm = () => {
    soundEngine.playRealmWarp();
    setCurrentRealmIndex((prev) => (prev + 1) % REALMS.length);
  };

  const handleSelectRealm = (idx: number) => {
    setCurrentRealmIndex(idx);
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-midnight-950 text-white overflow-x-hidden selection:bg-gold-500 selection:text-midnight-950"
    >
      {/* 1. Cinematic Sunset Lake Background Image Layer */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none transition-transform duration-1000 scale-100 opacity-60"
        style={{ backgroundImage: "url('/sunset-bg.png')" }}
      />
      {/* Atmospheric Vignette & Contrast Gradients */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-midnight-950/80 via-midnight-950/40 to-midnight-950/90 pointer-events-none" />
      <div className="fixed inset-0 z-0 vignette-overlay pointer-events-none" />

      {/* 2. Cinematic Opening Intro (Black Screen -> Developer Node Ignition -> Logo Emergence) */}
      {isIntroActive && (
        <CinematicIntro
          onEnter={() => {
            setIsIntroActive(false);
          }}
        />
      )}

      {/* 3. Persistent 3D Three.js WebGL Universe Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <CelestialScene
          currentRealmIndex={currentRealmIndex}
          mousePos={mousePos}
          scrollProgress={scrollProgress}
          isIntroActive={isIntroActive}
          quality={quality}
          isCoreHovered={isCoreHovered}
        />
        <div className="absolute inset-0 hud-scanline opacity-20 pointer-events-none" />
      </div>

      {/* 4. Live Hack Day Technical Telemetry HUD */}
      {!isIntroActive && (
        <LiveHackHUD
          currentRealmIndex={currentRealmIndex}
          quality={quality}
          onQualityChange={setQuality}
          onOpenRegister={() => setIsRegisterOpen(true)}
        />
      )}

      {/* 5. Interactive Page Sections Content Container */}
      {!isIntroActive && (
        <div className="relative z-10 flex flex-col items-center">
          {/* Realm Hero Display Card */}
          <RealmHeroCard
            currentRealmIndex={currentRealmIndex}
            onNextRealm={handleNextRealm}
            onOpenRegister={() => setIsRegisterOpen(true)}
          />

          {/* Interactive Build Quest System */}
          <BuildQuestSection />

          {/* Team Formation & Squad Matchmaking */}
          <FindYourSquad onOpenRegister={() => setIsRegisterOpen(true)} />

          {/* 3D Glowing Pathway Event Timeline */}
          <EventTimeline />

          {/* Prasad Institute of Technology Event Specifications */}
          <EventInfoSection />

          {/* Final Convergence Climax & CTA */}
          <FinalExperience onOpenRegister={() => setIsRegisterOpen(true)} />

          {/* Editorial Footer */}
          <footer className="relative w-full py-12 px-4 border-t border-zinc-900 bg-midnight-950/90 backdrop-blur-2xl text-center font-mono text-xs text-zinc-500 z-30">
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-gold-400 font-bold">HACKTOBERFEST HACK DAY JAUNPUR</span>
                <span>×</span>
                <span className="text-zinc-300">PRASAD INSTITUTE OF TECHNOLOGY</span>
              </div>
              <p className="text-[11px] text-zinc-500 max-w-md">
                Co-organized by Shubhasheesh Kundu &amp; Preet Yadav • Physical In-Person Campus Hackathon.
              </p>
              <div className="text-[10px] text-zinc-600">
                Next.js, Three.js, React Three Fiber, Custom GLSL Shaders &amp; Web Audio API.
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* 6. Celestial 9-Node Orbital Navigation Dial */}
      {!isIntroActive && (
        <CelestialNavRing
          currentRealmIndex={currentRealmIndex}
          onSelectRealm={handleSelectRealm}
        />
      )}

      {/* 7. Immersive Cyber-Sacred Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </main>
  );
}
