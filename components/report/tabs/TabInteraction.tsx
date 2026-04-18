import { Card, CardHeader } from "@/components/cards/Card";
import { BarChart } from "@/components/charts/BarChart";
import { TrendChart } from "@/components/charts/TrendChart";
import { RankedTable } from "@/components/tables/RankedTable";
import {
  conversationDepth,
  intentDistribution,
  interactivePerf,
  replyRateTrend,
} from "@/lib/mock/metrics";

export function TabInteraction() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Reply rate trend" subtitle="Last 30 days" />
          <div className="px-4 pb-4">
            <TrendChart
              height={240}
              series={[{ id: "reply", label: "Reply rate (%)", data: replyRateTrend }]}
            />
          </div>
        </Card>
        <Card>
          <CardHeader
            title="Interactive element performance"
            subtitle="Click-through by button and list option"
          />
          <div className="px-3 pb-3">
            <RankedTable
              keyFn={(r) => r.element}
              rows={interactivePerf}
              columns={[
                { id: "el", label: "Element", render: (r) => r.element },
                { id: "imp", label: "Impressions", align: "right", render: (r) => r.impressions },
                { id: "sel", label: "Selections", align: "right", render: (r) => r.selections },
                { id: "rate", label: "Selection rate", align: "right", render: (r) => `${r.rate}%` },
              ]}
            />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Intent distribution" subtitle="What customers are asking about" />
          <div className="px-4 pb-4">
            <BarChart
              data={intentDistribution}
              xKey="intent"
              bars={[{ id: "share", label: "Share (%)" }]}
              height={240}
              horizontal
            />
          </div>
        </Card>
        <Card>
          <CardHeader title="Conversation depth" subtitle="How many messages per conversation" />
          <div className="px-4 pb-4">
            <BarChart
              data={conversationDepth}
              xKey="bucket"
              bars={[{ id: "count", label: "Conversations" }]}
              height={240}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
