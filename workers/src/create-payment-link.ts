export default {
  async fetch(request: Request, env: any) {
    try {
      const url = new URL(request.url);
      const plan = url.searchParams.get('plan') || 'Starter';

      const token = env.SQUARE_ACCESS_TOKEN;
      const locationId = env.SQUARE_LOCATION_ID;
      if (!token || !locationId) {
        return new Response(JSON.stringify({ error: 'Server not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
      }

      const amountEnv = plan.toLowerCase().startsWith('pro') ? env.PRO_AMOUNT_CENTS : env.STARTER_AMOUNT_CENTS;
      const amountCents = amountEnv ? Number(amountEnv) : plan.toLowerCase().startsWith('pro') ? 5900 : 2900;
      const idempotencyKey = crypto.randomUUID();

      const resp = await fetch('https://connect.squareup.com/v2/online/storefront/payment-links', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Square-Version': '2024-09-18'
        },
        body: JSON.stringify({
          idempotency_key: idempotencyKey,
          quick_pay: {
            location_id: locationId,
            name: plan,
            price_money: {
              amount: amountCents,
              currency: 'USD'
            }
          }
        })
      });

      if (!resp.ok) {
        const text = await resp.text();
        return new Response(JSON.stringify({ error: 'Square API error', details: text }), { status: 500, headers: { 'Content-Type': 'application/json' } });
      }

      const data = await resp.json();
      const paymentLink = data?.payment_link?.url || data?.url;
      if (!paymentLink) {
        return new Response(JSON.stringify({ error: 'No payment link returned' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
      }
      return new Response(JSON.stringify({ url: paymentLink }), { headers: { 'Content-Type': 'application/json' } });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: 'Unexpected error', details: String(err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }
};
