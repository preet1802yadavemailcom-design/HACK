'use client';

import React from 'react';
import { ExternalLink, BookOpen, Cpu, Sparkles, Terminal, Code2, Bot, Layers } from 'lucide-react';
import { soundEngine } from '@/lib/audio';

const RESOURCE_ITEMS = [
  {
    title: 'Agent Skills Explained: What They Are, What They Aren’t, and How to Use Them',
    description: 'Overview of the Agent Skill Open Standard and SKILL.md authoring for modern AI development.',
    url: 'https://dev.to/loc_carrre_0d798813c662/agent-skills-explained-what-they-are-what-they-arent-and-how-to-use-them-bf9',
    tag: 'Agentic AI',
    icon: Bot,
    color: 'border-amber-400/40 text-amber-400',
  },
  {
    title: 'A Developer’s Guide to Open-Weight LLM API Integration',
    description: 'Comprehensive guide to deploying, orchestrating, and integrating large open-weight LLMs into web apps.',
    url: 'https://dev.to/sbt112321321/beyond-the-black-box-a-developers-guide-to-open-weight-llm-api-integration-1ea6',
    tag: 'LLM APIs',
    icon: Cpu,
    color: 'border-cyan-400/40 text-cyan-400',
  },
  {
    title: 'How to Run Google’s Gemma 4 Locally with Ollama',
    description: 'Local setup and edge execution for models under 10B parameters on developer workstations.',
    url: 'https://dev.to/purpledoubled/how-to-run-googles-gemma-4-locally-with-ollama-all-4-model-sizes-compared-2pbh',
    tag: 'Local AI / Ollama',
    icon: Terminal,
    color: 'border-emerald-400/40 text-emerald-400',
  },
  {
    title: 'Hermes Agent: A Practical Guide',
    description: 'Setting up and orchestrating autonomous workflows using open-source agent harnesses and tools.',
    url: 'https://dev.to/truongpx396/hermes-agent-the-self-improving-agent-framework-and-how-it-compares-to-openclaw-goclaw-22mc',
    tag: 'Agent Harness',
    icon: Layers,
    color: 'border-purple-400/40 text-purple-400',
  },
  {
    title: 'Gemma 4 Resources Hub',
    description: 'Official developer hub, documentation overview, and starter kits for Google Gemma architecture.',
    url: 'https://mlh.link/gemma',
    tag: 'MLH × Gemma',
    icon: Sparkles,
    color: 'border-yellow-400/40 text-yellow-400',
  },
  {
    title: 'Gemma Quickstart Guide',
    description: 'Rapid API setup, authentication credentials, and boilerplate code to start hacking within 5 minutes.',
    url: 'https://mlh.link/gemma-quickstart',
    tag: 'Quickstart',
    icon: Code2,
    color: 'border-rose-400/40 text-rose-400',
  },
  {
    title: 'Gemma API Documentation',
    description: 'In-depth endpoint specifications, request payloads, streaming response schemas, and API references.',
    url: 'https://mlh.link/gemma-docs',
    tag: 'API Reference',
    icon: BookOpen,
    color: 'border-blue-400/40 text-blue-400',
  },
  {
    title: 'Gemma Beginner Guide',
    description: 'Step-by-step introduction for students and first-time hackathon builders to prototype AI solutions.',
    url: 'https://mlh.link/gemma-beginnerguide',
    tag: 'Student Guide',
    icon: Sparkles,
    color: 'border-teal-400/40 text-teal-400',
  },
];

export default function ResourcesSection() {
  return (
    <section id="resources" className="relative w-full py-20 px-4 max-w-6xl mx-auto z-20 pointer-events-auto">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-3 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>DEVELOPER TOOLKIT</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          LINKS &amp; RESOURCES
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-300 font-light max-w-xl mx-auto">
          Essential guides, documentation, and starter materials curated for PIT student hackers to build production-grade open-source apps.
        </p>
      </div>

      {/* Grid of 8 Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {RESOURCE_ITEMS.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playClick()}
              className="group relative rounded-2xl p-5 bg-black/75 hover:bg-black/90 border border-white/10 hover:border-amber-400/50 backdrop-blur-xl transition-all shadow-lg hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border bg-white/5 ${item.color}`}>
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{item.tag}</span>
                  </div>
                  <span className="text-zinc-500 group-hover:text-amber-400 transition-colors">
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs text-zinc-400 font-light mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-amber-400/90 group-hover:text-amber-300">
                <span>Explore Documentation →</span>
                <span className="text-[10px] text-zinc-500 group-hover:text-zinc-400">dev.to / mlh.link</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
