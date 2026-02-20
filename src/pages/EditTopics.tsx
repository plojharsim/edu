"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, ChevronLeft, Save, Edit3, Type, List } from "lucide-react";
import { getStudyData, saveStudyData, Category, Topic, StudyItem } from '@/data/studyData';
import { showSuccess } from '@/utils/toast';

const EditTopics = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Record<string, Category>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  useEffect(() => {
    setData(getStudyData());
  }, []);

  const handleSave = () => {
    saveStudyData(data);
    showSuccess("Všechny změny byly uloženy!");
    navigate('/');
  };

  const addCategory = () => {
    const id = `cat_${Date.now()}`;
    const newData = {
      ...data,
      [id]: { id, title: "Nová kategorie", topics: [] }
    };
    setData(newData);
    setActiveCategory(id);
  };

  const deleteCategory = (id: string) => {
    const newData = { ...data };
    delete newData[id];
    setData(newData);
    if (activeCategory === id) {
      setActiveCategory(null);
      setActiveTopic(null);
    }
  };

  const addTopic = (catId: string) => {
    const topicId = `topic_${Date.now()}`;
    const newData = { ...data };
    newData[catId].topics.push({ id: topicId, name: "Nové téma", items: [] });
    setData(newData);
    setActiveTopic(topicId);
  };

  const deleteTopic = (catId: string, topicId: string) => {
    const newData = { ...data };
    newData[catId].topics = newData[catId].topics.filter(t => t.id !== topicId);
    setData(newData);
    if (activeTopic === topicId) setActiveTopic(null);
  };

  const addItem = (catId: string, topicId: string) => {
    const newData = { ...data };
    const topic = newData[catId].topics.find(t => t.id === topicId);
    if (topic) {
      topic.items.push({
        id: `item_${Date.now()}`,
        term: "",
        definition: "",
        options: ["", "", "", ""]
      });
      setData(newData);
    }
  };

  const updateItem = (catId: string, topicId: string, itemId: string, field: keyof StudyItem, value: any) => {
    const newData = { ...data };
    const topic = newData[catId].topics.find(t => t.id === topicId);
    if (topic) {
      const item = topic.items.find(i => i.id === itemId);
      if (item) {
        (item as any)[field] = value;
        setData(newData);
      }
    }
  };

  const deleteItem = (catId: string, topicId: string, itemId: string) => {
    const newData = { ...data };
    const topic = newData[catId].topics.find(t => t.id === topicId);
    if (topic) {
      topic.items = topic.items.filter(i => i.id !== itemId);
      setData(newData);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] dark:bg-slate-950 p-6 pb-20">
      <header className="max-w-6xl mx-auto mb-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/')} className="rounded-2xl h-12 w-12 bg-white dark:bg-slate-900 shadow-sm">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">Editor témat</h1>
        </div>
        <Button onClick={handleSave} className="rounded-2xl h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-2">
          <Save className="w-5 h-5" /> Uložit vše
        </Button>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sloupec 1: Kategorie */}
        <div className="md:col-span-3 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-500 uppercase text-xs tracking-widest">Kategorie</h2>
            <Button size="icon" variant="ghost" onClick={addCategory} className="h-8 w-8 rounded-full bg-indigo-50 text-indigo-600">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {Object.values(data).map(cat => (
            <div key={cat.id} className="group relative">
              <Button
                variant={activeCategory === cat.id ? "secondary" : "ghost"}
                className={`w-full justify-start h-12 rounded-xl text-left font-bold ${activeCategory === cat.id ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white dark:bg-slate-900 shadow-sm'}`}
                onClick={() => { setActiveCategory(cat.id); setActiveTopic(null); }}
              >
                {cat.title}
              </Button>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteCategory(cat.id); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Sloupec 2: Témata */}
        <div className="md:col-span-3 space-y-4">
          {activeCategory && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-500 uppercase text-xs tracking-widest">Témata</h2>
                <Button size="icon" variant="ghost" onClick={() => addTopic(activeCategory)} className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Input 
                value={data[activeCategory].title}
                onChange={(e) => {
                  const newData = { ...data };
                  newData[activeCategory].title = e.target.value;
                  setData(newData);
                }}
                className="mb-4 font-bold border-2 border-indigo-100"
                placeholder="Název kategorie"
              />
              {data[activeCategory].topics.map(topic => (
                <div key={topic.id} className="group relative">
                  <Button
                    variant={activeTopic === topic.id ? "secondary" : "ghost"}
                    className={`w-full justify-start h-12 rounded-xl text-left font-bold ${activeTopic === topic.id ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-white dark:bg-slate-900 shadow-sm'}`}
                    onClick={() => setActiveTopic(topic.id)}
                  >
                    {topic.name}
                  </Button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteTopic(activeCategory, topic.id); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Sloupec 3: Položky */}
        <div className="md:col-span-6 space-y-6">
          {activeCategory && activeTopic && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-500 uppercase text-xs tracking-widest">Položky tématu</h2>
                <Button onClick={() => addItem(activeCategory, activeTopic)} className="rounded-xl bg-indigo-600 text-white font-bold gap-2">
                  <Plus className="w-4 h-4" /> Přidat kartu
                </Button>
              </div>
              <Input 
                value={data[activeCategory].topics.find(t => t.id === activeTopic)?.name}
                onChange={(e) => {
                  const newData = { ...data };
                  const topic = newData[activeCategory].topics.find(t => t.id === activeTopic);
                  if (topic) topic.name = e.target.value;
                  setData(newData);
                }}
                className="mb-6 font-bold border-2 border-emerald-100"
                placeholder="Název tématu"
              />
              <div className="space-y-4">
                {data[activeCategory].topics.find(t => t.id === activeTopic)?.items.map((item, idx) => (
                  <Card key={item.id} className="p-6 rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-black text-slate-300">#{idx + 1}</span>
                      <Button size="icon" variant="ghost" onClick={() => deleteItem(activeCategory, activeTopic, item.id)} className="text-red-400 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Termín</label>
                        <Input 
                          value={item.term}
                          onChange={(e) => updateItem(activeCategory, activeTopic, item.id, 'term', e.target.value)}
                          placeholder="Např. Dog"
                          className="rounded-xl border-slate-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase text-slate-400">Definice (Odpověď)</label>
                        <Input 
                          value={item.definition}
                          onChange={(e) => updateItem(activeCategory, activeTopic, item.id, 'definition', e.target.value)}
                          placeholder="Např. Pes"
                          className="rounded-xl border-slate-100"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-slate-400">Možnosti (pro ABCD režim)</label>
                      <div className="grid grid-cols-2 gap-2">
                        {item.options.map((opt, optIdx) => (
                          <Input 
                            key={optIdx}
                            value={opt}
                            onChange={(e) => {
                              const newOpts = [...item.options];
                              newOpts[optIdx] = e.target.value;
                              updateItem(activeCategory, activeTopic, item.id, 'options', newOpts);
                            }}
                            placeholder={`Možnost ${optIdx + 1}`}
                            className="rounded-lg border-slate-100 h-9 text-xs"
                          />
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default EditTopics;