/**
 * Tiny CSS-only wireframe previews for each prototype card.
 * No external images — everything is divs styled with the design-system tokens.
 * Keeps the gallery fast, themable, and accurate to the actual layouts.
 */
export type PreviewVariant =
  | "classic"
  | "smart"
  | "agent-streamlined"
  | "agent-cockpit"
  | "agent-split";

const base =
  "relative h-full w-full overflow-hidden rounded-md border border-[color:var(--mc-border)] bg-[color:var(--mc-subtle)] p-2";

export function LayoutPreview({ variant }: { variant: PreviewVariant }) {
  switch (variant) {
    case "classic":
      return <Classic />;
    case "smart":
      return <Smart />;
    case "agent-streamlined":
      return <AgentStreamlined />;
    case "agent-cockpit":
      return <AgentCockpit />;
    case "agent-split":
      return <AgentSplit />;
  }
}

/** Bit: a rounded tinted block meant to stand in for a card or chart. */
function Bit({
  className = "",
  tone = "subtle",
}: {
  className?: string;
  tone?: "subtle" | "primary" | "accent" | "surface" | "success";
}) {
  const colors = {
    subtle: "bg-[color:var(--mc-border)]/70",
    primary: "bg-[color:var(--mc-link)]/70",
    accent: "bg-[color:var(--mc-opportunity)]/70",
    surface: "bg-[color:var(--mc-surface)] ring-1 ring-[color:var(--mc-border)]",
    success: "bg-[color:var(--mc-positive)]/70",
  }[tone];
  return <div className={`rounded-sm ${colors} ${className}`} />;
}

function Classic() {
  return (
    <div className={base}>
      {/* filter bar */}
      <div className="flex gap-0.5 pb-1">
        <Bit className="h-1.5 w-8" />
        <Bit className="h-1.5 w-6" />
        <Bit className="h-1.5 w-8" />
        <Bit className="h-1.5 w-5" />
      </div>
      {/* KPI strip */}
      <div className="mb-1 grid grid-cols-6 gap-0.5 rounded bg-[color:var(--mc-surface)] p-1 ring-1 ring-[color:var(--mc-border)]">
        {Array.from({ length: 6 }).map((_, i) => (
          <Bit key={i} className="h-3" tone="primary" />
        ))}
      </div>
      {/* trend + funnel */}
      <div className="mb-1 grid grid-cols-3 gap-1">
        <Bit className="col-span-2 h-12" tone="surface" />
        <Bit className="h-12" tone="surface" />
      </div>
      {/* tab underline row */}
      <div className="flex gap-1 border-b border-[color:var(--mc-border)] pb-0.5">
        <div className="h-0.5 w-5 rounded bg-[color:var(--mc-text-peppercorn)]" />
        <div className="h-0.5 w-5 rounded bg-[color:var(--mc-border)]" />
        <div className="h-0.5 w-5 rounded bg-[color:var(--mc-border)]" />
        <div className="h-0.5 w-5 rounded bg-[color:var(--mc-border)]" />
      </div>
      {/* table rows */}
      <div className="mt-1 space-y-0.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <Bit key={i} className="h-1.5" />
        ))}
      </div>
    </div>
  );
}

function Smart() {
  return (
    <div className={base}>
      {/* AI narrative strip */}
      <div className="mb-1 flex items-center gap-1 rounded bg-[color:var(--mc-opportunity-bg)] px-1 py-0.5 ring-1 ring-[color:var(--mc-opportunity)]/30">
        <div className="h-1.5 w-1.5 rounded-full bg-[color:var(--mc-opportunity)]" />
        <Bit className="h-1.5 flex-1" tone="accent" />
      </div>
      {/* KPIs */}
      <div className="mb-1 grid grid-cols-6 gap-0.5 rounded bg-[color:var(--mc-surface)] p-1 ring-1 ring-[color:var(--mc-border)]">
        {Array.from({ length: 6 }).map((_, i) => (
          <Bit key={i} className="h-2.5" tone="primary" />
        ))}
      </div>
      {/* trend + funnel */}
      <div className="mb-1 grid grid-cols-3 gap-1">
        <Bit className="col-span-2 h-10" tone="surface" />
        <Bit className="h-10" tone="surface" />
      </div>
      {/* chip groups */}
      <div className="grid grid-cols-2 gap-0.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-wrap gap-0.5 rounded-sm bg-[color:var(--mc-surface)] p-0.5 ring-1 ring-[color:var(--mc-border)]"
          >
            <div className="h-1.5 w-4 rounded-full bg-[color:var(--mc-opportunity)]/70" />
            <div className="h-1.5 w-6 rounded-full bg-[color:var(--mc-border)]" />
            <div className="h-1.5 w-4 rounded-full bg-[color:var(--mc-border)]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentStreamlined() {
  return (
    <div className={base}>
      {/* Hero: objective + 4 KPIs + compact funnel */}
      <div className="mb-1 rounded bg-[color:var(--mc-surface)] p-1 ring-1 ring-[color:var(--mc-border)]">
        <Bit className="mb-1 h-1.5 w-24" />
        <div className="mb-1 grid grid-cols-4 gap-0.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Bit key={i} className="h-3" tone="primary" />
          ))}
        </div>
        <div className="flex items-end gap-px">
          {[9, 8, 6, 5, 4, 3, 2, 1].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-[color:var(--mc-link)]/70"
              style={{ height: `${h * 1.5}px` }}
            />
          ))}
        </div>
      </div>
      {/* Conversation card */}
      <div className="mb-1 h-14 space-y-0.5 rounded bg-[color:var(--mc-surface)] p-1 ring-1 ring-[color:var(--mc-border)]">
        <div className="flex items-start gap-0.5">
          <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-[color:var(--mc-opportunity)]" />
          <Bit className="h-1.5 w-20" />
        </div>
        <Bit className="ml-2 h-1 w-24" />
        <Bit className="ml-auto h-1.5 w-12" tone="primary" />
        <Bit className="ml-2 h-1 w-28" />
      </div>
      {/* Tabbed chip explorer */}
      <div className="rounded bg-[color:var(--mc-surface)] p-1 ring-1 ring-[color:var(--mc-border)]">
        <div className="mb-0.5 flex gap-0.5 border-b border-[color:var(--mc-border)] pb-0.5">
          <div className="h-0.5 w-4 rounded bg-[color:var(--mc-text-peppercorn)]" />
          <div className="h-0.5 w-4 rounded bg-[color:var(--mc-border)]" />
          <div className="h-0.5 w-4 rounded bg-[color:var(--mc-border)]" />
          <div className="h-0.5 w-4 rounded bg-[color:var(--mc-border)]" />
        </div>
        <div className="flex flex-wrap gap-0.5">
          <div className="h-1.5 w-6 rounded-full bg-[color:var(--mc-opportunity)]/60" />
          <div className="h-1.5 w-8 rounded-full bg-[color:var(--mc-border)]" />
          <div className="h-1.5 w-5 rounded-full bg-[color:var(--mc-border)]" />
          <div className="h-1.5 w-7 rounded-full bg-[color:var(--mc-border)]" />
        </div>
      </div>
    </div>
  );
}

