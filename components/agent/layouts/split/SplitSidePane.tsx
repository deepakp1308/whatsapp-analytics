"use client";
import { useMemo, useState } from "react";
import {
  Sparkles,
  LayoutList,
  ListChecks,
  PanelRightClose,
  PanelRightOpen,
  Check,
  CircleCheck,
  Clock,
  Circle,
} from "lucide-react";
import type { Insight, Action } from "@/lib/types";
import type { Severity } from "@/lib/tokens";
import { mcChart } from "@/lib/tokens";
import { insights } from "@/lib/mock/insights";
import { cn } from "@/lib/utils";
import { EvidencePanel } from "@/components/rail/EvidencePanel";
import { agentScript } from "@/lib/mock/agent-script";

export type AgentChip = {
  id: string;
  label: string;
  insightId: string;
  severity: Severity;
};

type PaneMode = "chips" | "evidence" | "actions";
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
    (ins.followUps.length ? ins.followUps : [ins.summary]).slice(0, 3).map((label, idx) => ({
      id: `${ins.id}__${idx}`,
      label,
      insightId: ins.id,
      severity: ins.severity,
    }))
  );
}

type StagedAction = {
  id: string;
  action: Action;
  insightId: string;
  status: "applied" | "staged" | "suggested";
};

type Props = {
  answeredInsightIds: Set<string>;
  onPickChip: (chip: AgentChip) => void;
  highlightCategory?: Insight["group"];
  collapsed: boolean;
  onToggleCollapse: () => void;
};

