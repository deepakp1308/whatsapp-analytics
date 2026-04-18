import { Target, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { SeverityBadge } from "@/components/cards/SeverityBadge";
import type { Severity } from "@/lib/tokens";
import { mcChart } from "@/lib/tokens";
import { funnel } from "@/lib/mock/metrics";
import { cn, formatNumber } from "@/lib/utils";

type MiniKpi = {
  label: string;
  value: string;
  delta?: number;
  severity?: Severity;
};

const MINI_KPIS: MiniKpi[] = [
  { label: "Revenue", value: "$12,000", delta: 30.4, severity: "healthy" },
  { label: "Reply rate", value: "17.8%", delta: -19.1, severity: "opportunity" },
  { label: "Conversion rate", value: "5.4%", delta: 3.8, severity: "watch" },
  { label: "Quality rating", value: "92", delta: -3.2, severity: "watch" },
];

type Props = {
  objective: string;
  narrative: string;
};

export function CockpitContextRail({ objective, narrative }: Props) {
  return (
    <aside
      className="mc-scroll flex h-full flex-col gap-5 overflow-y-auto rounded-[12px] border border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] p-5"
      aria-label="Campaign context"
    >
      {/* Objective */}
      <section>
        <div className="mb-1.5 flex items-center gap-1.5">
          <Target className="h-3 w-3 text-[color:var(--mc-opportunity)]" aria-hidden="true" />
          <span className="mc-micro uppercase">Objective</span>
        </div>
        <p className="text-[13px] font-medium leading-[18px] text-[color:var(--mc-text-peppercorn)]">
          {objective}
        </p>
        <p className="mt-2 text-[12px] leading-[17px] text-[color:var(--mc-text-secondary)]">
          {narrative}
        </p>
      </section>

      {/* KPI stack */}
      <section className="border-t border-[color:var(--mc-border)] pt-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="mc-micro uppercase">Metrics</span>
          <span className="mc-micro">Last 30d</span>
        </div>
        <ul className="flex flex-col gap-3">
          {MINI_KPIS.map((k) => (
            <li key={k.label} className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[11px] leading-4 text-[color:var(--mc-text-secondary)]">
                  {k.label}
                </div>
                <div className="text-[18px] font-semibold leading-6 tabular-nums text-[color:var(--mc-text-peppercorn)]">
                  {k.value}
                </div>
              </div>
              <div className="mt-1 flex flex-col items-end gap-1">
                {typeof k.delta === "number" && (
                  <span
                    className={cn(
                      "inline-flex items-center gap-0.5 text-[11px] tabular-nums",
                      k.delta >= 0
                        ? "text-[color:var(--mc-positive)]"
                        : "text-[color:var(--mc-negative)]"
                    )}
                  >
                    {k.delta >= 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {Math.abs(k.delta).toFixed(1)}%
                  </span>
                )}
                {k.severity && k.severity !== "healthy" && (
                  <SeverityBadge severity={k.severity} size="sm" />
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Vertical funnel — list of steps with inline bars */}
      <section className="border-t border-[color:var(--mc-border)] pt-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="mc-micro uppercase">Funnel</span>
          <span className="mc-micro tabular-nums">
            {formatNumber(funnel[0].value)} → {formatNumber(funnel.at(-1)!.value)}
          </span>
        </div>
        <ul className="flex flex-col gap-2">
          {funnel.map((s) => {
            const pct = (s.value / funnel[0].value) * 100;
            const sev = s.severity ?? "healthy";
            const fill = mcChart.severity[sev];
            const drop =
              s.previous !== undefined ? ((s.previous - s.value) / s.previous) * 100 : 0;
            return (
              <li key={s.id}>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="truncate text-[color:var(--mc-text-primary)]">
                    {s.label}
                  </span>
                  <span className="shrink-0 tabular-nums text-[color:var(--mc-text-secondary)]">
                    {formatNumber(s.value)}
                    {drop > 20 && (
                      <span className="ml-1 text-[color:var(--mc-negative)]">
                        −{drop.toFixed(0)}%
                      </span>
                    )}
                  </span>
                </div>
                <div className="mt-0.5 h-1.5 w-full rounded-sm bg-[color:var(--mc-subtle)]">
                  <div
                    className="h-1.5 rounded-sm"
                    style={{ width: `${pct}%`, backgroundColor: fill, opacity: 0.9 }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </aside>
  );
}
