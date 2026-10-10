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
      L(1, "salesforce-api-overview", "Salesforce API Overview", { contentDir: "ch01/01-salesforce-api-overview" }),
      L(2, "apis-web-services-and-integration-concepts", "APIs, Web Services and Integration Concepts", { contentDir: "ch01/02-apis-web-services-and-integration-concepts" }),
      L(3, "the-rest-api", "The REST API", { contentDir: "ch01/03-the-rest-api" }),
      L(4, "soap-api-concepts", "SOAP API Concepts", { contentDir: "ch01/04-soap-api-concepts" }),
      L(5, "the-bulk-api", "The Bulk API", { contentDir: "ch01/05-the-bulk-api" }),
      L(6, "other-salesforce-apis-composite-graphql-and-streaming", "Other Salesforce APIs: Composite, GraphQL and Streaming", { contentDir: "ch01/06-other-salesforce-apis-composite-graphql-and-streaming" }),
    ],
  },
  {
    n: 2,
    title: "Using the APIs",
    lessons: [
      L(7, "authentication-for-apis", "Authentication for APIs", { contentDir: "ch02/07-authentication-for-apis" }),
      L(8, "json-and-working-with-api-payloads", "JSON and Working With API Payloads", { contentDir: "ch02/08-json-and-working-with-api-payloads" }),
      L(9, "making-rest-calls-with-postman", "Making REST Calls With Postman", { contentDir: "ch02/09-making-rest-calls-with-postman" }),
      L(10, "crud-operations-through-the-rest-api", "CRUD Operations Through the REST API", { contentDir: "ch02/10-crud-operations-through-the-rest-api" }),
      L(11, "querying-with-the-rest-api", "Querying With the REST API", { contentDir: "ch02/11-querying-with-the-rest-api" }),
      L(12, "connecting-external-applications", "Connecting External Applications", { contentDir: "ch02/12-connecting-external-applications" }),
      L(13, "error-handling-and-http-status-codes", "Error Handling and HTTP Status Codes", { contentDir: "ch02/13-error-handling-and-http-status-codes" }),
    ],
  },
  {
    n: 3,
    title: "Limits and Practice",
    lessons: [
      L(14, "api-limits-and-best-practices", "API Limits and Best Practices", { contentDir: "ch03/14-api-limits-and-best-practices" }),
      L(15, "bulk-api-2-0-practice", "Bulk API 2.0 Practice", { contentDir: "ch03/15-bulk-api-2-0-practice" }),
      L(16, "composite-requests", "Composite Requests", { contentDir: "ch03/16-composite-requests" }),
      L(17, "salesforce-connect-and-external-objects-overview", "Salesforce Connect and External Objects Overview", { contentDir: "ch03/17-salesforce-connect-and-external-objects-overview" }),
      L(18, "api-versioning", "API Versioning", { contentDir: "ch03/18-api-versioning" }),
      L(19, "api-practice-project", "API Practice Project", { contentDir: "ch03/19-api-practice-project" }),
    ],
  },
  {
    n: 4,
    title: "Choosing an API",
    lessons: [
      L(20, "which-api-to-use-when", "Which API to Use When", { contentDir: "ch04/20-which-api-to-use-when" }),
      L(21, "api-security-basics", "API Security Basics", { contentDir: "ch04/21-api-security-basics" }),
      L(22, "api-documentation-and-tooling", "API Documentation and Tooling", { contentDir: "ch04/22-api-documentation-and-tooling" }),
    ],
  },
];
