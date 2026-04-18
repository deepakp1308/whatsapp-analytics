"use client";
import { useState } from "react";
import { Card } from "@/components/cards/Card";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Check, ChevronLeft, ChevronRight, Download, HelpCircle, ChevronDown } from "lucide-react";
import { recipients as allRecipients } from "@/lib/mock/catalog";
import { formatNumber } from "@/lib/utils";

export function RecipientsTable() {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(allRecipients.length / pageSize);
  const rows = allRecipients.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Card>
      <div className="flex items-center justify-between gap-4 px-6 py-4">
        <h3 className="text-[16px] font-semibold text-[color:var(--mc-text-peppercorn)]">
          Recipient details
        </h3>
        <Button variant="primary" size="sm">
          <Download className="h-3.5 w-3.5" />
          Export
        </Button>
      </div>
      <div className="flex items-center gap-3 border-t border-[color:var(--mc-border)] px-6 py-3">
        <button
          type="button"
          className="inline-flex h-7 items-center gap-1.5 rounded-md border border-[color:var(--mc-border-strong)] bg-[color:var(--mc-surface)] px-2.5 text-[12px]"
        >
          <span className="text-[color:var(--mc-text-secondary)]">Message status:</span>
          <span className="font-medium text-[color:var(--mc-link)]">Sent (100)</span>
          <ChevronDown className="h-3.5 w-3.5 text-[color:var(--mc-text-tertiary)]" />
        </button>
      </div>
      <div className="overflow-x-auto border-t border-[color:var(--mc-border)]">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-[color:var(--mc-border)] text-left">
              <Th>Phone number</Th>
              <Th>First name</Th>
              <Th>Last name</Th>
              <Th>Location</Th>
              <Th align="right">Clicks</Th>
              <Th>
                Delivered{" "}
                <HelpCircle className="ml-1 inline-block h-3 w-3 text-[color:var(--mc-text-tertiary)]" />
              </Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="border-b border-[color:var(--mc-border)] last:border-b-0 hover:bg-[color:var(--mc-subtle)]"
              >
                <Td>{r.phone}</Td>
                <Td>{r.firstName}</Td>
                <Td>{r.lastName}</Td>
                <Td>{r.location}</Td>
                <Td align="right">{r.clicks}</Td>
                <Td>
                  {r.delivered ? (
                    <Pill tone="positive">
                      <Check className="h-2.5 w-2.5" />
                      Yes
                    </Pill>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-[color:var(--mc-text-secondary)]">
                      <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[color:var(--mc-subtle)] text-[color:var(--mc-text-tertiary)]">
                        <span className="h-0.5 w-2 rounded bg-current" />
                      </span>
                      No
                    </span>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end gap-3 border-t border-[color:var(--mc-border)] px-6 py-3 text-[12px] text-[color:var(--mc-text-secondary)]">
        <span>
          View: <button className="inline-flex items-center gap-0.5 font-medium text-[color:var(--mc-link)]">10 rows <ChevronDown className="h-3 w-3" /></button>
        </span>
        <div className="mx-2 flex items-center gap-1">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            className="grid h-6 w-6 place-items-center rounded hover:bg-[color:var(--mc-subtle)]"
            aria-label="First page"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <ChevronLeft className="-ml-2 h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            className="grid h-6 w-6 place-items-center rounded hover:bg-[color:var(--mc-subtle)]"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <span className="px-2 font-medium text-[color:var(--mc-text-primary)]">{page}</span>
          <span>of {formatNumber(Math.max(1, totalPages))}</span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            className="grid h-6 w-6 place-items-center rounded hover:bg-[color:var(--mc-subtle)]"
            aria-label="Next page"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setPage(totalPages)}
            className="grid h-6 w-6 place-items-center rounded hover:bg-[color:var(--mc-subtle)]"
            aria-label="Last page"
          >
            <ChevronRight className="h-3.5 w-3.5" />
            <ChevronRight className="-ml-2 h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </Card>
  );
}

function Th({
  children,
  align,
}: {
  children: React.ReactNode;
  align?: "right";
}) {
  return (
    <th
      className={`px-6 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[color:var(--mc-text-tertiary)] ${
        align === "right" ? "text-right" : ""
      }`}
    >
      {children}
    </th>
  );
}
function Td({
  children,
  align,
}: {
  children: React.ReactNode;
  align?: "right";
}) {
  return (
    <td
      className={`px-6 py-3 text-[color:var(--mc-text-primary)] ${
        align === "right" ? "text-right tabular-nums" : ""
      }`}
    >
      {children}
    </td>
  );
}
