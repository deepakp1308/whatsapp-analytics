import type { Metadata } from "next";
import { DocPage } from "@/components/docs/DocPage";
import { loadDoc } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Competitive Analysis — Mailchimp vs Market",
};

export default function CompetitiveAnalysisPage() {
  const { markdown, sourceUrl } = loadDoc("competitive-analysis.md");
  return <DocPage markdown={markdown} kicker="Competitive analysis" sourceUrl={sourceUrl} />;
}
