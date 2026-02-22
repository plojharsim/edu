"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FlashcardProps {
  front: string;
  back: string;
  imageUrl?: string;
  isFlipped: boolean;
  onFlip: () => void;
}

const Flashcard = ({ front, back, imageUrl, isFlipped, onFlip }: FlashcardProps) => {
  return (
    <div 
      className="perspective-1000 w-full max-w-[320px] aspect-[4/5] cursor-pointer group"
      onClick={onFlip}
    >
      <div className={cn(
        "relative w-full h-full transition-all duration-400 preserve-3d",
        isFlipped ? "rotate-y-180" : ""
      )}>
        {/* Přední strana */}
        <Card className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 bg-card border-4 border-indigo-100 dark:border-indigo-900/30 rounded-[2rem] shadow-xl group-hover:shadow-2xl transition-shadow">
          <span className="text-[10px] font-bold text-indigo-400 dark:text-indigo-500 mb-4 uppercase tracking-widest">Otázka</span>
          
          {imageUrl && (
            <div className="w-full h-32 mb-4 overflow-hidden rounded-2xl border-2 border-indigo-50">
              <img src={imageUrl} alt="Ilustrace k otázce" className="w-full h-full object-cover" />
            </div>
          )}
          
          <h3 className={cn(
            "font-bold text-center text-slate-800 dark:text-slate-100 leading-tight break-words w-full",
            imageUrl ? "text-xl" : "text-2xl"
          )}>{front}</h3>
          
          {!isFlipped && <p className="mt-6 text-slate-400 dark:text-slate-500 text-xs animate-pulse">Klikni pro otočení</p>}
        </Card>

        {/* Zadní strana */}
        <Card className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-6 bg-indigo-600 dark:bg-indigo-700 border-4 border-indigo-400 dark:border-indigo-500 rounded-[2rem] shadow-xl">
          <span className="text-[10px] font-bold text-indigo-200 dark:text-indigo-300 mb-4 uppercase tracking-widest">Odpověď</span>
          <h3 className="text-2xl font-bold text-center text-white leading-tight break-words w-full">{back}</h3>
        </Card>
      </div>
    </div>
  );
};

export default Flashcard;