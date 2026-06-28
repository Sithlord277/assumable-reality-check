# Project Summary

## Snapshot

**Project:** The Assumable Reality Check  
**Repo:** `main` branch, remote `origin` = `https://github.com/Sithlord277/assumable-reality-check.git`

This is a mobile-first interactive guide that teaches homebuyers how assumable mortgages work, with special focus on the equity gap, then routes them to a call with Martin Tsatskin / Elevate48 / Libertas Real Estate.

The **GitHub-tracked app** is a single-page Next.js flow with multiple steps. The **local working tree currently differs from the committed version**: it includes recent equity-gap video integration work, updated example math, a new `VideoExplainer` component, and local video assets under `public/videos/`.

## What The App Does

The current implementation is a **9-step flow** (not 5 screens).

| Step | What happens / lesson | Question asked |
|---|---|---|
| `welcome` | Intro screen explaining that some homes still carry low mortgage rates and that the app will help determine whether that actually helps the buyer. | None |
| `price` | Collects the buyer's price range using presets or manual input. This price drives the example numbers shown later. | "What price range are you shopping in?" |
| `what-is-assumable` | Explains what an assumable loan is, which loan types usually allow it, and shows a simplified structure with example loan/rate visuals. | "What first got your attention about assumable loans?" |
| `eligibility` | Explains FHA, VA, and USDA assumption rules using tap-to-open cards. | "Which of these sounds most like you?" |
| `equity-gap` | Explains the equity gap. In the current local version, this step starts with an embedded HeyGen explainer video, then shows a short written takeaway and example numbers. | "If the right home came along, how much could you realistically put toward a gap like this?" |
| `payment-structure` | Compares three ways to handle the deal: pay the gap in cash, finance the gap, or skip the assumption and use a new loan. | "Which structure sounds most realistic for you, if the right home came along?" |
| `timeline` | Explains that assumable deals can take longer and asks about timing. | "How soon are you hoping to buy?" |
| `openness` | Explains that assumables are one strategy among several and checks willingness to consider alternatives. | "If assumables don't turn out to be the best fit, are you open to exploring other options?" |
| `result` | Shows a fit/result card, unlocked concepts, and a CTA to book the appropriate call with Martin. | "Anything I should know before we talk?" but this answer is not used anywhere in logic |

## Logic / Flow

- Step order is hardcoded in [lib/flow.ts](C:/Users/demas/OneDrive/Desktop/Coding%20Projects/Assumable%20Reality%20Check/lib/flow.ts).
- State is client-only and stored in memory via [lib/state.tsx](C:/Users/demas/OneDrive/Desktop/Coding%20Projects/Assumable%20Reality%20Check/lib/state.tsx). There is no persistence, login, or backend.
- The active result logic is in [lib/routing.ts](C:/Users/demas/OneDrive/Desktop/Coding%20Projects/Assumable%20Reality%20Check/lib/routing.ts), not `config/routing.config.ts`.

**Current result paths:**

- **Result C** if:
  - `openness === "no-only-assumables"` and `gapCash === "under-25k"`, or
  - `eligibility === "not-sure"` and `gapCash === "under-25k"` and `openness === "no-only-assumables"`, or
  - `timeline === "researching"` and `openness === "no-only-assumables"`
- **Result A** if:
  - timeline is `0-3` or `3-6`, and
  - gap cash is `75-150k` or `150k-plus`, and
  - eligibility is effectively anything (`va`, `open-fha-va`, or `not-sure` are all covered by the two A rules)
- **Result B** for everything else

**Where each path ends:**

- **A** -> "Schedule My Portal Walkthrough"
- **B** -> "Review My Numbers With Martin"
- **C** -> "Explore My Buying Options"

Each CTA opens a Calendly URL from [config/app.config.ts](C:/Users/demas/OneDrive/Desktop/Coding%20Projects/Assumable%20Reality%20Check/config/app.config.ts). If the specific result URL is blank, it falls back to the general Calendly URL.

## Video Integration

### Done now

- The **equity-gap step** currently has a real embedded HeyGen video via [components/ui/VideoExplainer.tsx](C:/Users/demas/OneDrive/Desktop/Coding%20Projects/Assumable%20Reality%20Check/components/ui/VideoExplainer.tsx).
- The video is a local asset, not a remote stream:
  - [public/videos/equity-gap-explainer.mp4](C:/Users/demas/OneDrive/Desktop/Coding%20Projects/Assumable%20Reality%20Check/public/videos/equity-gap-explainer.mp4)
  - [public/videos/equity-gap-explainer.jpg](C:/Users/demas/OneDrive/Desktop/Coding%20Projects/Assumable%20Reality%20Check/public/videos/equity-gap-explainer.jpg)
