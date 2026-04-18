"use client";
import { useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import { TabOverview } from "./tabs/TabOverview";
import { TabCampaignPerformance } from "./tabs/TabCampaignPerformance";
import { TabDelivery } from "./tabs/TabDelivery";
import { TabInteraction } from "./tabs/TabInteraction";
import { TabFlows } from "./tabs/TabFlows";
import { TabRevenue } from "./tabs/TabRevenue";
import { TabAudience } from "./tabs/TabAudience";
import { TabCrossChannel } from "./tabs/TabCrossChannel";
import { TabRecommendations } from "./tabs/TabRecommendations";
import { RecipientsTable } from "@/components/tables/RecipientsTable";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "recipients", label: "Recipients" },
  { id: "campaign", label: "Campaign performance" },
  { id: "delivery", label: "Delivery & quality" },
  { id: "interaction", label: "Interaction & conversation" },
  { id: "flows", label: "Flows & tasks" },
  { id: "revenue", label: "Revenue & attribution" },
  { id: "audience", label: "Audience & geo" },
  { id: "cross", label: "Cross channel" },
  { id: "recommendations", label: "Recommendations" },
];

export function ReportTabs() {
  const [tab, setTab] = useState("overview");
  return (
    <div className="mt-6">
      <Tabs tabs={TABS} value={tab} onChange={setTab} />
      <div className="mt-5 mc-fade-in" key={tab}>
        {tab === "overview" && <TabOverview />}
        {tab === "recipients" && <RecipientsTable />}
        {tab === "campaign" && <TabCampaignPerformance />}
        {tab === "delivery" && <TabDelivery />}
        {tab === "interaction" && <TabInteraction />}
        {tab === "flows" && <TabFlows />}
        {tab === "revenue" && <TabRevenue />}
        {tab === "audience" && <TabAudience />}
        {tab === "cross" && <TabCrossChannel />}
        {tab === "recommendations" && <TabRecommendations />}
      </div>
    </div>
  );
}
