"use client";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function SparkleChip({
  label,
  onClick,
  active,
}: {
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-[12px] font-medium transition-colors",
        active
          ? "border-[color:var(--mc-opportunity)] bg-[color:var(--mc-opportunity-bg)] text-[color:var(--mc-opportunity)]"
          : "border-[color:var(--mc-border-strong)] bg-[color:var(--mc-surface)] text-[color:var(--mc-text-primary)] hover:border-[color:var(--mc-opportunity)] hover:bg-[color:var(--mc-opportunity-bg)]/50"
      )}
    >
      <Sparkles className="h-3 w-3 text-[color:var(--mc-opportunity)]" aria-hidden="true" />
      {label}
    </button>
  );
}
