'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { soundEngine } from '@/lib/audio';
import { X, Sparkles, CheckCircle2, AlertCircle, Copy, Check, Ticket, MapPin } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    branch: 'Computer Science & Engineering (CSE)',
    semester: 'Semester 5',
    teamStatus: 'Looking for teammates' as 'Joining a team' | 'Bringing a team' | 'Looking for teammates' | 'Solo',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    ticketId: string;
    participant: {
      fullName: string;
      studentId: string;
      email: string;
      branch: string;
      semester: string;
      teamStatus: string;
    };
  } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Registration could not be completed.');
        soundEngine.playClick();
      } else {
        setSuccessData(data);
        soundEngine.playTempleBell(1.2);
        // Confetti celebration
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#fbbf24', '#f59e0b', '#22d3ee', '#ec4899', '#ffffff'],
          });
        } catch {}
      }
    } catch {
      setErrorMessage('Network connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyTicket = () => {
    if (successData?.ticketId) {
      navigator.clipboard.writeText(successData.ticketId);
      setCopied(true);
      soundEngine.playClick();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-950/85 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-midnight-900/95 border border-gold-500/40 shadow-[0_0_50px_rgba(245,158,11,0.3)] text-white overflow-hidden max-h-[92vh] overflow-y-auto">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-midnight-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          aria-label="Close registration modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!successData ? (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>OFFLINE IN-PERSON REGISTRATION • PIT JAUNPUR</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-celestial font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-gold-300 to-amber-500">
                CAMPUS HACKATHON ENTRY
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400 font-light">
                Hacktoberfest Hack Day Jaunpur × Prasad Institute of Technology
              </p>
            </div>

            {/* Error Alert */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/50 text-red-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                  Full Name <span className="text-gold-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryan Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-midnight-950 border border-zinc-800 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm text-white placeholder-zinc-600 outline-none transition-all font-sans"
                />
              </div>

              {/* Student ID / Roll Number & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                    Student ID / Roll No <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2201340100012"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-midnight-950 border border-zinc-800 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm text-white placeholder-zinc-600 outline-none transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                    Student Email <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="aryan@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-midnight-950 border border-zinc-800 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-sm text-white placeholder-zinc-600 outline-none transition-all font-mono"
                  />
                </div>
              </div>

              {/* Branch & Semester */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                    Department / Branch <span className="text-gold-400">*</span>
                  </label>
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-midnight-950 border border-zinc-800 focus:border-gold-500 text-sm text-white outline-none"
                  >
                    <option value="Computer Science & Engineering (CSE)">Computer Science &amp; Eng (CSE)</option>
                    <option value="Information Technology (IT)">Information Technology (IT)</option>
                    <option value="Electronics & Communication (ECE)">Electronics &amp; Comm (ECE)</option>
                    <option value="Mechanical Engineering (ME)">Mechanical Engineering (ME)</option>
                    <option value="Civil Engineering (CE)">Civil Engineering (CE)</option>
                    <option value="Electrical Engineering (EE)">Electrical Engineering (EE)</option>
                    <option value="Pharmacy / Other Allied Branch">Pharmacy / Other Branch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                    Current Semester <span className="text-gold-400">*</span>
                  </label>
                  <select
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-midnight-950 border border-zinc-800 focus:border-gold-500 text-sm text-white outline-none"
                  >
                    <option value="Semester 1">Semester 1 (1st Year)</option>
                    <option value="Semester 3">Semester 3 (2nd Year)</option>
                    <option value="Semester 5">Semester 5 (3rd Year)</option>
                    <option value="Semester 7">Semester 7 (4th Year)</option>
                  </select>
                </div>
              </div>

              {/* Team Status */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                  Team Formation Status <span className="text-gold-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {(['Looking for teammates', 'Bringing a team', 'Joining a team', 'Solo'] as const).map((status) => (
                    <button
                      type="button"
                      key={status}
                      onClick={() => setFormData({ ...formData, teamStatus: status })}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        formData.teamStatus === status
                          ? 'bg-gold-500/20 border-gold-500 text-gold-300 font-semibold'
                          : 'bg-midnight-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-gold-500 to-amber-600 text-midnight-950 font-mono font-bold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:shadow-[0_0_35px_rgba(245,158,11,0.8)] transition-all disabled:opacity-50"
                >
                  {loading ? 'CONFIRMING ON-CAMPUS SPOT...' : 'CONFIRM OFFLINE REGISTRATION →'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Celestial Access Pass Confirmation */
          <div className="text-center py-4 animate-fade-in">
            <div className="inline-flex p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-celestial font-bold text-white">
              IN-PERSON PASS CONFIRMED
            </h3>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Welcome to Hack Day Jaunpur, {successData.participant.fullName}!
            </p>

            {/* Holographic Ticket Graphic */}
            <div className="mt-6 p-6 rounded-2xl bg-midnight-950 border border-gold-500/50 shadow-2xl relative text-left font-mono">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase">CAMPUS PASS IDENTIFIER</span>
                  <span className="text-lg font-bold text-gold-400">{successData.ticketId}</span>
                </div>
                <button
                  onClick={handleCopyTicket}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 text-xs">
                <div>
                  <span className="text-zinc-500 text-[10px] block">PARTICIPANT</span>
                  <span className="text-zinc-200">{successData.participant.fullName}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">STUDENT ID</span>
                  <span className="text-zinc-200">{successData.participant.studentId}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">DEPARTMENT</span>
                  <span className="text-zinc-200 truncate block">{successData.participant.branch}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">SQUAD MODE</span>
                  <span className="text-emerald-400">{successData.participant.teamStatus}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-500">
                <span>VENUE: PIT JAUNPUR (PHYSICAL)</span>
                <span>24 OCT 2026 • 09:30 IST</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-midnight-950 font-mono font-bold text-xs uppercase tracking-wider transition-all"
              >
                RETURN TO EXPERIENCE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
