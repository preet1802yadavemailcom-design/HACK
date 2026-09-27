'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, FastForward } from 'lucide-react';

interface VideoIntroOverlayProps {
  onComplete: () => void;
}

export default function VideoIntroOverlay({ onComplete }: VideoIntroOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [needsGestureForSound, setNeedsGestureForSound] = useState(false);

  useEffect(() => {
    const vid = videoRef.current;

    if (vid) {
      vid.playbackRate = 0.75;
      vid.volume = 1.0;

      // Attempt unmuted playback first
      vid.muted = false;
      vid.play().then(() => {
        setIsMuted(false);
        setNeedsGestureForSound(false);
      }).catch(() => {
        // Browser security policy required muted initial autoplay
        vid.muted = true;
        setIsMuted(true);
        setNeedsGestureForSound(true);
        vid.play().catch(() => {});
      });
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
    // Unmute immediately on any screen click or tap anywhere
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
      className={`fixed inset-0 z-50 w-full h-full bg-black transition-all duration-500 overflow-hidden cursor-pointer select-none ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* 100% True Edge-to-Edge Fullscreen Video for All Devices (Laptop, Desktop, Mobile, Tablet) */}
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
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Top Floating Controls */}
      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-auto">
        {/* Sound Toggle Pill */}
        <button
          onClick={handleToggleMute}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-2xl border font-mono text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xl ${
            isMuted
              ? 'bg-amber-500 text-black font-bold border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.7)] animate-pulse'
              : 'bg-black/75 text-white border-white/20 hover:bg-black/90'
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
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/75 hover:bg-black/95 text-zinc-100 hover:text-white border border-white/20 backdrop-blur-2xl font-mono text-xs uppercase tracking-wider shadow-xl transition-all cursor-pointer"
        >
          <span>Skip Video</span>
          <FastForward className="w-4 h-4" />
        </button>
      </div>

      {/* Prominent Center/Bottom Tap Prompt if Browser Muted Autoplay */}
      {needsGestureForSound && (
        <div className="absolute bottom-16 inset-x-0 z-30 flex items-center justify-center pointer-events-none px-4">
          <div className="px-6 py-3.5 rounded-2xl bg-black/90 border border-amber-400/60 text-amber-300 font-mono text-xs uppercase tracking-widest flex items-center gap-3 shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-bounce">
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>Tap Screen Anywhere to Unmute Sound</span>
          </div>
        </div>
      )}

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 z-20">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 transition-all duration-100 ease-linear shadow-[0_0_15px_#f59e0b]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
