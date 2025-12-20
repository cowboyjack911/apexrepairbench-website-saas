/**
 * TypeScript type definitions for Cloudflare Workers
 */

/**
 * Cloudflare Worker Environment Bindings
 */
export interface Env {
  // D1 Database binding
  DB: D1Database;
  
  // R2 Bucket binding for installer files
  INSTALLERS: R2Bucket;
  
  // Environment variables
  SQUARE_ACCESS_TOKEN: string;
  SQUARE_LOCATION_ID: string;
  STARTER_AMOUNT_CENTS: string;
  PRO_AMOUNT_CENTS: string;
  ENTERPRISE_AMOUNT_CENTS: string;
  ENVIRONMENT?: string;
}

/**
 * Database Record Types
 */

export interface Subscriber {
  id: number;
  email: string;
  plan: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'inactive' | 'cancelled';
  square_subscription_id?: string;
  created_at: string;
  expires_at?: string;
}

export interface License {
  id: number;
  subscriber_id: number;
  license_key: string;
  device_id?: string;
  activated_at?: string;
  last_sync?: string;
}

export interface SyncData {
  id: number;
  subscriber_id: number;
  shop_id: string;
  data_type: string;
  data_id: string;
  data_json: string;
  updated_at: string;
  device_id: string;
}

/**
 * API Request/Response Types
 */

export interface CreatePaymentLinkRequest {
  plan: string;
  email?: string;
}

export interface CreatePaymentLinkResponse {
  url?: string;
  error?: string;
  details?: string;
}

export interface DownloadRequest {
  platform: 'windows' | 'mac' | 'linux';
}

export interface VerifyLicenseRequest {
  license_key: string;
  device_id?: string;
}

export interface VerifyLicenseResponse {
  valid: boolean;
  subscriber?: Subscriber;
  error?: string;
}

export interface SyncPushRequest {
  license_key: string;
  device_id: string;
  shop_id: string;
  data: Array<{
    data_type: string;
    data_id: string;
    data_json: string;
    updated_at: string;
  }>;
}

export interface SyncPushResponse {
  success: boolean;
  synced_count?: number;
  error?: string;
}

export interface SyncPullRequest {
  license_key: string;
  since?: string;
}

export interface SyncPullResponse {
  success: boolean;
  data?: SyncData[];
  error?: string;
}

/**
 * Square API Types
 */

export interface SquarePaymentLinkRequest {
  idempotency_key: string;
  quick_pay: {
    location_id: string;
    name: string;
    price_money: {
      amount: number;
      currency: string;
    };
  };
}

export interface SquarePaymentLinkResponse {
  payment_link?: {
    url: string;
    id: string;
  };
  url?: string;
  errors?: Array<{
    category: string;
    code: string;
    detail: string;
  }>;
}
