import type { FunnelStage } from "@/lib/types";
import { mcSeverity } from "@/lib/tokens";
import { formatNumber } from "@/lib/utils";
import { Card, CardHeader } from "./Card";

type Props = {
  stages: FunnelStage[];
  title?: string;
  subtitle?: string;
};

export function AdaptiveFunnel({ stages, title = "Adaptive funnel", subtitle }: Props) {
  const max = Math.max(...stages.map((s) => s.value));
  return (
    <Card>
      <CardHeader title={title} subtitle={subtitle} />
      <div className="flex flex-col gap-2 px-6 pb-5">
        {stages.map((s) => {
          const widthPct = Math.max(5, (s.value / max) * 100);
          const drop =
            s.previous !== undefined
              ? ((s.previous - s.value) / s.previous) * 100
              : undefined;
          const sev = s.severity ?? "healthy";
          const sevColor = mcSeverity[sev];
          return (
            <div key={s.id} className="group relative">
              <div className="flex items-center justify-between text-[12px]">
                <span className="font-medium text-[color:var(--mc-text-primary)]">
                  {s.label}
                </span>
                <span className="tabular-nums text-[color:var(--mc-text-secondary)]">
                  {formatNumber(s.value)}
                  {drop !== undefined && drop > 0 && (
                    <span
                      className="ml-2 inline-flex items-center gap-0.5"
                      style={{ color: sevColor.fg }}
                    >
                      −{drop.toFixed(0)}%
                    </span>
                  )}
                </span>
              </div>
              <div className="mt-1 h-6 w-full rounded-[4px] bg-[color:var(--mc-subtle)]">
                <div
                  className="h-6 rounded-[4px]"
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: sev === "healthy" ? "#2B77CC" : sevColor.fg,
                    opacity: sev === "healthy" ? 1 : 0.9,
                  }}
                  aria-label={`${s.label}: ${formatNumber(s.value)}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
