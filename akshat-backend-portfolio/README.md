# Akshat Goel — Backend Developer Portfolio

A cinematic, responsive portfolio built with Vite, React, TypeScript, Tailwind CSS v4, Three.js via React Three Fiber, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Before publishing

Search the project for these placeholders and replace them with your real public links and verified project information:

- `https://github.com/` — replace with your GitHub profile or specific repository URLs.
- `hello@akshatgoel.me` — verify this email is active or replace it.
- Project descriptions and statuses — the Dynamic Configuration Server and TaxFlow copy is intentionally framed as concepts/design focus until you replace it with completed, verifiable implementation details.
- Add your real résumé URL if you want a résumé download button.

## Design and accessibility notes

- Responsive layout for desktop, tablet, and mobile.
- Keyboard-accessible navigation and project detail dialog; Escape closes the dialog.
- Honors `prefers-reduced-motion`.
- Three.js canvas is decorative and hidden from assistive technology.
- No backend or form service is required for this static portfolio.

## Deploy

Build with `npm run build` and deploy the `dist/` folder to Vercel, Netlify, Cloudflare Pages, or a static web server.
