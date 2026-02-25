"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Trophy, Medal, Star, Flame, GraduationCap, PlayCircle } from "lucide-react";
import { dbService } from '@/services/dbService';
import LoadingScreen from '@/components/LoadingScreen';
import { cn } from '@/lib/utils';

interface LeaderboardEntry {
  average: number;
  sessions: number;
  streak: number;
  profiles: {
    name: string;
    grade: string;
  };
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const entries = await dbService.getLeaderboard();
        setData(entries as any);
      } catch (error) {
        console.error("Chyba při načítání žebříčku:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <LoadingScreen message="Sestavuji síň slávy..." />;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 pt-safe flex flex-col items-center">
      <header className="max-w-4xl w-full md:pt-safe-lg mb-8 sm:mb-10 flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/app')} 
          className="rounded-2xl h-12 w-12 bg-card shadow-sm border border-border flex-shrink-0"
        >
          <ChevronLeft className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </Button>
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">Žebříček</h1>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Top 10 studentů</p>
        </div>
      </header>

      <main className="max-w-4xl w-full space-y-4">
        {data && data.length > 0 ? (
          data.map((entry, index) => (
            <Card 
              key={index} 
              className={cn(
                "p-4 sm:p-6 rounded-[2rem] border-2 transition-all flex items-center justify-between gap-2 sm:gap-4 overflow-hidden relative",
                index === 0 ? "border-amber-400 bg-amber-50/30 dark:bg-amber-950/10 shadow-lg shadow-amber-100" : "border-border bg-card"
              )}
            >
              <div className="flex items-center gap-3 sm:gap-6 z-10 min-w-0">
                <div className={cn(
                  "w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-black text-lg sm:text-xl shrink-0",
                  index === 0 ? "bg-amber-400 text-white" : 
                  index === 1 ? "bg-slate-300 text-slate-700" : 
                  index === 2 ? "bg-amber-700 text-white" : "bg-muted text-muted-foreground"
                )}>
                  {index === 0 ? <Trophy className="w-6 h-6" /> : index + 1}
                </div>
                
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-foreground text-sm sm:text-xl truncate">
                      {entry.profiles?.name || "Anonymní student"}
                    </span>
                    {index === 0 && <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />}
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] sm:text-xs font-bold uppercase tracking-tighter">
                    <GraduationCap className="w-3 h-3" />
                    <span className="truncate">{entry.profiles?.grade || "Nezadáno"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-8 shrink-0 z-10">
                <div className="flex flex-col items-center">
                  <span className="text-base sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 leading-none">
                    {Math.round(entry.average)}%
                  </span>
                  <span className="text-[8px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">Průměr</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
                    <span className="text-base sm:text-2xl font-black text-foreground leading-none">{entry.streak}</span>
                  </div>
                  <span className="text-[8px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">Série</span>
                </div>

                <div className="hidden xs:flex flex-col items-center">
                  <span className="text-base sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 leading-none">
                    {entry.sessions}
                  </span>
                  <span className="text-[8px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">Lekcí</span>
                </div>
              </div>

              {index === 0 && <Trophy className="absolute -right-4 -bottom-4 w-24 h-24 text-amber-500/10 -rotate-12 pointer-events-none" />}
            </Card>
          ))
        ) : (
          <div className="p-12 text-center bg-card rounded-[3rem] border-2 border-dashed border-border flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <div className="p-6 bg-indigo-50 dark:bg-indigo-950/30 rounded-full mb-6">
              <Medal className="w-16 h-16 text-indigo-500/40" />
            </div>
            <h3 className="text-2xl font-black text-foreground mb-2">Zatím tu nikdo není</h3>
            <p className="text-muted-foreground max-w-xs mx-auto mb-8 font-medium">
              Buď první, kdo dokončí studijní lekci a zapíše se do historie naší síně slávy!
            </p>
            <Button 
              onClick={() => navigate('/app')}
              className="h-14 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg gap-3 shadow-xl shadow-indigo-200 dark:shadow-none"
            >
              <PlayCircle className="w-6 h-6" /> Začít se učit
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Leaderboard;