// Shared types for the flow, answers, and routing.

export type StepId =
  | "welcome"
  | "price"
  | "what-is-assumable"
  | "eligibility"
  | "equity-gap"
  | "payment-structure"
  | "timeline"
  | "openness"
  | "result";

// Engagement-only (not a routing input): what drew them to assumables.
export type AttentionAnswer =
  | "lower-rate"
  | "lower-payment"
  | "homes-with-old-loans"
  | "not-sure"
  | "just-curious";

export type EligibilityAnswer = "va" | "open-fha-va" | "not-sure";

export type GapCashBracket = "under-25k" | "25-75k" | "75-150k" | "150k-plus";

export type PaymentPrefAnswer = "cash" | "financing" | "compare" | "not-sure";

export type TimelineAnswer = "0-3" | "3-6" | "6-12" | "researching";

export type OpennessAnswer = "yes" | "maybe" | "no-only-assumables" | "not-sure";

export type ResultKey = "A" | "B" | "C";

export interface Answers {
  purchasePrice?: number;
  attention?: AttentionAnswer;
  eligibility?: EligibilityAnswer;
  gapCash?: GapCashBracket;
  paymentPref?: PaymentPrefAnswer;
  timeline?: TimelineAnswer;
  openness?: OpennessAnswer;
}
