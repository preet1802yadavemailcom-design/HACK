'use client';

import React from 'react';
import { EVENT_DETAILS } from '@/data/eventData';
import { MapPin, Building2, Calendar, Clock, ExternalLink, ShieldCheck, Gift } from 'lucide-react';

export default function VenueSection() {
  return (
    <section id="venue" className="relative w-full py-20 px-4 max-w-5xl mx-auto z-20 pointer-events-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-3">
          <Building2 className="w-3.5 h-3.5" />
          <span>LOCATION &amp; LOGISTICS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          CAMPUS VENUE
        </h2>
        <p className="mt-3 text-zinc-300 max-w-xl mx-auto text-sm sm:text-base font-light">
          Prasad Institute of Technology, Jaunpur — Uttar Pradesh, India.
        </p>
      </div>

      {/* Campus Visual Showcase Bar */}
      <div className="mb-8 rounded-3xl bg-neutral-900/85 border border-white/15 p-4 sm:p-6 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row items-center gap-6 overflow-hidden">
        <div className="w-full md:w-1/2 rounded-2xl bg-white p-3 shadow-md flex items-center justify-center">
          <img
            src="/pit-banner.png"
            alt="Prasad Institute of Technology Banner"
            className="w-full h-auto max-h-[85px] object-contain"
          />
        </div>
        <div className="w-full md:w-1/2 flex items-center gap-3">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border border-amber-400/40 shadow-lg flex-shrink-0">
            <img src="/pit-campus.png" alt="PIT Campus" className="w-full h-full object-cover" />
          </div>
          <div className="text-left font-mono text-xs">
            <div className="text-amber-400 font-bold uppercase tracking-wider">
              OFFLINE COLLEGE VENUE
            </div>
            <div className="text-white font-sans font-bold text-sm">
              Main Auditorium &amp; CS Labs
            </div>
            <div className="text-zinc-400 text-[11px] mt-0.5">
              High-speed WiFi &bull; Power strips at desks &bull; Live Sprint Zone
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Address Card */}
        <div className="p-7 sm:p-8 rounded-3xl bg-black/75 border border-white/10 backdrop-blur-2xl flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Prasad Institute of Technology</h3>
                <span className="text-xs font-mono text-emerald-400 uppercase font-bold">
                  ● Physical Campus Event
                </span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">ADDRESS</span>
                <p className="font-light mt-0.5 leading-relaxed">
                  {EVENT_DETAILS.address}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">HOST ORGANIZERS</span>
                <p className="font-mono text-amber-300 mt-0.5">
                  {EVENT_DETAILS.hosts.join(' & ')}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">ELIGIBLE AUDIENCE</span>
                <p className="font-light mt-0.5">
                  {EVENT_DETAILS.audience}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10">
            <a
              href={EVENT_DETAILS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>Open Directions in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Date & Swag Notice Card */}
        <div className="space-y-5">
          {/* Timing Box */}
          <div className="p-6 rounded-3xl bg-black/75 border border-white/10 backdrop-blur-2xl shadow-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">SCHEDULE</span>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Saturday, October 24, 2026
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>09:30 AM – 3:00 PM IST (In-Person)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Official Swag Transparency Box */}
          <div className="p-6 rounded-3xl bg-black/75 border border-amber-500/30 backdrop-blur-2xl shadow-xl">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex-shrink-0">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-white">OFFICIAL DETAILS</h4>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-300 uppercase">
                    CONFIRMED NOTICE
                  </span>
                </div>
                <blockquote className="mt-2 text-xs font-mono text-zinc-200 leading-relaxed italic border-l-2 border-amber-500/50 pl-3">
                  “{EVENT_DETAILS.swagPolicy}”
                </blockquote>
                <p className="mt-3 text-xs text-zinc-400 font-light leading-relaxed">
                  We maintain strict fidelity to official Hacktoberfest guidelines. Verified event badges, certificates of participation, and kits will be coordinated on-ground by the organizing student team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
