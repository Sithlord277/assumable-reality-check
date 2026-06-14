"use client";

import { motion } from "framer-motion";
import { useFlow } from "@/lib/state";
import { welcome } from "@/lib/content";
import BrandHeader from "@/components/ui/BrandHeader";
import CtaButton from "@/components/ui/CtaButton";
import Disclaimer from "@/components/ui/Disclaimer";

const TRUST = [
  { label: "5 minutes" },
  { label: "No credit pull" },
  { label: "No calls until you ask" },
];

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function WelcomeStep() {
  const { next } = useFlow();

  return (
    <div className="flex flex-1 flex-col">
      <motion.div custom={0} variants={fade} initial="hidden" animate="show" className="pt-2">
        <BrandHeader />
      </motion.div>

      <div className="flex flex-1 flex-col justify-center py-8">
        <motion.div
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mb-4 flex items-center gap-3"
        >
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-gold">
            {welcome.eyebrow}
          </span>
          <span className="rule-gold w-10 flex-none opacity-70" />
        </motion.div>

        <motion.h1
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="text-[2.05rem] font-black leading-[1.08] text-navy"
        >
          {welcome.headline}
        </motion.h1>

        <motion.div
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-5 space-y-4 text-base leading-relaxed text-ink"
        >
          {welcome.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </motion.div>

        <motion.div
          custom={4}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-6 overflow-hidden rounded-tile border border-gold/30 bg-gradient-to-br from-white/80 to-cream-deep/60 px-5 py-4 shadow-soft"
        >
          <p className="font-display text-lg italic leading-snug text-navy">
            {welcome.reassure}
          </p>
        </motion.div>

        <motion.div
          custom={5}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-5 flex flex-wrap gap-2"
        >
          {TRUST.map((t) => (
            <span
              key={t.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/60 px-3 py-1.5 text-xs font-semibold text-ink/70"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-gold" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {t.label}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        custom={6}
        variants={fade}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        <CtaButton variant="gold" arrow onClick={next}>
          {welcome.cta}
        </CtaButton>
        <Disclaimer />
      </motion.div>
    </div>
  );
}
