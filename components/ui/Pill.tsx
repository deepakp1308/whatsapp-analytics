import { cn } from "@/lib/utils";

type Tone = "positive" | "attention" | "warning" | "negative" | "opportunity" | "neutral";

const toneClass: Record<Tone, string> = {
  positive:
    "bg-[color:var(--mc-positive-bg)] text-[color:var(--mc-positive)]",
  attention:
    "bg-[color:var(--mc-attention-bg)] text-[color:var(--mc-attention)]",
  warning:
    "bg-[color:var(--mc-warning-bg)] text-[#8A6D00]",
  negative:
    "bg-[color:var(--mc-negative-bg)] text-[color:var(--mc-negative)]",
  opportunity:
    "bg-[color:var(--mc-opportunity-bg)] text-[color:var(--mc-opportunity)]",
  neutral:
    "bg-[color:var(--mc-subtle)] text-[color:var(--mc-text-secondary)]",
};

export function Pill({
  tone = "neutral",
  children,
  className,
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center gap-1 rounded px-1.5 text-[11px] font-medium",
        toneClass[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
