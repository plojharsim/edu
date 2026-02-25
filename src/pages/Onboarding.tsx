"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Sparkles, GraduationCap, User } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { useAuth } from '@/components/AuthProvider';
import { dbService } from '@/services/dbService';

const Onboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    grade: ''
  });

  const handleNext = async () => {
    if (step === 1 && !formData.name) return;
    if (step === 2 && !formData.grade) return;
    
    if (step < 2) {
      setStep(step + 1);
    } else {
      if (!user) return;
      
      const { error } = await dbService.updateProfile(user.id, formData.name, formData.grade);
      
      if (error) {
        showError("Nepodařilo se uložit profil.");
        return;
      }

      showSuccess(`Vítej v aplikaci, ${formData.name}!`);
      navigate('/app');
    }
  };

  const GRADE_OPTIONS = [
    { value: "Předškolák", label: "Předškolák" },
    ...Array.from({ length: 9 }, (_, i) => ({ value: `${i + 1}. třída ZŠ`, label: `${i + 1}. třída ZŠ` })),
    ...Array.from({ length: 4 }, (_, i) => ({ value: `${i + 1}. ročník SŠ`, label: `${i + 1}. ročník SŠ` })),
    { value: "Vysoká škola", label: "Vysoká škola" },
    { value: "Dospělý", label: "Dospělý" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 pt-6 md:pt-6">
      <Card className="w-full max-w-lg p-10 rounded-[3rem] border-border shadow-2xl bg-card relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl opacity-50" />
        
        <div className="relative z-10">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-indigo-600 rounded-3xl shadow-lg shadow-indigo-200 dark:shadow-none">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>

          {step === 1 ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <h1 className="text-3xl font-black text-foreground mb-2">Ahoj! Jak ti máme říkat?</h1>
                <p className="text-muted-foreground">Tvoje jméno budeme používat pro personalizaci tvého studia.</p>
              </div>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Tvoje jméno"
                  className="h-14 pl-12 text-lg rounded-2xl border-2 border-border focus:border-indigo-400 focus:ring-indigo-400 bg-background"
                  autoFocus
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center">
                <h1 className="text-3xl font-black text-foreground mb-2">Co právě studuješ?</h1>
                <p className="text-muted-foreground">Pomůže nám to lépe přizpůsobit obsah tvým potřebám.</p>
              </div>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 z-20 pointer-events-none" />
                <Select 
                  value={formData.grade} 
                  onValueChange={(val) => setFormData({ ...formData, grade: val })}
                >
                  <SelectTrigger className="h-14 pl-12 text-lg rounded-2xl border-2 border-border focus:border-indigo-400 focus:ring-indigo-400 bg-background">
                    <SelectValue placeholder="Vyber svou úroveň..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-border bg-card max-h-[300px]">
                    {GRADE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value} className="rounded-xl">
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-col gap-4">
            <Button 
              onClick={handleNext}
              disabled={step === 1 ? !formData.name : !formData.grade}
              className="h-14 text-lg font-bold rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
            >
              {step === 1 ? 'Pokračovat' : 'Začít se učit'}
            </Button>
            <div className="flex justify-center gap-2">
              <div className={`w-2 h-2 rounded-full transition-colors ${step === 1 ? 'bg-indigo-600' : 'bg-muted'}`} />
              <div className={`w-2 h-2 rounded-full transition-colors ${step === 2 ? 'bg-indigo-600' : 'bg-muted'}`} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Onboarding;