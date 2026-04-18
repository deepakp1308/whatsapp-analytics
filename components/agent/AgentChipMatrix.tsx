"use client";
import { Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { insights } from "@/lib/mock/insights";
import { SeverityBadge } from "@/components/cards/SeverityBadge";
import type { Insight } from "@/lib/types";
import type { Severity } from "@/lib/tokens";

type Chip = {
  id: string;            // unique chip id
  label: string;         // prompt text
  insightId: string;     // grounding insight
  severity: Severity;    // inherited from the underlying insight
};

type GroupDef = {
  title: string;
  group: Insight["group"];
  description: string;
};

/**
 * Mirrors the smart-mode category taxonomy 1:1 so the agent surface
 * exposes the full breadth of diagnostics, not just the scripted path.
 */
const GROUPS: GroupDef[] = [
  { title: "Reach & quality", group: "reach-quality", description: "Delivery, failures, quality rating risk" },
  { title: "Engagement", group: "engagement", description: "Read, click, button selection, replies" },
  { title: "Conversation", group: "conversation", description: "Intents, handoff, containment, CSAT" },
  { title: "Flow completion", group: "flow-completion", description: "Step drop-off, timeouts, retries" },
  { title: "Revenue", group: "revenue", description: "Attributed, assisted, AOV, new vs returning" },
  { title: "Cross channel", group: "cross-channel", description: "Sequence paths, gaps, fatigue" },
  { title: "Recommendations", group: "recommendations", description: "Highest-impact next moves" },
];

function buildChips(group: Insight["group"]): Chip[] {
  const groupInsights = insights.filter((i) => i.group === group);
  return groupInsights.flatMap((ins) =>
    (ins.followUps.length ? ins.followUps : [ins.summary]).map((label, idx) => ({
      id: `${ins.id}__${idx}`,
      label,
      insightId: ins.id,
      severity: ins.severity,
    }))
  );
}

type Props = {
  /** Insight IDs that already have an answer turn in the conversation. */
  answeredInsightIds: Set<string>;
  /** Called when the user picks a chip. */
  onPick: (chip: Chip) => void;
  /** Optionally emphasize a group (e.g. the agent routed the user here). */
  highlightGroup?: Insight["group"];
};

export function AgentChipMatrix({ answeredInsightIds, onPick, highlightGroup }: Props) {
  return (
    <section className="rounded-[12px] border border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] p-6">
      <header className="mb-5 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[color:var(--mc-opportunity-bg)]">
              <Sparkles className="h-3 w-3 text-[color:var(--mc-opportunity)]" />
            </span>
            <h3 className="mc-h-section">Explore by category</h3>
          </div>
          <p className="mc-small mt-1">
            All smart-mode diagnostics are available to the agent. Pick any chip — I&apos;ll answer
            inline with evidence, actions, and follow-ups.
          </p>
        </div>
        <div className="text-right">
          <div className="mc-micro uppercase">Answered</div>
          <div className="text-[16px] font-semibold tabular-nums text-[color:var(--mc-text-peppercorn)]">
            {answeredInsightIds.size}
            <span className="ml-1 text-[12px] font-normal text-[color:var(--mc-text-secondary)]">
              / {insights.length}
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {GROUPS.map((g) => {
          const chips = buildChips(g.group);
          const answered = chips.filter((c) => answeredInsightIds.has(c.insightId)).length;
          const total = chips.length;
          const highlight = g.group === highlightGroup;
          return (
            <div
              key={g.group}
              className={cn(
                "rounded-lg border p-4 transition-colors",
                highlight
                  ? "border-[color:var(--mc-opportunity)] bg-[color:var(--mc-opportunity-bg)]/30"
                  : "border-[color:var(--mc-border)] bg-[color:var(--mc-subtle)]"
              )}
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-[13px] font-semibold text-[color:var(--mc-text-peppercorn)]">
                    {g.title}
                  </h4>
                  <p className="mc-micro mt-0.5">{g.description}</p>
                </div>
                <span className="shrink-0 text-[11px] tabular-nums text-[color:var(--mc-text-tertiary)]">
                  {answered}/{total}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {chips.map((chip) => {
                  const isAnswered = answeredInsightIds.has(chip.insightId);
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => onPick(chip)}
                      className={cn(
                        "group inline-flex h-7 items-center gap-1.5 rounded-full border px-3 text-[12px] font-medium transition-colors",
                        isAnswered
                          ? "border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] text-[color:var(--mc-text-secondary)] hover:border-[color:var(--mc-opportunity)]"
                          : "border-[color:var(--mc-border-strong)] bg-[color:var(--mc-surface)] text-[color:var(--mc-text-primary)] hover:border-[color:var(--mc-opportunity)] hover:bg-[color:var(--mc-opportunity-bg)]/50"
                      )}
                      title={isAnswered ? "Already answered — click to re-ask" : "Ask the agent"}
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
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[color:var(--mc-border)] pt-4 text-[11px]">
        <span className="mc-micro uppercase">Legend:</span>
        <Legend label="Healthy" severity="healthy" />
        <Legend label="Watch" severity="watch" />
        <Legend label="Opportunity" severity="opportunity" />
        <Legend label="Action needed" severity="action-needed" />
        <span className="inline-flex items-center gap-1.5 text-[color:var(--mc-text-secondary)]">
          <Check className="h-3 w-3 text-[color:var(--mc-positive)]" /> Agent has answered
        </span>
      </div>
    </section>
  );
}

function SeverityDot({ severity }: { severity: Severity }) {
  const color = {
    healthy: "#00892E",
    watch: "#2B77CC",
    opportunity: "#A275FF",
    "action-needed": "#B61A37",
  }[severity];
  return <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />;
}

function Legend({ label, severity }: { label: string; severity: Severity }) {
  return <SeverityBadge severity={severity} label={label} size="sm" />;
}

export type { Chip as AgentChip };
