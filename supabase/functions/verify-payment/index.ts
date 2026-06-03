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
    const { transactionId, accessToken } = await req.json();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Check if transaction ID already used
    const { data: existing } = await supabase
      .from("orders")
      .select("id")
      .eq("transaction_id", transactionId)
      .single();

    if (existing) {
      return new Response(
        JSON.stringify({ valid: false, error: "Transaction ID already used" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify with PayPal
    const clientId = Deno.env.get("PAYPAL_CLIENT_ID");
    const secret = Deno.env.get("PAYPAL_SECRET");

    const authRes = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${btoa(`${clientId}:${secret}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const authData = await authRes.json();
    const paypalToken = authData.access_token;

    // Try as capture ID first
    const captureRes = await fetch(
      `https://api-m.paypal.com/v2/payments/captures/${transactionId}`,
      {
        headers: {
          "Authorization": `Bearer ${paypalToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const captureData = await captureRes.json();

    if (captureData.status === "COMPLETED") {
      return new Response(
        JSON.stringify({ valid: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ valid: false, error: "Transaction not found or not completed" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ valid: false, error: "Verification failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};