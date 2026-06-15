import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Secret token to protect the endpoint
const SECRET_TOKEN = "thesisarcpro_action_2026";

export default async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const orderId = url.searchParams.get("orderId");
    const status = url.searchParams.get("status");
    const fileUrl = url.searchParams.get("fileUrl");
    const token = url.searchParams.get("token");

    // Verify secret token
    if (token !== SECRET_TOKEN) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!orderId || !status) {
      return new Response("Missing orderId or status", { status: 400 });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Update order status
    const updateData: any = {
      order_status: status,
      status_updated_at: new Date().toISOString()
    };

    if (fileUrl) {
      updateData.file_url = fileUrl;
    }

    const { error } = await supabase
      .from("orders")
      .update(updateData)
      .eq("id", orderId);

    if (error) throw error;

    // Get order details for confirmation
    const { data: order } = await supabase
      .from("orders")
      .select("order_number, client_email, topic")
      .eq("id", orderId)
      .single();

    // Send email to client if status changed to completed
    if (status === "completed" && order?.client_email) {
      const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwAjvDXT5kJylGmH9Amczt3IPxiPct0ehphNzDa2TAD3ZrqPLdaqffJCiJ_S83PnOk5JQ/exec";
      
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "status_update",
          clientEmail: order.client_email,
          orderNumber: order.order_number,
          topic: order.topic,
          status: status,
          fileUrl: fileUrl || ""
        })
      });
    }

    // Return success HTML page
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Order Updated</title>
          <style>
            body { font-family: Arial, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #0a1628; }
            .card { background: white; border-radius: 16px; padding: 2.5rem; text-align: center; max-width: 400px; }
            h1 { color: #0a1628; margin-bottom: 0.5rem; }
            p { color: #666; }
            .badge { display: inline-block; padding: 0.5rem 1.5rem; border-radius: 20px; font-weight: 700; margin: 1rem 0; }
            .badge-progress { background: #fff3e0; color: #e65100; }
            .badge-completed { background: #e8f5e9; color: #2e7d32; }
            .badge-revision { background: #f3e5f5; color: #6a1b9a; }
          </style>
        </head>
        <body>
          <div class="card">
            <div style="font-size:3rem;">✅</div>
            <h1>Order Updated!</h1>
            <div class="badge badge-${status}">${status.replace('_', ' ').toUpperCase()}</div>
            <p>Order <strong>${order?.order_number || orderId}</strong> has been marked as <strong>${status.replace('_', ' ')}</strong>.</p>
            <p style="font-size:0.85rem; color:#999;">You can close this tab.</p>
          </div>
        </body>
      </html>
    `, {
      status: 200,
      headers: { "Content-Type": "text/html" }
    });

  } catch (error) {
    return new Response(`
      <!DOCTYPE html>
      <html>
        <body style="font-family:Arial; text-align:center; padding:2rem;">
          <h1>❌ Error updating order</h1>
          <p>${error}</p>
        </body>
      </html>
    `, {
      status: 500,
      headers: { "Content-Type": "text/html" }
    });
  }
};