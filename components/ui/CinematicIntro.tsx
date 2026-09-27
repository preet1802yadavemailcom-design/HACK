'use client';

import React, { useState, useEffect } from 'react';
import { soundEngine } from '@/lib/audio';
import { Cpu, Sparkles, ArrowRight, FastForward, MapPin } from 'lucide-react';

interface CinematicIntroProps {
  onEnter: () => void;
}

export default function CinematicIntro({ onEnter }: CinematicIntroProps) {
  // Phases: 0 (Void), 1 (Stars ignite), 2 (First Node), 3 (Expanding Network), 4 (Typography sequence), 5 (Ready to enter)
  const [phase, setPhase] = useState<number>(0);
  const [typoStep, setTypoStep] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  useEffect(() => {
    // Cinematic timed timeline sequence
    const t0 = setTimeout(() => setPhase(1), 500);
    const t1 = setTimeout(() => {
      setPhase(2);
      soundEngine.playDiyaIgnite();
    }, 1600);
    const t2 = setTimeout(() => {
      setPhase(3);
      soundEngine.playDiyaIgnite();
    }, 2800);
    const t3 = setTimeout(() => {
      setPhase(4);
      soundEngine.playTempleBell(0.85);
    }, 4000);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Sequential typography timing in Phase 4
  useEffect(() => {
    if (phase === 4) {
      const step1 = setTimeout(() => setTypoStep(1), 300); // HACKTOBERFEST
      const step2 = setTimeout(() => setTypoStep(2), 1200); // HACK DAY
      const step3 = setTimeout(() => setTypoStep(3), 2100); // JAUNPUR
      const step4 = setTimeout(() => setTypoStep(4), 3000); // PRASAD INSTITUTE OF TECHNOLOGY
      const step5 = setTimeout(() => {
        setTypoStep(5); // THE NINE REALMS • OFFLINE HACKATHON
        setPhase(5);
        soundEngine.playTempleBell(1.15);
      }, 4000);

      return () => {
        clearTimeout(step1);
        clearTimeout(step2);
        clearTimeout(step3);
        clearTimeout(step4);
        clearTimeout(step5);
      };
    }
  }, [phase]);

  const handleEnterWorld = () => {
    soundEngine.playRealmWarp();
    soundEngine.startAmbient();
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 900);
  };

  const handleSkip = () => {
    soundEngine.playClick();
    soundEngine.startAmbient();
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 400);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight-950 text-white transition-opacity duration-1000 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Skip button always accessible in top corner */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-widest text-zinc-400 uppercase bg-midnight-900/80 hover:bg-gold-500/20 hover:text-gold-300 border border-zinc-800 hover:border-gold-500/50 rounded-full transition-all duration-300 backdrop-blur-md"
        aria-label="Skip cinematic introduction"
      >
        <span>Skip Intro</span>
        <FastForward className="w-3.5 h-3.5" />
      </button>

      {/* Background Starfield Twinkling */}
      {phase >= 1 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${(i * 19) % 100}%`,
                left: `${(i * 29) % 100}%`,
                opacity: 0.2 + (i % 5) * 0.15,
                animationDuration: `${2 + (i % 4)}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Phase 2: First Developer Core Node Ignites */}
      {phase >= 2 && phase < 4 && (
        <div className="relative flex flex-col items-center justify-center transition-all duration-1000">
          <div className="relative flex items-center justify-center">
            {/* Golden radiance aura */}
            <div className="absolute w-36 h-36 rounded-full bg-gold-500/20 blur-2xl animate-pulse" />
            <div className="relative p-5 rounded-full bg-gold-950/40 border border-gold-500/40 shadow-[0_0_40px_rgba(245,158,11,0.5)]">
              <Cpu className="w-10 h-10 text-gold-400 animate-pulse" />
            </div>
          </div>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-gold-300/80">
            {phase === 2 ? 'Initializing Developer Hack Core...' : 'Connecting In-Person Campus Nodes...'}
          </p>

          {/* Phase 3: Multiple Luminous Nodes Array */}
          {phase === 3 && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i / 24) * Math.PI * 2;
                const dist = 120 + (i % 3) * 45;
                const x = Math.cos(angle) * dist;
                const y = Math.sin(angle) * dist;
                return (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] animate-ping"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                      animationDuration: `${1.5 + (i % 3)}s`,
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Phase 4 & 5: Grand Cinematic Typography Sequence */}
      {phase >= 4 && (
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
          {/* OFFLINE IN-PERSON BADGE */}
          <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(16,185,129,0.25)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>OFFLINE IN-PERSON HACKATHON • PIT CAMPUS</span>
          </div>

          {/* Sequential Emergence */}
          {typoStep >= 1 && (
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-gold-400 to-amber-200 transition-all duration-700 animate-float">
              HACKTOBERFEST
            </h2>
          )}

          {typoStep >= 2 && (
            <h3 className="text-2xl md:text-5xl font-mono font-bold tracking-widest text-cyan-300 text-cyan-glow mt-1 transition-all duration-700">
              HACK DAY
            </h3>
          )}

          {typoStep >= 3 && (
            <div className="mt-3 text-lg md:text-2xl font-mono uppercase tracking-[0.25em] text-zinc-300">
              JAUNPUR
            </div>
          )}

          {typoStep >= 4 && (
            <div className="mt-1 text-sm md:text-base font-mono tracking-widest text-gold-400/90 uppercase flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-gold-400" />
              <span>PRASAD INSTITUTE OF TECHNOLOGY</span>
            </div>
          )}

          {typoStep >= 5 && (
            <div className="mt-8 pt-6 border-t border-gold-500/30 flex flex-col items-center animate-fade-in">
              <span className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-400 mb-2">
                THE 9 OPEN-SOURCE DIMENSIONS
              </span>
              <h1 className="text-4xl md:text-7xl font-celestial font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-gold-400 to-amber-600 text-gold-glow">
                THE NINE REALMS
              </h1>
              <p className="mt-3 text-sm md:text-base text-zinc-300 max-w-lg font-light italic">
                “Nine dimensions of code. Infinite possibilities. One physical arena of builders.”
              </p>

              {/* Call To Action */}
              <button
                onClick={handleEnterWorld}
                className="mt-8 group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 via-gold-500 to-amber-600 text-midnight-950 font-bold font-mono tracking-widest uppercase rounded-full shadow-[0_0_35px_rgba(245,158,11,0.6)] hover:shadow-[0_0_55px_rgba(245,158,11,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <span className="relative z-10">ENTER THE HACKATHON</span>
                <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
