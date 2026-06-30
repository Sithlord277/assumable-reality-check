"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Concept } from "@/lib/gamification";
import ConceptIcon from "./ConceptIcon";

export default function UnlockToast({ concept }: { concept: Concept | null }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-5">
      <AnimatePresence>
        {concept && (
          <motion.div
            key={concept.id}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="glass-dark flex w-full max-w-[18rem] items-center gap-2.5 rounded-full px-3 py-2 text-cream shadow-lift"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/18 text-gold ring-1 ring-gold/25">
              <ConceptIcon id={concept.id} className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-gold-soft">
                Learned
              </p>
              <p className="truncate text-sm font-bold leading-tight text-cream">
                {concept.label}
              </p>
            </div>
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-gold text-cream">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
