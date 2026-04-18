import type { LensId } from "@/lib/types";
import { cn } from "@/lib/utils";

const LENSES: { id: LensId; label: string }[] = [
  { id: "business", label: "Business" },
  { id: "engagement", label: "Engagement" },
  { id: "conversation", label: "Conversation" },
  { id: "cost-quality", label: "Cost & quality" },
];

type Props = {
  value: LensId;
  onChange: (l: LensId) => void;
};

export function LensSwitcher({ value, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="KPI lens"
      className="inline-flex rounded-full border border-[color:var(--mc-border)] bg-[color:var(--mc-subtle)] p-0.5"
    >
      {LENSES.map((l) => {
        const active = value === l.id;
        return (
          <button
            key={l.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(l.id)}
            className={cn(
              "h-7 rounded-full px-3 text-[12px] font-medium",
              active
                ? "bg-[color:var(--mc-surface)] text-[color:var(--mc-text-peppercorn)] shadow-[var(--mc-shadow-sm)]"
                : "text-[color:var(--mc-text-secondary)] hover:text-[color:var(--mc-text-primary)]"
            )}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
