"use client";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { AgentTurn as AgentTurnType } from "@/lib/types";
import { agentScript } from "@/lib/mock/agent-script";
import { AgentTurn } from "./AgentTurn";
import { Bot, Send } from "lucide-react";
import { Card } from "@/components/cards/Card";
import { insights } from "@/lib/mock/insights";

export type ConversationCanvasHandle = {
  /** Append a user turn + grounded agent reply. Optionally pass a matched insight. */
  submitPrompt: (text: string, preferredInsightId?: string) => void;
};

type Props = {
  onInsightAnswered?: (insightId: string) => void;
  /** Tailwind height class. Defaults to a fixed 560px. Pass `h-full` to fill parent. */
  heightClass?: string;
};

export const ConversationCanvas = forwardRef<ConversationCanvasHandle, Props>(
  function ConversationCanvas({ onInsightAnswered, heightClass = "h-[560px]" }, ref) {
    const [visible, setVisible] = useState<AgentTurnType[]>([]);
    const [queue, setQueue] = useState<AgentTurnType[]>(agentScript);
    const [typing, setTyping] = useState(false);
    const [input, setInput] = useState("");
    const endRef = useRef<HTMLDivElement>(null);

    // Keep the latest handler in a ref so the imperative handle is stable.
    const onAnsweredRef = useRef(onInsightAnswered);
    useEffect(() => {
      onAnsweredRef.current = onInsightAnswered;
    }, [onInsightAnswered]);

    useEffect(() => {
      // Drive the scripted playback via setTimeout callbacks so state
      // updates happen after the effect body, not synchronously inside it.
      if (queue.length === 0) return;
      const firstTurn = visible.length === 0;
      const showTypingAt = setTimeout(() => setTyping(true), firstTurn ? 200 : 250);
      const commitAt = setTimeout(
        () => {
          setTyping(false);
          setVisible((v) => [...v, queue[0]]);
          setQueue((q) => q.slice(1));
          const committed = queue[0];
          if (committed.insightId) onAnsweredRef.current?.(committed.insightId);
        },
        firstTurn ? 600 : 1100
      );
      return () => {
        clearTimeout(showTypingAt);
        clearTimeout(commitAt);
      };
    }, [queue, visible.length]);

    useEffect(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [visible.length, typing]);

    function submitUserMessage(text: string, preferredInsightId?: string) {
      if (!text.trim()) return;
      const userTurn: AgentTurnType = {
        id: `u_${Date.now()}`,
        role: "user",
        content: text.trim(),
      };
      setVisible((v) => [...v, userTurn]);
      setInput("");

      const match =
        (preferredInsightId && insights.find((i) => i.id === preferredInsightId)) ||
        insights.find(
          (i) =>
            i.followUps.includes(text.trim()) ||
            i.summary.toLowerCase().includes(text.toLowerCase())
        );
      const reply: AgentTurnType = match
        ? {
            id: `a_${Date.now()}`,
            role: "agent",
            content: match.summary + "\n\n" + match.rationale,
            evidence: match.evidence,
            followUps: match.followUps,
            actions: match.recommendedAction ? [match.recommendedAction] : undefined,
            insightId: match.id,
          }
        : {
            id: `a_${Date.now()}`,
            role: "agent",
            content:
              "I don't have strong evidence for that yet. Try a chip from the categories below, or ask me something more specific.",
          };
      setQueue((q) => [...q, reply]);
    }

    useImperativeHandle(
      ref,
      () => ({
        submitPrompt: (text, preferredInsightId) => submitUserMessage(text, preferredInsightId),
      }),
      []
    );

    return (
      <Card className={`flex ${heightClass} flex-col`}>
        <div className="flex items-center justify-between border-b border-[color:var(--mc-border)] px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[color:var(--mc-opportunity-bg)]">
              <Bot className="h-3.5 w-3.5 text-[color:var(--mc-opportunity)]" />
            </span>
            <div>
              <h3 className="text-[14px] font-semibold text-[color:var(--mc-text-peppercorn)]">
                Analytics agent
              </h3>
              <p className="mc-micro">
                Grounded in this campaign · Pick a category below or ask directly
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-[color:var(--mc-border)] bg-[color:var(--mc-positive-bg)] px-2 py-0.5 text-[10px] font-medium text-[color:var(--mc-positive)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--mc-positive)]" />
            Live
          </div>
        </div>

        <div className="mc-scroll flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {visible.map((t) => (
            <AgentTurn
              key={t.id}
              turn={t}
              onFollowUp={(f) => submitUserMessage(f)}
            />
          ))}
          {typing && (
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[color:var(--mc-opportunity-bg)] text-[color:var(--mc-opportunity)]">
                <Bot className="h-4 w-4" />
              </span>
              <div className="mc-typing rounded-2xl bg-[color:var(--mc-subtle)] px-4 py-3 text-[13px] text-[color:var(--mc-text-secondary)]">
                Agent is thinking
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitUserMessage(input);
          }}
          className="flex items-center gap-2 border-t border-[color:var(--mc-border)] px-4 py-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the agent — try 'Show me why India is different'…"
            className="h-9 flex-1 rounded-full border border-[color:var(--mc-border-strong)] bg-[color:var(--mc-subtle)] px-4 text-[13px] text-[color:var(--mc-text-primary)] focus:border-[color:var(--mc-link)] focus:outline-none"
            aria-label="Ask the agent"
          />
          <button
            type="submit"
            className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--mc-cta)] text-white hover:bg-[color:var(--mc-cta-hover)]"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </Card>
    );
  }
);
