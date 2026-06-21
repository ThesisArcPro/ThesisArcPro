import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const SECRET_TOKEN = "thesisarcpro_action_2026";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const { email, password, writer_id, token } = await req.json();

    if (token !== SECRET_TOKEN) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    if (!email || !password || !writer_id) {
      return new Response(JSON.stringify({ error: "Missing email, password, or writer_id" }), { status: 400 });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) throw authError;

    // Link auth user to writer
    const { error: updateError } = await supabase
      .from("writers")
      .update({ auth_user_id: authData.user.id, email })
      .eq("id", writer_id);

    if (updateError) throw updateError;

    // Create a profile for the writer (so RLS works)
    await supabase
      .from("profiles")
      .insert({
        id: authData.user.id,
        email,
        full_name: email.split("@")[0],
        is_admin: false,
      })
      .single();

    return new Response(JSON.stringify({ success: true, user_id: authData.user.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
});