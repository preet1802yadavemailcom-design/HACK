'use client';

import React, { useState } from 'react';
import { MessageSquare, Phone, X, Sparkles, User, ChevronRight } from 'lucide-react';
import { soundEngine } from '@/lib/audio';

export default function FloatingWhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    soundEngine.playClick();
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Trigger Pill */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={toggleModal}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-400/50"
          aria-label="Direct WhatsApp Support"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <MessageSquare className="w-4 h-4 fill-white" />
          <span className="hidden sm:inline">WhatsApp Organizers 💬</span>
        </button>
      </div>

      {/* Interactive Quick Connect Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-opacity">
          <div className="relative w-full max-w-md rounded-3xl bg-neutral-950 border-2 border-emerald-500/50 p-6 sm:p-7 shadow-[0_0_60px_rgba(16,185,129,0.35)] text-white space-y-5 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <MessageSquare className="w-5 h-5 fill-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-base tracking-tight">Direct WhatsApp Support</h3>
                  <p className="text-[11px] font-mono text-emerald-400">● 1-Tap Connect with Organizers</p>
                </div>
              </div>

              <button
                onClick={toggleModal}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-300 font-light leading-relaxed">
              Koi bhi query ho? Niche diye gaye kisi bhi organizer ke number par directly WhatsApp message bhej sakte hain:
            </p>

            {/* Contacts list */}
            <div className="space-y-3">
              {/* 1. Shubhasheesh Kundu Sir */}
              <a
                href={`https://wa.me/916306588533?text=${encodeURIComponent(
                  'Hi Shubhasheesh Sir, I have a query regarding Hacktoberfest Hack Day 2026 at PIT Jaunpur.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playClick()}
                className="group flex items-center justify-between p-4 rounded-2xl bg-black/80 hover:bg-emerald-950/30 border border-white/15 hover:border-emerald-400/60 transition-all shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-sm">
                    SK
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      Shubhasheesh Kundu Sir
                    </h4>
                    <p className="text-[10px] font-mono text-zinc-400">
                      Faculty Coordinator • <span className="text-emerald-400 font-bold">+91 63065 88533</span>
                    </p>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-emerald-500 text-black group-hover:scale-110 transition-transform shadow-md">
                  <MessageSquare className="w-4 h-4 fill-black" />
                </div>
              </a>

              {/* 2. Preet Yadav */}
              <a
                href={`https://wa.me/916394530549?text=${encodeURIComponent(
                  'Hi Preet, I have a query regarding Hacktoberfest Hack Day 2026 at PIT Jaunpur.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playClick()}
                className="group flex items-center justify-between p-4 rounded-2xl bg-black/80 hover:bg-emerald-950/30 border border-white/15 hover:border-emerald-400/60 transition-all shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-sm">
                    PY
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                      Preet Yadav
                    </h4>
                    <p className="text-[10px] font-mono text-zinc-400">
                      Lead Dev &amp; Student Lead (CSE) • <span className="text-emerald-400 font-bold">+91 63945 30549</span>
                    </p>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-emerald-500 text-black group-hover:scale-110 transition-transform shadow-md">
                  <MessageSquare className="w-4 h-4 fill-black" />
                </div>
              </a>
            </div>

            <div className="pt-2 text-center text-[10px] font-mono text-zinc-500">
              Prasad Institute of Technology, Jaunpur • Official Help Desk
            </div>
          </div>
        </div>
      )}
    </>
  );
}
