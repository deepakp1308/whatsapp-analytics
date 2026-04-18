import type { AgentTurn as AgentTurnType } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import { EvidencePanel } from "@/components/rail/EvidencePanel";
import { ActionComposer } from "@/components/rail/ActionComposer";
import { Card } from "@/components/cards/Card";
import { AgentLogo } from "./AgentLogo";

/** Minimal markdown-ish renderer: bolds **text** and preserves line breaks. */
function renderMarkdown(md: string) {
  const lines = md.split("\n");
  return lines.map((line, li) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={li} className={li > 0 ? "mt-2" : undefined}>
        {parts.map((p, i) =>
          p.startsWith("**") && p.endsWith("**") ? (
            <strong key={i} className="font-semibold text-[color:var(--mc-text-peppercorn)]">
              {p.slice(2, -2)}
            </strong>
          ) : (
            <span key={i}>{p}</span>
          )
        )}
      </p>
    );
  });
}

type Props = {
  turn: AgentTurnType;
  onFollowUp?: (prompt: string) => void;
};

export function AgentTurn({ turn, onFollowUp }: Props) {
  if (turn.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-[color:var(--mc-text-peppercorn)] px-4 py-2.5 text-[13px] text-white mc-fade-in">
          {turn.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 mc-fade-in">
      <AgentLogo size={32} />
      <div className="min-w-0 flex-1 space-y-3">
        <Card className="p-4">
          <div className="mb-2 flex items-center gap-2 text-[11px]">
            <span className="font-semibold uppercase tracking-wide text-[color:var(--mc-opportunity)]">
              Agent
            </span>
            {turn.job && (
              <span className="rounded-full bg-[color:var(--mc-subtle)] px-1.5 text-[10px] font-medium text-[color:var(--mc-text-tertiary)]">
                Job {turn.job}
              </span>
            )}
          </div>
          <div className="text-[14px] leading-[22px] text-[color:var(--mc-text-primary)]">
            {renderMarkdown(turn.content)}
          </div>
          {turn.evidence && turn.evidence.length > 0 && (
            <div className="mt-4">
              <EvidencePanel evidence={turn.evidence} />
            </div>
          )}
          {turn.actions && turn.actions.length > 0 && (
            <div className="mt-4">
              <ActionComposer actions={turn.actions} />
            </div>
          )}
        </Card>

        {turn.followUps && turn.followUps.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {turn.followUps.map((f) => (
              <button
                key={f}
                onClick={() => onFollowUp?.(f)}
                className="inline-flex items-center gap-1 rounded-full border border-[color:var(--mc-border-strong)] bg-[color:var(--mc-surface)] px-3 py-1.5 text-[12px] text-[color:var(--mc-text-primary)] hover:border-[color:var(--mc-opportunity)] hover:bg-[color:var(--mc-opportunity-bg)]/50"
              >
                {f}
                <ArrowRight className="h-3 w-3 text-[color:var(--mc-text-tertiary)]" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
