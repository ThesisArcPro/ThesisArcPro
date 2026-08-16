// supabase/functions/attach-referral/index.ts
//
// Called from the client right after a new user signs up (if a ?ref=CODE
// was captured). Runs server-side with the service role key, so it can
// bypass RLS to look up the code owner and insert the referrals row —
// something the client itself is never allowed to do directly.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { code, userId } = await req.json();

    if (!code || !userId) {
      return new Response(
        JSON.stringify({ error: 'Missing code or userId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: codeRow, error: codeError } = await supabaseAdmin
      .from('referral_codes')
      .select('user_id')
      .eq('code', code)
      .single();

    if (codeError || !codeRow) {
      return new Response(
        JSON.stringify({ error: 'Invalid referral code' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const referrerId = codeRow.user_id;

    if (referrerId === userId) {
      return new Response(
        JSON.stringify({ error: 'Cannot refer yourself' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { error: insertError } = await supabaseAdmin
      .from('referrals')
      .insert({
        referrer_id: referrerId,
        referred_user_id: userId,
        code_used: code,
        status: 'pending',
      });

    if (insertError) {
      return new Response(
        JSON.stringify({ error: insertError.message }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});