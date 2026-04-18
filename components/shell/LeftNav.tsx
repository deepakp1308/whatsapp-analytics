"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Megaphone,
  Zap,
  MessageSquare,
  FileText,
  Users,
  BarChart3,
  Layers,
  Grid3x3,
  Pencil,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Campaigns", href: "/campaigns", icon: Megaphone },
  { label: "Automations", href: "/automations", icon: Zap },
  { label: "SMS", href: "/sms", icon: MessageSquare },
  { label: "Forms", href: "/forms", icon: FileText },
  { label: "Audience", href: "/audience", icon: Users },
  { label: "Analytics", href: "/whatsapp/dashboard", icon: BarChart3 },
  { label: "Content", href: "/content", icon: Layers },
  { label: "Integrations", href: "/integrations", icon: Grid3x3 },
];

export function LeftNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary"
      className="sticky top-14 hidden h-[calc(100vh-56px)] w-[220px] shrink-0 border-r border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] px-3 py-4 md:block"
    >
      <button
        type="button"
        className="mb-4 flex h-9 w-full items-center justify-center gap-2 rounded-md border border-[color:var(--mc-border-strong)] bg-[color:var(--mc-surface)] text-[13px] font-medium text-[color:var(--mc-text-primary)] hover:bg-[color:var(--mc-subtle)]"
      >
        <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
        Create
      </button>
      <ul className="flex flex-col gap-0.5">
        {items.map((it) => {
          const Icon = it.icon;
          const active =
            it.href === "/whatsapp/dashboard"
              ? pathname?.startsWith("/whatsapp")
              : pathname === it.href;
          return (
            <li key={it.label}>
              <Link
                href={it.href}
                className={cn(
                  "flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px] text-[color:var(--mc-text-primary)] hover:bg-[color:var(--mc-subtle)]",
                  active && "bg-[color:var(--mc-subtle)] font-medium"
                )}
              >
                <Icon className="h-4 w-4 text-[color:var(--mc-text-secondary)]" aria-hidden="true" />
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
