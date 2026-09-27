'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, FastForward } from 'lucide-react';

interface VideoIntroOverlayProps {
  onComplete: () => void;
}

export default function VideoIntroOverlay({ onComplete }: VideoIntroOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [needsGestureForSound, setNeedsGestureForSound] = useState(false);

  useEffect(() => {
    const vid = videoRef.current;
    const bgVid = bgVideoRef.current;

    if (vid) {
      vid.playbackRate = 0.75; // Set speed to 0.75x
      vid.volume = 1.0;

      // Try playing unmuted first
      vid.muted = false;
      vid.play().then(() => {
        setIsMuted(false);
        setNeedsGestureForSound(false);
      }).catch(() => {
        // Browser policy requires user interaction for unmuted audio
        vid.muted = true;
        setIsMuted(true);
        setNeedsGestureForSound(true);
        vid.play().catch(() => {});
      });
    }

    if (bgVid) {
      bgVid.playbackRate = 0.75;
      bgVid.muted = true;
      bgVid.play().catch(() => {});
    }
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 14;
      setProgress((current / duration) * 100);
    }
  };

  const finishVideo = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      videoRef.current.volume = 1.0;
      setIsMuted(nextMuted);
      setNeedsGestureForSound(false);
      if (videoRef.current.paused) {
        videoRef.current.play();
      }
    }
  };

  const handleScreenClick = () => {
    // Unmute immediately on any tap or click anywhere on screen
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
      setIsMuted(false);
      setNeedsGestureForSound(false);
      if (videoRef.current.paused) {
        videoRef.current.play();
      }
    }
  };

  return (
    <div
      onClick={handleScreenClick}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-all duration-400 overflow-hidden cursor-pointer select-none ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Ambient Widescreen Blur (Screen-Friendly on Desktops / Laptops) */}
      <video
        ref={bgVideoRef}
        src="/intro-video.mp4"
        autoPlay
        playsInline
        muted
        loop
        className="hidden md:block absolute inset-0 w-full h-full object-cover blur-3xl opacity-40 scale-110 pointer-events-none"
      />

      {/* Main Full-HD / 2K Unrotated Video Element (Screen-friendly on mobile & desktop) */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-0 md:p-4">
        <video
          ref={videoRef}
          src="/intro-video.mp4"
          autoPlay
          playsInline
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onEnded={finishVideo}
          onPlay={() => {
            if (videoRef.current) videoRef.current.playbackRate = 0.75;
          }}
          onLoadedMetadata={() => {
            if (videoRef.current) videoRef.current.playbackRate = 0.75;
          }}
          className="w-full h-full md:max-w-md lg:max-w-lg md:max-h-[96vh] object-cover md:object-contain md:rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.9)]"
        />
      </div>

      {/* Top Floating Controls */}
      <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-auto">
        {/* Sound Toggle Pill */}
        <button
          onClick={handleToggleMute}
          className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
            isMuted
              ? 'bg-amber-500 text-black font-bold border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.6)] animate-pulse'
              : 'bg-black/70 text-white border-white/20 hover:bg-black/90'
          }`}
          aria-label={isMuted ? 'Click to enable audio' : 'Mute audio'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4" />
              <span>Tap for Sound 🔊</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>Sound On (0.75x)</span>
            </>
          )}
        </button>

        {/* Skip Video Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            finishVideo();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/70 hover:bg-black/90 text-zinc-200 hover:text-white border border-white/20 backdrop-blur-xl font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
        >
          <span>Skip Video</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Floating Tap Prompt if Browser Muted */}
      {needsGestureForSound && (
        <div className="absolute bottom-16 z-30 flex items-center justify-center pointer-events-none px-4">
          <div className="px-5 py-3 rounded-2xl bg-black/85 border border-amber-500/50 text-amber-300 font-mono text-xs uppercase tracking-widest flex items-center gap-2.5 shadow-2xl backdrop-blur-md animate-bounce">
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>Tap Screen to Unmute Audio</span>
          </div>
        </div>
      )}

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 z-20">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 transition-all duration-100 ease-linear shadow-[0_0_10px_#f59e0b]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
