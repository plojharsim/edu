"use client";

import React from 'react';
import { Sparkles, GraduationCap } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message = "Připravuji aplikaci..." }: LoadingScreenProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Dekorativní prvky na pozadí */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex gap-3 mb-8 animate-bounce">
          <div className="p-4 bg-indigo-600 rounded-[1.5rem] shadow-xl shadow-indigo-200 dark:shadow-none">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-[1.5rem]">
            <GraduationCap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <h2 className="text-xl font-black text-foreground tracking-tight">Edu | by plojharsim</h2>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] animate-pulse">
            {message}
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-1">
        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" />
      </div>
    </div>
  );
};

export default LoadingScreen;