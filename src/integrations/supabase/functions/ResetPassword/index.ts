import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {

    const { email } = await req.json();

    if (!email) {
      const missingFields = [];
      if (!email) missingFields.push('email');

      return new Response(JSON.stringify({ error: `missing required fields: ${missingFields.join(', ')}` }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      });
    }

    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_ANON_KEY') ?? '');

    const { data: resetPasswordData, error: resetPasswordError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: '/update-password',
    })

    if (resetPasswordError) {
      return new Response(JSON.stringify({ error: 'Invalid Email Address or Email Address does not exist', details: resetPasswordError }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      });
    }

    return new Response(JSON.stringify({ success: true, message: 'A link has been sent to your email, check to reset your password' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });  

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: err?.message ?? err }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500 
    })
  }
})

