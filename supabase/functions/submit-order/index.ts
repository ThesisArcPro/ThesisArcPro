// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment

import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderRequest {
  email: string;
  topic: string;
  type: string;
  subject: string;
  service: string;
  language: string;
  level: string;
  deadline: string;
  pages: number;
  instructions: string;
  total_amount: number;
  graphics: number;
  sources: number;
  abstract: number;
}

async function generateOrderNumber(supabase: any): Promise<string> {
  const { data, error } = await supabase
    .from("orders")
    .select("order_number")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) {
    return "T-1001";
  }

  const lastOrderNumber = data[0].order_number;
  const lastNumber = parseInt(lastOrderNumber.split("-")[1]);
  return `T-${lastNumber + 1}`;
}

async function sendAutoReplyEmail(email: string, orderNumber: string) {
  // Using Formspree for auto-reply
  const formspreeUrl = "https://formspree.io/f/xlgvywvb";

  try {
    await fetch(formspreeUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        subject: `Order Confirmation #${orderNumber}`,
        message: `Thank you for your order! Your order number is ${orderNumber}. We will contact you shortly to confirm the details.`,
        _template: "table",
      }),
    });
  } catch (err) {
    console.error("Email send error:", err);
  }
}

export default async (req: Request) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const order: OrderRequest = await req.json();

    // Generate order number
    const orderNumber = await generateOrderNumber(supabase);

    // Store order in database
    const { data, error } = await supabase.from("orders").insert({
      order_number: orderNumber,
      client_email: order.email,
      topic: order.topic,
      assignment_type: order.type,
      subject: order.subject,
      service: order.service,
      language: order.language,
      pages: order.pages,
      deadline: order.deadline,
      total_amount: order.total_amount,
      instructions: order.instructions,
      payment_status: "pending",
      order_status: "new",
    });

    if (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to create order" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Send auto-reply email
    await sendAutoReplyEmail(order.email, orderNumber);

    return new Response(
      JSON.stringify({
        success: true,
        orderNumber,
        message: "Order created successfully",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};