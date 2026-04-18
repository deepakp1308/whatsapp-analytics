import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";

type Column<T> = {
  id: string;
  label: string;
  render: (row: T) => React.ReactNode;
  align?: "left" | "right" | "center";
  sortable?: boolean;
};

type Props<T> = {
  columns: Column<T>[];
  rows: T[];
  keyFn: (row: T) => string;
  dense?: boolean;
};

export function RankedTable<T>({ columns, rows, keyFn, dense }: Props<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-[color:var(--mc-border)]">
            {columns.map((c) => (
              <th
                key={c.id}
                className={cn(
                  "py-2.5 px-3 text-[11px] font-medium uppercase tracking-wide text-[color:var(--mc-text-tertiary)]",
                  c.align === "right" && "text-right",
                  c.align === "center" && "text-center",
                  c.align !== "right" && c.align !== "center" && "text-left"
                )}
              >
                <span className="inline-flex items-center gap-1">
                  {c.label}
                  {c.sortable && (
                    <ArrowUpDown className="h-3 w-3 text-[color:var(--mc-text-tertiary)]" />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={keyFn(row)}
              className="border-b border-[color:var(--mc-border)] last:border-b-0 hover:bg-[color:var(--mc-subtle)]"
            >
              {columns.map((c) => (
                <td
                  key={c.id}
                  className={cn(
                    "px-3 text-[color:var(--mc-text-primary)]",
                    dense ? "py-2" : "py-3",
                    c.align === "right" && "text-right tabular-nums",
                    c.align === "center" && "text-center"
                  )}
                >
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
