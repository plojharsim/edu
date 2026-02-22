"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Sparkles, BookOpen, Layers, CheckSquare, 
  Keyboard, Zap, Trophy, Heart, ArrowRight,
  Github, Globe, Crown, Check
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
              variant="ghost"
              onClick={() => navigate('/pricing')}
              className="hidden sm:flex rounded-2xl font-bold text-muted-foreground hover:text-indigo-600"
            >
              Ceník
            </Button>
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
              onClick={() => navigate('/pricing')}
              className="h-16 px-10 rounded-2xl border-2 font-bold text-lg gap-3"
            >
              <Crown className="w-5 h-5 text-amber-500" /> Ceník Premium
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

      {/* Pricing Teaser */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-12">Jedna cena. Navždy.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-8 bg-card border border-border rounded-[2.5rem] shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Základní verze</h3>
                <div className="text-3xl font-black mb-6">Zdarma</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground"><Check className="w-4 h-4 text-indigo-500" /> Přístup k výchozím tématům</li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground"><Check className="w-4 h-4 text-indigo-500" /> Režim Kartičky a ABCD</li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground"><Check className="w-4 h-4 text-indigo-500" /> Sledování statistik</li>
                </ul>
              </div>
              <Button variant="outline" onClick={handleStart} className="w-full rounded-xl">Začít zdarma</Button>
            </div>

            <div className="p-8 bg-indigo-600 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden">
               <div className="absolute -top-10 -right-10 opacity-20"><Crown className="w-40 h-40 rotate-12" /></div>
               <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-indigo-100">Edu Premium</h3>
                  <div className="text-3xl font-black mb-6">249 Kč <span className="text-sm font-normal text-indigo-200">/ jednorázově</span></div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2 text-sm text-indigo-50"><Check className="w-4 h-4 text-amber-400" /> AI generování studijních sad</li>
                    <li className="flex items-center gap-2 text-sm text-indigo-50"><Check className="w-4 h-4 text-amber-400" /> Neomezená vlastní témata</li>
                    <li className="flex items-center gap-2 text-sm text-indigo-50"><Check className="w-4 h-4 text-amber-400" /> Pokročilé herní režimy</li>
                    <li className="flex items-center gap-2 text-sm text-indigo-50"><Check className="w-4 h-4 text-amber-400" /> Synchronizace v cloudu</li>
                  </ul>
                </div>
                <Button onClick={() => navigate('/pricing')} className="w-full bg-white text-indigo-600 hover:bg-indigo-50 font-black rounded-xl">Odemknout Premium</Button>
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