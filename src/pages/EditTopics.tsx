"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, Trash2, ChevronLeft, Save, BookText, Layers, 
  CheckSquare, Keyboard, BookOpen, ArrowLeftRight, 
  Share2, Download, Code, Copy, Check, LayoutPanelTop,
  Sparkles, Loader2, Image as ImageIcon, X, Upload,
  Calculator, Settings2
} from "lucide-react";
import { Topic, StudyItem, StudyMode, MathConfig } from '@/data/studyData';
import { showSuccess, showError } from '@/utils/toast';
import { encodeTopic, decodeTopic } from '@/lib/sharing';
import AITopicGenerator from '@/components/AITopicGenerator';
import { useAuth } from '@/components/AuthProvider';
import { dbService } from '@/services/dbService';
import LoadingScreen from '@/components/LoadingScreen';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
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
  const [loading, setLoading] = useState(true);

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
    setIsSaving(true);
    try {
      await Promise.all(topics.map(t => dbService.saveTopic(user.id, t)));
      showSuccess("Změny uloženy!");
      navigate('/app');
    } catch (e) {
      showError("Chyba při ukládání.");
    } finally {
      setIsSaving(false);
    }
  };

  const addTopic = (newTopicData?: Topic) => {
    const id = newTopicData?.id || `topic_${Date.now()}`;
    const newTopic: Topic = newTopicData || { 
      id, 
      name: "Nové téma", 
      items: [],
      allowedModes: ['flashcards', 'abcd', 'writing', 'matching', 'sorting'],
      randomizeDirection: false
    };
    setTopics([...topics, newTopic]);
    setActiveTopicId(id);
  };

  const deleteTopic = async (id: string) => {
    if (!id.startsWith('topic_') && !id.startsWith('ai_') && !id.startsWith('imported_')) {
      await dbService.deleteTopic(id);
    }
    setTopics(topics.filter(t => t.id !== id));
    if (activeTopicId === id) setActiveTopicId(null);
  };

  const updateActiveTopic = (updates: Partial<Topic>) => {
    setTopics(topics.map(t => t.id === activeTopicId ? { ...t, ...updates } : t));
  };

  const MATH_OPERATIONS = [
    { id: 'addition', label: 'Sčítání' },
    { id: 'subtraction', label: 'Odčítání' },
    { id: 'multiplication', label: 'Násobení' },
    { id: 'division', label: 'Dělení' },
    { id: 'fractions', label: 'Zlomky' },
    { id: 'equations', label: 'Rovnice' },
    { id: 'powers', label: 'Mocniny' },
    { id: 'units', label: 'Převody jednotek' }
  ];

  const activeTopic = topics.find(t => t.id === activeTopicId);

  if (loading) return <LoadingScreen message="Načítám knihovnu..." />;

  return (
    <div className="min-h-screen bg-background p-6 pt-safe">
      <header className="max-w-6xl mx-auto mb-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/app')} className="rounded-2xl h-12 w-12 bg-card border border-border">
            <ChevronLeft className="w-6 h-6 text-indigo-600" />
          </Button>
          <h1 className="text-3xl font-black text-foreground">Moje témata</h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsAIGeneratorOpen(true)} className="rounded-2xl h-12 px-6 bg-indigo-500/10 text-indigo-600 font-black border-2 border-indigo-500/30 gap-2"><Sparkles className="w-5 h-5" /> AI</Button>
          <Button onClick={handleSaveAll} disabled={isSaving} className="rounded-2xl h-12 px-8 bg-indigo-600 text-white font-bold gap-2">
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} Uložit
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-4 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-muted-foreground uppercase text-xs tracking-widest">Seznam témat</h2>
            <Button size="icon" variant="ghost" onClick={() => addTopic()} className="h-8 w-8 rounded-full bg-indigo-500/10 text-indigo-600"><Plus className="w-4 h-4" /></Button>
          </div>
          {topics.map(topic => (
            <div key={topic.id} className="group relative">
              <Button
                variant={activeTopicId === topic.id ? "secondary" : "ghost"}
                className={`w-full justify-start h-14 rounded-xl font-bold border transition-all ${activeTopicId === topic.id ? 'bg-indigo-600 text-white' : 'bg-card border-border'}`}
                onClick={() => setActiveTopicId(topic.id)}
              >
                {topic.isMathTopic ? <Calculator className="mr-3 w-5 h-5" /> : <BookText className="mr-3 w-5 h-5 text-indigo-500/50" />}
                <span className="truncate pr-6">{topic.name}</span>
              </Button>
              <button onClick={() => deleteTopic(topic.id)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>

        <div className="col-span-12 md:col-span-8 space-y-6">
          {activeTopic ? (
            <>
              <div className="bg-card p-8 rounded-[3rem] border border-border shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <Switch 
                      id="is-math" 
                      checked={activeTopic.isMathTopic} 
                      onCheckedChange={(val) => updateActiveTopic({ 
                        isMathTopic: val, 
                        allowedModes: val ? ['math'] : ['flashcards', 'abcd', 'writing', 'matching', 'sorting'],
                        mathConfig: val ? { operations: ['addition'], difficulty: 'medium', count: 10 } : undefined
                      })} 
                    />
                    <Label htmlFor="is-math" className="font-black text-rose-500 uppercase tracking-widest text-xs">Matematický generátor</Label>
                  </div>
                </div>

                <Input 
                  value={activeTopic.name}
                  onChange={(e) => updateActiveTopic({ name: e.target.value })}
                  className="mb-8 h-16 text-2xl font-black border-2 border-border bg-background"
                  placeholder="Název tématu"
                />

                {activeTopic.isMathTopic ? (
                  <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="p-6 bg-rose-500/5 rounded-[2rem] border-2 border-rose-500/10">
                      <h3 className="text-sm font-black text-rose-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Settings2 className="w-4 h-4" /> Nastavení generátoru
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-muted-foreground">Obtížnost</label>
                          <Select 
                            value={activeTopic.mathConfig?.difficulty} 
                            onValueChange={(val: any) => updateActiveTopic({ mathConfig: { ...activeTopic.mathConfig!, difficulty: val } })}
                          >
                            <SelectTrigger className="h-12 rounded-xl bg-background border-border">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="easy">Lehká (do 20)</SelectItem>
                              <SelectItem value="medium">Střední (do 100)</SelectItem>
                              <SelectItem value="hard">Těžká (do 500)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-muted-foreground">Počet příkladů</label>
                          <Input 
                            type="number"
                            value={activeTopic.mathConfig?.count}
                            onChange={(e) => updateActiveTopic({ mathConfig: { ...activeTopic.mathConfig!, count: parseInt(e.target.value) || 1 } })}
                            className="h-12 rounded-xl bg-background border-border"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground block">Typy operací k procvičení</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {MATH_OPERATIONS.map(op => (
                            <div key={op.id} className="flex items-center space-x-3 p-3 bg-background rounded-xl border border-border">
                              <Checkbox 
                                id={`math-op-${op.id}`}
                                checked={activeTopic.mathConfig?.operations.includes(op.id)}
                                onCheckedChange={(val) => {
                                  const current = activeTopic.mathConfig?.operations || [];
                                  const next = val 
                                    ? [...current, op.id]
                                    : current.filter(id => id !== op.id);
                                  if (next.length > 0) updateActiveTopic({ mathConfig: { ...activeTopic.mathConfig!, operations: next } });
                                }}
                              />
                              <Label htmlFor={`math-op-${op.id}`} className="font-bold text-xs cursor-pointer">{op.label}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Původní nastavení pro běžná témata (beze změn) */}
                    <div className="flex flex-col gap-4">
                       <Button onClick={() => updateActiveTopic({ items: [...activeTopic.items, { term: "", definition: "", options: ["","",""] }] })} className="w-full h-14 rounded-2xl bg-indigo-600 text-white font-bold">Přidat kartu</Button>
                       <div className="space-y-4">
                         {activeTopic.items.map((item, idx) => (
                           <Card key={idx} className="p-6 rounded-[2rem] border border-border bg-card relative">
                              <Button size="icon" variant="ghost" onClick={() => updateActiveTopic({ items: activeTopic.items.filter((_, i) => i !== idx) })} className="absolute top-4 right-4 text-red-400"><Trash2 className="w-4 h-4"/></Button>
                              <div className="grid grid-cols-2 gap-4">
                                <Input value={item.term} onChange={(e) => {
                                  const newItems = [...activeTopic.items];
                                  newItems[idx].term = e.target.value;
                                  updateActiveTopic({ items: newItems });
                                }} placeholder="Termín" className="h-12 rounded-xl"/>
                                <Input value={item.definition} onChange={(e) => {
                                  const newItems = [...activeTopic.items];
                                  newItems[idx].definition = e.target.value;
                                  updateActiveTopic({ items: newItems });
                                }} placeholder="Definice" className="h-12 rounded-xl"/>
                              </div>
                           </Card>
                         ))}
                       </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 text-center bg-card rounded-[3rem] border-2 border-dashed border-border">
              <Calculator className="w-16 h-16 text-indigo-500/20 mb-4" />
              <h3 className="text-xl font-bold text-muted-foreground">Vyberte téma nebo vytvořte nové</h3>
            </div>
          )}
        </div>
      </main>

      <AITopicGenerator isOpen={isAIGeneratorOpen} onOpenChange={setIsAIGeneratorOpen} onTopicGenerated={(newTopic) => addTopic(newTopic)} />
    </div>
  );
};

export default EditTopics;