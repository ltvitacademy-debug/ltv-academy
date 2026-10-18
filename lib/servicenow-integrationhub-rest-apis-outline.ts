// ServiceNow IntegrationHub & REST APIs course outline. Lessons without a contentDir render as
// "in production". Course 7 of 14 in the ServiceNow Administrator → Developer → Technical
// Architect path: real integration patterns, authentication, and error handling.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/servicenow-integrationhub-rest-apis/
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

export const SERVICENOW_INTEGRATIONHUB_REST_APIS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Integration Fundamentals",
    lessons: [
      L(1, "why-enterprises-integrate-servicenow-with-everything", "Why Enterprises Integrate ServiceNow With Everything", { contentDir: "ch01/01-why-enterprises-integrate-servicenow-with-everything" }),
      L(2, "integration-patterns-overview", "Integration Patterns: Overview", { contentDir: "ch01/02-integration-patterns-overview" }),
      L(3, "rest-vs-soap-vs-event-driven-integration", "REST vs. SOAP vs. Event-Driven Integration", { contentDir: "ch01/03-rest-vs-soap-vs-event-driven-integration" }),
    ],
  },
  {
    n: 2,
    title: "Consuming External REST APIs",
    lessons: [
      L(4, "the-rest-message-record", "The REST Message Record", { contentDir: "ch02/04-the-rest-message-record" }),
      L(5, "building-and-testing-a-rest-message", "Building & Testing a REST Message", { contentDir: "ch02/05-building-and-testing-a-rest-message" }),
      L(6, "calling-a-rest-message-from-script", "Calling a REST Message From Script", { contentDir: "ch02/06-calling-a-rest-message-from-script" }),
      L(7, "consuming-rest-apis-lab", "Consuming REST APIs Lab", { contentDir: "ch02/07-consuming-rest-apis-lab" }),
    ],
  },
  {
    n: 3,
    title: "Authentication for Integrations",
    lessons: [
      L(8, "basic-auth-and-why-its-rarely-enough", "Basic Auth & Why It's Rarely Enough", { contentDir: "ch03/08-basic-auth-and-why-its-rarely-enough" }),
      L(9, "oauth-2-0-for-servicenow-integrations", "OAuth 2.0 for ServiceNow Integrations", { contentDir: "ch03/09-oauth-2-0-for-servicenow-integrations" }),
      L(10, "mutual-authentication-and-api-keys", "Mutual Authentication & API Keys", { contentDir: "ch03/10-mutual-authentication-and-api-keys" }),
      L(11, "authentication-lab", "Authentication Lab", { contentDir: "ch03/11-authentication-lab" }),
    ],
  },
  {
    n: 4,
    title: "Exposing ServiceNow Data via REST",
    lessons: [
      L(12, "the-table-api", "The Table API", { contentDir: "ch04/12-the-table-api" }),
      L(13, "scripted-rest-apis-a-developers-depth-view", "Scripted REST APIs: a Developer's-Depth View", { contentDir: "ch04/13-scripted-rest-apis-a-developers-depth-view" }),
      L(14, "versioning-a-scripted-rest-api", "Versioning a Scripted REST API", { contentDir: "ch04/14-versioning-a-scripted-rest-api" }),
      L(15, "exposing-data-lab", "Exposing Data Lab", { contentDir: "ch04/15-exposing-data-lab" }),
    ],
  },
  {
    n: 5,
    title: "IntegrationHub",
    lessons: [
      L(16, "what-integrationhub-actually-adds", "What IntegrationHub Actually Adds", { contentDir: "ch05/16-what-integrationhub-actually-adds" }),
      L(17, "spokes-and-connector-actions", "Spokes & Connector Actions", { contentDir: "ch05/17-spokes-and-connector-actions" }),
      L(18, "building-a-custom-spoke-action", "Building a Custom Spoke Action", { contentDir: "ch05/18-building-a-custom-spoke-action" }),
      L(19, "integrationhub-lab", "IntegrationHub Lab", { contentDir: "ch05/19-integrationhub-lab" }),
    ],
  },
  {
    n: 6,
    title: "Error Handling, Logging & Retries",
    lessons: [
      L(20, "designing-for-integration-failures", "Designing for Integration Failures", { contentDir: "ch06/20-designing-for-integration-failures" }),
      L(21, "retry-strategies-and-idempotency", "Retry Strategies & Idempotency", { contentDir: "ch06/21-retry-strategies-and-idempotency" }),
      L(22, "logging-integration-activity-for-troubleshooting", "Logging Integration Activity for Troubleshooting", { contentDir: "ch06/22-logging-integration-activity-for-troubleshooting" }),
      L(23, "error-handling-lab", "Error Handling Lab", { contentDir: "ch06/23-error-handling-lab" }),
    ],
  },
  {
    n: 7,
    title: "MID Server & On-Premises Integration",
    lessons: [
      L(24, "what-a-mid-server-does-and-why-its-needed", "What a MID Server Does & Why It's Needed", { contentDir: "ch07/24-what-a-mid-server-does-and-why-its-needed" }),
      L(25, "mid-server-use-cases", "MID Server Use Cases", { contentDir: "ch07/25-mid-server-use-cases" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: an Enterprise REST Integration",
    lessons: [
      L(26, "capstone-kickoff-define-the-integration-requirements", "Capstone Kickoff: Define the Integration Requirements", { contentDir: "ch08/26-capstone-kickoff-define-the-integration-requirements" }),
      L(27, "capstone-build-authentication-and-the-rest-message", "Capstone: Build Authentication & the REST Message", { contentDir: "ch08/27-capstone-build-authentication-and-the-rest-message" }),
      L(28, "capstone-build-error-handling-logging-and-retries", "Capstone: Build Error Handling, Logging & Retries", { contentDir: "ch08/28-capstone-build-error-handling-logging-and-retries" }),
      L(29, "capstone-wrap-up-and-integration-test-plan", "Capstone Wrap-Up & Integration Test Plan", { contentDir: "ch08/29-capstone-wrap-up-and-integration-test-plan" }),
    ],
  },
];
