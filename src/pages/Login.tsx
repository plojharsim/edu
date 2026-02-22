"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sparkles, GraduationCap, Lock, Unlock, ArrowRight } from 'lucide-react';
import { showError, showSuccess } from '@/utils/toast';

const BETA_CODE = "EDU-BETA-2025"; // Vývojářský kód

const Login = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(localStorage.getItem('beta_access') === 'true');
  const [accessCode, setAccessCode] = useState("");

  useEffect(() => {
    if (session) {
      navigate('/app');
    }
  }, [session, navigate]);

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.trim() === BETA_CODE) {
      localStorage.setItem('beta_access', 'true');
      setIsAuthorized(true);
      showSuccess("Přístup povolen. Vítej v beta testování!");
    } else {
      showError("Neplatný vývojářský kód.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/5 rounded-full blur-[100px]" />
      </div>

      <Card className="w-full max-w-md p-8 md:p-10 rounded-[3rem] border-border shadow-2xl bg-card relative">
        <div className="flex flex-col items-center mb-10">
          <div className="flex gap-2 mb-6">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
              <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-foreground tracking-tight text-center">Edu | Beta verze</h1>
          <p className="text-muted-foreground text-center mt-3 font-medium">
            Aplikace je momentálně v uzavřeném testování.
          </p>
        </div>

        {!isAuthorized ? (
          <form onSubmit={handleVerifyCode} className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-2xl">
              <div className="flex items-center gap-3 text-amber-700 dark:text-amber-400 mb-4">
                <Lock className="w-5 h-5" />
                <span className="font-bold text-sm uppercase tracking-widest">Zamčeno</span>
              </div>
              <div className="space-y-4">
                <Input 
                  type="text"
                  placeholder="Zadej vývojářský kód..."
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="h-14 rounded-xl border-2 border-amber-200 dark:border-amber-900/50 bg-background text-center font-mono tracking-widest"
                />
                <Button className="w-full h-14 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold gap-2">
                  Odemknout přístup <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <p className="text-center text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
              Kód získáš od svého vývojáře nebo správce.
            </p>
          </form>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center justify-center gap-2 mb-6 text-emerald-500 font-bold text-xs uppercase">
               <Unlock className="w-4 h-4" /> Přístup ověřen
             </div>
             <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#4f46e5',
                      brandAccent: '#4338ca',
                      inputBackground: 'transparent',
                      inputText: 'inherit',
                      inputPlaceholder: '#94a3b8',
                    },
                    radii: {
                      buttonRadius: '1.25rem',
                      inputRadius: '1.25rem',
                      containerRadius: '1.5rem',
                    },
                    fonts: {
                      bodyFontFamily: `inherit`,
                      buttonFontFamily: `inherit`,
                      inputFontFamily: `inherit`,
                      labelFontFamily: `inherit`,
                    }
                  }
                },
                className: {
                  container: 'space-y-4',
                  button: 'h-14 font-bold text-lg shadow-lg shadow-indigo-100 dark:shadow-none transition-all hover:scale-[1.02]',
                  input: 'h-14 border-2 border-border focus:border-indigo-400 focus:ring-indigo-400 transition-all bg-background',
                  label: 'text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 mb-2',
                }
              }}
              providers={[]}
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'E-mailová adresa',
                    password_label: 'Heslo',
                    email_input_placeholder: 'Tvůj e-mail',
                    password_input_placeholder: 'Tvé heslo',
                    button_label: 'Přihlásit se',
                    loading_button_label: 'Přihlašování...',
                    link_text: 'Už máš účet? Přihlas se',
                  },
                  sign_up: {
                    email_label: 'E-mailová adresa',
                    password_label: 'Heslo',
                    email_input_placeholder: 'Tvůj e-mail',
                    password_input_placeholder: 'Vytvoř si silné heslo',
                    button_label: 'Vytvořit účet',
                    loading_button_label: 'Vytváření účtu...',
                    link_text: 'Nemáš účet? Zaregistruj se',
                    confirmation_text: 'Zkontroluj si e-mail pro potvrzovací odkaz',
                  },
                  forgotten_password: {
                    email_label: 'E-mailová adresa',
                    password_label: 'Heslo',
                    email_input_placeholder: 'Tvůj e-mail',
                    button_label: 'Odeslat instrukce k obnově',
                    loading_button_label: 'Odesílání...',
                    link_text: 'Zapomněl jsi heslo?',
                    confirmation_text: 'Zkontroluj si e-mail pro instrukce k obnově hesla',
                  }
                }
              }}
            />
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-border flex justify-center">
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            Učení nebylo nikdy jednodušší
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;