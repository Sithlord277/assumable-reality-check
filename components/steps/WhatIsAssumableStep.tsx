"use client";

import { useState } from "react";
import { useFlow } from "@/lib/state";
import { whatIsAssumable } from "@/lib/content";
import type { AttentionAnswer } from "@/lib/types";
import ChoiceGrid from "@/components/ui/ChoiceGrid";
import InsightCard from "@/components/ui/InsightCard";
import CtaButton from "@/components/ui/CtaButton";

export default function WhatIsAssumableStep() {
  const { next, setAnswer, answers } = useFlow();
  const [selected, setSelected] = useState<AttentionAnswer | undefined>(
    answers.attention
  );

  function handleSelect(value: AttentionAnswer) {
    setSelected(value);
    setAnswer({ attention: value });
  }

  function handleContinue() {
    next();
  }

  const c = whatIsAssumable;

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

      {/* Lesson paragraphs */}
      <div className="space-y-3 text-base leading-relaxed text-ink">
        {c.lesson.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* Visual: two-layer home card */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink/50">
          {c.visual.label}
        </p>
        <div className="rounded-2xl border border-line bg-white/80 p-4 shadow-tile">
          {/* Home icon row */}
          <div className="mb-4 flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label="house">🏠</span>
            <span className="text-sm font-semibold text-navy">{c.visual.homePrice}</span>
          </div>

          {/* Layer 1: Existing loan */}
          <div className="mb-3 rounded-xl bg-navy px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-cream/60">
              {c.visual.existingLoan}
            </p>
            <p className="mt-1 text-lg font-extrabold tabular text-cream">$390,000</p>
            <p className="text-xs text-cream/50">{c.visual.rateNote}</p>
          </div>

          {/* Rate comparison row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-gold/10 px-3 py-3 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                {c.visual.existingRate}
              </p>
              <p className="mt-1 text-2xl font-extrabold tabular text-navy">3.25%</p>
              <p className="text-xs text-ink/50">{c.visual.rateNote}</p>
            </div>
            <div className="rounded-xl bg-cream-deep px-3 py-3 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink/60">
                {c.visual.todayRate}
              </p>
              <p className="mt-1 text-2xl font-extrabold tabular text-charcoal">7.00%</p>
              <p className="text-xs text-ink/50">{c.visual.rateNote}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Insight card */}
      <InsightCard label={c.insight.label}>{c.insight.body}</InsightCard>

      {/* Question */}
      <div>
        <p className="mb-3 text-base font-semibold text-navy">{c.question}</p>
        <ChoiceGrid<AttentionAnswer>
          choices={c.choices}
          selected={selected}
          onSelect={handleSelect}
        />
      </div>

      {/* CTA — available without selecting (attention is engagement-only, not routing) */}
      <CtaButton onClick={handleContinue} className="mt-auto">
        {c.cta}
      </CtaButton>
    </div>
  );
}
