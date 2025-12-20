# Cloudflare Setup Guide for ApexRepairBench

This guide walks you through setting up the Cloudflare infrastructure for ApexRepairBench's local-first SaaS architecture with automatic cloud sync.

## Prerequisites

- A Cloudflare account (free tier works)
- Node.js 18+ installed
- Wrangler CLI installed (`npm install -g wrangler`)
- Square API credentials (for payment processing)

## 1. Install Wrangler CLI

```bash
npm install -g wrangler
```

## 2. Authenticate with Cloudflare

```bash
wrangler login
```

This will open a browser window for you to authenticate with your Cloudflare account.

## 3. Create D1 Database

Create a new D1 database for storing subscriber and sync data:

```bash
cd workers
wrangler d1 create apexrepairbench-db
```

This will output a database ID. Copy this ID and update `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "apexrepairbench-db"
database_id = "YOUR_DATABASE_ID_HERE"  # Replace with the ID from above
```

## 4. Initialize Database Schema

Run the SQL schema to create tables:

```bash
wrangler d1 execute apexrepairbench-db --file=schema.sql
```

Verify the tables were created:

```bash
wrangler d1 execute apexrepairbench-db --command="SELECT name FROM sqlite_master WHERE type='table'"
```

You should see: `subscribers`, `licenses`, and `sync_data`.

## 5. Create R2 Bucket

Create an R2 bucket for storing installer files:

```bash
wrangler r2 bucket create apexrepairbench-installers
```

## 6. Upload Installer Files to R2

Once you have built your Electron installers, upload them to R2:

```bash
# Upload Windows installer
wrangler r2 object put apexrepairbench-installers/ApexRepairBench-Setup.exe --file=./release/ApexRepairBench-Setup.exe

# Upload macOS installer
wrangler r2 object put apexrepairbench-installers/ApexRepairBench.dmg --file=./release/ApexRepairBench.dmg

# Upload Linux installer
wrangler r2 object put apexrepairbench-installers/ApexRepairBench.AppImage --file=./release/ApexRepairBench.AppImage
```

## 7. Configure Environment Variables

Set your Square API credentials as secrets (not in wrangler.toml):

```bash
cd workers
wrangler secret put SQUARE_ACCESS_TOKEN
# Enter your Square access token when prompted

wrangler secret put SQUARE_LOCATION_ID
# Enter your Square location ID when prompted
```

Set pricing variables (can be in wrangler.toml or as secrets):

```bash
wrangler secret put STARTER_AMOUNT_CENTS
# Enter: 2900 (for $29.00)

wrangler secret put PRO_AMOUNT_CENTS
# Enter: 5900 (for $59.00)

wrangler secret put ENTERPRISE_AMOUNT_CENTS
# Enter: 14900 (for $149.00)
```

## 8. Test Locally

Test your worker locally with Wrangler:

```bash
cd workers
wrangler dev
```

This starts a local development server. You can test endpoints:

- `http://localhost:8787/api/create-payment-link?plan=Starter`
- `http://localhost:8787/api/verify-license` (POST)
- `http://localhost:8787/api/sync/push` (POST)
- `http://localhost:8787/api/sync/pull?license_key=xxx`

## 9. Deploy to Production

Deploy your worker to Cloudflare:

```bash
cd workers
wrangler deploy
```

This will output your worker URL, e.g., `https://apexrepairbench-api.YOUR_SUBDOMAIN.workers.dev`

## 10. Configure Custom Domain (Optional)

For a production setup, configure a custom domain:

1. Go to Cloudflare Dashboard → Workers & Pages
2. Select your worker
3. Go to Settings → Triggers
4. Add a custom domain (e.g., `api.apexrepairbench.com`)

## API Endpoints

Once deployed, your API will have these endpoints:

### POST /api/create-payment-link
Create Square payment links for subscriptions.

**Query Parameters:**
- `plan`: Plan name (Starter, Professional, Enterprise)

**Response:**
```json
{
  "url": "https://checkout.square.site/..."
}
```

### GET /api/download
Serve installer files from R2 storage.

**Query Parameters:**
- `platform`: One of `windows`, `mac`, or `linux`

**Response:**
Binary file download

### POST /api/verify-license
Verify license keys from desktop app.

**Request Body:**
```json
{
  "license_key": "xxxx-xxxx-xxxx-xxxx",
  "device_id": "optional-device-id"
}
```

**Response:**
```json
{
  "valid": true,
  "subscriber": {
    "id": 1,
    "email": "user@example.com",
    "plan": "professional",
    "status": "active"
  }
}
```

### POST /api/sync/push
Sync data from desktop app to cloud.

**Request Body:**
```json
{
  "license_key": "xxxx-xxxx-xxxx-xxxx",
  "device_id": "device-123",
  "shop_id": "shop-456",
  "data": [
    {
      "data_type": "ticket",
      "data_id": "ticket-1",
      "data_json": "{...}",
      "updated_at": "2024-12-20T00:00:00Z"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "synced_count": 1
}
```

### GET /api/sync/pull
Pull cloud updates to desktop app.

**Query Parameters:**
- `license_key`: License key
- `since`: Optional timestamp to get updates since (ISO 8601)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "shop_id": "shop-456",
      "data_type": "ticket",
      "data_id": "ticket-1",
      "data_json": "{...}",
      "updated_at": "2024-12-20T00:00:00Z"
    }
  ]
}
```

## Database Management

### Query the database

```bash
wrangler d1 execute apexrepairbench-db --command="SELECT * FROM subscribers"
```

### Add a test subscriber

```bash
wrangler d1 execute apexrepairbench-db --command="INSERT INTO subscribers (email, plan, status) VALUES ('test@example.com', 'professional', 'active')"
```

### Add a test license

```bash
wrangler d1 execute apexrepairbench-db --command="INSERT INTO licenses (subscriber_id, license_key) VALUES (1, 'test-license-key-123')"
```

## Monitoring

View logs in real-time:

```bash
wrangler tail
```

View analytics in the Cloudflare Dashboard:
- Go to Workers & Pages
- Select your worker
- View metrics, logs, and errors

## Troubleshooting

### Error: "Database not found"
Make sure you've created the D1 database and updated the `database_id` in `wrangler.toml`.

### Error: "Bucket not found"
Make sure you've created the R2 bucket with the exact name `apexrepairbench-installers`.

### Error: "SQUARE_ACCESS_TOKEN not set"
Set your Square credentials using `wrangler secret put SQUARE_ACCESS_TOKEN`.

### CORS errors from browser
The worker includes CORS headers. If you still see errors, check that you're making requests to the correct URL.

## Security Best Practices

1. **Never commit secrets**: Use `wrangler secret put` for sensitive values
2. **Use HTTPS**: Cloudflare Workers automatically serve over HTTPS
3. **Validate input**: The worker validates all inputs, but always be cautious
4. **Rotate keys**: Regularly rotate your Square API keys
5. **Monitor usage**: Set up alerts for unusual activity in Cloudflare Dashboard

## Next Steps

1. Build your Electron installers: `npm run build:electron`
2. Upload installers to R2
3. Test the complete flow: website → payment → download → license verification
4. Monitor logs and analytics
5. Set up custom domain for production

## Support

For issues or questions:
- Check Cloudflare Workers documentation: https://developers.cloudflare.com/workers/
- Review Square API docs: https://developer.squareup.com/
- Contact support: support@apexrepairbench.com
