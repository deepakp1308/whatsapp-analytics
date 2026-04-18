import { Card, CardHeader } from "@/components/cards/Card";
import { BarChart } from "@/components/charts/BarChart";
import { RankedTable } from "@/components/tables/RankedTable";
import { sequencePaths } from "@/lib/mock/catalog";
import { optOutByFreq } from "@/lib/mock/metrics";
import { formatCurrency } from "@/lib/utils";
import { SeverityBadge } from "@/components/cards/SeverityBadge";

export function TabCrossChannel() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Sequence conversion"
            subtitle="Conversions by cross-channel path"
          />
          <div className="px-4 pb-4">
            <BarChart
              data={sequencePaths.map((s) => ({ label: s.label, conversions: s.conversions }))}
              xKey="label"
              bars={[{ id: "conversions", label: "Conversions" }]}
              height={240}
              horizontal
            />
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Opt-out by frequency"
            subtitle="Contacts who received N messages in last 30d — opt-out rate"
          />
          <div className="px-4 pb-4">
            <BarChart
              data={optOutByFreq}
              xKey="bucket"
              bars={[
                { id: "email", label: "Email", color: "#A275FF" },
                { id: "sms", label: "SMS", color: "#00B3C2" },
                { id: "wa", label: "WhatsApp", color: "#2B77CC" },
              ]}
              height={240}
            />
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Sequence detail" subtitle="Revenue, conversions, and fatigue" />
        <div className="px-3 pb-3">
          <RankedTable
            keyFn={(s) => s.id}
            rows={sequencePaths}
            columns={[
              { id: "path", label: "Path", render: (s) => <span className="font-medium">{s.label}</span> },
              { id: "conv", label: "Conversions", align: "right", render: (s) => s.conversions },
              { id: "rev", label: "Revenue", align: "right", render: (s) => formatCurrency(s.revenue) },
              {
                id: "fatigue",
                label: "Fatigue",
                render: (s) => (
                  <SeverityBadge
                    severity={
                      s.fatigue === "low"
                        ? "healthy"
                        : s.fatigue === "medium"
                        ? "watch"
                        : "opportunity"
                    }
                    label={`${s.fatigue[0].toUpperCase()}${s.fatigue.slice(1)}`}
                  />
                ),
              },
            ]}
          />
        </div>
      </Card>
    </div>
  );
}
