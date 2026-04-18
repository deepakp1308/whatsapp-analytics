"use client";
import {
  Bar,
  BarChart as RBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Cell,
} from "recharts";
import { mcColor } from "@/lib/tokens";

type Props = {
  data: Record<string, number | string>[];
  xKey: string;
  bars: { id: string; label: string; color?: string }[];
  height?: number;
  horizontal?: boolean;
  colorByIndex?: string[];
};

export function BarChart({ data, xKey, bars, height = 220, horizontal, colorByIndex }: Props) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RBarChart
          data={data}
          layout={horizontal ? "vertical" : "horizontal"}
          margin={{ top: 8, right: 12, left: horizontal ? 80 : 0, bottom: 0 }}
        >
          <CartesianGrid stroke={mcColor.border.DEFAULT} vertical={false} />
          {horizontal ? (
            <>
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                stroke={mcColor.text.tertiary}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                dataKey={xKey}
                type="category"
                axisLine={false}
                tickLine={false}
                stroke={mcColor.text.tertiary}
                tick={{ fontSize: 11 }}
                width={80}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey={xKey}
                axisLine={false}
                tickLine={false}
                stroke={mcColor.text.tertiary}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                stroke={mcColor.text.tertiary}
                tick={{ fontSize: 11 }}
                width={40}
              />
            </>
          )}
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: `1px solid ${mcColor.border.DEFAULT}`,
              fontSize: 12,
            }}
            cursor={{ fill: mcColor.subtle }}
          />
          {bars.length > 1 && (
            <Legend wrapperStyle={{ fontSize: 11 }} iconSize={8} iconType="circle" />
          )}
          {bars.map((b, i) => (
            <Bar
              key={b.id}
              dataKey={b.id}
              name={b.label}
              fill={b.color ?? mcColor.chart[i % mcColor.chart.length]}
              radius={[4, 4, 0, 0]}
              maxBarSize={36}
            >
              {colorByIndex &&
                data.map((_, idx) => (
                  <Cell key={idx} fill={colorByIndex[idx % colorByIndex.length]} />
                ))}
            </Bar>
          ))}
        </RBarChart>
      </ResponsiveContainer>
    </div>
  );
}
