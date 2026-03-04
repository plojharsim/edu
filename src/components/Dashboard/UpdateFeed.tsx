"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, ShieldCheck, Trophy, LayoutGrid, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";

interface UpdateItem {
  id: string;
  date: string;
  version: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  isNew?: boolean;
}

const UPDATES: UpdateItem[] = [
  {
    id: 'ai-v2',
    date: 'Dnes',
    version: '1.2',
    title: 'Chytřejší AI generátor',
    description: 'AI nyní generuje mnohem věrohodnější chybné odpovědi, které jsou délkou podobné těm správným.',
    icon: BrainCircuit,
    color: 'bg-indigo-500',
    isNew: true
  },
  {
    id: 'stats-fix',
    date: 'Včera',
    version: '1.1.2',
    title: 'Oprava statistik a žebříčku',
    description: 'Vylepšili jsme logiku počítání sérií (streak) a řazení v síni slávy.',
    icon: Trophy,
    color: 'bg-amber-500'
  },
  {
    id: 'game-progress',
    date: 'Před 2 dny',
    version: '1.1.1',
    title: 'Plynulejší Pexeso',
    description: 'Během hraní pexesa a rozřazování nyní vidíš svůj reálný pokrok v horní liště.',
    icon: LayoutGrid,
    color: 'bg-emerald-500'
  }
];

const UpdateFeed = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
          Co je nového?
        </h2>
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted px-3 py-1 rounded-full">
          Aktualizace
        </span>
      </div>

      <div className="space-y-4">
        {UPDATES.map((update) => (
          <Card 
            key={update.id} 
            className="p-5 rounded-[2rem] border-2 border-border bg-card shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
          >
            {update.isNew && (
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[8px] font-black uppercase py-1 px-8 rotate-45 translate-x-3 translate-y-1 shadow-sm">
                  NEW
                </div>
              </div>
            )}
            
            <div className="flex gap-4 items-start">
              <div className={cn("p-3 rounded-2xl shrink-0 group-hover:scale-110 transition-transform", update.color)}>
                <update.icon className="w-5 h-5 text-white" />
              </div>
              
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-black text-foreground truncate">{update.title}</h3>
                  <Badge variant="outline" className="text-[10px] font-bold rounded-lg py-0 border-indigo-200 dark:border-indigo-900/30 text-indigo-500">
                    v{update.version}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {update.description}
                </p>
                <div className="pt-2">
                  <span className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest">
                    {update.date}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UpdateFeed;