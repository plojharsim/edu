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

    const { prompt, images } = await req.json();

    // 3. Call Gemini API
    const systemPrompt = `Jsi asistent pro tvorbu studijních materiálů. Tvým úkolem je vytvořit seznam termínů a definic pro studijní aplikaci. 
    Analyzuj veškerý obsah (textové zadání, nahrané fotografie poznámek nebo dokumenty jako PDF/Word) a vytvoř komplexní studijní sadu.
    
    POŽADAVKY:
    1. Vytvoř logický název tématu.
    2. Vytvoř seznam termínů (term) a jejich definic (definition).
    3. KRITICKÝ POŽADAVEK: Pro každou položku vygeneruj 3 chybné odpovědi (options). Tyto chybné odpovědi musí být věrohodné a formátem velmi podobné té správné, aby nebylo hned poznat, která je správná.
    4. Pokud to dává smysl, rozděl položky do kategorií (category).
    
    Odpověz VŽDY A POUZE ve formátu JSON bez jakéhokoliv dalšího textu:
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
          { text: systemPrompt + `\n\nZadání uživatele: "${prompt || "Vytvoř studijní sadu z přiložených souborů."}"` },
          ...(images || []).map((img: any) => ({
            inline_data: {
              mime_type: img.mimeType,
              data: img.data
            }
          }))
        ]
      }
    ];

    console.log(`[generate-topic] Requesting Gemini for user: ${user.id}`);

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