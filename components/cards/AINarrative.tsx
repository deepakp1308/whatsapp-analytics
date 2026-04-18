import { Card } from "./Card";
import { Sparkles } from "lucide-react";

type Props = {
  narrative: string;
  chips?: string[];
};

export function AINarrative({ narrative, chips }: Props) {
  return (
    <Card className="flex items-start gap-3 border-l-4 border-l-[color:var(--mc-opportunity)] bg-[color:var(--mc-opportunity-bg)]/40 p-4">
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[color:var(--mc-opportunity-bg)]">
        <Sparkles className="h-3.5 w-3.5 text-[color:var(--mc-opportunity)]" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] leading-[20px] text-[color:var(--mc-text-peppercorn)]">
          <span className="text-[11px] font-medium uppercase tracking-wide text-[color:var(--mc-opportunity)]">
            AI summary ·{" "}
          </span>
          {narrative}
        </p>
        {chips && chips.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {chips.map((c) => (
              <span
                key={c}
                className="rounded-full bg-[color:var(--mc-surface)] px-2.5 py-1 text-[11px] font-medium text-[color:var(--mc-text-secondary)] ring-1 ring-[color:var(--mc-border)]"
              >
                {c}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
