import { Card, CardHeader } from "@/components/cards/Card";
import { TrendChart } from "@/components/charts/TrendChart";
import { BarChart } from "@/components/charts/BarChart";
import { RankedTable } from "@/components/tables/RankedTable";
import { portfolioTrend, revenueSplit, revenueBySegment } from "@/lib/mock/metrics";
import { formatCurrency } from "@/lib/utils";

export function TabRevenue() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader title="Revenue trend" subtitle="Attributed revenue, last 30 days" />
            <div className="px-4 pb-4">
              <TrendChart
                height={240}
                series={[
                  {
                    id: "revenue",
                    label: "Revenue",
                    data: portfolioTrend.revenue,
                    color: "#2B77CC",
                  },
                ]}
                yFormatter={(v) => `$${v}`}
              />
            </div>
          </Card>
        </div>

        <Card>
          <CardHeader title="New vs returning" subtitle="Revenue contribution" />
          <div className="space-y-3 px-6 pb-6">
            <Row label="New customers" value={revenueSplit.newCustomers} total={revenueSplit.newCustomers + revenueSplit.repeatCustomers} color="#A275FF" />
            <Row label="Repeat customers" value={revenueSplit.repeatCustomers} total={revenueSplit.newCustomers + revenueSplit.repeatCustomers} color="#2B77CC" />
            <div className="mt-4 border-t border-[color:var(--mc-border)] pt-3">
              <Row label="Direct" value={revenueSplit.direct} total={revenueSplit.direct + revenueSplit.assisted} color="#00892E" />
              <Row label="Assisted" value={revenueSplit.assisted} total={revenueSplit.direct + revenueSplit.assisted} color="#00B3C2" />
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Revenue by segment" subtitle="Revenue and orders by customer segment" />
        <div className="px-4 pb-4">
          <BarChart
            data={revenueBySegment}
            xKey="segment"
            bars={[{ id: "revenue", label: "Revenue" }]}
            height={240}
            horizontal
          />
        </div>
      </Card>

      <Card>
        <CardHeader title="Segment revenue detail" />
        <div className="px-3 pb-3">
          <RankedTable
            keyFn={(r) => r.segment}
            rows={revenueBySegment}
            columns={[
              { id: "seg", label: "Segment", render: (r) => r.segment },
              { id: "rev", label: "Revenue", align: "right", render: (r) => formatCurrency(r.revenue) },
              { id: "orders", label: "Orders", align: "right", render: (r) => r.orders },
              {
                id: "aov",
                label: "Avg. order value",
                align: "right",
                render: (r) => formatCurrency(Math.round(r.revenue / r.orders)),
              },
            ]}
          />
        </div>
      </Card>
    </div>
  );
}

function Row({
  label,
  value,
  total,
  color,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
}) {
  const pct = Math.round((value / total) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-[12px]">
        <span className="text-[color:var(--mc-text-primary)]">{label}</span>
        <span className="tabular-nums text-[color:var(--mc-text-secondary)]">
          {formatCurrency(value)} ({pct}%)
        </span>
      </div>
      <div className="mt-1 h-2 w-full rounded bg-[color:var(--mc-subtle)]">
        <div className="h-2 rounded" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
