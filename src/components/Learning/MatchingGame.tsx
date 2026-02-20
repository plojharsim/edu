"use client";

import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StudyItem } from "@/data/studyData";
import { showSuccess } from "@/utils/toast";

interface MatchingGameProps {
  items: StudyItem[];
  onComplete: (incorrectCount: number) => void;
}

interface CardItem {
  id: string; // Internal React key
  content: string;
  originalIndex: number;
  type: 'term' | 'definition';
}

const MatchingGame = ({ items, onComplete }: MatchingGameProps) => {
  const [selected, setSelected] = useState<CardItem | null>(null);
  const [matchedIndices, setMatchedIndices] = useState<number[]>([]);
  const [wrongPair, setWrongPair] = useState<[string, string] | null>(null);
  const [incorrectIndices, setIncorrectIndices] = useState<Set<number>>(new Set());

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
    if (matchedIndices.includes(card.originalIndex) || wrongPair) return;

    if (!selected) {
      setSelected(card);
      return;
    }

    if (selected.id === card.id) {
      setSelected(null);
      return;
    }

    if (selected.originalIndex === card.originalIndex && selected.type !== card.type) {
      // Match!
      const newMatched = [...matchedIndices, card.originalIndex];
      setMatchedIndices(newMatched);
      setSelected(null);
      
      if (newMatched.length === items.length) {
        setTimeout(() => {
          showSuccess("Všechny dvojice nalezeny!");
          onComplete(incorrectIndices.size);
        }, 500);
      }
    } else {
      // Wrong match
      setWrongPair([selected.id, card.id]);
      
      // Mark this index as incorrect at least once
      setIncorrectIndices(prev => new Set(prev).add(card.originalIndex).add(selected.originalIndex));

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
          const isMatched = matchedIndices.includes(card.originalIndex);
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