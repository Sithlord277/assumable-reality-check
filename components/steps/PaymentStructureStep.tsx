"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFlow } from "@/lib/state";
import { paymentStructure } from "@/lib/content";
import type { PaymentPrefAnswer } from "@/lib/types";
import ChoiceGrid from "@/components/ui/ChoiceGrid";
import CtaButton from "@/components/ui/CtaButton";

type ScenarioId = "cash" | "financing" | "traditional";

export default function PaymentStructureStep() {
  const { next, setAnswer, answers } = useFlow();
  const [activeScenario, setActiveScenario] = useState<ScenarioId>("cash");
  const [selected, setSelected] = useState<PaymentPrefAnswer | undefined>(
    answers.paymentPref
  );

  function handleSelect(value: PaymentPrefAnswer) {
    setSelected(value);
    setAnswer({ paymentPref: value });
  }

  const c = paymentStructure;
  const scenario = c.scenarios.find((s) => s.id === activeScenario)!;

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

      <p className="text-base leading-relaxed text-ink">{c.intro}</p>

      {/* Scenario tab switcher */}
      <div>
        <div className="mb-4 flex gap-2 rounded-2xl bg-cream-deep p-1">
          {c.scenarios.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveScenario(s.id as ScenarioId)}
              className={[
                "flex-1 rounded-xl px-2 py-2 text-xs font-semibold transition-all",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40",
                activeScenario === s.id
                  ? "bg-navy text-cream shadow-soft"
                  : "text-ink/60 hover:text-navy",
              ].join(" ")}
            >
              {s.tab}
            </button>
          ))}
        </div>

        {/* Scenario card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScenario}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-line bg-white/80 p-4 shadow-tile"
          >
            <p className="mb-4 text-sm font-semibold text-navy">{scenario.title}</p>

            <div className="flex flex-col gap-3">
              {scenario.tiles.map((tile, i) => (
                <div key={i} className="rounded-xl bg-cream-deep px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">
                    {tile.label}
                  </p>
                  <p className="mt-1 text-2xl font-extrabold tabular text-navy">
                    {tile.value}
                  </p>
                  {tile.sub && (
                    <p className="mt-0.5 text-xs leading-snug text-ink/50">{tile.sub}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border-l-4 border-gold bg-gold/5 px-4 py-3">
              <p className="text-sm leading-relaxed text-charcoal">{scenario.note}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="mt-3 text-xs leading-relaxed text-ink/40">{c.complianceNote}</p>
      </div>

      {/* Routing question */}
      <div>
        <p className="mb-3 text-base font-semibold text-navy">{c.question}</p>
        <ChoiceGrid<PaymentPrefAnswer>
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
