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

    const { email, password } = await req.json();

    if (!email || !password) {
      const missingFields = [];
      if (!email) missingFields.push('email');
      if (!password) missingFields.push('password');

      return new Response(JSON.stringify({ error: `missing required fields: ${missingFields.join(', ')}` }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      });
    }

    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_ANON_KEY') ?? '');

    const { data: SignInData, error: SignInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (SignInError) {
      return new Response(JSON.stringify({ error: 'Login Failed', details: SignInError }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      });
    }

    return new Response(JSON.stringify({ session: SignInData.session, user: SignInData.user, message: 'Login Successful' }), {
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

