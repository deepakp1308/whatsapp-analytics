import type { Insight } from "@/lib/types";
import { Card } from "./Card";
import { SeverityBadge } from "./SeverityBadge";
import { Sparkles } from "lucide-react";

type Props = {
  insight: Insight;
  label?: string;
};

export function InsightCard({ insight, label }: Props) {
  return (
    <Card className="px-5 py-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[color:var(--mc-opportunity-bg)]">
            <Sparkles className="h-3 w-3 text-[color:var(--mc-opportunity)]" aria-hidden="true" />
          </span>
          <span className="text-[11px] font-medium uppercase tracking-wide text-[color:var(--mc-text-tertiary)]">
            {label ?? "Insight"}
          </span>
        </div>
        <SeverityBadge severity={insight.severity} />
      </div>
      <p className="text-[15px] leading-5 font-medium text-[color:var(--mc-text-peppercorn)]">
        {insight.summary}
      </p>
      <p className="mt-2 text-[12px] leading-[17px] text-[color:var(--mc-text-secondary)]">
        {insight.rationale}
      </p>
      {insight.recommendedAction && (
        <button
          type="button"
          className="mt-3 inline-flex h-7 items-center gap-1 text-[12px] font-medium text-[color:var(--mc-link)] hover:underline"
        >
          {insight.recommendedAction.label} →
        </button>
      )}
    </Card>
  );
}
