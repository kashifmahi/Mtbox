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
- Bug fixes: replaced 404 stadium image; ScrollLines FINAL (matches iicbank mechanism, verified by live inspection of reference): absolute in-document 4-line zig-zag ribbon (2 red #E81C2C + 2 gold #C9A227, 30px gaps, 45° diagonals, rounded corners, NaN-guarded path builder) spanning full document height + scroll-linked container translateX (spring, 0→~1400px) so the whole ribbon glides left→right while scrolling; behind content (z-5), footer z-10 covers. Verified by testing agent (iterations 5-9: 100% pass)
- Line stroke animation FINAL: 4 SVG paths fill="none" with curved d (Q corners), pathLength="1000" normalization, CSS stroke-dasharray 420/180, @keyframes dash-travel loops stroke-dashoffset 1000→0 (durations 8/10/12/14s, staggered negative delays). Verified live: offsets cycling per-frame. GSAP scrub removed in favor of pure CSS per latest user spec; framer spring translateX glide retained.
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
- Branding: official MBtex logo (transparent PNG) in navbar + footer at /app/frontend/public/mbtex-logo.png
- Favicon branding: logo globe extracted onto navy circle (favicon.ico/png + apple-touch-icon), page title "MBtex Group — Building Platforms. Connecting Markets.", theme-color #071A33
- P1: Team/company history section (placeholder in write-up)
- P2: Multi-page expansion (dedicated platform pages), newsletter capture
- P2: Admin view of contact inquiries
