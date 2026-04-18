"use client";
import { useMemo, useState } from "react";
import { Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { insights } from "@/lib/mock/insights";
import type { Insight } from "@/lib/types";
import type { Severity } from "@/lib/tokens";
import { Card } from "@/components/cards/Card";

export type AgentChip = {
  id: string;
  label: string;
  insightId: string;
  severity: Severity;
};

type TabId = "recommended" | Insight["group"];

type TabDef = {
  id: TabId;
  label: string;
};

const TABS: TabDef[] = [
  { id: "recommended", label: "Recommended" },
  { id: "reach-quality", label: "Reach & quality" },
  { id: "engagement", label: "Engagement" },
  { id: "conversation", label: "Conversation" },
  { id: "flow-completion", label: "Flow completion" },
  { id: "revenue", label: "Revenue" },
  { id: "cross-channel", label: "Cross channel" },
  { id: "recommendations", label: "Recommendations" },
];

function chipsFor(tab: TabId): AgentChip[] {
  const pool =
    tab === "recommended"
      ? [...insights]
          .filter((i) => i.severity !== "healthy")
          .sort((a, b) => severityWeight(b.severity) - severityWeight(a.severity))
          .slice(0, 6)
      : insights.filter((i) => i.group === tab);
  return pool.flatMap((ins) =>
    (ins.followUps.length ? ins.followUps : [ins.summary]).slice(0, 3).map((label, idx) => ({
      id: `${ins.id}__${idx}`,
      label,
      insightId: ins.id,
      severity: ins.severity,
    }))
  );
}

function severityWeight(s: Severity) {
  return { "action-needed": 4, opportunity: 3, watch: 2, healthy: 1 }[s];
}

type Props = {
  answeredInsightIds: Set<string>;
  onPick: (chip: AgentChip) => void;
  /** External highlight — e.g. set by the hero alert's "Jump to diagnostics". */
  highlightTab?: Insight["group"];
};

export function AgentChipExplorer({ answeredInsightIds, onPick, highlightTab }: Props) {
  const [tab, setTab] = useState<TabId>("recommended");

  // If a caller hints at a tab (via the alert), switch once.
  const effectiveTab: TabId = highlightTab ?? tab;

  const chips = useMemo(() => chipsFor(effectiveTab), [effectiveTab]);
  const total = insights.length;
  const answered = answeredInsightIds.size;

  return (
    <Card className="p-0">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--mc-border)] px-5 pt-4 pb-0">
        <div className="flex items-center gap-2 pb-3">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[color:var(--mc-opportunity-bg)]">
            <Sparkles className="h-3 w-3 text-[color:var(--mc-opportunity)]" />
          </span>
          <h3 className="text-[14px] font-semibold text-[color:var(--mc-text-peppercorn)]">
            Explore diagnostics
          </h3>
          <span className="mc-micro">· Same breadth as Smart mode</span>
        </div>
        <div className="flex items-center gap-3 pb-3 text-[11px]">
          <span className="tabular-nums text-[color:var(--mc-text-secondary)]">
            <strong className="font-semibold text-[color:var(--mc-text-peppercorn)]">
              {answered}
            </strong>{" "}
            / {total} answered
          </span>
          <span className="inline-flex items-center gap-1 text-[color:var(--mc-text-tertiary)]">
            <Check className="h-3 w-3 text-[color:var(--mc-positive)]" /> done
          </span>
        </div>

        {/* Category tabs — underline style, same as the classic-report tabs. */}
        <div
          role="tablist"
          className="col-span-full -mb-px flex w-full flex-wrap items-center gap-4 overflow-x-auto"
        >
          {TABS.map((t) => {
            const active = t.id === effectiveTab;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.id)}
                className={cn(
                  "relative whitespace-nowrap pb-2.5 text-[12px] font-medium transition-colors",
                  active
                    ? "text-[color:var(--mc-text-peppercorn)]"
                    : "text-[color:var(--mc-text-secondary)] hover:text-[color:var(--mc-text-primary)]"
                )}
              >
                {t.label}
                {active && (
                  <span className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-[color:var(--mc-text-peppercorn)]" />
                )}
              </button>
            );
          })}
        </div>
      </header>

      <div className="px-5 py-4">
        <div className="flex flex-wrap gap-1.5">
          {chips.map((chip) => {
            const isAnswered = answeredInsightIds.has(chip.insightId);
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => onPick(chip)}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-[12px] transition-colors",
                  isAnswered
                    ? "border-[color:var(--mc-border)] bg-[color:var(--mc-subtle)] text-[color:var(--mc-text-secondary)] hover:border-[color:var(--mc-opportunity)]"
                    : "border-[color:var(--mc-border-strong)] bg-[color:var(--mc-surface)] text-[color:var(--mc-text-primary)] hover:border-[color:var(--mc-opportunity)] hover:bg-[color:var(--mc-opportunity-bg)]/50"
                )}
                title={isAnswered ? "Answered — click to re-ask" : "Ask the agent"}
              >
                {isAnswered ? (
                  <Check className="h-3 w-3 text-[color:var(--mc-positive)]" />
                ) : (
                  <SeverityDot severity={chip.severity} />
                )}
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

function SeverityDot({ severity }: { severity: Severity }) {
  const color = {
    healthy: "#00892E",
    watch: "#2B77CC",
    opportunity: "#A275FF",
    "action-needed": "#B61A37",
  }[severity];
  return <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />;
}
