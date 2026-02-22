"use client";

import React, { useState, useEffect } from 'react';
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, LogOut, Sun, Moon, User, Trash2, Loader2, Save, GraduationCap } from "lucide-react";
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
  const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const profile = await dbService.getProfile(user.id);
      if (profile) {
        setName(profile.name || '');
        setGrade(profile.grade || '');
      }
    };
    fetchProfile();
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user || !name) return;
    setIsUpdating(true);
    const { error } = await dbService.updateProfile(user.id, name, grade);
    
    if (error) {
      showError("Nepodařilo se aktualizovat profil.");
    } else {
      showSuccess("Profil byl úspěšně aktualizován!");
      // Malý trik pro osvěžení dat na Index.tsx bez úplného reloadu
      window.location.reload();
    }
    setIsUpdating(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    setIsDeleting(true);
    
    try {
      await dbService.deleteAccount();
      showSuccess("Tvůj účet a všechna data byla trvale odstraněna.");
      await signOut();
      navigate('/');
    } catch (e: any) {
      showError("Nepodařilo se smazat účet: " + e.message);
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
      <DialogContent className="rounded-[2.5rem] bg-card border-border max-w-sm p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-center mb-4">
             <div className="p-4 bg-indigo-500/10 rounded-3xl">
               <Settings className="w-8 h-8 text-indigo-600" />
             </div>
          </div>
          <DialogTitle className="text-2xl font-black text-center text-foreground">Nastavení</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Uprav si svůj profil nebo vzhled aplikace.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Sekce Profilu */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Můj Profil</h3>
            <div className="space-y-3">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jméno"
                  className="h-11 pl-10 rounded-xl bg-muted/30 border-border"
                />
              </div>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="Ročník (např. 8.B)"
                  className="h-11 pl-10 rounded-xl bg-muted/30 border-border"
                />
              </div>
              <Button 
                onClick={handleUpdateProfile}
                disabled={isUpdating || !name}
                className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold gap-2"
              >
                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Uložit změny v profilu
              </Button>
            </div>
          </div>

          <div className="h-[1px] bg-border" />

          {/* Ostatní nastavení */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Aplikace</h3>
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
               <div className="p-2 bg-background rounded-xl border border-border shrink-0">
                  <User className="w-5 h-5 text-indigo-500" />
               </div>
               <div className="flex flex-col overflow-hidden">
                 <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Účet</span>
                 <span className="text-sm font-bold text-foreground truncate">{user?.email}</span>
               </div>
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
                    Tato akce je nevratná. Dojde k trvalému smazání tvého přihlašovacího účtu, všech vytvořených témat a tvého studijního pokroku.
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
                    Ano, smazat účet
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