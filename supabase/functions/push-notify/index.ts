import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  try {
    const payload = await req.json()
    const record = payload.record

    // Get all push subscriptions from Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const subsRes = await fetch(`${supabaseUrl}/rest/v1/push_subscriptions?select=*`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    })

    const subscriptions = await subsRes.json()

    // Send push to each subscription
    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY')!
    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY')!

    for (const sub of subscriptions) {
      const pushData = {
        title: `New message from ${record.sender_name}`,
        body: record.content,
        icon: '/ThesisArcPro/admin-app/icon-192.png'
      }

      await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `key=${Deno.env.get('FCM_SERVER_KEY')}`
        },
        body: JSON.stringify({
          to: sub.fcm_token,
          notification: pushData
        })
      })
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})