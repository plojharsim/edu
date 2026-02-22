"use client";

import React from 'react';
import { Sparkles } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="relative">
        {/* Outer pulse rings */}
        <div className="absolute inset-0 rounded-3xl bg-indigo-500/20 animate-ping duration-[2000ms]" />
        <div className="absolute inset-0 rounded-3xl bg-indigo-500/10 animate-pulse duration-[1500ms]" />
        
        {/* Main Logo Icon */}
        <div className="relative p-6 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-200 dark:shadow-none">
          <Sparkles className="w-12 h-12 text-white animate-pulse" />
        </div>
      </div>
      
      <div className="mt-8 text-center space-y-2">
        <h2 className="text-2xl font-black text-foreground tracking-tighter">Edu | by plojharsim</h2>
        <div className="flex justify-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]" />
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]" />
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;