import type { Campaign } from "@/lib/types";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { Card } from "./Card";
import { formatNumber } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

function formatSentOn(iso: string) {
  const d = new Date(iso);
  return `Sent on ${d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} at ${d.toLocaleTimeString(
    "en-US",
    { hour: "numeric", minute: "2-digit" }
  )}`;
}

export function CampaignHero({ campaign }: { campaign: Campaign }) {
  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Pill tone="positive">
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <path
                  d="M2 5l2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Sent
            </Pill>
            <span className="mc-small">{formatSentOn(campaign.sentAt)}</span>
          </div>
          <h1 className="mc-h-hero">{campaign.name}</h1>
          <div className="mt-1 text-[20px] leading-7 text-[color:var(--mc-text-secondary)]">
            {formatNumber(campaign.audienceSize)} recipients
          </div>

          <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[13px]">
            <dt className="text-[color:var(--mc-text-secondary)]">Sent from</dt>
            <dd className="text-[color:var(--mc-text-primary)]">{campaign.sender}</dd>
            <dt className="text-[color:var(--mc-text-secondary)]">Audience</dt>
            <dd className="text-[color:var(--mc-text-primary)]">{campaign.audience}</dd>
            <dt className="text-[color:var(--mc-text-secondary)]">Credits used</dt>
            <dd className="text-[color:var(--mc-text-primary)]">{formatNumber(campaign.creditsUsed)}</dd>
          </dl>
        </div>

        <div className="rounded-lg border border-[color:var(--mc-border)] bg-[color:var(--mc-subtle)] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-[color:var(--mc-whatsapp)]">
                <MessageCircle className="h-2.5 w-2.5 text-white" />
              </span>
              <span className="mc-small text-[color:var(--mc-text-primary)]">
                Message type:{" "}
                <span className="font-medium text-[color:var(--mc-text-peppercorn)]">
                  {campaign.messageType}
                </span>
              </span>
            </div>
            <Button variant="link" size="sm">
              View full message
            </Button>
          </div>
          <div className="mt-3 rounded-md bg-[color:var(--mc-surface)] p-3 text-[13px] leading-5 text-[color:var(--mc-text-primary)] shadow-[var(--mc-shadow-sm)]">
            {campaign.messagePreview.split("\n").map((l, i) => (
              <p key={i} className={i > 0 ? "mt-2" : undefined}>
                {l.split("Book now").map((part, idx, arr) =>
                  idx < arr.length - 1 ? (
                    <span key={idx}>
                      {part}
                      <strong>Book now</strong>
                    </span>
                  ) : (
                    part
                  )
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
