"use client";

import { useState } from "react";
import { useFlow } from "@/lib/state";
import { equityGap } from "@/lib/content";
import { computeExample } from "@/lib/finance";
import type { GapCashBracket } from "@/lib/types";
import ChoiceGrid from "@/components/ui/ChoiceGrid";
import CtaButton from "@/components/ui/CtaButton";
import VideoExplainer from "@/components/ui/VideoExplainer";

export default function EquityGapStep() {
  const { next, setAnswer, answers } = useFlow();
  const [selected, setSelected] = useState<GapCashBracket | undefined>(
    answers.gapCash
  );
  const ex = computeExample(answers.purchasePrice ?? 500_000);
  const c = equityGap;

  function handleSelect(value: GapCashBracket) {
    setSelected(value);
    setAnswer({ gapCash: value });
  }

  return (
    <div className="flex flex-1 flex-col gap-5">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
          {c.stepLabel}
        </p>
        <h2 className="font-display text-2xl font-extrabold leading-tight text-charcoal">
          {c.headline}
        </h2>
      </div>

      {/* Video — compact horizontal layout since this step has the most content */}
      <VideoExplainer
        eyebrow={c.video.eyebrow}
        title={c.video.title}
        duration={c.video.duration}
        src={c.video.src}
        poster={c.video.poster}
        compact
      />

      {/* Example numbers */}
      <div className="advisor-surface rounded-tile px-5 py-4">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-gold">
          Your example numbers
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3">
          <div className="rounded-lg border border-line bg-white-soft px-4 py-3">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink/48">
              Purchase price
            </p>
            <p className="mt-1 text-2xl font-extrabold tabular text-charcoal">{ex.price}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-navy px-4 py-3 text-cream">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-cream/55">
                Loan assumed
              </p>
              <p className="mt-1 text-xl font-extrabold tabular">{ex.currentBalance}</p>
            </div>
            <div className="rounded-lg border-2 border-sunset bg-sunset/10 px-4 py-3">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-sunset">
                Gap
              </p>
              <p className="mt-1 text-xl font-extrabold tabular text-sunset">{ex.gap}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="mb-3 text-base font-semibold text-charcoal">{c.question}</p>
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
