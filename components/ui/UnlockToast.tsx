"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Concept } from "@/lib/gamification";
import ConceptIcon from "./ConceptIcon";

export default function UnlockToast({ concept }: { concept: Concept | null }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-5">
      <AnimatePresence>
        {concept && (
          <motion.div
            key={concept.id}
            initial={{ opacity: 0, y: -28, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="glass-dark flex w-full max-w-sm items-center gap-3 rounded-2xl border-amber/20 px-4 py-3 text-cream shadow-lift"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber/20 text-amber ring-1 ring-amber/30">
              <ConceptIcon id={concept.id} className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-soft">
                Concept unlocked
              </p>
              <p className="truncate font-display text-base font-semibold leading-tight text-cream">
                {concept.label}
              </p>
            </div>
            <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-amber text-navy">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
