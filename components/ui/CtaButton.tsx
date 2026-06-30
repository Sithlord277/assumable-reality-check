"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface CtaButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "gold" | "ghost";
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  /** Show a trailing arrow that nudges on hover. */
  arrow?: boolean;
}

export default function CtaButton({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
  disabled = false,
  arrow = false,
}: CtaButtonProps) {
  const base =
    "group relative w-full overflow-hidden rounded-xl px-6 py-4 text-center text-base font-semibold tracking-[0.02em] transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/30 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none";

  const styles = {
    primary:
      "bg-gold text-cream shadow-gold hover:bg-gold-deep hover:shadow-lift hover:-translate-y-0.5",
    gold:
      "bg-mint text-charcoal shadow-mint hover:opacity-90 hover:-translate-y-0.5",
    ghost:
      "bg-transparent text-gold ring-1 ring-line hover:bg-cream-deep",
  }[variant];

  const showSheen = variant === "primary";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.985 }}
      className={`${base} ${styles} ${className}`}
    >
      {showSheen && (
        <span
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 skew-x-[-18deg] bg-white/20"
          style={{ animation: "sheen 2.4s ease-in-out 0.5s infinite" }}
        />
      )}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
        {arrow && (
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        )}
      </span>
    </motion.button>
  );
}
