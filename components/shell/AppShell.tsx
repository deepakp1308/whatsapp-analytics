import { YellowStrip } from "./YellowStrip";
import { TopBar } from "./TopBar";
import { LeftNav } from "./LeftNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[color:var(--mc-page)]">
      <YellowStrip />
      <TopBar />
      <div className="flex">
        <LeftNav />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
