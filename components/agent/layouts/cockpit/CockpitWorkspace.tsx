"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import { Bell, X } from "lucide-react";
import {
  ConversationCanvas,
  type ConversationCanvasHandle,
} from "@/components/agent/ConversationCanvas";
import { CockpitContextRail } from "./CockpitContextRail";
import { CockpitChipRail, type AgentChip } from "./CockpitChipRail";
import { insights } from "@/lib/mock/insights";
import { agentScript } from "@/lib/mock/agent-script";
import type { Insight } from "@/lib/types";

/**
 * Pattern A — Command Cockpit.
 *
 * 3-column layout:
 *   [Context Rail 260px] [Conversation flex] [Chip Rail 300px]
 *
 * Target: no scroll at 1440×900. The whole workspace sizes to the available
 * viewport height below the page header.
 */
export function CockpitWorkspace({ campaignName }: { campaignName: string }) {
  void campaignName;
  const canvasRef = useRef<ConversationCanvasHandle>(null);
  const [alertOpen, setAlertOpen] = useState(true);
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

  const narrative = useMemo(() => {
    const issue = insights.find((i) => i.severity === "action-needed");
    const win = insights.find((i) => i.severity === "healthy");
    return [issue?.summary, win?.summary].filter(Boolean).join(" · ");
  }, []);

  function onChipPick(chip: AgentChip) {
    canvasRef.current?.submitPrompt(chip.label, chip.insightId);
    setHighlight(undefined);
  }

  return (
    <div
      className="flex flex-col gap-3"
      style={{ height: "calc(100vh - 140px)" }}
    >
      {/* Slim alert strip */}
      {alertOpen && (
        <div className="flex shrink-0 items-center gap-2 rounded-md border border-[color:var(--mc-attention)]/30 bg-[color:var(--mc-attention-bg)]/60 px-4 py-2">
          <Bell className="h-3.5 w-3.5 shrink-0 text-[color:var(--mc-attention)]" />
          <p className="flex-1 text-[12px] text-[color:var(--mc-text-primary)]">
            <strong className="font-semibold text-[color:var(--mc-text-peppercorn)]">
              Alert ·
            </strong>{" "}
            Flow Step 2 timeout rose to 31%, concentrated in new customers in India.
          </p>
          <button
            type="button"
            onClick={() => setHighlight("flow-completion")}
            className="text-[12px] font-medium text-[color:var(--mc-link)] hover:underline"
          >
            Jump →
          </button>
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

      <div
        className="grid min-h-0 flex-1 gap-3"
        style={{ gridTemplateColumns: "260px 1fr 300px" }}
      >
        <CockpitContextRail
          objective="Improve abandoned-cart recovery revenue from WhatsApp in India and the UK."
          narrative={narrative}
        />

        <div className="min-w-0">
          <ConversationCanvas
            ref={canvasRef}
            onInsightAnswered={handleAnswered}
            heightClass="h-full"
          />
        </div>

        <CockpitChipRail
          answeredInsightIds={answered}
          onPick={onChipPick}
          highlightCategory={highlight}
        />
      </div>
    </div>
  );
}
