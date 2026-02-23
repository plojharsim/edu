"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Sparkles, BookOpen, Layers, CheckSquare, 
  Keyboard, Zap, Trophy, Heart, ArrowRight,
  Github, Globe, CreditCard
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from '@/components/AuthProvider';

const Landing = () => {
  const navigate = useNavigate();
  const { session, hasPaid } = useAuth();

  const handleStart = () => {
    if (session) {
      if (hasPaid) navigate('/app');
      else navigate('/payment');
    } else {
      navigate('/login');
    }
  };

  const GITHUB_URL = "https://github.com/plojharsim/edu";

  return (
    <div className="min-h-screen bg-background transition-colors duration-500 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          <div 
            className="flex items-center gap-2 min-w-0 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => window.location.reload()}
          >
            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-base sm:text-xl font-black tracking-tighter text-foreground truncate">
              Edu <span className="hidden min-[400px]:inline">| by plojharsim</span>
            </span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <ThemeToggle />
            <Button 
              onClick={handleStart}
              className="rounded-2xl h-10 sm:h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 sm:px-6 shadow-md shadow-indigo-200 dark:shadow-none transition-all text-sm sm:text-base whitespace-nowrap"
            >
              {session ? 'Vstoupit' : 'Koupit za 480 Kč'}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <CreditCard className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Jednorázová platba 480 Kč - Bez předplatného</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-8 tracking-tight leading-[0.9] animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Prémiové učení, <br />
            <span className="text-indigo-600 dark:text-indigo-400">bez kompromisů.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Žádné freemium, žádné otravné reklamy. Zaplať jednou za doživotní licenci a získej nejlepší nástroj pro své studium.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <Button 
              size="lg"
              onClick={handleStart}
              className="h-16 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xl gap-3 shadow-xl shadow-indigo-200 dark:shadow-none transition-all hover:scale-105"
            >
              Koupit doživotní licenci <ArrowRight className="w-6 h-6" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => window.open(GITHUB_URL, '_blank')}
              className="h-16 px-10 rounded-2xl border-2 font-bold text-lg gap-3"
            >
              <Github className="w-5 h-5" /> GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={Layers}
              title="Vše odemčeno"
              description="S jednorázovou platbou získáte okamžitě přístup ke všem funkcím."
              color="bg-blue-500"
            />
            <FeatureCard 
              icon={CheckSquare}
              title="Žádné reklamy"
              description="Soustřeďte se pouze na učení bez jakéhokoliv rozptylování."
              color="bg-emerald-500"
            />
            <FeatureCard 
              icon={Zap}
              title="Cloud Sync"
              description="Vaše data jsou v bezpečí a synchronizovaná napříč zařízeními."
              color="bg-amber-500"
            />
            <FeatureCard 
              icon={Sparkles}
              title="AI Funkce"
              description="Využívejte Gemini AI pro tvorbu studijních sad během vteřin."
              color="bg-rose-500"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-600" />
            <span className="text-xl font-black tracking-tighter">Edu | by plojharsim</span>
          </div>
          
          <p className="text-muted-foreground text-sm font-medium flex items-center gap-1">
            Vytvořeno s <Heart className="w-3 h-3 text-red-400 fill-red-400" /> by <a href="https://plojharsim.cz" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">plojharsim</a>
          </p>

          <div className="flex items-center gap-6">
            <a href="https://plojharsim.cz" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-indigo-600 transition-colors"><Globe className="w-5 h-5" /></a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-indigo-600 transition-colors"><Github className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color }: any) => (
  <div className="p-8 bg-card border border-border rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200 dark:shadow-none group-hover:scale-110 transition-transform`}>
      <Icon className="w-7 h-7 text-white" />
    </div>
    <h3 className="text-xl font-black mb-2 text-foreground">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

export default Landing;