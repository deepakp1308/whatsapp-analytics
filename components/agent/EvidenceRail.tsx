import { AdaptiveFunnel } from "@/components/cards/AdaptiveFunnel";
import { Card, CardHeader } from "@/components/cards/Card";
import { SeverityBadge } from "@/components/cards/SeverityBadge";
import { HealthScorecard } from "./HealthScorecard";
import { funnel } from "@/lib/mock/metrics";
import { insights } from "@/lib/mock/insights";
import { Bell, Bookmark } from "lucide-react";

export function EvidenceRail() {
  const watchlist = insights
    .filter((i) => i.severity === "watch" || i.severity === "opportunity" || i.severity === "action-needed")
    .slice(0, 4);

  return (
    <div className="flex flex-col gap-4">
      <HealthScorecard />

      <AdaptiveFunnel stages={funnel} title="Adaptive funnel" />

      <Card>
        <CardHeader
          title="Watchlist"
          subtitle="Anomalies the agent is monitoring"
          action={<Bell className="h-4 w-4 text-[color:var(--mc-text-tertiary)]" />}
        />
        <ul className="flex flex-col gap-2 px-5 pb-5">
          {watchlist.map((w) => (
            <li
              key={w.id}
              className="flex items-start gap-2 rounded-md border border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] p-2.5"
            >
              <SeverityBadge severity={w.severity} size="sm" />
              <p className="flex-1 text-[12px] leading-4 text-[color:var(--mc-text-primary)]">
                {w.summary}
              </p>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-5">
        <div className="flex items-center gap-2">
          <Bookmark className="h-4 w-4 text-[color:var(--mc-text-tertiary)]" />
          <h3 className="text-[13px] font-semibold text-[color:var(--mc-text-peppercorn)]">
            Saved segments
          </h3>
        </div>
        <ul className="mt-3 space-y-1.5 text-[12px] text-[color:var(--mc-text-primary)]">
          <li>High-intent repeat (IN)</li>
          <li>New customers — late Step 2</li>
          <li>Lapsed {">"}60d in UK/DE</li>
        </ul>
      </Card>
    </div>
  );
}
