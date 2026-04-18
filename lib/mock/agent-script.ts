import type { AgentTurn } from "../types";

/**
 * Pre-authored agent conversation mapped 1:1 to the five jobs-to-be-done
 * from the spec (section 5.5). Each turn reuses insight objects so there
 * is one source of truth across cards, chips, and the agent canvas.
 */
export const agentScript: AgentTurn[] = [
  {
    id: "turn_1",
    role: "agent",
    job: 1,
    content:
      "You are above average on **read rate** (55%, +14% vs peer) and below average on **conversion** (5.4%). The biggest value leak is **Flow Step 2** for new customers in India.",
    insightId: "ins_step2_bottleneck",
    evidence: [
      { id: "ev_kpi_scorecard", kind: "table", title: "Health scorecard" },
      { id: "ev_flow_funnel", kind: "funnel", title: "Flow funnel" },
    ],
    followUps: [
      "Why is conversion soft?",
      "Show the biggest flow drop",
      "What's the fastest lever to improve revenue?",
    ],
  },
  {
    id: "turn_2",
    role: "agent",
    job: 2,
    content:
      "**New customers in India time out at Step 2** after tapping the service-list option. Concentrated in **Template Version 3** — the translated list ordering puts pricier services first, which triggers abandonment. 52% timeout rate here vs 22% campaign average.",
    insightId: "ins_step2_segment",
    evidence: [
      { id: "ev_seg_matrix", kind: "segment-matrix", title: "Completion by segment & geo" },
      { id: "ev_flow_funnel", kind: "funnel", title: "Flow funnel" },
    ],
    followUps: [
      "Compare new vs repeat",
      "Show me why India is different",
      "Which template version is worst?",
    ],
  },
  {
    id: "turn_3",
    role: "agent",
    job: 3,
    content:
      "I recommend three moves, ordered by expected lift:\n\n1. **Shorten Step 2** to 3 options — est. +8% conversion\n2. **Shift email→WhatsApp gap from 48h to 6h** for new customers — est. +$2,300 revenue\n3. **Route high-intent pricing replies to human assist** — reduces handoff delay and reclaims 14% of unresolved\n\nShall I stage all three as an A/B for 7 days?",
    insightId: "ins_best_next_action",
    evidence: [
      { id: "ev_seq_compare", kind: "bar", title: "Sequence conversion" },
      { id: "ev_optout_freq", kind: "bar", title: "Opt-out by frequency" },
    ],
    actions: [
      {
        kind: "launch-experiment",
        label: "Stage A/B on all three",
        description: "50/50 split, 7 days. Primary metric: conversion rate.",
      },
      {
        kind: "adjust-cadence",
        label: "Only shift cadence",
        description: "Shorten email→WhatsApp gap to 6h for new customers.",
      },
      {
        kind: "swap-template",
        label: "Only test Step 2",
        description: "Publish a 3-option version of Step 2.",
      },
    ],
    followUps: [
      "Build me a test plan",
      "Simulate the combined impact",
      "What are the risks?",
    ],
  },
  {
    id: "turn_4",
    role: "agent",
    job: 4,
    content:
      "**Watch signal** — phone-number quality rating has trended down for 3 days (96 → 92). If it crosses 90 your messaging-limit tier drops and cost per delivered rises ~20%. Main driver is invalid India numbers bouncing.",
    insightId: "ins_quality_trend",
    evidence: [{ id: "ev_quality_trend", kind: "trend", title: "Quality trend" }],
    actions: [
      {
        kind: "save-watchlist",
        label: "Add quality to watchlist",
        description: "I'll nudge you if quality drops below 90.",
      },
      {
        kind: "create-segment",
        label: "Create IN cleanup segment",
        description: "Segment India failures and route to a re-opt-in flow.",
      },
    ],
    followUps: [
      "What else is at risk?",
      "Forecast the cost impact if it continues",
    ],
  },
  {
    id: "turn_5",
    role: "agent",
    job: 5,
    content:
      "**Maximize revenue** — repeat customers convert best with **WhatsApp-only** (simple, fast). New customers convert best with **email then WhatsApp within 6h** (trust, then urgency). Apply both and your projected monthly lift is **$6,400**.",
    insightId: "ins_sequence_winner",
    evidence: [
      { id: "ev_seq_compare", kind: "bar", title: "Sequence conversion" },
      { id: "ev_rev_segment", kind: "bar", title: "Revenue by segment" },
    ],
    actions: [
      {
        kind: "shift-channel-mix",
        label: "Apply segment-specific sequencing",
        description: "Repeat → WA only. New → Email+WA (6h).",
      },
    ],
    followUps: ["What does the monthly plan look like?", "Proactive alerts I should turn on?"],
  },
];
