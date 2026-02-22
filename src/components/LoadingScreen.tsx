"use client";

import React from 'react';
import { Sparkles, Loader2 } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message = "Načítám tvá data..." }: LoadingScreenProps) => {
  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
      <div className="relative mb-8">
        <div className="p-6 bg-indigo-600 rounded-[2.5rem] shadow-2xl shadow-indigo-200 dark:shadow-none animate-bounce">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <div className="absolute -bottom-2 -right-2 p-2 bg-card rounded-xl border border-border shadow-sm">
          <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
        </div>
      </div>
      
      <h2 className="text-2xl font-black text-foreground mb-2">{message}</h2>
      <p className="text-muted-foreground font-medium max-w-xs">
        Chvilku strpení, připravujeme vše pro tvé studium.
      </p>
      
      {/* Dekorativní prvky na pozadí */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px] -z-10" />
    </div>
  );
};

export default LoadingScreen;