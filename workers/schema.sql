-- ApexRepairBench Database Schema for Cloudflare D1
-- This schema supports the local-first SaaS architecture with cloud sync

-- Subscribers table: stores customer subscription information
CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  plan TEXT NOT NULL CHECK(plan IN ('starter', 'professional', 'enterprise')),
  status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'inactive', 'cancelled')),
  square_subscription_id TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT
);

-- Create indexes for subscribers table
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);
CREATE INDEX IF NOT EXISTS idx_subscribers_square_id ON subscribers(square_subscription_id);

-- Licenses table: stores license keys for desktop app activation
CREATE TABLE IF NOT EXISTS licenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subscriber_id INTEGER NOT NULL,
  license_key TEXT NOT NULL UNIQUE,
  device_id TEXT,
  activated_at TEXT,
  last_sync TEXT,
  FOREIGN KEY (subscriber_id) REFERENCES subscribers(id) ON DELETE CASCADE
);

-- Create indexes for licenses table
CREATE INDEX IF NOT EXISTS idx_licenses_key ON licenses(license_key);
CREATE INDEX IF NOT EXISTS idx_licenses_subscriber ON licenses(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_licenses_device ON licenses(device_id);

-- Sync data table: stores synchronized data from desktop apps
CREATE TABLE IF NOT EXISTS sync_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subscriber_id INTEGER NOT NULL,
  shop_id TEXT NOT NULL,
  data_type TEXT NOT NULL,
  data_id TEXT NOT NULL,
  data_json TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  device_id TEXT NOT NULL,
  FOREIGN KEY (subscriber_id) REFERENCES subscribers(id) ON DELETE CASCADE
);

-- Create indexes for sync_data table
CREATE INDEX IF NOT EXISTS idx_sync_subscriber ON sync_data(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_sync_shop ON sync_data(shop_id);
CREATE INDEX IF NOT EXISTS idx_sync_type ON sync_data(data_type);
CREATE INDEX IF NOT EXISTS idx_sync_updated ON sync_data(updated_at);
CREATE INDEX IF NOT EXISTS idx_sync_device ON sync_data(device_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_sync_unique ON sync_data(subscriber_id, shop_id, data_type, data_id);
