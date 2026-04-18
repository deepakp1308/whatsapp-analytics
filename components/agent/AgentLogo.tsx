import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Agent mark used across every agent-mode surface: conversation avatars,
 * plan switcher, gallery, variant switcher. Wraps the Mailchimp agent PNG
 * in `/public/agent-logo.png` so Next.js handles basePath correctly in
 * the static export.
 *
 * The image is rendered on a transparent disc so tiny sizes keep circular
 * contact against any background. For >=24px we skip the backdrop and
 * let the mark breathe.
 */
type Props = {
  /** Pixel size. The component picks the right container so the mark
   *  always reads. */
  size?: number;
  className?: string;
  /** Wrap the mark in a circular colored backdrop. Default true at small
   *  sizes, false at larger ones. */
  disc?: boolean;
  alt?: string;
};

export function AgentLogo({ size = 24, className, disc, alt = "Agent" }: Props) {
  const withDisc = disc ?? size <= 24;
  // Render a slightly smaller image inside the disc so the art doesn't clip.
  const artSize = withDisc ? Math.round(size * 0.8) : size;

  if (withDisc) {
    return (
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-full bg-[color:var(--mc-subtle)] ring-1 ring-[color:var(--mc-border)]",
          className
        )}
        style={{ width: size, height: size }}
        aria-label={alt}
        role="img"
      >
        <Image
          src="/agent-logo.png"
          alt=""
          width={artSize}
          height={artSize}
          aria-hidden="true"
          className="object-contain"
        />
      </span>
    );
  }

  return (
    <Image
      src="/agent-logo.png"
      alt={alt}
      width={artSize}
      height={artSize}
      className={cn("object-contain shrink-0", className)}
    />
  );
}
