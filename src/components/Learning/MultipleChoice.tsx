"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

interface MultipleChoiceProps {
  question: string;
  imageUrl?: string;
  options: string[];
  correctAnswer: string;
  onAnswer: (isCorrect: boolean) => void;
  isLast?: boolean;
}

const MultipleChoice = ({ question, imageUrl, options, correctAnswer, onAnswer, isLast }: MultipleChoiceProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSelect = (option: string) => {
    if (isConfirmed) return;
    setSelected(option);
    setIsConfirmed(true);
  };

  const handleNext = () => {
    if (selected) {
      onAnswer(selected === correctAnswer);
      setSelected(null);
      setIsConfirmed(false);
    }
  };

  const isCorrect = selected === correctAnswer;

  return (
    <div className="w-full max-w-xl mx-auto space-y-8 p-4">
      <div className="bg-card p-6 sm:p-8 rounded-[2rem] shadow-sm border-2 border-slate-50 dark:border-slate-800 flex flex-col items-center w-full">
        {imageUrl && (
          <div className="w-full max-w-[300px] aspect-video mb-6 rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center">
            <img src={imageUrl} alt={question} className="max-w-full max-h-full object-contain p-2" />
          </div>
        )}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 text-center w-full break-words px-2">
          {question}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full">
        {options.map((option, idx) => {
          const isCurrentOptionCorrect = option === correctAnswer;
          const isSelected = selected === option;
          
          return (
            <Button
              key={idx}
              variant="outline"
              onClick={() => handleSelect(option)}
              className={cn(
                "h-auto min-h-[4rem] py-4 px-6 text-base sm:text-lg font-medium rounded-2xl border-2 transition-all duration-300 flex items-center justify-between gap-4 bg-card w-full text-left whitespace-normal",
                !isConfirmed && "hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/20",
                isConfirmed && isCurrentOptionCorrect && "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-700 dark:text-emerald-400",
                isConfirmed && isSelected && !isCurrentOptionCorrect && "bg-red-50 dark:bg-red-950/30 border-red-500 text-red-700 dark:text-red-400",
                isConfirmed && !isSelected && !isCurrentOptionCorrect && "opacity-50"
              )}
              disabled={isConfirmed}
            >
              <div className="flex-1 min-w-0 break-words">
                {option}
              </div>
              {isConfirmed && isCurrentOptionCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />}
              {isConfirmed && isSelected && !isCurrentOptionCorrect && <XCircle className="w-6 h-6 text-red-500 shrink-0" />}
            </Button>
          );
        })}
      </div>

      {isConfirmed && (
        <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Button 
            onClick={handleNext}
            className="h-14 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg gap-2 shadow-xl shadow-indigo-200 dark:shadow-none min-w-[200px]"
          >
            {isLast && isCorrect ? "Zobrazit výsledky" : "Další otázka"} <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default MultipleChoice;