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
      L(1, "what-an-api-is", "What an API Is", { contentDir: "ch01/01-what-an-api-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608440/ltv-rest-apis-and-integration-fundamentals/what-an-api-is.mp4", durationLabel: "1 min 32 s" }),
      L(2, "rest-api-basics", "REST API Basics", { contentDir: "ch01/02-rest-api-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608942/ltv-rest-apis-and-integration-fundamentals/rest-api-basics.mp4", durationLabel: "1 min 48 s" }),
      L(3, "http-methods-and-status-codes", "HTTP Methods and Status Codes", { contentDir: "ch01/03-http-methods-and-status-codes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609408/ltv-rest-apis-and-integration-fundamentals/http-methods-and-status-codes.mp4", durationLabel: "1 min 37 s" }),
      L(4, "json-basics", "JSON Basics", { contentDir: "ch01/04-json-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609797/ltv-rest-apis-and-integration-fundamentals/json-basics.mp4", durationLabel: "1 min 32 s" }),
      L(5, "reading-api-documentation", "Reading API Documentation", { contentDir: "ch01/05-reading-api-documentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610223/ltv-rest-apis-and-integration-fundamentals/reading-api-documentation.mp4", durationLabel: "1 min 31 s" }),
    ],
  },
  {
    n: 2,
    title: "Working with Oracle Fusion REST APIs",
    lessons: [
      L(6, "oracle-fusion-rest-resources-for-financials", "Oracle Fusion REST Resources for Financials", { contentDir: "ch02/06-oracle-fusion-rest-resources-for-financials", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610548/ltv-rest-apis-and-integration-fundamentals/oracle-fusion-rest-resources-for-financials.mp4", durationLabel: "1 min 30 s" }),
      L(7, "making-your-first-get-request", "Making Your First GET Request", { contentDir: "ch02/07-making-your-first-get-request", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610994/ltv-rest-apis-and-integration-fundamentals/making-your-first-get-request.mp4", durationLabel: "1 min 39 s" }),
      L(8, "querying-filtering-and-paging-results", "Querying, Filtering and Paging Results", { contentDir: "ch02/08-querying-filtering-and-paging-results", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792611670/ltv-rest-apis-and-integration-fundamentals/querying-filtering-and-paging-results.mp4", durationLabel: "1 min 40 s" }),
      L(9, "creating-and-updating-records", "Creating and Updating Records", { contentDir: "ch02/09-creating-and-updating-records", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792612187/ltv-rest-apis-and-integration-fundamentals/creating-and-updating-records.mp4", durationLabel: "1 min 37 s" }),
      L(10, "working-with-a-rest-client", "Working with a REST Client", { contentDir: "ch02/10-working-with-a-rest-client", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792612704/ltv-rest-apis-and-integration-fundamentals/working-with-a-rest-client.mp4", durationLabel: "1 min 29 s" }),
    ],
  },
  {
    n: 3,
    title: "Authentication and Security",
    lessons: [
      L(11, "authentication-concepts", "Authentication Concepts", { contentDir: "ch03/11-authentication-concepts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792613245/ltv-rest-apis-and-integration-fundamentals/authentication-concepts.mp4", durationLabel: "1 min 45 s" }),
      L(12, "basic-authentication-vs-token-based-authentication", "Basic Authentication vs. Token-Based Authentication", { contentDir: "ch03/12-basic-authentication-vs-token-based-authentication", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792613713/ltv-rest-apis-and-integration-fundamentals/basic-authentication-vs-token-based-authentication.mp4", durationLabel: "1 min 49 s" }),
      L(13, "integration-users-and-security", "Integration Users and Security", { contentDir: "ch03/13-integration-users-and-security", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614041/ltv-rest-apis-and-integration-fundamentals/integration-users-and-security.mp4", durationLabel: "1 min 47 s" }),
      L(14, "handling-errors-and-retries", "Handling Errors and Retries", { contentDir: "ch03/14-handling-errors-and-retries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614349/ltv-rest-apis-and-integration-fundamentals/handling-errors-and-retries.mp4", durationLabel: "1 min 48 s" }),
    ],
  },
  {
    n: 4,
    title: "Integration Patterns",
    lessons: [
      L(15, "integration-patterns-overview", "Integration Patterns Overview", { contentDir: "ch04/15-integration-patterns-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614710/ltv-rest-apis-and-integration-fundamentals/integration-patterns-overview.mp4", durationLabel: "1 min 48 s" }),
      L(16, "inbound-and-outbound-integrations", "Inbound and Outbound Integrations", { contentDir: "ch04/16-inbound-and-outbound-integrations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615037/ltv-rest-apis-and-integration-fundamentals/inbound-and-outbound-integrations.mp4", durationLabel: "1 min 53 s" }),
      L(17, "oracle-integration-overview", "Oracle Integration Overview", { contentDir: "ch04/17-oracle-integration-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615329/ltv-rest-apis-and-integration-fundamentals/oracle-integration-overview.mp4", durationLabel: "1 min 59 s" }),
      L(18, "business-events-and-notifications", "Business Events and Notifications", { contentDir: "ch04/18-business-events-and-notifications", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615594/ltv-rest-apis-and-integration-fundamentals/business-events-and-notifications.mp4", durationLabel: "1 min 55 s" }),
      L(19, "exchanging-financial-data-with-external-applications", "Exchanging Financial Data with External Applications", { contentDir: "ch04/19-exchanging-financial-data-with-external-applications", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615915/ltv-rest-apis-and-integration-fundamentals/exchanging-financial-data-with-external-applications.mp4", durationLabel: "2 min 18 s" }),
    ],
  },
];
