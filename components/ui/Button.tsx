import { cn } from "@/lib/utils";
import * as React from "react";

type Variant = "primary" | "secondary" | "ghost" | "link";
type Size = "sm" | "md";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClass: Record<Variant, string> = {
  primary:
    "bg-[color:var(--mc-cta)] text-white hover:bg-[color:var(--mc-cta-hover)]",
  secondary:
    "border border-[color:var(--mc-border-strong)] bg-[color:var(--mc-surface)] text-[color:var(--mc-text-primary)] hover:bg-[color:var(--mc-subtle)]",
  ghost:
    "bg-transparent text-[color:var(--mc-text-primary)] hover:bg-[color:var(--mc-subtle)]",
  link:
    "bg-transparent text-[color:var(--mc-link)] hover:underline p-0 h-auto",
};

const sizeClass: Record<Size, string> = {
  sm: "h-8 px-3 text-[12px] rounded-md",
  md: "h-9 px-4 text-[13px] rounded-md",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "secondary", size = "md", className, ...rest }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[color:var(--mc-link)] disabled:opacity-50 disabled:pointer-events-none",
        variantClass[variant],
        variant !== "link" && sizeClass[size],
        className
      )}
      {...rest}
    />
  )
);
Button.displayName = "Button";
