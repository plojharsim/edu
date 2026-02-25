"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Sparkles, BookOpen, Layers, CheckSquare, 
  Keyboard, Zap, Trophy, Heart, ArrowRight,
  Github, Globe, Wand2, Camera, Cloud
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
    <div className="min-h-screen bg-background transition-colors duration-500 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          <div 
            className="flex items-center gap-2 min-w-0 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
              {session ? 'Moje nástěnka' : 'Vstoupit do školy'}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-24 px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/30 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Zap className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Poháněno AI a algoritmy pro paměť</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-foreground mb-8 tracking-tight leading-[0.85] animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Uč se chytře, <br />
            <span className="text-indigo-600 dark:text-indigo-400">bav se u toho.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Moderní platforma pro studenty, která mění poznámky ve hru. 
            Vytvoř studijní sady z fotek, sdílej je s kamarády a ovládni látku 10x rychleji.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <Button 
              size="lg"
              onClick={handleStart}
              className="h-16 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xl gap-3 shadow-xl shadow-indigo-200 dark:shadow-none transition-all hover:scale-105"
            >
              {session ? 'Pokračovat v učení' : 'Začít se učit zdarma'} <ArrowRight className="w-6 h-6" />
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

      {/* AI Feature Highlight */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto bg-card border-4 border-indigo-100 dark:border-indigo-900/30 rounded-[4rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-widest">
                <Wand2 className="w-4 h-4" /> Magie s Gemini 3 Flash
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
                Vyfoť poznámky, <br />
                <span className="text-indigo-600">AI udělá zbytek.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Neztrácej čas vypisováním. Nahraj fotky svých sešitů nebo učebnic a naše AI z nich 
                v mžiku vytvoří strukturovanou studijní sadu s kartičkami, ABCD testy i tématickými kategoriemi.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Camera, text: "Podpora více fotek najednou" },
                  { icon: Wand2, text: "Chytré generování nesprávných odpovědí" },
                  { icon: Cloud, text: "Okamžitá synchronizace do cloudu" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 font-bold text-foreground">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                      <item.icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-[3rem] border-2 border-border p-8 shadow-inner flex items-center justify-center group overflow-hidden">
                <div className="text-center space-y-4 group-hover:scale-110 transition-transform duration-700">
                  <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] mx-auto flex items-center justify-center shadow-2xl shadow-indigo-400/20">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                  <p className="font-black text-muted-foreground uppercase text-xs tracking-widest">Skenuji tvé vědomosti...</p>
                </div>
                {/* Decorative elements to simulate UI */}
                <div className="absolute top-10 left-10 w-32 h-12 bg-card rounded-xl border border-border shadow-md animate-pulse" />
                <div className="absolute bottom-20 right-10 w-40 h-16 bg-card rounded-xl border border-border shadow-md animate-pulse delay-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Modes Section */}
      <section className="py-24 px-6 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-foreground">5 cest k mistrovství</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Vyber si režim, který ti sedne nejvíc. Každý trénuje tvůj mozek jiným způsobem.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <FeatureCard icon={Layers} title="Kartičky" description="Klasické 3D otáčení pro rychlé drcení." color="bg-blue-500" />
            <FeatureCard icon={CheckSquare} title="Výběr" description="ABCD testy s chytrými možnostmi." color="bg-emerald-500" />
            <FeatureCard icon={Keyboard} title="Psaní" description="Precizní trénink pravopisu a paměti." color="bg-amber-500" />
            <FeatureCard icon={BookOpen} title="Dvojice" description="Dynamická hra na čas a postřeh." color="bg-rose-500" />
            <FeatureCard icon={LayoutPanelTop} title="Rozřazování" description="Třiď termíny do správných kategorií." color="bg-purple-600" />
          </div>
        </div>
      </section>

      {/* Gamification & Community */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-8 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 bg-card rounded-[3rem] border-2 border-border shadow-sm hover:border-indigo-500 transition-colors">
                <Trophy className="w-10 h-10 text-amber-500 mb-4" />
                <h4 className="text-3xl font-black">15+</h4>
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">Odznaků k získání</p>
              </div>
              <div className="p-8 bg-card rounded-[3rem] border-2 border-border shadow-sm hover:border-indigo-500 transition-colors">
                <Globe className="w-10 h-10 text-indigo-500 mb-4" />
                <h4 className="text-3xl font-black">Open</h4>
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">Veřejná knihovna</p>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-8 order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
              Soutěž, sbírej, <br />
              <span className="text-indigo-600">překonávej se.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Edu není jen o učení, je to o pokroku. Sleduj svou denní sérii, sbírej unikátní 
              odznaky za své výkony a zapiš se do historie na globálním žebříčku top studentů.
            </p>
            <Button 
              onClick={handleStart}
              className="h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-2 text-lg"
            >
              Chci sbírat úspěchy <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-border bg-slate-50/30 dark:bg-slate-900/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-6 h-6 text-indigo-600" />
              <span className="text-2xl font-black tracking-tighter">Edu | by plojharsim</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Uč se chytřeji díky nejmodernějším technologiím a studijním metodám.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <p className="text-muted-foreground text-sm font-medium flex items-center gap-1">
              Vytvořeno s <Heart className="w-3 h-3 text-red-400 fill-red-400" /> by <a href="https://plojharsim.cz" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">plojharsim</a>
            </p>
            <div className="flex items-center gap-6">
              <a href="https://plojharsim.cz" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-indigo-600 transition-colors"><Globe className="w-6 h-6" /></a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-indigo-600 transition-colors"><Github className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border/40 text-center">
          <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} Edu Learning Platform. Všechna práva vyhrazena.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color }: any) => (
  <div className="p-8 bg-card border-2 border-border rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group h-full flex flex-col">
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform`}>
      <Icon className="w-7 h-7 text-white" />
    </div>
    <h3 className="text-xl font-black mb-2 text-foreground">{title}</h3>
    <p className="text-muted-foreground leading-relaxed text-sm flex-1">{description}</p>
  </div>
);

const LayoutPanelTop = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="18" height="7" x="3" y="3" rx="1" />
    <rect width="9" height="7" x="3" y="14" rx="1" />
    <rect width="5" height="7" x="16" y="14" rx="1" />
  </svg>
);

export default Landing;