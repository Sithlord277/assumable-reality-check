"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFlow } from "@/lib/state";
import { eligibility as c } from "@/lib/content";
import type { EligibilityAnswer } from "@/lib/types";
import ChoiceGrid from "@/components/ui/ChoiceGrid";
import CtaButton from "@/components/ui/CtaButton";
import RichText from "@/components/ui/RichText";

function HouseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
      <path d="M9 21v-9h6v9" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 4 6v6c0 5 3.6 9.3 8 10.3 4.4-1 8-5.3 8-10.3V6l-8-4z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function FieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18c4-4 12-4 16 0" />
      <path d="M6 14c3-3 9-3 12 0" />
      <path d="M12 4v16" />
      <path d="M8 8h8" />
    </svg>
  );
}

function getIcon(id: string) {
  if (id === "fha") return HouseIcon;
  if (id === "va") return ShieldIcon;
  return FieldIcon;
}

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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 + index * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.98 }}
      onClick={onOpen}
      aria-label={`Open ${card.front.label} details`}
      className="advisor-surface flex min-h-[132px] flex-col items-center justify-center gap-3 rounded-tile px-2 py-4 text-center transition-colors hover:border-gold/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber/12 text-amber ring-1 ring-amber/25">
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <p className="text-[0.78rem] font-extrabold leading-tight text-navy">{card.front.label}</p>
        <p className="mt-1 text-[0.63rem] font-semibold uppercase tracking-wider text-ink/55">
          {card.front.hook}
        </p>
      </div>
    </motion.button>
  );
}

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
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/55 px-6"
        >
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="glass-dark w-full max-w-sm rounded-tile px-6 pb-6 pt-5 text-cream shadow-lift"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
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
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-cream/80 transition-colors hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {card.back.points.map((pt) => (
                <div key={pt} className="flex items-start gap-3">
                  <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                  <p className="text-sm leading-relaxed text-cream/90">{pt}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="advisor-surface rounded-tile px-5 py-4">
          <div className="premium-rule mb-4 w-20" />
          <p className="mb-1 text-[0.72rem] font-bold uppercase tracking-widest text-amber">
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

      <LoanModal card={activeCard} onClose={() => setActiveCard(null)} />
    </div>
  );
}
