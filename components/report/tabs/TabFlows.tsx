import { Card, CardHeader } from "@/components/cards/Card";
import { AdaptiveFunnel } from "@/components/cards/AdaptiveFunnel";
import { BarChart } from "@/components/charts/BarChart";
import { RankedTable } from "@/components/tables/RankedTable";
import { SeverityBadge } from "@/components/cards/SeverityBadge";
import { InsightCard } from "@/components/cards/InsightCard";
import { flowSteps, segments } from "@/lib/mock/catalog";
import { annotateFunnel } from "@/lib/semantic";
import { insights } from "@/lib/mock/insights";
import { formatNumber } from "@/lib/utils";

export function TabFlows() {
  const flowStages = annotateFunnel(
    flowSteps.map((s) => ({ id: s.id, label: s.label, value: s.completed }))
  );
  const bottleneck = insights.find((i) => i.id === "ins_step2_bottleneck")!;
  const geoSplit = insights.find((i) => i.id === "ins_step2_segment")!;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AdaptiveFunnel
            title="Flow funnel"
            subtitle="Step drop-off across the welcome flow"
            stages={flowStages}
          />
        </div>
        <InsightCard insight={bottleneck} label="Biggest issue" />
      </div>

      <Card>
        <CardHeader title="Flow step diagnostics" subtitle="Timeout, retry, and timing" />
        <div className="px-3 pb-3">
          <RankedTable
            keyFn={(s) => s.id}
            rows={flowSteps}
            columns={[
              { id: "step", label: "Step", render: (s) => <span className="font-medium">{s.label}</span> },
              { id: "entered", label: "Entered", align: "right", render: (s) => formatNumber(s.entered) },
              { id: "completed", label: "Completed", align: "right", render: (s) => formatNumber(s.completed) },
              {
                id: "timeout",
                label: "Timeout rate",
                align: "right",
                render: (s) => {
                  const rate = (s.timedOut / s.entered) * 100;
                  return (
                    <span className="inline-flex items-center gap-2">
                      {rate.toFixed(1)}%
                      {rate > 15 && <SeverityBadge severity="action-needed" size="sm" />}
                    </span>
                  );
                },
              },
              { id: "avg", label: "Median seconds", align: "right", render: (s) => `${s.avgSeconds}s` },
            ]}
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Completion by segment" />
          <div className="px-4 pb-4">
            <BarChart
              data={segments.map((s) => ({ segment: s.label, completion: s.completionIndex }))}
              xKey="segment"
              bars={[{ id: "completion", label: "Completion index (100 = avg)" }]}
              height={240}
              horizontal
            />
          </div>
        </Card>
        <InsightCard insight={geoSplit} label="Segment × geo insight" />
      </div>
    </div>
  );
}
