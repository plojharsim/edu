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

const Login = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [betaCode, setBetaCode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(localStorage.getItem('beta_access') === 'true');

  useEffect(() => {
    if (session) {
      navigate('/app');
    }
  }, [session, navigate]);

  const handleUnlock = () => {
    // Definujeme kód pro přístup (např. 'EDU-BETA-2024')
    const SECRET_CODE = "EDU-BETA-2024";
    
    if (betaCode.trim().toUpperCase() === SECRET_CODE) {
      setIsUnlocked(true);
      localStorage.setItem('beta_access', 'true');
      showSuccess("Přístup povolen! Vítej v beta testování.");
    } else {
      showError("Neplatný kód. Kontaktuj vývojáře pro přístup.");
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[100px]" />
        
        <Card className="w-full max-w-md p-10 rounded-[3rem] border-border shadow-2xl bg-card relative z-10 text-center">
          <div className="flex justify-center mb-8">
            <div className="p-5 bg-amber-500 rounded-[2rem] shadow-xl shadow-amber-200 dark:shadow-none animate-bounce">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl font-black text-foreground mb-3">Beta Testování</h1>
          <p className="text-muted-foreground mb-8">
            Aplikace je momentálně v uzavřeném testování. Pro vstup vlož kód od vývojáře.
          </p>
          
          <div className="space-y-4">
            <div className="relative">
              <Input 
                type="text"
                placeholder="Vlož kód přístupu..."
                value={betaCode}
                onChange={(e) => setBetaCode(e.target.value)}
                className="h-14 text-center text-lg font-bold rounded-2xl border-2 border-border focus:border-amber-400 focus:ring-amber-400 transition-all uppercase"
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
              />
            </div>
            <Button 
              onClick={handleUnlock}
              className="w-full h-14 text-lg font-bold rounded-2xl bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-200 dark:shadow-none gap-2"
            >
              Odemknout aplikaci <Unlock className="w-5 h-5" />
            </Button>
          </div>
          
          <p className="mt-8 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Beta v0.1.2 | plojharsim.cz
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dekorativní prvky na pozadí */}
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
          <h1 className="text-3xl font-black text-foreground tracking-tight text-center">Vítej v Edu | by plojharsim</h1>
          <p className="text-muted-foreground text-center mt-3 font-medium">
            Přihlas se a pokračuj ve své cestě za vzděláním
          </p>
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
              },
              update_password: {
                password_label: 'Nové heslo',
                password_input_placeholder: 'Tvé nové heslo',
                button_label: 'Aktualizovat heslo',
                loading_button_label: 'Aktualizace...',
                confirmation_text: 'Heslo bylo úspěšně změněno',
              }
            }
          }}
        />

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