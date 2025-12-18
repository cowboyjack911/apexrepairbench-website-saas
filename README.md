<div align="center">
<h1>ApexRepairBench — SaaS Website</h1>
<p>Modern marketing site built with Vite, React, and TypeScript.</p>
</div>

## Overview

This repository contains the ApexRepairBench SaaS marketing website. It’s a fast, client‑side app built with Vite + React + TypeScript. The site includes a product tour, pricing, FAQ, competitor comparison, ROI calculator, chat widget, and a sale banner.

Key files and folders:

- Entry points: [apexrepairbench (2)/index.tsx](apexrepairbench%20(2)/index.tsx), [apexrepairbench (2)/App.tsx](apexrepairbench%20(2)/App.tsx)
- Components: [apexrepairbench (2)/components](apexrepairbench%20(2)/components)
- Services (Gemini API): [apexrepairbench (2)/services/geminiService.ts](apexrepairbench%20(2)/services/geminiService.ts)
- Config: [apexrepairbench (2)/vite.config.ts](apexrepairbench%20(2)/vite.config.ts), [apexrepairbench (2)/tsconfig.json](apexrepairbench%20(2)/tsconfig.json)

## Prerequisites

- Node.js 18 or newer (recommended Node 20)
- A Gemini API key if you plan to use the chat features

## Quick Start

1. Install dependencies

```powershell
npm install
```

2. Configure environment variables

Create a `.env.local` file (or copy from [apexrepairbench (2)/.env.example](apexrepairbench%20(2)/.env.example)) and set your Gemini key.

```env
GEMINI_API_KEY=your_key_here
VITE_GEMINI_API_KEY=your_key_here
```

3. Run the dev server

```powershell
npm run dev
```

4. Build for production

```powershell
npm run build
```

5. Preview local production build

```powershell
npm run preview
```

## Deploy

You can deploy the `dist/` output to any static host. Popular options:

- GitHub Pages: enabled via workflow at [.github/workflows/pages.yml](.github/workflows/pages.yml). The build sets the base to `/apexrepairbench-website-saas/` for correct asset paths.
- Vercel: uses [vercel.json](vercel.json) with `npm run build` and `dist/` output. Import this repo in Vercel and deploy.
- Netlify: drag‑and‑drop or CI deploy

## Subscriptions / Buy Now

Two options:
- Payment links (simple): set `VITE_STARTER_LINK`, `VITE_PROFESSIONAL_LINK`, `VITE_ENTERPRISE_CONTACT_LINK` in `.env.local`. Buttons open these URLs.
- API mode (server-generated Square links): set `VITE_PAYMENT_MODE=api` and add server secrets in Vercel/GitHub:
	- `SQUARE_ACCESS_TOKEN`
	- `SQUARE_LOCATION_ID`
	- Optional amounts: `STARTER_AMOUNT_CENTS=2900`, `PRO_AMOUNT_CENTS=5900`
API endpoint: `/api/create-payment-link?plan=Starter|Professional`. The Pricing buttons call this in API mode.
### Deploying to Vercel (API mode)

1. Import this repository into Vercel (https://vercel.com/new).
2. In the Project Settings → Environment Variables, add the following (Production):
	- `VITE_PAYMENT_MODE` = `api`
	- `SQUARE_ACCESS_TOKEN` = <your square access token> (server-only)
	- `SQUARE_LOCATION_ID` = <your square location id> (server-only)
	- `STARTER_AMOUNT_CENTS` = `2900` (optional)
	- `PRO_AMOUNT_CENTS` = `5900` (optional)

3. Deploy the project. After deployment, the Pricing buttons in API mode will call `/api/create-payment-link` and return a generated Square Payment Link.

4. To test after deploy, open your site and click a plan button — a new tab should open with the Square checkout.

Local testing:
- Run `npm run dev` for the frontend, but serverless functions require `vercel dev` for accurate local testing. Install Vercel CLI and run:

```powershell
npm i -g vercel
vercel dev
```

This serves `/api/*` routes locally.

## Scripts

- `dev`: start the Vite dev server
- `build`: generate production assets to `dist/`
- `preview`: serve the built assets locally

## Topics

Suggested GitHub topics: `saas`, `vite`, `react`, `typescript`, `marketing-site`, `apexrepairbench`.

## License

Proprietary. Do not redistribute without permission.
