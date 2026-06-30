"use client";

import { motion } from "framer-motion";
import { useFlow } from "@/lib/state";
import { welcome } from "@/lib/content";
import CtaButton from "@/components/ui/CtaButton";
import Disclaimer from "@/components/ui/Disclaimer";
import RichText from "@/components/ui/RichText";
import VideoExplainer from "@/components/ui/VideoExplainer";

const TRUST = [
  { label: "5 minutes", icon: "⚡" },
  { label: "No credit pull", icon: "🔒" },
  { label: "No calls until you ask", icon: "✓" },
];

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 + i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function WelcomeStep() {
  const { next } = useFlow();

  return (
    <div className="flex flex-1 flex-col gap-5">
      {/* Brand mark */}
      <motion.div custom={0} variants={fade} initial="hidden" animate="show" className="flex items-center justify-between">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/elevate48-lockup-cropped.png"
          alt="Elevate48, Libertas Real Estate"
          className="h-9 object-contain"
        />
        <span className="rounded-full border border-line bg-white-soft px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-ink/50">
          Opportunity Guide
        </span>
      </motion.div>

      {/* Video slot */}
      {welcome.video.src && (
        <motion.div custom={1} variants={fade} initial="hidden" animate="show">
          <VideoExplainer
            eyebrow={welcome.video.eyebrow}
            title={welcome.video.title}
            duration={welcome.video.duration}
            src={welcome.video.src}
            poster={welcome.video.poster}
          />
        </motion.div>
      )}

      {/* Eyebrow */}
      <motion.div custom={2} variants={fade} initial="hidden" animate="show" className="flex items-center gap-3">
        <span className="text-[0.65rem] font-bold uppercase tracking-[0.26em] text-gold">
          {welcome.eyebrow}
        </span>
        <span className="rule-gold w-8 flex-none" />
      </motion.div>

      {/* Headline */}
      <motion.h1
        custom={3}
        variants={fade}
        initial="hidden"
        animate="show"
        className="font-display text-[2rem] font-black leading-[1.08] text-charcoal"
      >
        <RichText inline>{welcome.headline}</RichText>
      </motion.h1>

      {/* Rate comparison chip */}
      <motion.div
        custom={4}
        variants={fade}
        initial="hidden"
        animate="show"
        className="flex items-stretch gap-0 overflow-hidden rounded-2xl border border-line bg-white-soft shadow-soft"
      >
        <div className="flex flex-1 flex-col items-center justify-center py-4 px-3">
          <p className="text-[0.58rem] font-bold uppercase tracking-[0.16em] text-ink/45 mb-1">
            Then
          </p>
          <p className="text-2xl font-extrabold tabular text-mint">3.25%</p>
          <p className="text-[0.6rem] text-ink/40 mt-0.5">Assumable rate</p>
        </div>
        <div className="flex flex-col items-center justify-center px-3 py-2">
          <div className="h-8 w-px bg-line" />
          <span className="my-1 rounded bg-cream-deep px-1.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-widest text-ink/40">
            vs
          </span>
          <div className="h-8 w-px bg-line" />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center py-4 px-3">
          <p className="text-[0.58rem] font-bold uppercase tracking-[0.16em] text-ink/45 mb-1">
            Today
          </p>
          <p className="text-2xl font-extrabold tabular text-sunset">7.00%</p>
          <p className="text-[0.6rem] text-ink/40 mt-0.5">New loan avg.</p>
        </div>
      </motion.div>

      {/* Trust chips */}
      <motion.div custom={5} variants={fade} initial="hidden" animate="show" className="flex flex-wrap gap-2">
        {TRUST.map((t) => (
          <span
            key={t.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white-soft px-3 py-1.5 text-xs font-semibold text-ink"
          >
            <span className="text-sm">{t.icon}</span>
            {t.label}
          </span>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div custom={6} variants={fade} initial="hidden" animate="show" className="mt-auto space-y-4">
        <CtaButton variant="primary" arrow onClick={next}>
          {welcome.cta}
        </CtaButton>
        <Disclaimer />
      </motion.div>
    </div>
  );
}
