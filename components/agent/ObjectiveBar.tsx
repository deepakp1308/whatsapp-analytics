import { Card } from "@/components/cards/Card";
import { Target, Calendar, Sparkles } from "lucide-react";

type Props = {
  objective: string;
  campaign: string;
  dateRange: string;
};

export function ObjectiveBar({ objective, campaign, dateRange }: Props) {
  return (
    <Card className="flex flex-wrap items-center gap-4 border-l-4 border-l-[color:var(--mc-opportunity)] p-4">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[color:var(--mc-opportunity-bg)]">
        <Target className="h-4 w-4 text-[color:var(--mc-opportunity)]" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="mc-micro uppercase">Your objective</div>
        <div className="text-[14px] font-medium leading-5 text-[color:var(--mc-text-peppercorn)]">
          {objective}
        </div>
      </div>
      <div className="flex items-center gap-3 text-[12px] text-[color:var(--mc-text-secondary)]">
        <span className="inline-flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5" />
          {campaign}
        </span>
        <span className="inline-flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {dateRange}
        </span>
      </div>
    </Card>
  );
}
