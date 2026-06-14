"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFlow } from "@/lib/state";
import { paymentStructure } from "@/lib/content";
import { computeExample } from "@/lib/finance";
import type { PaymentPrefAnswer } from "@/lib/types";
import ChoiceGrid from "@/components/ui/ChoiceGrid";
import CtaButton from "@/components/ui/CtaButton";

type ScenarioId = "cash" | "financing" | "traditional";

interface Tile { label: string; value: string; sub?: string }

export default function PaymentStructureStep() {
  const { next, setAnswer, answers } = useFlow();
  const [activeScenario, setActiveScenario] = useState<ScenarioId>("cash");
  const [selected, setSelected] = useState<PaymentPrefAnswer | undefined>(
    answers.paymentPref
  );
  const ex = computeExample(answers.purchasePrice ?? 500_000);

  function handleSelect(value: PaymentPrefAnswer) {
    setSelected(value);
    setAnswer({ paymentPref: value });
  }

  const c = paymentStructure;
  const intro = c.introTemplate(ex.originalLoan, ex.currentBalance, ex.gap);

  const scenarioTiles: Record<ScenarioId, Tile[]> = {
    cash: [
      { label: "Assumed loan payment", value: ex.assumedPayment + "/mo", sub: `Seller's original P&I on ${ex.originalLoan} at 3.25%, 30yr — buyer continues this payment` },
      { label: "Cash to close for gap", value: ex.gap, sub: "Paid upfront, not financed" },
      { label: "Second monthly payment", value: "None", sub: "No second loan" },
    ],
    financing: [
      { label: "Assumed loan payment", value: ex.assumedPayment + "/mo", sub: `Seller's original P&I on ${ex.originalLoan} at 3.25%, 30yr — buyer continues this payment` },
      { label: "Second loan payment", value: ex.secondPayment + "/mo", sub: `Est. on ${ex.gap} at 8%, 30yr — example only` },
      { label: "Combined monthly", value: ex.combined + "/mo", sub: "Total before taxes and insurance" },
    ],
    traditional: [
      { label: "New loan amount", value: ex.newLoan, sub: `Assuming 10% down on ${ex.price} — example only` },
      { label: "Current rate (example)", value: "~7.00%", sub: "Approximate market rate — example only" },
      { label: "Estimated payment", value: ex.marketPayment + "/mo", sub: "Est. P&I, 30yr — example only" },
    ],
  };

  const scenario = c.scenarios.find((s) => s.id === activeScenario)!;
  const tiles = scenarioTiles[activeScenario];

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Headline */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
          {c.stepLabel}
        </p>
        <h2 className="font-display text-2xl font-extrabold leading-tight text-navy">
          {c.headline}
        </h2>
      </div>

      <p className="text-base leading-relaxed text-charcoal">{intro}</p>

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
            className="glass rounded-2xl p-4"
          >
            <p className="mb-4 text-sm font-semibold text-navy">{scenario.title}</p>

            <div className="flex flex-col gap-3">
              {tiles.map((tile, i) => (
                <div key={i} className="rounded-xl bg-white/60 px-4 py-3">
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
