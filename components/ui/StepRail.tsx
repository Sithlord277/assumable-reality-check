"use client";

import { motion } from "framer-motion";
import { useFlow } from "@/lib/state";
import { RAIL_STEPS } from "@/lib/gamification";

export default function StepRail({ className = "" }: { className?: string }) {
  const { step } = useFlow();
  const current = RAIL_STEPS.findIndex((s) => s.id === step);
  const active = current === -1 ? 0 : current;
  const label = RAIL_STEPS[active]?.short ?? "";

  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold">
          {label}
        </p>
        <p className="text-[0.7rem] font-medium tabular tracking-wide text-ink/45">
          {String(active + 1).padStart(2, "0")}
          <span className="text-ink/25"> / {String(RAIL_STEPS.length).padStart(2, "0")}</span>
        </p>
      </div>

      <div className="flex items-center gap-1.5">
        {RAIL_STEPS.map((s, i) => {
          const done = i < active;
          const isCurrent = i === active;
          return (
            <div
              key={s.id}
              className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-cream-deep"
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: done
                    ? "linear-gradient(90deg, var(--color-gold), var(--color-cyan))"
                    : "linear-gradient(90deg, var(--color-gold-soft), var(--color-gold))",
                }}
                initial={false}
                animate={{ width: done || isCurrent ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
              {isCurrent && (
                <motion.div
                  className="absolute inset-y-0 w-1/3 rounded-full bg-white/40"
                  initial={{ x: "-120%" }}
                  animate={{ x: "320%" }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
