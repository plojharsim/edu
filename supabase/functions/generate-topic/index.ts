import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

    // 1. Authenticate User
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Unauthorized');

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(authHeader.replace('Bearer ', ''));
    if (authError || !user) throw new Error('Unauthorized');

    // 2. Get User's API Key from Database
    const { data: secretData, error: secretError } = await supabaseClient
      .from('user_secrets')
      .select('gemini_key')
      .eq('user_id', user.id)
      .maybeSingle();

    if (secretError || !secretData?.gemini_key) {
      return new Response(JSON.stringify({ error: 'NO_API_KEY', message: 'Prosím vlož svůj Gemini API klíč v nastavení AI.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    const { prompt, files } = await req.json();

    // 3. Call Gemini API
    const systemPrompt = `Jsi asistent pro tvorbu studijních materiálů. Tvým úkolem je vytvořit seznam termínů a definic pro studijní aplikaci. 
    Analyzuj veškerý obsah (text, obrázky, dokumenty) a vytvoř studijní sadu.
    
    KRITICKÝ POŽADAVEK: Vždy vygeneruj 3 chybné odpovědi (options). Tyto chybné odpovědi musí být délkou, stylem a formátem velmi podobné té správné (definition), aby nebylo na první pohled poznat, která je správná.
    
    Odpověz VŽDY A POUZE ve formátu JSON bez jakéhokoliv dalšího textu, který odpovídá této struktuře:
    {
      "name": "Název tématu",
      "items": [
        { 
          "term": "otázka", 
          "definition": "odpověď", 
          "options": ["chyba 1", "chyba 2", "chyba 3"],
          "category": "kategorie"
        }
      ]
    }`;

    const contents = [
      {
        role: "user",
        parts: [
          { text: systemPrompt + `\n\nTextové zadání: "${prompt || "Vytvoř studijní sadu z přiložených podkladů."}"` },
          ...(files || []).map((file: any) => ({
            inline_data: {
              mime_type: file.mimeType,
              data: file.data
            }
          }))
        ]
      }
    ];

    console.log(`[generate-topic] Requesting Gemini for user: ${user.id}`);

    // Používáme specifikovaný model gemini-3-flash-preview
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${secretData.gemini_key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents })
    });

    const result = await geminiResponse.json();
    
    if (!geminiResponse.ok) {
      throw new Error(result.error?.message || 'Gemini API Error');
    }

    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const jsonStr = text.replace(/```json|```/gi, "").trim();
    
    return new Response(jsonStr, {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error("[generate-topic] Error:", error.message);
    return new Response(JSON.stringify({ error: 'GENERATION_FAILED', message: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
})