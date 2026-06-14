"use client";

import { motion } from "framer-motion";
import { useFlow } from "@/lib/state";
import { welcome } from "@/lib/content";
import CtaButton from "@/components/ui/CtaButton";
import Disclaimer from "@/components/ui/Disclaimer";
import RichText from "@/components/ui/RichText";

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
    transition: { delay: 0.08 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function WelcomeStep() {
  const { next } = useFlow();

  return (
    <div className="flex flex-1 flex-col">
      {/* Logo — centered, sized to match the text column */}
      <motion.div
        custom={0}
        variants={fade}
        initial="hidden"
        animate="show"
        className="pt-2 flex justify-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/elevate48-lockup.png"
          alt="Elevate48, Libertas Real Estate"
          className="w-full max-w-[300px] object-contain"
        />
      </motion.div>

      <div className="flex flex-1 flex-col mt-5">
        <motion.div
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mb-3 flex items-center gap-3"
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
          className="font-display text-[2.1rem] font-black leading-[1.07] text-navy"
        >
          <RichText inline>{welcome.headline}</RichText>
        </motion.h1>

        <motion.div
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-5 text-base leading-relaxed text-charcoal"
        >
          <RichText>{welcome.body}</RichText>
        </motion.div>

        {/* Callout — glass treatment, new payoff copy */}
        <motion.div
          custom={4}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-6 glass rounded-tile px-5 py-4"
        >
          <p className="font-display text-lg italic leading-snug text-navy">
            <RichText inline>{welcome.reassure}</RichText>
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
        className="mt-8 space-y-4"
      >
        <CtaButton variant="gold" arrow onClick={next}>
          {welcome.cta}
        </CtaButton>
        <Disclaimer />
      </motion.div>
    </div>
  );
}
