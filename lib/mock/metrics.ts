import type { FunnelStage, KpiDef, MetricPoint, LensId } from "../types";
import { annotateFunnel } from "../semantic";

/* --------------------------------------------------------------
   Anchor KPI sets, lens-aware. Same Welcome-message campaign is
   shown four different ways depending on the LensSwitcher.
-----------------------------------------------------------------*/

export const kpisByLens: Record<LensId, KpiDef[]> = {
  business: [
    { id: "revenue", label: "Revenue", value: 12000, format: "currency", benchmark: 9200, deltaVsBenchmark: 30.4, severity: "healthy" },
    { id: "conversions", label: "Conversions", value: 195, format: "number", benchmark: 180, deltaVsBenchmark: 8.3, severity: "healthy" },
    { id: "conv-rate", label: "Conversion rate", value: 5.4, format: "pct", benchmark: 5.2, deltaVsBenchmark: 3.8, severity: "watch" },
    { id: "read-rate", label: "Read rate", value: 55, format: "pct", benchmark: 48, deltaVsBenchmark: 14.5, severity: "healthy" },
    { id: "reply-rate", label: "Reply rate", value: 17.8, format: "pct", benchmark: 22.0, deltaVsBenchmark: -19.1, severity: "opportunity" },
    { id: "cost-per-conv", label: "Cost per conversion", value: 6.15, format: "usd-per", benchmark: 5.2, deltaVsBenchmark: 18.3, severity: "action-needed" },
  ],
  engagement: [
    { id: "sent", label: "Sent", value: 1200, format: "number", severity: "healthy" },
    { id: "delivery-rate", label: "Delivery rate", value: 85, format: "pct", benchmark: 96, deltaVsBenchmark: -11.5, severity: "opportunity" },
    { id: "click-rate", label: "Click rate", value: 65, format: "pct", benchmark: 52, deltaVsBenchmark: 25, severity: "healthy" },
    { id: "read-rate", label: "Read rate", value: 55, format: "pct", benchmark: 48, deltaVsBenchmark: 14.5, severity: "healthy" },
    { id: "interactive", label: "Button selection rate", value: 41, format: "pct", benchmark: 38, deltaVsBenchmark: 7.9, severity: "healthy" },
    { id: "replies", label: "Reply rate", value: 17.8, format: "pct", benchmark: 22, deltaVsBenchmark: -19.1, severity: "opportunity" },
  ],
  conversation: [
    { id: "reply-rate", label: "Reply rate", value: 17.8, format: "pct", severity: "opportunity" },
    { id: "two-way", label: "Two-way conversations", value: 36, format: "pct", severity: "watch" },
    { id: "median-reply", label: "Median time to first reply", value: 252, format: "seconds", severity: "watch" },
    { id: "bot-contain", label: "Bot containment", value: 72, format: "pct", benchmark: 78, deltaVsBenchmark: -7.7, severity: "watch" },
    { id: "handoff", label: "Human handoff rate", value: 14, format: "pct", benchmark: 10, deltaVsBenchmark: 40, severity: "opportunity" },
    { id: "csat", label: "Conversation CSAT", value: 4.3, format: "number", severity: "healthy" },
  ],
  "cost-quality": [
    { id: "spend", label: "Spend", value: 1198, format: "currency", severity: "watch" },
    { id: "cpd", label: "Cost per delivered", value: 0.098, format: "usd-per", benchmark: 0.08, deltaVsBenchmark: 22, severity: "opportunity" },
    { id: "cpc", label: "Cost per conversion", value: 6.15, format: "usd-per", benchmark: 5.2, deltaVsBenchmark: 18.3, severity: "action-needed" },
    { id: "roas", label: "Revenue-to-cost ratio", value: 10, format: "number", benchmark: 8, deltaVsBenchmark: 25, severity: "healthy" },
    { id: "quality", label: "Quality rating", value: 92, format: "pct", benchmark: 95, deltaVsBenchmark: -3.2, severity: "watch" },
    { id: "limit-util", label: "Messaging limit use", value: 62, format: "pct", severity: "watch" },
  ],
};

/* --------------------------------------------------------------
   Funnel (Sent → Converted)
-----------------------------------------------------------------*/
export const funnel: FunnelStage[] = annotateFunnel([
  { id: "sent", label: "Sent", value: 1200 },
  { id: "delivered", label: "Delivered", value: 1020 },
  { id: "read", label: "Read", value: 561 },
  { id: "interacted", label: "Interacted", value: 365 },
  { id: "replied", label: "Replied", value: 214 },
  { id: "flow-started", label: "Flow started", value: 188 },
  { id: "flow-completed", label: "Flow completed", value: 121 },
  { id: "converted", label: "Converted", value: 65 },
]);

/* --------------------------------------------------------------
   Daily trend — 30d
-----------------------------------------------------------------*/
function buildTrend(
  base: number,
  amplitude: number,
  days = 30,
  seed = 7,
): MetricPoint[] {
  const out: MetricPoint[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - (days - 1 - i));
    const wave = Math.sin((i + seed) * 0.8) * amplitude;
    const noise = ((i * 1103515245 + 12345) % 1000) / 1000 - 0.5;
    const value = Math.max(0, Math.round(base + wave + noise * amplitude * 0.6));
    out.push({ date: d.toISOString().slice(0, 10), value });
  }
  return out;
}

