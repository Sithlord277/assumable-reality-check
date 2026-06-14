"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useFlow } from "@/lib/state";
import { eligibility as c } from "@/lib/content";
import type { EligibilityAnswer } from "@/lib/types";
import ChoiceGrid from "@/components/ui/ChoiceGrid";
import InsightCard from "@/components/ui/InsightCard";
import CtaButton from "@/components/ui/CtaButton";
import RichText from "@/components/ui/RichText";

/* ── Icons ─────────────────────────────────────────────────────────────── */
function HouseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}
function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L4 6v6c0 5 3.6 9.3 8 10.3C16.4 21.3 20 17 20 12V6l-8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function FieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 010 14" />
      <path d="M12 16v6" />
      <path d="M9 19h6" />
      <path d="M5 8c0 2 2 4 7 4s7-2 7-4" />
    </svg>
  );
}

/* ── Flip Card ──────────────────────────────────────────────────────────── */
function FlipCard({ card, index }: { card: typeof c.flipCards[number]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = card.id === "fha" ? HouseIcon : card.id === "va" ? ShieldIcon : FieldIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-52 cursor-pointer"
      style={{ perspective: "900px" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {/* Front */}
        <div
          className="glass absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl px-3 text-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber/15 text-amber ring-1 ring-amber/30">
            <Icon className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-extrabold text-navy">{card.front.label}</p>
            <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-wider text-ink/50">
              {card.front.hook}
            </p>
          </div>
          <p className="text-[0.65rem] font-semibold text-amber">Tap to explore →</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col justify-center gap-2 rounded-2xl border border-navy/20 bg-navy px-4 py-4 shadow-lift"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-widest text-gold-soft">
            {card.back.label}
          </p>
          {card.back.points.map((pt, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
              <p className="text-[0.72rem] leading-snug text-cream/85">{pt}</p>
            </div>
          ))}
          <p className="mt-1 text-[0.62rem] font-medium text-gold/50">Tap to flip back</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Step ───────────────────────────────────────────────────────────────── */
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
        <h2 className="font-display text-2xl font-extrabold leading-tight text-navy">
          {c.headline}
        </h2>
      </div>

      <p className="text-base leading-relaxed text-charcoal">{c.intro}</p>

      {/* Three flip cards — 3-col row, equal width */}
      <div className="grid grid-cols-3 gap-2.5">
        {c.flipCards.map((card, i) => (
          <FlipCard key={card.id} card={card} index={i} />
        ))}
      </div>

      {/* VA non-vet "wow" fact — celebratory treatment */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative overflow-hidden rounded-2xl border border-amber/30 bg-gradient-to-br from-amber/10 via-peach/30 to-transparent px-5 py-4 shadow-soft">
          {/* Decorative star burst */}
          <span className="absolute right-4 top-3 font-display text-3xl text-amber/20 select-none" aria-hidden>✦</span>
          <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-widest text-amber">
            {c.funFact.label}
          </p>
          <p className="text-sm leading-relaxed text-charcoal">
            <RichText inline>{c.funFact.body}</RichText>
          </p>
        </div>
      </motion.div>

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
