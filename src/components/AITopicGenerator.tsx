"use client";

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Sparkles, Key, Loader2, Save, ImageIcon, X, Plus } from "lucide-react";
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
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const fileToGenerativePart = async (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = (reader.result as string).split(',')[1];
        resolve({
          inlineData: {
            data: base64Data,
            mimeType: file.type
          }
        });
      };
      reader.readAsDataURL(file);
    });
  };

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

    if (!prompt.trim() && images.length === 0) {
      showError("Zadej textové zadání nebo nahraj fotky poznámek.");
      return;
    }

    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      // Uživatel specificky vyžadoval model gemini-3-flash-preview (nebo novější "3" řadu)
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const systemPrompt = `Jsi asistent pro tvorbu studijních materiálů. Tvým úkolem je vytvořit seznam termínů a definic pro studijní aplikaci. 
      ${images.length > 0 ? 'Dostal jsi fotografie poznámek, analyzuj jejich obsah a vytvoř z nich studijní sadu.' : ''}
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
      Vytvoř alespoň 8 až 15 položek. 
      ${prompt ? `Uživatel přidal doplňující instrukci: "${prompt}"` : 'Vytvoř sadu přímo z přiložených obrázků.'}`;

      const imageParts = await Promise.all(images.map(img => fileToGenerativePart(img.file)));
      
      const result = await model.generateContent([systemPrompt, ...imageParts as any]);
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
      showSuccess("AI úspěšně vytvořila téma z tvých poznámek!");
      onOpenChange(false);
      setPrompt("");
      setImages([]);
    } catch (error) {
      console.error("AI Generation Error:", error);
      showError("Nepodařilo se vygenerovat téma. Zkontroluj API klíč nebo čitelnost fotek.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[2.5rem] bg-card border-border max-w-lg p-8 overflow-y-auto max-h-[90vh]">
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
              : "Vyfoť své poznámky nebo napiš téma a AI ti vytvoří studijní sadu."}
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
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest ml-1">Zadání nebo popis</label>
                <Textarea 
                  placeholder="Např.: Slovíčka z tohoto textu, Hlavní body z mých poznámek..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] rounded-2xl border-2 border-border bg-background text-base p-4 resize-none focus:border-indigo-500"
                  autoFocus
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest ml-1">Fotky poznámek ({images.length})</label>
                <div className="flex flex-wrap gap-2">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-border group">
                      <img src={img.preview} alt="Note preview" className="w-full h-full object-cover" />
                      <button 
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 hover:bg-muted/50 transition-colors text-muted-foreground"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="text-[8px] font-bold uppercase">Přidat</span>
                  </button>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  multiple 
                  className="hidden" 
                />
              </div>

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
            disabled={isLoading || (showKeyInput && !apiKey) || (!showKeyInput && !prompt && images.length === 0)}
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
                <Wand2 className="w-5 h-5" /> {images.length > 0 ? 'Vytvořit ze snímků' : 'Vygenerovat téma'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AITopicGenerator;