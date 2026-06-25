"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FlowProvider, useFlow } from "@/lib/state";
import { FLOW } from "@/lib/flow";
import { conceptForStep, type Concept } from "@/lib/gamification";
import BrandHeader from "@/components/ui/BrandHeader";
import StepRail from "@/components/ui/StepRail";
import UnlockToast from "@/components/ui/UnlockToast";
import WelcomeStep from "@/components/steps/WelcomeStep";
import PriceStep from "@/components/steps/PriceStep";
import WhatIsAssumableStep from "@/components/steps/WhatIsAssumableStep";
import EligibilityStep from "@/components/steps/EligibilityStep";
import EquityGapStep from "@/components/steps/EquityGapStep";
import PaymentStructureStep from "@/components/steps/PaymentStructureStep";
import TimelineStep from "@/components/steps/TimelineStep";
import OpennessStep from "@/components/steps/OpennessStep";
import ResultStep from "@/components/steps/ResultStep";

function StepRenderer() {
  const { step } = useFlow();
  switch (step) {
    case "welcome":      return <WelcomeStep />;
    case "price":        return <PriceStep />;
    case "what-is-assumable": return <WhatIsAssumableStep />;
    case "eligibility":  return <EligibilityStep />;
    case "equity-gap":   return <EquityGapStep />;
    case "payment-structure": return <PaymentStructureStep />;
    case "timeline":     return <TimelineStep />;
    case "openness":     return <OpennessStep />;
    case "result":       return <ResultStep />;
    default:             return null;
  }
}

function AdvisorBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "linear-gradient(180deg, rgba(30,58,95,0.12) 0%, rgba(198,162,74,0.08) 48%, transparent 100%)",
        }}
      />
      <div
        className="absolute left-0 top-0 h-full w-[8px] bg-navy/85 shadow-soft sm:left-[calc(50%-16rem)]"
      />
      <div
        className="absolute left-[8px] top-0 h-full w-[2px] bg-gold/75 sm:left-[calc(50%-16rem+8px)]"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-36"
        style={{
          background:
            "linear-gradient(0deg, rgba(30,58,95,0.08) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

function Shell() {
  const { step, index, back } = useFlow();

  // The welcome screen has its own hero brand treatment.
  // The price step is a personalization intro — show header but no step rail.
  // The result screen has its own certificate header.
  const showHeader = step !== "welcome" && step !== "result";
  const showRail   = showHeader && step !== "price";

  // Scroll to top on every step change.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [index]);

  // Fire a "concept unlocked" toast when the user advances past a teaching step.
  const [unlock, setUnlock] = useState<Concept | null>(null);
  const prevIndex = useRef(index);
  const seen = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (index > prevIndex.current) {
      const leftStep = FLOW[prevIndex.current];
      const concept = conceptForStep(leftStep);
      if (concept && !seen.current.has(concept.id)) {
        seen.current.add(concept.id);
        setUnlock(concept);
        const t = setTimeout(() => setUnlock(null), 2400);
        prevIndex.current = index;
        return () => clearTimeout(t);
      }
    }
    prevIndex.current = index;
  }, [index]);

  return (
    <>
      <AdvisorBackdrop />
      <UnlockToast concept={unlock} />
      <main className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-6 pb-10 pt-8">
        {showHeader && (
          <div className={showRail ? "mb-7" : "mb-6"}>
            <div className="relative flex items-center justify-center">
              <button
                onClick={back}
                className="absolute left-0 flex items-center gap-1 rounded-lg px-1 py-1 text-xs font-semibold text-ink/50 transition-colors hover:text-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <BrandHeader compact />
            </div>
            {showRail && <StepRail className="mt-5" />}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${step}-${index}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-1 flex-col"
          >
            <StepRenderer />
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
}

export default function Home() {
  return (
    <FlowProvider>
      <Shell />
    </FlowProvider>
  );
}
