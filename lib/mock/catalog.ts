import type {
  FlowStep,
  Geo,
  Recipient,
  Segment,
  SequencePath,
  Template,
} from "../types";

export const segments: Segment[] = [
  { id: "seg_new", label: "New customers", size: 980, completionIndex: 72, readIndex: 96, revenueIndex: 58 },
  { id: "seg_repeat", label: "Repeat customers", size: 1420, completionIndex: 118, readIndex: 110, revenueIndex: 142 },
  { id: "seg_high_value", label: "High-value", size: 280, completionIndex: 124, readIndex: 108, revenueIndex: 210 },
  { id: "seg_lapsed", label: "Lapsed > 60d", size: 520, completionIndex: 54, readIndex: 70, revenueIndex: 42 },
  { id: "seg_loyalty", label: "Loyalty members", size: 320, completionIndex: 115, readIndex: 112, revenueIndex: 128 },
  { id: "seg_price_sens", label: "Price-sensitive", size: 88, completionIndex: 91, readIndex: 95, revenueIndex: 74 },
];

export const geos: Geo[] = [
  { code: "US", name: "United States", flag: "🇺🇸", delivered: 420, deliveryRate: 94, readRate: 58, replyRate: 19, completionRate: 72, revenue: 6200 },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧", delivered: 260, deliveryRate: 96, readRate: 71, replyRate: 28, completionRate: 81, revenue: 3100 },
  { code: "IN", name: "India", flag: "🇮🇳", delivered: 190, deliveryRate: 78, readRate: 46, replyRate: 11, completionRate: 48, revenue: 1400 },
  { code: "BR", name: "Brazil", flag: "🇧🇷", delivered: 95, deliveryRate: 85, readRate: 52, replyRate: 15, completionRate: 62, revenue: 780 },
  { code: "AU", name: "Australia", flag: "🇦🇺", delivered: 35, deliveryRate: 92, readRate: 66, replyRate: 22, completionRate: 74, revenue: 320 },
  { code: "DE", name: "Germany", flag: "🇩🇪", delivered: 20, deliveryRate: 90, readRate: 54, replyRate: 16, completionRate: 70, revenue: 200 },
];

export const templates: Template[] = [
  { id: "tpl_welcome_v1", name: "Welcome_loyalty v1", category: "Marketing", language: "English (US)", sent: 1800, readRate: 57, replyRate: 18, revenue: 6200 },
  { id: "tpl_welcome_v3", name: "Welcome_loyalty v3", category: "Marketing", language: "English (US)", sent: 1808, readRate: 44, replyRate: 11, revenue: 3900 },
  { id: "tpl_holiday_sale", name: "Holiday_sale", category: "Marketing", language: "English (US)", sent: 1200, readRate: 75, replyRate: 24, revenue: 12000 },
  { id: "tpl_order_conf", name: "Order_confirmation", category: "Utility", language: "Portuguese", sent: 1000, readRate: 60, replyRate: 8, revenue: 1000 },
];

export const flowSteps: FlowStep[] = [
  { id: "step_1", label: "Step 1 — Intro + book CTA", entered: 188, completed: 176, timedOut: 4, avgSeconds: 14 },
  { id: "step_2", label: "Step 2 — Service list", entered: 176, completed: 121, timedOut: 38, avgSeconds: 62 },
  { id: "step_3", label: "Step 3 — Confirm slot", entered: 121, completed: 98, timedOut: 12, avgSeconds: 28 },
  { id: "step_4", label: "Step 4 — Payment", entered: 98, completed: 65, timedOut: 11, avgSeconds: 74 },
];

export const sequencePaths: SequencePath[] = [
  { id: "seq_wa_only", label: "WhatsApp only", steps: ["wa"], conversions: 65, revenue: 3200, fatigue: "low" },
  { id: "seq_email_wa_6h", label: "Email → WhatsApp (6h)", steps: ["email", "wa"], conversions: 88, revenue: 4900, fatigue: "low" },
  { id: "seq_email_wa_48h", label: "Email → WhatsApp (48h)", steps: ["email", "wa"], conversions: 42, revenue: 1800, fatigue: "medium" },
  { id: "seq_wa_sms", label: "WhatsApp → SMS", steps: ["wa", "sms"], conversions: 58, revenue: 2300, fatigue: "medium" },
  { id: "seq_triple", label: "Email → WhatsApp → SMS", steps: ["email", "wa", "sms"], conversions: 49, revenue: 2100, fatigue: "high" },
];

/* 30 recipients matching the Figma table (all "Fredrik Backman, NY, US") */
export const recipients: Recipient[] = Array.from({ length: 30 }).map((_, i) => ({
  id: `rec_${i}`,
  phone: "+1 778 667-5893",
  firstName: "Fredrik",
  lastName: "Backman",
  location: "NY, US",
  clicks: 3,
  delivered: i % 4 === 2,
}));
