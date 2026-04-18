import type { Metadata } from "next";
import { DocPage } from "@/components/docs/DocPage";
import { loadDoc } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Executive Brief — WhatsApp Intelligence Domains",
};

export default function ExecutiveBriefPage() {
  const { markdown, sourceUrl } = loadDoc("executive-brief.md");
  return <DocPage markdown={markdown} kicker="Executive brief" sourceUrl={sourceUrl} />;
}
