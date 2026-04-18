import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number, opts?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat("en-US", opts).format(n);
}

export function formatCurrency(n: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatPct(n: number, digits = 0) {
  return `${n.toFixed(digits)}%`;
}

export function formatDelta(n: number, unit: "pct" | "abs" = "pct") {
  const sign = n > 0 ? "+" : "";
  return unit === "pct" ? `${sign}${n.toFixed(1)}%` : `${sign}${formatNumber(n)}`;
}
