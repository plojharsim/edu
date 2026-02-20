"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  topic: string;
  count: number;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
}

const CategoryCard = ({ title, topic, count, icon: Icon, color, onClick }: CategoryCardProps) => {
  return (
    <Card 
      onClick={onClick}
      className="group cursor-pointer p-6 rounded-[2.5rem] border-none bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center space-x-4 mb-4">
          <div className={cn("p-3 rounded-2xl transition-transform group-hover:scale-110", color)}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 leading-tight">{title}</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{count} položek</p>
          </div>
        </div>
        <div className="mt-auto">
          <span className="text-xs font-medium text-slate-400 block mb-1">Aktuální téma:</span>
          <p className="text-slate-700 font-bold text-sm line-clamp-1">{topic}</p>
        </div>
      </div>
    </Card>
  );
};

export default CategoryCard;