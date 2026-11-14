// Career Launch — job posting discovery. Plain HTTP fetch + HTML parse
// (cheerio) only: no headless browser, no CAPTCHA-solving, no bot-detection
// evasion (proxy rotation, fingerprint spoofing) — that line doesn't move
// regardless of the scraping authorization already given for this feature.
//
// Verified against real, live responses before writing selectors (2026-11-14):
//   - linkedin: works today — the public, unauthenticated job-search guest
//     endpoint returns real server-rendered job cards, no login needed.
//   - dice: no scraper possible via plain fetch — the search page ships with
//     no job data at all; it's loaded by client-side JS calling an internal
//     API that 403s a plain request.
//   - careerbuilder: blocked outright (403) on the very first request.
//   - indeed: blocked outright (401 "Authenticating...") even on a direct
//     job-posting permalink.
// dice/careerbuilder/indeed are left wired in (as functions that throw
// ScrapeBlockedError) rather than deleted, so turning one back on later —
// if a legitimate API or a staff-paste-a-link flow replaces it — is a
// one-function change, not a redesign.
import * as cheerio from "cheerio";

export type ScrapedPosting = {
  sourceUrl: string;
  company: string;
  title: string;
  location: string;
  remote: boolean;
  salaryRange: string | null;
  rawSummary: string;
};

export class ScrapeBlockedError extends Error {
  constructor(site: string, detail: string) {
    super(`${site} blocked this request: ${detail}`);
    this.name = "ScrapeBlockedError";
  }
}

const FETCH_TIMEOUT_MS = 8000;
const BROWSER_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36";

async function fetchText(url: string): Promise<{ status: number; body: string }> {
  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { "User-Agent": BROWSER_USER_AGENT }, signal: abortController.signal });
    return { status: res.status, body: await res.text() };
  } finally {
    clearTimeout(timeout);
  }
}

function isRemote(location: string): boolean {
  return /\bremote\b/i.test(location);
}

export async function scrapeLinkedIn(query: string, location: string): Promise<ScrapedPosting[]> {
  const url = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}&start=0`;
  const { status, body } = await fetchText(url);
  if (status !== 200) throw new ScrapeBlockedError("linkedin", `HTTP ${status}`);

  const $ = cheerio.load(body);
  const postings: ScrapedPosting[] = [];
  $(".base-card").each((_, el) => {
    const card = $(el);
    const title = card.find(".base-search-card__title").text().trim();
    const company = card.find(".base-search-card__subtitle").text().trim();
    const loc = card.find(".job-search-card__location").text().trim();
    const link = card.find("a.base-card__full-link").attr("href");
    if (!title || !company || !link) return;
    postings.push({
      sourceUrl: link.split("?")[0],
      company,
      title,
      location: loc || "Not specified",
      remote: isRemote(loc) || isRemote(query),
      salaryRange: null,
      rawSummary: `${title} at ${company}${loc ? ` — ${loc}` : ""} (via LinkedIn).`,
    });
  });
  return postings;
}

export async function scrapeDice(): Promise<ScrapedPosting[]> {
  throw new ScrapeBlockedError("dice", "search results load via client-side JS; no server-rendered job data to parse");
}

export async function scrapeCareerBuilder(): Promise<ScrapedPosting[]> {
  throw new ScrapeBlockedError("careerbuilder", "bot-detection blocks the request outright (403)");
}

export async function scrapeIndeed(): Promise<ScrapedPosting[]> {
  throw new ScrapeBlockedError("indeed", "bot-detection blocks the request outright (401 Authenticating)");
}

export const SCRAPERS: Record<string, (query: string, location: string) => Promise<ScrapedPosting[]>> = {
  linkedin: scrapeLinkedIn,
  dice: () => scrapeDice(),
  careerbuilder: () => scrapeCareerBuilder(),
  indeed: () => scrapeIndeed(),
};
