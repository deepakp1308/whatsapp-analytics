import { Search } from "lucide-react";
import { FreddieLogo } from "./FreddieLogo";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-[color:var(--mc-border)] bg-[color:var(--mc-surface)] px-6">
      <div className="flex w-[180px] items-center">
        <FreddieLogo className="h-8 w-8" />
      </div>

      <div className="flex flex-1 justify-center">
        <label className="relative flex w-full max-w-[520px] items-center">
          <Search
            className="absolute left-3 h-4 w-4 text-[color:var(--mc-text-tertiary)]"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search Mailchimp"
            className="h-9 w-full rounded-full border border-[color:var(--mc-border)] bg-[color:var(--mc-subtle)] pl-9 pr-4 text-[13px] text-[color:var(--mc-text-primary)] placeholder:text-[color:var(--mc-text-tertiary)] focus:border-[color:var(--mc-link)] focus:outline-none"
            aria-label="Search Mailchimp"
          />
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="h-9 rounded-full border border-[color:var(--mc-border-strong)] bg-[color:var(--mc-surface)] px-4 text-[13px] font-medium text-[color:var(--mc-text-primary)] hover:border-[color:var(--mc-border-muted)] hover:bg-[color:var(--mc-subtle)]"
        >
          Live expert help
        </button>
        <div className="relative">
          <div
            className="h-9 w-9 rounded-full bg-gradient-to-br from-[#FFB199] to-[#FF7A59] ring-1 ring-[color:var(--mc-border-strong)]"
            aria-label="Account"
          />
          <span
            className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-[color:var(--mc-negative)] text-[10px] font-semibold leading-none text-white"
            aria-label="3 unread notifications"
          >
            3
          </span>
        </div>
      </div>
    </header>
  );
}
