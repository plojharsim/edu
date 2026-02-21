"use client";

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { cn } from "@/lib/utils";
import { Badge } from '@/data/badges';

interface BadgeCardProps {
  badge: Badge;
  isUnlocked: boolean;
}

const BadgeCard = ({ badge, isUnlocked }: BadgeCardProps) => {
  const Icon = (LucideIcons as any)[badge.iconName] || LucideIcons.Award;

  return (
    <div className={cn(
      "group relative flex flex-col items-center p-4 rounded-3xl border-2 transition-all duration-300",
      isUnlocked 
        ? "bg-card border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md" 
        : "bg-slate-50/50 dark:bg-slate-900/20 border-dashed border-slate-200 dark:border-slate-800 opacity-60 grayscale"
    )}>
      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center mb-3 text-white shadow-lg",
        isUnlocked ? badge.color : "bg-slate-300 dark:bg-slate-700"
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 text-center uppercase tracking-tight">{badge.title}</h4>
      
      {/* Tooltip on hover */}
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-40 p-2 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-center">
        {badge.description}
        {!isUnlocked && " (Zatím uzamčeno)"}
      </div>
    </div>
  );
};

export default BadgeCard;