export const portfolioTrend = {
  revenue: buildTrend(680, 220, 30, 3),
  conversions: buildTrend(12, 5, 30, 11),
  readRate: buildTrend(55, 6, 30, 5),
  replyRate: buildTrend(17, 4, 30, 17),
};

export const replyRateTrend = portfolioTrend.replyRate;
export const readLatencyTrend = buildTrend(240, 60, 30, 4).map((p) => ({
  ...p,
  value: p.value,
}));

/* --------------------------------------------------------------
   Failure reasons
-----------------------------------------------------------------*/
export const failureReasons = [
  { reason: "Invalid number", count: 78, pct: 43 },
  { reason: "Out of messaging window", count: 42, pct: 23 },
  { reason: "Template rejected", count: 22, pct: 12 },
  { reason: "User opted out", count: 18, pct: 10 },
  { reason: "Quality paused", count: 12, pct: 7 },
  { reason: "Other", count: 8, pct: 5 },
];

/* --------------------------------------------------------------
   Interactive element performance
-----------------------------------------------------------------*/
export const interactivePerf = [
  { element: "Book now (button)", impressions: 561, selections: 230, rate: 41 },
  { element: "STOP (button)", impressions: 561, selections: 12, rate: 2 },
  { element: "View menu (list)", impressions: 188, selections: 58, rate: 31 },
  { element: "Call us (button)", impressions: 188, selections: 24, rate: 13 },
];

/* --------------------------------------------------------------
   Intent distribution
-----------------------------------------------------------------*/
export const intentDistribution = [
  { intent: "Booking request", share: 38 },
  { intent: "Pricing question", share: 22 },
  { intent: "Opening hours", share: 14 },
  { intent: "Complaint", share: 9 },
  { intent: "General chat", share: 11 },
  { intent: "Other", share: 6 },
];

/* --------------------------------------------------------------
   Conversation depth
-----------------------------------------------------------------*/
export const conversationDepth = [
  { bucket: "1 message", count: 420 },
  { bucket: "2 messages", count: 280 },
  { bucket: "3 messages", count: 140 },
  { bucket: "4 messages", count: 62 },
  { bucket: "5+ messages", count: 41 },
];

/* --------------------------------------------------------------
   Opt-out by frequency bucket
-----------------------------------------------------------------*/
export const optOutByFreq = [
  { bucket: "1 message", wa: 3, email: 5, sms: 4 },
  { bucket: "2 messages", wa: 4.5, email: 6, sms: 5 },
  { bucket: "3 messages", wa: 4, email: 7, sms: 5.5 },
  { bucket: "4 messages", wa: 3.5, email: 7.5, sms: 6 },
  { bucket: "5+ messages", wa: 9, email: 11, sms: 8 },
];

/* --------------------------------------------------------------
   Template performance
-----------------------------------------------------------------*/
export const templatePerformance = [
  { name: "Holiday_sale", category: "Marketing", lang: "English (US)", sent: 1200, opened: 75, blocked: 0, revenue: 12000 },
  { name: "Order_confirmation", category: "Utility", lang: "Portuguese", sent: 1000, opened: 60, blocked: 0, revenue: 1000 },
  { name: "Flow_step_2_v3", category: "Marketing", lang: "English (US)", sent: 650, opened: 52, blocked: 3, revenue: 820 },
  { name: "Welcome_loyalty", category: "Marketing", lang: "English (US)", sent: 3608, opened: 55, blocked: 0, revenue: 3100 },
];

/* --------------------------------------------------------------
   Revenue breakdown
-----------------------------------------------------------------*/
export const revenueSplit = {
  newCustomers: 5100,
  repeatCustomers: 6900,
  direct: 8400,
  assisted: 3600,
};

export const revenueBySegment = [
  { segment: "High-intent repeat", revenue: 5100, orders: 82 },
  { segment: "New customers", revenue: 2800, orders: 46 },
  { segment: "Loyalty members", revenue: 2200, orders: 38 },
  { segment: "Lapsed", revenue: 1100, orders: 18 },
  { segment: "High-value", revenue: 800, orders: 11 },
];

/* --------------------------------------------------------------
   Replies table
-----------------------------------------------------------------*/
export const repliesTable = [
  { type: "Quick reply", description: "Book now", count: 1200, replies: 1200 },
  { type: "Free text", description: "Customer-typed message", count: 1000, replies: 1000 },
  { type: "List option", description: "Sent to GPT for review", count: 200, replies: 200 },
];

/* --------------------------------------------------------------
   Campaign leaderboard
-----------------------------------------------------------------*/
export const campaignLeaderboard = [
  { name: "Welcome message", revenue: 12000, conversions: 195, readRate: 55, replyRate: 17.8, cpc: 6.15 },
  { name: "Abandoned cart recovery", revenue: 28400, conversions: 441, readRate: 62, replyRate: 28, cpc: 4.72 },
  { name: "Holiday sale announcement", revenue: 58900, conversions: 920, readRate: 51, replyRate: 12, cpc: 5.9 },
  { name: "Loyalty tier upgrade", revenue: 11800, conversions: 180, readRate: 60, replyRate: 19, cpc: 5.2 },
  { name: "Back-in-stock alert", revenue: 9400, conversions: 152, readRate: 71, replyRate: 26, cpc: 4.1 },
];
