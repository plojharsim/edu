"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

interface MultipleChoiceProps {
  question: string;
  imageUrl?: string;
  options: string[];
  correctAnswer: string;
  onAnswer: (isCorrect: boolean) => void;
}

const MultipleChoice = ({ question, imageUrl, options, correctAnswer, onAnswer }: MultipleChoiceProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const handleSelect = (option: string) => {
    if (isLocked) return;
    setSelected(option);
    setIsLocked(true);
    setTimeout(() => {
      onAnswer(option === correctAnswer);
      setSelected(null);
      setIsLocked(false);
    }, 1200);
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-8 p-4">
      <div className="bg-card p-6 sm:p-8 rounded-[2rem] shadow-sm border-2 border-slate-50 dark:border-slate-800 flex flex-col items-center">
        {imageUrl && (
          <div className="w-full max-w-[300px] aspect-video mb-6 rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-slate-700">
            <img src={imageUrl} alt={question} className="w-full h-full object-cover" />
          </div>
        )}
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center">{question}</h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {options.map((option, idx) => {
          const isCorrect = option === correctAnswer;
          const isSelected = selected === option;
          
          return (
            <Button
              key={idx}
              variant="outline"
              onClick={() => handleSelect(option)}
              className={cn(
                "h-auto py-6 px-8 text-lg font-medium rounded-2xl border-2 transition-all duration-300 flex justify-between items-center bg-card",
                !selected && "hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/20",
                isSelected && isCorrect && "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-700 dark:text-emerald-400",
                isSelected && !isCorrect && "bg-red-50 dark:bg-red-950/30 border-red-500 text-red-700 dark:text-red-400",
                selected && isCorrect && !isSelected && "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-700 dark:text-emerald-400 opacity-50"
              )}
              disabled={isLocked}
            >
              <span>{option}</span>
              {isSelected && isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
              {isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500" />}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default MultipleChoice;