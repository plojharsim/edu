"use client";

import React from 'react';
import { 
  Trophy, Flame, Target, BookOpen, Star, Sparkles, 
  Zap, GraduationCap, Library, Crown, Medal, Award,
  CheckCircle, Lightbulb, Rocket, ShieldCheck, Heart
} from "lucide-react";
import Badge from './Badge';

interface BadgesSectionProps {
  stats: {
    streak: number;
    sessions: number;
    perfectSessions?: number;
    customTopicsCount: number;
    average?: number;
  };
}

const BadgesSection = ({ stats }: BadgesSectionProps) => {
  const BADGES = [
    // --- LEHKÉ (EASY) ---
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
      id: 'creator',
      label: 'Tvořitel',
      description: 'Vytvoř si vlastní studijní téma.',
      icon: Star,
      color: 'bg-purple-500',
      unlocked: stats.customTopicsCount >= 1
    },

    // --- STŘEDNÍ (MEDIUM) ---
    {
      id: 'diligent',
      label: 'Snaživec',
      description: 'Dokonči celkem 10 studijních lekcí.',
      icon: Medal,
      color: 'bg-amber-500',
      unlocked: stats.sessions >= 10
    },
    {
      id: 'fire-starter',
      label: 'Plamen',
      description: 'Udržuj si denní sérii 5 dní.',
      icon: Zap,
      color: 'bg-red-500',
      unlocked: stats.streak >= 5
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
      id: 'library-builder',
      label: 'Stavitel',
      description: 'Vytvoř si alespoň 5 vlastních témat.',
      icon: Library,
      color: 'bg-indigo-500',
      unlocked: stats.customTopicsCount >= 5
    },

    // --- TĚŽKÉ (HARD) ---
    {
      id: 'scholar',
      label: 'Akademik',
      description: 'Dokonči celkem 50 studijních lekcí.',
      icon: GraduationCap,
      color: 'bg-cyan-600',
      unlocked: stats.sessions >= 50
    },
    {
      id: 'legend',
      label: 'Legenda',
      description: 'Udržuj si denní sérii 7 dní v řadě.',
      icon: Sparkles,
      color: 'bg-indigo-600',
      unlocked: stats.streak >= 7
    },
    {
      id: 'elite-student',
      label: 'Elita',
      description: 'Získej 10x hodnocení 100 %.',
      icon: Award,
      color: 'bg-rose-500',
      unlocked: (stats.perfectSessions || 0) >= 10
    },
    {
      id: 'knowledge-master',
      label: 'Mistr',
      description: 'Udržuj si průměrnou úspěšnost nad 95 % (min. 10 lekcí).',
      icon: Lightbulb,
      color: 'bg-yellow-500',
      unlocked: (stats.average || 0) >= 95 && stats.sessions >= 10
    },

    // --- LEGENDÁRNÍ (EXTREME) ---
    {
      id: 'unstoppable',
      label: 'Dříč',
      description: 'Udržuj si denní sérii 14 dní v řadě.',
      icon: Flame,
      color: 'bg-orange-700',
      unlocked: stats.streak >= 14
    },
    {
      id: 'month-streak',
      label: 'Měsíční vládce',
      description: 'Udržuj si denní sérii 30 dní v řadě.',
      icon: Rocket,
      color: 'bg-rose-700',
      unlocked: stats.streak >= 30
    },
    {
      id: 'perfect-shield',
      label: 'Čistý štít',
      description: 'Dosáhni 50 perfektních lekcí na 100 %.',
      icon: ShieldCheck,
      color: 'bg-emerald-700',
      unlocked: (stats.perfectSessions || 0) >= 50
    },
    {
      id: 'professor',
      label: 'Profesor',
      description: 'Dokonči celkem 200 studijních lekcí.',
      icon: Crown,
      color: 'bg-slate-800',
      unlocked: stats.sessions >= 200
    },
    {
      id: 'ultimate-scholar',
      label: 'Génius',
      description: 'Dokonči neuvěřitelných 500 studijních lekcí.',
      icon: Heart,
      color: 'bg-indigo-900',
      unlocked: stats.sessions >= 500
    },
    {
      id: 'content-king',
      label: 'Král obsahu',
      description: 'Vytvoř si celkem 15 vlastních témat.',
      icon: CheckCircle,
      color: 'bg-emerald-700',
      unlocked: stats.customTopicsCount >= 15
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
      
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
        {BADGES.map(badge => (
          <Badge key={badge.id} {...badge} />
        ))}
      </div>
    </div>
  );
};

export default BadgesSection;