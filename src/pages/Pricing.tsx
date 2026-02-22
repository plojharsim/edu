"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Sparkles, Zap, ShieldCheck, Crown, Loader2, ChevronLeft } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { useAuth } from '@/components/AuthProvider';
import { dbService } from '@/services/dbService';

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    // Zde by normálně byl Stripe Checkout, pro demo simulujeme platbu
    setTimeout(async () => {
      const { error } = await dbService.activatePremium(user.id);
      if (error) {
        showError("Platba se nezdařila. Zkuste to prosím znovu.");
      } else {
        showSuccess("Gratulujeme! Nyní máte Edu Premium.");
        navigate('/app');
      }
      setLoading(false);
    }, 1500);
  };

  const features = [
    "Neomezený počet vlastních témat",
    "AI generování studijních sad",
    "Všechny studijní režimy (vč. Rozřazování)",
    "Synchronizace napříč zařízeními",
    "Žádné měsíční poplatky - platíš jen jednou",
    "Podpora dalšího vývoje aplikace"
  ];

  return (
    <div className="min-h-screen bg-background p-6 pt-24 md:pt-12 flex flex-col items-center justify-center">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="absolute top-24 md:top-12 left-8 rounded-2xl hover:bg-card"
      >
        <ChevronLeft className="mr-2 w-5 h-5" /> Zpět
      </Button>

      <div className="text-center mb-12 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30 mb-6">
          <Crown className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Edu Premium</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">Investuj do svého vzdělání</h1>
        <p className="text-lg text-muted-foreground">Odemkni plný potenciál aplikace Edu s jednorázovým poplatkem. Žádné předplatné, žádné skryté náklady.</p>
      </div>

      <Card className="w-full max-w-lg p-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-amber-500 rounded-[3rem] shadow-2xl">
        <div className="bg-card rounded-[2.9rem] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles className="w-32 h-32 text-indigo-500" />
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-2xl font-black text-foreground">Doživotní přístup</h3>
                <p className="text-muted-foreground">Navždy tvůj účet bez omezení</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400">249 Kč</div>
                <div className="text-xs font-bold text-muted-foreground uppercase">Jednorázově</div>
              </div>
            </div>

            <div className="space-y-4 mb-10">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-emerald-500/10 rounded-full p-1">
                    <Check className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              onClick={handlePurchase}
              disabled={loading}
              className="w-full h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xl gap-3 shadow-xl shadow-indigo-200 dark:shadow-none transition-all hover:scale-[1.02]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" /> Zpracovávám...
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6 fill-white" /> Aktivovat Premium
                </>
              )}
            </Button>

            <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Bezpečná platba kartou</span>
            </div>
          </div>
        </div>
      </Card>

      <p className="mt-12 text-sm text-muted-foreground font-medium">
        Máte dotazy k platbě? Napište nám na <a href="mailto:podpora@plojharsim.cz" className="text-indigo-600 font-bold hover:underline">podpora@plojharsim.cz</a>
      </p>
    </div>
  );
};

export default Pricing;