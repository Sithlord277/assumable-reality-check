// Single source of truth for screen copy. Drafted in Martin's voice
// (see Docs/marty-tsatskin-brain-document-v7.md), pending his final voice pass.
// Hard rules honored: no em dashes, no AI-tell phrases, one-beat clarity.

export const brand = {
  appName: "The Assumable Reality Check",
  company: "Elevate48",
  team: "Libertas Real Estate",
  advisor: "Martin Tsatskin",
  tagline: "It's your story, let's write it together.",
};

export const whatIsAssumable = {
  stepLabel: "What is an assumable loan?",
  headline: "Some sellers are still carrying mortgages from a very different market.",
  lesson: [
    "An assumable loan lets a qualified buyer take over the seller's existing mortgage instead of starting a new one from scratch. The seller already has a loan with a rate locked in from whenever they bought. In some cases, you can step into that loan and keep their terms.",
    "Not every mortgage works this way. VA and FHA loans are the ones most likely to allow it. Conventional loans usually don't.",
  ],
  visual: {
    label: "A simplified picture of how it's structured:",
    homePrice: "Home purchase price",
    existingLoan: "Seller's existing loan",
    existingRate: "Their rate",
    todayRate: "Today's rate",
    rateNote: "(example only)",
  },
  insight: {
    label: "Here's the thing.",
    body: "The exciting part is the rate. But the rate is only one piece of the deal. Whether the full structure actually works for you is the more important question. That's what this is for.",
  },
  question: "What first got your attention about assumable loans?",
  choices: [
    { value: "lower-rate" as const, label: "The possibility of a lower rate" },
    { value: "lower-payment" as const, label: "A lower monthly payment" },
    { value: "homes-with-old-loans" as const, label: "I heard some homes have old loans attached" },
    { value: "not-sure" as const, label: "I'm not sure yet" },
    { value: "just-curious" as const, label: "Just curious how it works" },
  ],
  cta: "Got it, keep going",
};

export const eligibility = {
  stepLabel: "Loan type",
  headline: "Not every mortgage can be assumed the same way.",
  lesson:
    "The seller's loan type is what determines whether an assumption is even on the table. VA and FHA loans are the ones most likely to allow it under a defined process. Conventional loans usually don't. The buyer still has to qualify either way -- you're stepping into the loan terms, not skipping underwriting.",
  insight: {
    label: "Why this matters.",
    body: "If the seller has a conventional loan, the assumption route is likely closed regardless of the rate. VA and FHA loans are the ones worth tracking down.",
  },
  question: "Do any of these apply to you or the loans you're likely to encounter?",
  choices: [
    { value: "va" as const, label: "I may be VA eligible" },
    { value: "open-fha-va" as const, label: "I'm open to FHA or VA options" },
    { value: "not-sure" as const, label: "I'm not sure" },
    { value: "none" as const, label: "None of these apply to me" },
  ],
  cta: "Next",
};

export const timeline = {
  stepLabel: "Your timeline",
  headline: "One quick question about timing.",
  context:
    "Assumable transactions can take longer than a standard purchase — the servicer, the seller, and extra paperwork all need to line up. Knowing where you are on the timeline helps figure out whether assumables are worth chasing right now or if there's a better first step.",
  question: "How soon are you hoping to buy?",
  choices: [
    { value: "0-3" as const, label: "Now to 3 months" },
    { value: "3-6" as const, label: "3 to 6 months" },
    { value: "6-12" as const, label: "6 to 12 months" },
    { value: "researching" as const, label: "Just researching for now" },
  ],
  cta: "Next",
};

export const openness = {
  stepLabel: "One more thing",
  headline: "Assumables are one strategy. Not always the only one.",
  context:
    "Sometimes assumables are the smartest move. Sometimes the gap, the timing, the loan type, or the available inventory makes a different path smarter. There are other tools: rate buydowns, down payment assistance, different price ranges, seller concessions. None of them are consolation prizes — they're just different bets.",
  question: "If assumables don't turn out to be the best fit, are you open to exploring other options?",
  choices: [
    { value: "yes" as const, label: "Yes, I want to know my best path" },
    { value: "maybe" as const, label: "Maybe, if the numbers make sense" },
    { value: "no-only-assumables" as const, label: "No, I'm only interested in assumables" },
    { value: "not-sure" as const, label: "I'm not sure yet" },
  ],
  cta: "See my results",
};

