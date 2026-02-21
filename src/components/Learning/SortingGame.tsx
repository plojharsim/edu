"use client";

import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StudyItem } from "@/data/studyData";
import { showSuccess, showError } from "@/utils/toast";
import { CheckCircle2, Circle } from "lucide-react";

interface SortingGameProps {
  items: StudyItem[];
  onComplete: (incorrectCount: number) => void;
}

const SortingGame = ({ items, onComplete }: SortingGameProps) => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [assigned, setAssigned] = useState<Record<number, string>>({});
  const [mistakeIndices, setMistakeIndices] = useState<Set<number>>(new Set());

  // Získání unikátních kategorií (skupin)
  const categories = useMemo(() => {
    const groups = items.map(item => item.group || "Ostatní");
    return Array.from(new Set(groups)).sort();
  }, [items]);

  const handleItemClick = (idx: number) => {
    if (assigned[idx]) return;
    setSelectedItemId(selectedItemId === idx ? null : idx);
  };

  const handleCategoryClick = (category: string) => {
    if (selectedItemId === null) return;

    const item = items[selectedItemId];
    const correctCategory = item.group || "Ostatní";

    if (category === correctCategory) {
      showSuccess(`Správně: ${item.term} patří do ${category}`);
      setAssigned(prev => ({ ...prev, [selectedItemId]: category }));
      setSelectedItemId(null);

      // Kontrola konce
      if (Object.keys(assigned).length + 1 === items.length) {
        setTimeout(() => onComplete(mistakeIndices.size), 1000);
      }
    } else {
      showError(`Chyba: ${item.term} nepatří do ${category}`);
      setMistakeIndices(prev => new Set(prev).add(selectedItemId));
      // Reset výběru pro vizuální zpětnou vazbu
      setSelectedItemId(null);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-12">
      {/* Kategorie nahoře */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant="outline"
            onClick={() => handleCategoryClick(cat)}
            className={cn(
              "h-24 rounded-[2rem] border-4 transition-all duration-300 flex flex-col items-center justify-center gap-1",
              selectedItemId !== null 
                ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-950/20 animate-pulse scale-105" 
                : "border-slate-100 dark:border-slate-800 bg-card"
            )}
          >
            <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">Kategorie</span>
            <span className="font-bold text-slate-800 dark:text-slate-100">{cat}</span>
          </Button>
        ))}
      </div>

      <div className="w-full h-px bg-slate-200 dark:bg-slate-800 relative">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Položky k rozřazení
        </span>
      </div>

      {/* Položky dole */}
      <div className="flex flex-wrap justify-center gap-3">
        {items.map((item, idx) => {
          const isAssigned = !!assigned[idx];
          const isSelected = selectedItemId === idx;

          return (
            <Button
              key={idx}
              variant="outline"
              disabled={isAssigned}
              onClick={() => handleItemClick(idx)}
              className={cn(
                "h-auto py-4 px-6 rounded-2xl border-2 transition-all duration-300 font-bold",
                isAssigned && "opacity-40 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 grayscale",
                isSelected && "border-indigo-600 bg-indigo-600 text-white shadow-lg scale-110",
                !isAssigned && !isSelected && "border-slate-100 dark:border-slate-800 bg-card hover:border-indigo-300"
              )}
            >
              <div className="flex items-center gap-2">
                {isAssigned ? <CheckCircle2 className="w-4 h-4" /> : <Circle className={cn("w-2 h-2 fill-current", isSelected ? "text-white" : "text-indigo-500")} />}
                {item.term}
              </div>
            </Button>
          );
        })}
      </div>

      {selectedItemId !== null && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 animate-in slide-in-from-bottom-4">
          <div className="bg-indigo-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-3">
            <span className="opacity-70">Kam patří</span>
            <span className="text-xl">"{items[selectedItemId].term}"</span>
            <span className="opacity-70">?</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortingGame;