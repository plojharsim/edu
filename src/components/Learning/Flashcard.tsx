"use client";

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FlashcardProps {
  front: string;
  back: string;
}

const Flashcard = ({ front, back }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="perspective-1000 w-full max-w-md aspect-[3/4] cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={cn(
        "relative w-full h-full transition-all duration-500 preserve-3d",
        isFlipped ? "rotate-y-180" : ""
      )}>
        {/* Přední strana */}
        <Card className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 bg-white border-4 border-indigo-100 rounded-[2rem] shadow-xl group-hover:shadow-2xl transition-shadow">
          <span className="text-sm font-medium text-indigo-400 mb-4 uppercase tracking-widest">Otázka</span>
          <h3 className="text-3xl font-bold text-center text-slate-800 leading-tight">{front}</h3>
          <p className="mt-8 text-slate-400 text-sm animate-pulse">Klikni pro otočení</p>
        </Card>

        {/* Zadní strana */}
        <Card className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-8 bg-indigo-600 border-4 border-indigo-400 rounded-[2rem] shadow-xl">
          <span className="text-sm font-medium text-indigo-200 mb-4 uppercase tracking-widest">Odpověď</span>
          <h3 className="text-3xl font-bold text-center text-white leading-tight">{back}</h3>
        </Card>
      </div>
    </div>
  );
};

export default Flashcard;