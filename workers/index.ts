/**
 * ApexRepairBench Cloudflare Worker
 * Handles API endpoints for local-first SaaS with cloud sync
 */

import {
  Env,
  CreatePaymentLinkResponse,
  VerifyLicenseResponse,
  SyncPushRequest,
  SyncPushResponse,
  SyncPullResponse,
  SquarePaymentLinkRequest,
  SquarePaymentLinkResponse,
} from './types';

/**
 * CORS headers for browser requests
 */
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

/**
 * Handle OPTIONS preflight requests
 */
function handleOptions(): Response {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

/**
 * Create a JSON response with CORS headers
 */
function jsonResponse(data: any, status: number = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: CORS_HEADERS,
  });
}

/**
 * POST /api/create-payment-link
 * Create Square payment links for subscriptions
 */
async function handleCreatePaymentLink(request: Request, env: Env): Promise<Response> {
  try {
    const url = new URL(request.url);
    const plan = url.searchParams.get('plan') || 'Starter';

    const token = env.SQUARE_ACCESS_TOKEN;
    const locationId = env.SQUARE_LOCATION_ID;
    
    if (!token || !locationId) {
      return jsonResponse({ error: 'Server not configured' }, 500);
    }

    // Determine amount based on plan
    let amountCents: number;
    const planLower = plan.toLowerCase();
    if (planLower.includes('pro') || planLower.includes('professional')) {
      amountCents = env.PRO_AMOUNT_CENTS ? Number(env.PRO_AMOUNT_CENTS) : 5900;
    } else if (planLower.includes('enterprise')) {
      amountCents = env.ENTERPRISE_AMOUNT_CENTS ? Number(env.ENTERPRISE_AMOUNT_CENTS) : 14900;
    } else {
      amountCents = env.STARTER_AMOUNT_CENTS ? Number(env.STARTER_AMOUNT_CENTS) : 2900;
    }

    const idempotencyKey = crypto.randomUUID();

    const squareRequest: SquarePaymentLinkRequest = {
      idempotency_key: idempotencyKey,
      quick_pay: {
        location_id: locationId,
        name: plan,
        price_money: {
          amount: amountCents,
          currency: 'USD',
        },
      },
    };

    const resp = await fetch('https://connect.squareup.com/v2/online/storefront/payment-links', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Square-Version': '2024-09-18',
      },
      body: JSON.stringify(squareRequest),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return jsonResponse({ error: 'Square API error', details: text }, 500);
    }

    const data: SquarePaymentLinkResponse = await resp.json();
    const paymentLink = data?.payment_link?.url || data?.url;
    
    if (!paymentLink) {
      return jsonResponse({ error: 'No payment link returned' }, 500);
    }

    return jsonResponse({ url: paymentLink });
  } catch (err: any) {
    return jsonResponse({ error: 'Unexpected error', details: String(err) }, 500);
  }
}

/**
 * GET /api/download
 * Serve installer files from Cloudflare R2
 */
