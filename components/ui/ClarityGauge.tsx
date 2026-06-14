"use client";

import { useEffect, useState } from "react";

// A circular gauge that draws its ring and counts a number up in sync.
// Used on the result page as the "Reality Check Complete" payoff moment.
export default function ClarityGauge({
  value = 100,
  size = 168,
  label = "Complete",
  start = true,
}: {
  value?: number;
  size?: number;
  label?: string;
  start?: boolean;
}) {
  const [n, setN] = useState(0);
  const stroke = 10;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - n / 100);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const duration = 1300;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="clarity-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-gold-soft)" />
            <stop offset="100%" stopColor="var(--color-gold-deep)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-cream-deep)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#clarity-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ filter: "drop-shadow(0 4px 10px rgba(168,132,47,0.35))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-5xl font-black tabular leading-none text-navy">
          {n}
          <span className="text-2xl text-gold">%</span>
        </span>
        <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-ink/50">
          {label}
        </span>
      </div>
    </div>
  );
}
