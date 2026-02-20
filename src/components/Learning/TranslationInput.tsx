"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/utils/toast";

interface TranslationInputProps {
  term: string;
  correctTranslation: string;
  onNext: () => void;
}

const TranslationInput = ({ term, correctTranslation, onNext }: TranslationInputProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === correctTranslation.toLowerCase()) {
      showSuccess("Skvěle! To je správně.");
      onNext();
      setValue("");
    } else {
      showError(`Chyba. Správná odpověď je: ${correctTranslation}`);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-card rounded-[2rem] shadow-xl border-4 border-amber-50 dark:border-amber-900/20">
      <div className="text-center mb-8">
        <span className="text-sm font-bold text-amber-500 dark:text-amber-400 uppercase tracking-widest">Doplň odpověď</span>
        <h3 className="text-3xl font-black text-slate-800 dark:text-slate-100 mt-2 leading-tight">{term}</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Napiš odpověď..."
          className="h-14 text-lg rounded-xl border-2 border-slate-100 dark:border-slate-800 focus:border-amber-400 focus:ring-amber-400 bg-background"
          autoFocus
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