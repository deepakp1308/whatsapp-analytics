"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sparkles, Bot, LayoutDashboard } from "lucide-react";

type Props = { campaignId: string };

export function PlanSwitcher({ campaignId }: Props) {
  const pathname = usePathname() ?? "";
  const base = `/whatsapp/report/${campaignId}`;
  const items = [
    { id: "classic", label: "Classic", href: base, Icon: LayoutDashboard, active: pathname === base },
    {
      id: "smart",
      label: "Smart",
      href: `${base}/insights`,
      Icon: Sparkles,
      active: pathname.startsWith(`${base}/insights`),
    },
    {
      id: "agent",
      label: "Agent",
      href: `${base}/agent`,
      Icon: Bot,
      active: pathname.startsWith(`${base}/agent`),
    },
  ];

  return (
    <div
      role="group"
      aria-label="View mode"
      className="inline-flex rounded-full border border-[color:var(--mc-border-strong)] bg-[color:var(--mc-surface)] p-0.5 shadow-[var(--mc-shadow-sm)]"
    >
      {items.map(({ id, label, href, Icon, active }) => (
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
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          {label}
        </Link>
      ))}
    </div>
  );
}
