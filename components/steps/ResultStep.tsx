"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFlow } from "@/lib/state";
import { computeResult } from "@/lib/routing";
import { results, resultScreen } from "@/lib/content";
import { CONCEPTS, FIT } from "@/lib/gamification";
import { appConfig } from "@/config/app.config";
import CtaButton from "@/components/ui/CtaButton";
import ClarityGauge from "@/components/ui/ClarityGauge";
import ConceptIcon from "@/components/ui/ConceptIcon";
import Disclaimer from "@/components/ui/Disclaimer";
import VideoExplainer from "@/components/ui/VideoExplainer";

type AgentAnswer = "working-with-agent" | "no-agent" | "skip";

function getBookingUrl(ctaKey: keyof typeof appConfig.calendly): string {
  return appConfig.calendly[ctaKey] || appConfig.calendly.general || "#";
}

const toneStyles: Record<
  "strong" | "moderate" | "alt",
  { chip: string; dot: string }
> = {
  strong:   { chip: "bg-mint/15 text-mint-deep ring-mint/30",         dot: "bg-mint" },
  moderate: { chip: "bg-violet-pale text-violet-deep ring-gold/20",    dot: "bg-gold" },
  alt:      { chip: "bg-cream-deep text-ink/70 ring-line",             dot: "bg-ink/40" },
};

/* ── Celebration sparkle burst ────────────────────────────────────────── */
const SPARKS = [
  { x:  0,   y: -60, color: "#7C5CFF", size: 10 },
  { x:  52,  y: -32, color: "#2DD4FF", size:  7 },
  { x:  60,  y:  20, color: "#34E0A1", size:  9 },
  { x:  30,  y:  58, color: "#7C5CFF", size:  6 },
  { x: -30,  y:  58, color: "#A48BFF", size:  8 },
  { x: -60,  y:  20, color: "#2DD4FF", size:  7 },
  { x: -52,  y: -32, color: "#34E0A1", size: 10 },
  { x: -14,  y: -62, color: "#7C5CFF", size:  6 },
  { x:  14,  y: -62, color: "#2DD4FF", size:  8 },
  { x:  65,  y: -10, color: "#34E0A1", size:  5 },
  { x: -65,  y: -10, color: "#A48BFF", size:  5 },
  { x:   0,  y:  68, color: "#7C5CFF", size:  7 },
];

