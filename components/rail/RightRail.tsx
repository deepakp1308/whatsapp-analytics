"use client";
import { useEffect } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";
import type { Insight } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { SeverityBadge } from "@/components/cards/SeverityBadge";
import { cn } from "@/lib/utils";
import { ActionComposer } from "./ActionComposer";
import { EvidencePanel } from "./EvidencePanel";

type Props = {
  insight: Insight | null;
  onClose: () => void;
  onFollowUp?: (prompt: string) => void;
};

export function RightRail({ insight, onClose, onFollowUp }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const open = insight !== null;

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/20 transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Insight detail"
        className={cn(
          "fixed right-0 top-0 z-50 h-screen w-full max-w-[480px] transform border-l border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] shadow-[var(--mc-shadow-lg)] transition-transform mc-scroll overflow-y-auto",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {insight && (
          <div className="flex h-full flex-col">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[color:var(--mc-opportunity-bg)]">
                  <Sparkles className="h-3 w-3 text-[color:var(--mc-opportunity)]" />
                </span>
                <span className="mc-micro uppercase">Insight detail</span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-md hover:bg-[color:var(--mc-subtle)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 px-5 py-4">
              <div className="mb-3">
                <SeverityBadge severity={insight.severity} />
              </div>

              <h3 className="text-[20px] font-semibold leading-7 text-[color:var(--mc-text-peppercorn)]">
                {insight.summary}
              </h3>
              <p className="mt-2 text-[13px] leading-[20px] text-[color:var(--mc-text-secondary)]">
                {insight.rationale}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-4 rounded-lg bg-[color:var(--mc-subtle)] p-4">
                {Object.entries(insight.metrics)
                  .slice(0, 4)
                  .map(([k, v]) => (
                    <div key={k}>
                      <div className="mc-micro uppercase">{k.replace(/([A-Z])/g, " $1")}</div>
                      <div className="mt-0.5 text-[18px] font-medium tabular-nums text-[color:var(--mc-text-peppercorn)]">
                        {typeof v === "number" && v < 100 && v > 0
                          ? v % 1 !== 0
                            ? v.toFixed(1)
                            : String(v)
                          : new Intl.NumberFormat("en-US").format(v)}
                      </div>
                    </div>
                  ))}
              </div>

              {insight.evidence.length > 0 && (
                <div className="mt-5">
                  <h4 className="mc-micro mb-2 uppercase">Evidence</h4>
                  <EvidencePanel evidence={insight.evidence} />
                </div>
              )}

              {insight.followUps.length > 0 && (
                <div className="mt-5">
                  <h4 className="mc-micro mb-2 uppercase">Follow-up prompts</h4>
                  <ul className="flex flex-col gap-1">
                    {insight.followUps.map((f) => (
                      <li key={f}>
                        <button
                          onClick={() => onFollowUp?.(f)}
                          className="group flex w-full items-center justify-between rounded-md border border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] px-3 py-2 text-left text-[13px] text-[color:var(--mc-text-primary)] hover:border-[color:var(--mc-opportunity)] hover:bg-[color:var(--mc-opportunity-bg)]/50"
                        >
                          {f}
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[color:var(--mc-text-tertiary)] group-hover:text-[color:var(--mc-opportunity)]" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {insight.recommendedAction && (
                <div className="mt-5">
                  <h4 className="mc-micro mb-2 uppercase">Recommended actions</h4>
                  <ActionComposer actions={[insight.recommendedAction]} />
                </div>
              )}
            </div>

            {insight.recommendedAction && (
              <div className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] px-5 py-3">
                <div className="min-w-0">
                  <div className="mc-micro uppercase">Est. impact</div>
                  {insight.estimatedImpact && (
                    <div className="text-[14px] font-semibold text-[color:var(--mc-positive)]">
                      {insight.estimatedImpact.unit === "usd"
                        ? `+$${insight.estimatedImpact.delta.toLocaleString()}`
                        : `+${insight.estimatedImpact.delta}% ${insight.estimatedImpact.metric}`}
                    </div>
                  )}
                </div>
                <Button variant="primary" size="md">
                  {insight.recommendedAction.label}
                </Button>
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
