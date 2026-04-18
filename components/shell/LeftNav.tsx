"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BarChart3,
  ClipboardList,
  Grid3x3,
  Home,
  Megaphone,
  Newspaper,
  Pencil,
  Users,
  Workflow,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Leaf = {
  label: string;
  href: string;
  badge?: string;
};

type TopItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  /** Sub-routes that still count as this leaf being active. */
  matches?: string[];
  children?: Leaf[];
};

const NAV: TopItem[] = [
  { label: "Home", icon: Home, href: "/home" },
  {
    label: "Campaigns",
    icon: Megaphone,
    children: [
      { label: "Email", href: "/email" },
      { label: "SMS", href: "/sms" },
      { label: "WhatsApp", href: "/whatsapp/dashboard", badge: "New" },
      { label: "Transactional", href: "/transactional" },
      { label: "Templates", href: "/templates" },
    ],
  },
  { label: "Automations", icon: Workflow, href: "/automations" },
  { label: "Forms", icon: ClipboardList, href: "/forms" },
  { label: "Audience", icon: Users, href: "/audience" },
  { label: "Analytics", icon: BarChart3, href: "/analytics" },
  { label: "Content", icon: Newspaper, href: "/content" },
  { label: "Integrations", icon: Grid3x3, href: "/integrations" },
];

/** A leaf is active if pathname starts with its href (so `/whatsapp/*` all highlights "WhatsApp"). */
function isLeafActive(pathname: string | null, leaf: Leaf) {
  if (!pathname) return false;
  if (leaf.label === "WhatsApp") return pathname.startsWith("/whatsapp");
  return pathname === leaf.href;
}

function groupHasActiveChild(pathname: string | null, item: TopItem) {
  if (!item.children || !pathname) return false;
  return item.children.some((c) => isLeafActive(pathname, c));
}

export function LeftNav() {
  const pathname = usePathname();
  const campaignsAuto = groupHasActiveChild(pathname, NAV[1]);
  const [campaignsOpen, setCampaignsOpen] = useState(campaignsAuto);
  const [prevAuto, setPrevAuto] = useState(campaignsAuto);

  // Adjust state during render when the route's "auto-open" signal changes.
  // This is React's recommended pattern (see https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes).
  if (campaignsAuto !== prevAuto) {
    setPrevAuto(campaignsAuto);
    if (campaignsAuto) setCampaignsOpen(true);
  }

  return (
    <nav
      aria-label="Primary"
      className="sticky top-14 hidden h-[calc(100vh-60px)] w-[220px] shrink-0 border-r border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] px-3 py-4 md:block"
    >
      <button
        type="button"
        className="mb-4 flex h-9 w-full items-center justify-center gap-2 rounded-md border border-[color:var(--mc-border-strong)] bg-[color:var(--mc-surface)] text-[13px] font-medium text-[color:var(--mc-text-primary)] hover:bg-[color:var(--mc-subtle)]"
      >
        <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
        Create
      </button>

      <ul className="flex flex-col gap-0.5">
        {NAV.map((item) => {
          if (item.children) {
            return (
              <CampaignsGroup
                key={item.label}
                item={item}
                pathname={pathname}
                open={campaignsOpen || campaignsAuto}
                onToggle={() => setCampaignsOpen((o) => !o)}
              />
            );
          }
          return <TopLink key={item.label} item={item} pathname={pathname} />;
        })}
      </ul>
    </nav>
  );
}

function TopLink({ item, pathname }: { item: TopItem; pathname: string | null }) {
  const Icon = item.icon;
  const active =
    (item.href && pathname === item.href) ||
    (item.matches ?? []).some((m) => pathname?.startsWith(m));
  return (
    <li>
      <Link
        href={item.href ?? "#"}
        className={cn(
          "flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px] text-[color:var(--mc-text-primary)] hover:bg-[color:var(--mc-subtle)]",
          active && "bg-[color:var(--mc-subtle)] font-medium"
        )}
      >
        <Icon className="h-4 w-4 text-[color:var(--mc-text-secondary)]" aria-hidden="true" />
        {item.label}
      </Link>
    </li>
  );
}

function CampaignsGroup({
  item,
  pathname,
  open,
  onToggle,
}: {
  item: TopItem;
  pathname: string | null;
  open: boolean;
  onToggle: () => void;
}) {
  const Icon = item.icon;
  const hasActiveChild = groupHasActiveChild(pathname, item);
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={cn(
          "flex h-8 w-full items-center gap-2.5 rounded-md px-2 text-left text-[13px] text-[color:var(--mc-text-primary)] hover:bg-[color:var(--mc-subtle)]",
          hasActiveChild && !open && "font-medium"
        )}
      >
        <Icon className="h-4 w-4 text-[color:var(--mc-text-secondary)]" aria-hidden="true" />
        <span className="flex-1">{item.label}</span>
        {open ? (
          <ChevronDown className="h-3 w-3 text-[color:var(--mc-text-tertiary)]" />
        ) : (
          <ChevronRight className="h-3 w-3 text-[color:var(--mc-text-tertiary)]" />
        )}
      </button>
      {open && (
        <ul className="mt-0.5 flex flex-col gap-0.5">
          {item.children!.map((c) => (
            <SubLink key={c.label} leaf={c} pathname={pathname} />
          ))}
        </ul>
      )}
    </li>
  );
}

function SubLink({ leaf, pathname }: { leaf: Leaf; pathname: string | null }) {
  const active = isLeafActive(pathname, leaf);
  return (
    <li>
      <Link
        href={leaf.href}
        className={cn(
          "ml-6 flex h-8 items-center gap-2 rounded-md px-2 text-[13px] text-[color:var(--mc-text-primary)] hover:bg-[color:var(--mc-subtle)]",
          active && "bg-[color:var(--mc-subtle)] font-semibold"
        )}
      >
        <span className="flex-1 truncate">{leaf.label}</span>
        {leaf.badge && (
          <span className="inline-flex h-[18px] items-center rounded-full bg-[color:var(--mc-negative-bg)] px-2 text-[10px] font-semibold text-[color:var(--mc-negative)]">
            {leaf.badge}
          </span>
        )}
      </Link>
    </li>
  );
}
