import type { Severity } from "@/lib/tokens";
import { mcSeverity } from "@/lib/tokens";
import { cn } from "@/lib/utils";

type Props = {
  severity: Severity;
  label?: string;
  size?: "sm" | "md";
  className?: string;
};

export function SeverityBadge({ severity, label, size = "sm", className }: Props) {
  const s = mcSeverity[severity];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        size === "sm" ? "h-5 px-2 text-[11px]" : "h-6 px-2.5 text-[12px]",
        className
      )}
      style={{ backgroundColor: s.bg, color: s.fg }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: s.fg }}
        aria-hidden="true"
      />
      {label ?? s.label}
    </span>
  );
}
