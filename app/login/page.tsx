'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle,
  Download, Share2, Copy, ExternalLink, Sparkles, Loader2, User,
  Users, Trophy, Zap, Phone, Mail
} from 'lucide-react';
import { soundEngine } from '@/lib/audio';

const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxP2NBaEF9qb-XAEjHwdlCKWLTqEtgfuofIFOZFu5GzXwf4CR7v24W3KFLORxaPqcVrgA/exec';

const MLH_REGISTRATION_URL =
  'https://events.mlh.com/events/15264-hacktoberfest-hack-day-jaunpur-x-prasad-institute-of-technology-jaunpur';

export default function LoginPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState<{
    exists: boolean;
    ticketId: string;
    teamCode: string;
    teamName: string;
    name: string;
    role?: string;
    rollNo?: string;
    email?: string;
    track?: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Auto-search if ?query= or ?roll= is in URL
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const q = params.get('query') || params.get('roll') || params.get('email') || params.get('ticket');
    if (q) {
      setQuery(q);
      performSearch(q);
    }
  }, []);

  const performSearch = async (val: string) => {
    const q = val.trim();
    if (!q) {
      setError('Please enter your College Roll No, registered Email, or Ticket ID.');
      return;
    }
    setLoading(true);
    setError('');
    setUserData(null);

    try {
      const url = `${APPS_SCRIPT_URL}?action=checkStudent&query=${encodeURIComponent(q)}&rollNo=${encodeURIComponent(q)}&email=${encodeURIComponent(q.toLowerCase())}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.exists) {
        soundEngine.playTempleBell();
        setUserData(data);
        setTimeout(() => {
          generatePass(
            data.ticketId,
            data.teamCode,
            data.teamName || 'Solo Participant',
            data.name || 'Hacker Delegate',
            data.role || (data.teamCode?.startsWith('SOLO-') ? 'Solo Hacker' : 'Team Member'),
            data.track || 'Web & Open Innovation'
          );
        }, 500);
      } else {
        setError('No active registration found for this Roll No / Email. Please verify your details or register below.');
      }
    } catch {
      setError('Could not connect to database. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick();
    performSearch(query);
  };

  const copyTeamCode = () => {
    if (!userData?.teamCode) return;
    navigator.clipboard.writeText(userData.teamCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareOnWhatsApp = () => {
    if (!userData) return;
    const isTeam = userData.teamCode && !userData.teamCode.startsWith('SOLO');
    const msg = encodeURIComponent(
      `🚀 *Hacktoberfest Hack Day Jaunpur 2026 (PIT × MLH)*\n\n` +
      `🎫 Ticket ID: *${userData.ticketId}*\n` +
      `👤 Delegate: *${userData.name}*\n` +
      `👥 Squad: *${userData.teamName}*\n` +
      (isTeam ? `🔑 Team Code: *${userData.teamCode}*\n\n` : `\n`) +
      (isTeam
        ? `📢 *Important Instructions for Teammates:*\n` +
          `1️⃣ Pehle hamari website par jaakar Team Code *${userData.teamCode}* se squad join karein:\n` +
          `👉 https://hack-avm.pages.dev/?team=${userData.teamCode}\n\n` +
          `2️⃣ Uske baad har teammate ko official Major League Hacking (MLH) portal par individual check-in karna mandatory hai:\n` +
          `👉 ${MLH_REGISTRATION_URL}\n\n`
        : `⚠️ *Mandatory Step 2 (MLH Official Check-in):*\n` +
          `👉 ${MLH_REGISTRATION_URL}\n\n`) +
      `📅 *Date:* Saturday, Oct 24, 2026 | 09:30 AM IST\n` +
      `🏛️ *Venue:* PIT Campus Auditorium, Jaunpur\n` +
      `_Prasad Institute of Technology · Department of CSE_`
    );
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  const downloadPass = () => {
    const canvas = canvasRef.current;
    if (!canvas || !userData) return;
    soundEngine.playClick();
    const a = document.createElement('a');
    a.download = `HackdayJaunpur2026_Pass_${userData.ticketId}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
  };

  // High-Resolution 1080x1920 Pass Generator
  const generatePass = useCallback((tid: string, tc: string, tn: string, name: string, role: string, tr: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1080;
    canvas.height = 1920;

    const drawRoundRect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    // 1. Base Gradient
    const bg = ctx.createLinearGradient(0, 0, 1080, 1920);
    bg.addColorStop(0, '#020617');
    bg.addColorStop(0.3, '#070d1e');
    bg.addColorStop(0.7, '#080d1a');
    bg.addColorStop(1, '#02040a');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1080, 1920);

    // 2. Cyber Grid
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 1080; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1920); ctx.stroke();
    }
    for (let y = 0; y < 1920; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1080, y); ctx.stroke();
    }

    // 3. Ambient Glows
    const topGlow = ctx.createRadialGradient(540, 220, 0, 540, 220, 500);
    topGlow.addColorStop(0, 'rgba(245, 158, 11, 0.22)');
    topGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = topGlow;
    ctx.fillRect(0, 0, 1080, 750);

    // 4. Gold Outer & Inner Borders
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 6;
    drawRoundRect(28, 28, 1024, 1864, 24);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
    ctx.lineWidth = 1.5;
    drawRoundRect(42, 42, 996, 1836, 18);
    ctx.stroke();

    // 5. Header Badge & Branding
    ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
    drawRoundRect(310, 80, 460, 48, 24);
    ctx.fill();
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 15px "Courier New", monospace';
    ctx.fillText('⚡ OFFICIAL DELEGATE ACCREDITATION ⚡', 540, 110);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 48px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('HACKTOBERFEST 2026', 540, 200);

    ctx.fillStyle = '#f59e0b';
    ctx.font = '900 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('HACK DAY JAUNPUR', 540, 248);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 19px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Prasad Institute of Technology · Department of CSE', 540, 288);

    // Separator line
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(90, 320); ctx.lineTo(990, 320); ctx.stroke();

    // 6. Delegate Details Card
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    drawRoundRect(90, 350, 900, 340, 20);
    ctx.fill();
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 13px "Courier New", monospace';
    ctx.fillText('DELEGATE NAME', 130, 400);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 40px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(name.toUpperCase(), 130, 450);

    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 18px "Courier New", monospace';
    ctx.fillText(`ROLE: ${role.toUpperCase()}`, 130, 490);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 13px "Courier New", monospace';
    ctx.fillText('HACKATHON TRACK', 130, 545);

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(tr, 130, 580);

    // Ticket ID Box
    ctx.fillStyle = 'rgba(245, 158, 11, 0.1)';
    drawRoundRect(130, 615, 820, 55, 12);
    ctx.fill();
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
    ctx.stroke();
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 18px "Courier New", monospace';
    ctx.fillText(`TICKET ID: ${tid}`, 155, 650);

    // 7. Team & Squad Details Card
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    drawRoundRect(90, 720, 900, 200, 20);
    ctx.fill();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 14px "Courier New", monospace';
    ctx.fillText('SQUAD / SPRINT DETAILS', 130, 765);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(tn, 130, 810);

    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 20px "Courier New", monospace';
    ctx.fillText(`TEAM CODE: ${tc}`, 130, 860);

    // 8. Event Date, Time & Venue
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    drawRoundRect(90, 950, 900, 180, 20);
    ctx.fill();
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 14px "Courier New", monospace';
    ctx.fillText('SCHEDULE & LOCATION', 130, 995);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('📅 Saturday, October 24, 2026  •  ⏰ 09:30 AM IST', 130, 1040);

    ctx.fillStyle = '#fbbf24';
    ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('🏛️ PIT Campus Main Auditorium, Jaunpur, Uttar Pradesh', 130, 1085);

    // 9. MLH Partner Notice in Pass
    ctx.fillStyle = 'rgba(99, 102, 241, 0.12)';
    drawRoundRect(90, 1160, 900, 130, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#818cf8';
    ctx.font = 'bold 13px "Courier New", monospace';
    ctx.fillText('MAJOR LEAGUE HACKING (MLH) ACCREDITATION', 130, 1200);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Official MLH Partner Event. Ensure individual check-in at events.mlh.com', 130, 1240);

    // 10. Hotline Contacts
    const hotY = 1320;
    ctx.fillStyle = 'rgba(245, 158, 11, 0.08)';
    drawRoundRect(90, hotY, 430, 80, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
    ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('👨‍🏫 Shubhashish Kundu Sir', 120, hotY + 32);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px "Courier New", monospace';
    ctx.fillText('+91 63065 88533', 120, hotY + 60);

    ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
    drawRoundRect(560, hotY, 430, 80, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
    ctx.stroke();
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('👨‍💻 Preet Yadav', 590, hotY + 32);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px "Courier New", monospace';
    ctx.fillText('+91 63945 30549', 590, hotY + 60);

    // 11. Footer
    ctx.textAlign = 'center';
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('In Association with Major League Hacking (MLH) & AKTU Lucknow', 540, 1780);

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 14px "Courier New", monospace';
    ctx.fillText('hack-avm.pages.dev  •  CSE Department, PIT Jaunpur', 540, 1820);
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-neutral-950 text-white overflow-x-hidden pt-24 pb-20 px-4 sm:px-6 selection:bg-amber-500 selection:text-black">
      {/* 2K Video Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          src="/home-bg-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter contrast-[1.06] saturate-[1.12] brightness-[0.96]"
        />
      </div>

      {/* Dark Gradient Contrast Vignette */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/85 via-black/75 to-black/95 pointer-events-none backdrop-blur-[0.5px]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Navigation Bar Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <Link
            href="/"
            onClick={() => soundEngine.playClick()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer backdrop-blur-xl"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest hidden sm:inline">
              Hacktoberfest 2026
            </span>
          </div>
        </div>

        {/* Search / Authentication Card */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-neutral-900/90 via-black/90 to-neutral-950/90 border border-white/15 shadow-[0_0_80px_rgba(245,158,11,0.15)] backdrop-blur-2xl mb-8">
          <div className="text-center max-w-xl mx-auto mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-widest mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>OFFICIAL DELEGATE PORTAL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Hacker Pass Login &amp; Status
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Enter your registered College Roll Number, Email Address, or Ticket ID to load your pass, view your squad, and complete the mandatory MLH portal check-in.
            </p>
          </div>

          <form onSubmit={handleSearch} className="max-w-xl mx-auto space-y-4">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setError(''); }}
                placeholder="Enter Roll No (e.g. 2401440100032) or Email"
                className="w-full px-5 py-4 rounded-2xl bg-black/80 border border-white/20 focus:border-amber-400 text-white font-mono text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all shadow-inner"
              />
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Verifying Credentials with Database...</span>
                </>
              ) : (
                <>
                  <span>Verify Status &amp; Fetch Pass</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <Link
              href="/#register"
              onClick={() => soundEngine.playClick()}
              className="text-xs font-mono text-zinc-400 hover:text-amber-300 hover:underline cursor-pointer"
            >
              Haven&apos;t registered yet? Sign up for Hacktoberfest Hack Day 2026 →
            </Link>
          </div>
        </div>

        {/* 🌟 Verified User Pass & MLH Portal Display */}
        {userData && (
          <div className="space-y-6 animate-fadeIn">
            {/* Ticket Information Card */}
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-neutral-900 via-black to-amber-950/20 border-2 border-amber-500/50 shadow-[0_0_60px_rgba(245,158,11,0.25)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/40">
                    ✓ CONFIRMED DELEGATE
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase text-white mt-2">
                    {userData.name}
                  </h2>
                  <p className="text-xs font-mono text-amber-400/90 mt-0.5">
                    Ticket ID: <span className="font-bold text-white">{userData.ticketId}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 font-mono text-xs font-bold">
                    {userData.role || 'Hacker'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b border-white/10 font-mono text-xs">
                <div>
                  <p className="text-zinc-500 uppercase text-[10px]">Squad / Team</p>
                  <p className="text-white font-bold text-sm mt-0.5">{userData.teamName}</p>
                </div>
                <div>
                  <p className="text-zinc-500 uppercase text-[10px]">Team Code</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-emerald-400 font-bold text-sm">{userData.teamCode}</p>
                    <button
                      onClick={copyTeamCode}
                      className="p-1 rounded bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy Team Code"
                    >
                      {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-zinc-500 uppercase text-[10px]">Track</p>
                  <p className="text-amber-300 font-bold text-sm mt-0.5">{userData.track || 'Web & Innovation'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6">
                <button
                  onClick={downloadPass}
                  className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download VIP Pass PNG</span>
                </button>

                <button
                  onClick={shareOnWhatsApp}
                  className="py-3.5 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/35 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Pass on WhatsApp</span>
                </button>
              </div>
            </div>

            {/* 🚀 CRITICAL STEP 2: MLH OFFICIAL REGISTRATION PORTAL */}
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-indigo-950/90 via-black to-purple-950/60 border-2 border-indigo-500/70 shadow-[0_0_50px_rgba(99,102,241,0.3)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-52 h-52 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-4 relative">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/25 border border-red-400/60 text-red-300 font-mono text-[10px] font-black uppercase tracking-wider animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    STEP 2 OF 2 • MANDATORY ACTION
                  </div>
                  <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/15 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                    Official MLH Partner Portal
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                    <span>Now You Are Eligible! Complete MLH Check-in</span>
                  </h3>
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mt-1.5">
                    Aapka college registration hamare record me verify ho chuka hai! Major League Hacking (MLH) ke guidelines ke anusaar, <strong className="text-amber-300">har participant (aur team ke baki sabhi members ko individually)</strong> official MLH portal par check-in complete karna anivarya hai taaki aapko official MLH developer toolkits, stickers, certificates aur prizes mil sakein.
                  </p>
                </div>

                <a
                  href={MLH_REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-mono font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(239,68,68,0.6)] hover:shadow-[0_0_55px_rgba(245,158,11,0.8)] transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98] border border-white/20"
                >
                  <ExternalLink className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  <span>Complete Official MLH Registration (Mandatory) 🚀</span>
                </a>

                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-2 border-t border-white/10">
                  <span>Direct Event Link: <strong className="text-indigo-300">events.mlh.com/events/15264...</strong></span>
                  <span className="text-emerald-400 font-bold">Free Individual Registration</span>
                </div>
              </div>
            </div>

            {/* 📲 Invite Teammates Card */}
            {userData.teamCode && !userData.teamCode.startsWith('SOLO') && (
              <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-emerald-950/40 via-black to-emerald-950/20 border border-emerald-500/35 shadow-[0_0_30px_rgba(16,185,129,0.15)] space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-emerald-400 font-black font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                    <span className="text-lg">📲</span> Invite Your Squad Members
                  </p>
                  <span className="text-[10px] font-mono bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                    Max 3 Members
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-2 text-xs text-zinc-300">
                  <p className="font-semibold text-white">Apne baki teammates ke sath share karein:</p>
                  <div className="space-y-1.5 pl-2 text-[11px] font-mono">
                    <p className="text-emerald-300">
                      1️⃣ Hamari website par Team Code <span className="text-amber-400 font-black px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">{userData.teamCode}</span> daalkar team join karein.
                    </p>
                    <p className="text-indigo-300">
                      2️⃣ Phir unhe bhi MLH portal par apna individual check-in complete karna compulsory hai.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={copyTeamCode}
                    className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-200 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
                    <span>{copied ? 'Code Copied!' : `Copy Code: ${userData.teamCode}`}</span>
                  </button>

                  <button
                    type="button"
                    onClick={shareOnWhatsApp}
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600/25 hover:bg-emerald-600/40 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/50"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Send Invite on WhatsApp 📲</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hidden Canvas for Pass Generation */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </main>
  );
}
