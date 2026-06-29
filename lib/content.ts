// Single source of truth for screen copy. Drafted in Martin's voice
// (see Docs/marty-tsatskin-brain-document-v7.md), pending his final voice pass.
// Hard rules honored: no em dashes, no AI-tell phrases, one-beat clarity.

export const brand = {
  appName: "The Assumable Opportunity Guide",
  company: "Elevate48",
  team: "Libertas Real Estate",
  advisor: "Martin Tsatskin",
  tagline: "It's your story, let's write it together.",
};

export const whatIsAssumable = {
  stepLabel: "What is an assumable loan?",
  headline: "Same rate. Same balance. Same terms. Just a new name on it -- yours.",
  video: {
    eyebrow: "~50-sec explainer",
    title: "Here's the actual mechanics, no jargon.",
    duration: "Watch the quick explainer, then keep going.",
    src: "/videos/what-is-assumable-explainer.mp4",
    poster: "/videos/what-is-assumable-explainer.jpg",
  },
  visual: {
    label: "A simplified picture of how it's structured:",
    homePrice: "Home purchase price",
    existingLoan: "Seller's existing loan",
    existingRate: "Their rate",
    todayRate: "Today's rate",
    rateNote: "(example only)",
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
  headline: "FHA, VA, and USDA assumptions each play by different rules.",
  video: {
    eyebrow: "~45-sec explainer",
    title: "Tap each card below to find yours.",
    duration: "Watch the walkthrough, then explore the cards.",
    src: "/videos/eligibility-explainer.mp4",
    poster: "/videos/eligibility-explainer.jpg",
  },
  flipCards: [
    {
      id: "fha",
      front: { label: "FHA Loans", hook: "Primary home only", icon: "house" },
      back: {
        label: "FHA Assumptions",
        points: [
          "Must be the assuming buyer's primary residence",
          "Any buyer can assume -- vet or not",
          "Standard FHA underwriting still applies",
          "Servicer approval required",
        ],
      },
    },
    {
      id: "va",
      front: { label: "VA Loans", hook: "Primary or investment", icon: "shield" },
      back: {
        label: "VA Assumptions",
        points: [
          "Buyer can use as primary or as an investment property",
          "Non-veterans can assume a VA loan",
          "VA underwriting standards apply regardless",
          "Seller's entitlement stays tied to the home until the loan is paid off",
        ],
      },
    },
    {
      id: "usda",
      front: { label: "USDA Loans", hook: "Rural areas, income limits", icon: "field" },
      back: {
        label: "USDA Assumptions",
        points: [
          "Must be the assuming buyer's primary residence",
          "Property must be in a USDA-eligible rural area",
          "Buyer must meet USDA income limits",
          "Lender and USDA approval both required",
        ],
      },
    },
  ],
  question: "Which of these sounds most like you?",
  choices: [
    { value: "va" as const, label: "I'm a veteran or active military" },
    { value: "open-fha-va" as const, label: "Not a vet, but open to FHA, VA, or USDA" },
    { value: "not-sure" as const, label: "I'm still figuring out what fits" },
  ],
  cta: "Next",
};

export const timeline = {
  stepLabel: "Your timeline",
  headline: "One quick question about timing.",
  video: {
    eyebrow: "~45-sec explainer",
    title: "Assumable deals move on a different clock.",
    duration: "Watch before you answer -- the timing context matters.",
    src: "/videos/timeline-explainer.mp4",
    poster: "/videos/timeline-explainer.jpg",
  },
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
  headline: "There's almost never just one road to a home.",
  video: {
    eyebrow: "~60-sec explainer",
    title: "The last question before your result.",
    duration: "This one's worth watching before you answer.",
    src: "/videos/openness-explainer.mp4",
    poster: "/videos/openness-explainer.jpg",
  },
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
  video: {
    eyebrow: "~60-sec explainer",
    title: "Three real ways to handle the gap.",
    duration: "Watch the breakdown, then compare the numbers below.",
    src: "/videos/payment-structure-explainer.mp4",
    poster: "/videos/payment-structure-explainer.jpg",
  },
  scenarios: [
    {
      id: "cash" as const,
      tab: "Cash Plan",
      title: "Assume the loan + pay the gap with cash",
      note: "Fewer moving parts. Lower monthly payment. Requires significantly more cash upfront.",
    },
    {
      id: "financing" as const,
      tab: "Second Loan",
      title: "Assume the loan + finance the gap",
      note: "Less cash needed at closing. But two payments and a higher combined monthly than the assumed rate alone suggests.",
    },
    {
      id: "traditional" as const,
      tab: "Traditional",
      title: "Skip the assumption, use a new loan",
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
  video: {
    eyebrow: "~63-sec explainer",
    title: "The gap nobody puts in the headline.",
    duration: "Watch first, then answer with your own numbers in mind.",
    src: "/videos/equity-gap-explainer.mp4",
    poster: "/videos/equity-gap-explainer.jpg",
  },
  // Visual dollar figures are computed dynamically from the user's purchase price in EquityGapStep.
  visual: {
    label: "Based on your purchase price (numbers are for illustration only):",
    existingLoanSub: "at 3.25% — this is what you'd assume",
    gapSub: "This is what still has to be covered",
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
    badge: "One piece to work out",
    headline: "There's real potential here, and one piece to work through.",
    body: "You're interested and not far off. The question mark is usually the equity gap: whether the cash is there, whether a second loan makes the combined payment work, or whether eligibility needs to be confirmed. A quick numbers review lets us run the actual math before you go hunting for homes.",
    cta: "Review My Numbers With Martin",
    ctaKey: "numbersReview" as const,
    note: "We'll run real scenarios: what the full monthly looks like with and without a second loan, and whether assumables beat a conventional deal for your situation.",
  },
  C: {
    badge: "A different road, same destination",
    headline: "A different path may get you there faster.",
    body: "Assumables are one tool, not the only one. Given your timeline, cash position, or eligibility picture, there may be a faster or more effective road to homeownership. Rate buydowns, down payment assistance, seller concessions, or a different loan type can all put you in a stronger position. The destination is the same — the route just looks different.",
    cta: "Explore My Buying Options",
    ctaKey: "strategyCall" as const,
    note: "This is a strategy call, not a sales call. We look at what actually works for your situation right now.",
  },
} as const;

export const price = {
  video: {
    eyebrow: "~25-sec intro",
    title: "Let's make the numbers yours.",
    duration: "Quick watch before you pick your range.",
    src: "/videos/price-explainer.mp4",
    poster: "/videos/price-explainer.jpg",
  },
};

export const resultScreen = {
  video: {
    eyebrow: "~30-sec wrap-up",
    title: "Here's where you land.",
    duration: "Watch before you scroll to your result.",
    src: "/videos/result-explainer.mp4",
    poster: "/videos/result-explainer.jpg",
  },
  agentQuestion: "Anything I should know before we talk?",
  agentChoices: [
    { value: "working-with-agent", label: "I'm already working with an agent" },
    { value: "no-agent", label: "I don't have an agent yet" },
    { value: "skip", label: "I'd rather just get to the call" },
  ],
  bookingIntro: "Talk to a real person, not a form.",
  bookingSubtitle: "Martin Tsatskin · Libertas Real Estate · Elevate48",
};

export const disclaimerShort =
  "Educational only. This is not a loan approval, and every number you see here is an example.";

export const disclaimerLong =
  "This tool is for educational purposes only and is not a loan approval, commitment to lend, or guarantee that an assumable loan will be available or suitable. Final options depend on buyer qualification, property details, seller loan terms, available cash, financing structure, and program requirements.";

export const welcome = {
  eyebrow: "The Assumable Opportunity Guide",
  video: {
    eyebrow: "~40-sec intro",
    title: "Welcome to the Assumable Opportunity Guide.",
    duration: "Start here before you dive in.",
    src: "/videos/welcome-explainer.mp4",
    poster: "/videos/welcome-explainer.jpg",
  },
  headline:
    "Some homes still have a *2%, 3%, or 4% mortgage* attached to them. That's the opportunity most buyers don't know to ask about.",
  cta: "Show Me the Opportunity",
};
