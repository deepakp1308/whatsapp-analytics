import Link from "next/link";

/**
 * Static-export friendly landing. We can't use server redirect() with
 * `output: "export"`, so we render a tiny index that links into the
 * three-plan tour. A meta refresh handles the auto-jump for visitors
 * who hit the root URL.
 */
export default function Home() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=./whatsapp/dashboard/" />
      <div className="mx-auto max-w-xl px-6 py-20 text-center">
        <h1 className="mc-h-page">WhatsApp Analytics — Mailchimp prototype</h1>
        <p className="mc-body mt-3 text-[color:var(--mc-text-secondary)]">
          Redirecting to the dashboard… or pick a plan below.
        </p>
        <ul className="mt-6 flex flex-col gap-2">
          <li>
            <Link
              className="text-[color:var(--mc-link)] underline"
              href="/whatsapp/dashboard"
            >
              /whatsapp/dashboard — Plan 1 portfolio
            </Link>
          </li>
          <li>
            <Link
              className="text-[color:var(--mc-link)] underline"
              href="/whatsapp/report/cmp_welcome_wa"
            >
              /whatsapp/report/cmp_welcome_wa — Plan 1 campaign report
            </Link>
          </li>
          <li>
            <Link
              className="text-[color:var(--mc-link)] underline"
              href="/whatsapp/report/cmp_welcome_wa/insights"
            >
              …/insights — Plan 2 smart mode
            </Link>
          </li>
          <li>
            <Link
              className="text-[color:var(--mc-link)] underline"
              href="/whatsapp/report/cmp_welcome_wa/agent"
            >
              …/agent — Plan 3 agent mode
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
