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
      L(1, "what-an-api-is", "What an API Is"),
      L(2, "rest-api-basics", "REST API Basics"),
      L(3, "http-methods-and-status-codes", "HTTP Methods and Status Codes"),
      L(4, "json-basics", "JSON Basics"),
      L(5, "reading-api-documentation", "Reading API Documentation"),
    ],
  },
  {
    n: 2,
    title: "Working with Oracle Fusion REST APIs",
    lessons: [
      L(6, "oracle-fusion-rest-resources-for-financials", "Oracle Fusion REST Resources for Financials"),
      L(7, "making-your-first-get-request", "Making Your First GET Request"),
      L(8, "querying-filtering-and-paging-results", "Querying, Filtering and Paging Results"),
      L(9, "creating-and-updating-records", "Creating and Updating Records"),
      L(10, "working-with-a-rest-client", "Working with a REST Client"),
    ],
  },
  {
    n: 3,
    title: "Authentication and Security",
    lessons: [
      L(11, "authentication-concepts", "Authentication Concepts"),
      L(12, "basic-authentication-vs-token-based-authentication", "Basic Authentication vs. Token-Based Authentication"),
      L(13, "integration-users-and-security", "Integration Users and Security"),
      L(14, "handling-errors-and-retries", "Handling Errors and Retries"),
    ],
  },
  {
    n: 4,
    title: "Integration Patterns",
    lessons: [
      L(15, "integration-patterns-overview", "Integration Patterns Overview"),
      L(16, "inbound-and-outbound-integrations", "Inbound and Outbound Integrations"),
      L(17, "oracle-integration-overview", "Oracle Integration Overview"),
      L(18, "business-events-and-notifications", "Business Events and Notifications"),
      L(19, "exchanging-financial-data-with-external-applications", "Exchanging Financial Data with External Applications"),
    ],
  },
];
