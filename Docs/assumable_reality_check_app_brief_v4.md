# Assumable Reality Check App Brief (v4)

**Supersedes v3.** This is the single authoritative strategy, UX, and content brief.

### What changed since v3

- Added usage context (used at home after a Lofty drip email, not completed at the booth).
- Added realtor-only branding direction for v1.
- Replaced "Scoring Logic" with "Routing Logic" (a transparent decision tree, not a points engine).
- Added the "email me my results" capture on the result screen.
- Added a spine-first build order.
- Added a demo-mode flag for the booth teaser.
- Clarified that the agent question lives at the booking step, not in the teaching flow.
- Added a copy approach (drafted from the brand brain, refined after).
- Clarified that client-side email (EmailJS/Formspree) is allowed and does not conflict with the "no Resend" rule.

---

## One-Sentence Product Summary

The Assumable Reality Check is an interactive mini-guide that teaches homebuyers how assumable loans really work, then uses their answers to create the right next-step call with Martin.

This is **not** a generic landing page. It is a mobile-first educational app tied to a three-day home show.

---

## Usage Context

The full app is completed at home, not at the booth. The flow is:

1. Buyer meets Martin at the home show. Martin gives a short teaser of the app and a few assumable-loan insights.
2. If interested, the buyer signs up through a Lofty landing page, which enters them into Lofty.
3. A Lofty smart plan emails them the app link 2 to 4 hours later, once they are likely home.
4. They complete the Assumable Reality Check at home.
5. The app routes them to a result, and every result leads to a conversation with Martin.

For v1 the app does not connect to Lofty. Lofty handles lead capture and follow-up. The app is the value and qualification piece.

---

## Branding for v1: Realtor Only

This version is branded entirely around Martin as an Arizona realtor (Elevate48 / Libertas Real Estate). Astin Mortgage does not appear in v1. The app is educational, not a lending product. If an assumable scenario comes in, Martin may refer it to a specialist lender, which does not need to surface in the app. This keeps the compliance surface simpler.

---

## Core Strategy

Assumable loans are the hook, but the real product is **buyer clarity**.

The app positions Martin as the advisor who says:

> Assumables can be powerful when they fit, but they are not automatically the best deal for everyone.

The app helps users understand:

- What an assumable loan is
- Why low existing rates are attractive
- Why the rate is only part of the story
- How the equity gap can change the deal
- How an assumable payment can be structured
- Why cash, second financing, or other strategies may matter
- Whether their next step should be a portal walkthrough, a numbers review, or a broader homebuying strategy call

---

## Primary Goal

No matter what result the user gets, the app should create a natural reason for a call with Martin.

Possible call types:

- **Portal Walkthrough** if assumables may be worth exploring
- **Numbers Review** if the equity gap, cash, or second-financing scenario needs a closer look
- **Buying Strategy Call** if assumables may not be the best first path
- **Options Review** if the buyer may be better served by another loan or real estate strategy

The app should never feel like it ends with "Good luck."
It should end with "Here is the smartest next step."

---

## Positioning Angle

Most assumable portals lead with attractive rates and payments.

This app takes a different angle:

> Before you fall in love with the low rate, let's check whether the full deal actually works.

This should feel protective, not restrictive. The app should not make assumables look bad. It should make the user smarter before they decide whether assumables are worth chasing.

---

## Preferred Name

# The Assumable Reality Check

Other possible names:

- Assumable Loan Reality Check
- The Low-Rate Reality Check
- Can You Actually Use an Assumable Loan?
- Assumable Fit Check

---

## Tagline / Hook Options

Primary emotional line:

> Don't let a rate hold you from your dreams.

Strong combined line:

> Don't let a rate hold you from your dreams, but don't let a pretty payment trick you either.

Other lines to consider:

- Some homes still have low mortgage rates attached. The question is whether they actually help you.
- Before you chase a 2.75% mortgage, find out if the full deal works.
- The rate gets your attention. The equity gap decides the deal.
- Great product when it fits. Wrong path when it does not.
- A lower rate is not the dream. The home is.

---

## App Structure: Teach First, Then Ask

Do **not** build this as a basic quiz where every screen is just a question.

Build it as:

> Lesson → Interactive Example → Personal Question → Small Reward / Progress → Next Lesson

The app should feel like a friendly mini-course with a fit check built in. Avoid "Do you understand?" style screens. Those feel too basic and out of place for adults.

