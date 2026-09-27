'use client';

import React from 'react';
import { MapPin, Calendar, Clock, Users, Building, ShieldCheck, ExternalLink, Gift, Sparkles } from 'lucide-react';

export default function EventInfoSection() {
  const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Prasad+Institute+of+Technology+Jaunpur+QP5G%2BW4Q';

  return (
    <section className="relative w-full py-16 px-4 max-w-5xl mx-auto z-30 pointer-events-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 font-mono text-xs uppercase tracking-widest mb-3">
          <Building className="w-3.5 h-3.5" />
          <span>OFFICIAL EVENT SPECIFICATIONS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-celestial font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-gold-400 to-amber-500 text-gold-glow">
          JAUNPUR × PIT
        </h2>
        <p className="mt-3 text-zinc-400 max-w-xl mx-auto text-sm sm:text-base font-light">
          Everything you need to know about the premier open-source festival in Eastern Uttar Pradesh.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Venue & Location Card */}
        <div className="p-8 rounded-3xl bg-midnight-950/80 border border-zinc-800/80 backdrop-blur-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Event Venue</h3>
                <span className="text-xs font-mono text-zinc-400">Prasad Institute of Technology</span>
              </div>
            </div>

            <div className="space-y-4 text-sm text-zinc-300">
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                  CAMPUS ADDRESS
                </span>
                <p className="font-light mt-0.5 leading-relaxed">
                  QP5G+W4Q, Jaunpur - Azamgarh Rd, Balibhaddarpur, Jaunpur, Uttar Pradesh 222002, India
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                  ELIGIBLE PARTICIPANTS
                </span>
                <p className="font-light mt-0.5">
                  University Students & Engineering Undergraduates across all departments.
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                  CO-ORGANIZING HOSTS
                </span>
                <p className="font-mono text-gold-300 mt-0.5">
                  Shubhasheesh Kundu &amp; Preet Yadav
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-zinc-800/80">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-gold-400 hover:text-gold-300 transition-colors"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Date, Time & Official Details Card */}
        <div className="space-y-6">
          {/* Date & Time Mini Card */}
          <div className="p-6 rounded-3xl bg-midnight-950/80 border border-zinc-800/80 backdrop-blur-2xl shadow-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500">EVENT DATE</span>
                <h4 className="text-lg font-bold text-white">Saturday, October 24, 2026</h4>
                <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-mono mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>09:30 AM – 3:00 PM IST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Official Swag & Benefits Card (Intentional, dignified transparency) */}
          <div className="p-6 rounded-3xl bg-midnight-950/80 border border-gold-500/30 backdrop-blur-2xl shadow-xl">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-400 flex-shrink-0">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white">OFFICIAL DETAILS</h4>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 uppercase">
                    CONFIRMED NOTICE
                  </span>
                </div>
                <blockquote className="mt-2 text-xs font-mono text-zinc-300 leading-relaxed italic border-l-2 border-gold-500/50 pl-3">
                  “Swag, prizes and participant benefits will be announced after official organizer confirmation.”
                </blockquote>
                <p className="mt-3 text-xs text-zinc-400 font-light">
                  We maintain strict fidelity to official event guidelines without speculative claims. Full details on event kit distributions and certificates will be communicated on-site by the host team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
