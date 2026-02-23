"use client";

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { Card } from '@/components/ui/card';
import { Sparkles, GraduationCap, Lock, Unlock } from 'lucide-react';
import PaymentGate from '@/components/PaymentGate';
import { Button } from '@/components/ui/button';

const Login = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState<'sign_in' | 'sign_up'>('sign_in');
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
    if (session) {
      navigate('/app');
    }
  }, [session, navigate]);

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
          <h1 className="text-3xl font-black text-foreground tracking-tight text-center">Edu | by plojharsim</h1>
          
          <div className="mt-6 w-full flex bg-muted/30 p-1.5 rounded-2xl gap-1">
            <Button 
              variant={view === 'sign_in' ? 'default' : 'ghost'}
              onClick={() => { setView('sign_in'); setHasPaid(false); }}
              className={`flex-1 rounded-xl h-10 font-bold transition-all ${view === 'sign_in' ? 'bg-indigo-600 shadow-sm' : ''}`}
            >
              Přihlášení
            </Button>
            <Button 
              variant={view === 'sign_up' ? 'default' : 'ghost'}
              onClick={() => setView('sign_up')}
              className={`flex-1 rounded-xl h-10 font-bold transition-all ${view === 'sign_up' ? 'bg-indigo-600 shadow-sm' : ''}`}
            >
              Nová registrace
            </Button>
          </div>
        </div>

        {view === 'sign_up' && !hasPaid ? (
          <PaymentGate onSuccess={() => setHasPaid(true)} />
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {view === 'sign_up' && (
              <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-900/30 flex items-center gap-3">
                <div className="p-2 bg-emerald-500 rounded-lg">
                  <Unlock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="block text-xs font-black uppercase tracking-widest text-emerald-600">Přístup povolen</span>
                  <span className="text-[10px] text-muted-foreground">Platba úspěšně ověřena. Teď si vytvoř účet.</span>
                </div>
              </div>
            )}
            
            <Auth
              supabaseClient={supabase}
              view={view}
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
                    link_text: 'Zpět na přihlášení',
                  },
                  sign_up: {
                    email_label: 'E-mailová adresa',
                    password_label: 'Heslo',
                    email_input_placeholder: 'Tvůj e-mail',
                    password_input_placeholder: 'Vytvoř si silné heslo',
                    button_label: 'Dokončit registraci',
                    loading_button_label: 'Vytváření účtu...',
                    link_text: 'Nemáš účet? Zaregistruj se',
                    confirmation_text: 'Zkontroluj si e-mail pro potvrzovací odkaz',
                  },
                  forgotten_password: {
                    email_label: 'E-mailová adresa',
                    email_input_placeholder: 'Tvůj e-mail',
                    button_label: 'Odeslat instrukce k obnově',
                    loading_button_label: 'Odesílání...',
                    link_text: 'Zapomněl jsi heslo?',
                    confirmation_text: 'Zkontroluj si e-mail pro instrukce k obnově hesla',
                  }
                }
              }}
              showLinks={false}
            />
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-border flex justify-center">
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-2">
            <Lock className="w-3 h-3" /> Zabezpečený přístup Edu
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;