export const paymentStructure = {
  stepLabel: "How the payment works",
  headline: "The payment depends on how you solve the gap. Here are the three ways buyers do it.",
  intro:
    "Using the same example: $500,000 home, $390,000 assumable loan at 3.25%. The $110,000 gap still has to come from somewhere. How you solve it changes your monthly payment significantly.",
  scenarios: [
    {
      id: "cash" as const,
      tab: "Cash Plan",
      title: "Assume the loan + pay the gap with cash",
      tiles: [
        { label: "Assumed loan payment", value: "~$1,697/mo", sub: "Est. P&I on $390k at 3.25%, 30yr — example only" },
        { label: "Cash to close for gap", value: "~$110,000", sub: "Paid upfront, not financed" },
        { label: "Second monthly payment", value: "None", sub: "No second loan" },
      ],
      note: "Fewer moving parts. Lower monthly payment. Requires significantly more cash upfront.",
    },
    {
      id: "financing" as const,
      tab: "Second Loan",
      title: "Assume the loan + finance the gap",
      tiles: [
        { label: "Assumed loan payment", value: "~$1,697/mo", sub: "Est. P&I on $390k at 3.25%, 30yr — example only" },
        { label: "Second loan payment", value: "~$807/mo", sub: "Est. on $110k at 8%, 15yr — example only" },
        { label: "Combined monthly", value: "~$2,504/mo", sub: "Total before taxes and insurance" },
      ],
      note: "Less cash needed at closing. But two payments and a higher combined monthly than the assumed rate alone suggests.",
    },
    {
      id: "traditional" as const,
      tab: "Traditional",
      title: "Skip the assumption, use a new loan",
      tiles: [
        { label: "New loan amount", value: "~$450,000", sub: "Assuming 10% down on $500k — example only" },
        { label: "Current rate (example)", value: "~7.00%", sub: "Approximate market rate — example only" },
        { label: "Estimated payment", value: "~$2,994/mo", sub: "Est. P&I, 30yr — example only" },
      ],
      note: "One loan, simpler structure. No equity gap problem. But the rate and payment reflect today's market, not the seller's old one.",
    },
  ],
  complianceNote: "All numbers are estimates for illustration only. Actual payments depend on loan terms, rates at the time of purchase, taxes, insurance, and your specific qualification.",
  question: "Which structure sounds most realistic for you, if the right home came along?",
  choices: [
    { value: "cash" as const, label: "I may have cash for the gap" },
    { value: "financing" as const, label: "I'd likely need to finance the gap" },
    { value: "compare" as const, label: "I'd want to compare both options" },
    { value: "not-sure" as const, label: "I'm not sure yet" },
  ],
  cta: "Next",
};

export const equityGap = {
  stepLabel: "The equity gap",
  headline: "Here's the part that doesn't make it onto the listing flyer.",
  lesson:
    "The seller's assumable loan balance and the home's purchase price are almost never the same number. The difference between them is called the equity gap. It doesn't go away just because the rate is attractive. That gap has to be solved — with cash, a second loan, negotiation, or some combination. The rate is the exciting part. The equity gap is where the deal either works or doesn't.",
  visual: {
    label: "A real example (all numbers are for illustration only):",
    purchasePrice: { label: "Purchase price", value: "$500,000" },
    existingLoan: { label: "Seller's existing loan", value: "$390,000", sub: "at 3.25% — this is what you'd assume" },
    gap: { label: "Equity gap", value: "$110,000", sub: "This is what still has to be solved" },
  },
  insight: {
    label: "What this means for you.",
    body: "A buyer who assumes the $390,000 loan at 3.25% still has to come up with $110,000 somehow. Cash, a second loan, or a negotiated seller contribution. That's not a dealbreaker — but it's the question every assumable deal comes down to.",
  },
  question: "If the right home came along, how much could you realistically put toward a gap like this?",
  choices: [
    { value: "under-25k" as const, label: "Less than $25,000" },
    { value: "25-75k" as const, label: "$25,000 to $75,000" },
    { value: "75-150k" as const, label: "$75,000 to $150,000" },
    { value: "150k-plus" as const, label: "More than $150,000" },
  ],
  choiceNote: "This is just a starting point — not a commitment. The real number depends on the specific home.",
  cta: "Next",
};

