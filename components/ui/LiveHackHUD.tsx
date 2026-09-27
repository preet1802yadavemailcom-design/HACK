'use client';

import React, { useState, useEffect } from 'react';
import { REALMS } from '@/data/realmsData';
import { soundEngine } from '@/lib/audio';
import { Volume2, VolumeX, Cpu, Radio, ShieldCheck, MapPin, Calendar, Clock, Gauge, Building } from 'lucide-react';

interface LiveHackHUDProps {
  currentRealmIndex: number;
  quality: 'low' | 'med' | 'high';
  onQualityChange: (q: 'low' | 'med' | 'high') => void;
  onOpenRegister: () => void;
}

export default function LiveHackHUD({
  currentRealmIndex,
  quality,
  onQualityChange,
  onOpenRegister,
}: LiveHackHUDProps) {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(60);
  const activeRealm = REALMS[currentRealmIndex] || REALMS[0];

  // Dynamic simulated telemetry FPS tracker
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const loop = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animId);
  }, []);

  const handleToggleSound = () => {
    const nextMuted = soundEngine.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleCycleQuality = () => {
    soundEngine.playClick();
    const modes: ('low' | 'med' | 'high')[] = ['low', 'med', 'high'];
    const nextIdx = (modes.indexOf(quality) + 1) % modes.length;
    onQualityChange(modes[nextIdx]);
  };

  return (
    <>
      {/* Top Left: Event Telemetry HUD */}
      <div className="fixed top-5 left-5 z-40 flex flex-col gap-1.5 pointer-events-none select-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-midnight-950/85 border border-emerald-500/40 backdrop-blur-md shadow-lg pointer-events-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[10px] tracking-widest text-emerald-400 font-bold uppercase">
            OFFLINE IN-PERSON
          </span>
          <span className="text-zinc-600">|</span>
          <span className="font-mono text-[10px] tracking-wider text-zinc-300">
            PIT JAUNPUR CAMPUS
          </span>
        </div>

        {/* Technical HUD data box */}
        <div className="hidden md:flex flex-col p-3 rounded-xl bg-midnight-950/85 border border-zinc-800/80 backdrop-blur-md text-[11px] font-mono text-zinc-400 w-64 shadow-xl">
          <div className="flex justify-between items-center pb-1.5 border-b border-zinc-800 text-zinc-300">
            <span className="flex items-center gap-1.5 text-gold-400 font-bold tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              NINE REALMS HUD
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-cyan-400">
              {fps} FPS
            </span>
          </div>

          <div className="grid grid-cols-2 gap-y-1.5 pt-2 text-[10px]">
            <div>
              <span className="text-zinc-500 block">EVENT</span>
              <span className="text-zinc-200 font-semibold">HACKTOBERFEST &apos;26</span>
            </div>
            <div>
              <span className="text-zinc-500 block">FORMAT</span>
              <span className="text-emerald-400 font-semibold">PHYSICAL / ON-CAMPUS</span>
            </div>
            <div>
              <span className="text-zinc-500 block">DATE</span>
              <span className="text-zinc-200">24 OCT 2026</span>
            </div>
            <div>
              <span className="text-zinc-500 block">TIME</span>
              <span className="text-gold-300">09:30 — 15:00 IST</span>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px]">
            <span className="text-zinc-500">VENUE GPS</span>
            <span className="text-zinc-400 font-mono">25.7464° N, 82.6837° E</span>
          </div>
        </div>
      </div>

      {/* Top Right: Sound Controls, Quality Toggle, Register Button */}
      <div className="fixed top-5 right-5 z-40 flex items-center gap-2 pointer-events-auto">
        {/* Performance Quality Selector */}
        <button
          onClick={handleCycleQuality}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-midnight-950/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-mono backdrop-blur-md transition-all"
          title={`Render Quality: ${quality.toUpperCase()} (Click to toggle)`}
          aria-label="Toggle visual quality"
        >
          <Gauge className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline uppercase text-[10px] tracking-wider">{quality}</span>
        </button>

        {/* Audio Mute / Unmute Toggle */}
        <button
          onClick={handleToggleSound}
          className={`flex items-center justify-center p-2 rounded-xl border backdrop-blur-md transition-all ${
            isMuted
              ? 'bg-midnight-950/80 border-zinc-800 text-zinc-500 hover:text-zinc-300'
              : 'bg-gold-500/10 border-gold-500/40 text-gold-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
          }`}
          title={isMuted ? 'Sound Muted (Click to enable)' : 'Sound Enabled (Click to mute)'}
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
        </button>

        {/* Global Register CTA */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onOpenRegister();
          }}
          className="relative group overflow-hidden px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-gold-500 to-amber-600 text-midnight-950 font-mono font-bold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.7)] hover:scale-105 active:scale-95 transition-all"
        >
          <span>REGISTER (OFFLINE)</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </div>
    </>
  );
}
