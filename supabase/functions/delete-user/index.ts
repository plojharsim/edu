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

    // Get client IP for rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const action = 'delete-user';

    // 1. Rate Limiting Check (Max 3 attempts per 10 minutes per IP)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    
    const { count, error: countError } = await supabaseClient
      .from('request_logs')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', clientIp)
      .eq('action', action)
      .gt('created_at', tenMinutesAgo);

    if (countError) throw countError;

    if (count && count >= 3) {
      console.warn(`[delete-user] Rate limit exceeded for IP: ${clientIp}`);
      return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 429,
      });
    }

    // 2. Log the attempt
    await supabaseClient.from('request_logs').insert({
      ip_address: clientIp,
      action: action
    });

    // 3. Authenticate User
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Chybí autorizační hlavička')
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(authHeader.replace('Bearer ', ''))
    
    if (authError || !user) {
      throw new Error('Neautorizovaný přístup')
    }

    console.log(`[delete-user] Mažu uživatele: ${user.id}`);

    // 4. Delete user
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