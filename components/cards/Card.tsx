import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn(
        "rounded-[12px] border border-[color:var(--mc-border)] bg-[color:var(--mc-surface)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
  className,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 px-6 pt-5 pb-4",
        className
      )}
    >
      <div className="min-w-0">
        <h3 className="mc-h-section truncate">{title}</h3>
        {subtitle && <p className="mc-small mt-1">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
