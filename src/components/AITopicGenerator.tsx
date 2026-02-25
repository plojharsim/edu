"use client";

import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Sparkles, Key, Loader2, Save } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { Topic } from "@/data/studyData";
import { useAuth } from '@/components/AuthProvider';
import { dbService } from '@/services/dbService';

interface AITopicGeneratorProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onTopicGenerated: (topic: Topic) => void;
}

const AITopicGenerator = ({ isOpen, onOpenChange, onTopicGenerated }: AITopicGeneratorProps) => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);

  useEffect(() => {
    if (!user || !isOpen) return;
    
    const fetchKey = async () => {
      const profile = await dbService.getProfile(user.id);
      if (profile?.ai_key) {
        setApiKey(profile.ai_key);
        setShowKeyInput(false);
      } else {
        setShowKeyInput(true);
      }
    };
    fetchKey();
  }, [user, isOpen]);

  const handleAction = async () => {
    if (!user) return;

    if (showKeyInput) {
      if (!apiKey.trim()) {
        showError("Prosím vlož platný API klíč.");
        return;
      }
      setIsLoading(true);
      await dbService.updateAIKey(user.id, apiKey);
      setShowKeyInput(false);
      setIsLoading(false);
      showSuccess("API klíč uložen do profilu.");
      return;
    }

    if (!prompt.trim()) return;

    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

      const systemPrompt = `Jsi asistent pro tvorbu studijních materiálů. Tvým úkolem je vytvořit seznam termínů a definic pro studijní aplikaci na základě uživatelského zadání. 
      Odpověz VŽDY A POUZE ve formátu JSON, který odpovídá této struktuře:
      {
        "name": "Název tématu (krátký a výstižný)",
        "items": [
          { 
            "term": "otázka nebo termín", 
            "definition": "správná odpověď nebo definice", 
            "options": ["uvěřitelná chyba 1", "uvěřitelná chyba 2", "uvěřitelná chyba 3"],
            "category": "název kategorie pro rozřazování (např. Planety, Historie, Slovesa)"
          }
        ]
      }
      Vytvoř alespoň 8 až 12 položek. Pokud uživatel zadá jazyk (např. angličtina), termín bude v češtině a definice v cílovém jazyce (nebo naopak, aby to dávalo smysl).
      Uživatel chce téma: "${prompt}"`;

      const result = await model.generateContent(systemPrompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonStr = text.replace(/```json|```/gi, "").trim();
      const data = JSON.parse(jsonStr);

      const newTopic: Topic = {
        id: `ai_${Date.now()}`,
        name: data.name || "AI Generované téma",
        items: data.items || [],
        allowedModes: ['flashcards', 'abcd', 'writing', 'matching', 'sorting'],
        randomizeDirection: true
      };

      onTopicGenerated(newTopic);
      showSuccess("AI úspěšně vygenerovala nové téma!");
      onOpenChange(false);
      setPrompt("");
    } catch (error) {
      console.error("AI Generation Error:", error);
      showError("Nepodařilo se vygenerovat téma. Zkontroluj API klíč nebo zadání.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[2.5rem] bg-card border-border max-w-lg p-8">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-indigo-600 rounded-3xl shadow-lg shadow-indigo-200 dark:shadow-none">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-black text-center text-foreground">AI Generátor</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {showKeyInput 
              ? "Pro používání AI je potřeba vložit tvůj osobní API klíč." 
              : "Napiš, co se chceš naučit, a AI ti vytvoří studijní sadu během pár vteřin."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 my-4">
          {showKeyInput ? (
            <div className="space-y-3 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-200 dark:border-amber-900/30">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-2">
                <Key className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Vlož Gemini API Klíč</span>
              </div>
              <Input 
                type="password"
                placeholder="AI API klíč..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-background border-amber-200 dark:border-amber-900/50"
                autoFocus
              />
              <p className="text-[10px] text-amber-600/70 dark:text-amber-400/50 italic">
                Klíč získáš zdarma na Google AI Studio. Bude uložen v tvém profilu.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Textarea 
                placeholder="Např.: Slovíčka na téma jídlo v angličtině, Hlavní města Asie, Bitvy 2. světové války..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] rounded-2xl border-2 border-border bg-background text-lg p-4 resize-none focus:border-indigo-500"
                autoFocus
              />
              <div className="flex items-center justify-end">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-2 text-muted-foreground hover:text-indigo-500"
                  onClick={() => setShowKeyInput(true)}
                >
                  <Key className="w-3 h-3" /> <span className="text-[10px] font-bold">Změnit klíč</span>
                </Button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-center">
          <Button 
            onClick={handleAction} 
            disabled={isLoading || (showKeyInput && !apiKey) || (!showKeyInput && !prompt)}
            className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg gap-2 shadow-lg shadow-indigo-200 dark:shadow-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> {showKeyInput ? 'Ukládám...' : 'Generuji...'}
              </>
            ) : showKeyInput ? (
              <>
                <Save className="w-5 h-5" /> Uložit klíč do cloudu
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" /> Vygenerovat téma
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AITopicGenerator;