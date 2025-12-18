# Secrets and Environment Variables

This repository is a client-heavy Vite app. Never commit secrets. Use platform secrets.

## Vite Client Envs
- Must be prefixed with `VITE_`. These are embedded in the client bundle and are visible to users.
- Example: `VITE_GEMINI_API_KEY`, payment links such as `VITE_STARTER_LINK`.

## Server-only Secrets
Store these in deployment platform settings (not in `.env.local` for production builds):
- `SQUARE_ACCESS_TOKEN` — required for Square APIs. Keep server-side only.
- `CLOUDFLARE_API_TOKEN` — prefer a scoped API Token instead of a Global API Key.
- `DOCKER_PAT` — Docker Personal Access Token for CLI logins in CI.

### GitHub Actions
- Add secrets under Repo Settings → Secrets and variables → Actions.
- Suggested names: `SQUARE_ACCESS_TOKEN`, `CLOUDFLARE_API_TOKEN`, `DOCKER_PAT`.

### Vercel
- Project Settings → Environment Variables.
- Add `VITE_*` values for client, and server-only values (`SQUARE_ACCESS_TOKEN`, etc.).

## Square Checkout (Buy Now)
- Use Square Payment Links (Dashboard) and place public URLs in `VITE_STARTER_LINK`, `VITE_PROFESSIONAL_LINK`, and `VITE_ENTERPRISE_CONTACT_LINK`.
- For API-driven checkout (Subscriptions/Payments), implement a serverless function (e.g., Vercel `api/`) that uses `SQUARE_ACCESS_TOKEN`.

## Cloudflare
- Avoid Global API Key. Generate a token with minimal scopes for your use-case.
- Never expose Cloudflare tokens to client-side code.

## Local Development
Create `.env.local` from `.env.example`. Do not add server-only secrets to `.env.local` if you will build a public bundle.

