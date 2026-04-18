import { Card } from "@/components/cards/Card";
import { SeverityBadge } from "@/components/cards/SeverityBadge";

const items = [
  { label: "Revenue", value: "$12,000", severity: "healthy" as const },
  { label: "Conversions", value: "195", severity: "healthy" as const },
  { label: "Read", value: "55%", severity: "healthy" as const },
  { label: "Reply", value: "17.8%", severity: "opportunity" as const },
  { label: "Cost / conv.", value: "$6.15", severity: "action-needed" as const },
  { label: "Quality", value: "92", severity: "watch" as const },
];

export function HealthScorecard() {
  return (
    <Card className="px-5 py-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[13px] font-semibold text-[color:var(--mc-text-peppercorn)]">
          Health scorecard
        </h3>
        <span className="mc-micro">Live</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {items.map((i) => (
          <div
            key={i.label}
            className="rounded-md border border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] p-2.5"
          >
            <div className="mc-micro uppercase">{i.label}</div>
            <div className="mt-0.5 text-[16px] font-semibold tabular-nums text-[color:var(--mc-text-peppercorn)]">
              {i.value}
            </div>
            {i.severity !== "healthy" && (
              <div className="mt-1">
                <SeverityBadge severity={i.severity} size="sm" />
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
