import { Card, CardHeader } from "@/components/cards/Card";
import { BarChart } from "@/components/charts/BarChart";
import { TrendChart } from "@/components/charts/TrendChart";
import { RankedTable } from "@/components/tables/RankedTable";
import { SeverityBadge } from "@/components/cards/SeverityBadge";
import { failureReasons, readLatencyTrend } from "@/lib/mock/metrics";
import { geos } from "@/lib/mock/catalog";

export function TabDelivery() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Failure reasons" subtitle="Why messages failed to deliver" />
          <div className="px-4 pb-4">
            <BarChart
              data={failureReasons.map((f) => ({ reason: f.reason, count: f.count }))}
              xKey="reason"
              bars={[{ id: "count", label: "Failures" }]}
              height={240}
              horizontal
            />
          </div>
        </Card>

        <Card>
          <CardHeader title="Read latency trend" subtitle="Median seconds from delivery to read" />
          <div className="px-4 pb-4">
            <TrendChart
              height={240}
              series={[{ id: "latency", label: "Median seconds", data: readLatencyTrend }]}
            />
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Geo performance" subtitle="Delivery, read, reply by country" />
        <div className="px-3 pb-3">
          <RankedTable
            keyFn={(g) => g.code}
            rows={geos}
            columns={[
              {
                id: "country",
                label: "Country",
                render: (g) => (
                  <span>
                    <span className="mr-2">{g.flag}</span>
                    {g.name}
                  </span>
                ),
              },
              { id: "deliv", label: "Delivered", align: "right", render: (g) => g.delivered },
              {
                id: "dr",
                label: "Delivery",
                align: "right",
                render: (g) => (
                  <span className="inline-flex items-center gap-2">
                    {g.deliveryRate}%
                    {g.deliveryRate < 85 && <SeverityBadge severity="opportunity" size="sm" />}
                  </span>
                ),
              },
              { id: "rr", label: "Read", align: "right", render: (g) => `${g.readRate}%` },
              { id: "repl", label: "Reply", align: "right", render: (g) => `${g.replyRate}%` },
              { id: "comp", label: "Flow complete", align: "right", render: (g) => `${g.completionRate}%` },
            ]}
          />
        </div>
      </Card>

      <Card className="flex items-center gap-4 p-5">
        <SeverityBadge severity="watch" label="Quality watch" />
        <p className="mc-body flex-1">
          Phone-number quality rating fell from 96 → 92 over 3 days. If the trend continues, messaging-limit tier drops and cost per delivered rises ~20%.
        </p>
      </Card>
    </div>
  );
}
