interface FinancialTileProps {
  label: string;
  value: string;
  sub?: string;
  variant?: "default" | "navy" | "gap";
}

export default function FinancialTile({
  label,
  value,
  sub,
  variant = "default",
}: FinancialTileProps) {
  const styles = {
    default: "bg-white-soft border border-line",
    navy: "bg-navy border border-navy",
    gap: "bg-sunset/10 border-2 border-sunset",
  };

  const labelColor = {
    default: "text-ink/50",
    navy: "text-cream/60",
    gap: "text-sunset",
  };

  const valueColor = {
    default: "text-charcoal",
    navy: "text-cream",
    gap: "text-sunset",
  };

  const subColor = {
    default: "text-ink/50",
    navy: "text-cream/55",
    gap: "text-ink/55",
  };

  return (
    <div className={`rounded-xl px-5 py-4 ${styles[variant]}`}>
      <p className={`text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${labelColor[variant]}`}>
        {label}
      </p>
      <p className={`mt-1 text-[2rem] font-extrabold leading-tight tabular ${valueColor[variant]}`}>
        {value}
      </p>
      {sub && (
        <p className={`mt-1 text-xs leading-snug ${subColor[variant]}`}>{sub}</p>
      )}
    </div>
  );
}
