import type { StepId } from "./types";

// The spine, in order. Secondary qualifier modules (eligibility, timing,
// alternatives) get inserted here in Phase 2 without touching the renderer.
export const FLOW: StepId[] = [
  "welcome",
  "price",
  "what-is-assumable",
  "eligibility",
  "equity-gap",
  "payment-structure",
  "timeline",
  "openness",
  "result",
];
