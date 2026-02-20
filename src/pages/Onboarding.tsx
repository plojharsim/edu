"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sparkles, GraduationCap, User } from "lucide-react";
import { showSuccess } from "@/utils/toast";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    grade: ''
  });

  const handleNext = () => {
    if (step === 1 && !formData.name) return;
    if (step === 2 && !formData.grade) return;
    
    if (step < 2) {
      setStep(step + 1);
    } else {
      localStorage.setItem('user_profile', JSON.stringify({ ...formData, completed: true }));
      showSuccess(`Vítej v aplikaci, ${formData.name}!`);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] flex items-center justify-center p-6">
      <Card className="w-full max-w-lg p-10 rounded-[3rem] border-none shadow-2xl bg-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50" />
        
        <div className="relative z-10">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-indigo-600 rounded-3xl shadow-lg shadow-indigo-200">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>

          {step === 1 ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <h1 className="text-3xl font-black text-slate-800 mb-2">Ahoj! Jak ti máme říkat?</h1>
                <p className="text-slate-500">Tvoje jméno budeme používat pro personalizaci tvého studia.</p>
              </div>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Tvoje jméno"
                  className="h-14 pl-12 text-lg rounded-2xl border-2 border-slate-100 focus:border-indigo-400 focus:ring-indigo-400"
                  autoFocus
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center">
                <h1 className="text-3xl font-black text-slate-800 mb-2">V jaké jsi třídě?</h1>
                <p className="text-slate-500">Pomůže nám to lépe přizpůsobit obsah tvým potřebám.</p>
              </div>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input 
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  placeholder="Např. 8.B nebo 2. ročník SŠ"
                  className="h-14 pl-12 text-lg rounded-2xl border-2 border-slate-100 focus:border-indigo-400 focus:ring-indigo-400"
                />
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-col gap-4">
            <Button 
              onClick={handleNext}
              className="h-14 text-lg font-bold rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"
            >
              {step === 1 ? 'Pokračovat' : 'Začít se učit'}
            </Button>
            <div className="flex justify-center gap-2">
              <div className={`w-2 h-2 rounded-full transition-colors ${step === 1 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
              <div className={`w-2 h-2 rounded-full transition-colors ${step === 2 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Onboarding;