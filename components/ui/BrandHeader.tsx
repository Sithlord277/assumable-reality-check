export default function BrandHeader({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center justify-center">
      {/* Plain img keeps the logo bulletproof across sizes (no layout shift config). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/elevate48-lockup.png"
        alt="Elevate48, Libertas Real Estate"
        className={compact ? "h-9 w-auto" : "h-14 w-auto"}
      />
    </div>
  );
}
