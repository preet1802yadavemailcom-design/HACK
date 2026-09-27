'use client';

import React from 'react';
import Tilt3DCard from './Tilt3DCard';
import { soundEngine } from '@/lib/audio';
import { MessageSquare, Phone, Sparkles, UserCheck, Shield, Zap, ExternalLink } from 'lucide-react';

export default function OrganizerHotlineSection() {
  const organizers = [
    {
      name: 'Shubhasheesh Kundu Sir',
      role: 'Faculty Coordinator & Lead Organizer',
      department: 'Prasad Institute of Technology, Jaunpur',
      phone: '6306588533',
      displayPhone: '+91 63065 88533',
      badge: 'FACULTY LEAD',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      waMessage: encodeURIComponent(
        'Hi Shubhasheesh Sir, I have a query regarding Hacktoberfest Hack Day 2026 at PIT Jaunpur.'
      ),
      glowColor: 'from-amber-500/15 via-black to-neutral-950',
      borderColor: 'border-amber-400/50',
    },
    {
      name: 'Preet Yadav',
      role: 'Lead Developer & Student Organizer',
      department: 'Department of Computer Science & Engineering (CSE)',
      phone: '6394530549',
      displayPhone: '+91 63945 30549',
      badge: 'STUDENT LEAD & DEV',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
      waMessage: encodeURIComponent(
        'Hi Preet, I have a query regarding Hacktoberfest Hack Day 2026 at PIT Jaunpur.'
      ),
      glowColor: 'from-emerald-500/15 via-black to-neutral-950',
      borderColor: 'border-emerald-400/50',
    },
  ];

  return (
    <section id="contact" className="relative w-full py-20 px-4 max-w-6xl mx-auto z-20 pointer-events-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest mb-3 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>24/7 ORGANIZER HOTLINE • DIRECT WHATSAPP</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          CONNECT WITH ORGANIZERS
        </h2>
        <p className="mt-3 text-zinc-300 max-w-xl mx-auto text-sm sm:text-base font-light">
          Koi bhi doubt ya query ho? Team formation, registration, ya offline sprint guidelines ke liye directly WhatsApp ya call par baat karein.
        </p>
      </div>

      {/* 3D Holographic Organizer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {organizers.map((org, index) => (
          <Tilt3DCard
            key={index}
            maxTilt={10}
            className={`rounded-3xl p-7 sm:p-8 bg-gradient-to-b ${org.glowColor} border-2 ${org.borderColor} shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all duration-300`}
          >
            <div className="flex flex-col h-full justify-between gap-6">
              {/* Top Meta */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      ● Active on WhatsApp
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono px-3 py-1 rounded-full border uppercase font-black tracking-wider ${org.badgeColor}`}>
                    {org.badge}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {org.name}
                </h3>
                <p className="mt-1 text-sm font-mono text-amber-300 font-medium">
                  {org.role}
                </p>
                <p className="mt-1 text-xs text-zinc-400 font-light">
                  {org.department}
                </p>

                {/* Direct Phone Display */}
                <div className="mt-5 p-3.5 rounded-2xl bg-black/70 border border-white/10 flex items-center justify-between font-mono text-xs">
                  <span className="text-zinc-400 uppercase text-[10px]">DIRECT HOTLINE:</span>
                  <span className="text-white font-bold text-sm tracking-wider">
                    {org.displayPhone}
                  </span>
                </div>
              </div>

              {/* Action Buttons: 1-Tap WhatsApp & Phone Call */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
                {/* 1-Tap Direct WhatsApp */}
                <a
                  href={`https://wa.me/91${org.phone}?text=${org.waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundEngine.playClick()}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-black font-mono font-black text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-black" />
                  <span>Chat on WhatsApp</span>
                </a>

                {/* Direct Call */}
                <a
                  href={`tel:+91${org.phone}`}
                  onClick={() => soundEngine.playClick()}
                  className="w-full py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-zinc-100 hover:text-white font-mono font-bold text-xs uppercase tracking-wider hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call Directly</span>
                </a>
              </div>
            </div>
          </Tilt3DCard>
        ))}
      </div>

      {/* High-Impact Rapid Support Notice */}
      <div className="mt-8 p-4 rounded-2xl bg-black/60 border border-amber-500/25 text-center font-mono text-xs text-zinc-300 max-w-2xl mx-auto shadow-lg">
        💬 <span className="text-amber-400 font-bold">Fast Support:</span> Students can ping Shubhasheesh Kundu Sir or Preet Yadav anytime for spot registration, team pairing, or project mentorship queries.
      </div>
    </section>
  );
}
