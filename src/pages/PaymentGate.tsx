"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CreditCard, Gift, Sparkles, Loader2, CheckCircle, ShieldCheck } from "lucide-react";
import { useAuth } from '@/components/AuthProvider';
import { dbService } from '@/services/dbService';
import { showError, showSuccess } from '@/utils/toast';

const PaymentGate = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [giftCode, setGiftCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'gift'>('card');

  const handleClaimCode = async () => {
    if (!user || !giftCode.trim()) return;
    
    setIsLoading(true);
    try {
      await dbService.claimGiftCode(user.id, giftCode.trim());
      showSuccess("Aktivace proběhla úspěšně! Vítej v plné verzi.");
      navigate('/onboarding'); // Po zaplacení jdeme na onboarding
    } catch (e: any) {
      showError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Dekorace pozadí */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/5 rounded-full blur-[100px]" />

      <Card className="w-full max-w-xl p-8 md:p-12 rounded-[3.5rem] border-border shadow-2xl bg-card relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-600 rounded-3xl shadow-lg shadow-indigo-200 dark:shadow-none mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black text-foreground mb-4 tracking-tight">Poslední krok</h1>
          <p className="text-muted-foreground text-lg font-medium max-w-md mx-auto">
            Edu je prémiová aplikace bez reklam a předplatného. Pro přístup k učení zbývá uhradit jednorázový poplatek.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div 
            onClick={() => setPaymentMethod('card')}
            className={`p-6 rounded-[2rem] border-2 transition-all cursor-not-allowed relative group ${
              paymentMethod === 'card' ? 'border-indigo-200 bg-slate-50 dark:bg-slate-900/40 opacity-50' : 'border-border opacity-30'
            }`}
          >
            <CreditCard className="w-8 h-8 text-slate-400 mb-4" />
            <h3 className="font-bold text-slate-500">Platba kartou</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Již brzy</p>
          </div>

          <div 
            onClick={() => setPaymentMethod('gift')}
            className={`p-6 rounded-[2rem] border-2 transition-all cursor-pointer relative group ${
              paymentMethod === 'gift' ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/20' : 'border-border hover:border-indigo-300'
            }`}
          >
            <Gift className="w-8 h-8 text-indigo-600 mb-4" />
            <h3 className="font-bold text-foreground">Dárkový kód</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mt-1">Aktivní</p>
            {paymentMethod === 'gift' && (
              <CheckCircle className="absolute top-4 right-4 w-5 h-5 text-indigo-600" />
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white flex items-center justify-between shadow-xl shadow-indigo-100 dark:shadow-none">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Jednorázová cena</p>
              <h2 className="text-4xl font-black">480 Kč</h2>
            </div>
            <ShieldCheck className="w-12 h-12 opacity-20" />
          </div>

          {paymentMethod === 'gift' ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Input 
                value={giftCode}
                onChange={(e) => setGiftCode(e.target.value.toUpperCase())}
                placeholder="Vlož dárkový kód (např. EDU-PRO-XXXX)"
                className="h-16 text-center text-xl font-mono tracking-widest rounded-2xl border-2 border-border focus:border-indigo-500 bg-background"
              />
              <Button 
                onClick={handleClaimCode}
                disabled={isLoading || !giftCode.trim()}
                className="w-full h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xl gap-3 shadow-lg shadow-indigo-200 dark:shadow-none"
              >
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <CheckCircle className="w-6 h-6" />}
                Aktivovat aplikaci
              </Button>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Button 
                disabled
                className="w-full h-16 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-400 font-black text-xl cursor-not-allowed"
              >
                Platba kartou dočasně nedostupná
              </Button>
            </div>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col items-center gap-4">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Změnil jsi názor?</p>
          <Button 
            variant="ghost" 
            onClick={() => signOut()}
            className="text-red-500 font-bold hover:text-red-600 hover:bg-red-50"
          >
            Odhlásit se a odejít
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PaymentGate;