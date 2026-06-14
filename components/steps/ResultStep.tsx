"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useFlow } from "@/lib/state";
import { computeResult } from "@/lib/routing";
import { results, resultScreen } from "@/lib/content";
import { CONCEPTS, FIT } from "@/lib/gamification";
import { appConfig } from "@/config/app.config";
import CtaButton from "@/components/ui/CtaButton";
import ClarityGauge from "@/components/ui/ClarityGauge";
import ConceptIcon from "@/components/ui/ConceptIcon";
import Disclaimer from "@/components/ui/Disclaimer";

type EmailState = "idle" | "sending" | "sent" | "error";
type AgentAnswer = "working-with-agent" | "no-agent" | "skip";

function getBookingUrl(ctaKey: keyof typeof appConfig.calendly): string {
  return appConfig.calendly[ctaKey] || appConfig.calendly.general || "#";
}

const toneStyles: Record<
  "strong" | "moderate" | "alt",
  { chip: string; dot: string }
> = {
  strong: { chip: "bg-gold/15 text-gold-deep ring-gold/30", dot: "bg-gold" },
  moderate: { chip: "bg-navy/10 text-navy ring-navy/20", dot: "bg-navy" },
  alt: { chip: "bg-cream-deep text-ink/70 ring-line", dot: "bg-ink/40" },
};

export default function ResultStep() {
  const { answers, reset } = useFlow();
  const key = computeResult(answers);
  const result = results[key];
  const fit = FIT[key];
  const tone = toneStyles[fit.tone];

  // Brief "tallying" beat before the certificate reveal — makes it feel earned.
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1050);
    return () => clearTimeout(t);
  }, []);

  const [agentAnswer, setAgentAnswer] = useState<AgentAnswer | undefined>();
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState<EmailState>("idle");

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || emailState === "sending" || emailState === "sent") return;

    setEmailState("sending");
    try {
      const { serviceId, publicKey, templateUser } = appConfig.emailjs;
      if (!serviceId || !publicKey || !templateUser) {
        await new Promise((r) => setTimeout(r, 600));
        setEmailState("sent");
        return;
      }
      const emailjs = await import("@emailjs/browser");
      await emailjs.send(
        serviceId,
        templateUser,
        {
          to_email: email.trim(),
          result_label: result.badge,
          result_body: result.body,
          next_step: result.cta,
          fit: fit.fit,
          agent_status: agentAnswer ?? "not answered",
          timeline: answers.timeline ?? "not answered",
          gap_cash: answers.gapCash ?? "not answered",
          eligibility: answers.eligibility ?? "not answered",
          openness: answers.openness ?? "not answered",
        },
        { publicKey }
      );
      setEmailState("sent");
    } catch {
      setEmailState("error");
    }
  }

  const bookingUrl = getBookingUrl(result.ctaKey);

  // The "tallying" interstitial.
  if (!revealed) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <motion.div
          className="h-16 w-16 rounded-full border-4 border-cream-deep border-t-gold"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        />
        <div>
          <p className="font-display text-xl font-semibold text-navy">
            Tallying your reality check
          </p>
          <p className="mt-1 text-sm text-ink/55">Reading your answers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-7 pb-2">
      {/* Certificate header */}
      <motion.div
        className="relative overflow-hidden rounded-tile border border-line bg-white/75 px-6 pb-7 pt-6 text-center shadow-tile"
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* gold corner flourishes */}
        <span className="pointer-events-none absolute left-3 top-3 h-6 w-6 rounded-tl-xl border-l-2 border-t-2 border-gold/40" />
        <span className="pointer-events-none absolute right-3 top-3 h-6 w-6 rounded-tr-xl border-r-2 border-t-2 border-gold/40" />
        <span className="pointer-events-none absolute bottom-3 left-3 h-6 w-6 rounded-bl-xl border-b-2 border-l-2 border-gold/40" />
        <span className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 rounded-br-xl border-b-2 border-r-2 border-gold/40" />

        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold">
          Reality Check Complete
        </p>

        <div className="mt-5 flex justify-center">
          <ClarityGauge value={100} label="Clarity" start={revealed} />
        </div>

        <p className="mx-auto mt-5 max-w-[18rem] text-sm leading-relaxed text-ink/70">
          You just learned what most buyers never bother to. That puts you ahead
          before you even start looking.
        </p>
      </motion.div>

      {/* Concepts mastered */}
      <div>
        <div className="mb-3 flex items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">
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
              transition={{
                delay: 0.3 + i * 0.1,
                type: "spring",
                stiffness: 320,
                damping: 18,
              }}
              className="flex items-center gap-2.5 rounded-2xl border border-line bg-white/70 px-3 py-2.5 shadow-soft"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold/12 text-gold-deep ring-1 ring-gold/25">
                <ConceptIcon id={c.id} className="h-[18px] w-[18px]" />
              </span>
              <span className="text-[0.8rem] font-semibold leading-tight text-navy">
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
        className="rounded-tile border border-navy/15 bg-navy px-6 py-6 text-cream shadow-lift"
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-gold-soft">
            Your next step
          </p>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wide ring-1 ${tone.chip}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
            {fit.fit}
          </span>
        </div>

        <h2 className="mt-3 font-display text-[1.6rem] font-bold leading-tight text-cream">
          {result.headline}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-cream/80">{result.body}</p>

        <div className="mt-5 rounded-2xl border-l-4 border-gold bg-white/5 px-4 py-3">
          <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-gold-soft">
            What happens next
          </p>
          <p className="mt-1 text-sm leading-relaxed text-cream/85">{result.note}</p>
        </div>
      </motion.div>

      {/* Agent status */}
      <div>
        <p className="mb-3 text-sm font-semibold text-navy">
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
                  "w-full rounded-2xl border px-5 py-3 text-left text-sm font-medium transition-colors",
                  "focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/40",
                  isSelected
                    ? "border-navy bg-navy text-cream"
                    : "border-line bg-white/70 text-charcoal hover:border-gold/50 hover:bg-white",
                ].join(" ")}
              >
                {choice.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Primary CTA */}
      <CtaButton
        variant="gold"
        arrow
        onClick={() => {
          if (bookingUrl !== "#") window.open(bookingUrl, "_blank");
        }}
      >
        {result.cta}
      </CtaButton>

      {/* Email capture */}
      <div className="rounded-tile border border-line bg-white/70 px-5 py-5 shadow-soft">
        <p className="mb-1 font-display text-lg font-semibold text-navy">
          {resultScreen.emailLabel}
        </p>
        {emailState === "sent" ? (
          <div className="mt-2 flex items-center gap-2 text-sm font-medium text-gold-deep">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-navy">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            {resultScreen.emailSent}
          </div>
        ) : (
          <form onSubmit={handleEmailSubmit} className="mt-3 flex flex-col gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={resultScreen.emailPlaceholder}
              className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-base text-charcoal placeholder:text-ink/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25"
            />
            <CtaButton type="submit" disabled={!email.trim() || emailState === "sending"}>
              {emailState === "sending"
                ? resultScreen.emailSending
                : resultScreen.emailCta}
            </CtaButton>
            {emailState === "error" && (
              <p className="text-center text-xs text-red-500">{resultScreen.emailError}</p>
            )}
            <p className="text-center text-xs text-ink/50">{resultScreen.emailNote}</p>
          </form>
        )}
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
