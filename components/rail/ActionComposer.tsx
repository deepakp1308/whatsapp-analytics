"use client";
import { useState } from "react";
import type { Action } from "@/lib/types";
import { Toast } from "@/components/ui/Toast";
import {
  UserPlus,
  Copy,
  Repeat,
  Timer,
  FlaskConical,
  UserCog,
  Bookmark,
  Shuffle,
} from "lucide-react";

const ICONS = {
  "create-segment": UserPlus,
  "duplicate-journey": Copy,
  "swap-template": Repeat,
  "adjust-cadence": Timer,
  "launch-experiment": FlaskConical,
  "assign-human": UserCog,
  "save-watchlist": Bookmark,
  "shift-channel-mix": Shuffle,
} as const;

type Props = {
  actions: Action[];
  inline?: boolean;
};

export function ActionComposer({ actions, inline }: Props) {
  const [toast, setToast] = useState<string | null>(null);
  return (
    <>
      <div className={inline ? "flex flex-wrap gap-2" : "flex flex-col gap-2"}>
        {actions.map((a) => {
          const Icon = ICONS[a.kind];
          return (
            <button
              key={`${a.kind}-${a.label}`}
              type="button"
              onClick={() => setToast(`Staged: ${a.label}`)}
              className={
                inline
                  ? "inline-flex h-8 items-center gap-1.5 rounded-md border border-[color:var(--mc-border-strong)] bg-[color:var(--mc-surface)] px-3 text-[12px] font-medium text-[color:var(--mc-text-primary)] hover:border-[color:var(--mc-cta)] hover:text-[color:var(--mc-cta)]"
                  : "flex items-start gap-3 rounded-md border border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] px-3 py-2.5 text-left hover:border-[color:var(--mc-cta)]"
              }
            >
              <Icon
                className={
                  inline
                    ? "h-3.5 w-3.5 text-[color:var(--mc-cta)]"
                    : "h-4 w-4 shrink-0 text-[color:var(--mc-cta)]"
                }
              />
              {inline ? (
                a.label
              ) : (
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-medium text-[color:var(--mc-text-primary)]">
                    {a.label}
                  </span>
                  <span className="block text-[12px] text-[color:var(--mc-text-secondary)]">
                    {a.description}
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </>
  );
}
