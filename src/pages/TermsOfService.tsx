"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ShieldCheck, ScrollText, Lock, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6 pt-safe flex flex-col items-center">
      <header className="max-w-4xl w-full md:pt-safe-lg mb-10 flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="rounded-2xl h-12 w-12 bg-card shadow-sm border border-border flex-shrink-0"
        >
          <ChevronLeft className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </Button>
        <div className="flex flex-col">
          <h1 className="text-3xl font-black text-foreground">Podmínky služby</h1>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Platné od 27. února 2026</p>
        </div>
      </header>

      <main className="max-w-4xl w-full space-y-8 pb-20">
        <Card className="p-8 md:p-12 rounded-[3rem] border-2 border-border bg-card shadow-sm space-y-10">
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
              <ScrollText className="w-6 h-6" />
              <h2 className="text-2xl font-black">1. Obecná ustanovení</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Vítejte v aplikaci Edu | by plojharsim. Používáním této aplikace souhlasíte s těmito podmínkami. Aplikace slouží k osobnímu vzdělávání a procvičování studijních materiálů.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
              <Lock className="w-6 h-6" />
              <h2 className="text-2xl font-black">2. Ochrana osobních údajů</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Vaše soukromí je pro nás prioritou. Data jako e-mailová adresa, jméno a studijní výsledky jsou bezpečně uloženy v šifrované databázi Supabase a nejsou poskytovány třetím stranám. Svůj účet a všechna data můžete kdykoliv trvale smazat v nastavení aplikace.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
              <ShieldCheck className="w-6 h-6" />
              <h2 className="text-2xl font-black">3. Odpovědnost za obsah</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Uživatelé jsou zodpovědní za obsah, který do aplikace vkládají nebo veřejně sdílejí. Je zakázáno vkládat obsah, který je urážlivý, nelegální nebo porušuje autorská práva. Provozovatel si vyhrazuje právo odstranit nevhodný veřejný obsah.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
              <Globe className="w-6 h-6" />
              <h2 className="text-2xl font-black">4. Dostupnost služby</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Snažíme se o maximální dostupnost aplikace, nicméně neručíme za případné výpadky způsobené údržbou nebo třetími stranami. Služba je poskytována "tak, jak je" bez další záruky.
            </p>
          </section>
        </Card>
      </main>
    </div>
  );
};

export default TermsOfService;