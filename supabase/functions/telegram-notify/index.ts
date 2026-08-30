// Supabase Edge Function: telegram-notify
//
// Triggered by a Database Webhook on `messages` INSERT (no filter — every
// insert calls this function, and the function itself decides what's worth
// a Telegram alert). Two cases fire a notification:
//
//   1. SUPPORT TICKET ESCALATED — the bot's exact escalation reply was just
//      inserted, meaning a guest/client clicked "Connect me to support" (or
//      kept typing past the bot's topic reply) and a human is now needed.
//
//   2. UNANSWERED CLIENT MESSAGE IN AN ORDER CHAT — a client just sent a
//      message in a type: 'order' conversation, and the message immediately
//      before it (if any) was NOT also from a client — i.e. this message is
//      what makes the thread newly unanswered. If the client sends several
//      messages in a row waiting for a reply, only the first one notifies;
//      the rest are silently skipped so this doesn't spam you.
//
// Every other message insert (bot topic replies, ordinary back-and-forth
// once someone's already replied) is ignored.
//
// Secrets required (set via `supabase secrets set`):
//   TELEGRAM_BOT_TOKEN
//   TELEGRAM_CHAT_ID

const CW_BOT_ID = '00000000-0000-0000-0000-000000000001';
const CW_ESCALATION_REPLY =
  "Got it — I've connected you with our support team and someone will follow up with you here shortly. Feel free to add anything else in the meantime!";

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN')!;
const TELEGRAM_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID')!;

async function sendTelegram(text: string) {
  const tgRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
  });
  if (!tgRes.ok) {
    const errBody = await tgRes.text();
    console.error('Telegram sendMessage failed:', tgRes.status, errBody);
    return false;
  }
  return true;
}

async function fetchConversation(conversationId: string) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/conversations?id=eq.${conversationId}&select=id,type,title`,
    {
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
    }
  );
  const data = await res.json();
  return data?.[0] || null;
}

Deno.serve(async (req: Request) => {
  try {
    const payload = await req.json();
    const row = payload?.record;
    if (!row) return new Response(JSON.stringify({ skipped: true }), { status: 200 });

    // ── Case 1: support ticket escalation ──
    if (row.sender_id === CW_BOT_ID && row.content === CW_ESCALATION_REPLY) {
      const conv = await fetchConversation(row.conversation_id);
      const title = conv?.title || 'Support ticket';
      const sent = await sendTelegram(
        `🎫 New support ticket needs you\n\n${title}\n\nOpen the admin dashboard → Tickets to reply.`
      );
      return new Response(JSON.stringify({ sent }), { status: sent ? 200 : 500 });
    }

    // ── Case 2: unanswered client message in an order chat ──
    if (row.sender_role === 'client') {
      const conv = await fetchConversation(row.conversation_id);
      if (conv?.type === 'order') {
        const prevRes = await fetch(
          `${SUPABASE_URL}/rest/v1/messages?conversation_id=eq.${row.conversation_id}&id=neq.${row.id}&order=created_at.desc&limit=1&select=sender_role`,
          {
            headers: {
              apikey: SUPABASE_SERVICE_ROLE_KEY,
              Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            },
          }
        );
        const prevData = await prevRes.json();
        const prevMsg = prevData?.[0] || null;
        const isFreshlyUnanswered = !prevMsg || prevMsg.sender_role !== 'client';

        if (isFreshlyUnanswered) {
          const preview = String(row.content || '').slice(0, 200);
          const title = conv.title || 'Order chat';
          const sent = await sendTelegram(
            `💬 Unanswered client message\n\n${title}\n\n"${preview}"\n\nOpen the admin dashboard → Messages to reply.`
          );
          return new Response(JSON.stringify({ sent }), { status: sent ? 200 : 500 });
        }
      }
    }

    return new Response(JSON.stringify({ skipped: true }), { status: 200 });
  } catch (err) {
    console.error('telegram-notify error:', err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});