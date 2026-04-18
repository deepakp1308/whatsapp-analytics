"use client";
import { useState } from "react";
import { KpiStrip } from "@/components/kpi/KpiStrip";
import { Card, CardHeader } from "@/components/cards/Card";
import { AdaptiveFunnel } from "@/components/cards/AdaptiveFunnel";
import { TrendChart } from "@/components/charts/TrendChart";
import { AINarrative } from "@/components/cards/AINarrative";
import { ChipGroup } from "@/components/chips/ChipGroup";
import { RightRail } from "@/components/rail/RightRail";
import { insights } from "@/lib/mock/insights";
import { funnel, portfolioTrend } from "@/lib/mock/metrics";
import { InsightCard } from "@/components/cards/InsightCard";
import type { Insight } from "@/lib/types";
import { mcChart } from "@/lib/tokens";

const CHIP_GROUPS: {
  title: string;
  group: Insight["group"];
}[] = [
  { title: "Reach & quality", group: "reach-quality" },
  { title: "Engagement", group: "engagement" },
  { title: "Conversation", group: "conversation" },
  { title: "Flow completion", group: "flow-completion" },
  { title: "Revenue", group: "revenue" },
  { title: "Cross channel", group: "cross-channel" },
  { title: "Recommendations", group: "recommendations" },
];

export function SmartInsightsView({ campaignId }: { campaignId: string }) {
  void campaignId;
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = insights.find((i) => i.id === activeId) ?? null;
  const topRec = insights.find((i) => i.id === "ins_best_next_action")!;
  const win = insights.find((i) => i.id === "ins_biggest_win")!;
  const issue = insights.find((i) => i.id === "ins_biggest_issue")!;

  return (
    <div className="mt-6 space-y-5">
      <AINarrative
        narrative="This campaign drove strong read and reply in the UK, but Flow Step 2 caused a 31% completion drop among new customers in India. Best next action: tighten email→WhatsApp gap to 6h and shorten Step 2."
        chips={["Revenue +30% vs plan", "Reply rate −19% vs peer", "Quality drifting"]}
      />

      <KpiStrip title="WhatsApp performance" />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Performance trend"
            subtitle="Revenue and conversions — last 30 days"
          />
          <div className="px-4 pb-4">
            <TrendChart
              height={240}
              series={[
                { id: "revenue", label: "Revenue", data: portfolioTrend.revenue, color: mcChart.primary },
                { id: "conversions", label: "Conversions", data: portfolioTrend.conversions, color: mcChart.secondary },
              ]}
            />
          </div>
        </Card>
        <AdaptiveFunnel stages={funnel} title="Adaptive funnel" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <InsightCard insight={win} label="Biggest win" />
        <InsightCard insight={issue} label="Biggest issue" />
        <InsightCard insight={topRec} label="Best next action" />
      </div>

      <Card className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="mc-h-section">Smart follow-ups</h3>
            <p className="mc-small mt-1">
              Pick any question. We&apos;ll answer with evidence and a recommended action in the side rail.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {CHIP_GROUPS.map(({ title, group }) => {
            const groupInsights = insights.filter((i) => i.group === group);
            // Flatten followups into chips, each owning the insight's id
            const chips = groupInsights.flatMap((ins) =>
              (ins.followUps.length ? ins.followUps : [ins.summary]).map((label, idx) => ({
                id: `${ins.id}__${idx}`,
                label,
                parent: ins.id,
              }))
            );
            return (
              <ChipGroup
                key={group}
                title={title}
                chips={chips}
                activeId={chips.find((c) => c.parent === activeId)?.id}
                onSelect={(chipId) => {
                  const parent = chips.find((c) => c.id === chipId)?.parent;
                  if (parent) setActiveId(parent);
                }}
              />
            );
          })}
        </div>
      </Card>

      <RightRail
        insight={active}
        onClose={() => setActiveId(null)}
        onFollowUp={(f) => {
          // Map the follow-up prompt to an insight id — naïve matcher against summary/followUps.
          const next = insights.find((i) => i.followUps.includes(f)) ?? insights.find((i) => i.summary.toLowerCase().includes(f.toLowerCase()));
          if (next) setActiveId(next.id);
        }}
      />
    </div>
  );
}
