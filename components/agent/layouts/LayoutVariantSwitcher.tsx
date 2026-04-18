"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LayoutList, Columns3, PanelRight } from "lucide-react";

export type AgentLayoutId = "streamlined" | "cockpit" | "split";

type Props = {
  campaignId: string;
  current: AgentLayoutId;
};

const VARIANTS: { id: AgentLayoutId; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "streamlined", label: "Streamlined", Icon: LayoutList },
  { id: "cockpit", label: "Cockpit", Icon: Columns3 },
  { id: "split", label: "Split", Icon: PanelRight },
];

function hrefFor(id: AgentLayoutId, campaignId: string) {
  const base = `/whatsapp/report/${campaignId}/agent`;
  return id === "streamlined" ? base : `${base}/${id}`;
}

export function LayoutVariantSwitcher({ campaignId, current }: Props) {
  return (
    <div
      role="group"
      aria-label="Agent layout variant"
      className="inline-flex rounded-full border border-[color:var(--mc-border)] bg-[color:var(--mc-subtle)] p-0.5"
    >
      {VARIANTS.map(({ id, label, Icon }) => {
        const active = id === current;
        return (
          <Link
            key={id}
            href={hrefFor(id, campaignId)}
            className={cn(
              "inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[11px] font-medium",
              active
                ? "bg-[color:var(--mc-surface)] text-[color:var(--mc-text-peppercorn)] shadow-[var(--mc-shadow-sm)]"
                : "text-[color:var(--mc-text-secondary)] hover:text-[color:var(--mc-text-primary)]"
            )}
            aria-pressed={active}
            title={`Layout: ${label}`}
          >
            <Icon className="h-3 w-3" aria-hidden="true" />
            {label}
          </Link>
        );
      })}
    </div>
  );
}
