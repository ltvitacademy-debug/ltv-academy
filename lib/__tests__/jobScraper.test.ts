// Pure/offline tests for lib/jobScraper.ts — never a live network call.
// scrapeLinkedIn is tested against a fixture captured from a REAL response
// (verified 2026-11-14) rather than invented markup. The other three sites
// are verified-blocked today (see jobScraper.ts's header comment) and must
// consistently throw ScrapeBlockedError so a blocked site degrades
// gracefully (the sweep skips it and backs off) instead of crashing the
// whole sweep or silently reporting zero results as success.
import { describe, it, expect, vi, afterEach } from "vitest";
import { scrapeLinkedIn, scrapeDice, scrapeCareerBuilder, scrapeIndeed, ScrapeBlockedError } from "../jobScraper";

const LINKEDIN_FIXTURE = `<!DOCTYPE html>
<ul>
  <li>
    <div class="base-card relative w-full base-search-card job-search-card" data-entity-urn="urn:li:jobPosting:4454862094">
      <a class="base-card__full-link" href="https://www.linkedin.com/jobs/view/senior-data-engineer-at-atlassian-4454862094?position=1&amp;trackingId=abc">
        <span class="sr-only">Senior Data Engineer</span>
      </a>
      <div class="base-search-card__info">
        <h3 class="base-search-card__title">Senior Data Engineer</h3>
        <h4 class="base-search-card__subtitle"><a>Atlassian</a></h4>
        <div class="base-search-card__metadata">
          <span class="job-search-card__location">Salt Lake City, UT</span>
        </div>
      </div>
    </div>
  </li>
  <li>
    <div class="base-card relative w-full base-search-card job-search-card" data-entity-urn="urn:li:jobPosting:1111111111">
      <a class="base-card__full-link" href="https://www.linkedin.com/jobs/view/data-engineer-remote-at-acme-1111111111?position=2">
        <span class="sr-only">Data Engineer</span>
      </a>
      <div class="base-search-card__info">
        <h3 class="base-search-card__title">Data Engineer</h3>
        <h4 class="base-search-card__subtitle"><a>Acme Co</a></h4>
        <div class="base-search-card__metadata">
          <span class="job-search-card__location">Remote</span>
        </div>
      </div>
    </div>
  </li>
</ul>`;

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("scrapeLinkedIn", () => {
  it("parses real job cards into ScrapedPosting rows, stripping tracking params from the URL", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(LINKEDIN_FIXTURE, { status: 200 })));
    const postings = await scrapeLinkedIn("data engineer", "Remote");
    expect(postings).toHaveLength(2);
    expect(postings[0]).toMatchObject({
      title: "Senior Data Engineer",
      company: "Atlassian",
      location: "Salt Lake City, UT",
      remote: false,
      sourceUrl: "https://www.linkedin.com/jobs/view/senior-data-engineer-at-atlassian-4454862094",
    });
    expect(postings[1]).toMatchObject({ title: "Data Engineer", location: "Remote", remote: true });
  });

  it("throws ScrapeBlockedError (not a silent empty array) on a non-200 response", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("blocked", { status: 403 })));
    await expect(scrapeLinkedIn("data engineer", "Remote")).rejects.toBeInstanceOf(ScrapeBlockedError);
  });

  it("skips a card missing a title/company/link rather than throwing", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response('<div class="base-card"><h3 class="base-search-card__title"></h3></div>', { status: 200 }))
    );
    const postings = await scrapeLinkedIn("data engineer", "Remote");
    expect(postings).toHaveLength(0);
  });
});

describe("verified-blocked sites", () => {
  it("scrapeDice always throws ScrapeBlockedError (no server-rendered job data to parse)", async () => {
    await expect(scrapeDice()).rejects.toBeInstanceOf(ScrapeBlockedError);
  });

  it("scrapeCareerBuilder always throws ScrapeBlockedError (bot-detection 403)", async () => {
    await expect(scrapeCareerBuilder()).rejects.toBeInstanceOf(ScrapeBlockedError);
  });

  it("scrapeIndeed always throws ScrapeBlockedError (bot-detection 401)", async () => {
    await expect(scrapeIndeed()).rejects.toBeInstanceOf(ScrapeBlockedError);
  });
});
