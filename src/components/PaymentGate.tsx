"use client";

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Gift, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

interface PaymentGateProps {
  onSuccess: () => void;
}

const VALID_GIFT_CODES = ["EDU-GIFT-2024", "PLOHAR-SPECIAL", "FREE-EDU-TEST"];

const PaymentGate = ({ onSuccess }: PaymentGateProps) => {
  const [method, setMethod] = useState<'card' | 'gift' | null>(null);
  const [giftCode, setGiftCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGiftCodeSubmit = () => {
    if (!giftCode.trim()) return;
    
    setIsLoading(true);
    // Simulace ověření
    setTimeout(() => {
      if (VALID_GIFT_CODES.includes(giftCode.toUpperCase())) {
        showSuccess("Kód byl úspěšně uplatněn!");
        onSuccess();
      } else {
        showError("Neplatný dárkový kód.");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-foreground mb-2">Před registrací je nutná platba</h2>
        <p className="text-muted-foreground text-sm">Edu je placená aplikace. Jednorázová platba 120 Kč ti odemkne přístup navždy.</p>
      </div>

      {!method ? (
        <div className="grid grid-cols-1 gap-4">
          <Button 
            disabled 
            variant="outline" 
            className="h-20 rounded-2xl border-2 flex items-center justify-between px-6 opacity-60 grayscale cursor-not-allowed group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-muted rounded-xl">
                <CreditCard className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="text-left">
                <span className="block font-bold">Platba kartou</span>
                <span className="text-[10px] uppercase font-black text-amber-500">Dočasně nedostupné</span>
              </div>
            </div>
            <span className="text-lg font-black text-muted-foreground">120 Kč</span>
          </Button>

          <Button 
            variant="outline" 
            onClick={() => setMethod('gift')}
            className="h-20 rounded-2xl border-2 border-indigo-100 dark:border-indigo-900/30 flex items-center justify-between px-6 hover:border-indigo-500 transition-all bg-card"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl">
                <Gift className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-left">
                <span className="block font-bold">Dárkový kód</span>
                <span className="text-[10px] uppercase font-black text-indigo-400">Mám kód od učitele/kamaráda</span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-indigo-500" />
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <button 
              onClick={() => setMethod(null)}
              className="text-xs font-bold text-indigo-500 hover:underline"
            >
              ← Změnit metodu
            </button>
          </div>

          <div className="space-y-3">
            <Input 
              value={giftCode}
              onChange={(e) => setGiftCode(e.target.value)}
              placeholder="Vlož kód (např. EDU-GIFT-2024)"
              className="h-14 rounded-2xl border-2 border-border bg-background font-bold text-center tracking-widest"
              autoFocus
            />
            <Button 
              onClick={handleGiftCodeSubmit}
              disabled={isLoading || !giftCode.trim()}
              className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg gap-2 shadow-lg shadow-indigo-200 dark:shadow-none"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
              Uplatnit kód a pokračovat
            </Button>
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-border">
        <p className="text-[10px] text-center text-muted-foreground font-bold uppercase tracking-widest">
          Bezpečné zpracování přístupu
        </p>
      </div>
    </div>
  );
};

export default PaymentGate;