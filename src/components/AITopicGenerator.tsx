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
import { Wand2, Sparkles, Key, Loader2, Save, Camera, Image as ImageIcon, X, FileText } from "lucide-react";
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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Pomocná funkce pro převod souboru na formát pro Gemini
  async function fileToGenerativePart(file: File) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise as string, mimeType: file.type },
    };
  }

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

    if (!prompt.trim() && !selectedImage) return;

    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      // Pro zpracování obrázků použijeme gemini-1.5-flash, který je pro to optimalizovaný
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const systemPrompt = `Jsi asistent pro tvorbu studijních materiálů. Tvým úkolem je vytvořit seznam termínů a definic pro studijní aplikaci na základě uživatelského zadání ${selectedImage ? "a přiloženého obrázku poznámek" : ""}. 
      Odpověz VŽDY A POUZE ve formátu JSON, který odpovídá této struktuře:
      {
        "name": "Název tématu (krátký a výstižný)",
        "items": [
          { 
            "term": "otázka nebo termín", 
            "definition": "správná odpověď nebo definice", 
            "options": ["uvěřitelná chyba 1", "uvěřitelná chyba 2", "uvěřitelná chyba 3"],
            "category": "název kategorie pro rozřazování"
          }
        ]
      }
      Vytvoř ideálně 10 až 15 položek. Pokud uživatel zadá jazyk, termín bude v češtině a definice v cílovém jazyce.
      ${prompt ? `Dodatečné instrukce od uživatele: "${prompt}"` : "Vytěž z obrázku nejdůležitější informace a vytvoř z nich studijní sadu."}`;

      let result;
      if (selectedImage) {
        const imagePart = await fileToGenerativePart(selectedImage);
        result = await model.generateContent([systemPrompt, imagePart]);
      } else {
        result = await model.generateContent(systemPrompt);
      }

      const response = await result.response;
      const text = response.text();
      
      const jsonStr = text.replace(/```json|```/gi, "").trim();
      const data = JSON.parse(jsonStr);

      const newTopic: Topic = {
        id: `ai_${Date.now()}`,
        name: data.name || "AI Generované téma",
        items: data.items || [],
        allowedModes: ['flashcards', 'abcd', 'writing', 'matching', 'sorting'],
        randomizeDirection: true,
        isPublic: false
      };

      onTopicGenerated(newTopic);
      showSuccess("AI úspěšně vygenerovala nové téma!");
      onOpenChange(false);
      setPrompt("");
      removeImage();
    } catch (error) {
      console.error("AI Generation Error:", error);
      showError("Nepodařilo se vygenerovat téma. Zkontroluj API klíč nebo kvalitu fotky.");
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
              : "Popiš téma nebo prostě vyfoť své poznámky a nechej AI kouzlit."}
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
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  className="h-20 rounded-2xl border-2 border-dashed border-border flex flex-col gap-1 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/20"
                >
                  <Camera className="w-6 h-6 text-indigo-500" />
                  <span className="text-[10px] font-bold uppercase">Vyfotit sešit</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  className="h-20 rounded-2xl border-2 border-dashed border-border flex flex-col gap-1 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/20"
                >
                  <ImageIcon className="w-6 h-6 text-indigo-500" />
                  <span className="text-[10px] font-bold uppercase">Vybrat z galerie</span>
                </Button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  capture="environment"
                  onChange={handleImageSelect}
                />
              </div>

              {imagePreview && (
                <div className="relative rounded-2xl overflow-hidden border-2 border-indigo-200 dark:border-indigo-900/50 aspect-video group">
                  <img src={imagePreview} alt="Selected" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="destructive" size="icon" onClick={removeImage} className="rounded-full">
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-indigo-600 text-white px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1">
                    <FileText className="w-3 h-3" /> Připraveno ke skenování
                  </div>
                </div>
              )}

              <Textarea 
                placeholder={selectedImage ? "Přidej doplňující instrukce (volitelné)..." : "Např.: Slovíčka na téma jídlo v angličtině, Hlavní města Asie..."}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] rounded-2xl border-2 border-border bg-background text-base p-4 resize-none focus:border-indigo-500"
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
            disabled={isLoading || (showKeyInput && !apiKey) || (!showKeyInput && !prompt && !selectedImage)}
            className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg gap-2 shadow-lg shadow-indigo-200 dark:shadow-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> {showKeyInput ? 'Ukládám...' : 'Skenuji a generuji...'}
              </>
            ) : showKeyInput ? (
              <>
                <Save className="w-5 h-5" /> Uložit klíč do cloudu
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" /> {selectedImage ? 'Vytvořit ze skenu' : 'Vygenerovat téma'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AITopicGenerator;