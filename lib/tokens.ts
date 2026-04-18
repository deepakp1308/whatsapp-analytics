/**
 * Mailchimp design tokens — captured 2026-04-18 from the Figma file
 * "WhatsApp (Analytics)" (fileKey oVVMotC92NoabJa6hBW3cp) via the
 * Figma REST API. These values come from actual rendered node fills
 * in the Mailchimp Light theme; the Fusion/Oasis theme layer resolves
 * to these primitives.
 *
 * The CSS custom properties in app/globals.css mirror this file.
 */

export const mcColor = {
  yellow: "#FFE01B",
  whatsapp: "#25D366",

  text: {
    primary: "#21262A",
    secondary: "#5D686F",
    tertiary: "#727E85",
    peppercorn: "#241C15",
    inverse: "#FFFFFF",
    link: "#2B77CC",
  },

  surface: "#FFFFFF",
  page: "#F0F4F6",
  subtle: "#F8FAFB",

  border: {
    DEFAULT: "#E2E9ED",
    strong: "#D5DEE3",
    muted: "#C3CED5",
    quiet: "#ADBAC2",
  },

  cta: {
    DEFAULT: "#007C89",
    hover: "#006670",
  },
  agave: "#017E89",

  positive: { fg: "#00892E", bg: "#DFF5E7" },
  negative: { fg: "#B61A37", bg: "#FDE7EA" },
  attention: { fg: "#2B77CC", bg: "#E0EDFF" },
  opportunity: { fg: "#A275FF", bg: "#EFE8FF" },
  warning: { fg: "#8A6D00", bg: "#FFF4D6" },

  chart: ["#2B77CC", "#00892E", "#A275FF", "#D72792", "#00B3C2", "#95BF47", "#5E8E3E", "#017E89"],
} as const;

export const mcRadius = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  full: 9999,
} as const;

export const mcSpace = [2, 4, 6, 8, 10, 12, 16, 24, 32] as const;

export const mcType = {
  hero: { size: 28, lh: 36, weight: 500 },
  page: { size: 24, lh: 29, weight: 500 },
  section: { size: 20, lh: 28, weight: 500 },
  labelLg: { size: 16, lh: 24, weight: 400 },
  body: { size: 14, lh: 20, weight: 400 },
  small: { size: 13, lh: 20, weight: 500 },
  xsmall: { size: 12, lh: 16, weight: 400 },
  micro: { size: 11, lh: 15, weight: 400 },
  metric: { size: 24, lh: 29, weight: 500 },
} as const;

/** Severity system — drives badges, card accents, agent-alert priority. */
export const mcSeverity = {
  healthy: { fg: mcColor.positive.fg, bg: mcColor.positive.bg, label: "Healthy" },
  watch: { fg: mcColor.attention.fg, bg: mcColor.attention.bg, label: "Watch" },
  opportunity: { fg: mcColor.opportunity.fg, bg: mcColor.opportunity.bg, label: "Opportunity" },
  "action-needed": { fg: mcColor.negative.fg, bg: mcColor.negative.bg, label: "Action needed" },
} as const;

export type Severity = keyof typeof mcSeverity;

/**
 * Semantic chart roles. All charts, funnels, sparklines, and dots should
 * reference these names instead of hex literals so palette tweaks are a
 * one-file change. Every value is derived from `mcColor` above.
 */
export const mcChart = {
  // Series roles, in the order they should be picked for single-line / bar charts
  primary: mcColor.chart[0],        // #2B77CC — Mailchimp blue
  secondary: mcColor.chart[1],      // #00892E — positive green (also used as "conversions" overlay)
  comparison: mcColor.chart[2],     // #A275FF — purple for peer / benchmark comparison
  tertiary: mcColor.chart[4],       // #00B3C2 — cyan accent (SMS, assisted)
  quaternary: mcColor.chart[7],     // #017E89 — agave
  accent: mcColor.chart[3],         // #D72792 — magenta accent

  // Semantic roles
  positive: mcColor.positive.fg,    // #00892E
  negative: mcColor.negative.fg,    // #B61A37
  neutral: mcColor.border.DEFAULT,  // #E2E9ED (inactive bar, "Free" traffic)
  subtle: mcColor.subtle,           // #F8FAFB (chart backdrop)

  /** Channel-specific colors for cross-channel comparisons. */
  channel: {
    whatsapp: mcColor.chart[0],     // #2B77CC
    email: mcColor.chart[2],        // #A275FF
    sms: mcColor.chart[4],          // #00B3C2
  },

  /** Severity-to-bar colour map for funnels & data bars. */
  severity: {
    healthy: mcColor.chart[0],               // blue for healthy bars
    watch: mcColor.attention.fg,             // #2B77CC
    opportunity: mcColor.opportunity.fg,     // #A275FF
    "action-needed": mcColor.negative.fg,    // #B61A37
  } satisfies Record<Severity, string>,

  /** Full categorical palette for when more than 3 series are needed. */
  palette: mcColor.chart,
} as const;

