// Vercel Serverless Function: Create a Square Payment Link for a plan
// Expects env: SQUARE_ACCESS_TOKEN, SQUARE_LOCATION_ID
// Optional env per plan: STARTER_AMOUNT_CENTS, PRO_AMOUNT_CENTS
// Usage: /api/create-payment-link?plan=Starter|Professional

export default async function handler(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const plan = url.searchParams.get('plan') || 'Starter';

    const token = process.env.SQUARE_ACCESS_TOKEN;
    const locationId = process.env.SQUARE_LOCATION_ID;
    if (!token || !locationId) {
      return Response.json({ error: 'Server not configured' }, { status: 500 });
    }

    const amountEnv = plan.toLowerCase().startsWith('pro')
      ? process.env.PRO_AMOUNT_CENTS
      : process.env.STARTER_AMOUNT_CENTS;

    const amountCents = amountEnv ? parseInt(amountEnv, 10) : plan.toLowerCase().startsWith('pro') ? 5900 : 2900;
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
      return Response.json({ error: 'Square API error', details: text }, { status: 500 });
    }

    const data = await resp.json();
    const paymentLink = data?.payment_link?.url || data?.url;
    if (!paymentLink) {
      return Response.json({ error: 'No payment link returned' }, { status: 500 });
    }
    return Response.json({ url: paymentLink });
  } catch (err: any) {
    return Response.json({ error: 'Unexpected error', details: String(err) }, { status: 500 });
  }
}
