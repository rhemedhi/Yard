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

    const { password, access_token } = await req.json();

    if (!password || !access_token) {
      const missingFields: any[] = [];
      if (!password) missingFields.push('password');
      if (!access_token) missingFields.push('access_token');

      return new Response(JSON.stringify({ error: `missing required fields: ${missingFields.join(', ')}` }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      });
    }

    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');

    const { data: sessionData, error: sessionError } = await supabase.auth.verifyOtp({
      type: 'recovery',
      token: access_token,
    });

    if (sessionError) {
      console.error('Update user error:', sessionError);
      return new Response(
        JSON.stringify({ error: 'Failed to update password', details: sessionError.message }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    const { data: updateData, error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      console.error('Update user error:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to update password', details: updateError.message }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    return new Response(JSON.stringify({ success: true, message: 'Password updated successfully' }), {
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

