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

/** Slow-drifting gradient blobs that form the ambient mesh background. */
function GradientMesh() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Top-center gold glow */}
      <div
        className="absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, #c6a24a 0%, transparent 70%)",
          filter: "blur(72px)",
          animation: "drift-a 18s ease-in-out infinite alternate",
        }}
      />
      {/* Left amber blob */}
      <div
        className="absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, #e2a33f 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "drift-b 22s ease-in-out infinite alternate",
        }}
      />
      {/* Right sunset blob */}
      <div
        className="absolute -right-24 top-1/3 h-[360px] w-[360px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #e08a4b 0%, transparent 70%)",
          filter: "blur(90px)",
          animation: "drift-c 26s ease-in-out infinite alternate",
        }}
      />
      {/* Bottom peach bloom */}
      <div
        className="absolute -bottom-24 left-1/3 h-[320px] w-[320px] rounded-full opacity-22"
        style={{
          background: "radial-gradient(circle, #f6dfc0 0%, transparent 70%)",
          filter: "blur(70px)",
          animation: "drift-a 20s ease-in-out 4s infinite alternate",
        }}
      />
      {/* Film grain overlay */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
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
      <GradientMesh />
      <UnlockToast concept={unlock} />
      <main className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-5 pb-10 pt-6">
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
