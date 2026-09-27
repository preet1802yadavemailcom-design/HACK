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

const HACKER_ROLES = [
  'Full-Stack Developer 💻',
  'AI & Machine Learning Pioneer 🤖',
  'Open Source Contributor 🌐',
  'Cybersecurity & Ethics Defender 🛡️',
  'Mobile App Architect 📱',
  'Cloud & DevOps Engineer ☁️',
  'UI/UX Creative Technologist 🎨',
  'Hardware & IoT Maker ⚡',
];

const CARD_THEMES = [
  {
    id: 'amber',
    name: 'Hacktoberfest Amber',
    border: 'border-amber-400/60',
    glow: 'shadow-[0_0_50px_rgba(245,158,11,0.45)]',
    accentText: 'text-amber-400',
    accentBg: 'bg-amber-400',
    gradient: 'from-amber-500/20 via-neutral-900 to-black',
    badgeTag: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  {
    id: 'emerald',
    name: 'Cyber Matrix Emerald',
    border: 'border-emerald-400/60',
    glow: 'shadow-[0_0_50px_rgba(16,185,129,0.45)]',
    accentText: 'text-emerald-400',
    accentBg: 'bg-emerald-400',
    gradient: 'from-emerald-500/20 via-neutral-900 to-black',
    badgeTag: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
  {
    id: 'cyan',
    name: 'Electric Neon Cyan',
    border: 'border-cyan-400/60',
    glow: 'shadow-[0_0_50px_rgba(6,182,212,0.45)]',
    accentText: 'text-cyan-400',
    accentBg: 'bg-cyan-400',
    gradient: 'from-cyan-500/20 via-neutral-900 to-black',
    badgeTag: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
  },
];

export default function BadgeCreator() {
  const searchParams = useSearchParams();

  // Form states initialized with search params or defaults
  const [fullName, setFullName] = useState(searchParams.get('name') || 'Aditya Sharma');
  const [department, setDepartment] = useState(
    searchParams.get('dept') || 'Computer Science & Engineering (CSE)'
  );
  const [year, setYear] = useState(searchParams.get('year') || '3rd Year (Junior)');
  const [studentId, setStudentId] = useState(searchParams.get('roll') || 'PIT-2023-CS042');
  const [hackerRole, setHackerRole] = useState('Full-Stack Developer 💻');
  const [githubUser, setGithubUser] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('amber');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [passNumber, setPassNumber] = useState('PIT-HKTB-7892');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // 3D Card tilt states
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate unique pass number on mount
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
          soundEngine.playClick();
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

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#06b6d4', '#ffffff', '#fbbf24'],
      });
    } catch {}
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    soundEngine.playClick();

    try {
      // Temporarily remove 3D transform for flat render
      const originalTransform = cardRef.current.style.transform;
      cardRef.current.style.transform = 'none';

      const canvas = await html2canvas(cardRef.current, {
        scale: 3, // High-res 3x Retina output
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#050505',
        logging: false,
      });

      cardRef.current.style.transform = originalTransform;

      const link = document.createElement('a');
      const filename = `PIT-Hacktoberfest-Badge-${fullName.replace(/\s+/g, '-')}.png`;
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();

      soundEngine.playTempleBell(1.1);
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

    const shareText = `🚀 I'm participating in Hacktoberfest Hack Day 2026 (Jaunpur Edition × Prasad Institute of Technology)!%0A%0A` +
      `🔥 Official In-Person Hacker Pass: ${passNumber}%0A` +
      `👨‍💻 Hacker: ${fullName}%0A` +
      `🎓 ${department} • ${year}%0A` +
      `📍 Prasad Institute of Technology, Jaunpur%0A` +
      `📅 Saturday, October 24, 2026 • 09:30 AM IST%0A%0A` +
      `⚡ Generate your own Official Hacker Pass here:%0A` +
      `${typeof window !== 'undefined' ? window.location.origin : ''}/badge`;

    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };

  const handleWebShare = async () => {
    soundEngine.playClick();
    const shareData = {
      title: `${fullName}'s Hacker Pass | Hack Day Jaunpur × PIT`,
      text: `🚀 Check out my official In-Person Hacker Pass for Hacktoberfest 2026 at Prasad Institute of Technology, Jaunpur!`,
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
      {/* Background 2K Video Loop */}
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
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/85 via-black/70 to-black/95 pointer-events-none backdrop-blur-[0.5px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Breadcrumb & Return */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            onClick={() => soundEngine.playClick()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 hover:bg-black/90 text-zinc-300 hover:text-white border border-white/10 font-mono text-xs uppercase tracking-wider backdrop-blur-md transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to Hack Day Home</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-[11px] font-bold uppercase">
            <Shield className="w-3.5 h-3.5" />
            <span>PIT JAUNPUR EXCLUSIVE PASS</span>
          </div>
        </div>

        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Official Digital Identity Pass</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            CREATE YOUR HACKER ID CARD
          </h1>
          <p className="mt-2 text-sm sm:text-base text-zinc-300 font-light max-w-xl mx-auto">
            Design your ultra-futuristic holographic in-person event pass. Download in pristine Ultra-HD and show off on your <span className="text-amber-400 font-medium">WhatsApp Status &amp; Instagram</span>!
          </p>
        </div>

        {/* 2-Column Grid: Form + Card Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Customizer Controls (5 cols) */}
          <div className="lg:col-span-5 bg-black/80 border border-white/10 rounded-3xl p-6 sm:p-7 backdrop-blur-2xl shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="text-base font-bold font-mono text-zinc-200 uppercase flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>Pass Customizer</span>
              </h2>
              <button
                onClick={() => {
                  const randomDigits = Math.floor(1000 + Math.random() * 9000);
                  setPassNumber(`PIT-HKTB-${randomDigits}`);
                  soundEngine.playClick();
                }}
                className="text-[11px] font-mono text-zinc-400 hover:text-amber-400 flex items-center gap-1"
                title="Regenerate Pass ID"
              >
                <RefreshCw className="w-3 h-3" />
                <span>New Serial</span>
              </button>
            </div>

            {/* Photo Upload Box */}
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                1. Hacker Profile Picture
              </label>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl bg-neutral-900 border border-white/20 overflow-hidden flex items-center justify-center flex-shrink-0 shadow-lg">
                  {photoUrl ? (
                    <img src={photoUrl} alt="Hacker" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-6 h-6 text-zinc-500" />
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
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-wider border border-white/10 transition-all cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>{photoUrl ? 'Change Photo' : 'Upload Selfie / Photo'}</span>
                  </button>
                  {photoUrl && (
                    <button
                      type="button"
                      onClick={() => setPhotoUrl(null)}
                      className="text-[10px] text-red-400 font-mono text-left hover:underline"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Full Name Input */}
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                2. Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Aditya Sharma"
                maxLength={30}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900/90 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Department Selection */}
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                3. PIT Department / Branch
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900/90 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept} className="bg-neutral-950 text-white">
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Year of Study & Roll Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  4. Year of Study
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-900/90 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y} className="bg-neutral-950 text-white">
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  5. Roll / Student ID
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. 230123010"
                  maxLength={18}
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-900/90 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Hacker Role / Archetype */}
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                6. Hacker Archetype / Title
              </label>
              <select
                value={hackerRole}
                onChange={(e) => setHackerRole(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900/90 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {HACKER_ROLES.map((role) => (
                  <option key={role} value={role} className="bg-neutral-950 text-white">
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Card Holographic Theme Picker */}
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                7. Holographic Card Theme
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
                    className={`py-2 px-3 rounded-xl font-mono text-[11px] border transition-all ${
                      selectedTheme === theme.id
                        ? `${theme.border} bg-white/10 text-white font-bold shadow-md`
                        : 'border-white/10 text-zinc-400 hover:text-white bg-black/40'
                    }`}
                  >
                    {theme.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D Live Card Display & Export Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* The 3D Interactive Card Container */}
            <div
              className="w-full max-w-[420px] flex items-center justify-center p-2"
              style={{ perspective: 1200 }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false);
                setMousePos({ x: 0, y: 0 });
              }}
            >
              {/* Actual Printable / Capturable Card DOM */}
              <div
                ref={cardRef}
                style={{
                  transform: isHovered
                    ? `rotateY(${mousePos.x * 20}deg) rotateX(${-mousePos.y * 20}deg) translateZ(10px)`
                    : 'rotateY(0deg) rotateX(0deg) translateZ(0px)',
                  transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
                }}
                className={`relative w-full rounded-[28px] p-6 bg-gradient-to-b ${activeTheme.gradient} border-2 ${activeTheme.border} ${activeTheme.glow} text-white shadow-2xl overflow-hidden select-none`}
              >
                {/* Lanyard Hole Mockup */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-3.5 rounded-full bg-black/80 border border-white/20 flex items-center justify-center">
                  <div className="w-7 h-1.5 rounded-full bg-white/20" />
                </div>

                {/* Shimmer / Holographic Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.3) 100%)',
                  }}
                />

                {/* Card Watermark */}
                <div className="absolute right-[-20px] bottom-20 text-[110px] font-black text-white/[0.03] leading-none pointer-events-none select-none font-mono">
                  PIT
                </div>

                {/* Header: Prasad Institute of Technology */}
                <div className="pt-3 pb-4 text-center border-b border-white/15">
                  <div className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-semibold">
                    PRASAD INSTITUTE OF TECHNOLOGY, JAUNPUR
                  </div>
                  <div className="mt-1 flex items-center justify-center gap-1.5">
                    <span className="text-lg font-black tracking-tight text-white font-sans">
                      HACKTOBERFEST
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-black uppercase ${activeTheme.badgeTag}`}>
                      2026 IN-PERSON PASS
                    </span>
                  </div>
                  <div className="text-[9px] font-mono text-zinc-400 tracking-wider mt-0.5">
                    HACK DAY JAUNPUR • 100% OFFLINE ON-CAMPUS
                  </div>
                </div>

                {/* Center Section: Photo + Identity */}
                <div className="py-5 flex flex-col items-center text-center">
                  {/* Glowing Photo Frame */}
                  <div className="relative group">
                    <div className={`w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-emerald-400 to-cyan-400 shadow-xl overflow-hidden`}>
                      <div className="w-full h-full rounded-full bg-neutral-950 overflow-hidden flex items-center justify-center">
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
                    {/* VIP Hacker Hologram Stamp */}
                    <div className="absolute -bottom-2 -right-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-black font-mono font-black text-[9px] tracking-wider uppercase shadow-md flex items-center gap-1">
                      <Zap className="w-2.5 h-2.5" />
                      <span>HACKER</span>
                    </div>
                  </div>

                  {/* Student Full Name */}
                  <h3 className="mt-4 text-2xl font-black text-white tracking-tight drop-shadow-md">
                    {fullName || 'YOUR NAME'}
                  </h3>

                  {/* Hacker Role Pill */}
                  <div className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-medium text-amber-300">
                    <span>{hackerRole}</span>
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

                {/* Footer Strip: QR Code & Security Barcode */}
                <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {/* Simulated High-Tech QR Code */}
                    <div className="w-12 h-12 rounded-lg bg-white p-1 flex items-center justify-center shadow-md">
                      <QrCode className="w-10 h-10 text-black" />
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

            {/* Action Buttons: Download & Viral Share Suite */}
            <div className="w-full max-w-[420px] mt-6 space-y-3">
              {/* Primary Download Button */}
              <button
                onClick={handleDownload}
                disabled={isGenerating}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{isGenerating ? 'Rendering Ultra-HD Card...' : '📥 Download Ultra-HD ID Pass (PNG)'}</span>
              </button>

              {/* Viral WhatsApp Status Share Button */}
              <button
                onClick={handleShareWhatsAppStatus}
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>🔥 Share on WhatsApp Status &amp; Groups</span>
              </button>

              {/* Web Share / Copy Link Button */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleWebShare}
                  className="py-3 px-4 rounded-xl bg-black/70 hover:bg-black/90 border border-white/15 text-zinc-300 hover:text-white font-mono text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Other Apps</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopiedLink(true);
                    soundEngine.playClick();
                    setTimeout(() => setCopiedLink(false), 2000);
                  }}
                  className="py-3 px-4 rounded-xl bg-black/70 hover:bg-black/90 border border-white/15 text-zinc-300 hover:text-white font-mono text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                >
                  {copiedLink ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>

              {/* Instructions Tip */}
              <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 text-center font-mono text-[11px] text-zinc-400">
                💡 <span className="text-zinc-200">Tip:</span> Download the PNG and upload it directly as your <span className="text-amber-300 font-bold">WhatsApp Status</span> or <span className="text-amber-300 font-bold">Instagram Story</span> with <span className="text-white">#HackDayJaunpur #PIT</span>!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