export function SplitSidePane({
  answeredInsightIds,
  onPickChip,
  highlightCategory,
  collapsed,
  onToggleCollapse,
}: Props) {
  const [mode, setMode] = useState<PaneMode>("chips");
  const [selectedCat, setSelectedCat] = useState<CategoryId>("recommended");

  const activeCat = highlightCategory ?? selectedCat;
  const chips = useMemo(() => chipsFor(activeCat), [activeCat]);

  // Collect staged actions from the scripted conversation.
  const stagedActions: StagedAction[] = useMemo(() => {
    const out: StagedAction[] = [];
    agentScript.forEach((turn) => {
      if (!turn.actions) return;
      turn.actions.forEach((a, i) => {
        out.push({
          id: `${turn.id}-${i}`,
          action: a,
          insightId: turn.insightId ?? "",
          status: i === 0 ? "staged" : "suggested",
        });
      });
    });
    // Add one "applied" to demonstrate history
    if (out.length > 0) out[0] = { ...out[0], status: "applied" };
    return out;
  }, []);

  const latestEvidenceInsight = useMemo(() => {
    const withEvidence = [...agentScript]
      .reverse()
      .find((t) => t.evidence && t.evidence.length > 0);
    if (withEvidence?.insightId)
      return insights.find((i) => i.id === withEvidence.insightId) ?? null;
    return null;
  }, []);

  if (collapsed) {
    return (
      <aside
        className="flex h-full w-10 shrink-0 flex-col items-center gap-2 rounded-[12px] border border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] py-3"
        aria-label="Side pane (collapsed)"
      >
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label="Expand pane"
          className="grid h-8 w-8 place-items-center rounded-md text-[color:var(--mc-text-secondary)] hover:bg-[color:var(--mc-subtle)]"
          title="Expand pane"
        >
          <PanelRightOpen className="h-4 w-4" />
        </button>
        <div className="my-2 h-px w-6 bg-[color:var(--mc-border)]" />
        <TabIcon icon={Sparkles} active={mode === "chips"} onClick={() => { setMode("chips"); onToggleCollapse(); }} label="Chips" />
        <TabIcon icon={LayoutList} active={mode === "evidence"} onClick={() => { setMode("evidence"); onToggleCollapse(); }} label="Evidence" />
        <TabIcon icon={ListChecks} active={mode === "actions"} onClick={() => { setMode("actions"); onToggleCollapse(); }} label="Actions" />
      </aside>
    );
  }

  return (
    <aside
      className="mc-scroll flex h-full w-[380px] shrink-0 flex-col overflow-hidden rounded-[12px] border border-[color:var(--mc-border)] bg-[color:var(--mc-surface)]"
      aria-label="Side pane"
    >
      <header className="border-b border-[color:var(--mc-border)] px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          <div
            role="tablist"
            aria-label="Pane mode"
            className="inline-flex rounded-full border border-[color:var(--mc-border)] bg-[color:var(--mc-subtle)] p-0.5"
          >
            <ModeTab
              id="chips"
              active={mode === "chips"}
              onClick={() => setMode("chips")}
              icon={Sparkles}
              label="Chips"
            />
            <ModeTab
              id="evidence"
              active={mode === "evidence"}
              onClick={() => setMode("evidence")}
              icon={LayoutList}
              label="Evidence"
            />
            <ModeTab
              id="actions"
              active={mode === "actions"}
              onClick={() => setMode("actions")}
              icon={ListChecks}
              label="Actions"
            />
          </div>
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Collapse pane"
            className="grid h-7 w-7 place-items-center rounded-md text-[color:var(--mc-text-secondary)] hover:bg-[color:var(--mc-subtle)]"
            title="Collapse pane"
          >
            <PanelRightClose className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      <div className="mc-scroll flex-1 overflow-y-auto">
        {mode === "chips" && (
          <div>
            <div className="flex flex-wrap items-center gap-2 border-b border-[color:var(--mc-border)] px-3 py-2">
              {CATEGORIES.map((c) => {
                const active = c.id === activeCat;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCat(c.id)}
                    className={cn(
                      "h-6 whitespace-nowrap rounded-full px-2.5 text-[11px] font-medium",
                      active
                        ? "bg-[color:var(--mc-text-peppercorn)] text-white"
                        : "text-[color:var(--mc-text-secondary)] hover:bg-[color:var(--mc-subtle)]"
                    )}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-col gap-1.5 p-3">
              {chips.map((chip) => {
                const isAnswered = answeredInsightIds.has(chip.insightId);
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => onPickChip(chip)}
                    className={cn(
                      "flex items-start gap-2 rounded-md border px-3 py-2 text-left text-[12px] leading-[17px]",
                      isAnswered
                        ? "border-[color:var(--mc-border)] bg-[color:var(--mc-subtle)] text-[color:var(--mc-text-secondary)] hover:border-[color:var(--mc-opportunity)]"
                        : "border-[color:var(--mc-border-strong)] bg-[color:var(--mc-surface)] text-[color:var(--mc-text-primary)] hover:border-[color:var(--mc-opportunity)] hover:bg-[color:var(--mc-opportunity-bg)]/50"
                    )}
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
        )}

        {mode === "evidence" && (
          <div className="p-3">
            {latestEvidenceInsight ? (
              <>
                <div className="mb-2">
                  <div className="mc-micro uppercase">Latest answer</div>
                  <p className="mt-0.5 text-[13px] font-medium leading-[18px] text-[color:var(--mc-text-peppercorn)]">
                    {latestEvidenceInsight.summary}
                  </p>
                </div>
                <EvidencePanel evidence={latestEvidenceInsight.evidence} />
              </>
            ) : (
              <p className="mc-small">Ask the agent something to see evidence here.</p>
            )}
          </div>
        )}

        {mode === "actions" && (
          <div className="flex flex-col gap-2 p-3">
            {stagedActions.length === 0 ? (
              <p className="mc-small">No staged actions yet.</p>
            ) : (
              stagedActions.map((sa) => <ActionRow key={sa.id} item={sa} />)
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

function ModeTab({
  id,
  active,
  onClick,
  icon: Icon,
  label,
}: {
  id: string;
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      id={id}
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "inline-flex h-6 items-center gap-1 rounded-full px-2.5 text-[11px] font-medium",
        active
          ? "bg-[color:var(--mc-surface)] text-[color:var(--mc-text-peppercorn)] shadow-[var(--mc-shadow-sm)]"
          : "text-[color:var(--mc-text-secondary)] hover:text-[color:var(--mc-text-primary)]"
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </button>
  );
}

function TabIcon({
  icon: Icon,
  active,
  onClick,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "grid h-8 w-8 place-items-center rounded-md",
        active
          ? "bg-[color:var(--mc-opportunity-bg)] text-[color:var(--mc-opportunity)]"
          : "text-[color:var(--mc-text-secondary)] hover:bg-[color:var(--mc-subtle)]"
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

function ActionRow({ item }: { item: StagedAction }) {
  const tone = {
    applied: { bg: "var(--mc-positive-bg)", fg: "var(--mc-positive)", Icon: CircleCheck, label: "Applied" },
    staged: { bg: "var(--mc-attention-bg)", fg: "var(--mc-attention)", Icon: Clock, label: "Staged" },
    suggested: { bg: "var(--mc-subtle)", fg: "var(--mc-text-tertiary)", Icon: Circle, label: "Suggested" },
  }[item.status];
  return (
    <div className="rounded-md border border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] p-3">
      <div className="mb-1 flex items-center justify-between gap-2">
        <span
          className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium"
          style={{ backgroundColor: tone.bg, color: tone.fg }}
        >
          <tone.Icon className="h-2.5 w-2.5" />
          {tone.label}
        </span>
        <span className="mc-micro uppercase">{item.action.kind.replace(/-/g, " ")}</span>
      </div>
      <p className="text-[13px] font-medium leading-5 text-[color:var(--mc-text-peppercorn)]">
        {item.action.label}
      </p>
      <p className="mt-0.5 text-[11px] leading-4 text-[color:var(--mc-text-secondary)]">
        {item.action.description}
      </p>
      {item.status !== "applied" && (
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            className="h-7 rounded-md border border-[color:var(--mc-border-strong)] px-2.5 text-[11px] font-medium text-[color:var(--mc-text-primary)] hover:bg-[color:var(--mc-subtle)]"
          >
            Review draft
          </button>
          <button
            type="button"
            className="h-7 rounded-md bg-[color:var(--mc-cta)] px-2.5 text-[11px] font-medium text-white hover:bg-[color:var(--mc-cta-hover)]"
          >
            Apply
          </button>
        </div>
      )}
    </div>
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
