"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Globe, Search, BookOpen, User, ArrowRight, Download } from "lucide-react";
import { dbService } from '@/services/dbService';
import LoadingScreen from '@/components/LoadingScreen';
import { showSuccess } from '@/utils/toast';
import { useAuth } from '@/components/AuthProvider';

const PublicLibrary = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPublic = async () => {
      try {
        setLoading(true);
        const data = await dbService.getPublicTopics();
        setTopics(data);
      } finally {
        setLoading(false);
      }
    };
    fetchPublic();
  }, []);

  const handleImport = async (topic: any) => {
    if (!user) return;
    try {
      const topicToImport = {
        ...topic,
        id: `topic_${Date.now()}`,
        isPublic: false // Importovaná verze je soukromá
      };
      await dbService.saveTopic(user.id, topicToImport);
      showSuccess(`Téma "${topic.name}" bylo přidáno do tvé knihovny!`);
    } catch (e) {
      console.error(e);
    }
  };

  const filteredTopics = topics.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.authorName?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingScreen message="Otevírám veřejnou knihovnu..." />;

  return (
    <div className="min-h-screen bg-background p-6 pt-safe flex flex-col items-center">
      <header className="max-w-6xl w-full md:pt-safe-lg mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/app')} 
            className="rounded-2xl h-12 w-12 bg-card shadow-sm border border-border flex-shrink-0"
          >
            <ChevronLeft className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </Button>
          <div>
            <h1 className="text-3xl font-black text-foreground">Veřejná knihovna</h1>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <Globe className="w-3 h-3" /> Sdílené sady od komunity
            </p>
          </div>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Hledat téma nebo autora..."
            className="h-12 pl-12 rounded-2xl border-border bg-card shadow-sm"
          />
        </div>
      </header>

      <main className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic) => (
            <Card key={topic.id} className="p-6 rounded-[2.5rem] border-border bg-card shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl">
                  <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                  <User className="w-3 h-3" />
                  <span className="truncate max-w-[100px]">{topic.authorName}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-1">{topic.name}</h3>
              <p className="text-xs text-muted-foreground font-bold uppercase mb-6">{topic.items.length} položek</p>

              <div className="mt-auto flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => handleImport(topic)}
                  className="flex-1 rounded-xl h-12 gap-2 border-border hover:bg-indigo-50 dark:hover:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 font-bold text-xs"
                >
                  <Download className="w-4 h-4" /> Uložit k sobě
                </Button>
                <Button 
                  onClick={() => navigate(`/app/study/custom/${topic.id}`)}
                  className="rounded-xl h-12 w-12 bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                >
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-20 text-center flex flex-col items-center">
            <Globe className="w-16 h-16 text-muted-foreground/20 mb-4" />
            <h3 className="text-xl font-bold text-muted-foreground">Žádné sady nenalezeny</h3>
            <p className="text-sm text-muted-foreground/60">Zkus změnit hledaný výraz nebo se vrať později.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PublicLibrary;