import { Card, CardHeader } from "@/components/cards/Card";
import { BarChart } from "@/components/charts/BarChart";
import { RankedTable } from "@/components/tables/RankedTable";
import { segments, geos } from "@/lib/mock/catalog";
import { cn } from "@/lib/utils";

export function TabAudience() {
  return (
    <div className="space-y-5">
      <Card>
        <CardHeader
          title="Segment matrix"
          subtitle="Completion, read, and revenue index by segment (100 = campaign avg)"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[color:var(--mc-border)]">
                <Th>Segment</Th>
                <Th align="right">Size</Th>
                <Th align="right">Completion idx</Th>
                <Th align="right">Read idx</Th>
                <Th align="right">Revenue idx</Th>
              </tr>
            </thead>
            <tbody>
              {segments.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-[color:var(--mc-border)] last:border-b-0 hover:bg-[color:var(--mc-subtle)]"
                >
                  <td className="px-6 py-3 font-medium">{s.label}</td>
                  <td className="px-6 py-3 text-right tabular-nums">{s.size}</td>
                  <IdxCell value={s.completionIndex} />
                  <IdxCell value={s.readIndex} />
                  <IdxCell value={s.revenueIndex} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Revenue by geography" />
          <div className="px-4 pb-4">
            <BarChart
              data={geos.map((g) => ({ code: `${g.flag} ${g.code}`, revenue: g.revenue }))}
              xKey="code"
              bars={[{ id: "revenue", label: "Revenue" }]}
              height={240}
            />
          </div>
        </Card>
        <Card>
          <CardHeader title="Completion by geography" />
          <div className="px-3 pb-3">
            <RankedTable
              keyFn={(g) => g.code}
              rows={geos}
              columns={[
                {
                  id: "name",
                  label: "Country",
                  render: (g) => (
                    <span>
                      <span className="mr-2">{g.flag}</span>
                      {g.name}
                    </span>
                  ),
                },
                { id: "completion", label: "Completion", align: "right", render: (g) => `${g.completionRate}%` },
                { id: "reply", label: "Reply", align: "right", render: (g) => `${g.replyRate}%` },
              ]}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

function Th({
  children,
  align,
}: {
  children: React.ReactNode;
  align?: "right";
}) {
  return (
    <th
      className={cn(
        "px-6 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[color:var(--mc-text-tertiary)]",
        align === "right" ? "text-right" : "text-left"
      )}
    >
      {children}
    </th>
  );
}

function IdxCell({ value }: { value: number }) {
  const tone = value >= 115 ? "#00892E" : value >= 90 ? "#5D686F" : value >= 70 ? "#A275FF" : "#B61A37";
  const bg = value >= 115 ? "#DFF5E7" : value >= 90 ? "#F0F4F6" : value >= 70 ? "#EFE8FF" : "#FDE7EA";
  return (
    <td className="px-6 py-3 text-right">
      <span
        className="inline-flex h-6 min-w-[52px] items-center justify-center rounded px-2 text-[12px] font-medium tabular-nums"
        style={{ color: tone, backgroundColor: bg }}
      >
        {value}
      </span>
    </td>
  );
}
