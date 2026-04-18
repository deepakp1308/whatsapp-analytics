import { Card, CardHeader } from "@/components/cards/Card";
import { TrendChart } from "@/components/charts/TrendChart";
import { BarChart } from "@/components/charts/BarChart";
import { RankedTable } from "@/components/tables/RankedTable";
import { campaignLeaderboard, portfolioTrend } from "@/lib/mock/metrics";
import { templates } from "@/lib/mock/catalog";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { mcChart } from "@/lib/tokens";

export function TabCampaignPerformance() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Trend vs peer cohort"
            subtitle="Revenue (solid) vs peer average (dashed)"
          />
          <div className="px-4 pb-4">
            <TrendChart
              height={260}
              series={[
                { id: "revenue", label: "This campaign", data: portfolioTrend.revenue, color: mcChart.primary },
                {
                  id: "peer",
                  label: "Peer cohort",
                  data: portfolioTrend.revenue.map((p) => ({ ...p, value: p.value * 0.82 })),
                  color: mcChart.comparison,
                },
              ]}
            />
          </div>
        </Card>

        <Card>
          <CardHeader title="Campaign leaderboard" subtitle="Top 5 by revenue" />
          <div className="px-3 pb-3">
            <RankedTable
              keyFn={(r) => r.name}
              rows={campaignLeaderboard.slice(0, 5)}
              dense
              columns={[
                { id: "name", label: "Campaign", render: (r) => r.name },
                { id: "rev", label: "Revenue", align: "right", render: (r) => formatCurrency(r.revenue) },
                { id: "conv", label: "Conv.", align: "right", render: (r) => r.conversions },
              ]}
            />
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Template leaderboard"
          subtitle="Read, reply, and revenue by template version"
        />
        <div className="px-3 pb-3">
          <RankedTable
            keyFn={(r) => r.id}
            rows={templates}
            columns={[
              { id: "name", label: "Template", render: (r) => <span className="font-medium">{r.name}</span> },
              { id: "cat", label: "Category", render: (r) => r.category },
              { id: "lang", label: "Language", render: (r) => r.language },
              { id: "sent", label: "Sent", align: "right", render: (r) => formatNumber(r.sent) },
              { id: "read", label: "Read rate", align: "right", render: (r) => `${r.readRate}%` },
              { id: "reply", label: "Reply rate", align: "right", render: (r) => `${r.replyRate}%` },
              { id: "rev", label: "Revenue", align: "right", render: (r) => formatCurrency(r.revenue) },
            ]}
          />
        </div>
      </Card>

      <Card>
        <CardHeader title="Campaign revenue by template" />
        <div className="px-4 pb-4">
          <BarChart
            data={templates.map((t) => ({ name: t.name, revenue: t.revenue }))}
            xKey="name"
            bars={[{ id: "revenue", label: "Revenue" }]}
            height={240}
          />
        </div>
      </Card>
    </div>
  );
}
