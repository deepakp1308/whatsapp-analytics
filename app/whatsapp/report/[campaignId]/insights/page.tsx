import Link from "next/link";
import { notFound } from "next/navigation";
import { campaigns, getCampaign } from "@/lib/mock/campaigns";

export function generateStaticParams() {
  return campaigns.map((c) => ({ campaignId: c.id }));
}
import { FilterBar } from "@/components/filters/FilterBar";
import { CampaignHero } from "@/components/cards/CampaignHero";
import { PlanSwitcher } from "@/components/shell/PlanSwitcher";
import { Button } from "@/components/ui/Button";
import { SmartInsightsView } from "@/components/smart/SmartInsightsView";

export default async function InsightsPage({
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
          <h1 className="mc-h-page">WhatsApp report — Smart mode</h1>
        </div>
        <div className="flex items-center gap-3">
          <PlanSwitcher campaignId={campaign.id} />
          <Button variant="secondary" size="sm">
            View campaign
          </Button>
        </div>
      </div>

      <FilterBar />
      <CampaignHero campaign={campaign} />
      <SmartInsightsView campaignId={campaign.id} />
    </div>
  );
}
