import type { ReactNode } from "react";

interface InsightCardProps {
  label?: string;
  children: ReactNode;
  className?: string;
}

export default function InsightCard({ label, children, className = "" }: InsightCardProps) {
  return (
    <div
      className={`glass relative overflow-hidden rounded-tile border-gold/25 px-5 py-4 ${className}`}
    >
      {/* Gold spine + a soft advisor mark in the corner. */}
      <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-gold-soft to-gold-deep" />
      <span className="pointer-events-none absolute -right-3 -top-4 font-display text-7xl leading-none text-gold/10">
        &rdquo;
      </span>

      <div className="relative pl-2">
        {label && (
          <p className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gold/20">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            {label}
          </p>
        )}
        <p className="text-sm leading-relaxed text-charcoal">{children}</p>
      </div>
    </div>
  );
}
