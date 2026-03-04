"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ChevronLeft, Sparkles, Zap, ShieldCheck, 
  Layout, Brain, Globe, Smartphone, Rocket 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UpdateEntry {
  version: string;
  date: string;
  title: string;
  description: string;
  type: 'major' | 'minor' | 'patch';
  changes: {
    icon: any;
    text: string;
  }[];
}

const UPDATES: UpdateEntry[] = [
  {
    version: "1.2",
    date: "27. února 2026",
    title: "Chytřejší AI & Novinky",
    description: "Vylepšili jsme mozek naší aplikace a přidali tento přehled novinek.",
    type: 'minor',
    changes: [
      { icon: Brain, text: "Aktualizace AI modelu na Gemini 3 Flash pro bleskové generování." },
      { icon: Zap, text: "Vylepšený algoritmus pro generování chybných odpovědí (jsou teď mnohem věrohodnější)." },
      { icon: Layout, text: "Nový 'Update Feed' – právě si ho prohlížíš!" },
    ]
  },
  {
    version: "1.1",
    date: "20. února 2026",
    title: "Cloud & Komunita",
    description: "Velký krok vpřed s online synchronizací a sdílením.",
    type: 'major',
    changes: [
      { icon: Globe, text: "Veřejná knihovna: Sdílej své sady s ostatními nebo se uč z jejich materiálů." },
      { icon: ShieldCheck, text: "Zabezpečené ukládání: Tvé sady jsou teď v bezpečí v cloudu Supabase." },
      { icon: Smartphone, text: "Plná podpora pro mobilní gesta a nativní zobrazení." },
    ]
  },
  {
    version: "1.0",
    date: "1. února 2026",
    title: "Zrození Edu",
    description: "První oficiální verze moderní studijní platformy.",
    type: 'major',
    changes: [
      { icon: Rocket, text: "Spuštění aplikace s 5 studijními režimy." },
      { icon: Sparkles, text: "AI generování témat z textu a fotek poznámek." },
    ]
  }
];

const Updates = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6 pt-safe flex flex-col items-center">
      <header className="max-w-4xl w-full md:pt-safe-lg mb-10 flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/app')} 
          className="rounded-2xl h-12 w-12 bg-card shadow-sm border border-border flex-shrink-0"
        >
          <ChevronLeft className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </Button>
        <div className="flex flex-col">
          <h1 className="text-3xl font-black text-foreground">Co je nového?</h1>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Update Feed & Historie</p>
        </div>
      </header>

      <main className="max-w-4xl w-full space-y-12 pb-20">
        {UPDATES.map((update, idx) => (
          <div key={update.version} className="relative">
            {/* Timeline Line */}
            {idx !== UPDATES.length - 1 && (
              <div className="absolute left-6 top-16 bottom-[-3rem] w-1 bg-border rounded-full -z-10" />
            )}
            
            <div className="flex gap-6">
              <div className={cn(
                "w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center shadow-lg z-10",
                update.type === 'major' ? "bg-indigo-600 text-white" : "bg-card border-2 border-indigo-100 text-indigo-600"
              )}>
                <span className="font-black text-sm">{update.version}</span>
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-black text-foreground">{update.title}</h2>
                    <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-1 rounded-md uppercase">
                      {update.date}
                    </span>
                  </div>
                  <p className="text-muted-foreground font-medium">{update.description}</p>
                </div>

                <Card className="p-6 rounded-[2rem] border-2 border-border bg-card shadow-sm grid grid-cols-1 gap-4">
                  {update.changes.map((change, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-4">
                      <div className="p-2 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl shrink-0">
                        <change.icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-relaxed pt-1">
                        {change.text}
                      </p>
                    </div>
                  ))}
                </Card>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Updates;