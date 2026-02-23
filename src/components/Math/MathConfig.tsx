"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MathConfig, MathOp } from "@/utils/mathGenerator";
import { Calculator, Zap, Binary, Hash } from "lucide-react";
import { cn } from "@/lib/utils";

interface MathConfigProps {
  onStart: (config: MathConfig) => void;
}

const MathConfigUI = ({ onStart }: MathConfigProps) => {
  const [selectedOps, setSelectedOps] = useState<MathOp[]>(['addition', 'subtraction']);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [count, setCount] = useState(10);

  const toggleOp = (op: MathOp) => {
    setSelectedOps(prev => 
      prev.includes(op) ? prev.filter(o => o !== op) : [...prev, op]
    );
  };

  const OP_GROUPS = [
    { 
      title: "Základní operace", 
      icon: Calculator,
      items: [
        { id: 'addition', label: 'Sčítání' },
        { id: 'subtraction', label: 'Odčítání' },
        { id: 'multiplication', label: 'Násobení' },
        { id: 'division', label: 'Dělení' },
      ]
    },
    {
      title: "Pokročilé",
      icon: Zap,
      items: [
        { id: 'powers', label: 'Mocniny' },
        { id: 'roots', label: 'Odmocniny' },
        { id: 'brackets', label: 'Závorky' },
        { id: 'equations', label: 'Rovnice' },
      ]
    },
    {
      title: "Zlomky a Procenta",
      icon: Hash,
      items: [
        { id: 'fractions_basic', label: 'Zlomky (krácení)' },
        { id: 'percentages', label: 'Procenta' },
        { id: 'units', label: 'Jednotky' },
      ]
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100">Nastavení generátoru</h2>
        <p className="text-slate-500 dark:text-slate-400">Vyber si, co chceš dnes procvičit.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {OP_GROUPS.map((group, gIdx) => (
          <div key={gIdx} className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <group.icon className="w-5 h-5 text-rose-500" />
              <h3 className="font-bold text-slate-700 dark:text-slate-200 uppercase text-xs tracking-widest">{group.title}</h3>
            </div>
            <div className="space-y-3">
              {group.items.map(item => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-card rounded-2xl border border-border hover:border-rose-200 transition-colors">
                  <Checkbox 
                    id={item.id} 
                    checked={selectedOps.includes(item.id as MathOp)}
                    onCheckedChange={() => toggleOp(item.id as MathOp)}
                  />
                  <Label htmlFor={item.id} className="text-sm font-medium cursor-pointer flex-1">{item.label}</Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <h3 className="font-bold text-slate-700 dark:text-slate-200 uppercase text-xs tracking-widest">Obtížnost</h3>
          <div className="flex gap-2">
            {(['easy', 'medium', 'hard'] as const).map(d => (
              <Button
                key={d}
                variant={difficulty === d ? 'default' : 'outline'}
                onClick={() => setDifficulty(d)}
                className={cn(
                  "flex-1 rounded-xl h-12 font-bold",
                  difficulty === d && "bg-rose-600 hover:bg-rose-700"
                )}
              >
                {d === 'easy' ? 'Lehká' : d === 'medium' ? 'Střední' : 'Těžká'}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-bold text-slate-700 dark:text-slate-200 uppercase text-xs tracking-widest">Počet příkladů</h3>
          <div className="flex gap-2">
            {[10, 20, 50].map(n => (
              <Button
                key={n}
                variant={count === n ? 'default' : 'outline'}
                onClick={() => setCount(n)}
                className={cn(
                  "flex-1 rounded-xl h-12 font-bold",
                  count === n && "bg-rose-600 hover:bg-rose-700"
                )}
              >
                {n}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Button 
        onClick={() => onStart({ operations: selectedOps, difficulty, count })}
        disabled={selectedOps.length === 0}
        className="w-full h-16 rounded-[2rem] bg-rose-600 hover:bg-rose-700 text-white font-black text-xl shadow-xl shadow-rose-200 dark:shadow-none"
      >
        Vygenerovat a začít
      </Button>
    </div>
  );
};

export default MathConfigUI;