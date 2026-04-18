import type { EvidenceRef } from "@/lib/types";
import { TrendChart } from "@/components/charts/TrendChart";
import { BarChart } from "@/components/charts/BarChart";
import { AdaptiveFunnel } from "@/components/cards/AdaptiveFunnel";
import {
  conversationDepth,
  failureReasons,
  intentDistribution,
  optOutByFreq,
  portfolioTrend,
  replyRateTrend,
  interactivePerf,
} from "@/lib/mock/metrics";
import { geos, flowSteps, segments } from "@/lib/mock/catalog";
import { annotateFunnel } from "@/lib/semantic";
import { mcChart, mcSeverity } from "@/lib/tokens";

/**
 * Render an evidence chart referenced by an Insight.
 * Keeps one tiny switch so every insight's evidence renders consistently
 * whether it's inline (Plan 1), a rail (Plan 2), or agent (Plan 3).
 */
export function EvidencePanel({ evidence }: { evidence: EvidenceRef[] }) {
  return (
    <div className="flex flex-col gap-3">
      {evidence.map((e) => (
        <div
          key={e.id}
          className="rounded-lg border border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] p-3"
        >
          <div className="mc-small mb-2 font-medium text-[color:var(--mc-text-primary)]">
            {e.title}
          </div>
          {renderEvidence(e)}
        </div>
      ))}
    </div>
  );
}

function renderEvidence(e: EvidenceRef) {
  switch (e.id) {
    case "ev_geo_heatmap":
      return (
        <BarChart
          data={geos.map((g) => ({ name: `${g.flag} ${g.code}`, rate: g.deliveryRate }))}
          xKey="name"
          bars={[{ id: "rate", label: "Delivery rate" }]}
          height={180}
        />
      );
    case "ev_failure_reasons":
      return (
        <BarChart
          data={failureReasons.map((f) => ({ reason: f.reason, count: f.count }))}
          xKey="reason"
          bars={[{ id: "count", label: "Failures" }]}
          height={180}
          horizontal
        />
      );
    case "ev_quality_trend":
      return (
        <TrendChart
          height={160}
          series={[
            {
              id: "quality",
              label: "Quality rating",
              data: portfolioTrend.readRate.map((p, i) => ({
                date: p.date,
                value: 96 - Math.min(4, i * 0.14),
              })),
              color: mcChart.negative,
            },
          ]}
        />
      );
    case "ev_read_trend":
      return (
        <TrendChart
          height={160}
          series={[
            { id: "read", label: "Read rate", data: portfolioTrend.readRate, color: mcChart.primary },
            {
              id: "peer",
              label: "Peer",
              data: portfolioTrend.readRate.map((p) => ({ ...p, value: p.value * 0.88 })),
              color: mcChart.comparison,
            },
          ]}
        />
      );
    case "ev_interactive":
      return (
        <BarChart
          data={interactivePerf.map((p) => ({ name: p.element, rate: p.rate }))}
          xKey="name"
          bars={[{ id: "rate", label: "Selection rate" }]}
          height={180}
          horizontal
        />
      );
    case "ev_reply_trend":
      return (
        <TrendChart
          height={160}
          series={[{ id: "reply", label: "Reply rate", data: replyRateTrend, color: mcChart.secondary }]}
        />
      );
    case "ev_intent":
    case "ev_intent_pie":
      return (
        <BarChart
          data={intentDistribution}
          xKey="intent"
          bars={[{ id: "share", label: "Share %" }]}
          height={180}
          horizontal
        />
      );
    case "ev_handoff_trend":
      return (
        <TrendChart
          height={160}
          series={[
            {
              id: "handoff",
              label: "Handoff rate",
              data: replyRateTrend.map((p) => ({ ...p, value: p.value * 0.7 })),
              color: mcChart.comparison,
            },
          ]}
        />
      );
    case "ev_flow_funnel":
      return (
        <AdaptiveFunnel
          stages={annotateFunnel(
            flowSteps.map((s) => ({ id: s.id, label: s.label, value: s.completed }))
          )}
          title=""
        />
      );
    case "ev_seg_matrix":
      return (
        <BarChart
          data={segments.map((s) => ({ segment: s.label, idx: s.completionIndex }))}
          xKey="segment"
          bars={[{ id: "idx", label: "Completion idx" }]}
          height={200}
          horizontal
        />
      );
    case "ev_rev_trend":
      return (
        <TrendChart
          height={160}
          series={[{ id: "rev", label: "Revenue", data: portfolioTrend.revenue, color: mcChart.primary }]}
          yFormatter={(v) => `$${v}`}
        />
      );
    case "ev_rev_segment":
      return (
        <BarChart
          data={segments.map((s) => ({ name: s.label, rev: s.revenueIndex * 30 }))}
          xKey="name"
          bars={[{ id: "rev", label: "Revenue" }]}
          height={180}
          horizontal
        />
      );
    case "ev_seq_compare":
    case "ev_seq":
      return (
        <BarChart
          data={[
            { name: "Email+WA (6h)", conv: 88 },
            { name: "WA only", conv: 65 },
            { name: "WA + SMS", conv: 58 },
            { name: "Email+WA (48h)", conv: 42 },
          ]}
          xKey="name"
          bars={[{ id: "conv", label: "Conversions" }]}
          height={180}
          horizontal
        />
      );
    case "ev_seq_fatigue":
    case "ev_optout_freq":
      return (
        <BarChart
          data={optOutByFreq}
          xKey="bucket"
          bars={[
            { id: "email", label: "Email", color: mcChart.channel.email },
            { id: "wa", label: "WA", color: mcChart.channel.whatsapp },
            { id: "sms", label: "SMS", color: mcChart.channel.sms },
          ]}
          height={180}
        />
      );
    case "ev_kpi_scorecard":
      return (
        <div className="grid grid-cols-3 gap-3 text-center">
          <Scorecard label="Read" value="55%" tone="healthy" />
          <Scorecard label="Reply" value="17.8%" tone="opportunity" />
          <Scorecard label="Conv." value="5.4%" tone="watch" />
        </div>
      );
    case "ev_conversation_depth":
      return (
        <BarChart
          data={conversationDepth}
          xKey="bucket"
          bars={[{ id: "count", label: "Conversations" }]}
          height={180}
        />
      );
    default:
      // Fallback trend
      return (
        <TrendChart
          height={160}
          series={[
            { id: "v", label: e.title, data: portfolioTrend.revenue.slice(-20), color: mcChart.primary },
          ]}
        />
      );
  }
}

function Scorecard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "healthy" | "opportunity" | "watch" | "action-needed";
}) {
  const colors = { bg: mcSeverity[tone].bg, fg: mcSeverity[tone].fg };
  return (
    <div
      className="rounded-md p-2"
      style={{ backgroundColor: colors.bg, color: colors.fg }}
    >
      <div className="mc-micro uppercase" style={{ color: colors.fg }}>
        {label}
      </div>
      <div className="text-[18px] font-semibold">{value}</div>
    </div>
  );
}
