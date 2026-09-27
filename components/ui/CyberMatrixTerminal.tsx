'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Sparkles, Send, Maximize2, Minimize2, Zap, Shield, Trophy } from 'lucide-react';
import { soundEngine } from '@/lib/audio';

interface CyberMatrixTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CyberMatrixTerminal({ isOpen, onClose }: CyberMatrixTerminalProps) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<Array<{ text: string; type: 'cmd' | 'output' | 'system' }>>([
    { text: '=====================================================', type: 'system' },
    { text: '   PRASAD TECH JAUNPUR // CYBER MATRIX TERMINAL v2.6', type: 'system' },
    { text: '   Hacktoberfest 2026 In-Person Hack Day Edition', type: 'system' },
    { text: '=====================================================', type: 'system' },
    { text: 'Type "help" to list available hacker commands.', type: 'output' },
  ]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Scroll to bottom on output change
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Matrix Digital Rain Effect on Canvas
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンPITJAUNPURHACK2026';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#10b981'; // Cyber emerald
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(drawMatrix);
    };

    drawMatrix();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    soundEngine.playClick();
    const newHistory = [...history, { text: `pit-hacker@jaunpur:~$ ${inputVal}`, type: 'cmd' as const }];

    switch (cmd) {
      case 'help':
        newHistory.push(
          { text: 'AVAILABLE COMMANDS:', type: 'system' },
          { text: '  prizes     - View secret preview of trophies and rewards', type: 'output' },
          { text: '  organizer  - Show contacts for Shubhasheesh Sir & Preet Yadav', type: 'output' },
          { text: '  tracks     - List all 4 Hackathon Sprint Tracks', type: 'output' },
          { text: '  badge      - Jump to VIP Hacker Passport Generator', type: 'output' },
          { text: '  secret     - Uncover hidden Prasad Tech easter egg', type: 'output' },
          { text: '  matrix     - Re-trigger intense matrix particle surge', type: 'output' },
          { text: '  clear      - Clear terminal console', type: 'output' },
          { text: '  exit       - Close this terminal', type: 'output' }
        );
        break;

      case 'prizes':
        newHistory.push(
          { text: '🏆 PODIUM REWARD TIERS (ANNOUNCING SOON):', type: 'system' },
          { text: '  🥇 Champion Squad: Grand Trophy + Gold Certificates + Swag Kits', type: 'output' },
          { text: '  🥈 1st & 2nd Runners-Up: Silver & Bronze Honors + Tech Goodies', type: 'output' },
          { text: '  🎁 All Attendees: Verified Hacktoberfest Digital Credentials', type: 'output' },
          { text: '  Official reveal at 10:00 AM Keynote Briefing on Oct 24, 2026.', type: 'output' }
        );
        break;

      case 'organizer':
      case 'contact':
        newHistory.push(
          { text: '📞 24/7 ORGANIZER DIRECT HOTLINE:', type: 'system' },
          { text: '  • Shubhasheesh Kundu Sir (Faculty Lead): +91 63065 88533', type: 'output' },
          { text: '  • Preet Yadav (Lead Dev & Student Organizer): +91 63945 30549', type: 'output' },
          { text: '  WhatsApp either organizer anytime for sprint assistance.', type: 'output' }
        );
        break;

      case 'tracks':
        newHistory.push(
          { text: '⚡ SPRINT TRACKS:', type: 'system' },
          { text: '  1. Open-Source Sprint (Fix GitHub issues & submit PRs)', type: 'output' },
          { text: '  2. Modern Web & Cloud Apps (Next.js, React, Node.js)', type: 'output' },
          { text: '  3. AI & Intelligent Systems (Gemma, Ollama, Python)', type: 'output' },
          { text: '  4. Student Innovation Open Track (Any real-world solution)', type: 'output' }
        );
        break;

      case 'secret':
        newHistory.push(
          { text: '✨ EASTER EGG UNLOCKED!', type: 'system' },
          { text: '  "Code is poetry. Build things that make Prasad Institute of Technology proud."', type: 'output' },
          { text: '  Engineered with love by Preet Yadav (CSE Department).', type: 'output' },
          { text: '  You are now verified as a Level 99 Elite Hacker.', type: 'output' }
        );
        soundEngine.playTempleBell(1.5);
        break;

      case 'badge':
      case 'passport':
        newHistory.push({ text: 'Navigating to VIP Hacker Passport Studio...', type: 'system' });
        setTimeout(() => {
          window.location.href = '/badge';
        }, 600);
        break;

      case 'matrix':
        newHistory.push({ text: 'Recalibrating cyber flux matrix... Enjoy the digital rain!', type: 'system' });
        soundEngine.playTempleBell(1.1);
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        newHistory.push({
          text: `bash: command not found: ${cmd}. Type "help" for valid commands.`,
          type: 'output',
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl h-[560px] rounded-3xl bg-neutral-950/95 border-2 border-emerald-500/60 shadow-[0_0_80px_rgba(16,185,129,0.4)] text-emerald-400 font-mono text-xs flex flex-col overflow-hidden">
        {/* Matrix Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none opacity-25"
        />

        {/* Terminal Header Bar */}
        <div className="relative z-10 px-5 py-3.5 bg-black/90 border-b border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer hover:opacity-80" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-zinc-400 text-[11px] ml-2 font-bold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>pit-hacker@jaunpur-hacks-2026:~</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-emerald-500/80 uppercase">Matrix Live Mode</span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Log */}
        <div className="relative z-10 flex-1 p-5 overflow-y-auto space-y-1.5">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`leading-relaxed ${
                line.type === 'cmd'
                  ? 'text-white font-bold'
                  : line.type === 'system'
                  ? 'text-amber-400 font-bold'
                  : 'text-emerald-300'
              }`}
            >
              {line.text}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Input Box */}
        <form onSubmit={handleCommand} className="relative z-10 p-3 bg-black/90 border-t border-emerald-500/30 flex items-center gap-2">
          <span className="text-amber-400 font-bold pl-2">pit-hacker@jaunpur:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'prizes', 'organizer', 'secret'..."
            className="flex-1 bg-transparent text-white outline-none font-mono text-xs caret-emerald-400"
          />
          <button
            type="submit"
            className="p-2 rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
