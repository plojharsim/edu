"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StudyItem } from "@/data/studyData";
import { showSuccess, showError } from "@/utils/toast";
import { CheckCircle2, ChevronDown, LayoutPanelTop } from "lucide-react";

interface SortingGameProps {
  items: StudyItem[];
  onComplete: (incorrectCount: number) => void;
}

const SortingGame = ({ items, onComplete }: SortingGameProps) => {
  const [selectedItemIdx, setSelectedItemIdx] = useState<number | null>(null);
  const [placedIndices, setPlacedIndices] = useState<Set<number>>(new Set());
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [shakeCategory, setShakeCategory] = useState<string | null>(null);

  // Získání unikátních kategorií (definic)
  const categories = useMemo(() => {
    const unique = Array.from(new Set(items.map(i => i.definition)));
    return unique.sort();
  }, [items]);

  // Položky, které ještě nebyly rozřazeny
  const remainingIndices = useMemo(() => {
    return items
      .map((_, idx) => idx)
      .filter(idx => !placedIndices.has(idx))
      .sort(() => Math.random() - 0.5);
  }, [items, placedIndices]);

  const handleCategoryClick = (category: string) => {
    if (selectedItemIdx === null) return;

    const item = items[selectedItemIdx];
    if (item.definition === category) {
      // Správně!
      setPlacedIndices(prev => new Set(prev).add(selectedItemIdx));
      setSelectedItemIdx(null);
      
      if (placedIndices.size + 1 === items.length) {
        setTimeout(() => {
          showSuccess("Vše rozřazeno!");
          onComplete(incorrectCount);
        }, 500);
      }
    } else {
      // Špatně
      setIncorrectCount(prev => prev + 1);
      setShakeCategory(category);
      showError(`To sem nepatří!`);
      setTimeout(() => setShakeCategory(null), 500);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 p-4 h-full">
      {/* Horní sekce: Kategorie (boxy) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={cn(
              "group relative min-h-[100px] p-4 rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center text-center transition-all duration-300",
              "bg-card border-slate-200 dark:border-slate-800",
              selectedItemIdx !== null && "hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 hover:scale-105",
              shakeCategory === cat && "border-red-500 bg-red-50 dark:bg-red-950/20 animate-shake"
            )}
          >
            <LayoutPanelTop className="w-5 h-5 text-indigo-500/30 mb-2" />
            <span className="font-bold text-sm sm:text-base text-slate-700 dark:text-slate-200">{cat}</span>
            <div className="absolute -top-2 -right-2 bg-indigo-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              Vložit sem
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <ChevronDown className="text-slate-300 animate-bounce" />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Vyber kartu a pak kategorii</span>
      </div>

      {/* Dolní sekce: Položky k rozřazení */}
      <div className="flex flex-wrap justify-center gap-3">
        {remainingIndices.map((idx) => {
          const item = items[idx];
          const isSelected = selectedItemIdx === idx;

          return (
            <Button
              key={idx}
              variant="outline"
              onClick={() => setSelectedItemIdx(isSelected ? null : idx)}
              className={cn(
                "h-auto py-4 px-6 rounded-2xl border-2 transition-all duration-300 font-bold",
                isSelected 
                  ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none scale-110 z-10" 
                  : "bg-card border-slate-100 dark:border-slate-800 hover:border-indigo-300 hover:bg-indigo-50/50"
              )}
            >
              {item.term}
            </Button>
          );
        })}

        {remainingIndices.length === 0 && (
          <div className="py-12 flex flex-col items-center text-emerald-500 animate-in zoom-in">
            <CheckCircle2 className="w-16 h-16 mb-2" />
            <span className="font-black">Hotovo!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortingGame;