import type { ReactNode } from "react";

interface InsightCardProps {
  label?: string;
  children: ReactNode;
  className?: string;
}

export default function InsightCard({ label, children, className = "" }: InsightCardProps) {
  return (
    <div
      className={`advisor-surface relative rounded-tile px-5 py-4 ${className}`}
    >
      <div className="premium-rule mb-4 w-20" />
      <div>
        {label && (
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-gold-deep">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/15 text-[0.65rem] text-gold-deep">
              i
            </span>
            {label}
          </p>
        )}
        <p className="text-sm leading-relaxed text-ink">{children}</p>
      </div>
    </div>
  );
}
