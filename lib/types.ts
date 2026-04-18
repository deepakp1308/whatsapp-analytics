/**
 * Core type registry for the WhatsApp Analytics prototype.
 * Mirrors the Insight-object schema documented in docs/design-spec.md.
 */

import type { Severity } from "./tokens";

export type InsightType =
  | "anomaly"
  | "trend"
  | "benchmark-gap"
  | "forecast"
  | "recommendation";

export type InsightScope = {
  campaignId?: string;
  templateId?: string;
  segmentId?: string;
  geo?: string;
  sequenceId?: string;
  flowStep?: string;
};

export type ActionKind =
  | "create-segment"
  | "duplicate-journey"
  | "swap-template"
  | "adjust-cadence"
  | "launch-experiment"
  | "assign-human"
  | "save-watchlist"
  | "shift-channel-mix";

export type Action = {
  kind: ActionKind;
  label: string;
  description: string;
};

export type EvidenceRef = {
  id: string;
  kind: "trend" | "funnel" | "bar" | "heatmap" | "table" | "segment-matrix" | "geo" | "path";
  title: string;
  filterState?: Record<string, string>;
};

export type Insight = {
  id: string;
  type: InsightType;
  /** Which job-to-be-done group this insight belongs to. */
  group:
    | "reach-quality"
    | "engagement"
    | "conversation"
    | "flow-completion"
    | "revenue"
    | "cross-channel"
    | "recommendations";
  scope: InsightScope;
  metrics: Record<string, number>;
  summary: string;
  rationale: string;
  confidence: "low" | "med" | "high";
  severity: Severity;
  evidence: EvidenceRef[];
  recommendedAction?: Action;
  estimatedImpact?: { metric: string; delta: number; unit: "pct" | "abs" | "usd" };
  followUps: string[];
};

export type Campaign = {
  id: string;
  name: string;
  status: "sent" | "draft" | "scheduled";
  sentAt: string; // ISO
  sender: string;
  audience: string;
  audienceSize: number;
  creditsUsed: number;
  messagePreview: string;
  messageType: "WhatsApp" | "SMS" | "Email";
};

export type MetricPoint = { date: string; value: number };

export type LensId = "business" | "engagement" | "conversation" | "cost-quality";

export type KpiDef = {
  id: string;
  label: string;
  value: number;
  format: "number" | "pct" | "currency" | "usd-per" | "seconds";
  benchmark?: number;
  deltaVsBenchmark?: number;
  spark?: number[];
  severity?: Severity;
};

export type FunnelStage = {
  id: string;
  label: string;
  value: number;
  /** Value at the previous stage — used to compute drop. */
  previous?: number;
  /** Severity of the drop at this stage. */
  severity?: Severity;
};

export type Segment = {
  id: string;
  label: string;
  size: number;
  /** Completion rate, read rate, revenue per recipient indexes (100 = avg). */
  completionIndex: number;
  readIndex: number;
  revenueIndex: number;
};

export type Geo = {
  code: string;
  name: string;
  flag: string;
  delivered: number;
  deliveryRate: number;
  readRate: number;
  replyRate: number;
  completionRate: number;
  revenue: number;
};

export type Template = {
  id: string;
  name: string;
  category: "Marketing" | "Utility" | "Authentication";
  language: string;
  sent: number;
  readRate: number;
  replyRate: number;
  revenue: number;
};

export type Recipient = {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  location: string;
  clicks: number;
  delivered: boolean;
};

export type SequencePath = {
  id: string;
  label: string;
  steps: string[]; // ["wa", "email"] etc
  conversions: number;
  revenue: number;
  fatigue: "low" | "medium" | "high";
};

export type FlowStep = {
  id: string;
  label: string;
  entered: number;
  completed: number;
  timedOut: number;
  avgSeconds: number;
};

export type AgentTurn = {
  id: string;
  role: "agent" | "user";
  content: string;
  evidence?: EvidenceRef[];
  followUps?: string[];
  actions?: Action[];
  insightId?: string;
  /** Jobs-to-be-done mapping from the spec (1..5). */
  job?: 1 | 2 | 3 | 4 | 5;
};