---

## Suggested Module Flow

### 1. Welcome / Start

**Purpose:** Create curiosity and frame the app.

Possible copy:

> Some homes may still have 2%, 3%, and 4% mortgage rates attached. But the rate is only part of the story. Let's see if an assumable loan is actually worth chasing for you.

CTA:

> Start the Reality Check

---

### 2. What Is an Assumable Loan?

**Purpose:** Teach the basic concept before introducing any deeper numbers.

This is where the app can include the necessary "boring stuff," but it should still feel simple and visual.

Possible lesson:

> An assumable loan may allow a qualified buyer to take over the seller's existing mortgage terms instead of starting completely from scratch with a brand-new loan.

Explain simply:

- The seller already has a mortgage.
- That mortgage may have a lower rate than what is available today.
- In some cases, a qualified buyer may be able to assume that loan.
- The buyer still has to qualify.
- The home price and the seller's remaining loan balance may not be the same.
- The difference between those numbers has to be solved somehow.

Suggested visual: a simple home card with two layers, Home Price and Existing Loan Attached to the Home.

Then show:

> The exciting part is the existing rate.
> The important part is whether the full structure works.

**Ask after teaching:**

> What caught your attention about assumable loans?

Choices:

- The lower possible rate
- The lower possible payment
- I heard there are homes with old loans attached
- I am not sure yet
- I am just curious

---

### 3. Loan Type / Eligibility

**Purpose:** Loan type and eligibility are foundational, so they come early. Keep this as a fast, high-level qualifier, not a technical underwriting lesson.

Possible lesson:

> Not every mortgage can be assumed the same way. The existing loan type matters, and the buyer still has to qualify under the applicable rules.

Suggested visual tiles: VA, FHA, Other / Not Sure.

**Ask:**

> Do any of these apply to you?

Choices:

- I may be VA eligible
- I am open to FHA/VA type options
- I am not sure
- None of these apply

---

### 4. The Equity Gap (Centerpiece)

**Purpose:** Explain the biggest catch in a clear, friendly way. This is the most important module in the app. It is the most counterintuitive thing a buyer chasing a low rate does not know, and it is the moment that earns the call. Give it the most design and interaction attention.

Possible lesson:

> The equity gap is the difference between the home's purchase price and the seller's remaining assumable loan balance.

Interactive example:

- Purchase price: $500,000
- Seller's assumable loan balance: $390,000
- Equity gap: $110,000

Explain:

> The low rate may be real, but the gap still has to be solved with cash, financing, negotiation, or another strategy.

Suggested visual: large rounded financial tiles for Purchase Price, Existing Loan Balance, and Equity Gap, with the gap shown as a bridge or missing piece between the loan balance and the purchase price.

**Ask after teaching:**

> If the right home came along, how much money could you realistically bring toward a gap?

Choices can be simple ranges or a slider. Exact ranges can be decided later.

---

### 5. How an Assumable Payment Works

**Purpose:** Show that the assumable payment may work differently depending on how the equity gap is handled. Do not frame this as "the portal payment is wrong." Frame it as:

> The payment depends on how the deal is structured.

Show three clean scenarios:

**Scenario A: Assume the loan + pay the equity gap with cash**
Tiles: assumable loan payment, cash used for gap, no second payment, total monthly may stay closer to the assumed loan payment.

**Scenario B: Assume the loan + use second financing for the equity gap**
Tiles: assumable loan payment, second loan/payment, combined monthly payment, cash needed may be lower but monthly payment may increase.

**Scenario C: Skip the assumption and use traditional financing**
Tiles: new loan amount, current market rate example, estimated payment, simpler structure but possibly higher rate.

Suggested design: large swipeable comparison cards or tabs (Cash Gap Plan, Second Loan Plan, Traditional Loan Plan), each with big readable numbers and a short "what this means" note.

**Ask after teaching:**

> Which payment structure sounds most realistic for you if the right home came along?

Choices:

- I may have cash for the gap
- I would likely need financing for the gap
- I would want to compare both
- I am not sure yet

---

### 6. Timing and Complexity

**Purpose:** Explain that assumables can work, but may not move like a standard purchase. Keep this as a fast qualifier.

Possible lesson:

> Assumable transactions may involve the seller, servicer, title, escrow, buyer qualification, and extra coordination. They can work, but they are not always fast.

