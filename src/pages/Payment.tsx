"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditCard, ShieldCheck, Zap, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from '@/components/AuthProvider';
import { dbService } from '@/services/dbService';
import { showSuccess, showError } from '@/utils/toast';

const Payment = () => {
  const navigate = useNavigate();
  const { user, refreshPaymentStatus } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!user) return;
    setIsProcessing(true);
    
    // Zde by normálně byla integrace se Stripe/GoPay atd.
    // Pro náš případ simulujeme úspěšnou platbu.
    setTimeout(async () => {
      const { error } = await dbService.markAsPaid(user.id);
      if (error) {
        showError("Nepodařilo se aktivovat licenci.");
        setIsProcessing(false);
      } else {
        await refreshPaymentStatus();
        showSuccess("Licence aktivována! Vítej v prémiové verzi.");
        navigate('/onboarding');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-[120px] -z-10" />

      <Card className="w-full max-w-xl p-8 md:p-12 rounded-[3rem] border-border shadow-2xl bg-card relative">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-600 rounded-3xl shadow-lg mb-6">
            <CreditCard className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black text-foreground mb-4 leading-tight">Získej doživotní přístup</h1>
          <p className="text-muted-foreground text-lg">
            Žádné předplatné. Žádné skryté poplatky. <br />
            Zaplať jednou a uč se navždy.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] p-8 border-2 border-indigo-100 dark:border-indigo-900/30 mb-8">
          <div className="flex items-baseline justify-center gap-2 mb-6">
            <span className="text-5xl font-black text-foreground">480</span>
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">Kč</span>
            <span className="text-muted-foreground font-bold uppercase tracking-widest text-xs">/ Navždy</span>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>Neomezený přístup ke všem tématům</span>
            </li>
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>AI generátor studijních sad (přes tvůj klíč)</span>
            </li>
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>Cloudová synchronizace a statistiky</span>
            </li>
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>Budoucí aktualizace v ceně</span>
            </li>
          </ul>

          <Button 
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full h-16 text-xl font-black rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-200 dark:shadow-none transition-all hover:scale-[1.02]"
          >
            {isProcessing ? (
              <><Loader2 className="w-6 h-6 animate-spin mr-2" /> Zpracovávám...</>
            ) : (
              'Koupit plnou verzi'
            )}
          </Button>
        </div>

        <div className="flex items-center justify-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Bezpečná platba</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Okamžitá aktivace</span>
          </div>
        </div>
      </Card>

      <Button 
        variant="ghost" 
        onClick={() => navigate('/')}
        className="mt-8 text-muted-foreground font-bold hover:text-foreground"
      >
        Zpět na úvod
      </Button>
    </div>
  );
};

export default Payment;