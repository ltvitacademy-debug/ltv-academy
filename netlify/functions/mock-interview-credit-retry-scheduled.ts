// Payment-recovery backstop layer 2 of 3 (see lib/pendingCreditVerification.ts
// for the full picture): automatically re-attempts Wix payment verification
// for orders stuck in PendingCreditVerification, without depending on Wix's
// own webhook retry window.
//
// Access control: CONFIRMED from Netlify's own current docs
// (docs.netlify.com/build/functions/scheduled-functions/, last updated
// 3 Oct 2026) — "You can't invoke scheduled functions directly with a URL"
// (stated twice: once under "Developing and debugging", once under
// "Limitations"). Netlify's platform itself makes this function
// unreachable by any external HTTP caller; it only ever runs on its cron
// schedule, or via the "Run now" button in the Netlify UI (which requires
// being logged into the Netlify account), or locally via
// `netlify functions:invoke` for debugging. No separate secret/auth check
// is layered on top of that platform guarantee, because this IS the
// guarantee — there is no public URL to secure.
//
// Bounded: retryDuePendingVerifications caps how many rows one run
// processes (default 25) to stay comfortably inside Netlify's 30-second
// scheduled-function execution ceiling.
//
// How to confirm this actually runs, after a real deploy:
//   1. Netlify dashboard -> Functions -> this function should show a
//      "Scheduled" badge with a "Next execution" timestamp.
//   2. Scheduled functions only fire automatically on PUBLISHED deploys —
//      a Deploy Preview or branch deploy will show the badge but won't
//      fire on schedule.
//   3. Use "Run now" for an immediate manual test, then check this
//      function's own logs (still on the Functions page) for the summary
//      line this handler logs below.
import type { Config } from "@netlify/functions";
import { retryDuePendingVerifications } from "../../lib/pendingCreditVerification";

const BATCH_LIMIT = 25;

export default async (_req: Request) => {
  const summary = await retryDuePendingVerifications(BATCH_LIMIT);
  console.log(
    `mock-interview-credit-retry-scheduled: processed=${summary.processed} granted=${summary.granted} notPaid=${summary.notPaid} stillPending=${summary.stillPending} exhausted=${summary.exhausted}`
  );
};

export const config: Config = {
  // Every 15 minutes — frequent enough to catch the shorter backoff steps
  // (1 min / 5 min / 15 min) within a run or two without needing per-minute
  // invocations, given Wix's own faster first-retry layer already covers
  // the first couple of minutes independently.
  schedule: "*/15 * * * *",
};
