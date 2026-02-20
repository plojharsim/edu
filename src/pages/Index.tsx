"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Languages, Microscope, History, Music, Sparkles, TrendingUp, LogOut } from 'lucide-react';
import CategoryCard from '@/components/Dashboard/CategoryCard';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CATEGORY_DATA } from '@/data/studyData';

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: 'Studente', grade: '' });
  const [stats, setStats] = useState({ streak: 0, average: 0 });

  useEffect(() => {
    const profile = localStorage.getItem('user_profile');
    if (profile) {
      setUser(JSON.parse(profile));
    }

    const savedStats = localStorage.getItem('study_stats');
    if (savedStats) {
      const parsed = JSON.parse(savedStats);
      setStats({
        streak: parsed.streak || 0,
        average: Math.round(parsed.average || 0)
      });
    }
  }, []);

  const dailyChallenge = useMemo(() => {
    const allTopics = Object.values(CATEGORY_DATA).flatMap(cat => 
      cat.topics.map(topic => ({ 
        categoryId: cat.id, 
        topicId: topic.id, 
        topicName: topic.name,
        categoryName: cat.title 
      }))
    );

    if (allTopics.length === 0) return null;

    const now = new Date();
    const dateSeed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    const topicIndex = dateSeed % allTopics.length;
    
    const modes = ['flashcards', 'abcd', 'writing', 'matching'];
    const modeIndex = dateSeed % modes.length;
    
    return {
      ...allTopics[topicIndex],
      mode: modes[modeIndex]
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_profile');
    localStorage.removeItem('study_stats');
    navigate('/onboarding');
  };

  const getCategoryCount = (id: string) => {
    const category = CATEGORY_DATA[id];
    if (!category) return 0;
    return category.topics.reduce((acc, topic) => acc + topic.items.length, 0);
  };

  return (
    <div className="min-h-screen bg-background p-6 pb-20 transition-colors duration-300">
      <header className="max-w-6xl mx-auto pt-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-indigo-500 fill-indigo-500" />
            <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest text-xs">
              Vítej zpět, {user.name}! {user.grade && `(${user.grade})`}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 leading-tight">
            Co se dnes <br />
            <span className="text-indigo-600 dark:text-indigo-400 underline decoration-indigo-200 dark:decoration-indigo-900 underline-offset-8">naučíme?</span>
          </h1>
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <div className="bg-card p-6 rounded-[2rem] shadow-sm flex items-center gap-6 border-2 border-white dark:border-slate-800">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{stats.streak}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Dní v řadě</span>
            </div>
            <div className="w-[1px] h-10 bg-slate-100 dark:bg-slate-800" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-emerald-500">{stats.average}%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Průměr</span>
            </div>
            <TrendingUp className="w-8 h-8 text-slate-200 dark:text-slate-700" />
          </div>
          
          <div className="flex gap-2 w-full justify-center md:justify-end">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              className="rounded-2xl h-14 w-14 bg-white dark:bg-slate-900 shadow-sm hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-500 transition-colors"
              title="Resetovat profil"
            >
              <LogOut className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-6 text-center md:text-left">Tvoje studijní sady</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CategoryCard 
              title="Angličtina" 
              count={getCategoryCount('english')} 
              icon={Languages} 
              color="bg-indigo-500" 
              onClick={() => navigate('/study/english')}
            />
            <CategoryCard 
              title="Biologie" 
              count={getCategoryCount('biology')} 
              icon={Microscope} 
              color="bg-emerald-500" 
              onClick={() => navigate('/study/biology')}
            />
            <CategoryCard 
              title="Dějepis" 
              count={getCategoryCount('history')} 
              icon={History} 
              color="bg-amber-500" 
              onClick={() => navigate('/study/history')}
            />
            <CategoryCard 
              title="Hudební nauka" 
              count={getCategoryCount('music')} 
              icon={Music} 
              color="bg-rose-500" 
              onClick={() => navigate('/study/music')}
            />
          </div>
        </div>

        {dailyChallenge && (
          <div className="bg-indigo-600 dark:bg-indigo-700 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-200 dark:shadow-none">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="max-w-md">
                <h3 className="text-3xl font-bold mb-2">Dnešní výzva</h3>
                <p className="text-indigo-100 text-xl font-medium mb-2">
                  {dailyChallenge.categoryName}: <span className="text-white font-black">{dailyChallenge.topicName}</span>
                </p>
                <p className="text-indigo-100/80 text-sm mb-8">Zopakuj si toto téma pomocí režimu <span className="font-bold">{
                  dailyChallenge.mode === 'flashcards' ? 'Kartičky' : 
                  dailyChallenge.mode === 'abcd' ? 'Výběr' : 
                  dailyChallenge.mode === 'writing' ? 'Psaní' : 'Přiřazování'
                }</span>!</p>
                <button 
                  onClick={() => navigate(`/study/${dailyChallenge.categoryId}/${dailyChallenge.topicId}?mode=${dailyChallenge.mode}`)}
                  className="bg-white text-indigo-600 dark:text-indigo-700 font-black px-10 py-4 rounded-2xl hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-800/20 mx-auto md:mx-0 block"
                >
                  Spustit výzvu
                </button>
              </div>
              <div className="w-48 h-48 bg-indigo-500/30 rounded-full flex items-center justify-center border-4 border-white/20">
                <Sparkles className="w-24 h-24 text-white opacity-40" />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;