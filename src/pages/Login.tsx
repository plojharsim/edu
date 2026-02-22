"use client";

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

const Login = () => {
  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/app');
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 rounded-[2.5rem] border-border shadow-2xl bg-card">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-indigo-600 rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-foreground">Vítej v Edu</h1>
          <p className="text-muted-foreground text-center mt-2">Přihlas se a pokračuj ve studiu</p>
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
                },
                radii: {
                  buttonRadius: '1rem',
                  inputRadius: '1rem',
                }
              }
            }
          }}
          providers={[]}
          localization={{
            variables: {
              sign_in: {
                email_label: 'E-mail',
                password_label: 'Heslo',
                button_label: 'Přihlásit se',
                loading_button_label: 'Přihlašování...',
                social_provider_text: 'Přihlásit se přes {{provider}}',
                link_text: 'Už máš účet? Přihlas se',
              },
              sign_up: {
                email_label: 'E-mail',
                password_label: 'Heslo',
                button_label: 'Zaregistrovat se',
                loading_button_label: 'Registrace...',
                link_text: 'Nemáš účet? Zaregistruj se',
              }
            }
          }}
        />
      </Card>
    </div>
  );
};

export default Login;