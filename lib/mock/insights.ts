import type { Insight } from "../types";

/**
 * Pre-authored Insight[] covering the full jobs-to-be-done set.
 * Same objects power: AI summary cards (Plan 1), SparkleChip right-rail
 * drill-downs (Plan 2), and scripted agent turns (Plan 3).
 *
 * Edit once, update everywhere.
 */
export const insights: Insight[] = [
  // ------------------------------------------------------------------ reach-quality
  {
    id: "ins_delivery_drop_in",
    type: "anomaly",
    group: "reach-quality",
    scope: { campaignId: "cmp_welcome_wa", geo: "IN" },
    metrics: { deliveryRate: 78, portfolioDeliveryRate: 85 },
    summary: "Delivery rate in India is 7 pts below portfolio average.",
    rationale:
      "78% of India sends were delivered vs 85% portfolio. Bulk of failures come from invalid numbers and being out of the 24h messaging window.",
    confidence: "high",
    severity: "opportunity",
    evidence: [
      { id: "ev_geo_heatmap", kind: "heatmap", title: "Delivery rate by country" },
      { id: "ev_failure_reasons", kind: "bar", title: "Failure reasons" },
    ],
    recommendedAction: {
      kind: "create-segment",
      label: "Create IN cleanup segment",
      description: "Segment India numbers failing delivery and route to a re-opt-in flow.",
    },
    estimatedImpact: { metric: "delivered", delta: 62, unit: "abs" },
    followUps: [
      "Show bounce hotspots",
      "Compare read rate by country",
      "Find quality risk",
    ],
  },
  {
    id: "ins_quality_trend",
    type: "trend",
    group: "reach-quality",
    scope: { campaignId: "cmp_welcome_wa" },
    metrics: { qualityRating: 92, qualityRating3dAgo: 96 },
    summary: "Phone-number quality rating has trended down for three days.",
    rationale:
      "Quality fell from 96 → 94 → 93 → 92. Continued drop will reduce messaging-limit tier and increase cost per delivered.",
    confidence: "med",
    severity: "watch",
    evidence: [{ id: "ev_quality_trend", kind: "trend", title: "Quality rating trend" }],
    recommendedAction: {
      kind: "save-watchlist",
      label: "Add quality to watchlist",
      description: "Nudge you if quality drops below 90.",
    },
    followUps: ["Why did quality drop?", "What impacts messaging limit?"],
  },

  // ------------------------------------------------------------------ engagement
  {
    id: "ins_read_rate_win",
    type: "benchmark-gap",
    group: "engagement",
    scope: { campaignId: "cmp_welcome_wa" },
    metrics: { readRate: 55, peerAvg: 48 },
    summary: "Read rate is 14.5% above peer cohort.",
    rationale:
      "Short, personal copy and a familiar sender number drove read uplift, especially in UK (71%) and US (58%).",
    confidence: "high",
    severity: "healthy",
    evidence: [{ id: "ev_read_trend", kind: "trend", title: "Read rate vs peer" }],
    followUps: ["Which segment read most?", "Compare against email peers"],
  },
  {
    id: "ins_button_winner",
    type: "trend",
    group: "engagement",
    scope: { campaignId: "cmp_welcome_wa" },
    metrics: { buttonRate: 41 },
    summary: "\"Book now\" button carried 41% selection — your top interactive element.",
    rationale:
      "\"Book now\" beat \"View menu\" (31%) and \"Call us\" (13%). Copy clarity and top-of-message placement matter.",
    confidence: "high",
    severity: "healthy",
    evidence: [{ id: "ev_interactive", kind: "bar", title: "Interactive element performance" }],
    followUps: ["Which button won?", "Test a third button"],
  },
  {
    id: "ins_reply_rate_soft",
    type: "benchmark-gap",
    group: "engagement",
    scope: { campaignId: "cmp_welcome_wa" },
    metrics: { replyRate: 17.8, peerAvg: 22 },
    summary: "Reply rate is 19% below peer cohort.",
    rationale:
      "Thirty percent of read-only users never triggered Step 2 — they drop before the first list prompt. Try an earlier conversational question.",
    confidence: "med",
    severity: "opportunity",
    evidence: [{ id: "ev_reply_trend", kind: "trend", title: "Reply rate trend" }],
    followUps: ["Show reply patterns", "Explain low interaction"],
  },

  // ------------------------------------------------------------------ conversation
  {
    id: "ins_handoff_up",
    type: "anomaly",
    group: "conversation",
    scope: { campaignId: "cmp_welcome_wa" },
    metrics: { handoffRate: 14, benchmark: 10 },
    summary: "Human handoff rate rose 40% week-over-week.",
    rationale:
      "Pricing questions (22% of intents) are failing bot containment. Most handoffs are same-day escalations.",
    confidence: "med",
    severity: "opportunity",
    evidence: [
      { id: "ev_intent", kind: "bar", title: "Intent distribution" },
      { id: "ev_handoff_trend", kind: "trend", title: "Handoff trend" },
    ],
    recommendedAction: {
      kind: "swap-template",
      label: "Publish pricing FAQ template",
      description: "Add a 3-option pricing answer to the bot flow.",
    },
    followUps: ["Why are handoffs rising?", "Find unresolved conversations"],
  },
  {
    id: "ins_intent_top",
    type: "trend",
    group: "conversation",
    scope: { campaignId: "cmp_welcome_wa" },
    metrics: { bookingShare: 38, pricingShare: 22 },
    summary: "\"Booking request\" dominates replies at 38%.",
    rationale: "This is what the campaign is supposed to drive — intent alignment is on target.",
    confidence: "high",
    severity: "healthy",
    evidence: [{ id: "ev_intent_pie", kind: "bar", title: "Intent distribution" }],
    followUps: ["Show top intents"],
  },

  // ------------------------------------------------------------------ flow-completion
  {
    id: "ins_step2_bottleneck",
    type: "anomaly",
    group: "flow-completion",
    scope: { campaignId: "cmp_welcome_wa", flowStep: "step_2" },
    metrics: { step2Completion: 69, step1Completion: 94, dropSeconds: 62 },
    summary: "Step 2 is the main flow bottleneck — 31% timeout.",
    rationale:
      "The service-list step takes 62s median vs 14s at Step 1. New customers in India time out at 2.4× the campaign average.",
    confidence: "high",
    severity: "action-needed",
    evidence: [
      { id: "ev_flow_funnel", kind: "funnel", title: "Flow step drop-off" },
      { id: "ev_seg_matrix", kind: "segment-matrix", title: "Completion by segment & geo" },
    ],
    recommendedAction: {
      kind: "swap-template",
      label: "Test shorter Step 2",
      description: "Reduce the service list to 3 options and retry.",
    },
    estimatedImpact: { metric: "conversion", delta: 8, unit: "pct" },
    followUps: [
      "Where is the biggest flow drop?",
      "Which segment is timing out?",
      "Compare step completion by geo",
      "Simulate impact if Step 2 completion improves by 10%",
    ],
  },
  {
    id: "ins_step2_segment",
    type: "trend",
    group: "flow-completion",
    scope: { campaignId: "cmp_welcome_wa", segmentId: "seg_new", geo: "IN" },
    metrics: { timeoutRate: 52, campaignAvg: 22 },
    summary: "New customers in India time out in Step 2 at 2.4× campaign average.",
    rationale:
      "Concentrated in Template Version 3. Likely cause: the list copy was translated but options were not re-ordered for local services.",
    confidence: "med",
    severity: "opportunity",
    evidence: [{ id: "ev_seg_matrix", kind: "segment-matrix", title: "Completion by segment & geo" }],
    followUps: ["Show me why India is different", "Compare new vs repeat"],
  },

  // ------------------------------------------------------------------ revenue
  {
    id: "ins_revenue_biggest",
    type: "trend",
    group: "revenue",
    scope: { campaignId: "cmp_welcome_wa" },
    metrics: { revenue: 12000, aov: 124.1 },
    summary: "$12,000 in attributed revenue — 30% above plan.",
    rationale:
      "High-intent repeat customers contributed $5,100 (43%). AOV is $124 with 195 conversions.",
    confidence: "high",
    severity: "healthy",
    evidence: [
      { id: "ev_rev_trend", kind: "trend", title: "Revenue trend" },
      { id: "ev_rev_segment", kind: "bar", title: "Revenue by segment" },
    ],
    followUps: ["What drove the most revenue?", "Show new vs repeat revenue"],
  },
  {
    id: "ins_assisted_revenue",
    type: "trend",
    group: "revenue",
    scope: { campaignId: "cmp_welcome_wa" },
    metrics: { assistedRevenue: 3600, directRevenue: 8400 },
    summary: "$3,600 of revenue was assisted by a follow-up email.",
    rationale:
      "Email-then-WhatsApp-within-6h drives 38% more conversions than WhatsApp alone for new customers.",
    confidence: "med",
    severity: "watch",
    evidence: [{ id: "ev_seq", kind: "path", title: "Sequence conversion" }],
    followUps: ["What drove assisted revenue?", "Simulate shifting to 6h gap"],
  },

  // ------------------------------------------------------------------ cross-channel
  {
    id: "ins_sequence_winner",
    type: "recommendation",
    group: "cross-channel",
    scope: { campaignId: "cmp_welcome_wa", sequenceId: "seq_email_wa_6h" },
    metrics: { lift: 38 },
    summary: "Email → WhatsApp (6h) converts 38% better than WhatsApp-only for new customers.",
    rationale:
      "Current 48h gap is losing 46 conversions and ~$2,300 vs a 6h gap. Fatigue risk stays \"low\".",
    confidence: "high",
    severity: "opportunity",
    evidence: [
      { id: "ev_seq_compare", kind: "bar", title: "Sequence conversion" },
      { id: "ev_seq_fatigue", kind: "bar", title: "Fatigue by touch count" },
    ],
    recommendedAction: {
      kind: "adjust-cadence",
      label: "Shorten email→WhatsApp gap to 6h",
      description: "Applies to new-customer journey only.",
    },
    estimatedImpact: { metric: "revenue", delta: 2300, unit: "usd" },
    followUps: [
      "Compare WhatsApp only vs mixed",
      "Which path converts best?",
      "Show fatigue risk",
    ],
  },

  // ------------------------------------------------------------------ recommendations (top-level)
  {
    id: "ins_best_next_action",
    type: "recommendation",
    group: "recommendations",
    scope: { campaignId: "cmp_welcome_wa" },
    metrics: { estRevenueLift: 2300, estConvLift: 8 },
    summary: "Highest-impact move: shorten Step 2 and tighten email→WhatsApp gap to 6h.",
    rationale:
      "Addresses the two biggest drags (flow timeout + sequence gap) in one change window. Low risk, high upside.",
    confidence: "high",
    severity: "action-needed",
    evidence: [
      { id: "ev_flow_funnel", kind: "funnel", title: "Flow funnel" },
      { id: "ev_seq_compare", kind: "bar", title: "Sequence compare" },
    ],
    recommendedAction: {
      kind: "launch-experiment",
      label: "Launch A/B on Step 2 + cadence",
      description: "50/50 split for 7 days. Primary metric: conversion rate.",
    },
    estimatedImpact: { metric: "conversion", delta: 8, unit: "pct" },
    followUps: ["Build me a test plan", "What should I change first?"],
  },
  {
    id: "ins_frequency_cap",
    type: "recommendation",
    group: "recommendations",
    scope: { campaignId: "cmp_welcome_wa", segmentId: "seg_price_sens" },
    metrics: { optOutAtFive: 9 },
    summary: "Reduce send frequency for Segment C — opt-outs spike at 5+ messages.",
    rationale:
      "Price-sensitive cohort opts out at 9% after 5 messages vs 3.5% after 4. They still convert with 3-touch cadence.",
    confidence: "med",
    severity: "opportunity",
    evidence: [{ id: "ev_optout_freq", kind: "bar", title: "Opt-out by frequency" }],
    recommendedAction: {
      kind: "adjust-cadence",
      label: "Cap price-sensitive at 3 messages",
      description: "Applies to weekly promotional window.",
    },
    followUps: ["Which segment should I prioritize?", "What's the opt-out cost?"],
  },

  // ------------------------------------------------------------------ biggest win / issue cards
  {
    id: "ins_biggest_win",
    type: "trend",
    group: "engagement",
    scope: { campaignId: "cmp_welcome_wa" },
    metrics: { readRate: 55 },
    summary: "Biggest win — UK read rate at 71%.",
    rationale: "UK over-indexes on read and reply. Consider scaling UK-style copy to US.",
    confidence: "high",
    severity: "healthy",
    evidence: [{ id: "ev_geo_heatmap", kind: "heatmap", title: "Read rate by geo" }],
    followUps: ["Why is UK different?"],
  },
  {
    id: "ins_biggest_issue",
    type: "anomaly",
    group: "flow-completion",
    scope: { campaignId: "cmp_welcome_wa", flowStep: "step_2" },
    metrics: { step2Completion: 69 },
    summary: "Biggest issue — Step 2 is losing 31% of flow starters.",
    rationale: "See detailed root cause in Flows & tasks.",
    confidence: "high",
    severity: "action-needed",
    evidence: [{ id: "ev_flow_funnel", kind: "funnel", title: "Flow funnel" }],
    followUps: ["Where is the biggest flow drop?"],
  },
];

export function getInsight(id: string) {
  return insights.find((i) => i.id === id);
}
