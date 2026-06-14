// Transparent decision tree. Tunable here without touching any step component.
// Three result buckets match the brief exactly:
//   A = Portal Walkthrough  (assumables may be worth exploring)
//   B = Numbers Review      (interested, but the numbers need a closer look)
//   C = Buying Strategy Call (another path may be smarter first)

import type { Answers, ResultKey } from "./types";

export function computeResult(answers: Answers): ResultKey {
  const { eligibility, gapCash, timeline, openness } = answers;

  // Hard C signals -----------------------------------------------------------
  // "Assumables or nothing" but cash to solve the gap is very thin.
  if (openness === "no-only-assumables" && gapCash === "under-25k") return "C";
  // Eligibility rules out VA/FHA and cash is thin: assumables are a tough path.
  if (eligibility === "none" && gapCash === "under-25k") return "C";
  // Just researching + closed to alternatives: no clear next step toward assumables.
  if (timeline === "researching" && openness === "no-only-assumables") return "C";

  // Strong A signals ---------------------------------------------------------
  // Serious timeline + meaningful cash + likely eligible.
  const seriousTimeline = timeline === "0-3" || timeline === "3-6";
  const strongCash = gapCash === "75-150k" || gapCash === "150k-plus";
  const likelyEligible = eligibility === "va" || eligibility === "open-fha-va";

  if (seriousTimeline && strongCash && likelyEligible) return "A";

  // Secondary A: serious timeline + strong cash even if eligibility is uncertain.
  if (seriousTimeline && strongCash && eligibility === "not-sure") return "A";

  // Everything else lands in B -----------------------------------------------
  return "B";
}
