"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { StudyItem } from "@/data/studyData";
import { showSuccess } from "@/utils/toast";
import { HelpCircle } from "lucide-react";

interface MatchingGameProps {
  items: StudyItem[];
  onComplete: (failedItems: StudyItem[]) => void;
  onPairMatched?: () => void;
}

interface CardItem {
  id: string; 
  content: string;
  originalIndex: number;
  type: 'term' | 'definition';
}

const MatchingGame = ({ items, onComplete, onPairMatched }: MatchingGameProps) => {
  const [flipped, setFlipped] = useState<CardItem[]>([]);
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
      flipped.some(f => f.id === card.id)
    ) return;

    const newFlipped = [...flipped, card];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setIsProcessing(true);
      const [first, second] = newFlipped;

      if (first.originalIndex === second.originalIndex) {
        setTimeout(() => {
          setMatchedIndices(prev => [...prev, first.originalIndex]);
          setFlipped([]);
          setIsProcessing(false);
          if (onPairMatched) onPairMatched();
        }, 600);
      } else {
        setIncorrectIndices(prev => new Set(prev).add(first.originalIndex).add(second.originalIndex));
        setTimeout(() => {
          setFlipped([]);
          setIsProcessing(false);
        }, 1200);
      }
    }
  };

  useEffect(() => {
    if (matchedIndices.length === items.length && items.length > 0) {
      const failedItems = items.filter((_, idx) => incorrectIndices.has(idx));
      setTimeout(() => {
        showSuccess("Pexeso dokončeno!");
        onComplete(failedItems);
      }, 800);
    }
  }, [matchedIndices, items, incorrectIndices, onComplete]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {cards.map((card) => {
          const isMatched = matchedIndices.includes(card.originalIndex);
          const isFlipped = flipped.some(f => f.id === card.id);
          
          return (
            <div 
              key={card.id} 
              className="perspective-1000 aspect-square w-full"
              onClick={() => handleCardClick(card)}
            >
              <div className={cn(
                "relative w-full h-full transition-all duration-500 preserve-3d cursor-pointer",
                (isFlipped || isMatched) ? "rotate-y-180" : "",
                isMatched && "opacity-0 scale-90 pointer-events-none"
              )}>
                <div className="absolute inset-0 backface-hidden bg-indigo-600 rounded-2xl flex items-center justify-center shadow-md border-2 border-indigo-500">
                  <HelpCircle className="w-8 h-8 text-indigo-300 opacity-50" />
                </div>

                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-card border-2 border-indigo-100 dark:border-indigo-900/30 rounded-2xl flex items-center justify-center p-2 text-center shadow-sm overflow-hidden">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-slate-100 break-words leading-tight">
                    {card.content}
                  </span>
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