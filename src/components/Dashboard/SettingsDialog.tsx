"use client";

import React from 'react';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings, LogOut, Sun, Moon, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from '@/components/AuthProvider';
import { useNavigate } from 'react-router-dom';

const SettingsDialog = () => {
  const { theme, setTheme } = useTheme();
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-2xl h-12 w-12 bg-card shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-border"
          title="Nastavení"
        >
          <Settings className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-[2.5rem] bg-card border-border max-w-sm p-8">
        <DialogHeader>
          <div className="flex justify-center mb-4">
             <div className="p-4 bg-indigo-500/10 rounded-3xl">
               <Settings className="w-8 h-8 text-indigo-600" />
             </div>
          </div>
          <DialogTitle className="text-2xl font-black text-center text-foreground">Nastavení</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Uprav si vzhled aplikace nebo se odhlásit.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-background rounded-xl border border-border">
                {theme === 'dark' ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
              </div>
              <span className="font-bold text-foreground">Tmavý režim</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-xl border-border bg-card shadow-sm"
            >
              {theme === 'dark' ? 'Vypnout' : 'Zapnout'}
            </Button>
          </div>

          <div className="p-4 bg-muted/30 rounded-2xl border border-border flex items-center gap-3">
             <div className="p-2 bg-background rounded-xl border border-border">
                <User className="w-5 h-5 text-indigo-500" />
             </div>
             <div className="flex flex-col overflow-hidden">
               <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Přihlášen jako</span>
               <span className="text-sm font-bold text-foreground truncate">{user?.email}</span>
             </div>
          </div>
          
          <Button 
            variant="destructive" 
            onClick={handleLogout}
            className="w-full h-14 rounded-2xl font-bold text-lg gap-2 mt-4 shadow-lg shadow-red-200 dark:shadow-none"
          >
            <LogOut className="w-5 h-5" /> Odhlásit se
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;