# WhatsApp Analytics — Mailchimp Prototype

A clickable prototype of Mailchimp's WhatsApp Reporting & Analytics built as **three UX patterns over one shared foundation**:

- **Classic** — familiar dashboard + campaign report with 8 diagnostic tabs
- **Smart** — same hero, but the 8 tabs collapse into AI sparkle chips with right-rail drill-downs
- **Agent** — conversational canvas with scripted turns that cover the 5 jobs-to-be-done, with an evidence rail for supporting visuals

All three plans read from **one insight registry** (`lib/mock/insights.ts`) so the same campaign reads three ways without drifting.

## Design system

The Mailchimp tokens in `lib/tokens.ts` and `app/globals.css` were captured directly from the Figma file `WhatsApp (Analytics)` (fileKey `oVVMotC92NoabJa6hBW3cp`) via the Figma REST API on 2026-04-18. Colors, typography, and radii come from actual rendered node fills in the Mailchimp Light theme.

- **Cavendish Yellow** `#FFE01B`, peppercorn text `#241C15`, primary text `#21262A`, CTA teal `#007C89`, link `#2B77CC`
- Severity system: **healthy / watch / opportunity / action-needed**
- Font: `Graphik Mailchimp` is proprietary — public prototype uses **Inter** with Graphik listed first so Mailchimp-internal users see the real font.

## Quick start

```bash
npm install
npm run dev
# open http://localhost:3000/whatsapp/dashboard
```

## Deploy

```bash
npm install -g vercel
vercel login
vercel --prod
```

The app is a standard Next.js 16 project with no environment variables, so `vercel --prod` from the repo root will deploy it as-is. The Mailchimp tokens live in client-readable CSS variables; no secrets ship in the bundle.

## Routes

| Route | Plan |
| ----- | ---- |
| `/whatsapp/dashboard` | Portfolio view (all campaigns) — Plan 1 surface 1 |
| `/whatsapp/report/cmp_welcome_wa` | Classic campaign report with 10 tabs — Plan 1 surface 2 |
| `/whatsapp/report/cmp_welcome_wa/insights` | Smart mode (chips + right rail) — Plan 2 |
| `/whatsapp/report/cmp_welcome_wa/agent` | Agent mode (conversation + evidence rail) — Plan 3 |

Use the `Classic / Smart / Agent` segmented control at the top of any report page to flip between plans on the same campaign.

## Demo script (Loom-ready, 4 minutes)

1. **Dashboard** (30s) — Walk through filter bar, KPI strip (flip the lens switcher to show the same card slots morph between Business / Engagement / Conversation / Cost), portfolio trend, adaptive funnel, three AI summary cards.
2. **Classic report** (60s) — Open the Welcome-message campaign. Scroll the Overview tab (matches the provided Figma screenshot). Click Recipients to show the table with pagination and Export. Hop to Flows & tasks to show the adaptive funnel with severity + step diagnostics. Finish in Recommendations.
3. **Smart mode** (60s) — Same hero and KPIs. Point out the AI narrative strip. Click a chip like "Where is the biggest flow drop?" — right rail opens with plain-language summary, evidence, follow-up prompts, and a staged action. Follow the chain with one follow-up to show that every answer leads to the next question or an action.
4. **Agent mode** (90s) — Proactive alert banner at the top. Objective bar. Agent types 5 turns that walk the 5 jobs-to-be-done (is it working / why not / what to do / avoid future issues / maximize revenue). Click a follow-up chip to show the agent responding to a new question with a grounded insight. Point out the persistent evidence rail.

## Architecture

- **Next.js 16 App Router** + TypeScript + Tailwind CSS v4
- **Recharts** for charts (theme overrides via token CSS vars)
- **lucide-react** for icons
- Mock data lives in `lib/mock/*.ts` — swap for real APIs by replacing the imports; component contracts don't change

```
app/
├── layout.tsx                      # yellow strip + top bar + left nav
├── page.tsx                        # -> /whatsapp/dashboard
└── whatsapp/
    ├── dashboard/page.tsx          # Plan 1 portfolio
    └── report/[campaignId]/
        ├── page.tsx                # Plan 1 report (10 tabs)
        ├── insights/page.tsx       # Plan 2 smart mode
        └── agent/page.tsx          # Plan 3 agent mode

components/
├── shell/             # YellowStrip, TopBar, LeftNav, PlanSwitcher, FreddieLogo
├── filters/           # FilterBar
├── kpi/               # KpiCard, KpiStrip, LensSwitcher
├── cards/             # Card, CampaignHero, AdaptiveFunnel, InsightCard, RecommendationCard, SeverityBadge, AINarrative
├── charts/            # TrendChart, BarChart
├── tables/            # RankedTable, RecipientsTable
├── chips/             # SparkleChip, ChipGroup
├── rail/              # RightRail, EvidencePanel, ActionComposer
├── agent/             # ObjectiveBar, HealthScorecard, ConversationCanvas, AgentTurn, EvidenceRail
├── report/            # ReportTabs + 9 tab components
└── ui/                # Button, Pill, Tabs, Toast

lib/
├── tokens.ts          # Mailchimp tokens from Figma
├── types.ts           # Insight, Campaign, Metric, Action, Segment, Geo, ...
├── semantic.ts        # formatKpi, rate, severityFromDelta, annotateFunnel, ...
├── utils.ts           # cn, formatNumber, formatCurrency
└── mock/              # campaigns, metrics, catalog, insights, agent-script
```

## Known trade-offs

- **Graphik Mailchimp** is proprietary — prototype renders Inter as a near-match fallback.
- Charts use Recharts with theme overrides rather than hand-rolled SVG.
- The agent in Plan 3 is **scripted, not LLM-powered**. `lib/mock/agent-script.ts` is designed to be swapped for an LLM response stream later. `AgentTurn` already accepts streamed content; the Insight-object schema is how the LLM would be grounded.
- Below-fold tabs in Plan 1 (Delivery & quality, Interaction & conversation, Audience & geo, Cross channel) get functional layouts but do not match the full pixel-level Figma density; flagged for the design spec.

## Paired with

`docs/design-spec.md` — detailed design spec (Output B) covering tokens, component inventory, insight schema, metric-universe coverage matrix, API contracts, route map, and build sequencing recommendation.
