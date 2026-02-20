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
  Plus, 
  Trash2, 
  ChevronLeft, 
  Save, 
  BookText, 
  Layers, 
  CheckSquare, 
  Keyboard, 
  BookOpen, 
  ArrowLeftRight,
  Share2,
  Download
} from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { saveUserTopics, Topic, StudyItem, StudyMode } from '@/data/studyData';
import { showSuccess, showError } from '@/utils/toast';

const EditTopics = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [importCode, setImportCode] = useState("");
  const [isImportOpen, setIsImportOpen] = useState(false);

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

  const deleteTopic = (id: string) => {
    setTopics(topics.filter(t => t.id !== id));
    if (activeTopicId === id) setActiveTopicId(null);
  };

  const shareTopic = (topic: Topic) => {
    try {
      // Create a clean copy for sharing (remove local IDs if necessary, but here we keep them)
      const shareData = JSON.stringify(topic);
      const code = btoa(unescape(encodeURIComponent(shareData)));
      navigator.clipboard.writeText(code);
      showSuccess("Kód tématu byl zkopírován do schránky!");
    } catch (e) {
      showError("Nepodařilo se vygenerovat kód.");
    }
  };

  const handleImport = () => {
    try {
      const decodedData = decodeURIComponent(escape(atob(importCode)));
      const importedTopic: Topic = JSON.parse(decodedData);
      
      // Ensure unique ID
      importedTopic.id = `topic_${Date.now()}`;
      
      setTopics([...topics, importedTopic]);
      setImportCode("");
      setIsImportOpen(false);
      setActiveTopicId(importedTopic.id);
      showSuccess(`Téma "${importedTopic.name}" bylo importováno!`);
    } catch (e) {
      showError("Neplatný kód tématu.");
    }
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
      <header className="max-w-6xl mx-auto mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/')} className="rounded-2xl h-12 w-12 bg-card shadow-sm">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">Moje témata</h1>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-2xl h-12 px-6 border-2 border-slate-100 dark:border-slate-800 font-bold gap-2">
                <Download className="w-5 h-5" /> Importovat
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[2rem]">
              <DialogHeader>
                <DialogTitle>Importovat téma</DialogTitle>
                <DialogDescription>
                  Vložte kód tématu, který vám někdo nasdílel.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Input 
                  value={importCode}
                  onChange={(e) => setImportCode(e.target.value)}
                  placeholder="Vložte kód zde..."
                  className="h-12 rounded-xl"
                />
              </div>
              <DialogFooter>
                <Button onClick={handleImport} className="rounded-xl bg-indigo-600 font-bold">Importovat</Button>
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
            <h2 className="font-bold text-slate-500 uppercase text-xs tracking-widest">Témata ve "Vlastní"</h2>
            <Button size="icon" variant="ghost" onClick={addTopic} className="h-8 w-8 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {topics.map(topic => (
            <div key={topic.id} className="group relative">
              <Button
                variant={activeTopicId === topic.id ? "secondary" : "ghost"}
                className={`w-full justify-start h-14 rounded-xl text-left font-bold transition-all ${activeTopicId === topic.id ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-card shadow-sm'}`}
                onClick={() => setActiveTopicId(topic.id)}
              >
                <BookText className="mr-3 w-5 h-5 opacity-50" />
                <span className="truncate pr-16">{topic.name}</span>
              </Button>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 transition-all">
                <button 
                  onClick={(e) => { e.stopPropagation(); shareTopic(topic); }}
                  className="p-2 text-indigo-400 hover:text-indigo-600"
                  title="Sdílet téma"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteTopic(topic.id); }}
                  className="p-2 text-red-400 hover:text-red-600"
                  title="Smazat téma"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {topics.length === 0 && (
            <div className="p-6 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl">
              <p className="text-slate-400 text-sm">Zatím žádná témata</p>
            </div>
          )}
        </div>

        <div className="md:col-span-8 space-y-6">
          {activeTopic ? (
            <>
              <div className="bg-card p-6 rounded-[2rem] shadow-sm mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-slate-500 uppercase text-xs tracking-widest">Základní nastavení</h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => shareTopic(activeTopic)}
                    className="rounded-xl border-indigo-100 dark:border-indigo-900/30 text-indigo-600 font-bold gap-2 h-9 px-4"
                  >
                    <Share2 className="w-4 h-4" /> Sdílet toto téma
                  </Button>
                </div>
                <Input 
                  value={activeTopic.name}
                  onChange={(e) => {
                    const newTopics = [...topics];
                    const t = newTopics.find(x => x.id === activeTopic.id);
                    if (t) t.name = e.target.value;
                    setTopics(newTopics);
                  }}
                  className="mb-6 h-14 text-xl font-bold border-2 border-indigo-100 dark:border-indigo-900/30 bg-background"
                  placeholder="Název tématu"
                />

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">Povolené studijní režimy</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {MODES.map(mode => (
                        <div key={mode.id} className="flex items-center space-x-3 p-4 bg-background rounded-2xl border border-slate-100 dark:border-slate-800">
                          <Checkbox 
                            id={`mode-${mode.id}`}
                            checked={(activeTopic.allowedModes || ['flashcards', 'abcd', 'writing', 'matching']).includes(mode.id)}
                            onCheckedChange={() => toggleMode(activeTopic.id, mode.id)}
                          />
                          <Label htmlFor={`mode-${mode.id}`} className="flex items-center gap-2 cursor-pointer font-medium">
                            <mode.icon className="w-4 h-4 text-indigo-500" />
                            {mode.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl">
                        <ArrowLeftRight className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <Label htmlFor="random-direction" className="font-bold text-slate-800 dark:text-slate-100 block">Náhodný směr otázek</Label>
                        <span className="text-xs text-slate-500 dark:text-slate-400">Randomizuje, co bude otázka a co odpověď.</span>
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

              <div className="flex items-center justify-between mb-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h2 className="font-bold text-slate-500 uppercase text-xs tracking-widest">Karty v tématu ({activeTopic.items.length})</h2>
                <Button onClick={() => addItem(activeTopic.id)} className="rounded-xl bg-indigo-600 text-white font-bold gap-2">
                  <Plus className="w-4 h-4" /> Přidat kartu
                </Button>
              </div>

              <div className="space-y-4">
                {activeTopic.items.map((item, idx) => (
                  <Card key={item.id} className="p-6 rounded-[2rem] border-none shadow-sm bg-card relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500" />
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-black text-slate-300 dark:text-slate-700">#{idx + 1}</span>
                      <Button size="icon" variant="ghost" onClick={() => deleteItem(activeTopic.id, item.id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Termín (Otázka)</label>
                        <Input 
                          value={item.term}
                          onChange={(e) => updateItem(activeTopic.id, item.id, 'term', e.target.value)}
                          placeholder="Např. Dog"
                          className="h-12 rounded-xl border-slate-100 dark:border-slate-800 bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Definice (Odpověď)</label>
                        <Input 
                          value={item.definition}
                          onChange={(e) => updateItem(activeTopic.id, item.id, 'definition', e.target.value)}
                          placeholder="Např. Pes"
                          className="h-12 rounded-xl border-slate-100 dark:border-slate-800 bg-background"
                        />
                      </div>
                    </div>

                    {isAbcdModeEnabled && (
                      <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Špatné odpovědi</label>
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
                              className="rounded-lg border-slate-200 dark:border-slate-800 h-10 text-sm bg-background"
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
            <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-card rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
              <BookText className="w-16 h-16 text-slate-200 dark:text-slate-800 mb-4" />
              <h3 className="text-xl font-bold text-slate-400">Vyberte téma k úpravě</h3>
              <p className="text-slate-400 text-sm max-w-xs mt-2">Nebo vytvořte nové téma pomocí tlačítka plus v levém sloupci.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EditTopics;