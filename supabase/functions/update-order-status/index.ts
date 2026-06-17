import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const SECRET_TOKEN = "thesisarcpro_action_2026";
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz6jQ58s2mYI8NWjo-1gVbyBXUjsYG_ffd3IncQ4lOELCmlAOaMpxPRjA6O3LDO0aX7_g/exec";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok");
  }

  try {
    const url = new URL(req.url);
    const orderId = url.searchParams.get("orderId");
    const status = url.searchParams.get("status");
    const fileUrl = url.searchParams.get("fileUrl");
    const token = url.searchParams.get("token");

    if (token !== SECRET_TOKEN) {
      return new Response("Unauthorized — missing or wrong token", { status: 401 });
    }
    if (!orderId || !status) {
      return new Response("Missing orderId or status", { status: 400 });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const updateData: any = {
      order_status: status,
      status_updated_at: new Date().toISOString(),
    };
    if (fileUrl) updateData.file_url = fileUrl;

    const { error } = await supabase
      .from("orders")
      .update(updateData)
      .eq("order_number", orderId);

    if (error) throw error;

    const { data: order } = await supabase
      .from("orders")
      .select("order_number, client_email, topic")
      .eq("order_number", orderId)
      .maybeSingle();

    // Notify client only when completed — hard 5s timeout so it can never hang
    if (status === "completed" && order?.client_email) {
      try {
        const controller = new AbortController();
        const t = setTimeout(() => controller.abort(), 5000);
        await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "status_update",
            clientEmail: order.client_email,
            orderNumber: order.order_number,
            topic: order.topic,
            status,
            fileUrl: fileUrl || "",
          }),
          signal: controller.signal,
        });
        clearTimeout(t);
      } catch (_) {
        // ignore email errors so the page still loads
      }
    }

    const badgeClass = status === "completed" ? "badge-completed"
      : status === "revision" ? "badge-revision"
      : "badge-progress";
    const label = status.replace("_", " ").toUpperCase();

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
            <div class="badge ${badgeClass}">${label}</div>
            <p>Order <strong>${order?.order_number || orderId}</strong> has been marked as <strong>${status.replace("_", " ")}</strong>.</p>
            <p style="font-size:0.85rem; color:#999;">You can close this tab.</p>
          </div>
        </body>
      </html>
    `, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } });

  } catch (error) {
    return new Response(`
      <!DOCTYPE html>
      <html>
        <body style="font-family:Arial; text-align:center; padding:2rem;">
          <h1>❌ Error updating order</h1>
          <p>${error}</p>
        </body>
      </html>
    `, { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } });
  }
});