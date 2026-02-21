"use client";

import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StudyItem } from "@/data/studyData";
import { showSuccess, showError } from "@/utils/toast";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface SortingGameProps {
  items: StudyItem[];
  onComplete: (incorrectCount: number) => void;
}

const SortingGame = ({ items, onComplete }: SortingGameProps) => {
  const [selectedItemIdx, setSelectedItemIdx] = useState<number | null>(null);
  const [solvedIndices, setSolvedIndices] = useState<number[]>([]);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [wrongAnimation, setWrongAnimation] = useState<number | null>(null);

  // Get unique categories (definitions)
  const categories = useMemo(() => {
    const unique = Array.from(new Set(items.map(i => i.definition)));
    return unique.sort();
  }, [items]);

  // Remaining items that need to be sorted
  const remainingItems = useMemo(() => {
    return items
      .map((item, idx) => ({ ...item, originalIndex: idx }))
      .filter(item => !solvedIndices.includes(item.originalIndex))
      .sort(() => Math.random() - 0.5);
  }, [items, solvedIndices]);

  const handleItemClick = (idx: number) => {
    setSelectedItemIdx(selectedItemIdx === idx ? null : idx);
  };

  const handleCategoryClick = (category: string) => {
    if (selectedItemIdx === null) return;

    const item = items[selectedItemIdx];
    if (item.definition === category) {
      // Correct!
      const newSolved = [...solvedIndices, selectedItemIdx];
      setSolvedIndices(newSolved);
      setSelectedItemIdx(null);
      
      if (newSolved.length === items.length) {
        setTimeout(() => {
          showSuccess("Skvělá práce! Vše je rozřazeno.");
          onComplete(incorrectCount);
        }, 500);
      }
    } else {
      // Wrong
      setIncorrectCount(prev => prev + 1);
      setWrongAnimation(selectedItemIdx);
      showError(`Zkus to znovu. "${item.term}" nepatří do kategorie "${category}".`);
      
      setTimeout(() => {
        setWrongAnimation(null);
        setSelectedItemIdx(null);
      }, 800);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 flex flex-col gap-8">
      {/* Pool of items to sort */}
      <div className="bg-card/50 backdrop-blur-sm p-6 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 text-center">Položky k rozřazení</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {remainingItems.length > 0 ? (
            remainingItems.map((item) => (
              <Button
                key={item.originalIndex}
                variant="outline"
                onClick={() => handleItemClick(item.originalIndex)}
                className={cn(
                  "h-auto py-4 px-6 rounded-2xl border-2 transition-all duration-300 font-bold",
                  selectedItemIdx === item.originalIndex 
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 scale-105 shadow-md" 
                    : "bg-card hover:border-indigo-300",
                  wrongAnimation === item.originalIndex && "animate-shake border-red-500 text-red-500"
                )}
              >
                {item.term}
              </Button>
            ))
          ) : (
            <div className="flex items-center gap-2 text-emerald-500 font-bold py-4">
              <CheckCircle2 className="w-6 h-6" /> Hotovo!
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 text-slate-400">
        <ArrowRight className="w-6 h-6 rotate-90" />
        <span className="text-[10px] font-black uppercase tracking-widest">Přiřaď do kategorie</span>
      </div>

      {/* Buckets/Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div 
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={cn(
              "p-6 rounded-[2rem] border-4 transition-all duration-300 cursor-pointer min-h-[120px] flex flex-col items-center justify-center text-center gap-2",
              selectedItemIdx !== null 
                ? "border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/30 dark:bg-indigo-950/10 hover:border-indigo-500 hover:bg-indigo-50" 
                : "border-slate-100 dark:border-slate-800 bg-card"
            )}
          >
            <h4 className="font-black text-lg text-slate-800 dark:text-slate-100">{cat}</h4>
            <div className="flex flex-wrap justify-center gap-1.5 mt-2">
              {solvedIndices
                .filter(idx => items[idx].definition === cat)
                .map(idx => (
                  <span key={idx} className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                    {items[idx].term}
                  </span>
                ))
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortingGame;