'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';
import { soundEngine } from '@/lib/audio';
import {
  Download,
  Share2,
  Upload,
  Sparkles,
  Camera,
  CheckCircle,
  Copy,
  Terminal,
  ArrowLeft,
  QrCode,
  Shield,
  Zap,
  RefreshCw,
  Cpu,
  Flame,
  Award,
  Smartphone,
  Eye,
} from 'lucide-react';
import Link from 'next/link';

const DEPARTMENTS = [
  'Computer Science & Engineering (CSE)',
  'Information Technology (IT)',
  'Electronics & Communication (ECE)',
  'Mechanical Engineering (ME)',
  'Civil Engineering (CE)',
  'Pharmacy (B.Pharm)',
  'Management Studies (MBA/BBA)',
  'Applied Science & Humanities',
];

const YEARS = ['1st Year (Freshman)', '2nd Year (Sophomore)', '3rd Year (Junior)', '4th Year (Senior)'];

const VIRAL_HACKER_TITLES = [
  '10x PIT Full-Stack Ninja ⚔️',
  'AI & Prompt Sorcerer 🧙‍♂️',
  'Backbencher to Tech Lead 🚀',
  'Bug Hunter & Night Owl 🦉',
  'Babu Rao of Clean Code 👓',
  'DSA & LeetCode Demon 💀',
  'GitHub PR Machine 👑',
  'Cybersecurity Ghost 🛡️',
  'Frontend Pixel Magician 🎨',
  'Cloud & DevOps Warlock ☁️',
];

const CARD_THEMES = [
  {
    id: 'campus',
    name: '🏛️ PIT Campus Edition',
    border: 'border-amber-400',
    glow: 'shadow-[0_0_60px_rgba(245,158,11,0.6)]',
    accentText: 'text-amber-400',
    accentBg: 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500',
    cardBg: 'from-amber-950/60 via-black/90 to-black',
    bgImage: '/pit-campus.png',
    chipGradient: 'from-amber-300 via-yellow-500 to-amber-600',
    tag: 'bg-amber-400/20 text-amber-300 border-amber-400/50',
    highlight: '#f59e0b',
  },
  {
    id: 'gold',
    name: 'Cyber Gold VIP',
    border: 'border-amber-400',
    glow: 'shadow-[0_0_60px_rgba(245,158,11,0.5)]',
    accentText: 'text-amber-400',
    accentBg: 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500',
    cardBg: 'from-amber-950/40 via-neutral-950 to-black',
    bgImage: null,
    chipGradient: 'from-amber-300 via-yellow-500 to-amber-600',
    tag: 'bg-amber-400/15 text-amber-300 border-amber-400/40',
    highlight: '#f59e0b',
  },
  {
    id: 'emerald',
    name: 'Matrix Obsidian',
    border: 'border-emerald-400',
    glow: 'shadow-[0_0_60px_rgba(16,185,129,0.5)]',
    accentText: 'text-emerald-400',
    accentBg: 'bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500',
    cardBg: 'from-emerald-950/40 via-neutral-950 to-black',
    bgImage: null,
    chipGradient: 'from-emerald-300 via-teal-500 to-emerald-600',
    tag: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/40',
    highlight: '#10b981',
  },
  {
    id: 'cyber',
    name: 'Neon Cyberpunk',
    border: 'border-cyan-400',
    glow: 'shadow-[0_0_60px_rgba(6,182,212,0.5)]',
    accentText: 'text-cyan-400',
    accentBg: 'bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500',
    cardBg: 'from-cyan-950/40 via-neutral-950 to-black',
    bgImage: null,
    chipGradient: 'from-cyan-300 via-sky-500 to-blue-600',
    tag: 'bg-cyan-400/15 text-cyan-300 border-cyan-400/40',
    highlight: '#06b6d4',
  },
];

