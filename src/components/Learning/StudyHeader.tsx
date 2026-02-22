"use client";

import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { X, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StudyHeaderProps {
  current: number;
  total: number;
  title: string;
  time: number;
}

const StudyHeader = ({ current, total, title, time }: StudyHeaderProps) => {
  const navigate = useNavigate();
  const progress = (current / total) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 px-4">
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/app')}
          className="rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </Button>
        <div className="text-center">
          <h2 className="text-lg font-bold text-slate-700 dark:text-slate-200">{title}</h2>
          <p className="text-xs font-black text-indigo-500 uppercase tracking-widest">{current} z {total}</p>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
          <Timer className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-mono font-bold text-slate-600 dark:text-slate-300">{formatTime(time)}</span>
        </div>
      </div>
      <Progress value={progress} className="h-3 rounded-full bg-slate-100 dark:bg-slate-800" />
    </div>
  );
};

export default StudyHeader;