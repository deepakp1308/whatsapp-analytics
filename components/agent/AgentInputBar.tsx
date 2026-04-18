"use client";
import { forwardRef, useState } from "react";
import { Plus, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  placeholder?: string;
  /** Called with the trimmed text when the user presses Enter. */
  onSubmit: (text: string) => void;
  /** Optional handler for the "+" add-context button. Stub for the prototype. */
  onAdd?: () => void;
  /** Optional handler for the mic button. Stub for the prototype. */
  onMic?: () => void;
  /** Hide the disclaimer line. Default is to show it. */
  hideDisclaimer?: boolean;
  className?: string;
};

/**
 * Agent-style input pill with a shimmering Mailchimp-palette gradient border,
 * a circular "+" on the left and a mic on the right, and a legal/privacy
 * disclaimer beneath. Used at the bottom of the conversation canvas.
 *
 * The gradient lives on the outer wrapper; an inner white pill masks the
 * center. `mc-ai-gradient` handles the animation via globals.css.
 */
export const AgentInputBar = forwardRef<HTMLInputElement, Props>(
  function AgentInputBar(
    {
      placeholder = "Ask anything",
      onSubmit,
      onAdd,
      onMic,
      hideDisclaimer = false,
      className,
    },
    ref
  ) {
    const [value, setValue] = useState("");

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      const trimmed = value.trim();
      if (!trimmed) return;
      onSubmit(trimmed);
      setValue("");
    }

    return (
      <div className={cn("w-full", className)}>
        <form
          onSubmit={handleSubmit}
          aria-label="Ask the agent"
          className="mc-ai-gradient rounded-full p-[1.5px] shadow-[var(--mc-shadow-sm)]"
        >
          <div className="flex h-12 items-center gap-2 rounded-full bg-[color:var(--mc-surface)] pl-2 pr-3">
            <button
              type="button"
              onClick={onAdd}
              aria-label="Add context"
              title="Add context"
              className="grid h-8 w-8 place-items-center rounded-full bg-[color:var(--mc-subtle)] text-[color:var(--mc-text-secondary)] transition-colors hover:bg-[color:var(--mc-border)] hover:text-[color:var(--mc-text-primary)]"
            >
              <Plus className="h-4 w-4" />
            </button>

            <input
              ref={ref}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder={placeholder}
              aria-label="Message the agent"
              className="h-full flex-1 border-0 bg-transparent text-[14px] text-[color:var(--mc-text-primary)] placeholder:text-[color:var(--mc-text-tertiary)] focus:outline-none focus:ring-0"
            />

            <button
              type="button"
              onClick={onMic}
              aria-label="Dictate (coming soon)"
              title="Dictate"
              className="grid h-8 w-8 place-items-center rounded-full text-[color:var(--mc-text-secondary)] transition-colors hover:bg-[color:var(--mc-subtle)] hover:text-[color:var(--mc-text-primary)]"
            >
              <Mic className="h-4 w-4" />
            </button>
          </div>
        </form>

        {!hideDisclaimer && (
          <p className="mt-2 text-center text-[11px] leading-[16px] text-[color:var(--mc-text-tertiary)]">
            Mailchimp Intelligence can make mistakes. Mailchimp protects privacy
            and adheres to responsible AI principles.{" "}
            <a
              href="https://mailchimp.com/legal/privacy/"
              target="_blank"
              rel="noreferrer"
              className="text-[color:var(--mc-link)] hover:underline"
            >
              How we use AI.
            </a>
          </p>
        )}
      </div>
    );
  }
);
