'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundEngine } from '@/lib/audio';
import {
  X, User, Users, ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle,
  Download, Share2, Loader2, Copy, ExternalLink, Sparkles, ShieldCheck,
  Phone, Mail, Hash, GraduationCap, GitBranch, Trophy, Zap
} from 'lucide-react';

const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxP2NBaEF9qb-XAEjHwdlCKWLTqEtgfuofIFOZFu5GzXwf4CR7v24W3KFLORxaPqcVrgA/exec';

const TRACKS = [
  'Web & Open Innovation',
  'AI / Machine Learning',
  'Cybersecurity & Ethical Hacking',
  'Cloud & DevOps',
  'Mobile App Development',
  'IoT & Embedded Systems',
];

const BRANCHES = ['CSE', 'IT', 'AIML', 'ECE', 'ME', 'EE', 'CE', 'Pharmacy', 'Other'];
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

interface MemberData {
  fullName: string;
  rollNo: string;
  phone: string;
  email: string;
  year: string;
  branch: string;
}

const emptyMember = (): MemberData => ({
  fullName: '', rollNo: '', phone: '', email: '', year: '', branch: '',
});

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillTeamCode?: string;
}

type Step = 'type' | 'form' | 'submitting' | 'success' | 'duplicate' | 'full';
type ParticipationType = 'Solo' | 'Team';

