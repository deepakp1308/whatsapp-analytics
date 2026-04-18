import type { KpiDef } from "@/lib/types";
import { formatKpi } from "@/lib/semantic";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { SeverityBadge } from "@/components/cards/SeverityBadge";

type Props = {
  kpi: KpiDef;
  showIcon?: boolean;
  className?: string;
};

export function KpiCard({ kpi, showIcon = true, className }: Props) {
  const delta = kpi.deltaVsBenchmark;
  const hasDelta = typeof delta === "number";
  const isPositive = hasDelta && delta! >= 0;
  const DeltaIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className={cn("min-w-0 flex-1", className)}>
      <div className="mb-1 flex items-center gap-1.5">
        {showIcon && (
          <span className="grid h-4 w-4 place-items-center rounded-full bg-[color:var(--mc-whatsapp)]">
            <MessageCircle className="h-2.5 w-2.5 text-white" aria-hidden="true" />
          </span>
        )}
        <span className="mc-small">{kpi.label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <div className="mc-metric">{formatKpi(kpi)}</div>
        {kpi.severity && kpi.severity !== "healthy" && (
          <SeverityBadge severity={kpi.severity} size="sm" />
        )}
      </div>
      {hasDelta && (
        <div
          className={cn(
            "mt-1 inline-flex items-center gap-0.5 text-[11px]",
            isPositive
              ? "text-[color:var(--mc-positive)]"
              : "text-[color:var(--mc-negative)]"
          )}
        >
          <DeltaIcon className="h-3 w-3" />
          {Math.abs(delta!).toFixed(1)}% vs benchmark
        </div>
      )}
    </div>
  );
}
