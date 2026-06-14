"use client";

import { motion } from "framer-motion";
import { useFlow } from "@/lib/state";

export default function ProgressBar({ className = "" }: { className?: string }) {
  const { progress } = useFlow();
  const pct = Math.round(progress * 100);

  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-cream-deep ${className}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
    >
      <motion.div
        className="h-full rounded-full bg-gold"
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
}
