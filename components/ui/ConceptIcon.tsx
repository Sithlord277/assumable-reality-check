import type { ConceptId } from "@/lib/gamification";

// Minimal 24x24 line icons. Deliberately not emoji — keeps the badges premium
// rather than childish. Inherit stroke color from the parent via currentColor.
const PATHS: Record<ConceptId, React.ReactNode> = {
  // key
  basics: (
    <>
      <circle cx="8" cy="9" r="3.5" />
      <path d="M10.5 11.5 19 20m-2.5-2.5 2-2m-4 1.5 2-2" />
    </>
  ),
  // document with lines
  "loan-types": (
    <>
      <path d="M6 4h8l4 4v12H6z" />
      <path d="M14 4v4h4" />
      <path d="M9 13h6M9 16.5h6" />
    </>
  ),
  // bridge / gap
  "equity-gap": (
    <>
      <path d="M3 16c4 0 4-5 9-5s5 5 9 5" />
      <path d="M3 16v3M21 16v3M12 11v8M7.5 13.4V19M16.5 13.4V19" />
    </>
  ),
  // stacked layers / calculator
  "payment-structures": (
    <>
      <rect x="5" y="4" width="14" height="16" rx="2" />
      <path d="M8 8h8M8 12h3M13 12h3M8 16h3M13 16h3" />
    </>
  ),
};

export default function ConceptIcon({
  id,
  className = "h-5 w-5",
}: {
  id: ConceptId;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[id]}
    </svg>
  );
}
