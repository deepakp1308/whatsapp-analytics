"use client";
import { useMemo, useState } from "react";
import { Sparkles, Check, ChevronRight } from "lucide-react";
import { insights } from "@/lib/mock/insights";
import type { Insight } from "@/lib/types";
import type { Severity } from "@/lib/tokens";
import { mcChart } from "@/lib/tokens";
import { cn } from "@/lib/utils";

export type AgentChip = {
  id: string;
  label: string;
  insightId: string;
  severity: Severity;
};

type CategoryId = "recommended" | Insight["group"];

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "recommended", label: "Recommended" },
  { id: "reach-quality", label: "Reach & quality" },
  { id: "engagement", label: "Engagement" },
  { id: "conversation", label: "Conversation" },
  { id: "flow-completion", label: "Flow completion" },
  { id: "revenue", label: "Revenue" },
  { id: "cross-channel", label: "Cross channel" },
  { id: "recommendations", label: "Recommendations" },
];

function severityWeight(s: Severity) {
  return { "action-needed": 4, opportunity: 3, watch: 2, healthy: 1 }[s];
}

function chipsFor(cat: CategoryId): AgentChip[] {
  const pool =
    cat === "recommended"
      ? [...insights]
          .filter((i) => i.severity !== "healthy")
          .sort((a, b) => severityWeight(b.severity) - severityWeight(a.severity))
          .slice(0, 6)
      : insights.filter((i) => i.group === cat);
  return pool.flatMap((ins) =>
    (ins.followUps.length ? ins.followUps : [ins.summary]).slice(0, 4).map((label, idx) => ({
      id: `${ins.id}__${idx}`,
      label,
      insightId: ins.id,
      severity: ins.severity,
    }))
  );
}

function countsFor(cat: Insight["group"], answered: Set<string>) {
  const groupInsights = insights.filter((i) => i.group === cat);
  const done = groupInsights.filter((i) => answered.has(i.id)).length;
  return { done, total: groupInsights.length };
}

type Props = {
  answeredInsightIds: Set<string>;
  onPick: (chip: AgentChip) => void;
  /** When set, forces the rail to that category once. */
  highlightCategory?: Insight["group"];
};

export function CockpitChipRail({ answeredInsightIds, onPick, highlightCategory }: Props) {
  const [selected, setSelected] = useState<CategoryId>("recommended");
  const active: CategoryId = highlightCategory ?? selected;
  const chips = useMemo(() => chipsFor(active), [active]);
  const totalAnswered = answeredInsightIds.size;
  const totalInsights = insights.length;

  return (
    <aside
      className="mc-scroll flex h-full flex-col overflow-hidden rounded-[12px] border border-[color:var(--mc-border)] bg-[color:var(--mc-surface)]"
      aria-label="Explore diagnostics"
    >
      <header className="border-b border-[color:var(--mc-border)] px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[color:var(--mc-opportunity-bg)]">
              <Sparkles className="h-2.5 w-2.5 text-[color:var(--mc-opportunity)]" />
            </span>
            <h3 className="text-[12px] font-semibold text-[color:var(--mc-text-peppercorn)]">
              Explore
            </h3>
          </div>
          <span className="mc-micro tabular-nums">
            {totalAnswered} / {totalInsights}
          </span>
        </div>
      </header>

      <div className="mc-scroll flex-1 overflow-y-auto">
        {/* Vertical category list */}
        <ul className="border-b border-[color:var(--mc-border)] px-2 py-2">
          {CATEGORIES.map((c) => {
            const isActive = c.id === active;
            const counts = c.id === "recommended" ? null : countsFor(c.id, answeredInsightIds);
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setSelected(c.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[12px] transition-colors",
                    isActive
                      ? "bg-[color:var(--mc-opportunity-bg)]/40 font-semibold text-[color:var(--mc-text-peppercorn)]"
                      : "text-[color:var(--mc-text-primary)] hover:bg-[color:var(--mc-subtle)]"
                  )}
                  aria-pressed={isActive}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {isActive && (
                      <ChevronRight className="h-3 w-3 text-[color:var(--mc-opportunity)]" />
                    )}
                    {c.label}
                  </span>
                  {counts && (
                    <span
                      className={cn(
                        "tabular-nums text-[10px]",
                        counts.done === counts.total
                          ? "text-[color:var(--mc-positive)]"
                          : "text-[color:var(--mc-text-tertiary)]"
                      )}
                    >
                      {counts.done}/{counts.total}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Chips for the active category */}
        <div className="flex flex-col gap-1.5 p-3">
          {chips.map((chip) => {
            const isAnswered = answeredInsightIds.has(chip.insightId);
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => onPick(chip)}
                className={cn(
                  "group flex items-start gap-2 rounded-md border px-3 py-2 text-left text-[12px] leading-[17px] transition-colors",
                  isAnswered
                    ? "border-[color:var(--mc-border)] bg-[color:var(--mc-subtle)] text-[color:var(--mc-text-secondary)] hover:border-[color:var(--mc-opportunity)]"
                    : "border-[color:var(--mc-border-strong)] bg-[color:var(--mc-surface)] text-[color:var(--mc-text-primary)] hover:border-[color:var(--mc-opportunity)] hover:bg-[color:var(--mc-opportunity-bg)]/50"
                )}
                title={isAnswered ? "Answered — click to re-ask" : "Ask the agent"}
              >
                {isAnswered ? (
                  <Check className="mt-0.5 h-3 w-3 shrink-0 text-[color:var(--mc-positive)]" />
                ) : (
                  <SeverityDot severity={chip.severity} />
                )}
                <span className="min-w-0 flex-1">{chip.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function SeverityDot({ severity }: { severity: Severity }) {
  return (
    <span
      className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
      style={{ backgroundColor: mcChart.severity[severity] }}
    />
  );
}
