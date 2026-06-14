# Assumable Reality Check — Build Setup (Claude Code)

**Date:** June 13, 2026
**Authoritative brief:** `/docs/app_brief_v4.md`
**Context:** This is for a home show that opens July 17, 2026. The brief calls for a spine-first build so a complete working app exists early.

This is the short operational doc for getting started. All strategy, UX, content, routing, scope, and compliance live in `app_brief_v4.md`. This file only covers setup and read order.

---

## Read order (before writing any code)

1. `/docs/app_brief_v4.md` — the full strategy, UX, module flow, routing, scope, and compliance. Authoritative.
2. `/docs/brand_brain.md` — Martin's voice. All copy is drafted from this.
3. `/docs/design_summary.md` and every image in `/inspiration/` — synthesize a consensus design direction, do not copy any single image.
4. `/branding/brand_assets.md` — colors, fonts, logo placement.

Then enter plan mode, ask Martin whatever you need to produce a solid build plan, and get the plan approved before writing any code.

---

## Suggested folder structure

```
assumable-reality-check/
├── docs/
│   ├── app_brief_v4.md          (authoritative brief)
│   ├── build_setup.md           (this file)
│   ├── brand_brain.md           (add before building)
│   └── design_summary.md
├── branding/
│   ├── brand_assets.md          (add: hex colors, fonts, logo placement)
│   ├── logos/
│   └── headshot.png             (optional)
├── inspiration/                 (renamed images)
├── app/                         (Claude Code builds here)
└── README.md
```

**Image naming:** rename inspiration files to describe what they show (for example `big-financial-tiles.png`, `friendly-quiz-flow.png`, `mortgage-payment-comparison.png`, `warm-guided-onboarding.png`). Claude reads filenames as context.

---

## Recommended stack (confirm in plan mode)

Suggested: Next.js + Tailwind, deployed to Vercel, EmailJS for the "email me my results" message. This matches the Chase AI Claude Code Foundations workflow (VS Code terminal, npm run dev for local development, Vercel for deployment). If Claude Code has a strong reason to suggest Vite/React instead for this specific project, it should say so in plan mode. Otherwise Next.js + Vercel is the path.
