import { KpiStrip } from "@/components/kpi/KpiStrip";
import { Card, CardHeader } from "@/components/cards/Card";
import { AdaptiveFunnel } from "@/components/cards/AdaptiveFunnel";
import { InsightCard } from "@/components/cards/InsightCard";
import { TrendChart } from "@/components/charts/TrendChart";
import { portfolioTrend, funnel, repliesTable } from "@/lib/mock/metrics";
import { insights } from "@/lib/mock/insights";
import { Button } from "@/components/ui/Button";
import { RankedTable } from "@/components/tables/RankedTable";
import { formatNumber } from "@/lib/utils";

export function TabOverview() {
  const repliesWin = insights.find((i) => i.id === "ins_read_rate_win")!;
  const flowIssue = insights.find((i) => i.id === "ins_step2_bottleneck")!;
  const seqRec = insights.find((i) => i.id === "ins_sequence_winner")!;

  return (
    <div className="space-y-5">
      <KpiStrip title="WhatsApp performance" />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Campaign ROI"
            subtitle="Return on investment — attributed revenue / delivered credits"
          />
          <div className="flex flex-wrap gap-x-10 gap-y-4 px-6">
            <Mini label="Clicks total" value="3,609" />
            <Mini label="Attributed revenue" value="$12,200" />
            <Mini label="ROI" value="3.3×" />
            <Mini label="Conversion rate" value="10.3%" />
          </div>
          <div className="mt-4 px-6 pb-6">
            <div className="mb-2 text-[11px] text-[color:var(--mc-text-secondary)]">
              Message type breakdown
            </div>
            <div className="flex h-6 w-full overflow-hidden rounded">
              <div
                className="h-full"
                style={{ width: "72%", backgroundColor: "#2B77CC" }}
                aria-label="Paid 72%"
              />
              <div
                className="h-full"
                style={{ width: "28%", backgroundColor: "#E2E9ED" }}
                aria-label="Free 28%"
              />
            </div>
            <div className="mt-2 flex items-center gap-4 text-[11px] text-[color:var(--mc-text-secondary)]">
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded bg-[#2B77CC]" /> Paid (2,890)
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded bg-[#E2E9ED]" /> Free (719)
              </span>
            </div>
          </div>
        </Card>

        <AdaptiveFunnel
          stages={funnel}
          title="Adaptive funnel"
          subtitle="Sent → Converted"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Replies"
            subtitle="How recipients are replying to this message"
          />
          <div className="flex flex-wrap gap-x-10 gap-y-4 px-6">
            <Mini label="Delivered" value="1,200" />
            <Mini label="Reply rate" value="65%" />
            <Mini label="Unique replies" value="957" />
            <Mini label="Median time to reply" value="4m 12sec" />
          </div>
          <div className="px-3 pb-3 pt-3">
            <RankedTable
              keyFn={(r) => r.description}
              rows={repliesTable}
              columns={[
                { id: "type", label: "Reply type", render: (r) => r.type },
                { id: "desc", label: "Description", render: (r) => r.description },
                { id: "count", label: "Sent", align: "right", render: (r) => formatNumber(r.count) },
                { id: "replies", label: "Replies", align: "right", render: (r) => formatNumber(r.replies) },
                {
                  id: "view",
                  label: "",
                  align: "right",
                  render: () => (
                    <Button variant="ghost" size="sm">
                      View →
                    </Button>
                  ),
                },
              ]}
            />
          </div>
        </Card>

        <Card>
          <CardHeader title="Performance trend" subtitle="Revenue vs conversions, last 30 days" />
          <div className="px-4 pb-4">
            <TrendChart
              height={260}
              series={[
                { id: "revenue", label: "Revenue", data: portfolioTrend.revenue, color: "#2B77CC" },
                { id: "conversions", label: "Conversions", data: portfolioTrend.conversions, color: "#00892E" },
              ]}
            />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <InsightCard insight={repliesWin} label="Biggest win" />
        <InsightCard insight={flowIssue} label="Biggest issue" />
        <InsightCard insight={seqRec} label="Best next action" />
      </div>

      <Card className="flex items-center gap-3 border-l-4 border-l-[color:var(--mc-warning)] bg-[color:var(--mc-warning-bg)]/50 p-4">
        <span className="text-lg">💡</span>
        <div className="mc-body flex-1">
          WhatsApp recipients responded to several recently offered customer satisfaction
          surveys. Consider sending them in another WhatsApp next month.
        </div>
        <Button variant="secondary" size="sm">
          Add to next wave
        </Button>
      </Card>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mc-small">{label}</div>
      <div className="mc-metric">{value}</div>
    </div>
  );
}
