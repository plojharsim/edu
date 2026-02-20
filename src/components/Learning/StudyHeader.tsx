"use client";

import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StudyHeaderProps {
  progress: number;
  title: string;
}

const StudyHeader = ({ progress, title }: StudyHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 px-4">
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/')}
          className="rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </Button>
        <h2 className="text-lg font-bold text-slate-700">{title}</h2>
        <div className="w-10" /> {/* Spacer */}
      </div>
      <Progress value={progress} className="h-3 rounded-full bg-slate-100" />
    </div>
  );
};

export default StudyHeader;