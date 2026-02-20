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
  Share2, Download, Code, Copy, Check
} from "lucide-react";
import { saveUserTopics, Topic, StudyItem, StudyMode } from '@/data/studyData';
import { showSuccess, showError } from '@/utils/toast';
import { encodeTopic, decodeTopic, formatForDeveloper } from '@/lib/sharing';
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
  const [topics, setTopics] = useState<Topic[]>([]);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [importCode, setImportCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('user_topics');
    if (saved) setTopics(JSON.parse(saved));
  }, []);

  const handleSave = () => {
    saveUserTopics(topics);
    showSuccess("Vlastní témata byla uložena!");
    navigate('/');
  };

  const addTopic = () => {
    const id = `topic_${Date.now()}`;
    const newTopic: Topic = { 
      id, 
      name: "Nové téma", 
      items: [],
      allowedModes: ['flashcards', 'abcd', 'writing', 'matching'],
      randomizeDirection: false
    };
    setTopics([...topics, newTopic]);
    setActiveTopicId(id);
  };

  const handleImport = () => {
    const imported = decodeTopic(importCode);
    if (imported) {
      setTopics([...topics, imported]);
      setActiveTopicId(imported.id);
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

  const deleteTopic = (id: string) => {
    setTopics(topics.filter(t => t.id !== id));
    if (activeTopicId === id) setActiveTopicId(null);
  };

  const toggleMode = (topicId: string, mode: StudyMode) => {
    const newTopics = topics.map(t => {
      if (t.id === topicId) {
        const modes = t.allowedModes || ['flashcards', 'abcd', 'writing', 'matching'];
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

  const addItem = (topicId: string) => {
    const newTopics = [...topics];
    const topic = newTopics.find(t => t.id === topicId);
    if (topic) {
      topic.items.push({
        id: `item_${Date.now()}`,
        term: "",
        definition: "",
        options: ["", "", ""],
        isAbcdEnabled: true
      });
      setTopics(newTopics);
    }
  };

  const updateItem = (topicId: string, itemId: string, field: keyof StudyItem, value: any) => {
    const newTopics = [...topics];
    const topic = newTopics.find(t => t.id === topicId);
    if (topic) {
      const item = topic.items.find(i => i.id === itemId);
      if (item) {
        (item as any)[field] = value;
        setTopics(newTopics);
      }
    }
  };

  const deleteItem = (topicId: string, itemId: string) => {
    const newTopics = [...topics];
    const topic = newTopics.find(t => t.id === topicId);
    if (topic) {
      topic.items = topic.items.filter(i => i.id !== itemId);
      setTopics(newTopics);
    }
  };

  const activeTopic = topics.find(t => t.id === activeTopicId);
  const isAbcdModeEnabled = activeTopic?.allowedModes?.includes('abcd') ?? true;

  const MODES: { id: StudyMode, label: string, icon: any }[] = [
    { id: 'flashcards', label: 'Kartičky', icon: Layers },
    { id: 'abcd', label: 'Výběr (ABCD)', icon: CheckSquare },
    { id: 'writing', label: 'Psaní', icon: Keyboard },
    { id: 'matching', label: 'Přiřazování', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-background p-6 pb-20">
      <header className="max-w-6xl mx-auto mb-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/')} className="rounded-2xl h-12 w-12 bg-card shadow-sm border border-border">
            <ChevronLeft className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </Button>
          <h1 className="text-3xl font-black text-foreground">Moje témata</h1>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-2xl h-12 px-6 font-bold gap-2 bg-card border-border text-foreground">
                <Download className="w-5 h-5 text-indigo-500" /> Importovat
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
          <Button onClick={handleSave} className="rounded-2xl h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-2">
            <Save className="w-5 h-5" /> Uložit změny
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-muted-foreground uppercase text-xs tracking-widest">Témata ve "Vlastní"</h2>
            <Button size="icon" variant="ghost" onClick={addTopic} className="h-8 w-8 rounded-full bg-indigo-500/10 text-indigo-600">
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
                {topic.name}
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
              <div className="bg-card p-6 rounded-[2rem] shadow-sm mb-6 border border-border">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="font-bold text-muted-foreground uppercase text-xs tracking-widest">Základní nastavení</h2>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-2 rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10">
                          <Share2 className="w-4 h-4" /> Sdílet
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

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-2 rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10">
                          <Code className="w-4 h-4" /> Kód pro vývojáře
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-[2rem] bg-card border-border max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-foreground">Kód pro veřejné téma</DialogTitle>
                          <DialogDescription className="text-muted-foreground">
                            Tento kód pošli mně (vývojáři) a já ho přidám jako stálou součást aplikace pro všechny!
                          </DialogDescription>
                        </DialogHeader>
                        <div className="bg-muted p-4 rounded-xl border border-border text-xs font-mono text-foreground/70 max-h-[300px] overflow-y-auto whitespace-pre-wrap">
                          {formatForDeveloper(activeTopic)}
                        </div>
                        <Button onClick={() => copyToClipboard(formatForDeveloper(activeTopic))} className="w-full gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold mt-4">
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          Kopírovat kód pro vývojáře
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
                  className="mb-6 h-14 text-xl font-bold border-2 border-border bg-background text-foreground"
                  placeholder="Název tématu"
                />

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-4">Povolené studijní režimy</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {MODES.map(mode => (
                        <div key={mode.id} className="flex items-center space-x-3 p-4 bg-background rounded-2xl border border-border">
                          <Checkbox 
                            id={`mode-${mode.id}`}
                            checked={(activeTopic.allowedModes || ['flashcards', 'abcd', 'writing', 'matching']).includes(mode.id)}
                            onCheckedChange={() => toggleMode(activeTopic.id, mode.id)}
                          />
                          <Label htmlFor={`mode-${mode.id}`} className="flex items-center gap-2 cursor-pointer font-medium text-foreground">
                            <mode.icon className="w-4 h-4 text-indigo-500" />
                            {mode.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-indigo-500/5 rounded-2xl flex items-center justify-between border border-indigo-500/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-500/10 rounded-xl">
                        <ArrowLeftRight className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <Label htmlFor="random-direction" className="font-bold text-foreground block">Náhodný směr otázek</Label>
                        <span className="text-xs text-muted-foreground">Randomizuje, co bude otázka a co odpověď.</span>
                      </div>
                    </div>
                    <Switch 
                      id="random-direction"
                      checked={activeTopic.randomizeDirection}
                      onCheckedChange={() => toggleRandomDirection(activeTopic.id)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4 pt-4 border-t border-border">
                <h2 className="font-bold text-muted-foreground uppercase text-xs tracking-widest">Karty v tématu ({activeTopic.items.length})</h2>
                <Button onClick={() => addItem(activeTopic.id)} className="rounded-xl bg-indigo-600 text-white font-bold gap-2">
                  <Plus className="w-4 h-4" /> Přidat kartu
                </Button>
              </div>

              <div className="space-y-4">
                {activeTopic.items.map((item, idx) => (
                  <Card key={item.id} className="p-6 rounded-[2rem] border border-border shadow-sm bg-card relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500" />
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-black text-indigo-500/20 dark:text-indigo-400/20">#{idx + 1}</span>
                      <Button size="icon" variant="ghost" onClick={() => deleteItem(activeTopic.id, item.id)} className="text-red-400 hover:text-red-600 hover:bg-red-500/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Termín (Otázka)</label>
                        <Input 
                          value={item.term}
                          onChange={(e) => updateItem(activeTopic.id, item.id, 'term', e.target.value)}
                          placeholder="Např. Dog"
                          className="h-12 rounded-xl border-border bg-background text-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Definice (Odpověď)</label>
                        <Input 
                          value={item.definition}
                          onChange={(e) => updateItem(activeTopic.id, item.id, 'definition', e.target.value)}
                          placeholder="Např. Pes"
                          className="h-12 rounded-xl border-border bg-background text-foreground"
                        />
                      </div>
                    </div>

                    {isAbcdModeEnabled && (
                      <div className="space-y-3 p-4 bg-muted/30 rounded-2xl border border-border">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Špatné odpovědi</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {item.options.map((opt, optIdx) => (
                            <Input 
                              key={optIdx}
                              value={opt}
                              onChange={(e) => {
                                const newOpts = [...item.options];
                                newOpts[optIdx] = e.target.value;
                                updateItem(activeTopic.id, item.id, 'options', newOpts);
                              }}
                              placeholder={`Chyba ${optIdx + 1}`}
                              className="rounded-lg border-border h-10 text-sm bg-background text-foreground"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-card rounded-[3rem] border-2 border-dashed border-border">
              <BookText className="w-16 h-16 text-indigo-500/20 dark:text-indigo-400/20 mb-4" />
              <h3 className="text-xl font-bold text-muted-foreground">Vyberte téma k úpravě</h3>
              <p className="text-muted-foreground text-sm max-w-xs mt-2">Nebo vytvořte nové téma pomocí tlačítka plus v levém sloupci.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EditTopics;