"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message = "Načítám tvůj pokrok..." }: LoadingScreenProps) => {
  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full animate-pulse" />
        <div className="relative">
          <img 
            src="/logo.png" 
            alt="Edu Logo Loader" 
            className="w-28 h-28 shadow-2xl object-contain"
          />
        </div>
        <Loader2 className="absolute -bottom-2 -right-2 w-8 h-8 text-indigo-500 animate-spin bg-background rounded-full p-0.5" />
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-xl font-black text-foreground tracking-tight">{message}</h3>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] animate-pulse">
          Edu | by plojharsim
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;