"use client";

import { useFlow } from "@/lib/state";
import CtaButton from "@/components/ui/CtaButton";
import type { StepId } from "@/lib/types";

const LABELS: Record<StepId, string> = {
  welcome: "Welcome",
  price: "Your price range",
  "what-is-assumable": "What is an assumable loan?",
  eligibility: "Loan type",
  "equity-gap": "The Equity Gap",
  "payment-structure": "How an assumable payment works",
  timeline: "Your timeline",
  openness: "Other options",
  result: "Your reality check",
};

export default function PlaceholderStep() {
  const { step, next, back, index, total } = useFlow();
  const isLast = index >= total - 1;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <span className="mb-4 rounded-full bg-cream-deep px-4 py-1 text-xs font-semibold uppercase tracking-wide text-navy">
          Coming next
        </span>
        <h2 className="text-2xl font-bold text-navy">{LABELS[step]}</h2>
        <p className="mt-3 max-w-xs text-ink/70">
          The flow and the brand shell are wired up. The real lesson for this step drops in
          here next.
        </p>
      </div>

      <div className="space-y-3">
        {!isLast && <CtaButton onClick={next}>Continue</CtaButton>}
        <CtaButton variant="ghost" onClick={back}>
          Back
        </CtaButton>
      </div>
    </div>
  );
}
