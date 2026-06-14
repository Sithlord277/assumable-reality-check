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
    case "welcome":
      return <WelcomeStep />;
    case "what-is-assumable":
      return <WhatIsAssumableStep />;
    case "eligibility":
      return <EligibilityStep />;
    case "equity-gap":
      return <EquityGapStep />;
    case "payment-structure":
      return <PaymentStructureStep />;
    case "timeline":
      return <TimelineStep />;
    case "openness":
      return <OpennessStep />;
    case "result":
      return <ResultStep />;
    default:
      return null;
  }
}

function Shell() {
  const { step, index } = useFlow();
  // The welcome screen carries its own hero brand treatment, and the result
  // screen has its own certificate header, so chrome shows only mid-flow.
  const showChrome = step !== "welcome" && step !== "result";

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
      <UnlockToast concept={unlock} />
      <main className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-5 pb-10 pt-6">
        {showChrome && (
          <div className="mb-7">
            <div className="flex items-center justify-center">
              <BrandHeader compact />
            </div>
            <StepRail className="mt-5" />
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
