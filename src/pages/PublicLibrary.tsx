"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Globe, BookOpen, PlayCircle, User, Search, GraduationCap } from "lucide-react";
import { dbService } from '@/services/dbService';
import { Topic } from '@/data/studyData';
import LoadingScreen from '@/components/LoadingScreen';
import { useAuth } from '@/components/AuthProvider';
import { Input } from "@/components/ui/input";

const PublicLibrary = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [search, setSearch] = useState("");

  const getItemsLabel = (count: number) => {
    if (count === 1) return "položka";
    if (count >= 2 && count <= 4) return "položky";
    return "položek";
  };

  useEffect(() => {
    const fetchPublic = async () => {
      try {
        setLoading(true);
        const data = await dbService.getPublicTopics();
        setTopics(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchPublic();
  }, []);

  const handleOpen = (topic: Topic) => {
    navigate(`/app/study/public/${topic.id}`);
  };

  const filteredTopics = topics.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.authorName?.toLowerCase().includes(search.toLowerCase()) ||
    t.authorGrade?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingScreen message="Otevírám veřejnou knihovnu..." />;

  return (
    <div className="min-h-screen bg-background p-6 pt-safe flex flex-col items-center">
      <header className="max-w-5xl w-full md:pt-safe-lg mb-10 space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/app')} 
            className="rounded-2xl h-12 w-12 bg-card shadow-sm border border-border flex-shrink-0"
          >
            <ChevronLeft className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-3xl font-black text-foreground">Veřejná knihovna</h1>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Sady od komunity</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Hledat téma, autora nebo úroveň..."
            className="h-14 pl-12 rounded-2xl border-2 border-border bg-card shadow-sm"
          />
        </div>
      </header>

      <main className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic) => (
            <Card key={topic.id} className="p-6 rounded-[2.5rem] border-2 border-border bg-card shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all hover:-translate-y-1">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl">
                    <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-[10px] font-black uppercase text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1 rounded-full">
                    {topic.items.length} {getItemsLabel(topic.items.length)}
                  </span>
                </div>
                
                <h3 className="text-xl font-black text-foreground mb-4 group-hover:text-indigo-600 transition-colors">{topic.name}</h3>
                
                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-bold">{topic.authorName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GraduationCap className="w-4 h-4" />
                    <span className="text-xs font-bold">{topic.authorGrade}</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => handleOpen(topic)}
                className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-2"
              >
                <PlayCircle className="w-4 h-4" /> Otevřít a studovat
              </Button>
            </Card>
          ))
        ) : (
          <div className="md:col-span-2 p-12 text-center bg-card rounded-[3rem] border-2 border-dashed border-border flex flex-col items-center">
            <Globe className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-bold text-muted-foreground">Žádné sady nenalezeny</h3>
            <p className="text-sm text-muted-foreground">Zkus jiné klíčové slovo.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PublicLibrary;