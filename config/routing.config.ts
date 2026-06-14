// Transparent decision tree — tunable here without touching app code.
// Results lean toward booking (B / Numbers Review) when signals are mixed.
// Add eligibility inputs once that module is built in Phase 2.

import type {
  Answers,
  GapCashBracket,
  ResultKey,
  TimelineAnswer,
} from "@/lib/types";

// Thresholds as named constants — change values here to retune post-show.
const SERIOUS_TIMELINES: TimelineAnswer[] = ["0-3", "3-6"];
const STRONG_GAP_BRACKETS: GapCashBracket[] = ["75-150k", "150k-plus"];

export function computeResult(answers: Answers): ResultKey {
  const { timeline, gapCash, paymentPref, openness } = answers;

  // Result C: wants ONLY assumables AND can't realistically solve the gap.
  // This is the only clear non-fit route. Keep it narrow — lean toward B otherwise.
  if (
    openness === "no-only-assumables" &&
    (gapCash === "under-25k" || gapCash === "25-75k")
  ) {
    return "C";
  }

  // Result A: serious timeline, realistic gap plan, open to the process.
  const hasGoodTimeline = timeline && SERIOUS_TIMELINES.includes(timeline);
  const hasGapPlan =
    (gapCash && STRONG_GAP_BRACKETS.includes(gapCash)) ||
    paymentPref === "cash" ||
    paymentPref === "compare";
  const isOpen = openness !== "no-only-assumables";

  if (hasGoodTimeline && hasGapPlan && isOpen) {
    return "A";
  }

  // Result B: everything else — the default. Always leads to a conversation.
  return "B";
}
