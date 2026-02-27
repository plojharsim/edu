"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StudyItem } from "@/data/studyData";
import { showSuccess } from "@/utils/toast";
import { Sparkles, HelpCircle } from "lucide-react";

interface MatchingGameProps {
  items: StudyItem[];
  onComplete: (failedItems: StudyItem[]) => void;
}

interface CardItem {
  id: string; 
  content: string;
  originalIndex: number;
  type: 'term' | 'definition';
}

const MatchingGame = ({ items, onComplete }: MatchingGameProps) => {
  const [flipped, setFlipped] = useState<string[]>([]); // ID otočených karet (aktuální pokus)
  const [matchedIndices, setMatchedIndices] = useState<number[]>([]);
  const [incorrectIndices, setIncorrectIndices] = useState<Set<number>>(new Set());
  const [isProcessing, setIsProcessing] = useState(false);

  const cards = useMemo(() => {
    const terms = items.map((item, idx) => ({
      id: `term-${idx}`,
      content: item.term,
      originalIndex: idx,
      type: 'term' as const
    }));
    const definitions = items.map((item, idx) => ({
      id: `def-${idx}`,
      content: item.definition,
      originalIndex: idx,
      type: 'definition' as const
    }));
    return [...terms, ...definitions].sort(() => Math.random() - 0.5);
  }, [items]);

  const handleCardClick = (card: CardItem) => {
    if (
      isProcessing || 
      matchedIndices.includes(card.originalIndex) || 
      flipped.includes(card.id)
    ) return;

    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setIsProcessing(true);
      
      const firstCardId = newFlipped[0];
      const secondCardId = newFlipped[1];
      
      const firstCard = cards.find(c => c.id === firstCardId)!;
      const secondCard = cards.find(c => c.id === secondCardId)!;

      if (firstCard.originalIndex === secondCard.originalIndex) {
        // Shoda!
        setTimeout(() => {
          setMatchedIndices(prev => [...prev, firstCard.originalIndex]);
          setFlipped([]);
          setIsProcessing(false);
        }, 600);
      } else {
        // Chyba
        setIncorrectIndices(prev => new Set(prev).add(firstCard.originalIndex).add(secondCard.originalIndex));
        
        setTimeout(() => {
          setFlipped([]);
          setIsProcessing(false);
        }, 1200); // Necháme uživatele chvíli se dívat na karty
      }
    }
  };

  useEffect(() => {
    if (matchedIndices.length === items.length && items.length > 0) {
      const failedItems = items.filter((_, idx) => incorrectIndices.has(idx));
      setTimeout(() => {
        showSuccess("Pexeso dokončeno! Skvělá paměť.");
        onComplete(failedItems);
      }, 800);
    }
  }, [matchedIndices, items, incorrectIndices, onComplete]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {cards.map((card) => {
          const isMatched = matchedIndices.includes(card.originalIndex);
          const isFlipped = flipped.includes(card.id) || isMatched;

          return (
            <div 
              key={card.id}
              className="perspective-1000 aspect-[3/4] sm:aspect-square cursor-pointer"
              onClick={() => handleCardClick(card)}
            >
              <div className={cn(
                "relative w-full h-full transition-all duration-500 preserve-3d",
                isFlipped ? "rotate-y-180" : ""
              )}>
                {/* Zadní strana (Face down) */}
                <div className="absolute inset-0 backface-hidden bg-indigo-600 rounded-2xl border-4 border-indigo-400 flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors">
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-white/10 rounded-full">
                      <Sparkles className="w-6 h-6 text-indigo-200" />
                    </div>
                    <span className="text-[10px] font-black text-indigo-200 uppercase tracking-[0.2em]">Edu</span>
                  </div>
                </div>

                {/* Přední strana (Face up) */}
                <div className={cn(
                  "absolute inset-0 backface-hidden rotate-y-180 bg-card rounded-2xl border-4 flex flex-col items-center justify-center p-3 text-center shadow-inner",
                  isMatched ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" : "border-indigo-100 dark:border-indigo-900/30"
                )}>
                  <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mb-2 shrink-0">
                    {card.type === 'term' ? 'Termín' : 'Definice'}
                  </span>
                  <div className="flex-1 flex items-center justify-center w-full min-w-0">
                    <span className={cn(
                      "font-bold leading-tight break-words text-sm sm:text-base",
                      isMatched ? "text-emerald-700 dark:text-emerald-400" : "text-slate-800 dark:text-slate-100"
                    )}>
                      {card.content}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchingGame;