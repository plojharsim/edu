"use client";

import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StudyItem } from "@/data/studyData";
import { showSuccess } from "@/utils/toast";

interface MatchingGameProps {
  items: StudyItem[];
  onComplete: (mistakes: StudyItem[]) => void;
}

interface CardItem {
  id: string;
  content: string;
  originalId: number;
  type: 'term' | 'definition';
}

const MatchingGame = ({ items, onComplete }: MatchingGameProps) => {
  const [selected, setSelected] = useState<CardItem | null>(null);
  const [matchedIds, setMatchedIds] = useState<number[]>([]);
  const [wrongPair, setWrongPair] = useState<[string, string] | null>(null);
  const [mistakes, setMistakes] = useState<StudyItem[]>([]);

  const cards = useMemo(() => {
    const terms = items.map(item => ({
      id: `term-${item.id}`,
      content: item.term,
      originalId: item.id,
      type: 'term' as const
    }));
    const definitions = items.map(item => ({
      id: `def-${item.id}`,
      content: item.definition,
      originalId: item.id,
      type: 'definition' as const
    }));
    return [...terms, ...definitions].sort(() => Math.random() - 0.5);
  }, [items]);

  const handleCardClick = (card: CardItem) => {
    if (matchedIds.includes(card.originalId) || wrongPair) return;

    if (!selected) {
      setSelected(card);
      return;
    }

    if (selected.id === card.id) {
      setSelected(null);
      return;
    }

    if (selected.originalId === card.originalId && selected.type !== card.type) {
      // Match!
      const newMatched = [...matchedIds, card.originalId];
      setMatchedIds(newMatched);
      setSelected(null);
      
      if (newMatched.length === items.length) {
        setTimeout(() => {
          showSuccess("Všechny dvojice nalezeny!");
          onComplete(mistakes);
        }, 500);
      }
    } else {
      // Wrong match
      setWrongPair([selected.id, card.id]);
      
      // Add to mistakes if not already there
      const item = items.find(i => i.id === card.originalId || i.id === selected.originalId);
      if (item && !mistakes.some(m => m.id === item.id)) {
        setMistakes(prev => [...prev, item]);
      }

      setTimeout(() => {
        setWrongPair(null);
        setSelected(null);
      }, 800);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {cards.map((card) => {
          const isMatched = matchedIds.includes(card.originalId);
          const isSelected = selected?.id === card.id;
          const isWrong = wrongPair?.includes(card.id);

          return (
            <Button
              key={card.id}
              variant="outline"
              onClick={() => handleCardClick(card)}
              className={cn(
                "h-24 sm:h-32 rounded-2xl border-2 transition-all duration-300 text-sm sm:text-base font-bold p-4 whitespace-normal break-words",
                isMatched && "opacity-0 pointer-events-none scale-90",
                isSelected && "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 shadow-md",
                isWrong && "border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 animate-shake",
                !isSelected && !isWrong && !isMatched && "hover:border-indigo-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/10"
              )}
            >
              {card.content}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default MatchingGame;