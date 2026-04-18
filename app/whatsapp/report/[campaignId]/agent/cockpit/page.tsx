import Link from "next/link";
import { notFound } from "next/navigation";
import { campaigns, getCampaign } from "@/lib/mock/campaigns";
import { PlanSwitcher } from "@/components/shell/PlanSwitcher";
import { LayoutVariantSwitcher } from "@/components/agent/layouts/LayoutVariantSwitcher";
import { CockpitWorkspace } from "@/components/agent/layouts/cockpit/CockpitWorkspace";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return campaigns.map((c) => ({ campaignId: c.id }));
}

export default async function AgentCockpitPage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = await params;
  const campaign = getCampaign(campaignId);
  if (!campaign) notFound();

  return (
    <div className="px-6 pb-4 pt-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/whatsapp/dashboard"
            className="mc-small hover:text-[color:var(--mc-text-primary)]"
          >
            ← All campaigns
          </Link>
          <h1 className="mc-h-page">WhatsApp report — Agent · Cockpit</h1>
        </div>
        <div className="flex items-center gap-3">
          <LayoutVariantSwitcher campaignId={campaign.id} current="cockpit" />
          <PlanSwitcher campaignId={campaign.id} />
          <Button variant="secondary" size="sm">
            View campaign
          </Button>
        </div>
      </div>

      <CockpitWorkspace campaignName={campaign.name} />
    </div>
  );
}
