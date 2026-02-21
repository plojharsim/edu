"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, ArrowDown } from "lucide-react";

interface CategorizationGameProps {
  term: string;
  correctCategory: string;
  allCategories: string[];
  onAnswer: (isCorrect: boolean) => void;
}

const CategorizationGame = ({ term, correctCategory, allCategories, onAnswer }: CategorizationGameProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  // Omezení počtu kategorií pro lepší UX (max 6 náhodných včetně správné)
  const displayedCategories = React.useMemo(() => {
    const others = allCategories.filter(c => c !== correctCategory);
    const shuffledOthers = [...others].sort(() => Math.random() - 0.5).slice(0, 5);
    return [correctCategory, ...shuffledOthers].sort(() => Math.random() - 0.5);
  }, [correctCategory, allCategories]);

  const handleSelect = (category: string) => {
    if (isLocked) return;
    setSelected(category);
    setIsLocked(true);

    const isCorrect = category === correctCategory;
    
    setTimeout(() => {
      onAnswer(isCorrect);
      setSelected(null);
      setIsLocked(false);
    }, 800);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-8">
      <div className="w-full bg-card p-10 rounded-[2.5rem] shadow-xl border-4 border-indigo-50 dark:border-indigo-900/20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-indigo-500" />
        <span className="text-xs font-black text-indigo-500 uppercase tracking-[0.2em] mb-4 block">Zařaď do kategorie</span>
        <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100 mb-6">{term}</h3>
        <ArrowDown className="w-6 h-6 text-slate-300 mx-auto animate-bounce" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {displayedCategories.map((category, idx) => {
          const isSelected = selected === category;
          const isCorrect = category === correctCategory;

          return (
            <Button
              key={`${category}-${idx}`}
              variant="outline"
              onClick={() => handleSelect(category)}
              className={cn(
                "h-auto py-5 px-6 text-lg font-bold rounded-2xl border-2 transition-all duration-300 flex justify-between items-center bg-card",
                !selected && "hover:border-indigo-400 dark:hover:border-indigo-500 hover:scale-[1.02] active:scale-95",
                isSelected && isCorrect && "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-700 dark:text-emerald-400",
                isSelected && !isCorrect && "bg-red-50 dark:bg-red-950/30 border-red-500 text-red-700 dark:text-red-400 animate-shake",
                selected && isCorrect && !isSelected && "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-700 dark:text-emerald-400 opacity-40"
              )}
              disabled={isLocked}
            >
              <span className="truncate pr-2">{category}</span>
              {isSelected && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
              {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorizationGame;