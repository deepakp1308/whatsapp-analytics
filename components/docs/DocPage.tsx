import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, FileText, ExternalLink } from "lucide-react";

type Props = {
  /** Markdown body. */
  markdown: string;
  /** Page title surfaced in the browser header + meta context (e.g. "Executive brief"). */
  kicker?: string;
  /** Link to the source .md on GitHub so execs can verify provenance. */
  sourceUrl?: string;
};

/**
 * Renders a markdown document with Mailchimp-styled typography, tables,
 * code, and block elements. Used for publishing docs/*.md as navigable
 * pages on the GitHub Pages build.
 */
export function DocPage({ markdown, kicker = "Document", sourceUrl }: Props) {
  return (
    <div className="mx-auto max-w-[920px] px-6 pb-24 pt-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--mc-border)] pb-5">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[12px] font-medium text-[color:var(--mc-text-secondary)] hover:text-[color:var(--mc-text-primary)]"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to gallery
        </Link>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] px-2.5 py-1 text-[11px] font-medium text-[color:var(--mc-text-secondary)]">
            <FileText className="h-3 w-3 text-[color:var(--mc-link)]" />
            {kicker}
          </span>
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-[color:var(--mc-link)] hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              View source on GitHub
            </a>
          )}
        </div>
      </header>

      <article className="doc-prose">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: (props) => (
              <h1
                className="mt-0 mb-2 text-[28px] font-semibold leading-[34px] tracking-[-0.01em] text-[color:var(--mc-text-peppercorn)]"
                {...props}
              />
            ),
            h2: (props) => (
              <h2
                className="mt-10 mb-3 border-b border-[color:var(--mc-border)] pb-2 text-[20px] font-semibold leading-7 text-[color:var(--mc-text-peppercorn)]"
                {...props}
              />
            ),
            h3: (props) => (
              <h3
                className="mt-8 mb-2 text-[16px] font-semibold leading-6 text-[color:var(--mc-text-peppercorn)]"
                {...props}
              />
            ),
            h4: (props) => (
              <h4
                className="mt-6 mb-1.5 text-[13px] font-semibold uppercase tracking-wide text-[color:var(--mc-text-tertiary)]"
                {...props}
              />
            ),
            p: (props) => (
              <p
                className="mb-3 text-[14px] leading-[22px] text-[color:var(--mc-text-primary)]"
                {...props}
              />
            ),
            a: ({ href, ...rest }) => (
              <a
                href={href}
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel={href?.startsWith("http") ? "noreferrer" : undefined}
                className="text-[color:var(--mc-link)] underline-offset-2 hover:underline"
                {...rest}
              />
            ),
            strong: (props) => (
              <strong className="font-semibold text-[color:var(--mc-text-peppercorn)]" {...props} />
            ),
            em: (props) => <em className="italic" {...props} />,
            ul: (props) => (
              <ul
                className="mb-4 ml-5 list-disc space-y-1.5 text-[14px] leading-[22px] text-[color:var(--mc-text-primary)] marker:text-[color:var(--mc-text-tertiary)]"
                {...props}
              />
            ),
            ol: (props) => (
              <ol
                className="mb-4 ml-5 list-decimal space-y-1.5 text-[14px] leading-[22px] text-[color:var(--mc-text-primary)] marker:text-[color:var(--mc-text-tertiary)]"
                {...props}
              />
            ),
            blockquote: (props) => (
              <blockquote
                className="my-4 border-l-4 border-[color:var(--mc-opportunity)] bg-[color:var(--mc-opportunity-bg)]/40 px-4 py-3 text-[14px] italic leading-[22px] text-[color:var(--mc-text-peppercorn)]"
                {...props}
              />
            ),
            hr: () => (
              <hr className="my-8 border-0 border-t border-[color:var(--mc-border)]" />
            ),
            code: ({ className, children, ...rest }) => {
              const inline = !className;
              if (inline) {
                return (
                  <code
                    className="rounded bg-[color:var(--mc-subtle)] px-1.5 py-0.5 text-[12px] font-mono text-[color:var(--mc-text-peppercorn)] ring-1 ring-[color:var(--mc-border)]"
                    {...rest}
                  >
                    {children}
                  </code>
                );
              }
              return (
                <code className={className} {...rest}>
                  {children}
                </code>
              );
            },
            pre: (props) => (
              <pre
                className="mb-4 overflow-x-auto rounded-lg border border-[color:var(--mc-border)] bg-[color:var(--mc-subtle)] p-4 text-[12px] leading-[18px] text-[color:var(--mc-text-primary)]"
                {...props}
              />
            ),
            table: (props) => (
              <div className="mb-5 overflow-x-auto rounded-lg border border-[color:var(--mc-border)]">
                <table
                  className="w-full border-collapse text-[12px] leading-[18px]"
                  {...props}
                />
              </div>
            ),
            thead: (props) => (
              <thead
                className="border-b border-[color:var(--mc-border)] bg-[color:var(--mc-subtle)]"
                {...props}
              />
            ),
            th: (props) => (
              <th
                className="border-b border-[color:var(--mc-border)] px-3 py-2 text-left align-top font-semibold text-[color:var(--mc-text-peppercorn)]"
                {...props}
              />
            ),
            tr: (props) => (
              <tr
                className="border-b border-[color:var(--mc-border)] last:border-b-0 even:bg-[color:var(--mc-subtle)]/30"
                {...props}
              />
            ),
            td: (props) => (
              <td
                className="px-3 py-2 align-top text-[color:var(--mc-text-primary)]"
                {...props}
              />
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </article>
    </div>
  );
}
