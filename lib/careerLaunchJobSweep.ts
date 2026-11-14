// Career Launch — the scheduled job-discovery sweep's actual logic (ZERO
// knowledge of HTTP, same separation as lib/interviewTurnEngine.ts), so the
// Netlify scheduled function itself stays a thin wrapper.
//
// Per run, bounded to stay inside Netlify's ~30s scheduled-function ceiling:
//   1. For each source site whose JobScrapeState backoff has elapsed, scrape
//      one (role, location) query per active CareerProfile (deduplicated) and
//      upsert any new JobPosting rows (sourceUrl is the de-dup key).
//   2. Match postings against active profiles on a simple keyword/location
//      filter (no AI — matching is cheap, tailoring is what costs tokens) and
//      create JobApplication rows in "discovered" status.
//   3. AI-tailor a small bounded batch of "discovered" applications (only for
//      students who've approved a base resume — lib/resumeTailoringEngine.ts),
//      advancing them to "tailored" so they're ready for staff review.
import { prisma } from "./db";
import { SCRAPERS, ScrapeBlockedError, type ScrapedPosting } from "./jobScraper";
import { tailorResumeForPosting } from "./resumeTailoringEngine";
import { splitCsv } from "./careerLaunchTypes";

const SITES = Object.keys(SCRAPERS);
const PROFILE_BATCH_LIMIT = 10;
const TAILOR_BATCH_LIMIT = 5;

// Same shape as lib/pendingCreditVerification.ts's BACKOFF_SCHEDULE_MS —
// a site that's blocking us backs off for longer each consecutive failure,
// capped at 3 days, rather than being hit every sweep forever.
const BACKOFF_SCHEDULE_MS = [
  60 * 60_000, // 1hr
  4 * 60 * 60_000, // 4hr
  12 * 60 * 60_000, // 12hr
  24 * 60 * 60_000, // 24hr
  3 * 24 * 60 * 60_000, // 3 days (repeats from here)
];

function backoffDelayMsForAttempt(attemptNumber: number): number {
  const idx = Math.min(attemptNumber - 1, BACKOFF_SCHEDULE_MS.length - 1);
  return BACKOFF_SCHEDULE_MS[Math.max(idx, 0)];
}

export type SweepSummary = {
  sitesAttempted: string[];
  sitesBlocked: string[];
  postingsDiscovered: number;
  applicationsCreated: number;
  applicationsTailored: number;
};

async function ensureScrapeStateRows(): Promise<void> {
  for (const site of SITES) {
    await prisma.jobScrapeState.upsert({
      where: { sourceSite: site },
      update: {},
      create: { sourceSite: site },
    });
  }
}

function matchesProfile(posting: ScrapedPosting, profile: { targetRoles: string; locations: string; excludedCompanies: string }): boolean {
  const roles = splitCsv(profile.targetRoles).map((r) => r.toLowerCase());
  const locations = splitCsv(profile.locations).map((l) => l.toLowerCase());
  const excluded = splitCsv(profile.excludedCompanies).map((c) => c.toLowerCase());

  const title = posting.title.toLowerCase();
  const company = posting.company.toLowerCase();
  const location = posting.location.toLowerCase();

  if (excluded.some((c) => company.includes(c))) return false;
  const roleMatch = roles.length === 0 || roles.some((r) => title.includes(r));
  const locationMatch =
    locations.length === 0 || posting.remote || locations.some((l) => location.includes(l) || l.includes("remote"));
  return roleMatch && locationMatch;
}

