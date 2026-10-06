// The REST APIs & Integration Fundamentals course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 06. Integration concepts for functional consultants.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/rest-apis-and-integration-fundamentals/
  videoUrl?: string;
  durationLabel?: string;
};

export type ChapterMeta = { n: number; title: string; lessons: LessonMeta[] };

const L = (n: number, slug: string, title: string, extra?: Partial<LessonMeta>): LessonMeta => ({
  n,
  slug,
  title,
  ...extra,
});

export const REST_APIS_AND_INTEGRATION_FUNDAMENTALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "API Foundations",
    lessons: [
      L(1, "what-an-api-is", "What an API Is", { contentDir: "ch01/01-what-an-api-is" }),
      L(2, "rest-api-basics", "REST API Basics", { contentDir: "ch01/02-rest-api-basics" }),
      L(3, "http-methods-and-status-codes", "HTTP Methods and Status Codes", { contentDir: "ch01/03-http-methods-and-status-codes" }),
      L(4, "json-basics", "JSON Basics", { contentDir: "ch01/04-json-basics" }),
      L(5, "reading-api-documentation", "Reading API Documentation", { contentDir: "ch01/05-reading-api-documentation" }),
    ],
  },
  {
    n: 2,
    title: "Working with Oracle Fusion REST APIs",
    lessons: [
      L(6, "oracle-fusion-rest-resources-for-financials", "Oracle Fusion REST Resources for Financials", { contentDir: "ch02/06-oracle-fusion-rest-resources-for-financials" }),
      L(7, "making-your-first-get-request", "Making Your First GET Request", { contentDir: "ch02/07-making-your-first-get-request" }),
      L(8, "querying-filtering-and-paging-results", "Querying, Filtering and Paging Results", { contentDir: "ch02/08-querying-filtering-and-paging-results" }),
      L(9, "creating-and-updating-records", "Creating and Updating Records", { contentDir: "ch02/09-creating-and-updating-records" }),
      L(10, "working-with-a-rest-client", "Working with a REST Client", { contentDir: "ch02/10-working-with-a-rest-client" }),
    ],
  },
  {
    n: 3,
    title: "Authentication and Security",
    lessons: [
      L(11, "authentication-concepts", "Authentication Concepts", { contentDir: "ch03/11-authentication-concepts" }),
      L(12, "basic-authentication-vs-token-based-authentication", "Basic Authentication vs. Token-Based Authentication", { contentDir: "ch03/12-basic-authentication-vs-token-based-authentication" }),
      L(13, "integration-users-and-security", "Integration Users and Security", { contentDir: "ch03/13-integration-users-and-security" }),
      L(14, "handling-errors-and-retries", "Handling Errors and Retries", { contentDir: "ch03/14-handling-errors-and-retries" }),
    ],
  },
  {
    n: 4,
    title: "Integration Patterns",
    lessons: [
      L(15, "integration-patterns-overview", "Integration Patterns Overview", { contentDir: "ch04/15-integration-patterns-overview" }),
      L(16, "inbound-and-outbound-integrations", "Inbound and Outbound Integrations", { contentDir: "ch04/16-inbound-and-outbound-integrations" }),
      L(17, "oracle-integration-overview", "Oracle Integration Overview", { contentDir: "ch04/17-oracle-integration-overview" }),
      L(18, "business-events-and-notifications", "Business Events and Notifications", { contentDir: "ch04/18-business-events-and-notifications" }),
      L(19, "exchanging-financial-data-with-external-applications", "Exchanging Financial Data with External Applications", { contentDir: "ch04/19-exchanging-financial-data-with-external-applications" }),
    ],
  },
];
