"use client";
import { useState } from "react";
import { Settings } from "lucide-react";
import { kpisByLens } from "@/lib/mock/metrics";
import type { LensId } from "@/lib/types";
import { KpiCard } from "./KpiCard";
import { Card } from "@/components/cards/Card";
import { LensSwitcher } from "./LensSwitcher";

type Props = {
  title?: string;
  defaultLens?: LensId;
};

export function KpiStrip({ title = "WhatsApp performance", defaultLens = "business" }: Props) {
  const [lens, setLens] = useState<LensId>(defaultLens);
  const kpis = kpisByLens[lens];

  return (
    <Card className="px-6 pt-5 pb-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="text-[16px] font-semibold text-[color:var(--mc-text-peppercorn)]">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <LensSwitcher value={lens} onChange={setLens} />
          <button
            aria-label="Customize"
            className="grid h-7 w-7 place-items-center rounded-md text-[color:var(--mc-text-secondary)] hover:bg-[color:var(--mc-subtle)]"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-10 gap-y-5">
        {kpis.map((k) => (
          <KpiCard key={k.id} kpi={k} />
        ))}
      </div>
    </Card>
  );
}
