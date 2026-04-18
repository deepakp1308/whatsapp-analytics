"use client";
import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

export function Toast({
  message,
  onDone,
  durationMs = 2200,
}: {
  message: string;
  onDone: () => void;
  durationMs?: number;
}) {
  useEffect(() => {
    const t = setTimeout(onDone, durationMs);
    return () => clearTimeout(t);
  }, [durationMs, onDone]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 inline-flex items-center gap-2 rounded-full border border-[color:var(--mc-border-strong)] bg-[color:var(--mc-text-peppercorn)] px-4 py-2 text-[13px] text-white shadow-[var(--mc-shadow-lg)] mc-fade-in"
    >
      <CheckCircle2 className="h-4 w-4 text-[color:var(--mc-positive)]" />
      {message}
    </div>
  );
}
