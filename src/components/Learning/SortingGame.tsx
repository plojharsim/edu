"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StudyItem } from "@/data/studyData";
import { showSuccess, showError } from "@/utils/toast";
import { CheckCircle2, LayoutGrid } from "lucide-react";

interface ItemState {
  id: string;
  originalItem: StudyItem;
  content: string;
  correctCategory: string;
  status: 'pending' | 'correct' | 'wrong';
}

const SortingGame = ({ items, onComplete }: SortingGameProps) => {
  // Filtrace položek, které mají definovanou kategorii
  const sortableItems = useMemo(() => 
    items.filter(i => i.category && i.category.trim() !== ""), 
  [items]);

  const categories = useMemo(() => 
    Array.from(new Set(sortableItems.map(i => i.category!))).sort(),
  [sortableItems]);

  const [gameState, setGameState] = useState<ItemState[]>(() => 
    sortableItems.map((item, idx) => ({
      id: `sort-item-${idx}`,
      originalItem: item,
      content: item.term,
      correctCategory: item.category!,
      status: 'pending' as const
    })).sort(() => Math.random() - 0.5)
  );

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [failedItemIds, setFailedItemIds] = useState<Set<string>>(new Set());

  const activeItems = gameState.filter(i => i.status !== 'correct');
  
  const currentItem = selectedItemId 
    ? gameState.find(i => i.id === selectedItemId)
    : activeItems[0];

  const queueItems = useMemo(() => 
    activeItems.filter(i => i.id !== currentItem?.id),
  [activeItems, currentItem]);

  const handleCategorySelect = (category: string) => {
    if (!currentItem) return;

    if (currentItem.correctCategory === category) {
      setGameState(prev => prev.map(i => 
        i.id === currentItem.id ? { ...i, status: 'correct' } : i
      ));
      setSelectedItemId(null);
      showSuccess(`Správně! ${currentItem.content} patří do: ${category}`);
    } else {
      // Zaznamenáme chybu pro danou položku
      setFailedItemIds(prev => new Set(prev).add(currentItem.id));
      showError(`Chyba. ${currentItem.content} tam nepatří.`);
    }
  };

  useEffect(() => {
    if (gameState.length > 0 && gameState.every(i => i.status === 'correct')) {
      const failedItemsList = gameState
        .filter(item => failedItemIds.has(item.id))
        .map(item => item.originalItem);
      
      setTimeout(() => onComplete(failedItemsList), 800);
    }
  }, [gameState, failedItemIds, onComplete]);

  if (sortableItems.length === 0) {
    return (
      <div className="text-center p-12 bg-card rounded-[2rem] border-2 border-dashed border-border">
        <p className="text-muted-foreground font-medium">Toto téma nemá u položek nastavené kategorie pro rozřazování.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant="outline"
            onClick={() => handleCategorySelect(cat)}
            className="h-24 rounded-2xl border-2 border-indigo-100 dark:border-indigo-900/30 bg-card hover:bg-indigo-50 dark:hover:bg-indigo-950/20 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all flex flex-col items-center justify-center p-4"
          >
            <span className="text-[10px] font-bold uppercase text-indigo-400 dark:text-indigo-500 mb-1">Kategorie</span>
            <span className="text-lg font-black text-slate-800 dark:text-slate-100">{cat}</span>
          </Button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Kam patří tento termín?</p>
          {currentItem ? (
            <div className="p-8 px-12 bg-indigo-600 rounded-[2rem] shadow-xl shadow-indigo-200 dark:shadow-none animate-in zoom-in duration-300">
              <h3 className="text-3xl font-black text-white">{currentItem.content}</h3>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-emerald-500">
              <CheckCircle2 className="w-12 h-12" />
              <p className="font-bold">Hotovo!</p>
            </div>
          )}
        </div>

        <div className="w-full">
          <div className="flex items-center gap-2 mb-4">
            <LayoutGrid className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-400 uppercase">Zbývá ve frontě: {queueItems.length}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {queueItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItemId(item.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all bg-card border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300"
                )}
              >
                {item.content}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingGame;