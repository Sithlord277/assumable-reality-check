# The Assumable Reality Check

A mobile-first educational mini-guide that teaches buyers how assumable mortgages really
work (with the Equity Gap as the centerpiece), then routes every user to the right next-step
call with Martin Tsatskin (Elevate48 / Libertas Real Estate).

Built for the home show opening July 17, 2026. Realtor-branded, no backend, no login.

## Run it locally

```
npm install
npm run dev
```

Then open http://localhost:3000 . The app is designed mobile-first, so narrow the browser
to a phone width (about 390px) to see it the way buyers will.

## Build for production

```
npm run build
npm start
```

Deploys cleanly to Vercel (import the repo, default settings).

## Where things live

- `app/` , Next.js App Router shell. `page.tsx` renders the current step from flow state.
- `components/steps/` , one component per screen in the flow.
- `components/ui/` , shared building blocks (buttons, progress, tiles, etc.).
- `lib/content.ts` , ALL screen copy in one place. Edit here to change wording.
- `lib/flow.ts` , the order of the screens.
- `lib/state.tsx` , the flow state (current step + the user's answers).
- `config/app.config.ts` , feature flags (demo mode, gamification) plus Calendly / EmailJS settings.
- `branding/brand_assets.md` , colors, fonts, and logo usage.

## Configure before launch

Copy `.env.example` to `.env.local` and fill in:

- EmailJS keys, for "email me my results."
- Your Calendly link(s). One general link, or a different link per result type.

## Copy and compliance

All copy is drafted in Martin's voice and is marked as draft pending his final voice pass.
Numbers shown in the app are examples only. The app is educational and is not a loan approval.