export async function runJobDiscoverySweep(): Promise<SweepSummary> {
  await ensureScrapeStateRows();

  const now = new Date();
  const profiles = await prisma.careerProfile.findMany({
    where: { targetRoles: { not: "" } },
    take: PROFILE_BATCH_LIMIT,
    orderBy: { updatedAt: "asc" },
  });

  const summary: SweepSummary = {
    sitesAttempted: [],
    sitesBlocked: [],
    postingsDiscovered: 0,
    applicationsCreated: 0,
    applicationsTailored: 0,
  };

  // Build a deduplicated (query, location) list from active profiles' FIRST
  // target role/location — bounded by construction since profiles is already
  // capped, and keeps one sweep from issuing dozens of near-identical queries.
  const queries = new Map<string, { query: string; location: string }>();
  for (const profile of profiles) {
    const role = splitCsv(profile.targetRoles)[0];
    const location = splitCsv(profile.locations)[0] ?? "Remote";
    if (!role) continue;
    queries.set(`${role.toLowerCase()}|${location.toLowerCase()}`, { query: role, location });
  }

  const dueStates = await prisma.jobScrapeState.findMany({ where: { nextAttemptAt: { lte: now } } });
  for (const state of dueStates) {
    const scraper = SCRAPERS[state.sourceSite];
    if (!scraper) continue;
    summary.sitesAttempted.push(state.sourceSite);

    let sitePostings: ScrapedPosting[] = [];
    let siteFailed: string | null = null;
    for (const { query, location } of queries.values()) {
      try {
        sitePostings = sitePostings.concat(await scraper(query, location));
      } catch (error) {
        siteFailed = error instanceof ScrapeBlockedError ? error.message : String(error);
        break; // this site is blocked for this whole run — don't hammer it with more queries
      }
    }

    if (siteFailed) {
      summary.sitesBlocked.push(state.sourceSite);
      const attempts = state.attempts + 1;
      await prisma.jobScrapeState.update({
        where: { sourceSite: state.sourceSite },
        data: {
          status: "blocked",
          attempts,
          lastError: siteFailed.slice(0, 500),
          nextAttemptAt: new Date(now.getTime() + backoffDelayMsForAttempt(attempts)),
        },
      });
      continue;
    }

    for (const posting of sitePostings) {
      const result = await prisma.jobPosting.upsert({
        where: { sourceUrl: posting.sourceUrl },
        update: {},
        create: { sourceSite: state.sourceSite, ...posting },
      });
      if (result.discoveredAt.getTime() >= now.getTime() - 1000) summary.postingsDiscovered += 1;
    }
    await prisma.jobScrapeState.update({
      where: { sourceSite: state.sourceSite },
      data: { status: "ok", attempts: 0, lastError: null, nextAttemptAt: new Date(now.getTime() + 60 * 60_000) },
    });
  }

  // Match: for each active profile, find postings it hasn't already got a
  // JobApplication row for, create one in "discovered" status.
  const recentPostings = await prisma.jobPosting.findMany({ orderBy: { discoveredAt: "desc" }, take: 200 });
  for (const profile of profiles) {
    for (const posting of recentPostings) {
      if (!matchesProfile(posting, profile)) continue;
      try {
        await prisma.jobApplication.create({
          data: { studentId: profile.studentId, postingId: posting.id, status: "discovered" },
        });
        summary.applicationsCreated += 1;
      } catch {
        // unique([studentId, postingId]) violation — already matched, skip.
      }
    }
  }

  // Tailor: a small bounded batch of "discovered" applications belonging to
  // students who've approved a base resume.
  const toTailor = await prisma.jobApplication.findMany({
    where: { status: "discovered", student: { careerProfile: { baseResumeApprovedAt: { not: null } } } },
    include: { posting: true, student: { include: { careerProfile: true } } },
    take: TAILOR_BATCH_LIMIT,
    orderBy: { createdAt: "asc" },
  });
  for (const application of toTailor) {
    const baseResumeText = application.student.careerProfile?.baseResumeText;
    if (!baseResumeText) continue;
    try {
      const tailored = await tailorResumeForPosting({
        baseResumeText,
        jobTitle: application.posting.title,
        company: application.posting.company,
        jobSummary: application.posting.rawSummary,
      });
      await prisma.jobApplication.update({
        where: { id: application.id },
        data: {
          status: "tailored",
          matchScore: tailored.matchScore,
          tailoredResumeText: tailored.tailoredResumeText,
          coverLetterText: tailored.coverLetterText,
        },
      });
      summary.applicationsTailored += 1;
    } catch (error) {
      console.error(`career-launch job sweep: tailoring failed for application ${application.id}:`, error);
    }
  }

  return summary;
}
