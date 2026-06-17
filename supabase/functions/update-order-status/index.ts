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

    // Redirect to the success page on the live site — avoids sandbox/encoding issues
    const redirectUrl = `https://thesisarcpro.github.io/ThesisArcPro/order-updated/?order=${order?.order_number || orderId}&status=${status}`;

    return new Response(null, {
      status: 302,
      headers: { "Location": redirectUrl },
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
    `, { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } });
  }
});