import Link from "next/link";
import { notFound } from "next/navigation";
import { campaigns, getCampaign } from "@/lib/mock/campaigns";

export function generateStaticParams() {
  return campaigns.map((c) => ({ campaignId: c.id }));
}
import { ObjectiveBar } from "@/components/agent/ObjectiveBar";
import { ConversationCanvas } from "@/components/agent/ConversationCanvas";
import { EvidenceRail } from "@/components/agent/EvidenceRail";
import { PlanSwitcher } from "@/components/shell/PlanSwitcher";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import { Bell } from "lucide-react";

export default async function AgentPage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = await params;
  const campaign = getCampaign(campaignId);
  if (!campaign) notFound();

  return (
    <div className="px-6 pb-10 pt-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/whatsapp/dashboard"
            className="mc-small hover:text-[color:var(--mc-text-primary)]"
          >
            ← All campaigns
          </Link>
          <h1 className="mc-h-page">WhatsApp report — Agent mode</h1>
        </div>
        <div className="flex items-center gap-3">
          <PlanSwitcher campaignId={campaign.id} />
          <Button variant="secondary" size="sm">
            View campaign
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Card className="flex items-center gap-3 border-l-4 border-l-[color:var(--mc-attention)] bg-[color:var(--mc-attention-bg)]/40 p-3 px-4">
          <Bell className="h-4 w-4 shrink-0 text-[color:var(--mc-attention)]" />
          <p className="flex-1 text-[13px] text-[color:var(--mc-text-primary)]">
            <strong className="font-semibold text-[color:var(--mc-text-peppercorn)]">
              Proactive alert:
            </strong>{" "}
            Flow Step 2 timeout rose to 31% — concentrated in new customers in India. Agent has staged a fix for your review.
          </p>
          <Button variant="ghost" size="sm">
            Dismiss
          </Button>
        </Card>

        <ObjectiveBar
          objective="Improve abandoned-cart recovery revenue from WhatsApp in India and the UK."
          campaign={campaign.name}
          dateRange="Last 30 days"
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
          <ConversationCanvas />
          <EvidenceRail />
        </div>
      </div>
    </div>
  );
}
