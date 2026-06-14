"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

function getIcon(id: string) {
  if (id === "fha") return HouseIcon;
  if (id === "va") return ShieldIcon;
  return FieldIcon;
}

/* ── Loan Tile (compact front-face) ────────────────────────────────────── */
function LoanTile({
  card,
  index,
  onOpen,
}: {
  card: typeof c.flipCards[number];
  index: number;
  onOpen: () => void;
}) {
  const Icon = getIcon(card.id);
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={onOpen}
      className="glass flex flex-col items-center justify-center gap-3 rounded-2xl px-2 py-5 text-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 transition-shadow hover:shadow-lift"
    >
      {/* Icon with gentle breathing animation */}
      <motion.span
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber/15 text-amber ring-1 ring-amber/30"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.6 }}
      >
        <Icon className="h-6 w-6" />
      </motion.span>
      <div>
        <p className="text-[0.78rem] font-extrabold leading-tight text-navy">{card.front.label}</p>
        <p className="mt-0.5 text-[0.63rem] font-semibold uppercase tracking-wider text-ink/45">
          {card.front.hook}
        </p>
      </div>
      <span className="text-[0.6rem] font-semibold text-amber/80 tracking-wide">Tap to learn more</span>
    </motion.button>
  );
}

/* ── Centered Detail Modal ──────────────────────────────────────────────── */
function LoanModal({
  card,
  onClose,
}: {
  card: typeof c.flipCards[number] | null;
  onClose: () => void;
}) {
  const Icon = card ? getIcon(card.id) : null;

  return (
    <AnimatePresence>
      {card && (
        /* Backdrop */
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ background: "rgba(21, 41, 63, 0.55)", backdropFilter: "blur(6px)" }}
        >
          {/* Card — stop propagation so clicking the card itself still closes (matches "touch it again" UX) */}
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            onClick={onClose}
            className="glass-dark w-full max-w-sm rounded-2xl px-6 pb-6 pt-5 text-cream"
          >
            {/* Close affordance */}
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {Icon && (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber/20 text-amber ring-1 ring-amber/30">
                    <Icon className="h-5 w-5" />
                  </span>
                )}
                <p className="text-xs font-bold uppercase tracking-widest text-gold-soft">
                  {card.back.label}
                </p>
              </div>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-cream/60 text-lg leading-none">
                ×
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {card.back.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                  <p className="text-sm leading-relaxed text-cream/90">{pt}</p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-center text-[0.62rem] font-medium text-cream/35">
              Tap anywhere to close
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Step ───────────────────────────────────────────────────────────────── */
export default function EligibilityStep() {
  const { next, setAnswer, answers } = useFlow();
  const [selected, setSelected] = useState<EligibilityAnswer | undefined>(
    answers.eligibility
  );
  const [activeCard, setActiveCard] = useState<typeof c.flipCards[number] | null>(null);

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

      {/* Three compact loan tiles */}
      <div className="grid grid-cols-3 gap-2.5">
        {c.flipCards.map((card, i) => (
          <LoanTile
            key={card.id}
            card={card}
            index={i}
            onOpen={() => setActiveCard(card)}
          />
        ))}
      </div>

      {/* VA non-vet "wow" fact — celebratory treatment */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative overflow-hidden rounded-2xl border border-amber/30 bg-gradient-to-br from-amber/10 via-peach/30 to-transparent px-5 py-4 shadow-soft">
          {/* Floating star */}
          <motion.span
            className="absolute right-4 top-3 font-display text-3xl text-amber/30 select-none"
            aria-hidden
            animate={{ y: [0, -4, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            ✦
          </motion.span>
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

      {/* Centered detail modal */}
      <LoanModal card={activeCard} onClose={() => setActiveCard(null)} />
    </div>
  );
}
