# MBtex Group — Corporate Landing Page

## Original Problem Statement
Build a corporate-level landing page for MBtex Group (Swiss international diversified group) inspired by iicbank.com's background line patterns. User-provided palette: Deep Navy #071A33, Royal Blue #1557B0, Electric Cyan #00B8D9, Gold #C9A227, White, Light Gray #F3F6F9 — recommended combo Navy + Gold + White with cyan accents. Content supplied via attached write-up (MBtex Group: real estate, fintech, sports, commodities, green brands).

## User Choices
- Single-page landing with smooth scroll navigation
- Working contact form (saved to backend)
- Placeholder contact details (info@mbtexgroup.com, Switzerland)
- Geometric line backgrounds throughout the site

## Architecture
- Frontend: React 19 + VITE 8 (migrated from CRA/craco June 2026) — vite.config.js with @ alias, envPrefix REACT_APP_, port 3000, allowedHosts, hmr clientPort 443; entry src/main.jsx, root index.html; Tailwind, framer-motion, lenis, react-fast-marquee, @phosphor-icons/react, shadcn Tabs, sonner
- Backend: NODE.JS Express (migrated from FastAPI June 2026) — /app/backend/server.js (ESM, express + mongodb driver + cors + dotenv) on port 8002 with all API logic (GET /api/, POST /api/contact with email validation, GET /api/contact). PLATFORM CONSTRAINT: supervisor conf is read-only and pins uvicorn to port 8001, so server.py is now a thin httpx ASGI proxy 8001→8002; Node runs as supervisor program `backend-node` (/etc/supervisor/conf.d/node_backend.conf)
- MongoDB via MONGO_URL/DB_NAME env (unchanged)
- Fonts: Cormorant Garamond (display), Cabinet Grotesk (overlines/UI), Manrope (body)

## Implemented (June 2026)
- Bug fixes: replaced 404 stadium image; ScrollLines FINAL (matches iicbank mechanism, verified by live inspection of reference): absolute in-document 4-line zig-zag ribbon (2 red #E81C2C + 2 gold #C9A227, 30px gaps, 45° diagonals, rounded corners, NaN-guarded path builder) spanning full document height + scroll-linked container translateX (spring, 0→~1400px) so the whole ribbon glides left→right while scrolling; behind content (z-5), footer z-10 covers. Verified by testing agent (iterations 5-9: 100% pass)
- ScrollLines REMOVED entirely (user request, June 2026): component deleted, unmounted from App.jsx, dash-travel CSS removed. Static GeometricBackground SVG patterns (hero circles/grids) remain.
- Kinetic hero: masked line-by-line reveal, parallax geometric circles, stats row, scroll cue
- Sticky glassmorphic navbar with lenis anchor navigation + mobile menu
- Slow editorial marquee of the five platforms
- Who We Are + Vision/Mission cards (navy, grid lines bg)
- Why MBtex bento grid (light gray, 6 cards, phosphor duotone icons)
- What We Do: 5 numbered manifesto chapters with sticky outlined numbers, imagery, and fintech Tabs (Personal/Business/Merchants/Developers/Institutions, gold pill active state)
- Our Approach 5-step strip (Identify → Scale)
- Values grid + "Connected Ecosystems" manifesto block
- Contact section: glassmorphic form → MongoDB (verified), sonner toast; footer
- Grain overlay, gold selection/scrollbar, micro-interactions throughout

## Self-hosting hardening (June 2026)
- server.js is portable: serves frontend/dist when present, binds NODE_PORT||PORT||8002, loads .env from its own dir
- Missing MONGO_URL/DB_NAME → boots anyway, clear log, contact routes 503 (fixed Infomaniak crash loop; verified by testing agent iteration_12)
- Unreachable DB → try/catch on Mongo ops returns 503, unhandledRejection/uncaughtException handlers keep process alive; input length caps added
- Contact.jsx API base falls back to same-origin when REACT_APP_BACKEND_URL unset

## Backlog / Next
- Branding: official MBtex horizontal VECTOR logo (user-provided SVG, /app/frontend/public/mbtex-group-horizontal-vector.svg) in navbar + footer; its globe section replaced with the previous globe (tab-icon art, base64-embedded raster) per user request; older PNG kept as fallback asset
- Favicon branding: logo globe extracted onto navy circle (favicon.ico/png + apple-touch-icon), page title "MBtex Group — Building Platforms. Connecting Markets.", theme-color #071A33
- P1: Team/company history section (placeholder in write-up)
- P2: Multi-page expansion (dedicated platform pages), newsletter capture
- P2: Admin view of contact inquiries
