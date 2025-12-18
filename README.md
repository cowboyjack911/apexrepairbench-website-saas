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

- Vercel: zero‑config for Vite projects
- Netlify: drag‑and‑drop or CI deploy
- GitHub Pages: serve `dist/` via Pages

## Scripts

- `dev`: start the Vite dev server
- `build`: generate production assets to `dist/`
- `preview`: serve the built assets locally

## Topics

Suggested GitHub topics: `saas`, `vite`, `react`, `typescript`, `marketing-site`, `apexrepairbench`.

## License

Proprietary. Do not redistribute without permission.
