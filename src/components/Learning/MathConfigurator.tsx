"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MathOperation } from "@/utils/mathGenerator";
import { Calculator, Play, CheckCircle2 } from "lucide-react";

interface MathConfiguratorProps {
  onStart: (selectedTypes: MathOperation[], count: number) => void;
}

const OPERATIONS: { id: MathOperation, label: string }[] = [
  { id: 'basic', label: 'Základní (+, -, ·, :)' },
  { id: 'powers_roots', label: 'Mocniny a odmocniny' },
  { id: 'brackets', label: 'Složité závorky' },
  { id: 'rounding', label: 'Zaokrouhlování' },
  { id: 'fractions', label: 'Zlomky (výpočty)' },
  { id: 'decimal_conversion', label: 'Převod zlomků' },
  { id: 'percentages', label: 'Procenta' },
  { id: 'equations', label: 'Rovnice' },
  { id: 'units', label: 'Převody jednotek' },
  { id: 'polynomials', label: 'Mnohočleny' },
  { id: 'ratios', label: 'Poměry' },
  { id: 'proportions', label: 'Úměrnost' },
  { id: 'mixed_numbers', label: 'Smíšená čísla' },
];

const MathConfigurator = ({ onStart }: MathConfiguratorProps) => {
  const [selected, setSelected] = useState<MathOperation[]>(['basic']);
  const [count, setCount] = useState(15);

  const toggle = (id: MathOperation) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-500 mb-6">
          <Calculator className="w-10 h-10 text-rose-600 dark:text-rose-400" />
        </div>
        <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100">Nastav si počty</h2>
        <p className="text-slate-500 dark:text-slate-400">Vyber, co chceš v této lekci trénovat.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        {OPERATIONS.map(op => (
          <div 
            key={op.id} 
            className={`flex items-center space-x-3 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              selected.includes(op.id) 
                ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/20' 
                : 'border-border bg-card hover:border-rose-200'
            }`}
            onClick={() => toggle(op.id)}
          >
            <Checkbox checked={selected.includes(op.id)} onCheckedChange={() => toggle(op.id)} />
            <Label className="font-bold cursor-pointer">{op.label}</Label>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex flex-col items-center">
          <Label className="mb-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Počet příkladů: {count}</Label>
          <div className="flex gap-2">
            {[10, 15, 20, 30].map(n => (
              <Button 
                key={n} 
                variant={count === n ? "default" : "outline"} 
                onClick={() => setCount(n)}
                className="rounded-xl font-bold h-12 w-16"
              >
                {n}
              </Button>
            ))}
          </div>
        </div>

        <Button 
          onClick={() => onStart(selected, count)} 
          disabled={selected.length === 0}
          className="w-full h-16 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xl gap-3 shadow-xl shadow-rose-200 dark:shadow-none"
        >
          <Play className="w-6 h-6" /> Vygenerovat a začít
        </Button>
      </div>
    </div>
  );
};

export default MathConfigurator;