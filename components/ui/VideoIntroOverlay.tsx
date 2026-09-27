'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, FastForward, Play } from 'lucide-react';

interface VideoIntroOverlayProps {
  onComplete: () => void;
}

export default function VideoIntroOverlay({ onComplete }: VideoIntroOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Attempt autoplay
    const vid = videoRef.current;
    if (vid) {
      vid.play().then(() => {
        setHasStarted(true);
      }).catch(() => {
        // Browser autoplay policy prevented instant play
        setHasStarted(false);
      });
    }
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 11;
      setProgress((current / duration) * 100);
    }
  };

  const finishVideo = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 400); // Quick, punchy transition into the site
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      if (!hasStarted) {
        videoRef.current.play();
        setHasStarted(true);
      }
    }
  };

  const handleScreenClick = () => {
    // If muted, unmute on first tap anywhere
    if (videoRef.current) {
      if (videoRef.current.muted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
      if (videoRef.current.paused) {
        videoRef.current.play();
        setHasStarted(true);
      }
    }
  };

  return (
    <div
      onClick={handleScreenClick}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-all duration-500 overflow-hidden cursor-pointer select-none ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Ambient Blur of the video for widescreen cinematic framing */}
      <video
        ref={bgVideoRef}
        src="/intro-video.mp4"
        autoPlay
        playsInline
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-35 scale-110 pointer-events-none"
      />

      {/* Main Crisp Ultra-HD Video Element */}
      <div className="relative z-10 w-full h-full max-w-md sm:max-h-[95vh] flex items-center justify-center">
        <video
          ref={videoRef}
          src="/intro-video.mp4"
          autoPlay
          playsInline
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onEnded={finishVideo}
          className="w-full h-full object-contain sm:rounded-2xl shadow-2xl"
          style={{ imageRendering: 'auto' }}
        />
      </div>

      {/* Controls Overlay */}
      <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-auto">
        {/* Sound Toggle Pill */}
        <button
          onClick={handleToggleMute}
          className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border font-mono text-xs uppercase tracking-wider transition-all ${
            isMuted
              ? 'bg-amber-500 text-black font-bold border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)] animate-pulse'
              : 'bg-black/60 text-white border-white/20 hover:bg-black/80'
          }`}
          aria-label={isMuted ? 'Unmute video sound' : 'Mute video sound'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4" />
              <span>Tap to Unmute Sound</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>Sound On</span>
            </>
          )}
        </button>

        {/* Skip Video Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            finishVideo();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/60 hover:bg-black/90 text-zinc-300 hover:text-white border border-white/20 backdrop-blur-xl font-mono text-xs uppercase tracking-wider transition-all"
        >
          <span>Skip Video</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tap to Play prompt if browser blocked autoplay */}
      {!hasStarted && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 pointer-events-none">
          <div className="p-4 rounded-2xl bg-amber-500 text-black font-mono font-bold text-sm uppercase flex items-center gap-2 shadow-2xl animate-bounce">
            <Play className="w-5 h-5 fill-current" />
            <span>Tap Anywhere to Play Video</span>
          </div>
        </div>
      )}

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 z-20">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-100 ease-linear shadow-[0_0_10px_#f59e0b]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
