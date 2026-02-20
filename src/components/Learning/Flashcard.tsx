"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FlashcardProps {
  front: string;
  back: string;
  isFlipped: boolean;
  onFlip: () => void;
}

const Flashcard = ({ front, back, isFlipped, onFlip }: FlashcardProps) => {
  return (
    <div 
      className="perspective-1000 w-full max-w-md aspect-[3/4] cursor-pointer group"
      onClick={onFlip}
    >
      <div className={cn(
        "relative w-full h-full transition-all duration-500 preserve-3d",
        isFlipped ? "rotate-y-180" : ""
      )}>
        {/* Přední strana */}
        <Card className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 bg-card border-4 border-indigo-100 dark:border-indigo-900/30 rounded-[2rem] shadow-xl group-hover:shadow-2xl transition-shadow">
          <span className="text-sm font-medium text-indigo-400 dark:text-indigo-500 mb-4 uppercase tracking-widest">Otázka</span>
          <h3 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100 leading-tight">{front}</h3>
          {!isFlipped && <p className="mt-8 text-slate-400 dark:text-slate-500 text-sm animate-pulse">Klikni pro otočení</p>}
        </Card>

        {/* Zadní strana */}
        <Card className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-8 bg-indigo-600 dark:bg-indigo-700 border-4 border-indigo-400 dark:border-indigo-500 rounded-[2rem] shadow-xl">
          <span className="text-sm font-medium text-indigo-200 dark:text-indigo-300 mb-4 uppercase tracking-widest">Odpověď</span>
          <h3 className="text-3xl font-bold text-center text-white leading-tight">{back}</h3>
        </Card>
      </div>
    </div>
  );
};

export default Flashcard;