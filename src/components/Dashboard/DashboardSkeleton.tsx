"use client";

import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto w-full space-y-12 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <Skeleton className="h-4 w-48 rounded-full" />
          <Skeleton className="h-16 w-64 md:w-96 rounded-2xl" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-24 w-64 rounded-[2rem]" />
          <div className="flex gap-2">
            <Skeleton className="h-12 w-12 rounded-2xl" />
            <Skeleton className="h-12 w-12 rounded-2xl" />
            <Skeleton className="h-12 w-12 rounded-2xl" />
          </div>
        </div>
      </header>

      <div className="space-y-6">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-[2.5rem]" />
          ))}
        </div>
      </div>

      <Skeleton className="h-64 w-full rounded-[3rem]" />
    </div>
  );
};

export default DashboardSkeleton;