export const results = {
  A: {
    badge: "Assumables may be worth exploring",
    headline: "Your situation looks like a real fit.",
    body: "You have a serious timeline, cash or a real plan to solve the gap, and the right loan type in the picture. That's the combination that actually makes an assumable worth chasing. The next step is a quick portal walkthrough so you can see what's actually available at rates you'd want to assume.",
    cta: "Schedule My Portal Walkthrough",
    ctaKey: "portalWalkthrough" as const,
    note: "This is a 5-minute call. We look at real inventory together, not generic rate tables.",
  },
  B: {
    badge: "The numbers need a closer look",
    headline: "There's real potential here, but one piece needs a closer look.",
    body: "You're interested and not far off. The question mark is usually the equity gap: whether the cash is there, whether a second loan makes the combined payment work, or whether eligibility needs to be confirmed. A quick numbers review lets us run the actual math before you go hunting for homes.",
    cta: "Review My Numbers With Martin",
    ctaKey: "numbersReview" as const,
    note: "We'll run real scenarios: what the full monthly looks like with and without a second loan, and whether assumables beat a conventional deal for your situation.",
  },
  C: {
    badge: "Another strategy may be smarter first",
    headline: "Assumables may not be the strongest first move here.",
    body: "That's not a bad outcome. Assumables are one tool, not the only one. Given your timeline, cash position, or eligibility picture, there may be a faster or more effective path to homeownership. Rate buydowns, down payment assistance, seller concessions, or a different loan type can all put you in a better position than chasing an assumable that doesn't fully work.",
    cta: "Explore My Buying Options",
    ctaKey: "strategyCall" as const,
    note: "This is a strategy call, not a sales call. We look at what actually works for your situation right now.",
  },
} as const;

export const resultScreen = {
  emailLabel: "Want a copy of your results?",
  emailPlaceholder: "your@email.com",
  emailCta: "Email Me My Results",
  emailSending: "Sending...",
  emailSent: "Sent. Check your inbox.",
  emailError: "Something went wrong. Try again.",
  emailNote: "No spam, ever. Just your results so you have them when we talk.",
  agentQuestion: "Anything I should know before we talk?",
  agentChoices: [
    { value: "working-with-agent", label: "I'm already working with an agent" },
    { value: "no-agent", label: "I don't have an agent yet" },
    { value: "skip", label: "I'd rather just get to the call" },
  ],
};

export const disclaimerShort =
  "Educational only. This is not a loan approval, and every number you see here is an example.";

export const disclaimerLong =
  "This tool is for educational purposes only and is not a loan approval, commitment to lend, or guarantee that an assumable loan will be available or suitable. Final options depend on buyer qualification, property details, seller loan terms, available cash, financing structure, and program requirements.";

export const welcome = {
  eyebrow: "The Assumable Reality Check",
  headline:
    "Some homes still have a 2%, 3%, or 4% mortgage attached to them. Let's find out if that actually helps you.",
  body: [
    "An assumable loan sounds like a cheat code: you take over the seller's old, cheap mortgage instead of getting stuck with today's rate. Sometimes it really is that good. Sometimes the low rate is the shiny object, and the real story is the pile of cash it takes to make the deal work.",
    "Give me about five minutes and you'll know which one you're looking at. No credit pull, no application, and no six different lenders blowing up your phone by dinner.",
  ],
  reassure: "It has always been your choice. This just makes it an informed one.",
  cta: "Start the Reality Check",
};
