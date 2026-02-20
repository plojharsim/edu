"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Languages, Microscope, History, Music, Sparkles, TrendingUp, LogOut } from 'lucide-react';
import CategoryCard from '@/components/Dashboard/CategoryCard';
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: 'Studente', grade: '' });

  useEffect(() => {
    const profile = localStorage.getItem('user_profile');
    if (profile) {
      setUser(JSON.parse(profile));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_profile');
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] p-6 pb-20">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto pt-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-indigo-500 fill-indigo-500" />
            <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs">
              Vítej zpět, {user.name}! {user.grade && `(${user.grade})`}
            </span>
          </div>
          <h1 className="text-5xl font-black text-slate-800 leading-tight">
            Co se dnes <br />
            <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">naučíme?</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm flex items-center gap-6 border-2 border-white">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-indigo-600">12</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Dní v řadě</span>
            </div>
            <div className="w-[1px] h-10 bg-slate-100" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-emerald-500">84%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Průměr</span>
            </div>
            <TrendingUp className="w-8 h-8 text-slate-200" />
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout}
            className="rounded-2xl h-14 w-14 bg-white shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"
            title="Resetovat profil"
          >
            <LogOut className="w-6 h-6" />
          </Button>
        </div>
      </header>

      {/* Main Categories */}
      <main className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl font-black text-slate-800 mb-6">Tvoje studijní sady</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CategoryCard 
              title="Angličtina" 
              topic="Ovoce a dům"
              count={124} 
              icon={Languages} 
              color="bg-indigo-500" 
              onClick={() => navigate('/study/english')}
            />
            <CategoryCard 
              title="Biologie" 
              topic="Buňka a fotosyntéza"
              count={45} 
              icon={Microscope} 
              color="bg-emerald-500" 
              onClick={() => navigate('/study/biology')}
            />
            <CategoryCard 
              title="Dějepis" 
              topic="Lucemburkové v Čechách"
              count={82} 
              icon={History} 
              color="bg-amber-500" 
              onClick={() => navigate('/study/history')}
            />
            <CategoryCard 
              title="Hudební nauka" 
              topic="Základy notopisu"
              count={30} 
              icon={Music} 
              color="bg-rose-500" 
              onClick={() => navigate('/study/music')}
            />
          </div>
        </div>

        {/* Quick Progress/Recent Activity */}
        <div className="bg-indigo-600 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <h3 className="text-3xl font-bold mb-4">Dnešní výzva</h3>
              <p className="text-indigo-100 text-lg mb-8 opacity-90">Zopakuj si 20 slovíček z biologie a získej odznak "Přírodovědec".</p>
              <button className="bg-white text-indigo-600 font-black px-10 py-4 rounded-2xl hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-800/20">
                Spustit výzvu
              </button>
            </div>
            <div className="w-48 h-48 bg-indigo-500/30 rounded-full flex items-center justify-center border-4 border-white/20">
              <Sparkles className="w-24 h-24 text-white opacity-40" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;