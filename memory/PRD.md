# MBtex Group — Corporate Landing Page

## Original Problem Statement
Build a corporate-level landing page for MBtex Group (Swiss international diversified group) inspired by iicbank.com's background line patterns. User-provided palette: Deep Navy #071A33, Royal Blue #1557B0, Electric Cyan #00B8D9, Gold #C9A227, White, Light Gray #F3F6F9 — recommended combo Navy + Gold + White with cyan accents. Content supplied via attached write-up (MBtex Group: real estate, fintech, sports, commodities, green brands).

## User Choices
- Single-page landing with smooth scroll navigation
- Working contact form (saved to backend)
- Placeholder contact details (info@mbtexgroup.com, Switzerland)
- Geometric line backgrounds throughout the site

## Architecture
- Frontend: React (CRA + craco), Tailwind, framer-motion, lenis smooth scroll, react-fast-marquee, @phosphor-icons/react, shadcn Tabs, sonner toasts
- Backend: FastAPI + MongoDB (motor). Endpoints: POST /api/contact, GET /api/contact
- Fonts: Cormorant Garamond (display), Cabinet Grotesk (overlines/UI), Manrope (body)

## Implemented (June 2026)
- Bug fixes: replaced 404 stadium image (chapter 03); ScrollLines rebuilt (June 2026) as iicbank-style in-flow ribbon — 3 parallel zig-zag SVG lines (gold/cyan/royal) spanning full document height on the right, scrolling with content + drawing progressively via pathLength on scrollYProgress, fading out before footer. Verified by testing agent (iteration_2: 100% pass)
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

## Backlog / Next
- Branding: official MBtex Group logo (user-provided) integrated in navbar + footer; black background removed programmatically (alpha unmatting + noise threshold), stored at /app/frontend/public/mbtex-logo.png
- P1: Team/company history section (placeholder in write-up)
- P2: Multi-page expansion (dedicated platform pages), newsletter capture
- P2: Admin view of contact inquiries
