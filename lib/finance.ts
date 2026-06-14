// Single amortization source of truth.
// All example numbers in every step derive from this — no more hardcoding.

/** Monthly principal + interest payment. */
function monthlyPI(principal: number, annualRatePct: number, years: number): number {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  const factor = (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return principal * factor;
}

function fmt$(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}
function fmtPayment(n: number): string {
  return "~$" + Math.round(n).toLocaleString("en-US");
}
function roundK(n: number): number {
  return Math.round(n / 1000) * 1000;
}

export interface ExampleFigures {
  price: string;
  originalLoan: string;
  currentBalance: string;
  gap: string;
  assumedPayment: string;
  secondPayment: string;
  combined: string;
  newLoan: string;
  marketPayment: string;
  raw: {
    price: number;
    originalLoan: number;
    currentBalance: number;
    gap: number;
    assumedPayment: number;
    secondPayment: number;
    combined: number;
    newLoan: number;
    marketPayment: number;
  };
}

/**
 * Derive all illustration figures from a purchase price.
 *
 * Ratios (fixed per Martin):
 *   originalLoan   = 85% of price  (what the seller originally borrowed)
 *   currentBalance = 78% of price  (remaining after ~4 yrs of payments)
 *   gap            = price − currentBalance
 *   newLoan        = 90% of price  (10% down on new conventional)
 *
 * Rates (fixed per Martin):
 *   assumedRate = 3.25%, 30yr
 *   secondRate  = 8.00%, 30yr
 *   marketRate  = 7.00%, 30yr
 */
export function computeExample(price: number): ExampleFigures {
  const p = Math.max(price, 300_000);

  const originalLoan   = roundK(p * 0.85);
  const currentBalance = roundK(p * 0.78);
  const gap            = p - currentBalance;
  const newLoan        = roundK(p * 0.90);

  const assumedPayment = monthlyPI(originalLoan, 3.25, 30);
  const secondPayment  = monthlyPI(gap, 8.00, 30);
  const combined       = assumedPayment + secondPayment;
  const marketPayment  = monthlyPI(newLoan, 7.00, 30);

  return {
    price:          fmt$(p),
    originalLoan:   fmt$(originalLoan),
    currentBalance: fmt$(currentBalance),
    gap:            fmt$(gap),
    assumedPayment: fmtPayment(assumedPayment),
    secondPayment:  fmtPayment(secondPayment),
    combined:       fmtPayment(combined),
    newLoan:        fmt$(newLoan),
    marketPayment:  fmtPayment(marketPayment),
    raw: {
      price: p, originalLoan, currentBalance, gap,
      assumedPayment, secondPayment, combined, newLoan, marketPayment,
    },
  };
}
