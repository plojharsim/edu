"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/utils/toast";

interface TranslationInputProps {
  term: string;
  imageUrl?: string;
  correctTranslation: string;
  onAnswer: (isCorrect: boolean) => void;
}

const TranslationInput = ({ term, imageUrl, correctTranslation, onAnswer }: TranslationInputProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = value.trim().toLowerCase() === correctTranslation.toLowerCase();
    
    if (isCorrect) {
      showSuccess("Skvěle! To je správně.");
    } else {
      showError(`Chyba. Správná odpověď byla: ${correctTranslation}`);
    }

    onAnswer(isCorrect);
    setValue("");
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-card rounded-[2rem] shadow-xl border-4 border-amber-50 dark:border-amber-900/20">
      <div className="text-center mb-8 flex flex-col items-center">
        <span className="text-sm font-bold text-amber-500 dark:text-amber-400 uppercase tracking-widest mb-4">Doplň odpověď</span>
        
        {imageUrl && (
          <div className="w-full aspect-video mb-4 rounded-xl overflow-hidden border border-border bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center">
            <img src={imageUrl} alt={term} className="max-w-full max-h-full object-contain p-1" />
          </div>
        )}

        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 leading-tight w-full break-words px-2">
          {term}
        </h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Napiš odpověď..."
          className="h-14 text-lg rounded-xl border-2 border-slate-100 dark:border-slate-800 focus:border-amber-400 focus:ring-amber-400 bg-background"
          autoFocus
          autoComplete="off"
        />
        <Button 
          type="submit" 
          className="w-full h-14 text-lg font-bold rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-200 dark:shadow-none"
        >
          Zkontrolovat
        </Button>
      </form>
    </div>
  );
};

export default TranslationInput;