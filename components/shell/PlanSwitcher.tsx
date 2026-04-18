"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sparkles, LayoutDashboard } from "lucide-react";
import { AgentLogo } from "@/components/agent/AgentLogo";

type Props = { campaignId: string };

type Item = {
  id: "classic" | "smart" | "agent";
  label: string;
  href: string;
  active: boolean;
  renderIcon: (active: boolean) => React.ReactNode;
};

export function PlanSwitcher({ campaignId }: Props) {
  const pathname = usePathname() ?? "";
  const base = `/whatsapp/report/${campaignId}`;
  const items: Item[] = [
    {
      id: "classic",
      label: "Classic",
      href: base,
      active: pathname === base,
      renderIcon: () => <LayoutDashboard className="h-3.5 w-3.5" aria-hidden="true" />,
    },
    {
      id: "smart",
      label: "Smart",
      href: `${base}/insights`,
      active: pathname.startsWith(`${base}/insights`),
      renderIcon: () => <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />,
    },
    {
      id: "agent",
      label: "Agent",
      href: `${base}/agent`,
      active: pathname.startsWith(`${base}/agent`),
      renderIcon: (active) => (
        // On the dark peppercorn pill we flip to a light disc; otherwise no disc at all.
        <span className="relative inline-flex h-4 w-4 items-center justify-center">
          <AgentLogo size={16} disc={active} />
        </span>
      ),
    },
  ];

  return (
    <div
      role="group"
      aria-label="View mode"
      className="inline-flex rounded-full border border-[color:var(--mc-border-strong)] bg-[color:var(--mc-surface)] p-0.5 shadow-[var(--mc-shadow-sm)]"
    >
      {items.map(({ id, label, href, active, renderIcon }) => (
        <Link
          key={id}
          href={href}
          className={cn(
            "inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-[12px] font-medium",
            active
              ? "bg-[color:var(--mc-text-peppercorn)] text-white"
              : "text-[color:var(--mc-text-secondary)] hover:text-[color:var(--mc-text-primary)]"
          )}
          aria-pressed={active}
        >
          {renderIcon(active)}
          {label}
        </Link>
      ))}
    </div>
  );
}
