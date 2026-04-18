"use client";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { mcColor } from "@/lib/tokens";
import type { MetricPoint } from "@/lib/types";

type Series = { id: string; label: string; data: MetricPoint[]; color?: string };

type Props = {
  series: Series[];
  height?: number;
  yFormatter?: (v: number) => string;
};

export function TrendChart({ series, height = 220, yFormatter }: Props) {
  const data = (series[0]?.data ?? []).map((point, i) => {
    const row: Record<string, number | string> = { date: point.date };
    series.forEach((s) => {
      row[s.id] = s.data[i]?.value ?? 0;
    });
    return row;
  });

  return (
    <div style={{ height }} aria-label="Trend chart">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <defs>
            {series.map((s, i) => (
              <linearGradient key={s.id} id={`grad-${s.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={s.color ?? mcColor.chart[i % mcColor.chart.length]}
                  stopOpacity={0.25}
                />
                <stop
                  offset="95%"
                  stopColor={s.color ?? mcColor.chart[i % mcColor.chart.length]}
                  stopOpacity={0}
                />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid stroke={mcColor.border.DEFAULT} vertical={false} />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            stroke={mcColor.text.tertiary}
            tick={{ fontSize: 11 }}
            tickFormatter={(d: string) => d.slice(5)}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            stroke={mcColor.text.tertiary}
            tick={{ fontSize: 11 }}
            tickFormatter={yFormatter}
            width={44}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: `1px solid ${mcColor.border.DEFAULT}`,
              fontSize: 12,
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: 11, color: mcColor.text.secondary }}
            iconSize={8}
            iconType="circle"
          />
          {series.map((s) => (
            <Area
              key={`${s.id}-area`}
              type="monotone"
              dataKey={s.id}
              name={s.label}
              stroke="transparent"
              fill={`url(#grad-${s.id})`}
              fillOpacity={1}
            />
          ))}
          {series.map((s, i) => (
            <Line
              key={s.id}
              type="monotone"
              dataKey={s.id}
              name={s.label}
              stroke={s.color ?? mcColor.chart[i % mcColor.chart.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
