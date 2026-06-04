import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

export default async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { transactionId } = await req.json();

    // Validate format — PayPal IDs are 17-19 alphanumeric characters
    const isValidFormat = /^[A-Z0-9]{8,20}$/i.test(transactionId);
    if (!isValidFormat) {
      return new Response(
        JSON.stringify({ valid: false, error: "Invalid Transaction ID format. Please check your PayPal email." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if already used
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data: existing } = await supabase
      .from("orders")
      .select("id")
      .eq("transaction_id", transactionId)
      .maybeSingle();

    if (existing) {
      return new Response(
        JSON.stringify({ valid: false, error: "This Transaction ID has already been used." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ valid: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ valid: false, error: "Verification failed. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};