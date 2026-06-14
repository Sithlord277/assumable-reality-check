"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useFlow } from "@/lib/state";
import CtaButton from "@/components/ui/CtaButton";

const MIN_PRICE = 300_000;
const DEFAULT_PRICE = 500_000;

const PRESETS = [
  { label: "$350k", value: 350_000 },
  { label: "$500k", value: 500_000 },
  { label: "$750k", value: 750_000 },
  { label: "$1M+", value: 1_000_000 },
];

function formatDisplay(n: number): string {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + "M";
  if (n >= 1_000) return "$" + Math.round(n / 1_000) + "k";
  return "$" + n;
}

function parseInput(raw: string): number {
  const stripped = raw.replace(/[^0-9]/g, "");
  return stripped ? parseInt(stripped, 10) : 0;
}

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.05 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function PriceStep() {
  const { next, setAnswer, answers } = useFlow();
  const [raw, setRaw] = useState(
    answers.purchasePrice ? String(answers.purchasePrice) : ""
  );
  const [clamped, setClamped] = useState(false);

  const numericValue = parseInput(raw);
  const isValid = numericValue >= MIN_PRICE;

  function handlePreset(v: number) {
    setRaw(String(v));
    setClamped(false);
    setAnswer({ purchasePrice: v });
  }

  function handleBlur() {
    if (numericValue > 0 && numericValue < MIN_PRICE) {
      setRaw(String(MIN_PRICE));
      setAnswer({ purchasePrice: MIN_PRICE });
      setClamped(true);
    } else if (numericValue >= MIN_PRICE) {
      setAnswer({ purchasePrice: numericValue });
      setClamped(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRaw(e.target.value.replace(/[^0-9]/g, ""));
    setClamped(false);
  }

  function handleContinue() {
    const price = isValid ? numericValue : DEFAULT_PRICE;
    setAnswer({ purchasePrice: price });
    next();
  }

  return (
    <div className="flex flex-1 flex-col gap-7">
      <motion.div custom={0} variants={fade} initial="hidden" animate="show">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
          Let's personalize this
        </p>
        <h2 className="font-display text-[1.75rem] font-black leading-tight text-navy">
          What price range are you shopping in?
        </h2>
        <p className="mt-3 text-base leading-relaxed text-charcoal">
          Every example in this check will use your number — so the math is relevant to your actual situation, not some generic scenario.
        </p>
      </motion.div>

      {/* Preset chips */}
      <motion.div custom={1} variants={fade} initial="hidden" animate="show" className="flex flex-wrap gap-2">
        {PRESETS.map((p) => {
          const active = numericValue === p.value;
          return (
            <button
              key={p.value}
              type="button"
              onClick={() => handlePreset(p.value)}
              className={[
                "rounded-full border px-5 py-2.5 text-sm font-bold transition-all",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50",
                active
                  ? "border-navy bg-navy text-cream shadow-soft"
                  : "border-line bg-white/70 text-navy hover:border-gold/60 hover:bg-gold/5",
              ].join(" ")}
            >
              {p.label}
            </button>
          );
        })}
      </motion.div>

      {/* Number field */}
      <motion.div custom={2} variants={fade} initial="hidden" animate="show">
        <label className="mb-2 block text-sm font-semibold text-navy">
          Or type your own
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-navy/40">
            $
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={raw}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="500,000"
            className="w-full rounded-2xl border border-line bg-white/80 py-4 pl-8 pr-4 text-xl font-extrabold tabular text-navy placeholder:text-ink/30 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25"
          />
        </div>
        {clamped && (
          <p className="mt-2 text-xs font-medium text-amber">
            We bumped that up to $300,000 — the minimum for this tool to be useful.
          </p>
        )}
        {raw && !clamped && isValid && (
          <p className="mt-2 text-xs text-ink/50">
            We'll use {formatDisplay(numericValue)} across every example.
          </p>
        )}
      </motion.div>

      {/* Glass info card */}
      <motion.div
        custom={3}
        variants={fade}
        initial="hidden"
        animate="show"
        className="glass rounded-tile px-5 py-4"
      >
        <p className="text-sm leading-relaxed text-charcoal">
          This is just for your examples — not a loan application, not a commitment. We won't store it or share it.
        </p>
      </motion.div>

      <motion.div custom={4} variants={fade} initial="hidden" animate="show" className="mt-auto">
        <CtaButton variant="gold" arrow onClick={handleContinue}>
          {isValid ? `Use ${formatDisplay(numericValue)}` : "Use $500k as my example"}
        </CtaButton>
      </motion.div>
    </div>
  );
}
