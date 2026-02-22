"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { KeyRound, ShieldCheck, Loader2 } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      showError("Heslo musí mít alespoň 6 znaků.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      showError("Nepodařilo se aktualizovat heslo: " + error.message);
    } else {
      showSuccess("Heslo bylo úspěšně změněno!");
      navigate('/app');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-10 rounded-[3rem] border-border shadow-2xl bg-card relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl opacity-50" />
        
        <div className="relative z-10">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-indigo-600 rounded-3xl shadow-lg shadow-indigo-200 dark:shadow-none">
              <KeyRound className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-foreground mb-2">Nové heslo</h1>
            <p className="text-muted-foreground">Zadej si své nové bezpečné heslo k účtu.</p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nové heslo (min. 6 znaků)"
                className="h-14 pl-12 text-lg rounded-2xl border-2 border-border focus:border-indigo-400 focus:ring-indigo-400 bg-background"
                autoFocus
              />
            </div>

            <Button 
              type="submit"
              disabled={loading}
              className="w-full h-14 text-lg font-bold rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              Uložit nové heslo
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default UpdatePassword;