- This video **replaces** the earlier tap-through explainer prototype on the equity-gap page.
- The current local version uses a **Tahlia** HeyGen avatar in **16:9**, with script/example numbers aligned to:
  - purchase price `$450,000`
  - seller loan balance about `$363,000`
  - equity gap `$87,000`

### How the script/video were created

- The script was generated manually in chat and then sent to HeyGen through the HeyGen connector, not from code in the repo.
- There were multiple recent iterations:
  - an earlier avatar video
  - a replacement avatar
  - a final Tahlia `16:9` version
- The repo only stores the **final exported MP4/JPG assets**, not the prompt history or generation workflow.

### Still just a plan

- Roll video out to the other pages **one page at a time**
- Keep the embedded video slot in a **16:9 card**
- Use a **presenter-led format** with selective motion graphics / HyperFrames support where useful
- No other page currently has video code or assets yet

## Current Tech Stack

- **Framework:** Next.js App Router
- **Language:** TypeScript
- **UI styling:** Tailwind CSS v4 via CSS theme tokens in [app/globals.css](C:/Users/demas/OneDrive/Desktop/Coding%20Projects/Assumable%20Reality%20Check/app/globals.css)
- **Animation:** Framer Motion
- **Fonts:** Fraunces Variable + Plus Jakarta Sans Variable
- **Deployment target:** Vercel
- **Client-side integrations configured:** Calendly, EmailJS

**Main folders/files:**

- `app/` -> shell, metadata, global styles
- `components/steps/` -> one component per step/screen
- `components/ui/` -> shared UI building blocks
- `lib/content.ts` -> all screen copy and result copy
- `lib/flow.ts` / `lib/state.tsx` / `lib/routing.ts` -> flow order, client state, result routing
- `lib/finance.ts` -> all example financial calculations
- `config/` -> Calendly / EmailJS / legacy routing config
- `Docs/`, `Branding/`, `Inspiration/` -> reference material, not runtime app code

## Not Yet Built / Placeholder / Partial

- No backend, database, auth, analytics, or persistence
- No "email me my results" implementation, even though EmailJS is configured in env/config and installed as a dependency
- Only the **equity-gap page** has video integration; other pages are still text-and-choice screens
- `config/routing.config.ts` appears to be an older unused routing implementation
- `components/steps/PlaceholderStep.tsx` exists but is not used
- `components/ui/ProgressBar.tsx` exists but is not used
- `components/ui/FinancialTile.tsx` appears to be leftover from the pre-video equity-gap version and is not used now
- `demoMode` and `gamification` flags exist in config but are not actively used to enable/disable behavior

## Gamification Elements

- **Step rail** at the top of most steps: cosmetic progress only
- **Unlock toast** ("Learned: Loan Types", etc.) when moving past teaching steps: cosmetic
- **Concepts mastered** grid on the result screen: cosmetic recap
- **Clarity gauge** on the result screen: always counts to `100%`, purely presentational
- **Fit badge** on the result screen: reflects result bucket A/B/C, but the `needle` values in `FIT` are cosmetic and not rendered as a real scoring engine

There is **no actual scoring system**. The app uses discrete routing logic, then decorates the result with progress/gamification UI.

## Hardcoded Assumptions

- All copy is hardcoded in [lib/content.ts](C:/Users/demas/OneDrive/Desktop/Coding%20Projects/Assumable%20Reality%20Check/lib/content.ts)
- Flow order is hardcoded in [lib/flow.ts](C:/Users/demas/OneDrive/Desktop/Coding%20Projects/Assumable%20Reality%20Check/lib/flow.ts)
- Result routing is hardcoded in [lib/routing.ts](C:/Users/demas/OneDrive/Desktop/Coding%20Projects/Assumable%20Reality%20Check/lib/routing.ts)
- Example math assumptions are hardcoded in [lib/finance.ts](C:/Users/demas/OneDrive/Desktop/Coding%20Projects/Assumable%20Reality%20Check/lib/finance.ts):
  - original loan = `85%` of price
  - current balance = `80.7%` of price
  - new conventional loan = `90%` of price
  - assumed rate = `3.25%`
  - second loan rate = `8.00%`
  - market rate = `7.00%`
- The current video asset paths are hardcoded on the equity-gap screen through `content.ts`
- Branding is hardcoded to Martin / Elevate48 / Libertas for this version

## Open Questions / Known Issues

- The user-facing app is currently **9 steps**, while some older descriptions/frame language still imply a smaller or simpler screen count
- There are duplicate routing sources: `lib/routing.ts` is active, `config/routing.config.ts` appears stale
- Some strings show encoding artifacts in source output (`â€”`, `Â·`, `âˆ’`), so text encoding should be checked before wider production polish
- The result screen's "Anything I should know before we talk?" answer is collected visually but not used anywhere
- The recent video work is still **local-only** at the moment: modified files plus untracked `public/videos/` and `VideoExplainer.tsx` are not yet committed/pushed