Suggested visual: a simple timeline path (Find home, Review loan details, Qualify, Coordinate servicer, Close).

**Ask:**

> How soon are you hoping to buy?

Choices:

- Now to 3 months
- 3 to 6 months
- 6 to 12 months
- Just researching

---

### 7. If Assumables Are Not the Best Fit

**Purpose:** Keep the door open to other homebuying strategies.

Possible lesson:

> Assumables are one possible strategy. If they do not fit your cash, timing, eligibility, or home search, there may be other options worth exploring.

Alternatives to mention generally (do not go deep): traditional purchase loan, temporary or permanent buydown, down payment assistance, FHA/VA options, seller concessions, different price range or home search strategy.

**Ask:**

> If assumables do not appear to be the best fit, would you be open to exploring other homebuying options?

Choices:

- Yes, I want to know my best path
- Maybe, if the numbers make sense
- No, I only want assumables
- I am not sure yet

---

### 8. Result / Next Step

Do not make the result feel like a final verdict. Make it feel like the next best move.

Result categories:

- **Assumables may be worth exploring**
- **Maybe, but the numbers need a closer look**
- **Another buying strategy may be smarter first**

Every result leads to a call with Martin. Example CTAs:

- Schedule My 5-Minute Portal Walkthrough
- Review My Numbers With Martin
- See Better Buying Options
- Talk Through My Homebuying Strategy

**Email me my results.** The result screen offers to email the user a copy of their results. This serves the user, confirms their email, and gives Martin the qualification payload even if they never book. Implement with a client-side email service (see Technical Scope).

**Agent question lives here, not in the teaching flow.** Ask "Is there anything I should know before we talk?" with agent status as one option, at the booking or result step. Keep it out of the lesson flow so it does not interrupt the learning experience.

---

## Routing Logic

Results are a transparent decision tree, not a points engine. Keep the routing in its own config file so it can be tuned after the show without touching app code.

Three result buckets, each leading to a different call type:

- **Result A, Portal Walkthrough.** Serious timeline, cash or a realistic plan to solve the gap, and likely eligible.
- **Result B, Numbers Review.** Interested, but gap-solving is shaky or uncertain.
- **Result C, Buying Strategy Call.** Not a strong fit, or "assumables or nothing" with no realistic way to solve the gap.

Routing inputs to support: timeline, cash comfort for the equity gap, VA/FHA eligibility or uncertainty, openness to other strategies, and buyer seriousness.

Do not finalize the thresholds yet. Claude Code should ask Martin in plan mode and set the rules from two or three real buyer profiles. Build it so routing can be adjusted easily later.

Any on-screen "score" or progress is cosmetic and rewards comprehension. It is separate from this functional routing.

---

## Build Order: Spine First

Build and fully wire the core path before adding the rest, so a complete working app exists even if later modules slip:

> Hook → What an assumable is → The Equity Gap → How buyers solve the gap → fast fit taps → Result → email results + book the call

Once the spine works end to end, layer back in this order: loan type / eligibility, timing and complexity, then the alternatives module. These three are fast qualifiers that feed routing and do not each need a full teaching lesson.

---

## Visual Consensus

The app should feel like adult financial clarity with a friendly guided experience.

Use:

- Light or warm-neutral interface
- Big rounded financial tiles
- Large touch-friendly buttons
- Simple friendly illustrations or icons
- Advisor-style insight boxes
- Progress indicators
- Soft, optional gamification
- Clean calculator-style moments
- Mobile-first layout

Avoid:

- Dark premium aesthetic
- Organic nature/moss/tree visuals
- Abstract AI startup design
- Payday loan app energy
- Overly childish cartoon world
- Cold bank portal design
- Dense mortgage calculator screens
- Generic real estate landing page look

---

## Design Elements to Use

### Big Financial Tiles

Large rounded cards for concepts like Existing Rate, Current Rate, Purchase Price, Existing Loan Balance, Equity Gap, Cash Needed, Second Payment, Combined Payment, Timeline Fit, and Next Step. These should feel like clean spreadsheet/PowerPoint tiles made into a modern app.

### Friendly Lesson Cards

Each major concept has a short explanation card. Example:

> **Why this matters:** The low rate is only one part of the deal. If the seller owes much less than the purchase price, the gap still has to be solved.

### Light Gamification (Optional)

