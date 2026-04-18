"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  ConversationCanvas,
  type ConversationCanvasHandle,
} from "./ConversationCanvas";
import { AgentChipExplorer, type AgentChip } from "./AgentChipExplorer";
import { AgentHero } from "./AgentHero";
import { insights } from "@/lib/mock/insights";
import { agentScript } from "@/lib/mock/agent-script";
import type { Insight } from "@/lib/types";

type Props = {
  campaignName: string;
};

/**
 * Streamlined agent surface: three stacked surfaces, single column.
 *
 *   1. AgentHero        — objective + narrative + 4 mini KPIs + compact funnel
 *   2. ConversationCanvas — primary interaction
 *   3. AgentChipExplorer — tabbed access to every diagnostic (same breadth as Smart)
 *
 * Everything flows through one controller: chip clicks submit prompts to the
 * conversation, and answered insight IDs light up chips. No sidebar, no
 * duplicate alerts, no redundant cards.
 */
export function AgentWorkspace({ campaignName }: Props) {
  void campaignName;
  const canvasRef = useRef<ConversationCanvasHandle>(null);

  const initialAnswered = useMemo(
    () => new Set(agentScript.map((t) => t.insightId).filter(Boolean) as string[]),
    []
  );
  const [answered, setAnswered] = useState<Set<string>>(initialAnswered);
  const [highlightTab, setHighlightTab] = useState<Insight["group"] | undefined>(undefined);

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
    setHighlightTab(undefined);
    document
      .getElementById("agent-conversation")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Build one-line narrative from the top issue + top opportunity.
  const narrative = useMemo(() => {
    const issue =
      insights.find((i) => i.severity === "action-needed") ||
      insights.find((i) => i.severity === "opportunity");
    const win = insights.find((i) => i.severity === "healthy");
    return [issue?.summary, win?.summary].filter(Boolean).join(" · ");
  }, []);

  function jumpToFlowCategory() {
    setHighlightTab("flow-completion");
    document
      .getElementById("agent-explorer")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="mx-auto max-w-[960px] space-y-5">
      <AgentHero
        objective="Improve abandoned-cart recovery revenue from WhatsApp in India and the UK."
        narrative={narrative}
        alertMessage="Flow Step 2 timeout rose to 31%, concentrated in new customers in India. A fix is staged for your review."
        onAlertAction={jumpToFlowCategory}
      />

      <div id="agent-conversation">
        <ConversationCanvas ref={canvasRef} onInsightAnswered={handleAnswered} />
      </div>

      <div id="agent-explorer">
        <AgentChipExplorer
          answeredInsightIds={answered}
          onPick={onChipPick}
          highlightTab={highlightTab}
        />
      </div>
    </div>
  );
}