function CelebrationBurst({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden>
      {SPARKS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: s.size, height: s.size, background: s.color, top: "50%", left: "50%" }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
          animate={active ? {
            x: s.x,
            y: s.y,
            scale: [0, 1.2, 0.8],
            opacity: [0, 1, 0],
          } : {}}
          transition={{ delay: 0.05 + i * 0.035, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}

export default function ResultStep() {
  const { answers, reset } = useFlow();
  const key = computeResult(answers);
  const result = results[key];
  const fit = FIT[key];
  const tone = toneStyles[fit.tone];

  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1050);
    return () => clearTimeout(t);
  }, []);

  const [agentAnswer, setAgentAnswer] = useState<AgentAnswer | undefined>();
  const bookingUrl = getBookingUrl(result.ctaKey);

  if (!revealed) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <motion.div
          className="h-16 w-16 rounded-full border-4 border-cream-deep border-t-gold"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        />
        <div>
          <p className="font-display text-xl font-semibold text-charcoal">
            Mapping your opportunity
          </p>
          <p className="mt-1 text-sm text-ink/55">Reading your answers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-7 pb-2">
      {/* Result intro video */}
      {resultScreen.video.src && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <VideoExplainer
            eyebrow={resultScreen.video.eyebrow}
            title={resultScreen.video.title}
            duration={resultScreen.video.duration}
            src={resultScreen.video.src}
            poster={resultScreen.video.poster}
          />
        </motion.div>
      )}

      {/* Certificate header */}
      <motion.div
        className="advisor-surface relative overflow-hidden rounded-tile px-6 pb-7 pt-6 text-center"
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Celebration burst */}
        <CelebrationBurst active={revealed} />

        <div className="premium-rule relative mx-auto mb-5 w-28" />

        <p className="relative text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold">
          Guide Complete
        </p>

        <div className="relative mt-5 flex justify-center">
          <ClarityGauge value={100} label="Clarity" start={revealed} />
        </div>

        <p className="relative mx-auto mt-5 max-w-[18rem] text-sm leading-relaxed text-ink/70">
          You just learned what most buyers never bother to. That puts you ahead
          before you even start looking.
        </p>
      </motion.div>

      {/* Concepts mastered */}
      <div>
        <div className="mb-3 flex items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal">
            Concepts you mastered
          </p>
          <div className="rule-gold flex-1 opacity-60" />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {CONCEPTS.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, scale: 0.8, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 320, damping: 18 }}
              className="advisor-surface flex items-center gap-2.5 rounded-xl px-3 py-2.5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold/12 text-gold ring-1 ring-gold/25">
                <ConceptIcon id={c.id} className="h-[18px] w-[18px]" />
              </span>
              <span className="text-[0.8rem] font-semibold leading-tight text-charcoal">
                {c.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Verdict card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="glass-dark rounded-tile px-6 py-6 text-cream"
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-gold-soft">
            Your next step
          </p>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wide ring-1 ${tone.chip}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
            {fit.fit}
          </span>
        </div>

        <h2 className="mt-3 font-display text-[1.6rem] font-bold leading-tight text-cream">
          {result.headline}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-cream/80">{result.body}</p>

        {/* Martin headshot + attribution */}
        <div className="mt-4 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/martin-headshot.png"
            alt="Martin Tsatskin"
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-gold/40"
          />
          <div>
            <p className="text-xs font-semibold text-cream/90">Martin Tsatskin</p>
            <p className="text-[0.65rem] text-cream/55">Libertas Real Estate · Elevate48</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-gold/25 bg-white/5 px-4 py-3">
          <div className="premium-rule mb-3 w-16" />
          <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-gold-soft">
            What happens next
          </p>
          <p className="mt-1 text-sm leading-relaxed text-cream/85">{result.note}</p>
        </div>
      </motion.div>

      {/* Agent status */}
      <div>
        <p className="mb-3 text-sm font-semibold text-charcoal">
          {resultScreen.agentQuestion}
        </p>
        <div className="flex flex-col gap-2">
          {resultScreen.agentChoices.map((choice) => {
            const isSelected = agentAnswer === choice.value;
            return (
              <motion.button
                key={choice.value}
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => setAgentAnswer(choice.value as AgentAnswer)}
                className={[
                  "w-full rounded-xl border px-5 py-3 text-left text-sm font-medium transition-colors",
                  "focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/40",
                  isSelected
                    ? "border-gold bg-gold text-cream"
                    : "advisor-surface border-line/60 text-charcoal hover:border-gold/50",
                ].join(" ")}
              >
                {choice.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Booking CTA — primary, prominent */}
      <div className="advisor-surface rounded-tile px-5 py-5">
        <div className="mb-4 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/martin-headshot.png"
            alt="Martin Tsatskin"
            className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-gold/30 shadow-soft"
          />
          <div>
            <p className="font-display text-base font-bold text-charcoal">{resultScreen.bookingIntro}</p>
            <p className="text-xs text-ink/55">{resultScreen.bookingSubtitle}</p>
          </div>
        </div>
        <CtaButton
          variant="gold"
          arrow
          onClick={() => {
            if (bookingUrl !== "#") window.open(bookingUrl, "_blank");
          }}
        >
          {result.cta}
        </CtaButton>
      </div>

      <button
        type="button"
        onClick={reset}
        className="mx-auto text-xs text-ink/40 underline underline-offset-4 transition-colors hover:text-ink/65"
      >
        Start over
      </button>

      <Disclaimer long />
    </div>
  );
}
