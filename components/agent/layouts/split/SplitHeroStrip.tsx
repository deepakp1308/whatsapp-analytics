"use client";
import { Target, ArrowUpRight, ArrowDownRight, Bell, X } from "lucide-react";
import type { Severity } from "@/lib/tokens";
import { mcChart } from "@/lib/tokens";
import { funnel } from "@/lib/mock/metrics";
import { cn, formatNumber } from "@/lib/utils";
import { useState } from "react";

type MiniKpi = {
  label: string;
  value: string;
  delta?: number;
  severity?: Severity;
};

const MINI_KPIS: MiniKpi[] = [
  { label: "Revenue", value: "$12k", delta: 30.4, severity: "healthy" },
  { label: "Reply", value: "17.8%", delta: -19.1, severity: "opportunity" },
  { label: "Conv.", value: "5.4%", delta: 3.8, severity: "watch" },
  { label: "Quality", value: "92", delta: -3.2, severity: "watch" },
];

type Props = {
  objective: string;
  onAlertAction?: () => void;
  alertMessage?: string;
};

export function SplitHeroStrip({ objective, onAlertAction, alertMessage }: Props) {
  const [alertOpen, setAlertOpen] = useState(Boolean(alertMessage));
  return (
    <div className="shrink-0 overflow-hidden rounded-[12px] border border-[color:var(--mc-border)] bg-[color:var(--mc-surface)]">
      {alertOpen && alertMessage && (
        <div className="flex items-center gap-2 border-b border-[color:var(--mc-border)] bg-[color:var(--mc-attention-bg)]/60 px-4 py-1.5">
          <Bell className="h-3.5 w-3.5 shrink-0 text-[color:var(--mc-attention)]" />
          <p className="flex-1 truncate text-[12px] text-[color:var(--mc-text-primary)]">
            <strong className="font-semibold text-[color:var(--mc-text-peppercorn)]">
              Alert ·
            </strong>{" "}
            {alertMessage}
          </p>
          {onAlertAction && (
            <button
              type="button"
              onClick={onAlertAction}
              className="text-[12px] font-medium text-[color:var(--mc-link)] hover:underline"
            >
              Jump →
            </button>
          )}
          <button
            type="button"
            onClick={() => setAlertOpen(false)}
            aria-label="Dismiss alert"
            className="grid h-5 w-5 place-items-center rounded text-[color:var(--mc-text-tertiary)] hover:bg-[color:var(--mc-subtle)]"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <div className="flex items-center gap-5 px-5 py-3">
        {/* Objective */}
        <div className="flex min-w-0 flex-1 items-start gap-2">
          <Target className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[color:var(--mc-opportunity)]" />
          <div className="min-w-0">
            <div className="mc-micro uppercase">Objective · Last 30d</div>
            <p className="truncate text-[13px] font-medium leading-4 text-[color:var(--mc-text-peppercorn)]">
              {objective}
            </p>
          </div>
        </div>

        {/* KPIs inline */}
        <div className="hidden shrink-0 items-center gap-4 border-l border-[color:var(--mc-border)] pl-5 lg:flex">
          {MINI_KPIS.map((k) => (
            <div key={k.label} className="min-w-0">
              <div className="mc-micro">{k.label}</div>
              <div className="flex items-baseline gap-1">
                <span className="text-[14px] font-semibold tabular-nums text-[color:var(--mc-text-peppercorn)]">
                  {k.value}
                </span>
                {typeof k.delta === "number" && (
                  <span
                    className={cn(
                      "inline-flex items-center text-[10px] tabular-nums",
                      k.delta >= 0
                        ? "text-[color:var(--mc-positive)]"
                        : "text-[color:var(--mc-negative)]"
                    )}
                  >
                    {k.delta >= 0 ? (
                      <ArrowUpRight className="h-2.5 w-2.5" />
                    ) : (
                      <ArrowDownRight className="h-2.5 w-2.5" />
                    )}
                    {Math.abs(k.delta).toFixed(0)}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mini funnel sparkline */}
        <div className="hidden shrink-0 items-center gap-3 border-l border-[color:var(--mc-border)] pl-5 xl:flex">
          <div>
            <div className="mc-micro">Funnel</div>
            <div className="text-[11px] tabular-nums text-[color:var(--mc-text-secondary)]">
              {formatNumber(funnel[0].value)} → {formatNumber(funnel.at(-1)!.value)} (
              {((funnel.at(-1)!.value / funnel[0].value) * 100).toFixed(1)}%)
            </div>
          </div>
          <div className="flex h-9 items-end gap-[3px]">
            {funnel.map((s) => {
              const pct = (s.value / funnel[0].value) * 100;
              const sev = s.severity ?? "healthy";
              const fill = mcChart.severity[sev];
              return (
                <div
                  key={s.id}
                  className="w-[6px] rounded-sm"
                  style={{
                    height: `${Math.max(10, pct)}%`,
                    backgroundColor: fill,
                    opacity: 0.9,
                  }}
                  title={`${s.label}: ${formatNumber(s.value)}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
