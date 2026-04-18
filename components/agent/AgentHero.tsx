"use client";
import { useState } from "react";
import { Card } from "@/components/cards/Card";
import { SeverityBadge } from "@/components/cards/SeverityBadge";
import { Bell, X, ArrowUpRight, ArrowDownRight, Target, Sparkles } from "lucide-react";
import type { Severity } from "@/lib/tokens";
import { mcChart } from "@/lib/tokens";
import { funnel } from "@/lib/mock/metrics";
import { cn, formatNumber } from "@/lib/utils";

/** Compact, single-card hero for the agent surface.
 *
 *  Goals:
 *  - One surface instead of 4 separate cards (alert + objective + narrative + KPIs + funnel)
 *  - Calm, information-dense, no redundant chrome
 *  - Still carries the "high-level charts" the marketer needs at a glance
 */

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
  alertMessage?: string;
  onAlertAction?: () => void;
  alertActionLabel?: string;
};

export function AgentHero({
  objective,
  narrative,
  alertMessage,
  onAlertAction,
  alertActionLabel = "Jump to diagnostics",
}: Props) {
  const [alertOpen, setAlertOpen] = useState(Boolean(alertMessage));

  return (
    <Card className="overflow-hidden">
      {/* Slim proactive alert strip — collapses into nothing when dismissed */}
      {alertOpen && alertMessage && (
        <div className="flex items-center gap-2 border-b border-[color:var(--mc-border)] bg-[color:var(--mc-attention-bg)]/60 px-5 py-2">
          <Bell className="h-3.5 w-3.5 shrink-0 text-[color:var(--mc-attention)]" />
          <p className="flex-1 text-[12px] text-[color:var(--mc-text-primary)]">
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
              {alertActionLabel} →
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

      <div className="p-6">
        {/* Objective + narrative row */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <Target className="h-3.5 w-3.5 text-[color:var(--mc-opportunity)]" aria-hidden="true" />
              <span className="mc-micro uppercase">Objective · Last 30 days</span>
            </div>
            <p className="text-[15px] font-medium leading-5 text-[color:var(--mc-text-peppercorn)]">
              {objective}
            </p>
            <p className="mt-2 flex items-start gap-2 text-[13px] leading-[19px] text-[color:var(--mc-text-secondary)]">
              <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-[color:var(--mc-opportunity)]" />
              <span>{narrative}</span>
            </p>
          </div>
          <LiveBadge />
        </div>

        {/* Mini KPIs — 4 compact tiles replacing the full KpiStrip in agent mode */}
        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[color:var(--mc-border)] pt-4 md:grid-cols-4">
          {MINI_KPIS.map((k) => (
            <MiniKpiTile key={k.label} kpi={k} />
          ))}
        </div>

        {/* Inline horizontal funnel — keeps "high-level chart" context without a second card */}
        <div className="mt-5 border-t border-[color:var(--mc-border)] pt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="mc-micro uppercase">Funnel · Sent → Converted</span>
            <span className="mc-micro">
              {formatNumber(funnel[0].value)} → {formatNumber(funnel.at(-1)!.value)} (
              {((funnel.at(-1)!.value / funnel[0].value) * 100).toFixed(1)}%)
            </span>
          </div>
          <CompactFunnel />
        </div>
      </div>
    </Card>
  );
}

function MiniKpiTile({ kpi }: { kpi: MiniKpi }) {
  const positive = (kpi.delta ?? 0) >= 0;
  const DeltaIcon = positive ? ArrowUpRight : ArrowDownRight;
  return (
    <div className="min-w-0">
      <div className="mc-small">{kpi.label}</div>
      <div className="mt-0.5 flex items-baseline gap-2">
        <span className="text-[20px] font-semibold tabular-nums text-[color:var(--mc-text-peppercorn)]">
          {kpi.value}
        </span>
      </div>
      {typeof kpi.delta === "number" && (
        <div
          className={cn(
            "mt-0.5 inline-flex items-center gap-0.5 text-[11px]",
            positive ? "text-[color:var(--mc-positive)]" : "text-[color:var(--mc-negative)]"
          )}
        >
          <DeltaIcon className="h-3 w-3" />
          {Math.abs(kpi.delta).toFixed(1)}%
          {kpi.severity && kpi.severity !== "healthy" && (
            <span className="ml-1.5">
              <SeverityBadge severity={kpi.severity} size="sm" />
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function CompactFunnel() {
  const max = Math.max(...funnel.map((s) => s.value));
  return (
    <div className="flex items-end gap-1">
      {funnel.map((s) => {
        const pct = (s.value / max) * 100;
        const drop =
          s.previous !== undefined ? ((s.previous - s.value) / s.previous) * 100 : 0;
        const sev = s.severity ?? "healthy";
        const fill = mcChart.severity[sev];
        return (
          <div
            key={s.id}
            className="group min-w-0 flex-1"
            title={`${s.label}: ${formatNumber(s.value)}${drop > 0 ? ` (−${drop.toFixed(0)}%)` : ""}`}
          >
            <div className="relative h-10 w-full rounded-sm bg-[color:var(--mc-subtle)]">
              <div
                className="absolute bottom-0 left-0 right-0 rounded-sm transition-[height]"
                style={{ height: `${pct}%`, backgroundColor: fill, opacity: 0.9 }}
                aria-label={`${s.label}: ${formatNumber(s.value)}`}
              />
            </div>
            <div className="mt-1 truncate text-[10px] leading-3 text-[color:var(--mc-text-tertiary)]">
              {s.label.replace("Flow ", "").replace("Interacted", "Click")}
            </div>
            <div className="tabular-nums text-[11px] font-medium text-[color:var(--mc-text-peppercorn)]">
              {formatNumber(s.value)}
            </div>
            {drop > 20 && (
              <div className="text-[10px] font-medium text-[color:var(--mc-negative)]">
                −{drop.toFixed(0)}%
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function LiveBadge() {
  return (
    <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-[color:var(--mc-border)] bg-[color:var(--mc-positive-bg)] px-2 py-0.5 text-[10px] font-medium text-[color:var(--mc-positive)]">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--mc-positive)]" />
      Live · grounded
    </div>
  );
}
