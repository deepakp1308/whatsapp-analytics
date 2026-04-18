import Link from "next/link";
import { currentCampaignId } from "@/lib/mock/campaigns";
import { LayoutPreview, type PreviewVariant } from "@/components/gallery/LayoutPreview";
import {
  ArrowRight,
  BarChart3,
  Columns3,
  LayoutDashboard,
  LayoutList,
  PanelRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { AgentLogo } from "@/components/agent/AgentLogo";

type Prototype = {
  num: string;
  title: string;
  tagline: string;
  href: string;
  preview: PreviewVariant;
  Icon: LucideIcon;
  features: string[];
  tone: "classic" | "smart" | "agent";
};

const C = currentCampaignId;

const PROTOTYPES: Prototype[] = [
  {
    num: "01",
    title: "Classic Dashboard",
    tagline:
      "Traditional analytics product — portfolio view, campaign report, 10 tabs, charts, tables, and drill-downs.",
    href: `/whatsapp/report/${C}`,
    preview: "classic",
    Icon: LayoutDashboard,
    tone: "classic",
    features: [
      "6-KPI strip with Business / Engagement / Conversation / Cost lens switcher",
      "Adaptive funnel · Portfolio trend · Segment matrix",
      "10 tabs: Overview, Recipients, Campaign performance, Delivery, Interaction, Flows, Revenue, Audience, Cross channel, Recommendations",
      "Familiar to marketers · Best for export and exec reviews",
    ],
  },
  {
    num: "02",
    title: "Smart Embedded Dashboard",
    tagline:
      "Classic hero + KPIs + funnel, but the 8 diagnostic tabs collapse into 7 AI sparkle-chip groups with right-rail drill-downs.",
    href: `/whatsapp/report/${C}/insights`,
    preview: "smart",
    Icon: Sparkles,
    tone: "smart",
    features: [
      "AI narrative strip summarizing the campaign in one line",
      "7 chip groups spanning reach, engagement, conversation, flows, revenue, cross-channel, recommendations",
      "Right rail opens on chip click with summary → evidence → follow-ups → staged action",
      "Cleaner above-the-fold than Classic · Same metric coverage",
    ],
  },
  {
    num: "03",
    title: "Agentic Mode — Pattern 1",
    tagline: "Streamlined. Three calm surfaces stacked: compact hero, conversation, tabbed chip explorer.",
    href: `/whatsapp/report/${C}/agent`,
    preview: "agent-streamlined",
    Icon: LayoutList,
    tone: "agent",
    features: [
      "Combined hero with objective, 1-line narrative, 4 mini KPIs, compact funnel",
      "Scripted 5-turn agent introduction mapped to jobs-to-be-done",
      "Tabbed chip explorer with Recommended + 7 categories",
      "Answered-state tracking (green checks) across the conversation",
    ],
  },
  {
    num: "04",
    title: "Agentic Mode — Pattern 2",
    tagline: "Cockpit. 3-column IDE-style layout with everything above the fold at 1440×900.",
    href: `/whatsapp/report/${C}/agent/cockpit`,
    preview: "agent-cockpit",
    Icon: Columns3,
    tone: "agent",
    features: [
      "Left rail: objective + 4 stacked KPIs + vertical funnel",
      "Center: conversation fills full vertical height",
      "Right rail: vertical category picker with per-category answered counters",
      "Zero scroll · Trading-desk density · Best for analysts",
    ],
  },
  {
    num: "05",
    title: "Agentic Mode — Pattern 3",
    tagline: "Split. Slim hero strip + wide conversation + pinnable side pane (Chips / Evidence / Actions).",
    href: `/whatsapp/report/${C}/agent/split`,
    preview: "agent-split",
    Icon: PanelRight,
    tone: "agent",
    features: [
      "Hero strip: objective + inline KPIs + funnel sparkline in one row",
      "Conversation takes full remaining height with proper evidence-card width",
      "Side pane switches between Chips, Evidence (latest answer), and Actions (staged / applied)",
      "Pane is pinnable / collapsible · Best for cross-functional review",
    ],
  },
];

const TONE_ACCENT: Record<Prototype["tone"], string> = {
  classic: "var(--mc-link)",
  smart: "var(--mc-opportunity)",
  agent: "var(--mc-positive)",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-16 pt-8">
      {/* Hero */}
      <header className="mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] px-3 py-1 text-[11px] font-medium text-[color:var(--mc-text-secondary)]">
          <BarChart3 className="h-3 w-3 text-[color:var(--mc-link)]" />
          Prototype gallery
        </div>
        <h1 className="mc-h-hero max-w-[800px]">
          WhatsApp Reporting &amp; Analytics — five prototypes for Mailchimp
        </h1>
        <p className="mt-3 max-w-[720px] text-[15px] leading-[22px] text-[color:var(--mc-text-secondary)]">
          Three UX patterns for the WhatsApp report — Classic dashboard, Smart embedded
          dashboard, and Agentic mode — plus three layout variants of the agent. All five
          share one design system captured from Figma, one mock dataset, and one Insight
          registry. Pick any card below to open that prototype on the same Welcome-message
          campaign.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Tag label="Mailchimp tokens" />
          <Tag label="Next.js · TypeScript · Tailwind v4" />
          <Tag label="Static export · GitHub Pages" />
          <a
            href="https://github.com/deepakp1308/whatsapp-analytics"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-6 items-center gap-1 rounded-full border border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] px-2.5 text-[11px] font-medium text-[color:var(--mc-link)] hover:underline"
          >
            View repo →
          </a>
        </div>
      </header>

      {/* Prototype grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {PROTOTYPES.map((p) => (
          <PrototypeCard key={p.num} prototype={p} />
        ))}
        <InfoCard />
      </div>

      <footer className="mt-12 border-t border-[color:var(--mc-border)] pt-6 text-[12px] text-[color:var(--mc-text-tertiary)]">
        Design tokens captured from the Figma file{" "}
        <code className="rounded bg-[color:var(--mc-subtle)] px-1 py-0.5 text-[11px] font-mono">
          WhatsApp (Analytics)
        </code>{" "}
        via the Figma REST API on 2026-04-18. See{" "}
        <a
          href="https://github.com/deepakp1308/whatsapp-analytics/blob/main/docs/design-spec.md"
          target="_blank"
          rel="noreferrer"
          className="text-[color:var(--mc-link)] hover:underline"
        >
          docs/design-spec.md
        </a>{" "}
        for tokens, component inventory, insight schema, and API contracts.
      </footer>
    </div>
  );
}

function PrototypeCard({ prototype: p }: { prototype: Prototype }) {
  const Icon = p.Icon;
  const accent = TONE_ACCENT[p.tone];
  return (
    <Link
      href={p.href}
      className="group flex flex-col overflow-hidden rounded-[12px] border border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] transition-shadow hover:shadow-[var(--mc-shadow-lg)] focus-visible:outline-2 focus-visible:outline-[color:var(--mc-link)]"
      style={{ borderTop: `3px solid ${accent}` }}
    >
      {/* Preview */}
      <div className="aspect-[16/9] border-b border-[color:var(--mc-border)] bg-[color:var(--mc-subtle)] p-4">
        <LayoutPreview variant={p.preview} />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div
              className="mb-1.5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide"
              style={{ color: accent }}
            >
              <Icon className="h-3 w-3" />
              Prototype {p.num}
            </div>
            <h3 className="text-[17px] font-semibold leading-6 text-[color:var(--mc-text-peppercorn)]">
              {p.title}
            </h3>
          </div>
          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[color:var(--mc-text-tertiary)] transition-transform group-hover:translate-x-0.5 group-hover:text-[color:var(--mc-text-primary)]" />
        </div>
        <p className="text-[13px] leading-[19px] text-[color:var(--mc-text-secondary)]">
          {p.tagline}
        </p>
        <ul className="mt-auto flex flex-col gap-1 border-t border-[color:var(--mc-border)] pt-3 text-[12px] leading-[17px] text-[color:var(--mc-text-primary)]">
          {p.features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span
                className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                style={{ backgroundColor: accent }}
              />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <span
          className="mt-1 inline-flex items-center gap-1 text-[12px] font-medium"
          style={{ color: accent }}
        >
          Open prototype
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex h-6 items-center rounded-full border border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] px-2.5 text-[11px] font-medium text-[color:var(--mc-text-secondary)]">
      {label}
    </span>
  );
}

