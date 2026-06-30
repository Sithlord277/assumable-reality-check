"use client";

import { useState } from "react";
import { useFlow } from "@/lib/state";
import { timeline as c } from "@/lib/content";
import type { TimelineAnswer } from "@/lib/types";
import ChoiceGrid from "@/components/ui/ChoiceGrid";
import CtaButton from "@/components/ui/CtaButton";
import VideoExplainer from "@/components/ui/VideoExplainer";

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
        <h2 className="font-display text-2xl font-extrabold leading-tight text-charcoal">
          {c.headline}
        </h2>
      </div>

      <VideoExplainer
        eyebrow={c.video.eyebrow}
        title={c.video.title}
        duration={c.video.duration}
        src={c.video.src}
        poster={c.video.poster}
      />

      <div>
        <p className="mb-3 text-base font-semibold text-charcoal">{c.question}</p>
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
