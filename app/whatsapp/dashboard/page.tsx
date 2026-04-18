import Link from "next/link";
import { FilterBar } from "@/components/filters/FilterBar";
import { KpiStrip } from "@/components/kpi/KpiStrip";
import { TrendChart } from "@/components/charts/TrendChart";
import { Card, CardHeader } from "@/components/cards/Card";
import { AdaptiveFunnel } from "@/components/cards/AdaptiveFunnel";
import { InsightCard } from "@/components/cards/InsightCard";
import { portfolioTrend, funnel, campaignLeaderboard } from "@/lib/mock/metrics";
import { insights } from "@/lib/mock/insights";
import { campaigns } from "@/lib/mock/campaigns";
import { Button } from "@/components/ui/Button";
import { RankedTable } from "@/components/tables/RankedTable";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const win = insights.find((i) => i.id === "ins_biggest_win")!;
  const issue = insights.find((i) => i.id === "ins_biggest_issue")!;
  const best = insights.find((i) => i.id === "ins_best_next_action")!;

  return (
    <div className="px-6 pb-10 pt-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="mc-h-page">WhatsApp analytics</h1>
          <p className="mc-small mt-1">
            Portfolio view across all WhatsApp campaigns and journeys.
          </p>
        </div>
      </div>

      <FilterBar />

      <div className="space-y-5">
        <KpiStrip />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader
              title="Portfolio trend"
              subtitle="Revenue, conversions, read & reply rate — last 30 days"
              action={
                <div className="flex items-center gap-2 text-[11px] text-[color:var(--mc-text-secondary)]">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#2B77CC]" /> Revenue
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#00892E]" /> Conversions
                  </span>
                </div>
              }
            />
            <div className="px-4 pb-4">
              <TrendChart
                height={240}
                series={[
                  { id: "revenue", label: "Revenue", data: portfolioTrend.revenue, color: "#2B77CC" },
                  { id: "conversions", label: "Conversions", data: portfolioTrend.conversions, color: "#00892E" },
                ]}
              />
            </div>
          </Card>

          <AdaptiveFunnel
            stages={funnel}
            title="Adaptive funnel"
            subtitle="Sent → Converted, across the portfolio"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <InsightCard insight={win} label="Biggest win" />
          <InsightCard insight={issue} label="Biggest issue" />
          <InsightCard insight={best} label="Best next action" />
        </div>

        <Card>
          <CardHeader
            title="Campaign leaderboard"
            subtitle="Top campaigns in the current window"
            action={
              <Link href={`/whatsapp/report/${campaigns[0].id}`}>
                <Button variant="secondary" size="sm">
                  Open campaign report
                </Button>
              </Link>
            }
          />
          <div className="px-3 pb-3">
            <RankedTable
              keyFn={(r) => r.name}
              rows={campaignLeaderboard}
              columns={[
                { id: "name", label: "Campaign", render: (r) => <span className="font-medium">{r.name}</span>, sortable: true },
                { id: "revenue", label: "Revenue", align: "right", sortable: true, render: (r) => formatCurrency(r.revenue) },
                { id: "conversions", label: "Conversions", align: "right", sortable: true, render: (r) => r.conversions },
                { id: "read", label: "Read rate", align: "right", sortable: true, render: (r) => `${r.readRate}%` },
                { id: "reply", label: "Reply rate", align: "right", sortable: true, render: (r) => `${r.replyRate}%` },
                { id: "cpc", label: "Cost / conv.", align: "right", sortable: true, render: (r) => `$${r.cpc}` },
              ]}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
