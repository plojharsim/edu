"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, Trash2, ChevronLeft, Save, BookText, Layers, 
  CheckSquare, Keyboard, BookOpen, ArrowLeftRight, 
  Share2, Download, Code, Copy, Check, LayoutPanelTop,
  Sparkles, Loader2, Image as ImageIcon, X, Upload, Globe
} from "lucide-react";
import { Topic, StudyItem, StudyMode } from '@/data/studyData';
import { showSuccess, showError } from '@/utils/toast';
import { encodeTopic, decodeTopic, formatForDeveloper } from '@/lib/sharing';
import AITopicGenerator from '@/components/AITopicGenerator';
import { useAuth } from '@/components/AuthProvider';
import { dbService } from '@/services/dbService';
import { supabase } from '@/integrations/supabase/client';
import LoadingScreen from '@/components/LoadingScreen';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const EditTopics = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [importCode, setImportCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [isAIGeneratorOpen, setIsAIGeneratorOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getItemsLabel = (count: number) => {
    if (count === 1) return "položka";
    if (count >= 2 && count <= 4) return "položky";
    return "položek";
  };

  useEffect(() => {
    if (!user) return;
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const data = await dbService.getUserTopics(user.id);
        setTopics(data);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, [user]);

  const handleSaveAll = async () => {
    if (!user) return;

    // Validace před uložením
    for (const topic of topics) {
      if (!topic.name.trim()) {
        showError("Všechna témata musí mít vyplněný název.");
        return;
      }
      if (topic.items.length === 0) {
        showError(`Téma "${topic.name}" musí mít alespoň jednu položku.`);
        return;
      }
      for (let i = 0; i < topic.items.length; i++) {
        const item = topic.items[i];
        if (!item.term.trim() || !item.definition.trim()) {
          showError(`Položka č. ${i + 1} v tématu "${topic.name}" má prázdný termín nebo definici.`);
          return;
        }
      }
    }

    setIsSaving(true);
    try {
      await Promise.all(topics.map(t => dbService.saveTopic(user.id, t)));
      showSuccess("Všechna témata byla synchronizována s databází!");
      navigate('/app');
    } catch (e) {
      showError("Chyba při ukládání do databáze.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (topicId: string, itemIdx: number, file: File) => {
    if (!user) return;
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;
    const filePath = `item-images/${fileName}`;

    setIsUploading(`${topicId}-${itemIdx}`);

    try {
      const { error: uploadError } = await supabase.storage
        .from('item-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('item-images')
        .getPublicUrl(filePath);

      updateItem(topicId, itemIdx, 'imageUrl', publicUrl);
      showSuccess("Obrázek nahrán.");
    } catch (error: any) {
      showError("Chyba při nahrávání: " + error.message);
    } finally {
      setIsUploading(null);
    }
  };

  const addTopic = (newTopicData?: Topic) => {
    const id = newTopicData?.id || `topic_${Date.now()}`;
    const newTopic: Topic = newTopicData || { 
      id, 
      name: "Nové téma", 
      items: [],
      allowedModes: ['flashcards', 'abcd', 'writing', 'matching', 'sorting'],
      randomizeDirection: false,
      isPublic: false
    };
    setTopics([...topics, newTopic]);
    setActiveTopicId(id);
  };

  const handleImport = () => {
    const imported = decodeTopic(importCode);
    if (imported) {
      addTopic(imported);
      setImportCode("");
      showSuccess("Téma úspěšně importováno!");
    } else {
      showError("Neplatný kód pro import.");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showSuccess("Zkopírováno do schránky!");
    setTimeout(() => setCopied(false), 2000);
  };

  const deleteTopic = async (id: string) => {
    if (!id.startsWith('topic_') && !id.startsWith('ai_') && !id.startsWith('imported_')) {
      await dbService.deleteTopic(id);
    }
    setTopics(topics.filter(t => t.id !== id));
    if (activeTopicId === id) setActiveTopicId(null);
    showSuccess("Téma odstraněno.");
  };

  const toggleMode = (topicId: string, mode: StudyMode) => {
    const newTopics = topics.map(t => {
      if (t.id === topicId) {
        const modes = t.allowedModes || ['flashcards', 'abcd', 'writing', 'matching', 'sorting'];
        const newModes = modes.includes(mode) 
          ? modes.filter(m => m !== mode)
          : [...modes, mode];
        return { ...t, allowedModes: newModes };
      }
      return t;
    });
    setTopics(newTopics);
  };

  const toggleRandomDirection = (topicId: string) => {
    setTopics(topics.map(t => 
      t.id === topicId ? { ...t, randomizeDirection: !t.randomizeDirection } : t
    ));
  };

  const togglePublic = (topicId: string) => {
    setTopics(topics.map(t => 
      t.id === topicId ? { ...t, isPublic: !t.isPublic } : t
    ));
  };

  const addItem = (topicId: string) => {
    const newTopics = [...topics];
    const topic = newTopics.find(t => t.id === topicId);
    if (topic) {
      topic.items.push({
        term: "",
        definition: "",
        options: ["", "", ""],
        category: ""
      });
      setTopics(newTopics);
    }
  };

  const updateItem = (topicId: string, itemIdx: number, field: keyof StudyItem, value: any) => {
    setTopics(prevTopics => prevTopics.map(t => {
      if (t.id === topicId) {
        const newItems = [...t.items];
        if (newItems[itemIdx]) {
          newItems[itemIdx] = { ...newItems[itemIdx], [field]: value };
        }
        return { ...t, items: newItems };
      }
      return t;
    }));
  };

  const deleteItem = (topicId: string, itemIdx: number) => {
    const newTopics = [...topics];
    const topic = newTopics.find(t => topicId === topicId);
    if (topic) {
      topic.items.splice(itemIdx, 1);
      setTopics(newTopics);
    }
  };

  const activeTopic = topics.find(t => t.id === activeTopicId);
  const isAbcdModeEnabled = activeTopic?.allowedModes?.includes('abcd') ?? true;

  const MODES: { id: StudyMode, label: string, icon: any }[] = [
    { id: 'flashcards', label: 'Kartičky', icon: Layers },
    { id: 'abcd', label: 'Výběr', icon: CheckSquare },
    { id: 'writing', label: 'Psaní', icon: Keyboard },
    { id: 'matching', label: 'Pexeso', icon: BookOpen },
    { id: 'sorting', label: 'Rozřazování', icon: LayoutPanelTop },
  ];

  if (loading) return <LoadingScreen message="Otevírám tvoji knihovnu..." />;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 pb-20 pt-safe">
      <header className="max-w-6xl mx-auto md:pt-safe-lg mb-6 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <Button variant="ghost" onClick={() => navigate('/app')} className="rounded-2xl h-12 w-12 bg-card shadow-sm border border-border flex-shrink-0">
            <ChevronLeft className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </Button>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground truncate">Moje témata</h1>
        </div>
        <div className="flex gap-2 w-full sm:w-auto justify-end sm:justify-start">
          <Button 
            onClick={() => setIsAIGeneratorOpen(true)} 
            className="flex-1 sm:flex-none rounded-2xl h-12 px-6 bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20 font-black border-2 border-indigo-500/30 gap-2 text-xs sm:text-sm animate-pulse"
          >
            <Sparkles className="w-5 h-5" /> AI
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1 sm:flex-none rounded-2xl h-12 px-6 font-bold gap-2 bg-card border-border text-foreground text-xs sm:text-sm">
                <Download className="w-5 h-5 text-indigo-500" /> Import
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2rem] bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Importovat téma</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Vložte kód tématu, který vám někdo nasdílel.
                </DialogDescription>
              </DialogHeader>
              <Textarea 
                value={importCode}
                onChange={(e) => setImportCode(e.target.value)}
                placeholder="Vložte kód zde..."
                className="min-h-[100px] rounded-xl bg-background border-border text-foreground"
              />
              <DialogFooter>
                <Button onClick={handleImport} className="rounded-xl bg-indigo-600">Importovat</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button 
            onClick={handleSaveAll} 
            disabled={isSaving}
            className="flex-1 sm:flex-none rounded-2xl h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-2 text-xs sm:text-sm shadow-lg shadow-indigo-200 dark:shadow-none"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            <span className="hidden xs:inline">Uložit do cloudu</span>
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-muted-foreground uppercase text-[10px] sm:text-xs tracking-widest">Témata v cloudu</h2>
            <Button size="icon" variant="ghost" onClick={() => addTopic()} className="h-8 w-8 rounded-full bg-indigo-500/10 text-indigo-600">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {topics.map(topic => (
            <div key={topic.id} className="group relative">
              <Button
                variant={activeTopicId === topic.id ? "secondary" : "ghost"}
                className={`w-full justify-start h-14 rounded-xl text-left font-bold transition-all border border-transparent ${activeTopicId === topic.id ? 'bg-indigo-600 text-white hover:bg-indigo-700 border-indigo-500' : 'bg-card shadow-sm border-border text-foreground'}`}
                onClick={() => setActiveTopicId(topic.id)}
              >
                <BookText className={`mr-3 w-5 h-5 ${activeTopicId === topic.id ? 'text-white' : 'text-indigo-500/50'}`} />
                <span className="truncate pr-6">{topic.name}</span>
                {topic.isPublic && <Globe className="absolute right-10 top-1/2 -translate-y-1/2 w-3 h-3 text-white/50" />}
              </Button>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteTopic(topic.id); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="md:col-span-8 space-y-6">
          {activeTopic ? (
            <>
              <div className="bg-card p-4 sm:p-6 rounded-[2rem] shadow-sm mb-6 border border-border">
                <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 mb-6">
                  <h2 className="font-bold text-muted-foreground uppercase text-[10px] sm:text-xs tracking-widest">Základní nastavení</h2>
                  <div className="flex gap-2 w-full xs:w-auto justify-start xs:justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="flex-1 xs:flex-none gap-2 rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10 text-xs">
                          <Share2 className="w-4 h-4" /> Kód
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-[2rem] bg-card border-border max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-foreground">Nasdílej toto téma</DialogTitle>
                          <DialogDescription className="text-muted-foreground">
                            Tento kód si může kdokoliv jiný vložit do své aplikace.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="bg-muted p-4 rounded-xl border border-border break-all text-xs font-mono text-foreground/70 max-h-[200px] overflow-y-auto">
                          {encodeTopic(activeTopic)}
                        </div>
                        <Button onClick={() => copyToClipboard(encodeTopic(activeTopic))} className="w-full gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold mt-4">
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          Kopírovat kód pro kamaráda
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                
                <Input 
                  value={activeTopic.name}
                  onChange={(e) => {
                    const newTopics = [...topics];
                    const t = newTopics.find(x => x.id === activeTopic.id);
                    if (t) t.name = e.target.value;
                    setTopics(newTopics);
                  }}
                  className="mb-8 h-14 text-lg sm:text-xl font-bold border-2 border-border bg-background text-foreground"
                  placeholder="Název tématu"
                />

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-indigo-500/5 rounded-2xl flex items-center justify-between border border-indigo-500/10">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 rounded-xl">
                          <ArrowLeftRight className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                          <Label htmlFor="random-direction" className="font-bold text-foreground block text-sm">Náhodný směr</Label>
                          <span className="text-[10px] text-muted-foreground">Randomizuje otázky.</span>
                        </div>
                      </div>
                      <Switch 
                        id="random-direction"
                        checked={activeTopic.randomizeDirection}
                        onCheckedChange={() => toggleRandomDirection(activeTopic.id)}
                      />
                    </div>

                    <div className="p-4 bg-emerald-500/5 rounded-2xl flex items-center justify-between border border-emerald-500/10">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/10 rounded-xl">
                          <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <Label htmlFor="public-toggle" className="font-bold text-foreground block text-sm">Veřejná knihovna</Label>
                          <span className="text-[10px] text-muted-foreground">Kdokoliv si ji může stáhnout.</span>
                        </div>
                      </div>
                      <Switch 
                        id="public-toggle"
                        checked={activeTopic.isPublic}
                        onCheckedChange={() => togglePublic(activeTopic.id)}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-4">Povolené studijní režimy</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
                      {MODES.map(mode => (
                        <div key={mode.id} className="flex items-center space-x-2 p-2 sm:p-4 bg-background rounded-2xl border border-border">
                          <Checkbox 
                            id={`mode-${mode.id}`}
                            checked={(activeTopic.allowedModes || ['flashcards', 'abcd', 'writing', 'matching', 'sorting']).includes(mode.id)}
                            onCheckedChange={() => toggleMode(activeTopic.id, mode.id)}
                          />
                          <Label htmlFor={`mode-${mode.id}`} className="flex items-center gap-1.5 cursor-pointer font-bold text-foreground text-[8px] xs:text-[9px] sm:text-xs leading-tight">
                            <mode.icon className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500 shrink-0" />
                            {mode.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4 mb-4 pt-4 border-t border-border">
                <h2 className="font-bold text-muted-foreground uppercase text-[10px] sm:text-xs tracking-widest">Karty v tématu ({activeTopic.items.length} {getItemsLabel(activeTopic.items.length)})</h2>
                <Button onClick={() => addItem(activeTopic.id)} className="w-full xs:w-auto rounded-xl bg-indigo-600 text-white font-bold gap-2">
                  <Plus className="w-4 h-4" /> Přidat kartu
                </Button>
              </div>

              <div className="space-y-4">
                {activeTopic.items.map((item, idx) => (
                  <Card key={`${activeTopic.id}-item-${idx}`} className="p-4 sm:p-6 rounded-[2rem] border border-border shadow-sm bg-card relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 sm:w-1.5 h-full bg-indigo-500" />
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <span className="font-black text-indigo-500/20 dark:text-indigo-400/20">#{idx + 1}</span>
                      <Button size="icon" variant="ghost" onClick={() => deleteItem(activeTopic.id, idx)} className="text-red-400 hover:text-red-600 hover:bg-red-500/10 h-8 w-8">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Termín (Otázka)</label>
                          <Input 
                            value={item.term}
                            onChange={(e) => updateItem(activeTopic.id, idx, 'term', e.target.value)}
                            placeholder="Např. Dog"
                            className="h-10 sm:h-12 rounded-xl border-border bg-background text-foreground text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Definice (Odpověď)</label>
                          <Input 
                            value={item.definition}
                            onChange={(e) => updateItem(activeTopic.id, idx, 'definition', e.target.value)}
                            placeholder="Např. Pes"
                            className="h-10 sm:h-12 rounded-xl border-border bg-background text-foreground text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Obrázek (URL nebo soubor)</label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Input 
                              value={item.imageUrl || ""}
                              onChange={(e) => updateItem(activeTopic.id, idx, 'imageUrl', e.target.value)}
                              placeholder="URL obrázku..."
                              className="h-10 sm:h-12 pl-10 rounded-xl border-border bg-background text-xs"
                            />
                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            {item.imageUrl && (
                              <button 
                                onClick={() => updateItem(activeTopic.id, idx, 'imageUrl', '')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          
                          <label className="cursor-pointer">
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(activeTopic.id, idx, file);
                              }}
                            />
                            <div className="h-10 sm:h-12 w-12 rounded-xl border-2 border-dashed border-border flex items-center justify-center hover:bg-muted/50 transition-colors">
                              {isUploading === `${activeTopic.id}-${idx}` ? (
                                <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
                              ) : (
                                <Upload className="w-5 h-5 text-muted-foreground" />
                              )}
                            </div>
                          </label>
                        </div>
                        {item.imageUrl && (
                          <div className="mt-2 h-16 w-full rounded-xl overflow-hidden border border-border">
                            <img src={item.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-indigo-500/60 tracking-widest">Kategorie (pro rozřazování)</label>
                        <Input 
                          value={item.category || ""}
                          onChange={(e) => updateItem(activeTopic.id, idx, 'category', e.target.value)}
                          placeholder="Např. Zvířata (aktivuje režim Rozřazování)"
                          className="h-10 sm:h-12 rounded-xl border-indigo-100 dark:border-indigo-900/30 bg-background text-foreground text-sm"
                        />
                      </div>
                      
                      {isAbcdModeEnabled && (
                        <div className="space-y-3 p-3 sm:p-4 bg-muted/30 rounded-2xl border border-border">
                          <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Špatné odpovědi</label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                            {item.options.map((opt, optIdx) => (
                              <Input 
                                key={optIdx}
                                value={opt}
                                onChange={(e) => {
                                  const newOpts = [...item.options];
                                  newOpts[optIdx] = e.target.value;
                                  updateItem(activeTopic.id, idx, 'options', newOpts);
                                }}
                                placeholder={`Chyba ${optIdx + 1}`}
                                className="rounded-lg border-border h-9 text-xs sm:text-sm bg-background text-foreground"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-card rounded-[3rem] border-2 border-dashed border-border">
              <BookText className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-500/20 dark:text-indigo-400/20 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-muted-foreground">Vyberte téma k úpravě</h3>
              <p className="text-muted-foreground text-xs sm:text-sm max-w-xs mt-2">Nebo vytvořte nové téma pomocí tlačítka plus v levém sloupci.</p>
            </div>
          )}
        </div>
      </main>

      <AITopicGenerator 
        isOpen={isAIGeneratorOpen} 
        onOpenChange={setIsAIGeneratorOpen} 
        onTopicGenerated={(newTopic) => addTopic(newTopic)}
      />
    </div>
  );
};

export default EditTopics;