export default function RegistrationModal({ isOpen, onClose, prefillTeamCode }: RegistrationModalProps) {
  // ── Step & flow
  const [step, setStep] = useState<Step>('type');
  const [participationType, setParticipationType] = useState<ParticipationType>('Solo');
  const [teamSize, setTeamSize] = useState<2 | 3>(2);
  const [joinExisting, setJoinExisting] = useState(false);
  const [existingTeamCode, setExistingTeamCode] = useState('');

  // ── Form data
  const [teamName, setTeamName] = useState('');
  const [track, setTrack] = useState(TRACKS[0]);
  const [leader, setLeader] = useState<MemberData>(emptyMember());
  const [member2, setMember2] = useState<MemberData>(emptyMember());
  const [member3, setMember3] = useState<MemberData>(emptyMember());

  // ── UI state
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewTeam, setPreviewTeam] = useState<{ teamName: string; memberCount: number; isFull: boolean } | null>(null);
  const [loadingTeam, setLoadingTeam] = useState(false);

  // ── Success data
  const [ticketId, setTicketId] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [resultTeamName, setResultTeamName] = useState('');
  const [duplicateInfo, setDuplicateInfo] = useState<{ ticketId: string; teamName: string; teamCode: string; name: string } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Prefill when joining via invite link
  useEffect(() => {
    if (prefillTeamCode && isOpen) {
      setParticipationType('Team');
      setJoinExisting(true);
      setExistingTeamCode(prefillTeamCode);
      fetchTeamPreview(prefillTeamCode);
    }
  }, [prefillTeamCode, isOpen]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('type');
        setParticipationType('Solo');
        setTeamSize(2);
        setJoinExisting(false);
        setExistingTeamCode('');
        setTeamName('');
        setTrack(TRACKS[0]);
        setLeader(emptyMember());
        setMember2(emptyMember());
        setMember3(emptyMember());
        setError('');
        setLoading(false);
        setTicketId('');
        setTeamCode('');
        setResultTeamName('');
        setPreviewTeam(null);
        setDuplicateInfo(null);
      }, 300);
    }
  }, [isOpen]);

  // ── CORS-safe fetch helpers ──────────────────────────────
  // Google Apps Script blocks OPTIONS preflight (application/json POST).
  // Fix: use Content-Type: text/plain → treated as "simple request" → no preflight!
  const scriptFetch = async (payload: object) => {
    const res = await fetch(`${APPS_SCRIPT_URL}?action=REGISTER`, {
      method: 'POST',
      // text/plain avoids CORS preflight (no OPTIONS request sent)
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
    return res.json();
  };

  // Fire-and-forget for member 2 / member 3 (no need to await response)
  const scriptPost = (payload: object) => {
    fetch(`${APPS_SCRIPT_URL}?action=REGISTER`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    }).catch(() => {});
  };

  const fetchTeamPreview = async (code: string) => {
    if (!code.trim()) return;
    setLoadingTeam(true);
    setPreviewTeam(null);
    try {
      // GET is a simple request — no CORS preflight needed
      const res = await fetch(
        `${APPS_SCRIPT_URL}?action=getTeam&teamCode=${encodeURIComponent(code.trim())}`,
        { method: 'GET' }
      );
      const data = await res.json();
      if (data.success) {
        setPreviewTeam({ teamName: data.teamName, memberCount: data.memberCount, isFull: data.isFull });
      } else {
        setError('Invalid Team Code. Please ask your Team Leader for the correct code.');
      }
    } catch {
      setError('Could not verify team. Check your connection and try again.');
    } finally {
      setLoadingTeam(false);
    }
  };

  const updateMember = (setter: React.Dispatch<React.SetStateAction<MemberData>>, field: keyof MemberData, val: string) => {
    setter(prev => ({ ...prev, [field]: val }));
  };

  const validateMember = (m: MemberData, label: string): string => {
    if (!m.fullName.trim() || m.fullName.trim().length < 2) return `${label}: Enter full name (min 2 chars).`;
    if (!m.rollNo.trim() || m.rollNo.trim().length < 4) return `${label}: Enter a valid Roll / Enrollment No.`;
    if (!/^[6-9]\d{9}$/.test(m.phone.trim())) return `${label}: Enter a valid 10-digit WhatsApp number.`;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email.trim())) return `${label}: Enter a valid email address.`;
    if (!m.year) return `${label}: Please select academic year.`;
    if (!m.branch) return `${label}: Please select your branch.`;
    return '';
  };

  const handleSubmit = async () => {
    setError('');
    // Validate
    const leaderErr = validateMember(leader, 'Team Leader');
    if (leaderErr) { setError(leaderErr); return; }

    if (participationType === 'Team' && !joinExisting) {
      if (!teamName.trim() || teamName.trim().length < 2) { setError('Please enter a Team Name (min 2 characters).'); return; }
    }
    if (participationType === 'Team' && joinExisting) {
      if (!existingTeamCode.trim()) { setError('Please enter the Team Code shared by your leader.'); return; }
    }
    if (participationType === 'Team' && !joinExisting && teamSize >= 2) {
      const m2Err = validateMember(member2, 'Member 2');
      if (m2Err) { setError(m2Err); return; }
    }
    if (participationType === 'Team' && !joinExisting && teamSize === 3) {
      const m3Err = validateMember(member3, 'Member 3');
      if (m3Err) { setError(m3Err); return; }
    }

    setStep('submitting');
    setLoading(true);

    try {
      const isSolo = participationType === 'Solo';
      const tc = joinExisting ? existingTeamCode.trim().toUpperCase() : undefined;
      const role = joinExisting ? 'Member (Joined via Invite)' : (isSolo ? 'Solo Participant' : 'Team Leader (Member 1)');

      const payload = {
        action: 'REGISTER',
        participationType,
        fullName: leader.fullName.trim(),
        rollNo: leader.rollNo.trim(),
        phone: leader.phone.trim(),
        email: leader.email.trim().toLowerCase(),
        year: leader.year,
        branch: leader.branch,
        teamName: isSolo ? undefined : (joinExisting ? previewTeam?.teamName : teamName.trim()),
        teamCode: tc,
        role,
        track,
      };

      const res = await scriptFetch(payload);
      const data = res;

      if (data.isDuplicate) {
        setDuplicateInfo({ ticketId: data.ticketId, teamName: data.teamName, teamCode: data.teamCode, name: data.registeredName });
        setStep('duplicate');
        return;
      }

      if (data.isFull) {
        setStep('full');
        setError(data.message || 'This team is already full (3/3 members).');
        return;
      }

      if (!data.success) {
        setStep('form');
        setError(data.error || 'Registration failed. Please try again.');
        return;
      }

      // Register Member 2 & 3 as fire-and-forget (no need to block UI)
      if (!isSolo && !joinExisting && teamSize >= 2) {
        const m2Payload = { action: 'REGISTER', participationType: 'Team', fullName: member2.fullName.trim(), rollNo: member2.rollNo.trim(), phone: member2.phone.trim(), email: member2.email.trim().toLowerCase(), year: member2.year, branch: member2.branch, teamCode: data.teamCode, teamName: data.teamName, role: 'Member 2', track };
        scriptPost(m2Payload);
      }
      if (!isSolo && !joinExisting && teamSize === 3) {
        const m3Payload = { action: 'REGISTER', participationType: 'Team', fullName: member3.fullName.trim(), rollNo: member3.rollNo.trim(), phone: member3.phone.trim(), email: member3.email.trim().toLowerCase(), year: member3.year, branch: member3.branch, teamCode: data.teamCode, teamName: data.teamName, role: 'Member 3', track };
        scriptPost(m3Payload);
      }

      setTicketId(data.ticketId);
      setTeamCode(data.teamCode);
      setResultTeamName(data.teamName);
      soundEngine.playClick();
      setStep('success');

      // Generate pass canvas after render
      setTimeout(() => generatePass(data.ticketId, data.teamCode, data.teamName, leader.fullName, role, track), 600);

      // Auto-send WhatsApp confirmation to registrant's own number
      const isTeam = participationType === 'Team';
      const inviteSection = (isTeam && !joinExisting && data.teamCode)
        ? `\n\n📲 *Apne teammates ko invite karo:*\nhttps://hack-avm.pages.dev/?team=${data.teamCode}\n\nYa Team Code share karo: *${data.teamCode}*`
        : '';

      const waMsg = encodeURIComponent(
        `🎉 *Hacktoberfest Hack Day Jaunpur 2026*\n` +
        `📍 Prasad Institute of Technology, Jaunpur\n\n` +
        `✅ *Registration Confirmed!*\n\n` +
        `👤 Name: *${leader.fullName.trim()}*\n` +
        `🎫 Ticket ID: *${data.ticketId}*\n` +
        `👥 Team: *${data.teamName || 'Solo Participant'}*\n` +
        `🔑 Team Code: *${data.teamCode}*\n` +
        `🎯 Track: *${track}*\n\n` +
        `📅 Date: *Saturday, October 24, 2026*\n` +
        `⏰ Time: *09:30 AM IST*\n` +
        `🏛️ Venue: *PIT Campus Auditorium, Jaunpur*\n` +
        `${inviteSection}\n\n` +
        `🆘 Koi problem ho to:\n` +
        `👨‍🏫 Shubhashish Kundu Sir: *+91 63065 88533*\n` +
        `👨‍💻 Preet Yadav: *+91 63945 30549*\n\n` +
        `_Hacktoberfest Hack Day Jaunpur 2026 — In Association with MLH & AKTU_`
      );
      // Open WhatsApp with user's own number — they just press Send once
      const userPhone = leader.phone.trim().replace(/\D/g, '');
      const waPhone = userPhone.startsWith('91') ? userPhone : `91${userPhone}`;
      setTimeout(() => {
        window.open(`https://wa.me/${waPhone}?text=${waMsg}`, '_blank');
      }, 1200); // slight delay so success screen renders first

    } catch (err) {
      setStep('form');
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const generatePass = useCallback((tid: string, tc: string, tn: string, name: string, role: string, tr: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1080;
    canvas.height = 1920;

    // Helper: draw rounded rectangle
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

    // ── 1. BASE BACKGROUND & LUXURY GRADIENT ──
    const bg = ctx.createLinearGradient(0, 0, 1080, 1920);
    bg.addColorStop(0, '#020617');
    bg.addColorStop(0.25, '#070d1e');
    bg.addColorStop(0.5, '#040814');
    bg.addColorStop(0.8, '#080d1a');
    bg.addColorStop(1, '#02040a');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1080, 1920);

    // ── 2. CYBER ISOMETRIC GRID PATTERN ──
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.035)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < 1080; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1920);
      ctx.stroke();
    }
    for (let y = 0; y < 1920; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1080, y);
      ctx.stroke();
    }

    // ── 3. GLOWING AMBIENT LIGHT FLARES ──
    // Top-center gold glow
    const topGlow = ctx.createRadialGradient(540, 220, 0, 540, 220, 500);
    topGlow.addColorStop(0, 'rgba(245, 158, 11, 0.22)');
    topGlow.addColorStop(0.6, 'rgba(245, 158, 11, 0.04)');
    topGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = topGlow;
    ctx.fillRect(0, 0, 1080, 750);

    // Mid emerald glow
    const midGlow = ctx.createRadialGradient(200, 1000, 0, 200, 1000, 450);
    midGlow.addColorStop(0, 'rgba(16, 185, 129, 0.12)');
    midGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = midGlow;
    ctx.fillRect(0, 700, 1080, 800);

    // Bottom gold glow
    const botGlow = ctx.createRadialGradient(880, 1700, 0, 880, 1700, 400);
    botGlow.addColorStop(0, 'rgba(245, 158, 11, 0.1)');
    botGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = botGlow;
    ctx.fillRect(0, 1400, 1080, 520);

    // ── 4. MULTI-TIER ROYAL METALLIC BORDERS & CYBER CORNERS ──
    // Outer border
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 6;
    drawRoundRect(28, 28, 1024, 1864, 24);
    ctx.stroke();

    // Inner thin border
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
    ctx.lineWidth = 1.5;
    drawRoundRect(42, 42, 996, 1836, 18);
    ctx.stroke();

    // Tech corner brackets (top-left, top-right, bottom-left, bottom-right)
    const drawCorner = (cx: number, cy: number, dx: number, dy: number) => {
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx, cy + dy * 32);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx + dx * 32, cy);
      ctx.stroke();
    };
    drawCorner(54, 54, 1, 1);
    drawCorner(1026, 54, -1, 1);
    drawCorner(54, 1866, 1, -1);
    drawCorner(1026, 1866, -1, -1);

    // ── 5. TOP INSTITUTIONAL HEADER ──
    ctx.textAlign = 'center';
    
    // Top crest pill
    ctx.fillStyle = 'rgba(245, 158, 11, 0.12)';
    drawRoundRect(340, 68, 400, 36, 18);
    ctx.fill();
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('★ AKTU CODE: 144  •  ESTD. 2002 ★', 540, 91);

    // College Name
    ctx.fillStyle = '#f8fafc';
    ctx.font = '900 34px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('PRASAD INSTITUTE OF TECHNOLOGY', 540, 152);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '1.5px';
    ctx.fillText('Department of Computer Science & Engineering · Jaunpur, U.P.', 540, 186);

    // Divider Line with diamond center
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(90, 218);
    ctx.lineTo(510, 218);
    ctx.moveTo(570, 218);
    ctx.lineTo(990, 218);
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(540, 218, 5, 0, Math.PI * 2);
    ctx.fill();

    // ── 6. HACKATHON HERO TITLE & VERIFIED BADGE ──
    // Royal Verified Badge Pill
    const badgeGrad = ctx.createLinearGradient(360, 245, 720, 245);
    badgeGrad.addColorStop(0, 'rgba(16, 185, 129, 0.22)');
    badgeGrad.addColorStop(1, 'rgba(5, 150, 105, 0.12)');
    ctx.fillStyle = badgeGrad;
    drawRoundRect(330, 246, 420, 44, 22);
    ctx.fill();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('✦ OFFICIAL IN-PERSON VIP PASS ✦', 540, 274);

    // Main Titles
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 84px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '-1px';
    ctx.fillText('HACKTOBERFEST', 540, 376);

    const titleGrad = ctx.createLinearGradient(200, 440, 880, 440);
    titleGrad.addColorStop(0, '#f59e0b');
    titleGrad.addColorStop(0.5, '#fde047');
    titleGrad.addColorStop(1, '#f59e0b');
    ctx.fillStyle = titleGrad;
    ctx.font = '900 52px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('HACK DAY JAUNPUR 2026', 540, 444);

    // Date & Venue Chip Bar
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    drawRoundRect(140, 478, 800, 48, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 17px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText('📅 SATURDAY, OCT 24, 2026   •   ⏰ 09:30 AM IST   •   🏛️ AUDITORIUM', 540, 508);

    // ── 7. VIP PARTICIPANT IDENTITY CARD (The Centerpiece) ──
    const cardX = 80;
    const cardY = 560;
    const cardW = 920;
    const cardH = 580;

    // Card background & metallic gradient
    const cardBg = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
    cardBg.addColorStop(0, '#0c1326');
    cardBg.addColorStop(0.5, '#070b16');
    cardBg.addColorStop(1, '#05070f');
    ctx.fillStyle = cardBg;
    drawRoundRect(cardX, cardY, cardW, cardH, 24);
    ctx.fill();

    // Card border
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.55)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Card top ribbon
    const ribbonGrad = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY);
    ribbonGrad.addColorStop(0, '#f59e0b');
    ribbonGrad.addColorStop(0.5, '#d97706');
    ribbonGrad.addColorStop(1, '#b45309');
    ctx.fillStyle = ribbonGrad;
    ctx.beginPath();
    ctx.moveTo(cardX + 24, cardY);
    ctx.lineTo(cardX + cardW - 24, cardY);
    ctx.quadraticCurveTo(cardX + cardW, cardY, cardX + cardW, cardY + 24);
    ctx.lineTo(cardX + cardW, cardY + 46);
    ctx.lineTo(cardX, cardY + 46);
    ctx.lineTo(cardX, cardY + 24);
    ctx.quadraticCurveTo(cardX, cardY, cardX + 24, cardY);
    ctx.closePath();
    ctx.fill();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#000000';
    ctx.font = '900 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('★ PIT CSE HACKATHON PROTOCOL • CONFIRMED ENTRY ★', cardX + 32, cardY + 30);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 14px "Courier New", monospace';
    ctx.fillText('AUTH-LEVEL-1', cardX + cardW - 32, cardY + 30);

    // Participant Name Display
    ctx.textAlign = 'left';
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 16px "Courier New", monospace';
    ctx.letterSpacing = '2px';
    ctx.fillText('DELEGATE NAME', cardX + 44, cardY + 98);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 50px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '0px';
    ctx.fillText(name, cardX + 44, cardY + 154);

    // Role Badge Pill next to name
    const roleWidth = Math.max(160, role.length * 13 + 36);
    ctx.fillStyle = role.includes('Leader') ? 'rgba(245, 158, 11, 0.18)' : 'rgba(16, 185, 129, 0.18)';
    drawRoundRect(cardX + 44, cardY + 176, roleWidth, 38, 19);
    ctx.fill();
    ctx.strokeStyle = role.includes('Leader') ? '#f59e0b' : '#10b981';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = role.includes('Leader') ? '#fbbf24' : '#34d399';
    ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText(`👑 ${role.toUpperCase()}`, cardX + 62, cardY + 201);

    // Grid divider
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cardX + 44, cardY + 234);
    ctx.lineTo(cardX + cardW - 44, cardY + 234);
    ctx.stroke();

    // 4-Box Info Grid inside the card
    const gridFields = [
      { label: 'TICKET IDENTIFIER', val: tid, color: '#f59e0b', mono: true, size: 28 },
      { label: 'AFFILIATED SQUAD', val: tn, color: '#ffffff', mono: false, size: 24 },
      { label: 'INNOVATION TRACK', val: tr || 'General Track', color: '#38bdf8', mono: false, size: 24 },
      { label: 'ACCREDITATION', val: 'Dept. of CSE, PIT', color: '#a1a1aa', mono: false, size: 24 },
    ];

    const colW = (cardW - 88) / 2;
    gridFields.forEach((gf, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const fx = cardX + 44 + col * colW;
      const fy = cardY + 280 + row * 92;

      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 13px "Courier New", monospace';
      ctx.letterSpacing = '2px';
      ctx.fillText(gf.label, fx, fy);

      ctx.fillStyle = gf.color;
      ctx.font = gf.mono ? `900 ${gf.size}px "Courier New", monospace` : `bold ${gf.size}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      ctx.letterSpacing = gf.mono ? '1.5px' : '0.5px';
      // Truncate if too long
      const textMetrics = ctx.measureText(gf.val);
      let renderText = gf.val;
      if (textMetrics.width > colW - 30) {
        renderText = gf.val.substring(0, 22) + '...';
      }
      ctx.fillText(renderText, fx, fy + 34);
    });

    // Sub-card bottom security strip
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    drawRoundRect(cardX + 24, cardY + cardH - 84, cardW - 48, 62, 12);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = '900 13px "Courier New", monospace';
    ctx.letterSpacing = '1px';
    ctx.fillText('STATUS: CONFIRMED DELEGATE', cardX + 46, cardY + cardH - 48);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 12px "Courier New", monospace';
    ctx.fillText(`HASH: ${tid.replace(/[^0-9]/g, '')}-SECURE-VERIFIED`, cardX + cardW - 46, cardY + cardH - 48);

    // ── 8. TEAM SQUAD PASSCODE SECTION (If Team) ──
    let nextY = 1170;
    if (tc && !tc.startsWith('SOLO')) {
      const tcBoxH = 110;
      ctx.fillStyle = 'rgba(5, 46, 22, 0.6)';
      drawRoundRect(80, nextY, 920, tcBoxH, 18);
      ctx.fill();
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.55)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#34d399';
      ctx.font = '900 13px "Courier New", monospace';
      ctx.letterSpacing = '3px';
      ctx.fillText('⚡ SQUAD ACCESS KEY — SHARE WITH YOUR TEAMMATES', 112, nextY + 38);

      ctx.fillStyle = '#fde047';
      ctx.font = '900 42px "Courier New", monospace';
      ctx.letterSpacing = '4px';
      ctx.fillText(tc, 112, nextY + 86);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#6ee7b7';
      ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('🔗 hack-avm.pages.dev/?team=' + tc, 970, nextY + 68);

      nextY += tcBoxH + 28;
    } else {
      nextY += 10;
    }

    // ── 9. PROCEDURAL CRYPTOGRAPHIC BARCODE ──
    const barY = nextY;
    const barH = 58;
    const barStart = 120;
    const barWidth = 840;

    // Draw realistic barcode lines
    ctx.fillStyle = '#ffffff';
    let currX = barStart;
    const pattern = [2, 4, 1, 3, 2, 5, 1, 2, 4, 2, 1, 3, 4, 2, 1, 5, 2, 3, 1, 4, 2, 1, 3, 5, 2, 1, 4, 3, 2, 1, 4, 2, 3, 1, 5, 2, 4, 1, 3, 2, 4, 1, 2, 5, 3, 1, 4, 2];
    let pIdx = 0;
    while (currX < barStart + barWidth) {
      const w = pattern[pIdx % pattern.length];
      ctx.fillRect(currX, barY, w * 2.2, barH);
      currX += w * 2.2 + ((pIdx % 3 === 0) ? 5 : 3);
      pIdx++;
    }

    ctx.textAlign = 'center';
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 12px "Courier New", monospace';
    ctx.letterSpacing = '6px';
    ctx.fillText(`* ${tid} * 2026-HACKTOBERFEST-JAUNPUR *`, 540, barY + barH + 24);

    // ── 10. DIRECT COORDINATOR HOTLINE CHIPS ──
    const hotlineY = barY + barH + 54;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    drawRoundRect(80, hotlineY, 920, 150, 20);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#f59e0b';
    ctx.font = '900 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('🆘 HAVING ANY ISSUES? DIRECT COORDINATOR HOTLINE', 110, hotlineY + 34);

    // Card 1: Shubhashish Kundu Sir
    ctx.fillStyle = 'rgba(245, 158, 11, 0.08)';
    drawRoundRect(110, hotlineY + 50, 410, 78, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#fbbf24';
    ctx.font = '900 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('👨‍🏫 Shubhashish Kundu Sir', 128, hotlineY + 78);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px "Courier New", monospace';
    ctx.fillText('+91 63065 88533', 128, hotlineY + 104);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Faculty Coordinator', 376, hotlineY + 104);

    // Card 2: Preet Yadav
    ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
    drawRoundRect(550, hotlineY + 50, 410, 78, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#34d399';
    ctx.font = '900 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('👨‍💻 Preet Yadav', 568, hotlineY + 78);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px "Courier New", monospace';
    ctx.fillText('+91 63945 30549', 568, hotlineY + 104);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Student Coordinator', 814, hotlineY + 104);

    // ── 11. FOOTER & MOTTO ──
    const footY = hotlineY + 184;
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(90, footY);
    ctx.lineTo(990, footY);
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText('🏆 In Association with Major League Hacking (MLH)  •  AKTU Lucknow', 540, footY + 34);

    ctx.fillStyle = '#64748b';
    ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Organized by Dept. of CSE • Prasad Institute of Technology • Jaunpur, Uttar Pradesh', 540, footY + 60);

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 12px "Courier New", monospace';
    ctx.letterSpacing = '2px';
    ctx.fillText('INNOVATE • CODE • CONQUER — hack-avm.pages.dev', 540, footY + 84);
  }, []);

  const downloadPass = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    soundEngine.playClick();
    const a = document.createElement('a');
    a.download = `HackdayJaunpur2026_Pass_${ticketId}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
  };

  const shareOnWhatsApp = () => {
    const msg = encodeURIComponent(
      `🚀 *Hacktoberfest Hack Day Jaunpur 2026*\n\n` +
      `🎫 Ticket: *${ticketId}*\n` +
      `👥 Team: *${resultTeamName}*\n` +
      `🔑 Team Code: *${teamCode}*\n\n` +
      `🎓 Join our team using invite link:\n` +
      `https://hack-day-jaunpur.pages.dev/?team=${teamCode}\n\n` +
      `📅 Oct 24, 2026 | 09:30 AM | PIT Auditorium, Jaunpur`
    );
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  const copyTeamCode = () => {
    navigator.clipboard.writeText(teamCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isOpen) return null;

  // ─── RENDER ─────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-2xl">
      <div className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-neutral-900 via-black to-neutral-950 border-2 border-amber-500/50 shadow-[0_0_100px_rgba(245,158,11,0.3)] text-white">

        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        {step !== 'submitting' && (
          <button onClick={() => { soundEngine.playClick(); onClose(); }}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="p-5 sm:p-7">

          {/* ── STEP 1: Type Selection ─────────────────────── */}
          {step === 'type' && (
            <div className="space-y-6 text-center">
              {/* Header */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  REGISTRATIONS NOW OPEN
                </div>
                <div className="w-16 h-16 mx-auto rounded-full bg-white p-0.5 border-2 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.4)] mb-3 flex items-center justify-center">
                  <img src="/pit-logo.png" alt="PIT Logo" className="w-full h-full object-contain rounded-full" />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight">
                  HACKTOBERFEST <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">HACK DAY JAUNPUR 2026</span>
                </h2>
                <p className="text-zinc-400 text-sm mt-2">Saturday, Oct 24, 2026 · PIT Auditorium · Jaunpur</p>
              </div>

              <p className="text-sm text-zinc-300 font-mono">How do you want to participate?</p>

              {/* Participation type cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {/* Solo */}
                <button onClick={() => { setParticipationType('Solo'); setStep('form'); soundEngine.playClick(); }}
                  className="group p-5 rounded-2xl bg-black/70 border-2 border-white/10 hover:border-amber-400/60 hover:bg-amber-500/5 transition-all text-left cursor-pointer"
                >
                  <User className="w-8 h-8 text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
                  <div className="font-black text-base uppercase tracking-wide">Solo Hacker</div>
                  <div className="text-xs text-zinc-400 mt-1">Just you. Build alone, win alone. Maximum focus!</div>
                  <div className="mt-3 text-[10px] font-mono text-amber-400 uppercase tracking-widest">1 Member → Individual Pass →</div>
                </button>

                {/* Team */}
                <button onClick={() => { setParticipationType('Team'); setStep('form'); soundEngine.playClick(); }}
                  className="group p-5 rounded-2xl bg-black/70 border-2 border-white/10 hover:border-emerald-400/60 hover:bg-emerald-500/5 transition-all text-left cursor-pointer"
                >
                  <Users className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
                  <div className="font-black text-base uppercase tracking-wide">Team Sprint</div>
                  <div className="text-xs text-zinc-400 mt-1">2 or 3 members. Collaborate, build, dominate!</div>
                  <div className="mt-3 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">2–3 Members → Team Pass →</div>
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Registration Form ──────────────────── */}
          {step === 'form' && (
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-center gap-3">
                <button onClick={() => { setStep('type'); setError(''); soundEngine.playClick(); }}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0">
                  <ArrowLeft className="w-4 h-4 text-zinc-300" />
                </button>
                <div>
                  <h3 className="font-black text-lg uppercase tracking-tight">
                    {participationType === 'Solo' ? '⚡ Solo Hacker Registration' : '🛡️ Team Registration'}
                  </h3>
                  <p className="text-zinc-400 text-xs mt-0.5">Prasad Institute of Technology · CSE Dept · Oct 24, 2026</p>
                </div>
              </div>

              {/* Team Options (only for Team) */}
              {participationType === 'Team' && (
                <div className="space-y-3">
                  {/* Create / Join toggle */}
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => { setJoinExisting(false); setError(''); soundEngine.playClick(); }}
                      className={`p-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wide border transition-all cursor-pointer ${!joinExisting ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-black/40 border-white/10 text-zinc-400 hover:border-white/25'}`}>
                      + Create New Team
                    </button>
                    <button onClick={() => { setJoinExisting(true); setError(''); soundEngine.playClick(); }}
                      className={`p-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wide border transition-all cursor-pointer ${joinExisting ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-black/40 border-white/10 text-zinc-400 hover:border-white/25'}`}>
                      🔗 Join via Code
                    </button>
                  </div>

                  {/* Create Team fields */}
                  {!joinExisting && (
                    <div className="space-y-3">
                      <InputField icon={<Trophy className="w-3.5 h-3.5" />} placeholder="Team Name * (e.g. Cyber Titans)" value={teamName} onChange={setTeamName} />
                      <div>
                        <p className="text-zinc-400 font-mono text-xs mb-2 uppercase tracking-wide">Team Size:</p>
                        <div className="flex gap-2">
                          {([2, 3] as const).map(s => (
                            <button key={s} onClick={() => { setTeamSize(s); soundEngine.playClick(); }}
                              className={`flex-1 py-2 rounded-xl font-mono text-sm font-bold border transition-all cursor-pointer ${teamSize === s ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-black/40 border-white/10 text-zinc-400 hover:border-white/25'}`}>
                              {s} Members
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Join via code */}
                  {joinExisting && (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <InputField icon={<Hash className="w-3.5 h-3.5" />} placeholder="Enter Team Code (e.g. PIT-482)" value={existingTeamCode}
                          onChange={v => { setExistingTeamCode(v); setPreviewTeam(null); }} />
                        <button onClick={() => fetchTeamPreview(existingTeamCode)} disabled={loadingTeam || !existingTeamCode.trim()}
                          className="flex-shrink-0 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold hover:bg-amber-500/30 transition-all cursor-pointer disabled:opacity-50">
                          {loadingTeam ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify'}
                        </button>
                      </div>
                      {previewTeam && (
                        <div className={`p-3 rounded-xl border font-mono text-xs ${previewTeam.isFull ? 'bg-red-500/10 border-red-500/40 text-red-400' : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'}`}>
                          {previewTeam.isFull
                            ? `❌ Team "${previewTeam.teamName}" is FULL (3/3 members). Please contact your leader.`
                            : `✅ Team "${previewTeam.teamName}" found! (${previewTeam.memberCount}/3 members) — Slot available for you!`}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Leader / Your Details */}
              <MemberFormCard
                label={participationType === 'Team' && !joinExisting ? '👑 Team Leader Details (Your Info)' : '👤 Your Details'}
                iconColor="amber"
                data={leader}
                onUpdate={(f, v) => setLeader(prev => ({ ...prev, [f]: v }))}
              />

              {/* Member 2 */}
              {participationType === 'Team' && !joinExisting && teamSize >= 2 && (
                <MemberFormCard label="👤 Member 2 Details" iconColor="cyan" data={member2}
                  onUpdate={(f, v) => setMember2(prev => ({ ...prev, [f]: v }))} />
              )}

              {/* Member 3 */}
              {participationType === 'Team' && !joinExisting && teamSize === 3 && (
                <MemberFormCard label="👤 Member 3 Details" iconColor="purple" data={member3}
                  onUpdate={(f, v) => setMember3(prev => ({ ...prev, [f]: v }))} />
              )}

              {/* Track selection */}
              <div>
                <p className="text-zinc-400 font-mono text-xs mb-2 uppercase tracking-wide flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Focus Track *
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {TRACKS.map(t => (
                    <button key={t} onClick={() => { setTrack(t); soundEngine.playClick(); }}
                      className={`p-2.5 rounded-xl font-mono text-[11px] border transition-all cursor-pointer text-left leading-tight ${track === t ? 'bg-amber-500/20 border-amber-400/70 text-amber-300' : 'bg-black/40 border-white/8 text-zinc-400 hover:border-white/20 hover:text-zinc-200'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-sm">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit */}
              <button onClick={() => { soundEngine.playClick(); handleSubmit(); }}
                disabled={loading || (joinExisting && (!previewTeam || previewTeam.isFull))}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-black text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:shadow-[0_0_55px_rgba(245,158,11,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                <Sparkles className="w-4 h-4" />
                <span>
                  {participationType === 'Solo' ? 'Register as Solo Hacker' : (joinExisting ? 'Join Team & Generate Pass' : `Register Team (${teamSize} Members)`)}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-[10px] font-mono text-zinc-600">
                Prasad Institute of Technology · Department of CSE · Jaunpur · In Association with MLH & AKTU
              </p>
            </div>
          )}

          {/* ── STEP: Submitting ───────────────────────────── */}
          {step === 'submitting' && (
            <div className="flex flex-col items-center justify-center py-16 space-y-5 text-center">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-4 border-amber-500/30" />
                <div className="absolute inset-0 rounded-full border-4 border-t-amber-400 animate-spin" />
                <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-amber-400" />
              </div>
              <h3 className="font-black text-xl uppercase text-amber-400">Processing Registration...</h3>
              <p className="text-zinc-400 text-sm font-mono">Generating your official Hack Day Pass.<br />This will take a moment.</p>
            </div>
          )}

          {/* ── STEP: Success ──────────────────────────────── */}
          {step === 'success' && (
            <div className="space-y-4">

              {/* 🌟 Royal Animated Header */}
              <div className="relative text-center py-6 overflow-hidden">
                {/* Animated star burst rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="absolute w-32 h-32 rounded-full border border-amber-400/20 animate-ping" style={{ animationDuration: '2s' }} />
                  <div className="absolute w-48 h-48 rounded-full border border-emerald-400/10 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }} />
                  <div className="absolute w-64 h-64 rounded-full border border-amber-400/5 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.6s' }} />
                </div>

                {/* Crown icon */}
                <div className="relative mx-auto w-20 h-20 mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/30 to-amber-600/10 animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-2 border-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.6)]" />
                  <div className="absolute inset-0 flex items-center justify-center text-4xl">👑</div>
                </div>

                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-widest mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                    REGISTRATION CONFIRMED
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300">
                      Welcome, Hacker!
                    </span>
                  </h3>
                  <p className="text-zinc-400 text-xs font-mono mt-1">
                    You&apos;re officially in. Your pass has been generated &amp; emailed. ✉️
                  </p>
                </div>
              </div>

              {/* 🎫 Royal Ticket Card */}
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.2)]">
                {/* Card gradient bg */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-amber-950/20" />
                {/* Top gold bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                {/* Bottom gold bar */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

                <div className="relative p-5 space-y-3">
                  {/* Ticket header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-mono text-amber-400/70 uppercase tracking-widest">PRASAD INSTITUTE OF TECHNOLOGY</p>
                      <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-wider">Hacktoberfest Hack Day Jaunpur 2026</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-[9px] font-mono text-emerald-400 font-bold uppercase">
                        ✓ VALID
                      </span>
                    </div>
                  </div>

                  {/* Dashed separator */}
                  <div className="border-t border-dashed border-white/10" />

                  {/* Main ticket info */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 font-mono">
                    <div>
                      <p className="text-[9px] text-zinc-600 uppercase tracking-wider mb-0.5">Ticket ID</p>
                      <p className="text-amber-400 font-black text-sm tracking-wider">{ticketId}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-zinc-600 uppercase tracking-wider mb-0.5">Event Date</p>
                      <p className="text-white font-bold text-xs">Oct 24, 2026</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-zinc-600 uppercase tracking-wider mb-0.5">Team / Name</p>
                      <p className="text-white font-bold text-xs truncate">{resultTeamName}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-zinc-600 uppercase tracking-wider mb-0.5">Venue</p>
                      <p className="text-white font-bold text-xs">PIT Auditorium</p>
                    </div>
                    {teamCode && !teamCode.startsWith('SOLO') && (
                      <div className="col-span-2">
                        <p className="text-[9px] text-zinc-600 uppercase tracking-wider mb-0.5">Team Code</p>
                        <div className="flex items-center gap-2">
                          <p className="text-emerald-400 font-black text-lg tracking-widest">{teamCode}</p>
                          <button onClick={copyTeamCode}
                            className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-colors cursor-pointer flex-shrink-0"
                            title="Copy Team Code">
                            {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <span className="text-[9px] text-zinc-600 font-mono">Tap to copy</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 📲 Invite Teammates (only for team leaders) */}
              {teamCode && !teamCode.startsWith('SOLO') && (
                <div className="relative p-4 rounded-2xl overflow-hidden border border-emerald-500/25">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/40 via-black to-emerald-950/20" />
                  <div className="relative space-y-2">
                    <p className="text-emerald-400 font-black font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                      <span className="text-lg">📲</span> Invite Your Teammates
                    </p>
                    <p className="text-zinc-300 text-xs leading-relaxed">
                      Share your <span className="text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded font-mono">{teamCode}</span> with teammates.
                      They&apos;ll open the website, watch the cinematic trailer, and then join your team!
                    </p>
                    <div className="flex items-center gap-2 mt-2 p-2 rounded-xl bg-black/40 border border-white/5 font-mono text-[10px] text-zinc-500 break-all">
                      🔗 hack-avm.pages.dev/?team={teamCode}
                    </div>
                  </div>
                </div>
              )}

              {/* Canvas (hidden, for download) */}
              <canvas ref={canvasRef} className="hidden" />

              {/* 🔥 Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button onClick={downloadPass}
                  className="group relative py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:shadow-[0_0_55px_rgba(245,158,11,0.8)] hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer flex items-center justify-center gap-2 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-white/20 to-yellow-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <Download className="w-4 h-4 relative" />
                  <span className="relative">Download Official Pass</span>
                </button>

                <button onClick={shareOnWhatsApp}
                  className="group py-4 rounded-2xl bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/40 hover:border-emerald-400/70 text-emerald-300 font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]">
                  <Share2 className="w-4 h-4" />
                  <span>Share on WhatsApp</span>
                </button>
              </div>

              {/* 🆘 Having Any Issues? */}
              <div className="relative p-4 rounded-2xl border border-white/8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/80 via-black to-zinc-900/40" />
                <div className="relative space-y-3">
                  <p className="text-zinc-300 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                    <span className="text-base">🆘</span> Having Any Issues?
                  </p>
                  <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">
                    Registration problems, team issues, or any queries — contact our coordinators directly:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* Shubhashish Kundu Sir */}
                    <a href="tel:+916306588533"
                      className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/8 border border-amber-500/20 hover:bg-amber-500/15 hover:border-amber-400/40 transition-all cursor-pointer group">
                      <div className="w-9 h-9 rounded-full bg-amber-500/15 border border-amber-400/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <span className="text-base">👨‍🏫</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-amber-400 font-bold text-[10px] uppercase tracking-wide truncate">Shubhashish Kundu Sir</p>
                        <p className="text-zinc-300 font-mono text-xs font-bold">+91 63065 88533</p>
                        <p className="text-zinc-600 text-[9px] font-mono">Faculty Coordinator</p>
                      </div>
                    </a>
                    {/* Preet Yadav */}
                    <a href="tel:+916394530549"
                      className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/8 border border-emerald-500/20 hover:bg-emerald-500/15 hover:border-emerald-400/40 transition-all cursor-pointer group">
                      <div className="w-9 h-9 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <span className="text-base">👨‍💻</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-emerald-400 font-bold text-[10px] uppercase tracking-wide truncate">Preet Yadav</p>
                        <p className="text-zinc-300 font-mono text-xs font-bold">+91 63945 30549</p>
                        <p className="text-zinc-600 text-[9px] font-mono">Student Coordinator</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <button onClick={() => { soundEngine.playClick(); onClose(); }}
                className="w-full py-3 rounded-2xl bg-white/3 hover:bg-white/8 text-zinc-500 hover:text-zinc-300 font-mono text-[10px] uppercase tracking-widest border border-white/5 hover:border-white/15 transition-all cursor-pointer">
                ← Close & Explore the Hackathon Website
              </button>
            </div>
          )}


          {/* ── STEP: Duplicate ────────────────────────────── */}
          {step === 'duplicate' && duplicateInfo && (
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                <ShieldCheck className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-black uppercase">Already Registered! ✅</h3>
              <p className="text-zinc-300 text-sm">Our system found an existing registration for this Roll Number or Email.</p>

              <div className="p-4 rounded-2xl bg-black/70 border border-amber-500/30 space-y-2 font-mono text-sm text-left">
                <div className="flex justify-between pb-2 border-b border-white/5">
                  <span className="text-zinc-500 text-xs">Participant</span>
                  <span className="text-white font-bold">{duplicateInfo.name}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/5">
                  <span className="text-zinc-500 text-xs">Ticket ID</span>
                  <span className="text-amber-400 font-bold">{duplicateInfo.ticketId}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/5">
                  <span className="text-zinc-500 text-xs">Team</span>
                  <span className="text-white">{duplicateInfo.teamName}</span>
                </div>
                {duplicateInfo.teamCode && !duplicateInfo.teamCode.startsWith('SOLO') && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-xs">Team Code</span>
                    <span className="text-emerald-400 font-bold">{duplicateInfo.teamCode}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button onClick={() => {
                  setTicketId(duplicateInfo.ticketId);
                  setTeamCode(duplicateInfo.teamCode);
                  setResultTeamName(duplicateInfo.teamName);
                  setTimeout(() => generatePass(duplicateInfo.ticketId, duplicateInfo.teamCode, duplicateInfo.teamName, duplicateInfo.name, 'Registered Participant', track), 200);
                  setStep('success');
                  soundEngine.playClick();
                }} className="py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-black font-black text-xs uppercase tracking-wider hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.4)]">
                  <Download className="w-4 h-4" />
                  <span>Download My Pass</span>
                </button>
                <button onClick={() => { soundEngine.playClick(); onClose(); }}
                  className="py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-300 font-mono text-xs uppercase tracking-wide border border-white/10 hover:border-white/20 transition-all cursor-pointer">
                  Close
                </button>
              </div>
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}

          {/* ── STEP: Team Full ────────────────────────────── */}
          {step === 'full' && (
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 border-2 border-red-400 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-black uppercase text-red-400">Team Capacity Reached</h3>
              <p className="text-zinc-300 text-sm leading-relaxed">{error}</p>
              <p className="text-zinc-400 text-xs">Please ask your Team Leader to check, or register as a Solo Hacker or create a new team.</p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => { setStep('type'); setError(''); setJoinExisting(false); setExistingTeamCode(''); setPreviewTeam(null); soundEngine.playClick(); }}
                  className="py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-300 font-mono text-xs uppercase tracking-wide border border-white/10 hover:border-white/20 transition-all cursor-pointer">
                  Start Over
                </button>
                <button onClick={() => { soundEngine.playClick(); onClose(); }}
                  className="py-3.5 rounded-2xl bg-red-500/15 border border-red-500/40 text-red-300 font-mono text-xs uppercase tracking-wide hover:bg-red-500/25 transition-all cursor-pointer">
                  Close
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ─── Shared Input Components ─────────────────────────────────
function InputField({ icon, placeholder, value, onChange, type = 'text' }: {
  icon: React.ReactNode; placeholder: string; value: string;
  onChange: (v: string) => void; type?: string;
}) {
  return (
    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 focus-within:border-amber-400/60 transition-colors">
      <span className="text-zinc-500 flex-shrink-0">{icon}</span>
      <input type={type} placeholder={placeholder} value={value}
        onChange={e => onChange(e.target.value)}
        className="bg-transparent w-full text-sm text-white placeholder:text-zinc-600 font-mono focus:outline-none" />
    </div>
  );
}

function SelectField({ icon, placeholder, value, onChange, options }: {
  icon: React.ReactNode; placeholder: string; value: string;
  onChange: (v: string) => void; options: string[];
}) {
  return (
    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 focus-within:border-amber-400/60 transition-colors">
      <span className="text-zinc-500 flex-shrink-0">{icon}</span>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="bg-transparent w-full text-sm font-mono focus:outline-none cursor-pointer text-white">
        <option value="" disabled className="bg-neutral-900 text-zinc-500">{placeholder}</option>
        {options.map(o => <option key={o} value={o} className="bg-neutral-900 text-white">{o}</option>)}
      </select>
    </div>
  );
}

// ─── MemberFormCard — MUST be outside RegistrationModal ──────
// If defined inside the parent component, React creates a NEW component
// type on every render → inputs unmount/remount → focus lost after each keystroke.
// Defined at module scope = stable reference = no remounting = typing works perfectly.
function MemberFormCard({
  label,
  iconColor,
  data,
  onUpdate,
}: {
  label: string;
  iconColor: 'amber' | 'cyan' | 'purple';
  data: MemberData;
  onUpdate: (field: keyof MemberData, value: string) => void;
}) {
  const labelColor =
    iconColor === 'amber' ? 'text-amber-400' :
    iconColor === 'cyan' ? 'text-cyan-400' : 'text-purple-400';

  return (
    <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <User className={`w-4 h-4 ${labelColor}`} />
        <span className={`font-mono font-bold text-xs uppercase tracking-widest ${labelColor}`}>{label}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InputField
          icon={<User className="w-3.5 h-3.5" />}
          placeholder="Full Name *"
          value={data.fullName}
          onChange={v => onUpdate('fullName', v)}
        />
        <InputField
          icon={<Hash className="w-3.5 h-3.5" />}
          placeholder="Roll / Enrollment No *"
          value={data.rollNo}
          onChange={v => onUpdate('rollNo', v)}
        />
        <InputField
          icon={<Phone className="w-3.5 h-3.5" />}
          placeholder="WhatsApp Number *"
          value={data.phone}
          onChange={v => onUpdate('phone', v)}
          type="tel"
        />
        <InputField
          icon={<Mail className="w-3.5 h-3.5" />}
          placeholder="Email Address *"
          value={data.email}
          onChange={v => onUpdate('email', v)}
          type="email"
        />
        <SelectField
          icon={<GraduationCap className="w-3.5 h-3.5" />}
          placeholder="Academic Year *"
          value={data.year}
          onChange={v => onUpdate('year', v)}
          options={YEARS}
        />
        <SelectField
          icon={<GitBranch className="w-3.5 h-3.5" />}
          placeholder="Branch *"
          value={data.branch}
          onChange={v => onUpdate('branch', v)}
          options={BRANCHES}
        />
      </div>
    </div>
  );
}