export default function BadgeCreator() {
  const searchParams = useSearchParams();

  // Form states
  const [fullName, setFullName] = useState(searchParams.get('name') || 'Aditya Sharma');
  const [department, setDepartment] = useState(
    searchParams.get('dept') || 'Computer Science & Engineering (CSE)'
  );
  const [year, setYear] = useState(searchParams.get('year') || '3rd Year (Junior)');
  const [studentId, setStudentId] = useState(searchParams.get('roll') || 'PIT-2023-CS042');
  const [hackerRole, setHackerRole] = useState(VIRAL_HACKER_TITLES[0]);
  const [customRole, setCustomRole] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('campus');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [passNumber, setPassNumber] = useState('PIT-HKTB-7892');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [exportMode, setExportMode] = useState<'badge' | 'story'>('story');

  // 3D Card tilt states
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const cardContainerRef = useRef<HTMLDivElement>(null);
  const storyContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    setPassNumber(`PIT-HKTB-${randomDigits}`);
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
          soundEngine.playTempleBell(1.2);
          triggerConfetti();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const activeTheme = CARD_THEMES.find((t) => t.id === selectedTheme) || CARD_THEMES[0];
  const displayRole = customRole.trim() ? customRole.trim() : hackerRole;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#06b6d4', '#ffffff', '#ffd700'],
      });
    } catch {}
  };

  // Ultra-HD High Res Download
  const handleDownload = async (mode: 'badge' | 'story') => {
    const targetElement = mode === 'story' ? storyContainerRef.current : cardContainerRef.current;
    if (!targetElement) return;

    setIsGenerating(true);
    soundEngine.playClick();

    try {
      // Temporarily remove 3D transform during render
      const originalTransform = targetElement.style.transform;
      targetElement.style.transform = 'none';

      const canvas = await html2canvas(targetElement, {
        scale: 3, // 3x Ultra-HD Retina resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: mode === 'story' ? '#050505' : null,
        logging: false,
      });

      targetElement.style.transform = originalTransform;

      const link = document.createElement('a');
      const filename =
        mode === 'story'
          ? `PIT-WhatsApp-Status-${fullName.replace(/\s+/g, '-')}.png`
          : `PIT-Hacker-VIP-Pass-${fullName.replace(/\s+/g, '-')}.png`;
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();

      soundEngine.playTempleBell(1.2);
      triggerConfetti();
    } catch (err) {
      console.error('Failed to export badge:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShareWhatsAppStatus = () => {
    soundEngine.playClick();
    triggerConfetti();

    const shareText =
      `🔥 *I'm participating in Hacktoberfest Hack Day 2026 at Prasad Institute of Technology, Jaunpur!* 🚀%0A%0A` +
      `🎟️ *Official VIP Hacker Passport:* ${passNumber}%0A` +
      `👨‍💻 *Hacker:* ${fullName}%0A` +
      `⚡ *Role:* ${displayRole}%0A` +
      `🎓 *Department:* ${department.split('(')[0]} (${year.split(' ')[0]})%0A` +
      `📍 *Venue:* Prasad Institute of Technology (Offline Campus)%0A` +
      `📅 *Date:* Saturday, October 24, 2026 • 09:30 AM IST%0A%0A` +
      `👉 *PIT Students: Claim your own 3D Hacker Pass here:*%0A` +
      `${typeof window !== 'undefined' ? window.location.origin : ''}/badge`;

    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };

  const handleWebShare = async () => {
    soundEngine.playClick();
    const shareData = {
      title: `${fullName}'s VIP Hacker Passport | Prasad Institute of Technology`,
      text: `🚀 Check out my official VIP Hacker Passport for Hacktoberfest 2026 at Prasad Institute of Technology, Jaunpur!`,
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        triggerConfetti();
      } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-neutral-950 text-white overflow-x-hidden pt-20 pb-20 px-4 sm:px-6">
      {/* 2K Landscape Video Background */}
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
      {/* Deep Contrast Vignette */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/85 via-black/75 to-black/95 pointer-events-none backdrop-blur-[0.5px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Navigation Bar Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            onClick={() => soundEngine.playClick()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/70 hover:bg-black/90 text-zinc-300 hover:text-white border border-white/10 font-mono text-xs uppercase tracking-wider backdrop-blur-md transition-all shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Return to Hack Day</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-xs font-bold uppercase shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            <Shield className="w-3.5 h-3.5" />
            <span>PRASAD TECH EXCLUSIVE VIP PASSPORT</span>
          </div>
        </div>

        {/* Hero Hook */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold uppercase tracking-widest mb-3 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>Claim Your Official College Hacker Identity</span>
          </div>
          <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            PRASAD TECH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 drop-shadow-[0_0_35px_rgba(245,158,11,0.5)]">
              VIP HACKER PASSPORT
            </span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-300 font-light max-w-xl mx-auto leading-relaxed">
            Dikhaye apna tech swag poore college ko! Upload your photo, pick your hacker archetype, and download the <span className="text-amber-400 font-semibold">1080×1920 WhatsApp Status Poster</span> that will make everyone ask for your link.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Customizer Form (5 cols) */}
          <div className="lg:col-span-5 bg-black/85 border border-white/15 rounded-3xl p-6 sm:p-7 backdrop-blur-2xl shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="text-sm font-bold font-mono text-zinc-200 uppercase flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>Passport Customizer</span>
              </h2>
              <button
                onClick={() => {
                  const randomDigits = Math.floor(1000 + Math.random() * 9000);
                  setPassNumber(`PIT-HKTB-${randomDigits}`);
                  soundEngine.playClick();
                }}
                className="text-[11px] font-mono text-zinc-400 hover:text-amber-400 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>New Serial</span>
              </button>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase mb-2 flex items-center justify-between">
                <span>1. Upload Hacker Photo / Selfie</span>
                <span className="text-emerald-400 text-[10px]">● Status Spotlight</span>
              </label>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl bg-neutral-900 border-2 border-dashed border-amber-400/60 overflow-hidden flex items-center justify-center flex-shrink-0 shadow-lg group">
                  {photoUrl ? (
                    <img src={photoUrl} alt="Hacker" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-6 h-6 text-amber-400/80 animate-pulse" />
                  )}
                </div>
                <div className="flex flex-col gap-1.5 flex-grow">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-md hover:scale-102 transition-all cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{photoUrl ? 'Change Photo' : 'Upload Selfie / Photo'}</span>
                  </button>
                  {photoUrl && (
                    <button
                      type="button"
                      onClick={() => setPhotoUrl(null)}
                      className="text-[10px] text-red-400 font-mono text-left hover:underline cursor-pointer"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase mb-1">
                2. Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Aditya Sharma"
                maxLength={26}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900/90 border border-white/20 text-white font-mono text-sm focus:outline-none focus:border-amber-400 shadow-inner"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase mb-1">
                3. PIT Department / Branch
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900/90 border border-white/20 text-white font-mono text-sm focus:outline-none focus:border-amber-400 cursor-pointer shadow-inner"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept} className="bg-neutral-950 text-white">
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Year & Roll Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-zinc-300 uppercase mb-1">
                  4. Year of Study
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-900/90 border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-amber-400 cursor-pointer shadow-inner"
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y} className="bg-neutral-950 text-white">
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 uppercase mb-1">
                  5. Roll / Student ID
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. 230123010"
                  maxLength={18}
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-900/90 border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-amber-400 shadow-inner"
                />
              </div>
            </div>

            {/* Hacker Archetype */}
            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase mb-1 flex items-center justify-between">
                <span>6. Hacker Title / Vibe</span>
                <span className="text-amber-400 text-[10px]">🔥 Viral Preset</span>
              </label>
              <select
                value={hackerRole}
                onChange={(e) => {
                  setHackerRole(e.target.value);
                  setCustomRole('');
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900/90 border border-white/20 text-white font-mono text-sm focus:outline-none focus:border-amber-400 cursor-pointer shadow-inner"
              >
                {VIRAL_HACKER_TITLES.map((role) => (
                  <option key={role} value={role} className="bg-neutral-950 text-white">
                    {role}
                  </option>
                ))}
              </select>

              {/* Or Custom Title write-in */}
              <input
                type="text"
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
                placeholder="Or type custom title (e.g. Code Wizard)..."
                maxLength={32}
                className="mt-2 w-full px-3 py-2 rounded-xl bg-neutral-950 border border-white/10 text-amber-300 font-mono text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Theme Picker */}
            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                7. Metallic Finish
              </label>
              <div className="grid grid-cols-3 gap-2">
                {CARD_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => {
                      setSelectedTheme(theme.id);
                      soundEngine.playClick();
                    }}
                    className={`py-2 px-2.5 rounded-xl font-mono text-xs border transition-all cursor-pointer ${
                      selectedTheme === theme.id
                        ? `${theme.border} bg-white/15 text-white font-bold shadow-lg scale-102`
                        : 'border-white/10 text-zinc-400 hover:text-white bg-black/50'
                    }`}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Export Mode Toggle */}
            <div className="pt-2">
              <label className="block text-xs font-mono text-zinc-300 uppercase mb-2">
                8. Preview Mode
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-neutral-900/80 border border-white/10">
                <button
                  type="button"
                  onClick={() => setExportMode('story')}
                  className={`py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    exportMode === 'story'
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>WhatsApp Status (9:16)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setExportMode('badge')}
                  className={`py-2 px-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    exportMode === 'badge'
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>VIP Badge Only</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: 3D Holographic Card Live Display & Action Suite (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Mode 1: 9:16 WhatsApp Status Poster Mode */}
            {exportMode === 'story' ? (
              <div
                className="w-full max-w-[390px] flex items-center justify-center p-2"
                style={{ perspective: 1200 }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                  setIsHovered(false);
                  setMousePos({ x: 0, y: 0 });
                }}
              >
                {/* The 9:16 Mobile Poster Canvas */}
                <div
                  ref={storyContainerRef}
                  style={{
                    transform: isHovered
                      ? `rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`
                      : 'rotateY(0deg) rotateX(0deg)',
                    transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
                  }}
                  className="relative w-full aspect-[9/16] rounded-[32px] p-5 sm:p-6 bg-gradient-to-b from-neutral-900 via-black to-neutral-950 border-2 border-amber-400/50 shadow-[0_0_80px_rgba(245,158,11,0.35)] flex flex-col justify-between overflow-hidden select-none"
                >
                  {/* Real PIT Campus Photo Background Layer */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-luminosity pointer-events-none"
                    style={{ backgroundImage: "url('/pit-campus.png')" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black/95 pointer-events-none" />

                  {/* Background Watermark & Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

                  {/* Top Story Header */}
                  <div className="relative z-10 text-center space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono uppercase tracking-widest text-amber-300">
                      <Flame className="w-3 h-3 text-amber-400" />
                      <span>PRASAD INSTITUTE OF TECHNOLOGY</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                      HACKTOBERFEST 2026
                    </h2>
                    <p className="text-[10px] font-mono text-zinc-400">
                      OFFICIAL IN-PERSON HACKATHON • JAUNPUR CAMPUS
                    </p>
                  </div>

                  {/* Center: The Glowing VIP Lanyard Card */}
                  <div className="relative z-10 my-auto py-2">
                    {/* Woven Fabric Lanyard Strap */}
                    <div className="mx-auto w-14 h-6 rounded-b-md bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 shadow-md flex items-center justify-center -mb-2 z-20 relative">
                      <div className="w-8 h-2 rounded-full bg-black/60 border border-white/30" />
                    </div>

                    {/* Badge Card Core */}
                    <div
                      className={`relative rounded-3xl p-5 bg-gradient-to-b ${activeTheme.cardBg} border-2 ${activeTheme.border} ${activeTheme.glow} shadow-2xl backdrop-blur-2xl text-center overflow-hidden`}
                    >
                      {activeTheme.bgImage && (
                        <>
                          <div 
                            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none"
                            style={{ backgroundImage: `url('${activeTheme.bgImage}')` }}
                          />
                          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
                        </>
                      )}
                      {/* EMV Gold Chip & Level */}
                      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/15">
                        <div
                          className={`w-10 h-7 rounded-md bg-gradient-to-tr ${activeTheme.chipGradient} border border-yellow-200/50 shadow-md flex items-center justify-center`}
                        >
                          <Cpu className="w-4 h-4 text-black/80" />
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] font-mono text-zinc-400 uppercase block">
                            CLEARANCE TIER
                          </span>
                          <span className="text-[11px] font-mono font-black text-amber-400">
                            LEVEL 99 VIP
                          </span>
                        </div>
                      </div>

                      {/* Photo Section with Cyber Ring */}
                      <div className="pt-4 flex flex-col items-center">
                        <div className="relative">
                          <div
                            className={`w-24 h-24 rounded-2xl p-1 bg-gradient-to-tr from-amber-400 via-yellow-300 to-emerald-400 shadow-xl overflow-hidden`}
                          >
                            <div className="w-full h-full rounded-xl bg-neutral-950 overflow-hidden flex items-center justify-center">
                              {photoUrl ? (
                                <img
                                  src={photoUrl}
                                  alt={fullName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center text-zinc-500 font-mono text-[9px]">
                                  <Camera className="w-7 h-7 text-zinc-600 mb-1" />
                                  <span>YOUR PHOTO</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-amber-500 text-black font-mono font-black text-[9px] uppercase shadow-md flex items-center gap-1">
                            <Zap className="w-2.5 h-2.5" />
                            <span>HACKER</span>
                          </div>
                        </div>

                        {/* Name & Archetype */}
                        <h3 className="mt-3 text-xl font-black text-white tracking-tight drop-shadow-md">
                          {fullName || 'YOUR NAME'}
                        </h3>
                        <div className="mt-1 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-semibold text-amber-300">
                          {displayRole}
                        </div>
                      </div>

                      {/* Micro Info Grid */}
                      <div className="mt-3.5 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-left font-mono text-[10px]">
                        <div>
                          <span className="text-zinc-500 block uppercase">DEPT</span>
                          <span className="text-zinc-200 font-bold truncate block">
                            {department.split('(')[0]}
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block uppercase">YEAR / ROLL</span>
                          <span className="text-zinc-200 font-bold block">
                            {year.split(' ')[0]} • {studentId || 'N/A'}
                          </span>
                        </div>
                      </div>

                      {/* Barcode & Hologram ID */}
                      <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between font-mono text-[9px]">
                        <span className="text-emerald-400 font-bold">● VERIFIED PIT BUILDER</span>
                        <span className="text-amber-400 font-bold">{passNumber}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Story Footer & Invitation */}
                  <div className="relative z-10 pt-2 border-t border-white/15 text-center space-y-1 font-mono text-[10px]">
                    <div className="text-amber-300 font-bold">
                      📍 Prasad Institute of Technology, Jaunpur
                    </div>
                    <div className="text-zinc-400 text-[9px]">
                      Saturday, Oct 24, 2026 • 09:30 AM to 03:00 PM IST
                    </div>
                    <div className="pt-1 text-[8px] text-zinc-500 uppercase tracking-widest">
                      100% OFFLINE ON-CAMPUS SPRINT • JOIN MY SQUAD
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Mode 2: Isolated VIP Badge Only */
              <div
                className="w-full max-w-[400px] flex items-center justify-center p-2"
                style={{ perspective: 1200 }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                  setIsHovered(false);
                  setMousePos({ x: 0, y: 0 });
                }}
              >
                <div
                  ref={cardContainerRef}
                  style={{
                    transform: isHovered
                      ? `rotateY(${mousePos.x * 20}deg) rotateX(${-mousePos.y * 20}deg)`
                      : 'rotateY(0deg) rotateX(0deg)',
                    transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
                  }}
                  className={`relative w-full rounded-[30px] p-6 bg-gradient-to-b ${activeTheme.cardBg} border-2 ${activeTheme.border} ${activeTheme.glow} text-white shadow-2xl overflow-hidden select-none`}
                >
                  {/* Real PIT Campus Photo Background Layer if theme specifies */}
                  {activeTheme.bgImage && (
                    <>
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none"
                        style={{ backgroundImage: `url('${activeTheme.bgImage}')` }}
                      />
                      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
                    </>
                  )}

                  {/* Lanyard Hole Mockup */}
                  <div className="relative z-10 mx-auto w-16 h-3.5 rounded-full bg-black/80 border border-white/20 flex items-center justify-center">
                    <div className="w-7 h-1.5 rounded-full bg-white/20" />
                  </div>

                  {/* Prismatic Shimmer */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.4) 100%)',
                    }}
                  />

                  {/* Header */}
                  <div className="pt-3 pb-4 text-center border-b border-white/15">
                    <div className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-semibold">
                      PRASAD INSTITUTE OF TECHNOLOGY, JAUNPUR
                    </div>
                    <div className="mt-1 flex items-center justify-center gap-1.5">
                      <span className="text-lg font-black tracking-tight text-white font-sans">
                        HACKTOBERFEST
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-black uppercase ${activeTheme.tag}`}>
                        2026 IN-PERSON PASS
                      </span>
                    </div>
                    <div className="text-[9px] font-mono text-zinc-400 tracking-wider mt-0.5">
                      HACK DAY JAUNPUR • 100% OFFLINE ON-CAMPUS
                    </div>
                  </div>

                  {/* Photo & Identity */}
                  <div className="py-5 flex flex-col items-center text-center">
                    <div className="relative">
                      <div className="w-28 h-28 rounded-2xl p-1 bg-gradient-to-tr from-amber-400 via-yellow-300 to-emerald-400 shadow-xl overflow-hidden">
                        <div className="w-full h-full rounded-xl bg-neutral-950 overflow-hidden flex items-center justify-center">
                          {photoUrl ? (
                            <img
                              src={photoUrl}
                              alt={fullName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center text-zinc-500 font-mono text-[10px]">
                              <Camera className="w-8 h-8 text-zinc-600 mb-1" />
                              <span>NO PHOTO</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="absolute -bottom-2 -right-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-black font-mono font-black text-[9px] tracking-wider uppercase shadow-md flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5" />
                        <span>HACKER</span>
                      </div>
                    </div>

                    <h3 className="mt-4 text-2xl font-black text-white tracking-tight drop-shadow-md">
                      {fullName || 'YOUR NAME'}
                    </h3>

                    <div className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-medium text-amber-300">
                      <span>{displayRole}</span>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="p-3.5 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-md space-y-2.5 font-mono text-xs">
                    <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                      <span className="text-[10px] text-zinc-400 uppercase">DEPARTMENT</span>
                      <span className="text-zinc-100 font-semibold truncate max-w-[200px] text-right">
                        {department.split('(')[0]}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                      <span className="text-[10px] text-zinc-400 uppercase">YEAR / ROLL</span>
                      <span className="text-zinc-100 font-semibold">
                        {year.split(' ')[0]} • {studentId || 'N/A'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-zinc-400 uppercase">VENUE &amp; DATE</span>
                      <span className="text-amber-400 font-bold text-[11px]">
                        PIT AUDITORIUM • OCT 24, 2026
                      </span>
                    </div>
                  </div>

                  {/* Footer Strip */}
                  <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-11 h-11 rounded-lg bg-white p-1 flex items-center justify-center shadow-md">
                        <QrCode className="w-9 h-9 text-black" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-zinc-400 uppercase block">
                          SECURITY PASS ID
                        </span>
                        <span className="text-xs font-mono font-black text-amber-400 tracking-wider">
                          #{passNumber}
                        </span>
                        <span className="text-[9px] font-mono text-emerald-400 block font-semibold">
                          ● VERIFIED PIT STUDENT
                        </span>
                      </div>
                    </div>

                    {/* Barcode Graphic */}
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-[2px] h-7 opacity-75">
                        <div className="w-[2px] h-full bg-white" />
                        <div className="w-[1px] h-full bg-white" />
                        <div className="w-[3px] h-full bg-white" />
                        <div className="w-[1px] h-full bg-white" />
                        <div className="w-[4px] h-full bg-white" />
                        <div className="w-[2px] h-full bg-white" />
                        <div className="w-[1px] h-full bg-white" />
                        <div className="w-[3px] h-full bg-white" />
                        <div className="w-[2px] h-full bg-white" />
                      </div>
                      <span className="text-[8px] font-mono text-zinc-500 uppercase mt-0.5">
                        OFFLINE ENTRY
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons: Viral WhatsApp & Download Suite */}
            <div className="w-full max-w-[400px] mt-6 space-y-3">
              {/* WhatsApp Status Share Button (Primary Hook!) */}
              <button
                onClick={handleShareWhatsAppStatus}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono font-black text-xs uppercase tracking-wider shadow-[0_0_35px_rgba(16,185,129,0.45)] hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>🔥 Put on WhatsApp Status &amp; Groups</span>
              </button>

              {/* Download Ultra-HD Button */}
              <button
                onClick={() => handleDownload(exportMode)}
                disabled={isGenerating}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>
                  {isGenerating
                    ? 'Rendering Ultra-HD Image...'
                    : exportMode === 'story'
                    ? '📥 Download WhatsApp Status Poster (PNG)'
                    : '📥 Download VIP Pass Badge (PNG)'}
                </span>
              </button>

              {/* Auxiliary Share Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleWebShare}
                  className="py-3 px-4 rounded-xl bg-black/75 hover:bg-black/95 border border-white/15 text-zinc-300 hover:text-white font-mono text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Instagram / Apps</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopiedLink(true);
                    soundEngine.playClick();
                    setTimeout(() => setCopiedLink(false), 2000);
                  }}
                  className="py-3 px-4 rounded-xl bg-black/75 hover:bg-black/95 border border-white/15 text-zinc-300 hover:text-white font-mono text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedLink ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied Link!' : 'Copy Link'}</span>
                </button>
              </div>

              {/* Status Hype Tip */}
              <div className="p-3.5 rounded-2xl bg-black/70 border border-amber-500/30 text-center font-mono text-[11px] text-zinc-300 shadow-lg">
                👑 <span className="text-amber-400 font-bold">College Swag Tip:</span> Status lagate waqt apne dosto ko tag karein aur hashtag lagayein <span className="text-white font-bold">#HackDayJaunpur #PIT</span> — sabhi log dekhte hi poochhenge!
              </div>
            </div>
          </div>
        </div>

        {/* Organizer WhatsApp Support Hotline Bar */}
        <div className="mt-12 p-4 rounded-2xl bg-black/60 border border-white/10 max-w-xl mx-auto flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-zinc-300">
          <span className="text-zinc-500 uppercase text-[10px]">NEED HELP?</span>
          <a
            href="https://wa.me/916306588533?text=Hi%20Shubhasheesh%20Sir%2C%20I%20have%20a%20query%20regarding%20Hacktoberfest%20PIT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
          >
            <span>💬 Shubhasheesh Sir (6306588533)</span>
          </a>
          <span className="text-zinc-600">•</span>
          <a
            href="https://wa.me/916394530549?text=Hi%20Preet%2C%20I%20have%20a%20query%20regarding%20Hacktoberfest%20PIT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
          >
            <span>💬 Preet Yadav (6394530549)</span>
          </a>
        </div>

        {/* Creator & Department Attribution Footer */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center space-y-2 font-mono">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <span>✨ Designed &amp; Engineered with ❤️ by Preet Yadav</span>
          </div>
          <p className="text-zinc-400 text-xs">
            Created for <span className="text-white font-bold">Department of Computer Science &amp; Engineering (CSE)</span>
          </p>
          <p className="text-zinc-500 text-[11px]">
            Prasad Institute of Technology, Jaunpur • Hacktoberfest 2026 In-Person Hack Day
          </p>
        </div>
      </div>
    </div>
  );
}