If used at all, gamification rewards progress and comprehension, never correctness. This is a fit check, not a test. There are no wrong answers and no "correct!" feedback. Possible elements: Lesson Complete, "You unlocked: Equity Gap," Reality Check Progress, "You're starting to see the full picture." Keep it adult and subtle. Whether to include any gamification in v1 is a plan-mode discussion item.

### Friendly Illustrations / Icons

Simple icons or light illustrations to make the guide less intimidating: house, key, rate tag, piggy bank or cash stack, bridge/gap, clock, calculator, checkmark, caution sign. Avoid anything childish or cartoon-animal based.

---

## Tone Guidelines

Tone should be clear, honest, warm, advisor-like, slightly playful, not salesy, not fear-based, not overly technical, and not anti-assumable.

Use phrases like:

- "May be worth exploring"
- "The rate is only part of the story"
- "Let's check the full numbers"
- "Not every assumable is worth chasing"
- "A low rate can help, but only if the structure works"
- "The payment depends on how the deal is structured"

Avoid phrases like:

- "Unlock secret rates"
- "Beat the banks"
- "Guaranteed lower payment"
- "Everyone should use assumables"
- "Free money"

---

## Copy Approach

Claude Code drafts all screen copy from the brand brain doc (`brand_brain.md`). The copy should sound like Martin: conversational, sarcasm with sincerity underneath, treats the reader as a smart adult, never talks down, never moralizes, never hard-sells. Hard rules: no em dashes, and none of the AI-tell phrases ("in today's ever-evolving market," "let's dive in," "navigate the landscape," and similar).

Martin's existing thesis lines map directly onto this app and should inform the copy: a low rate is not automatically a good deal, theory versus reality, and it has always been the buyer's choice.

Draft the copy, do not finalize it. A human voice pass follows before launch.

---

## First-Version Technical Scope

### Recommended Stack

Next.js + Tailwind, deployed to Vercel, EmailJS for the "email me my results" message. This matches the Chase AI Claude Code Foundations workflow. Claude Code should confirm or counter-propose with reasons in plan mode.

### Build Now

- Mobile-first interactive web app
- Multi-step teach-first lesson flow
- Interactive examples, with the Equity Gap as the showcase
- Personal questions that feed routing
- Light, optional progress/gamification
- Result screen with the three buckets
- "Email me my results" via a client-side service (EmailJS or Formspree). No backend.
- Routing logic in a separate config file
- Demo-mode flag that limits the booth teaser to about three screens
- CTA to schedule a call or portal walkthrough
- No login, no Lofty integration, no database

### Do Not Build Yet

- Supabase or any backend
- Server-side email (for example Resend). Note: client-side EmailJS/Formspree is allowed and does not conflict with this.
- User accounts, admin dashboard, content management system
- Live assumable inventory feed
- Direct portal integration
- Complex mortgage qualification engine
- Final routing thresholds without more input from Martin

---

## Demo Mode (Booth Teaser)

A demo-mode flag inside the same app shows about three screens: the hook, a taste of the Equity Gap, and a "want the full guide? scan to sign up" prompt. Single source of truth, so copy updates flow to the teaser automatically.

Booth note (not a build task): because the app lives at a URL, make sure the teaser runs on Martin's phone without relying on the building's wifi. Cache it ahead of time, and keep a short screen-recording of the demo flow as a backup.

---

## Compliance / Trust Notes

The app should not sound like it is giving loan approval or formal financial advice. Use softer language: "may be a fit," "could be worth exploring," "based on your answers," "this is not a loan approval," "numbers are examples only," and "final options depend on property, eligibility, seller loan, available cash, financing, and qualification."

Possible disclaimer:

> This tool is for educational purposes only and is not a loan approval, commitment to lend, or guarantee that an assumable loan will be available or suitable. Final options depend on buyer qualification, property details, seller loan terms, available cash, financing structure, and program requirements.

Because v1 is realtor-branded and not presenting a lending product, the compliance surface is simpler. Martin should still have his compliance person glance at the final booth materials and the app before launch.

---

## Final Build Direction

Build a warm, mobile-first, realtor-branded interactive assumable-loan mini-guide that teaches users the major concepts (with the equity gap as the centerpiece) before asking qualifying questions, then routes every user to a result that creates a reason to talk with Martin.

The app should feel like a helpful advisor walking the buyer through the reality of assumable loans, not a portal hype page and not a formal mortgage application. Build the spine first. Draft copy from the brand brain. Confirm routing thresholds with Martin before finalizing.
