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

    const { email, fullname, isAgent, isAgreed, password, username, usertype } = await req.json();

    if (!fullname || !email || !password || !isAgreed) {
      const missingFields = [];
      if (!fullname) missingFields.push('fullname');
      if (!email) missingFields.push('email');
      if (!password) missingFields.push('password');
      if (!isAgreed) missingFields.push('isAgreed');

      return new Response(JSON.stringify({ error: `missing required fields: ${missingFields.join(', ')}` }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      });
    }

    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_ANON_KEY') ?? '');

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: {
            fullname,
            isAgent,
            isAgreed,
            username,
            usertype
          }
        }
      }
    )

    if (signUpError) {
      return new Response(JSON.stringify({ error: 'Failed to create user', details: signUpError }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      });
    }

    const profileData = {
      profileid: signUpData.user.id,
      profilename: fullname,
      email,
      isagent: isAgent,
      username,
      usertype
    }
    
    const { data: profileCreatingData, error: profileError } = await supabase
      .from('profiles')
      .insert([profileData])
    .select()

    if (profileError) {
      return new Response(JSON.stringify({ error: 'Failed to create user profile', details: profileError }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      });
    }

    return new Response(JSON.stringify({ success: true, message: 'User created successfully' }), {
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

