"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  count: number;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
}

const CategoryCard = ({ title, count, icon: Icon, color, onClick }: CategoryCardProps) => {
  return (
    <Card 
      onClick={onClick}
      className="group cursor-pointer p-6 rounded-[2.5rem] border-none bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:border dark:border-slate-800"
    >
      <div className="flex items-center space-x-4">
        <div className={cn("p-4 rounded-3xl transition-transform group-hover:scale-110", color)}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium">{count} položek</p>
        </div>
      </div>
    </Card>
  );
};

export default CategoryCard;