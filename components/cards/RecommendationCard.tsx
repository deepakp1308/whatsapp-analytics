"use client";
import { useState } from "react";
import type { Insight } from "@/lib/types";
import { Card } from "./Card";
import { SeverityBadge } from "./SeverityBadge";
import { Button } from "@/components/ui/Button";
import { Check, Sparkles } from "lucide-react";

export function RecommendationCard({ insight }: { insight: Insight }) {
  const [applied, setApplied] = useState(false);
  return (
    <Card className="flex flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[color:var(--mc-opportunity-bg)]">
            <Sparkles className="h-3 w-3 text-[color:var(--mc-opportunity)]" />
          </span>
          <span className="mc-micro uppercase">Recommendation</span>
        </div>
        <SeverityBadge severity={insight.severity} />
      </div>
      <h4 className="text-[16px] font-semibold leading-5 text-[color:var(--mc-text-peppercorn)]">
        {insight.summary}
      </h4>
      <p className="text-[13px] leading-5 text-[color:var(--mc-text-secondary)]">
        {insight.rationale}
      </p>
      <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-2">
        <div className="grid grid-cols-2 gap-x-6">
          {insight.estimatedImpact && (
            <div>
              <div className="mc-micro uppercase">Est. impact</div>
              <div className="text-[16px] font-semibold text-[color:var(--mc-positive)]">
                {insight.estimatedImpact.unit === "usd"
                  ? `+$${insight.estimatedImpact.delta.toLocaleString()}`
                  : insight.estimatedImpact.unit === "pct"
                  ? `+${insight.estimatedImpact.delta}% ${insight.estimatedImpact.metric}`
                  : `+${insight.estimatedImpact.delta} ${insight.estimatedImpact.metric}`}
              </div>
            </div>
          )}
          <div>
            <div className="mc-micro uppercase">Confidence</div>
            <div className="text-[16px] font-semibold capitalize text-[color:var(--mc-text-primary)]">
              {insight.confidence}
            </div>
          </div>
        </div>
        {insight.recommendedAction && (
          <Button
            variant={applied ? "secondary" : "primary"}
            size="sm"
            onClick={() => setApplied(true)}
            disabled={applied}
          >
            {applied ? (
              <>
                <Check className="h-3.5 w-3.5" /> Staged
              </>
            ) : (
              insight.recommendedAction.label
            )}
          </Button>
        )}
      </div>
    </Card>
  );
}
