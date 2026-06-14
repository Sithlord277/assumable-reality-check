"use client";

import { AnimatePresence, motion } from "framer-motion";

interface Choice<T extends string> {
  value: T;
  label: string;
}

interface ChoiceGridProps<T extends string> {
  choices: Choice<T>[];
  selected?: T;
  onSelect: (value: T) => void;
}

export default function ChoiceGrid<T extends string>({
  choices,
  selected,
  onSelect,
}: ChoiceGridProps<T>) {
  return (
    <div className="flex flex-col gap-2.5">
      {choices.map((choice) => {
        const isSelected = selected === choice.value;
        return (
          <motion.button
            key={choice.value}
            type="button"
            onClick={() => onSelect(choice.value)}
            whileTap={{ scale: 0.985 }}
            className={[
              "group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border px-5 py-4 text-left text-base font-medium transition-all duration-200",
              "focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/40",
              isSelected
                ? "border-navy bg-navy text-cream shadow-soft"
                : "border-line bg-white/70 text-charcoal hover:border-gold/50 hover:bg-white hover:shadow-soft",
            ].join(" ")}
          >
            {/* Gold accent bar slides in on the selected option. */}
            <span
              className={[
                "absolute inset-y-0 left-0 w-1 origin-top bg-gold transition-transform duration-200",
                isSelected ? "scale-y-100" : "scale-y-0",
              ].join(" ")}
            />

            <span
              className={[
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                isSelected
                  ? "border-gold bg-gold text-navy"
                  : "border-line bg-cream-deep/60 text-transparent group-hover:border-gold/50",
              ].join(" ")}
            >
              <AnimatePresence>
                {isSelected && (
                  <motion.svg
                    key="check"
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </span>

            <span className="relative">{choice.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
