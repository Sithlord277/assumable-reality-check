"use client";

import { useState } from "react";
import { useFlow } from "@/lib/state";
import { whatIsAssumable } from "@/lib/content";
import { computeExample } from "@/lib/finance";
import type { AttentionAnswer } from "@/lib/types";
import ChoiceGrid from "@/components/ui/ChoiceGrid";
import InsightCard from "@/components/ui/InsightCard";
import CtaButton from "@/components/ui/CtaButton";
import RichText from "@/components/ui/RichText";

export default function WhatIsAssumableStep() {
  const { next, setAnswer, answers } = useFlow();
  const [selected, setSelected] = useState<AttentionAnswer | undefined>(
    answers.attention
  );
  const ex = computeExample(answers.purchasePrice ?? 500_000);

  function handleSelect(value: AttentionAnswer) {
    setSelected(value);
    setAnswer({ attention: value });
  }

  const c = whatIsAssumable;

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
          {c.stepLabel}
        </p>
        <h2 className="font-display text-2xl font-extrabold leading-tight text-navy">
          {c.headline}
        </h2>
      </div>

      <RichText className="text-base leading-relaxed text-charcoal">{c.lesson}</RichText>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink/50">
          {c.visual.label}
        </p>
        <div className="advisor-surface rounded-tile p-4">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/8 text-navy" aria-hidden>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 10.5 12 4l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
                <path d="M9 21v-7h6v7" />
              </svg>
            </span>
            <span className="text-sm font-semibold text-navy">
              {c.visual.homePrice} - {ex.price}
            </span>
          </div>

          <div className="mb-3 rounded-xl bg-navy px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-cream/60">
              {c.visual.existingLoan}
            </p>
            <p className="mt-1 text-lg font-extrabold tabular text-cream">{ex.currentBalance}</p>
            <p className="text-xs text-cream/50">{c.visual.rateNote}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-amber/25 bg-amber/10 px-3 py-3 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber">
                {c.visual.existingRate}
              </p>
              <p className="mt-1 text-2xl font-extrabold tabular text-navy">3.25%</p>
              <p className="text-xs text-ink/50">{c.visual.rateNote}</p>
            </div>
            <div className="rounded-xl border border-line bg-cream-deep px-3 py-3 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink/60">
                {c.visual.todayRate}
              </p>
              <p className="mt-1 text-2xl font-extrabold tabular text-charcoal">7.00%</p>
              <p className="text-xs text-ink/50">{c.visual.rateNote}</p>
            </div>
          </div>
        </div>
      </div>

      <InsightCard label={c.insight.label}>{c.insight.body}</InsightCard>

      <div>
        <p className="mb-3 text-base font-semibold text-navy">{c.question}</p>
        <ChoiceGrid<AttentionAnswer>
          choices={c.choices}
          selected={selected}
          onSelect={handleSelect}
        />
      </div>

      <CtaButton onClick={next} className="mt-auto">
        {c.cta}
      </CtaButton>
    </div>
  );
}
