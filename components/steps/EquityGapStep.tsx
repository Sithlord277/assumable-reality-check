"use client";

import { useState } from "react";
import { useFlow } from "@/lib/state";
import { equityGap } from "@/lib/content";
import type { GapCashBracket } from "@/lib/types";
import FinancialTile from "@/components/ui/FinancialTile";
import ChoiceGrid from "@/components/ui/ChoiceGrid";
import InsightCard from "@/components/ui/InsightCard";
import CtaButton from "@/components/ui/CtaButton";

export default function EquityGapStep() {
  const { next, setAnswer, answers } = useFlow();
  const [selected, setSelected] = useState<GapCashBracket | undefined>(
    answers.gapCash
  );

  function handleSelect(value: GapCashBracket) {
    setSelected(value);
    setAnswer({ gapCash: value });
  }

  const c = equityGap;

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Headline */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
          {c.stepLabel}
        </p>
        <h2 className="text-2xl font-extrabold leading-tight text-navy">
          {c.headline}
        </h2>
      </div>

      {/* Lesson */}
      <p className="text-base leading-relaxed text-ink">{c.lesson}</p>

      {/* Financial tiles visual */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink/50">
          {c.visual.label}
        </p>
        <div className="flex flex-col gap-3">
          <FinancialTile
            label={c.visual.purchasePrice.label}
            value={c.visual.purchasePrice.value}
          />

          {/* Connecting line */}
          <div className="flex items-center gap-3 px-2">
            <div className="h-px flex-1 bg-line" />
            <span className="text-xs font-semibold text-ink/40">minus</span>
            <div className="h-px flex-1 bg-line" />
          </div>

          <FinancialTile
            label={c.visual.existingLoan.label}
            value={c.visual.existingLoan.value}
            sub={c.visual.existingLoan.sub}
            variant="navy"
          />

          {/* Equals line */}
          <div className="flex items-center gap-3 px-2">
            <div className="h-px flex-1 bg-gold/40" />
            <span className="text-xs font-semibold text-gold">equals</span>
            <div className="h-px flex-1 bg-gold/40" />
          </div>

          <FinancialTile
            label={c.visual.gap.label}
            value={c.visual.gap.value}
            sub={c.visual.gap.sub}
            variant="gap"
          />
        </div>
      </div>

      {/* Insight */}
      <InsightCard label={c.insight.label}>{c.insight.body}</InsightCard>

      {/* Question */}
      <div>
        <p className="mb-3 text-base font-semibold text-navy">{c.question}</p>
        <ChoiceGrid<GapCashBracket>
          choices={c.choices}
          selected={selected}
          onSelect={handleSelect}
        />
        <p className="mt-3 text-xs leading-relaxed text-ink/50">{c.choiceNote}</p>
      </div>

      <CtaButton onClick={next} disabled={!selected} className="mt-auto">
        {c.cta}
      </CtaButton>
    </div>
  );
}
