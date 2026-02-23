"use client";

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MathOp, MathConfig } from "@/utils/mathGenerator";
import { Calculator, Play, GraduationCap, Settings2 } from "lucide-react";

interface MathSettingsProps {
  onStart: (config: MathConfig) => void;
}

const MathSettings = ({ onStart }: MathSettingsProps) => {
  const [selectedOps, setSelectedOps] = useState<MathOp[]>(['basic', 'equations', 'percentages']);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [count, setCount] = useState(10);

  const OPTIONS: { id: MathOp; label: string }[] = [
    { id: 'basic', label: 'Sčítání, odčítání, násobení, dělení' },
    { id: 'powers', label: 'Mocniny a odmocniny' },
    { id: 'equations', label: 'Rovnice o jedné neznámé' },
    { id: 'fractions', label: 'Zlomky (+, -, *, /)' },
    { id: 'percentages', label: 'Procenta a části' },
    { id: 'units', label: 'Převody jednotek' },
    { id: 'brackets', label: 'Složitější operace se závorkami' },
    { id: 'ratios', label: 'Poměry a úměrnost' },
    { id: 'polynomials', label: 'Mnohočleny' }
  ];

  const toggleOp = (op: MathOp) => {
    setSelectedOps(prev => 
      prev.includes(op) ? prev.filter(o => o !== op) : [...prev, op]
    );
  };

  return (
    <Card className="w-full max-w-2xl p-8 rounded-[3rem] border-2 border-indigo-100 dark:border-indigo-900/30 bg-card shadow-2xl animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col items-center mb-10">
        <div className="p-4 bg-indigo-600 rounded-3xl shadow-lg shadow-indigo-200 dark:shadow-none mb-6">
          <Calculator className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-black text-foreground">Nastavení matematiky</h2>
        <p className="text-muted-foreground mt-2">Vyber si, co se chceš dnes naučit.</p>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Settings2 className="w-4 h-4 text-indigo-500" />
            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Typy příkladů</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {OPTIONS.map(opt => (
              <div key={opt.id} className="flex items-center space-x-3 p-4 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-border transition-colors hover:border-indigo-300">
                <Checkbox 
                  id={opt.id} 
                  checked={selectedOps.includes(opt.id)} 
                  onCheckedChange={() => toggleOp(opt.id)}
                />
                <Label htmlFor={opt.id} className="text-sm font-bold cursor-pointer leading-tight">{opt.label}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-4 h-4 text-indigo-500" />
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Obtížnost</h3>
            </div>
            <div className="flex gap-2">
              {(['easy', 'medium', 'hard'] as const).map(d => (
                <Button
                  key={d}
                  variant={difficulty === d ? 'default' : 'outline'}
                  onClick={() => setDifficulty(d)}
                  className={`flex-1 rounded-xl font-bold h-12 ${difficulty === d ? 'bg-indigo-600' : ''}`}
                >
                  {d === 'easy' ? 'Lehká' : d === 'medium' ? 'Střední' : 'Těžká'}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Settings2 className="w-4 h-4 text-indigo-500" />
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Počet příkladů: {count}</h3>
            </div>
            <input 
              type="range" min="5" max="30" step="5"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>

        <Button 
          onClick={() => onStart({ ops: selectedOps, count, difficulty })}
          disabled={selectedOps.length === 0}
          className="w-full h-16 rounded-[2rem] bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xl gap-3 shadow-xl shadow-indigo-200 dark:shadow-none"
        >
          <Play className="w-6 h-6 fill-white" /> Vygenerovat lekci
        </Button>
      </div>
    </Card>
  );
};

export default MathSettings;