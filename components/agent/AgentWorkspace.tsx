"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import { KpiStrip } from "@/components/kpi/KpiStrip";
import { AdaptiveFunnel } from "@/components/cards/AdaptiveFunnel";
import { TrendChart } from "@/components/charts/TrendChart";
import { Card, CardHeader } from "@/components/cards/Card";
import {
  ConversationCanvas,
  type ConversationCanvasHandle,
} from "./ConversationCanvas";
import { EvidenceRail } from "./EvidenceRail";
import { AgentChipMatrix, type AgentChip } from "./AgentChipMatrix";
import { ObjectiveBar } from "./ObjectiveBar";
import { funnel, portfolioTrend } from "@/lib/mock/metrics";
import { insights } from "@/lib/mock/insights";
import { agentScript } from "@/lib/mock/agent-script";
import { AINarrative } from "@/components/cards/AINarrative";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Insight } from "@/lib/types";

type InsightGroup = Insight["group"];

type Props = {
  campaignName: string;
};

export function AgentWorkspace({ campaignName }: Props) {
  const canvasRef = useRef<ConversationCanvasHandle>(null);

  // Track which insights the agent has already answered so chips can show a
  // "done" state. Seed with insight IDs referenced by the scripted turns.
  const initialAnswered = useMemo(
    () => new Set(agentScript.map((t) => t.insightId).filter(Boolean) as string[]),
    []
  );
  const [answered, setAnswered] = useState<Set<string>>(initialAnswered);
  const [highlightGroup, setHighlightGroup] = useState<InsightGroup | undefined>(undefined);

  const handleAnswered = useCallback((insightId: string) => {
    setAnswered((s) => {
      if (s.has(insightId)) return s;
      const next = new Set(s);
      next.add(insightId);
      return next;
    });
  }, []);

  function onChipPick(chip: AgentChip) {
    canvasRef.current?.submitPrompt(chip.label, chip.insightId);
    // Clear the highlight once the user has picked something from it.
    setHighlightGroup(undefined);
    // Smooth-scroll the conversation card into view.
    document
      .getElementById("agent-conversation")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Build the AI narrative strip dynamically from the top anomaly + opportunity.
  const narrative = useMemo(() => {
    const actionNeeded = insights.find((i) => i.severity === "action-needed");
    const opportunity = insights.find((i) => i.severity === "opportunity");
    const win = insights.find((i) => i.severity === "healthy");
    const parts = [
      actionNeeded && `Priority: ${actionNeeded.summary}`,
      opportunity && `Opportunity: ${opportunity.summary}`,
      win && `Win: ${win.summary}`,
    ].filter(Boolean) as string[];
    return parts.join(" · ");
  }, []);

  const suggestedCategories = useMemo(
    () => [
      { group: "flow-completion" as const, label: "Fix flow drop-off" },
      { group: "cross-channel" as const, label: "Optimize sequence" },
      { group: "reach-quality" as const, label: "Protect deliverability" },
    ],
    []
  );

  return (
    <div className="space-y-5">
      {/* Proactive alert at the top */}
      <Card className="flex items-center gap-3 border-l-4 border-l-[color:var(--mc-attention)] bg-[color:var(--mc-attention-bg)]/40 p-3 px-4">
        <Bell className="h-4 w-4 shrink-0 text-[color:var(--mc-attention)]" />
        <p className="flex-1 text-[13px] text-[color:var(--mc-text-primary)]">
          <strong className="font-semibold text-[color:var(--mc-text-peppercorn)]">
            Proactive alert:
          </strong>{" "}
          Flow Step 2 timeout rose to 31% — concentrated in new customers in India. I&apos;ve staged
          a fix for your review.
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setHighlightGroup("flow-completion")}
        >
          Jump to diagnostics
        </Button>
      </Card>

      <ObjectiveBar
        objective="Improve abandoned-cart recovery revenue from WhatsApp in India and the UK."
        campaign={campaignName}
        dateRange="Last 30 days"
      />

      <AINarrative
        narrative={narrative}
        chips={["Step 2 timeout 31%", "Reply rate −19% vs peer", "Sequence lift available"]}
      />

      {/* High-level metrics: same KPI + funnel + trend as smart/classic mode,
          so the agent view is no longer narrow. */}
      <KpiStrip title="WhatsApp performance" />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Performance trend"
            subtitle="Revenue and conversions — last 30 days"
            action={
              <div className="flex items-center gap-2 text-[11px] text-[color:var(--mc-text-secondary)]">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#2B77CC]" /> Revenue
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#00892E]" /> Conversions
                </span>
              </div>
            }
          />
          <div className="px-4 pb-4">
            <TrendChart
              height={220}
              series={[
                { id: "revenue", label: "Revenue", data: portfolioTrend.revenue, color: "#2B77CC" },
                { id: "conversions", label: "Conversions", data: portfolioTrend.conversions, color: "#00892E" },
              ]}
            />
          </div>
        </Card>

        <AdaptiveFunnel
          stages={funnel}
          title="Adaptive funnel"
          subtitle="Sent → Converted"
        />
      </div>

      {/* Agent-suggested routes — gives the user a fast path into a category. */}
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-[color:var(--mc-border)] bg-[color:var(--mc-subtle)] px-4 py-3">
        <span className="mc-micro uppercase">Agent suggests</span>
        {suggestedCategories.map((s) => (
          <button
            key={s.group}
            type="button"
            onClick={() => {
              setHighlightGroup(s.group);
              document
                .getElementById("agent-chip-matrix")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-flex h-7 items-center gap-1.5 rounded-full border border-[color:var(--mc-border-strong)] bg-[color:var(--mc-surface)] px-3 text-[12px] font-medium text-[color:var(--mc-text-primary)] hover:border-[color:var(--mc-opportunity)] hover:bg-[color:var(--mc-opportunity-bg)]/50"
          >
            {s.label} →
          </button>
        ))}
      </div>

      {/* Conversation + evidence rail */}
      <div id="agent-conversation" className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
        <ConversationCanvas ref={canvasRef} onInsightAnswered={handleAnswered} />
        <EvidenceRail />
      </div>

      {/* Full chip matrix — every smart-mode category available inside agent mode. */}
      <div id="agent-chip-matrix">
        <AgentChipMatrix
          answeredInsightIds={answered}
          onPick={onChipPick}
          highlightGroup={highlightGroup}
        />
      </div>
    </div>
  );
}
