"use client";

import React from 'react';
import { Trophy, Flame, Target, BookOpen, Star, Sparkles } from "lucide-react";
import Badge from './Badge';

interface BadgesSectionProps {
  stats: {
    streak: number;
    sessions: number;
    perfectSessions?: number;
    customTopicsCount: number;
  };
}

const BadgesSection = ({ stats }: BadgesSectionProps) => {
  const BADGES = [
    {
      id: 'first-step',
      label: 'První krůček',
      description: 'Dokonči svou první studijní lekci.',
      icon: BookOpen,
      color: 'bg-blue-500',
      unlocked: stats.sessions >= 1
    },
    {
      id: 'hot-streak',
      label: 'Zapálený',
      description: 'Udržuj si denní sérii alespoň 3 dny.',
      icon: Flame,
      color: 'bg-orange-500',
      unlocked: stats.streak >= 3
    },
    {
      id: 'perfectionist',
      label: 'Perfekcionista',
      description: 'Dokonči lekci na 100 % bez jediné chyby.',
      icon: Target,
      color: 'bg-emerald-500',
      unlocked: (stats.perfectSessions || 0) >= 1
    },
    {
      id: 'creator',
      label: 'Tvořitel',
      description: 'Vytvoř si vlastní studijní téma.',
      icon: Star,
      color: 'bg-purple-500',
      unlocked: stats.customTopicsCount >= 1
    },
    {
      id: 'diligent',
      label: 'Snaživec',
      description: 'Dokonči celkem 10 studijních lekcí.',
      icon: Trophy,
      color: 'bg-amber-500',
      unlocked: stats.sessions >= 10
    },
    {
      id: 'legend',
      label: 'Legenda',
      description: 'Udržuj si denní sérii 7 dní v řadě.',
      icon: Sparkles,
      color: 'bg-indigo-600',
      unlocked: stats.streak >= 7
    }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-foreground">Tvoje úspěchy</h2>
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          Odemčeno {BADGES.filter(b => b.unlocked).length} z {BADGES.length}
        </span>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {BADGES.map(badge => (
          <Badge key={badge.id} {...badge} />
        ))}
      </div>
    </div>
  );
};

export default BadgesSection;