"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { Sparkles, TrendingUp, Edit3, Heart, Home } from 'lucide-react';
import CategoryCard from '@/components/Dashboard/CategoryCard';
import BadgesSection from '@/components/Dashboard/BadgesSection';
import { Button } from "@/components/ui/button";
import { PREDEFINED_DATA, Category } from '@/data/studyData';
import SettingsDialog from '@/components/Dashboard/SettingsDialog';
import { useAuth } from '@/components/AuthProvider';
import { dbService } from '@/services/dbService';
import LoadingScreen from '@/components/LoadingScreen';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState({ name: 'Studente', grade: '' });
  const [stats, setStats] = useState({ streak: 0, average: 0, sessions: 0, perfectSessions: 0 });
  const [studyData, setStudyData] = useState<Record<string, Category>>(PREDEFINED_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Načíst profil
        const userProfile = await dbService.getProfile(user.id);
        if (userProfile) {
          setProfile({ name: userProfile.name || 'Studente', grade: userProfile.grade || '' });
        } else {
          navigate('/onboarding');
          return;
        }

        // 2. Načíst statistiky
        const userStats = await dbService.getStats(user.id);
        if (userStats) {
          setStats({
            streak: userStats.streak || 0,
            average: Math.round(userStats.average || 0),
            sessions: userStats.sessions || 0,
            perfectSessions: userStats.perfect_sessions || 0
          });
        }

        // 3. Načíst témata
        const userTopics = await dbService.getUserTopics(user.id);
        const data = { ...PREDEFINED_DATA };
        if (userTopics.length > 0) {
          data['custom'] = {
            id: 'custom',
            title: 'Vlastní',
            iconName: 'BookText',
            color: 'bg-indigo-600',
            isCustom: true,
            topics: userTopics
          };
        }
        setStudyData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const customTopicsCount = useMemo(() => {
    return studyData['custom']?.topics.length || 0;
  }, [studyData]);

  const dailyChallenge = useMemo(() => {
    const allTopics = Object.values(studyData).flatMap(cat => 
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
      mode: modes[modeIndex] as any
    };
  }, [studyData]);

  const getIcon = (iconName: string = 'BookText') => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.BookText;
    return Icon;
  };

  if (loading) return <LoadingScreen message="Sestavuji tvou nástěnku..." />;

  return (
    <div className="min-h-screen bg-background p-6 pb-20 transition-colors duration-300 flex flex-col">
      <header className="max-w-6xl mx-auto pt-6 md:pt-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 w-full">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-indigo-500 fill-indigo-500" />
            <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest text-xs">
              Vítej zpět, {profile.name}! {profile.grade && `(${profile.grade})`}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
            Co se dnes <br />
            <span className="text-indigo-600 dark:text-indigo-400 underline decoration-indigo-200 dark:decoration-indigo-900 underline-offset-8">naučíme?</span>
          </h1>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="bg-card p-6 rounded-[2rem] shadow-sm flex items-center gap-6 border-2 border-border">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{stats.streak}</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Dní v řadě</span>
            </div>
            <div className="w-[1px] h-10 bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-emerald-500">{stats.average}%</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Průměr</span>
            </div>
            <TrendingUp className="w-8 h-8 text-indigo-500/20 dark:text-indigo-400/20" />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
              className="group rounded-2xl h-12 w-12 bg-card shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-border"
              title="Domů"
            >
              <Home className="w-6 h-6 text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/app/edit')}
              className="group rounded-2xl h-12 w-12 bg-card shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-border"
              title="Editor témat"
            >
              <Edit3 className="w-6 h-6 text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            </Button>
            
            <SettingsDialog />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto flex-1 w-full space-y-16">
        <div>
          <h2 className="text-2xl font-black text-foreground mb-6 text-center md:text-left">Tvoje studijní sady</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center md:justify-items-stretch">
            {Object.values(studyData).map((cat) => (
              <div key={cat.id} className="w-full max-w-sm md:max-w-none">
                <CategoryCard 
                  title={cat.title} 
                  count={cat.topics.reduce((acc, t) => acc + t.items.length, 0)} 
                  icon={getIcon(cat.iconName)} 
                  color={cat.color || 'bg-slate-500'} 
                  onClick={() => navigate(`/app/study/${cat.id}`)}
                />
              </div>
            ))}
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
                  onClick={() => navigate(`/app/study/${dailyChallenge.categoryId}/${dailyChallenge.topicId}?mode=${dailyChallenge.mode}`)}
                  className="bg-white text-indigo-600 dark:text-indigo-700 font-black px-10 py-4 rounded-2xl hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-800/20 mx-auto md:mx-0 block"
                >
                  Spustit výzvu
                </button>
              </div>
              <div className="w-48 h-48 bg-indigo-500/30 rounded-full flex items-center justify-center border-4 border-white/20">
                <LucideIcons.Sparkles className="w-24 h-24 text-white opacity-40" />
              </div>
            </div>
          </div>
        )}

        <BadgesSection stats={{ ...stats, customTopicsCount }} />
      </main>

      <footer className="mt-auto pt-10 text-center">
        <p className="text-muted-foreground text-sm font-medium flex items-center justify-center gap-1">
          Vytvořeno s <Heart className="w-3 h-3 text-red-400 fill-red-400" /> by <a href="https://plojharsim.cz" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">plojharsim</a>
        </p>
      </footer>
    </div>
  );
};

export default Index;