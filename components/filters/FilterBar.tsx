"use client";
import { useState } from "react";
import { ChevronDown, Calendar, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FilterDef = {
  id: string;
  label: string;
  value: string;
  options?: string[];
};

export type FilterState = Record<string, string>;

const DEFAULT_FILTERS: FilterDef[] = [
  { id: "date", label: "Date", value: "Last 30 days", options: ["Last 7 days", "Last 30 days", "Last 90 days", "Custom…"] },
  { id: "compare", label: "Compare", value: "Prior period", options: ["Prior period", "Prior year", "Campaign avg", "Peer cohort"] },
  { id: "campaign", label: "Campaign", value: "All campaigns", options: ["All campaigns", "Welcome message", "Abandoned cart", "Holiday sale"] },
  { id: "template", label: "Template", value: "All", options: ["All", "Welcome_loyalty", "Holiday_sale", "Order_confirmation"] },
  { id: "category", label: "Category", value: "All", options: ["All", "Marketing", "Utility", "Authentication"] },
  { id: "segment", label: "Segment", value: "All audiences", options: ["All audiences", "New customers", "Repeat customers", "High-value", "Lapsed"] },
  { id: "geo", label: "Geo", value: "Worldwide", options: ["Worldwide", "US", "UK", "IN", "BR", "AU"] },
  { id: "sequence", label: "Sequence", value: "Any", options: ["Any", "WhatsApp only", "Email → WhatsApp", "WhatsApp → SMS"] },
];

export function FilterBar({
  initial,
  sticky = true,
}: {
  initial?: Partial<FilterState>;
  sticky?: boolean;
}) {
  const [state, setState] = useState<FilterDef[]>(() =>
    DEFAULT_FILTERS.map((f) => ({ ...f, value: initial?.[f.id] ?? f.value }))
  );
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "z-20 -mx-6 mb-5 border-b border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] px-6 py-3",
        sticky && "sticky top-14"
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        {state.map((f, idx) => (
          <div key={f.id} className="relative">
            <button
              type="button"
              onClick={() => setOpenId(openId === f.id ? null : f.id)}
              className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[color:var(--mc-border-strong)] bg-[color:var(--mc-surface)] px-3 text-[12px] text-[color:var(--mc-text-primary)] hover:bg-[color:var(--mc-subtle)]"
              aria-haspopup="listbox"
              aria-expanded={openId === f.id}
            >
              {f.id === "date" && (
                <Calendar className="h-3.5 w-3.5 text-[color:var(--mc-text-tertiary)]" />
              )}
              <span className="text-[color:var(--mc-text-secondary)]">{f.label}:</span>
              <span className="font-medium">{f.value}</span>
              <ChevronDown className="h-3.5 w-3.5 text-[color:var(--mc-text-tertiary)]" />
            </button>
            {openId === f.id && f.options && (
              <ul
                role="listbox"
                className="absolute left-0 top-10 z-30 min-w-[180px] overflow-hidden rounded-md border border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] py-1 shadow-[var(--mc-shadow-lg)]"
              >
                {f.options.map((opt) => (
                  <li key={opt}>
                    <button
                      type="button"
                      onClick={() => {
                        const next = [...state];
                        next[idx] = { ...f, value: opt };
                        setState(next);
                        setOpenId(null);
                      }}
                      className={cn(
                        "flex w-full items-center px-3 py-1.5 text-[12px] text-left hover:bg-[color:var(--mc-subtle)]",
                        f.value === opt &&
                          "bg-[color:var(--mc-subtle)] font-medium text-[color:var(--mc-text-peppercorn)]"
                      )}
                      role="option"
                      aria-selected={f.value === opt}
                    >
                      {opt}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            More filters
          </Button>
          <Button variant="ghost" size="sm">
            Save view
          </Button>
        </div>
      </div>
    </div>
  );
}
