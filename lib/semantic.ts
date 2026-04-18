import type { FunnelStage, KpiDef } from "./types";
import type { Severity } from "./tokens";

/**
 * Single source of truth for derived-metric math.
 * Keep formulas here so every surface (cards, chips, agent) agrees.
 */

export function rate(n: number, d: number) {
  return d > 0 ? (n / d) * 100 : 0;
}

export function deltaPct(current: number, benchmark: number) {
  if (!benchmark) return 0;
  return ((current - benchmark) / benchmark) * 100;
}

export function severityFromDelta(deltaPctValue: number): Severity {
  if (deltaPctValue >= 5) return "healthy";
  if (deltaPctValue >= -5) return "watch";
  if (deltaPctValue >= -15) return "opportunity";
  return "action-needed";
}

export function sparklineTrend(values: number[]): "up" | "down" | "flat" {
  if (values.length < 2) return "flat";
  const first = values[0];
  const last = values[values.length - 1];
  const diff = ((last - first) / Math.max(1, first)) * 100;
  if (diff > 3) return "up";
  if (diff < -3) return "down";
  return "flat";
}

export function computeDropSeverity(prev: number, cur: number): Severity {
  const drop = prev > 0 ? ((prev - cur) / prev) * 100 : 0;
  if (drop < 15) return "healthy";
  if (drop < 30) return "watch";
  if (drop < 50) return "opportunity";
  return "action-needed";
}

export function annotateFunnel(stages: Omit<FunnelStage, "previous" | "severity">[]): FunnelStage[] {
  return stages.map((s, i) => {
    const prev = i === 0 ? undefined : stages[i - 1].value;
    return {
      ...s,
      previous: prev,
      severity: prev !== undefined ? computeDropSeverity(prev, s.value) : "healthy",
    };
  });
}

export function formatKpi(kpi: KpiDef): string {
  switch (kpi.format) {
    case "number":
      return new Intl.NumberFormat("en-US").format(kpi.value);
    case "pct":
      return `${kpi.value.toFixed(0)}%`;
    case "currency":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(kpi.value);
    case "usd-per":
      return `$${kpi.value.toFixed(2)}`;
    case "seconds":
      return `${Math.floor(kpi.value / 60)}m ${Math.round(kpi.value % 60)}s`;
  }
}

/** Pick the worst severity across a set of stages. */
export function worstSeverity(...items: (Severity | undefined)[]): Severity {
  const order: Severity[] = ["action-needed", "opportunity", "watch", "healthy"];
  for (const level of order) {
    if (items.includes(level)) return level;
  }
  return "healthy";
}
