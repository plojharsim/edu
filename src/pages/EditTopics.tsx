"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ChevronLeft, Save, BookText } from "lucide-react";
import { saveUserTopics, Topic, StudyItem } from '@/data/studyData';
import { showSuccess } from '@/utils/toast';

const EditTopics = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);

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
    const newTopic: Topic = { id, name: "Nové téma", items: [] };
    setTopics([...topics, newTopic]);
    setActiveTopicId(id);
  };

  const deleteTopic = (id: string) => {
    setTopics(topics.filter(t => t.id !== id));
    if (activeTopicId === id) setActiveTopicId(null);
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
        isAbcdEnabled: false
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

  return (
    <div className="min-h-screen bg-background p-6 pb-20">
      <header className="max-w-6xl mx-auto mb-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/')} className="rounded-2xl h-12 w-12 bg-card shadow-sm">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">Moje témata</h1>
        </div>
        <Button onClick={handleSave} className="rounded-2xl h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-2">
          <Save className="w-5 h-5" /> Uložit změny
        </Button>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Seznam témat */}
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
          {topics.length === 0 && (
            <p className="text-center py-8 text-slate-400 text-sm italic">Zatím žádná vlastní témata.</p>
          )}
        </div>

        {/* Editor položek */}
        <div className="md:col-span-8 space-y-6">
          {activeTopic ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-500 uppercase text-xs tracking-widest">Položky tématu</h2>
                <Button onClick={() => addItem(activeTopic.id)} className="rounded-xl bg-indigo-600 text-white font-bold gap-2">
                  <Plus className="w-4 h-4" /> Přidat kartu
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
                className="mb-6 h-14 text-xl font-bold border-2 border-indigo-100 dark:border-indigo-900/30 bg-card"
                placeholder="Název tématu"
              />
              <div className="space-y-4">
                {activeTopic.items.map((item, idx) => (
                  <Card key={item.id} className="p-6 rounded-[2rem] border-none shadow-sm bg-card relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500" />
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-black text-slate-300 dark:text-slate-700">#{idx + 1}</span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id={`abcd-${item.id}`} 
                            checked={item.isAbcdEnabled}
                            onCheckedChange={(val) => updateItem(activeTopic.id, item.id, 'isAbcdEnabled', val)}
                          />
                          <Label htmlFor={`abcd-${item.id}`} className="text-xs font-bold text-slate-500">ABCD režim</Label>
                        </div>
                        <Button size="icon" variant="ghost" onClick={() => deleteItem(activeTopic.id, item.id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Termín / Otázka</label>
                        <Input 
                          value={item.term}
                          onChange={(e) => updateItem(activeTopic.id, item.id, 'term', e.target.value)}
                          placeholder="Např. Dog"
                          className="h-12 rounded-xl border-slate-100 dark:border-slate-800 bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Definice / Správná odpověď</label>
                        <Input 
                          value={item.definition}
                          onChange={(e) => updateItem(activeTopic.id, item.id, 'definition', e.target.value)}
                          placeholder="Např. Pes"
                          className="h-12 rounded-xl border-slate-100 dark:border-slate-800 bg-background"
                        />
                      </div>
                    </div>

                    {item.isAbcdEnabled && (
                      <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Špatné odpovědi (Distraktory)</label>
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