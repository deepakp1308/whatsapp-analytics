"use client";
import { cn } from "@/lib/utils";

type Props = {
  tabs: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
  size?: "sm" | "md";
  className?: string;
};

export function Tabs({ tabs, value, onChange, size = "md", className }: Props) {
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={cn(
        "flex flex-wrap items-center gap-5 border-b border-[color:var(--mc-border)]",
        className
      )}
    >
      {tabs.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(t.id)}
            className={cn(
              "relative pb-2.5 font-medium transition-colors",
              size === "sm" ? "text-[12px]" : "text-[13px]",
              active
                ? "text-[color:var(--mc-text-peppercorn)]"
                : "text-[color:var(--mc-text-secondary)] hover:text-[color:var(--mc-text-primary)]"
            )}
          >
            {t.label}
            {active && (
              <span className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-[color:var(--mc-text-peppercorn)]" />
            )}
          </button>
        );
      })}
    </div>
  );
}