async function handleDownload(request: Request, env: Env): Promise<Response> {
  try {
    const url = new URL(request.url);
    const platform = url.searchParams.get('platform');

    if (!platform || !['windows', 'mac', 'linux'].includes(platform)) {
      return jsonResponse({ error: 'Invalid platform. Must be windows, mac, or linux' }, 400);
    }

    // Map platform to installer file names
    const fileMap: Record<string, string> = {
      windows: 'ApexRepairBench-Setup.exe',
      mac: 'ApexRepairBench.dmg',
      linux: 'ApexRepairBench.AppImage',
    };

    const filename = fileMap[platform];
    const object = await env.INSTALLERS.get(filename);

    if (!object) {
      return jsonResponse({ error: 'Installer not found' }, 404);
    }

    // Set appropriate content type
    const contentTypes: Record<string, string> = {
      windows: 'application/x-msdownload',
      mac: 'application/x-apple-diskimage',
      linux: 'application/x-executable',
    };

    return new Response(object.body, {
      headers: {
        'Content-Type': contentTypes[platform],
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err: any) {
    return jsonResponse({ error: 'Download failed', details: String(err) }, 500);
  }
}

/**
 * POST /api/verify-license
 * Verify license keys from desktop app
 */
async function handleVerifyLicense(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.json() as any;
    const { license_key, device_id } = body;

    if (!license_key) {
      return jsonResponse({ valid: false, error: 'License key required' }, 400);
    }

    // Query database for license
    const licenseResult = await env.DB.prepare(
      'SELECT l.*, s.* FROM licenses l JOIN subscribers s ON l.subscriber_id = s.id WHERE l.license_key = ? AND s.status = ?'
    )
      .bind(license_key, 'active')
      .first();

    if (!licenseResult) {
      return jsonResponse({ valid: false, error: 'Invalid or inactive license' }, 401);
    }

    // Update device_id and last_sync if provided
    if (device_id) {
      await env.DB.prepare(
        'UPDATE licenses SET device_id = ?, last_sync = datetime("now") WHERE license_key = ?'
      )
        .bind(device_id, license_key)
        .run();
    }

    const response: VerifyLicenseResponse = {
      valid: true,
      subscriber: {
        id: licenseResult.id as number,
        email: licenseResult.email as string,
        plan: licenseResult.plan as any,
        status: licenseResult.status as any,
        square_subscription_id: licenseResult.square_subscription_id as string,
        created_at: licenseResult.created_at as string,
        expires_at: licenseResult.expires_at as string,
      },
    };

    return jsonResponse(response);
  } catch (err: any) {
    return jsonResponse({ valid: false, error: 'Verification failed', details: String(err) }, 500);
  }
}

/**
 * POST /api/sync/push
 * Sync data from desktop app to cloud (Cloudflare D1)
 */
async function handleSyncPush(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.json() as SyncPushRequest;
    const { license_key, device_id, shop_id, data } = body;

    if (!license_key || !device_id || !shop_id || !data) {
      return jsonResponse({ success: false, error: 'Missing required fields' }, 400);
    }

    // Verify license
    const licenseResult = await env.DB.prepare(
      'SELECT subscriber_id FROM licenses WHERE license_key = ?'
    )
      .bind(license_key)
      .first();

    if (!licenseResult) {
      return jsonResponse({ success: false, error: 'Invalid license' }, 401);
    }

    const subscriberId = licenseResult.subscriber_id as number;

    // Insert or update sync data
    let syncedCount = 0;
    for (const item of data) {
      await env.DB.prepare(`
        INSERT INTO sync_data (subscriber_id, shop_id, data_type, data_id, data_json, updated_at, device_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(subscriber_id, shop_id, data_type, data_id) 
        DO UPDATE SET data_json = excluded.data_json, updated_at = excluded.updated_at, device_id = excluded.device_id
      `)
        .bind(
          subscriberId,
          shop_id,
          item.data_type,
          item.data_id,
          item.data_json,
          item.updated_at,
          device_id
        )
        .run();
      syncedCount++;
    }

    // Update last_sync timestamp
    await env.DB.prepare('UPDATE licenses SET last_sync = datetime("now") WHERE license_key = ?')
      .bind(license_key)
      .run();

    const response: SyncPushResponse = {
      success: true,
      synced_count: syncedCount,
    };

    return jsonResponse(response);
  } catch (err: any) {
    return jsonResponse({ success: false, error: 'Sync push failed', details: String(err) }, 500);
  }
}

/**
 * GET /api/sync/pull
 * Pull cloud updates to desktop app
 */
async function handleSyncPull(request: Request, env: Env): Promise<Response> {
  try {
    const url = new URL(request.url);
    const licenseKey = url.searchParams.get('license_key');
    const since = url.searchParams.get('since');

    if (!licenseKey) {
      return jsonResponse({ success: false, error: 'License key required' }, 400);
    }

    // Verify license
    const licenseResult = await env.DB.prepare(
      'SELECT subscriber_id FROM licenses WHERE license_key = ?'
    )
      .bind(licenseKey)
      .first();

    if (!licenseResult) {
      return jsonResponse({ success: false, error: 'Invalid license' }, 401);
    }

    const subscriberId = licenseResult.subscriber_id as number;

    // Query sync data
    let query = 'SELECT * FROM sync_data WHERE subscriber_id = ?';
    const params: any[] = [subscriberId];

    if (since) {
      query += ' AND updated_at > ?';
      params.push(since);
    }

    query += ' ORDER BY updated_at DESC LIMIT 1000';

    const results = await env.DB.prepare(query)
      .bind(...params)
      .all();

    const response: SyncPullResponse = {
      success: true,
      data: results.results as any[],
    };

    return jsonResponse(response);
  } catch (err: any) {
    return jsonResponse({ success: false, error: 'Sync pull failed', details: String(err) }, 500);
  }
}

/**
 * Main worker fetch handler
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleOptions();
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // Route requests to appropriate handlers
      if (path === '/api/create-payment-link' && request.method === 'POST') {
        return await handleCreatePaymentLink(request, env);
      }

      if (path === '/api/download' && request.method === 'GET') {
        return await handleDownload(request, env);
      }

      if (path === '/api/verify-license' && request.method === 'POST') {
        return await handleVerifyLicense(request, env);
      }

      if (path === '/api/sync/push' && request.method === 'POST') {
        return await handleSyncPush(request, env);
      }

      if (path === '/api/sync/pull' && request.method === 'GET') {
        return await handleSyncPull(request, env);
      }

      // No matching route
      return jsonResponse({ error: 'Not found' }, 404);
    } catch (err: any) {
      return jsonResponse({ error: 'Internal server error', details: String(err) }, 500);
    }
  },
};
