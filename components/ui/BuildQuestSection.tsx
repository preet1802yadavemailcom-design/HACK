'use client';

import React, { useState } from 'react';
import { QuestType } from '@/types';
import { soundEngine } from '@/lib/audio';
import { Hammer, GitPullRequest, BookOpen, Users, Sparkles, CheckCircle2 } from 'lucide-react';

interface BuildQuestSectionProps {
  onSelectQuest?: (quest: QuestType) => void;
}

export default function BuildQuestSection({ onSelectQuest }: BuildQuestSectionProps) {
  const [selectedQuest, setSelectedQuest] = useState<QuestType>('BUILD');

  const quests: {
    id: QuestType;
    title: string;
    actionTag: string;
    mantra: string;
    icon: React.ElementType;
    color: string;
    borderColor: string;
    glowColor: string;
    description: string;
    deliverable: string;
  }[] = [
    {
      id: 'BUILD',
      title: 'THE ARCHITECT',
      actionTag: 'BUILD FROM SCRATCH',
      mantra: 'Find a problem. Build the solution.',
      icon: Hammer,
      color: 'from-amber-500 to-gold-400',
      borderColor: 'border-gold-500/50',
      glowColor: 'shadow-[0_0_25px_rgba(245,158,11,0.3)]',
      description: 'Prototype a brand new software product, tool, or hardware hack from the ground up during Hack Day.',
      deliverable: 'Working Prototype + GitHub Repo + Live Demo',
    },
    {
      id: 'CONTRIBUTE',
      title: 'THE REPO SLAYER',
      actionTag: 'OPEN SOURCE CONTRIBUTIONS',
      mantra: 'Find an issue. Open a PR.',
      icon: GitPullRequest,
      color: 'from-cyan-500 to-blue-500',
      borderColor: 'border-cyan-500/50',
      glowColor: 'shadow-[0_0_25px_rgba(6,182,212,0.3)]',
      description: 'Target real open-source repositories participating in Hacktoberfest 2026, solve open issues, and get PRs merged.',
      deliverable: 'Merged Pull Requests + Upstream Contributions',
    },
    {
      id: 'LEARN',
      title: 'THE SACRED SCHOLAR',
      actionTag: 'DEEP TECH MASTERY',
      mantra: 'Master modern engineering & git workflows.',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-400',
      borderColor: 'border-emerald-500/50',
      glowColor: 'shadow-[0_0_25px_rgba(16,185,129,0.3)]',
      description: 'Explore generative AI, 3D WebGL, Next.js, and version control foundations with mentor-led sprint tracks.',
      deliverable: 'Interactive project sandbox + Knowledge portfolio',
    },
    {
      id: 'COLLABORATE',
      title: 'THE ALLIANCE',
      actionTag: 'COMMUNITY MULTIPLIER',
      mantra: 'Find your people. Build together.',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500/50',
      glowColor: 'shadow-[0_0_25px_rgba(168,85,247,0.3)]',
      description: 'Form a cross-disciplinary team spanning frontend, backend, system design, and creative technology.',
      deliverable: 'Multi-author collaborative release + Team showcase',
    },
  ];

  const handleQuestPick = (id: QuestType) => {
    soundEngine.playClick();
    soundEngine.playTempleBell(1.1);
    setSelectedQuest(id);
    if (onSelectQuest) onSelectQuest(id);
  };

  return (
    <section className="relative w-full py-16 px-4 max-w-6xl mx-auto z-30 pointer-events-auto">
      {/* Sacred Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 font-mono text-xs uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CHOOSE YOUR PATHWAY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-celestial font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-gold-300 to-amber-500 text-gold-glow">
          YOUR HACK QUEST
        </h2>
        <p className="mt-3 text-zinc-400 max-w-xl mx-auto font-light text-sm sm:text-base">
          Every hacker walks a sacred discipline. Select your Hacktoberfest mission for Hack Day Jaunpur.
        </p>
      </div>

      {/* Quest Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quests.map((q) => {
          const isSelected = selectedQuest === q.id;
          const Icon = q.icon;

          return (
            <div
              key={q.id}
              onClick={() => handleQuestPick(q.id)}
              className={`relative cursor-pointer rounded-2xl p-6 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between ${
                isSelected
                  ? `bg-midnight-900/90 ${q.borderColor} ${q.glowColor} border-2 scale-[1.02]`
                  : 'bg-midnight-950/60 border border-zinc-800 hover:border-zinc-700 hover:bg-midnight-900/40'
              }`}
            >
              {/* Header with Icon */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${q.color} text-midnight-950 shadow-md`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-gold-400 animate-pulse" />
                  )}
                </div>

                <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  {q.actionTag}
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide mt-1">
                  {q.title}
                </h3>
                <blockquote className="mt-2 text-xs font-mono italic text-gold-300/90 border-l-2 border-gold-500/40 pl-2">
                  “{q.mantra}”
                </blockquote>

                <p className="mt-4 text-xs text-zinc-400 leading-relaxed font-light">
                  {q.description}
                </p>
              </div>

              {/* Deliverable info */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80">
                <span className="text-[10px] font-mono text-zinc-500 block uppercase">
                  PRIMARY TARGET
                </span>
                <span className="text-xs font-mono text-zinc-300">
                  {q.deliverable}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
