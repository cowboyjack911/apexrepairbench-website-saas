# ApexRepairBench — SaaS Website

Modern marketing site built with Vite, React, and TypeScript.

## Overview

This repository contains the ApexRepairBench SaaS marketing website. It's a fast, client‑side app built with Vite + React + TypeScript. The site includes a product tour, pricing, FAQ, competitor comparison, ROI calculator, chat widget, and a sale banner.

**Live:** <https://apexrepairbench-website.pages.dev>

Key files and folders:

- Entry points: [index.tsx](index.tsx), [App.tsx](App.tsx)
- Components: [components](components)
- Services (Gemini API): [services/geminiService.ts](services/geminiService.ts)
- Config: [vite.config.ts](vite.config.ts), [tsconfig.json](tsconfig.json)

## Prerequisites

- Node.js 18 or newer (recommended Node 20)
- A Gemini API key if you plan to use the chat features

## Quick Start

1. Install dependencies

```powershell
npm install
```

1. Configure environment variables

Create a `.env.local` file (or copy from [.env.example](.env.example)) and set your Gemini key.

```env
GEMINI_API_KEY=your_key_here
VITE_GEMINI_API_KEY=your_key_here
```

1. Run the dev server

```powershell
npm run dev
```

1. Build for production

```powershell
npm run build
```

1. Preview local production build

```powershell
npm run preview
```

## Deploy

You can deploy the `dist/` output to any static host. Popular options:

- Cloudflare Pages: **Live at** <https://apexrepairbench-website.pages.dev>
- Vercel: uses [vercel.json](vercel.json) with `npm run build` and `dist/` output
- Netlify: drag‑and‑drop or CI deploy

## Subscriptions / Buy Now

Two options:

- Payment links (simple): set `VITE_STARTER_LINK`, `VITE_PROFESSIONAL_LINK`, `VITE_ENTERPRISE_CONTACT_LINK` in `.env.local`. Buttons open these URLs.
- API mode (server-generated Square links): set `VITE_PAYMENT_MODE=api` and add server secrets:
  - `SQUARE_ACCESS_TOKEN`
  - `SQUARE_LOCATION_ID`
  - Optional amounts: `STARTER_AMOUNT_CENTS=2900`, `PRO_AMOUNT_CENTS=5900`

API endpoint: `/api/create-payment-link?plan=Starter|Professional`

### Deploying to Vercel (API mode)

1. Import this repository into Vercel at <https://vercel.com/new>
2. In Project Settings → Environment Variables, add:
   - `VITE_PAYMENT_MODE` = `api`
   - `SQUARE_ACCESS_TOKEN` = your square access token (server-only)
   - `SQUARE_LOCATION_ID` = your square location id (server-only)
   - `STARTER_AMOUNT_CENTS` = `2900` (optional)
   - `PRO_AMOUNT_CENTS` = `5900` (optional)
3. Deploy the project

Local testing:

```powershell
npm i -g vercel
vercel dev
```

## Scripts

- `dev`: start the Vite dev server
- `build`: generate production assets to `dist/`
- `preview`: serve the built assets locally

## License

Proprietary. Do not redistribute without permission.