function AgentCockpit() {
  return (
    <div className={base}>
      {/* alert */}
      <Bit className="mb-1 h-1 w-full" tone="accent" />
      <div className="grid grid-cols-[32%_36%_32%] gap-1" style={{ height: "calc(100% - 8px)" }}>
        {/* context rail */}
        <div className="space-y-0.5 rounded bg-[color:var(--mc-surface)] p-1 ring-1 ring-[color:var(--mc-border)]">
          <Bit className="h-1 w-12" />
          <Bit className="h-0.5 w-16" />
          <div className="mt-1 space-y-0.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <Bit className="h-1 w-6" />
                <Bit className="h-1 w-4" tone="primary" />
              </div>
            ))}
          </div>
          <div className="mt-1 space-y-0.5">
            {[100, 85, 47, 31, 18, 16, 10, 5].map((w, i) => (
              <div key={i} className="h-0.5 rounded-sm bg-[color:var(--mc-link)]/70" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
        {/* conversation */}
        <div className="flex flex-col rounded bg-[color:var(--mc-surface)] p-1 ring-1 ring-[color:var(--mc-border)]">
          <div className="flex-1 space-y-0.5">
            <div className="flex items-start gap-0.5">
              <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-[color:var(--mc-opportunity)]" />
              <Bit className="h-1 w-full" />
            </div>
            <Bit className="ml-2 h-1 w-3/4" />
            <Bit className="ml-auto h-1 w-1/2" tone="primary" />
            <Bit className="ml-2 h-1 w-5/6" />
            <Bit className="ml-2 h-1 w-2/3" />
            <Bit className="ml-auto h-1 w-2/5" tone="primary" />
            <Bit className="ml-2 h-1 w-3/4" />
          </div>
          <Bit className="mt-1 h-1.5 w-full" />
        </div>
        {/* chip rail */}
        <div className="space-y-0.5 rounded bg-[color:var(--mc-surface)] p-1 ring-1 ring-[color:var(--mc-border)]">
          {/* category list */}
          <div className="space-y-0.5">
            <Bit className="h-1 w-full" tone="accent" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Bit key={i} className="h-1 w-full" />
            ))}
          </div>
          {/* chips */}
          <div className="mt-1 space-y-0.5 border-t border-[color:var(--mc-border)] pt-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-0.5 rounded-sm bg-[color:var(--mc-border)]/30 px-0.5 py-[1px]"
              >
                <div className="h-1 w-1 rounded-full bg-[color:var(--mc-opportunity)]" />
                <Bit className="h-0.5 flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentSplit() {
  return (
    <div className={base}>
      {/* hero strip */}
      <div className="mb-1 flex items-center gap-1 rounded bg-[color:var(--mc-surface)] p-1 ring-1 ring-[color:var(--mc-border)]">
        <Bit className="h-2 flex-1" />
        <div className="flex shrink-0 gap-0.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <Bit className="h-0.5 w-3 mb-px" />
              <Bit className="h-1 w-3" tone="primary" />
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-end gap-px border-l border-[color:var(--mc-border)] pl-1">
          {[9, 8, 6, 5, 4, 3, 2, 1].map((h, i) => (
            <div
              key={i}
              className="w-[2px] rounded-sm bg-[color:var(--mc-link)]/70"
              style={{ height: `${h * 1.2}px` }}
            />
          ))}
        </div>
      </div>
      {/* body: conversation + pane */}
      <div className="grid grid-cols-[1fr_38%] gap-1" style={{ height: "calc(100% - 20px)" }}>
        {/* conversation */}
        <div className="flex flex-col rounded bg-[color:var(--mc-surface)] p-1 ring-1 ring-[color:var(--mc-border)]">
          <div className="flex-1 space-y-0.5">
            <div className="flex items-start gap-0.5">
              <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-[color:var(--mc-opportunity)]" />
              <Bit className="h-1 w-full" />
            </div>
            <Bit className="ml-2 h-1 w-4/5" />
            <div className="ml-2 flex gap-0.5">
              <Bit className="h-3 flex-1" tone="subtle" />
              <Bit className="h-3 flex-1" tone="subtle" />
            </div>
            <Bit className="ml-auto h-1 w-2/5" tone="primary" />
            <Bit className="ml-2 h-1 w-3/4" />
          </div>
          <Bit className="mt-1 h-1.5 w-full" />
        </div>
        {/* side pane */}
        <div className="flex flex-col rounded bg-[color:var(--mc-surface)] p-1 ring-1 ring-[color:var(--mc-border)]">
          {/* segmented tabs */}
          <div className="mb-0.5 flex gap-0.5 rounded-full bg-[color:var(--mc-border)]/40 p-0.5">
            <div className="h-1 flex-1 rounded-full bg-[color:var(--mc-surface)]" />
            <div className="h-1 flex-1 rounded-full bg-transparent" />
            <div className="h-1 flex-1 rounded-full bg-transparent" />
          </div>
          {/* category chips row */}
          <div className="mb-0.5 flex flex-wrap gap-0.5">
            <div className="h-1 w-3 rounded-full bg-[color:var(--mc-text-peppercorn)]" />
            <div className="h-1 w-4 rounded-full bg-[color:var(--mc-border)]" />
            <div className="h-1 w-3 rounded-full bg-[color:var(--mc-border)]" />
            <div className="h-1 w-5 rounded-full bg-[color:var(--mc-border)]" />
          </div>
          {/* chips */}
          <div className="space-y-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-0.5 rounded-sm bg-[color:var(--mc-border)]/30 px-0.5 py-[1px]"
              >
                <div className="h-1 w-1 rounded-full bg-[color:var(--mc-opportunity)]" />
                <Bit className="h-0.5 flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
