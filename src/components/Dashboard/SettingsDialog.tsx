"use client";

import React, { useState } from 'react';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Settings, LogOut, Sun, Moon, User, Trash2, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from '@/components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { dbService } from '@/services/dbService';
import { showError, showSuccess } from '@/utils/toast';

const SettingsDialog = () => {
  const { theme, setTheme } = useTheme();
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    setIsDeleting(true);
    
    try {
      const { error } = await dbService.deleteAccountData(user.id);
      if (error) throw error;
      
      showSuccess("Tvá data byla úspěšně odstraněna.");
      await signOut();
      navigate('/');
    } catch (e: any) {
      showError("Nepodařilo se odstranit data: " + e.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="group rounded-2xl h-12 w-12 bg-card shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-border"
          title="Nastavení"
        >
          <Settings className="w-6 h-6 text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
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
            Uprav si vzhled aplikace nebo spravuj svůj účet.
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
          
          <div className="pt-4 space-y-3">
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="w-full h-12 rounded-xl font-bold gap-2 border-border bg-card hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <LogOut className="w-4 h-4" /> Odhlásit se
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full h-12 rounded-xl font-bold gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  <Trash2 className="w-4 h-4" /> Odstranit účet a data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-[2rem] bg-card border-border">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-foreground">Jsi si opravdu jistý?</AlertDialogTitle>
                  <AlertDialogDescription className="text-muted-foreground">
                    Tato akce je nevratná. Dojde k trvalému smazání tvého profilu, všech vytvořených témat a tvého studijního pokroku.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-xl">Zrušit</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteAccount}
                    className="rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold"
                    disabled={isDeleting}
                  >
                    {isDeleting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Ano, smazat vše
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;