"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, Check, X } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

interface MathProblemProps {
  term: string;
  correctAnswer: string;
  onAnswer: (isCorrect: boolean) => void;
}

const MathProblem = ({ term, correctAnswer, onAnswer }: MathProblemProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;

    // Normalizace pro zlomky a desetinná čísla
    const normValue = value.trim().replace(',', '.');
    const normCorrect = correctAnswer.trim().replace(',', '.');
    
    const isCorrect = normValue === normCorrect;
    
    if (isCorrect) {
      showSuccess("Správně vyřešeno!");
    } else {
      showError(`Chyba. Výsledek byl: ${correctAnswer}`);
    }

    onAnswer(isCorrect);
    setValue("");
  };

  return (
    <div className="w-full max-w-md mx-auto p-10 bg-card rounded-[3rem] shadow-2xl border-4 border-rose-50 dark:border-rose-950/20 animate-in zoom-in duration-300">
      <div className="text-center mb-10 flex flex-col items-center">
        <div className="p-4 bg-rose-500 rounded-3xl shadow-lg shadow-rose-200 dark:shadow-none mb-6">
          <Calculator className="w-8 h-8 text-white" />
        </div>
        <span className="text-xs font-black text-rose-500 uppercase tracking-widest mb-4">Vypočítej příklad</span>
        <h3 className="text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">{term}</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Input 
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Výsledek..."
            className="h-16 text-2xl font-bold text-center rounded-2xl border-2 border-slate-100 dark:border-slate-800 focus:border-rose-400 focus:ring-rose-400 bg-background"
            autoFocus
            autoComplete="off"
          />
        </div>
        <Button 
          type="submit" 
          disabled={!value.trim()}
          className="w-full h-16 text-xl font-black rounded-2xl bg-rose-500 hover:bg-rose-600 text-white shadow-xl shadow-rose-200 dark:shadow-none transition-transform active:scale-95"
        >
          Odeslat výsledek
        </Button>
      </form>
    </div>
  );
};

export default MathProblem;