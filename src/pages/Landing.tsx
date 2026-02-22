"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Sparkles, BookOpen, Layers, CheckSquare, 
  Keyboard, Zap, Trophy, Heart, ArrowRight,
  Github, Globe
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from '@/components/AuthProvider';

const Landing = () => {
  const navigate = useNavigate();
  const { session } = useAuth();

  const handleStart = () => {
    if (session) {
      navigate('/app');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-500 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
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
              {session ? 'Do aplikace' : 'Začít se učit'}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/30 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Zap className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Efektivní učení nové generace</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-8 tracking-tight leading-[0.9] animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Uč se chytřeji, <br />
            <span className="text-indigo-600 dark:text-indigo-400">ne déle.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Moderní platforma pro studenty. Vytvářej si vlastní studijní sady, 
            využívej AI pro generování obsahu a procvičuj hravou formou.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <Button 
              size="lg"
              onClick={handleStart}
              className="h-16 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xl gap-3 shadow-xl shadow-indigo-200 dark:shadow-none transition-all hover:scale-105"
            >
              {session ? 'Pokračovat v učení' : 'Vyzkoušet zdarma'} <ArrowRight className="w-6 h-6" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => window.open('https://github.com/plojharsim', '_blank')}
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
              title="Kartičky"
              description="Klasická metoda prověřená časem v moderním 3D kabátě."
              color="bg-blue-500"
            />
            <FeatureCard 
              icon={CheckSquare}
              title="ABCD Výběr"
              description="Rychlé testování znalostí s okamžitou zpětnou vazbou."
              color="bg-emerald-500"
            />
            <FeatureCard 
              icon={Keyboard}
              title="Psaní"
              description="Nauč se přesné znění a pravopis bez kompromisů."
              color="bg-amber-500"
            />
            <FeatureCard 
              icon={BookOpen}
              title="Přiřazování"
              description="Propojuj souvislosti v dynamické interaktivní hře."
              color="bg-rose-500"
            />
          </div>
        </div>
      </section>

      {/* Stats/Badges Highlight */}
      <section className="py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
              Gamifikace, která tě <br />
              <span className="text-indigo-600">donutí k výsledkům.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Sbírej odznaky za své úspěchy, udržuj si denní sérii a sleduj, 
              jak se tvá průměrná úspěšnost zlepšuje s každou lekcí.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-card rounded-[2rem] border border-border shadow-sm">
                <Trophy className="w-8 h-8 text-amber-500 mb-4" />
                <h4 className="text-2xl font-black">15+</h4>
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">Odznaků</p>
              </div>
              <div className="p-6 bg-card rounded-[2rem] border border-border shadow-sm">
                <Sparkles className="w-8 h-8 text-indigo-500 mb-4" />
                <h4 className="text-2xl font-black">AI</h4>
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">Generování</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-indigo-600/10 blur-[100px] rounded-full" />
            <div className="relative bg-card border-4 border-border rounded-[3rem] p-8 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-indigo-600 rounded-2xl" />
                 <div className="space-y-1">
                   <div className="h-4 w-32 bg-muted rounded-full" />
                   <div className="h-3 w-20 bg-muted/60 rounded-full" />
                 </div>
               </div>
               <div className="space-y-4">
                 <div className="h-32 w-full bg-slate-100 dark:bg-slate-800 rounded-2xl" />
                 <div className="grid grid-cols-2 gap-4">
                   <div className="h-20 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl" />
                   <div className="h-20 bg-red-50 dark:bg-red-950/20 rounded-2xl" />
                 </div>
               </div>
            </div>
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
            <a href="#" className="text-muted-foreground hover:text-indigo-600 transition-colors"><Globe className="w-5 h-5" /></a>
            <a href="#" className="text-muted-foreground hover:text-indigo-600 transition-colors"><Github className="w-5 h-5" /></a>
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