function InfoCard() {
  return (
    <div className="flex flex-col gap-4 rounded-[12px] border border-dashed border-[color:var(--mc-border-strong)] bg-[color:var(--mc-subtle)] p-6">
      <div className="flex items-center gap-2">
        <AgentLogo size={28} />
        <h3 className="text-[15px] font-semibold text-[color:var(--mc-text-peppercorn)]">
          How the five prototypes relate
        </h3>
      </div>
      <ol className="flex flex-col gap-2 text-[12px] leading-[17px] text-[color:var(--mc-text-primary)]">
        <li>
          <strong>01 · Classic</strong> — the backbone. Everything lives in tabs,
          dashboards, and tables. Marketers already know this shape.
        </li>
        <li>
          <strong>02 · Smart</strong> — the same hero, same metrics, but the tabs
          become AI chips. Best near-term differentiation for Mailchimp.
        </li>
        <li>
          <strong>03–05 · Agent</strong> — the long bet. The agent is the interface.
          Three layouts show different density / density trade-offs — Streamlined is
          stacked, Cockpit is 3-column, Split is hero + pinnable pane.
        </li>
      </ol>
      <div className="mt-auto border-t border-[color:var(--mc-border)] pt-4">
        <div className="mc-micro mb-1 uppercase">Recommendation</div>
        <p className="text-[12px] text-[color:var(--mc-text-primary)]">
          Ship <strong>01</strong> first. Layer <strong>02</strong> as the premium
          experience. Evolve into <strong>03–05</strong> once the insight engine,
          ranking, and action services are mature.
        </p>
      </div>
    </div>
  );
}
