// The Salesforce APIs course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-apis/
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

export const SFTA_SALESFORCE_APIS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "API Foundations",
    lessons: [
      L(1, "salesforce-api-overview", "Salesforce API Overview"),
      L(2, "apis-web-services-and-integration-concepts", "APIs, Web Services and Integration Concepts"),
      L(3, "the-rest-api", "The REST API"),
      L(4, "soap-api-concepts", "SOAP API Concepts"),
      L(5, "the-bulk-api", "The Bulk API"),
      L(6, "other-salesforce-apis-composite-graphql-and-streaming", "Other Salesforce APIs: Composite, GraphQL and Streaming"),
    ],
  },
  {
    n: 2,
    title: "Using the APIs",
    lessons: [
      L(7, "authentication-for-apis", "Authentication for APIs"),
      L(8, "json-and-working-with-api-payloads", "JSON and Working With API Payloads"),
      L(9, "making-rest-calls-with-postman", "Making REST Calls With Postman"),
      L(10, "crud-operations-through-the-rest-api", "CRUD Operations Through the REST API"),
      L(11, "querying-with-the-rest-api", "Querying With the REST API"),
      L(12, "connecting-external-applications", "Connecting External Applications"),
      L(13, "error-handling-and-http-status-codes", "Error Handling and HTTP Status Codes"),
    ],
  },
  {
    n: 3,
    title: "Limits and Practice",
    lessons: [
      L(14, "api-limits-and-best-practices", "API Limits and Best Practices"),
      L(15, "bulk-api-2-0-practice", "Bulk API 2.0 Practice"),
      L(16, "composite-requests", "Composite Requests"),
      L(17, "salesforce-connect-and-external-objects-overview", "Salesforce Connect and External Objects Overview"),
      L(18, "api-versioning", "API Versioning"),
      L(19, "api-practice-project", "API Practice Project"),
    ],
  },
  {
    n: 4,
    title: "Choosing an API",
    lessons: [
      L(20, "which-api-to-use-when", "Which API to Use When"),
      L(21, "api-security-basics", "API Security Basics"),
      L(22, "api-documentation-and-tooling", "API Documentation and Tooling"),
    ],
  },
];
