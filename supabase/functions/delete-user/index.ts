import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Ošetření CORS pro prohlížeč
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', // Potřebujeme admin práva pro mazání auth uživatelů
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )

    // Ověření, že uživatel maže svůj vlastní účet
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Chybí autorizační hlavička')
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(authHeader.replace('Bearer ', ''))
    
    if (authError || !user) {
      throw new Error('Neautorizovaný přístup')
    }

    console.log(`[delete-user] Mažu uživatele: ${user.id}`);

    // Smazání uživatele z auth.users (toto automaticky smaže i data v public schématu díky kaskádám)
    const { error: deleteError } = await supabaseClient.auth.admin.deleteUser(user.id)

    if (deleteError) {
      throw deleteError
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error("[delete-user] Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})