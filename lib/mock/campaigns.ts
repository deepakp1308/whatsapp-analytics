import type { Campaign } from "../types";

export const campaigns: Campaign[] = [
  {
    id: "cmp_welcome_wa",
    name: "Welcome message",
    status: "sent",
    sentAt: "2024-12-11T09:30:00Z",
    sender: "+44 2071 238775",
    audience: "Brooklyn Salon members",
    audienceSize: 3608,
    creditsUsed: 3608,
    messagePreview:
      "Thanks for joining our loyalty program! You're one step closer to the best hair care in NYC 💇‍♀️✨ Book now\nText STOP to opt out",
    messageType: "WhatsApp",
  },
  {
    id: "cmp_abandoned_cart",
    name: "Abandoned cart recovery",
    status: "sent",
    sentAt: "2024-12-08T14:15:00Z",
    sender: "+44 2071 238775",
    audience: "High-intent repeat customers",
    audienceSize: 12450,
    creditsUsed: 12450,
    messagePreview:
      "Still thinking it over? Your cart is saved. Complete your order and we'll add 10% off 🎉",
    messageType: "WhatsApp",
  },
  {
    id: "cmp_holiday_sale",
    name: "Holiday sale announcement",
    status: "sent",
    sentAt: "2024-12-01T10:00:00Z",
    sender: "+44 2071 238775",
    audience: "All subscribers — US, UK, IN",
    audienceSize: 48900,
    creditsUsed: 48900,
    messagePreview: "Our biggest sale of the year just started. Up to 40% off through Sunday.",
    messageType: "WhatsApp",
  },
];

export const currentCampaignId = "cmp_welcome_wa";

export function getCampaign(id: string) {
  return campaigns.find((c) => c.id === id) ?? campaigns[0];
}
