'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundEngine } from '@/lib/audio';
import {
  X, User, Users, ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle,
  Download, Share2, Loader2, Copy, ExternalLink, Sparkles, ShieldCheck,
  Phone, Mail, Hash, GraduationCap, GitBranch, Trophy, Zap
} from 'lucide-react';

const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbx9NY9xcIC6luKL2RbHp2Unc34zfx4deWxLAemZGuzz2A-xsQdi3MPl2GQB5LZX3wg/exec';

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
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      // text/plain avoids CORS preflight (no OPTIONS request sent)
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
    return res.json();
  };

  // Fire-and-forget for member 2 / member 3 (no need to await response)
  const scriptPost = (payload: object) => {
    fetch(APPS_SCRIPT_URL, {
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

    // Background
    const bg = ctx.createLinearGradient(0, 0, 0, 1920);
    bg.addColorStop(0, '#020818');
    bg.addColorStop(0.4, '#0a0f1e');
    bg.addColorStop(1, '#030712');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1080, 1920);

    // Golden border
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 8;
    ctx.strokeRect(24, 24, 1032, 1872);
    ctx.strokeStyle = 'rgba(245,158,11,0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(36, 36, 1008, 1848);

    // Ambient glow top
    const glow = ctx.createRadialGradient(540, 300, 0, 540, 300, 500);
    glow.addColorStop(0, 'rgba(245,158,11,0.15)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 1080, 600);

    // Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 36px Arial';
    ctx.fillText('PRASAD INSTITUTE OF TECHNOLOGY', 540, 120);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '24px Arial';
    ctx.fillText('Department of Computer Science & Engineering, Jaunpur', 540, 160);

    // Divider
    ctx.strokeStyle = 'rgba(245,158,11,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(60, 190); ctx.lineTo(1020, 190); ctx.stroke();

    // Hackathon Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 80px Arial';
    ctx.fillText('HACKTOBERFEST', 540, 300);
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 56px Arial';
    ctx.fillText('HACK DAY JAUNPUR 2026', 540, 380);

    // Badge circle
    const badgeGrad = ctx.createRadialGradient(540, 570, 0, 540, 570, 130);
    badgeGrad.addColorStop(0, 'rgba(245,158,11,0.2)');
    badgeGrad.addColorStop(1, 'rgba(245,158,11,0.05)');
    ctx.beginPath(); ctx.arc(540, 570, 130, 0, Math.PI * 2);
    ctx.fillStyle = badgeGrad; ctx.fill();
    ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 4;
    ctx.stroke();

    // "IN-PERSON PASS" text in badge
    ctx.fillStyle = '#10b981'; ctx.font = 'bold 28px Arial';
    ctx.fillText('✓ OFFICIAL', 540, 545);
    ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 32px Arial';
    ctx.fillText('IN-PERSON PASS', 540, 590);
    ctx.fillStyle = '#94a3b8'; ctx.font = '20px Arial';
    ctx.fillText('CONFIRMED', 540, 625);

    // Details
    const drawField = (label: string, val: string, y: number, color = '#ffffff') => {
      ctx.textAlign = 'left';
      ctx.fillStyle = '#94a3b8'; ctx.font = '22px Arial';
      ctx.fillText(label, 80, y);
      ctx.fillStyle = color; ctx.font = 'bold 28px Arial';
      ctx.fillText(val, 80, y + 34);
    };

    drawField('PARTICIPANT NAME', name, 760);
    drawField('TICKET ID', tid, 860, '#f59e0b');
    drawField('TEAM / PARTICIPATION', tn, 960);
    drawField('ROLE', role, 1060);
    drawField('FOCUS TRACK', tr, 1160, '#22d3ee');
    drawField('EVENT DATE', 'Saturday, October 24, 2026 | 09:30 AM IST', 1260);
    drawField('VENUE', 'PIT Campus Auditorium, Jaunpur, UP', 1360);

    // Team Code box
    if (tc && !tc.startsWith('SOLO')) {
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(245,158,11,0.12)';
      ctx.beginPath();
      roundRect(ctx, 100, 1470, 880, 100, 16);
      ctx.fill();
      ctx.strokeStyle = 'rgba(245,158,11,0.5)'; ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#94a3b8'; ctx.font = '22px Arial';
      ctx.fillText('TEAM CODE — Share with teammates to invite them', 540, 1500);
      ctx.fillStyle = '#f59e0b'; ctx.font = 'bold 40px Arial';
      ctx.fillText(tc, 540, 1550);
    }

    // Footer
    ctx.textAlign = 'center';
    ctx.strokeStyle = 'rgba(245,158,11,0.3)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(60, 1640); ctx.lineTo(1020, 1640); ctx.stroke();
    ctx.fillStyle = '#475569'; ctx.font = '22px Arial';
    ctx.fillText('Hacktoberfest Hack Day Jaunpur 2026  •  In Association with MLH & AKTU', 540, 1700);
    ctx.fillStyle = '#334155'; ctx.font = '18px Arial';
    ctx.fillText('Bring this pass (digital or printed) on event day for entry verification', 540, 1740);
    ctx.fillStyle = '#1e293b'; ctx.font = '16px Arial';
    ctx.fillText('Produced by CSE Dept • Prasad Institute of Technology • Jaunpur, Uttar Pradesh', 540, 1820);
  }, []);

  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
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
  }

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

