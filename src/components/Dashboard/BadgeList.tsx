"use client";

import React from 'react';
import { ALL_BADGES } from "@/data/badgesData";
import { getEarnedBadges } from "@/utils/badges";
import * as LucideIcons from 'lucide-react';
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BadgeList = () => {
  const earnedIds = getEarnedBadges();

  const getIcon = (name: string) => {
    const Icon = (LucideIcons as any)[name] || LucideIcons.Medal;
    return <Icon className="w-6 h-6" />;
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
      <TooltipProvider>
        {ALL_BADGES.map((badge) => {
          const isEarned = earnedIds.includes(badge.id);
          return (
            <Tooltip key={badge.id}>
              <TooltipTrigger asChild>
                <div 
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-2",
                    isEarned 
                      ? cn(badge.color, "border-transparent scale-100 shadow-md") 
                      : "bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 border-dashed border-slate-200 dark:border-slate-700 opacity-50 grayscale"
                  )}
                >
                  {getIcon(badge.iconName)}
                </div>
              </TooltipTrigger>
              <TooltipContent className="p-3 rounded-xl border-border bg-card shadow-xl">
                <p className="font-bold text-indigo-600 dark:text-indigo-400">{badge.title}</p>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
                {!isEarned && (
                  <p className="text-[10px] mt-1 font-bold uppercase text-red-400">Zatím nezískáno</p>
                )}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
};

export default BadgeList;