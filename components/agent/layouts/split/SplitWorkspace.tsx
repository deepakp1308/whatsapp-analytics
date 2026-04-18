"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  ConversationCanvas,
  type ConversationCanvasHandle,
} from "@/components/agent/ConversationCanvas";
import { SplitHeroStrip } from "./SplitHeroStrip";
import { SplitSidePane, type AgentChip } from "./SplitSidePane";
import { agentScript } from "@/lib/mock/agent-script";
import type { Insight } from "@/lib/types";

/**
 * Pattern B — Split Workspace with Pinnable Pane.
 *
 *   [Hero strip — objective + KPIs + funnel sparkline]
 *   [Conversation (fills remaining height)  |  Side pane (Chips / Evidence / Actions)]
 *
 * Everything above the fold on 1440×900. The side pane collapses to a 40px
 * vertical icon strip so the conversation can expand full-width on demand.
 */
export function SplitWorkspace({ campaignName }: { campaignName: string }) {
  void campaignName;
  const canvasRef = useRef<ConversationCanvasHandle>(null);
  const [paneCollapsed, setPaneCollapsed] = useState(false);
  const [highlight, setHighlight] = useState<Insight["group"] | undefined>(undefined);

  const initialAnswered = useMemo(
    () => new Set(agentScript.map((t) => t.insightId).filter(Boolean) as string[]),
    []
  );
  const [answered, setAnswered] = useState<Set<string>>(initialAnswered);

  const handleAnswered = useCallback((id: string) => {
    setAnswered((s) => {
      if (s.has(id)) return s;
      const n = new Set(s);
      n.add(id);
      return n;
    });
  }, []);

  function onPickChip(chip: AgentChip) {
    canvasRef.current?.submitPrompt(chip.label, chip.insightId);
    setHighlight(undefined);
  }

  function onAlertAction() {
    setHighlight("flow-completion");
    setPaneCollapsed(false);
  }

  return (
    <div
      className="flex flex-col gap-3"
      style={{ height: "calc(100vh - 140px)" }}
    >
      <SplitHeroStrip
        objective="Improve abandoned-cart recovery revenue from WhatsApp in India and the UK."
        alertMessage="Flow Step 2 timeout rose to 31%, concentrated in new customers in India."
        onAlertAction={onAlertAction}
      />

      <div className="flex min-h-0 flex-1 gap-3">
        <div className="min-w-0 flex-1">
          <ConversationCanvas
            ref={canvasRef}
            onInsightAnswered={handleAnswered}
            heightClass="h-full"
          />
        </div>

        <SplitSidePane
          answeredInsightIds={answered}
          onPickChip={onPickChip}
          highlightCategory={highlight}
          collapsed={paneCollapsed}
          onToggleCollapse={() => setPaneCollapsed((c) => !c)}
        />
      </div>
    </div>
  );
}
