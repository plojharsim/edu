"use client";

import React from 'react';
import { LucideIcon, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BadgeProps {
  label: string;
  description: string;
  icon: LucideIcon;
  unlocked: boolean;
  color: string;
}

const Badge = ({ label, description, icon: Icon, unlocked, color }: BadgeProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn(
            "relative flex flex-col items-center justify-center p-4 rounded-[2rem] border-2 transition-all duration-500",
            unlocked 
              ? cn("bg-card border-border shadow-sm scale-100 opacity-100", "hover:shadow-md hover:-translate-y-1") 
              : "bg-slate-100/50 dark:bg-slate-900/20 border-dashed border-slate-200 dark:border-slate-800 opacity-40 grayscale"
          )}>
            <div className={cn(
              "p-4 rounded-2xl mb-2 relative",
              unlocked ? color : "bg-slate-200 dark:bg-slate-800"
            )}>
              <Icon className={cn("w-6 h-6", unlocked ? "text-white" : "text-slate-400")} />
              {!unlocked && (
                <div className="absolute -top-1 -right-1 bg-white dark:bg-slate-900 rounded-full p-1 shadow-sm">
                  <Lock className="w-3 h-3 text-slate-400" />
                </div>
              )}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-center leading-tight">
              {label}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="rounded-xl p-3 border-border bg-card shadow-xl">
          <div className="space-y-1">
            <p className="font-bold text-sm text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
            {!unlocked && <p className="text-[10px] font-bold text-amber-500 uppercase mt-2">Zatím zamčeno</p>}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Badge;