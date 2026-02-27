"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, RotateCcw, Home, AlertCircle, ArrowRight } from "lucide-react";
import { StudyItem } from "@/data/studyData";

interface StudyResultsProps {
  total: number;
  correct: number;
  incorrect: number;
  mistakes: StudyItem[];
  onRetry: () => void;
  onHome: () => void;
}

const StudyResults = ({ total, correct, incorrect, mistakes, onRetry, onHome }: StudyResultsProps) => {
  const percentage = Math.round((correct / total) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-indigo-50 dark:bg-indigo-950/30 border-4 border-indigo-500 mb-6">
          <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400">{percentage}%</span>
        </div>
        <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100">Skvělý výkon!</h2>
        <p className="text-slate-500 dark:text-slate-400">Dokončil jsi svou studijní relaci.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="p-6 flex flex-col items-center border-none bg-emerald-50 dark:bg-emerald-950/20 rounded-[2rem]">
          <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-2" />
          <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">{correct}</span>
          <span className="text-xs font-bold uppercase text-emerald-600/60 dark:text-emerald-400/60">Správně</span>
        </Card>
        <Card className="p-6 flex flex-col items-center border-none bg-red-50 dark:bg-red-950/20 rounded-[2rem]">
          <XCircle className="w-8 h-8 text-red-500 mb-2" />
          <span className="text-2xl font-black text-red-700 dark:text-red-400">{incorrect}</span>
          <span className="text-xs font-bold uppercase text-red-600/60 dark:text-red-400/60">Chybně</span>
        </Card>
      </div>

      {mistakes.length > 0 && (
        <div className="mb-10">
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            Položky k procvičení
          </h3>
          <div className="space-y-3">
            {mistakes.map((item, idx) => (
              <div key={`${item.term}-${idx}`} className="p-4 bg-card border-2 border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-between gap-4 overflow-hidden">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex-1 min-w-0 break-words leading-tight">
                  {item.term}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />
                <span className="text-indigo-600 dark:text-indigo-400 font-medium flex-1 min-w-0 text-right break-words leading-tight">
                  {item.definition}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={onRetry}
          variant="outline"
          className="flex-1 h-14 rounded-2xl border-2 border-indigo-100 dark:border-indigo-900/30 font-bold text-lg gap-2"
        >
          <RotateCcw className="w-5 h-5" /> Zkusit znovu
        </Button>
        <Button 
          onClick={onHome}
          className="flex-1 h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg gap-2 shadow-lg shadow-indigo-200 dark:shadow-none"
        >
          <Home className="w-5 h-5" /> Domů
        </Button>
      </div>
    </div>
  );
};

export default StudyResults;