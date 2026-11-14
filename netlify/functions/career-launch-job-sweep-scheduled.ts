// Career Launch — periodic job discovery + AI tailoring sweep. Same
// unreachable-except-by-cron guarantee as
// mock-interview-credit-retry-scheduled.ts (Netlify's platform makes
// scheduled functions impossible to invoke via a public URL — see that
// file's comment for the confirmed source). All the actual logic lives in
// lib/careerLaunchJobSweep.ts so it stays testable without a live network.
import type { Config } from "@netlify/functions";
import { runJobDiscoverySweep } from "../../lib/careerLaunchJobSweep";

export default async (_req: Request) => {
  const summary = await runJobDiscoverySweep();
  console.log(
    `career-launch-job-sweep: attempted=${summary.sitesAttempted.join(",")} blocked=${summary.sitesBlocked.join(",")} ` +
      `postingsDiscovered=${summary.postingsDiscovered} applicationsCreated=${summary.applicationsCreated} applicationsTailored=${summary.applicationsTailored}`
  );
};

export const config: Config = {
  // Every 4 hours — job postings don't need 15-minute freshness, and this
  // keeps well clear of LinkedIn's guest endpoint being hit too often.
  schedule: "0 */4 * * *",
};
