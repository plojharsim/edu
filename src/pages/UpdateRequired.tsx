"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { Download, AlertTriangle, ShieldAlert } from "lucide-react";
import { APP_VERSION } from '@/utils/version';

const UpdateRequired = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center">
      <Card className="w-full max-w-md p-10 rounded-[3rem] border-2 border-red-100 dark:border-red-950/30 bg-card shadow-2xl relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="p-5 bg-red-600 rounded-3xl shadow-lg shadow-red-200 dark:shadow-none mb-8">
            <ShieldAlert className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-3xl font-black text-foreground mb-4">Verze aplikace nesouhlasí</h1>
          <p className="text-muted-foreground mb-8">
            Používáš zastaralou nebo nepodporovanou verzi aplikace (<span className="font-bold text-red-500">{APP_VERSION}</span>). 
            Pro pokračování v učení je nutné aplikaci aktualizovat.
          </p>

          <div className="w-full p-4 bg-muted/50 rounded-2xl border border-border flex items-center gap-4 mb-8">
            <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
            <p className="text-[10px] font-bold text-left uppercase tracking-wider text-muted-foreground">
              Tvůj studijní pokrok je v bezpečí v cloudu, ale pro přístup k němu potřebuješ nejnovější verzi aplikace.
            </p>
          </div>

          <a 
            href="/" 
            className="w-full h-14 flex items-center justify-center rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg gap-3 transition-transform hover:scale-105"
            onClick={() => window.location.reload()}
          >
            <Download className="w-5 h-5" /> Zkontrolovat znovu
          </a>
        </div>
      </Card>
    </div>
  );
};

export default UpdateRequired;