"use client";

import { useState } from "react";
import { useFlow } from "@/lib/state";
import { timeline as c } from "@/lib/content";
import type { TimelineAnswer } from "@/lib/types";
import ChoiceGrid from "@/components/ui/ChoiceGrid";
import CtaButton from "@/components/ui/CtaButton";

export default function TimelineStep() {
  const { next, setAnswer, answers } = useFlow();
  const [selected, setSelected] = useState<TimelineAnswer | undefined>(
    answers.timeline
  );

  function handleSelect(value: TimelineAnswer) {
    setSelected(value);
    setAnswer({ timeline: value });
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

      <p className="text-base leading-relaxed text-ink">{c.context}</p>

      <div>
        <p className="mb-3 text-base font-semibold text-navy">{c.question}</p>
        <ChoiceGrid<TimelineAnswer>
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
