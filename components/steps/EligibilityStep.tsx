"use client";

import { useState } from "react";
import { useFlow } from "@/lib/state";
import { eligibility as c } from "@/lib/content";
import type { EligibilityAnswer } from "@/lib/types";
import ChoiceGrid from "@/components/ui/ChoiceGrid";
import InsightCard from "@/components/ui/InsightCard";
import CtaButton from "@/components/ui/CtaButton";

export default function EligibilityStep() {
  const { next, setAnswer, answers } = useFlow();
  const [selected, setSelected] = useState<EligibilityAnswer | undefined>(
    answers.eligibility
  );

  function handleSelect(value: EligibilityAnswer) {
    setSelected(value);
    setAnswer({ eligibility: value });
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
          {c.stepLabel}
        </p>
        <h2 className="text-2xl font-extrabold leading-tight text-navy">
          {c.headline}
        </h2>
      </div>

      <p className="text-base leading-relaxed text-ink">{c.lesson}</p>

      <InsightCard label={c.insight.label}>{c.insight.body}</InsightCard>

      <div>
        <p className="mb-3 text-base font-semibold text-navy">{c.question}</p>
        <ChoiceGrid<EligibilityAnswer>
          choices={c.choices}
          selected={selected}
          onSelect={handleSelect}
        />
      </div>

      <CtaButton onClick={next} disabled={!selected} className="mt-auto">
        {c.cta}
      </CtaButton>
    </div>
  );
}
