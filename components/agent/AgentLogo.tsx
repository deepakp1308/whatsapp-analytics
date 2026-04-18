import { cn } from "@/lib/utils";

/**
 * Agent mark used across every agent-mode surface: conversation avatars,
 * plan switcher, gallery, variant switcher. Loads `public/agent-logo.png`.
 *
 * Note: Next.js 16 static export with `images.unoptimized: true` does NOT
 * auto-prefix basePath onto next/image src. We bypass next/image and use a
 * plain <img> with the basePath prefixed manually, so the file resolves
 * correctly under /whatsapp-analytics/ on GitHub Pages and at `/` in dev.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const LOGO_SRC = `${BASE_PATH}/agent-logo.png`;

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO_SRC}
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
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SRC}
      alt={alt}
      width={artSize}
      height={artSize}
      className={cn("object-contain shrink-0", className)}
    />
  );
}
