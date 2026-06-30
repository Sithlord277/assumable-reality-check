// The soft, adult gamification layer. Rewards comprehension (you learned this),
// never correctness (there are no wrong answers here). Single source of truth for
// the concept badges, the milestone rail labels, and the result fit reading.

import { FLOW } from "./flow";
import type { ResultKey, StepId } from "./types";

export type ConceptId = "basics" | "loan-types" | "equity-gap" | "payment-structures";

export interface Concept {
  id: ConceptId;
  /** The teaching step that, once passed, unlocks this concept. */
  stepId: StepId;
  label: string;
  /** One-line "you now get this" blurb for the result page. */
  blurb: string;
}

export const CONCEPTS: Concept[] = [
  {
    id: "basics",
    stepId: "what-is-assumable",
    label: "Assumable Basics",
    blurb: "How taking over a seller's loan actually works.",
  },
  {
    id: "loan-types",
    stepId: "eligibility",
    label: "Loan Types",
    blurb: "Which loans can be assumed, and which can't.",
  },
  {
    id: "equity-gap",
    stepId: "equity-gap",
    label: "The Equity Gap",
    blurb: "The hidden number that decides the whole deal.",
  },
  {
    id: "payment-structures",
    stepId: "payment-structures" as StepId,
    label: "Payment Structures",
    blurb: "The three ways buyers solve the gap.",
  },
];

// Note: the payment step id in the flow is "payment-structure" (singular).
CONCEPTS[3].stepId = "payment-structure";

/** The concept a given step unlocks when the user advances past it, if any. */
export function conceptForStep(stepId: StepId): Concept | undefined {
  return CONCEPTS.find((c) => c.stepId === stepId);
}

/** Concepts unlocked by the time the user has reached `currentIndex` in the flow. */
export function unlockedConcepts(currentIndex: number): Concept[] {
  const passedSteps = FLOW.slice(0, currentIndex);
  return CONCEPTS.filter((c) => passedSteps.includes(c.stepId));
}

// In-flow steps that show the milestone rail (everything but welcome + result).
export const RAIL_STEPS: { id: StepId; short: string }[] = [
  { id: "what-is-assumable", short: "Basics" },
  { id: "eligibility", short: "Loan Type" },
  { id: "equity-gap", short: "Equity Gap" },
  { id: "payment-structure", short: "Payments" },
  { id: "timeline", short: "Timing" },
  { id: "openness", short: "Options" },
];

export interface FitReading {
  /** Short verdict shown under the gauge. */
  fit: string;
  /** Visual tone for the badge. */
  tone: "strong" | "moderate" | "alt";
  /** Where the assumable-fit needle sits, 0..100 (cosmetic, not the clarity score). */
  needle: number;
}

export const FIT: Record<ResultKey, FitReading> = {
  A: { fit: "Strong Fit", tone: "strong", needle: 88 },
  B: { fit: "One Piece to Work Out", tone: "moderate", needle: 58 },
  C: { fit: "A Different Road", tone: "alt", needle: 30 },
};
