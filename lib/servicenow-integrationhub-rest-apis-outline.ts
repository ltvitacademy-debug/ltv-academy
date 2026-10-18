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
      L(1, "why-enterprises-integrate-servicenow-with-everything", "Why Enterprises Integrate ServiceNow With Everything"),
      L(2, "integration-patterns-overview", "Integration Patterns: Overview"),
      L(3, "rest-vs-soap-vs-event-driven-integration", "REST vs. SOAP vs. Event-Driven Integration"),
    ],
  },
  {
    n: 2,
    title: "Consuming External REST APIs",
    lessons: [
      L(4, "the-rest-message-record", "The REST Message Record"),
      L(5, "building-and-testing-a-rest-message", "Building & Testing a REST Message"),
      L(6, "calling-a-rest-message-from-script", "Calling a REST Message From Script"),
      L(7, "consuming-rest-apis-lab", "Consuming REST APIs Lab"),
    ],
  },
  {
    n: 3,
    title: "Authentication for Integrations",
    lessons: [
      L(8, "basic-auth-and-why-its-rarely-enough", "Basic Auth & Why It's Rarely Enough"),
      L(9, "oauth-2-0-for-servicenow-integrations", "OAuth 2.0 for ServiceNow Integrations"),
      L(10, "mutual-authentication-and-api-keys", "Mutual Authentication & API Keys"),
      L(11, "authentication-lab", "Authentication Lab"),
    ],
  },
  {
    n: 4,
    title: "Exposing ServiceNow Data via REST",
    lessons: [
      L(12, "the-table-api", "The Table API"),
      L(13, "scripted-rest-apis-a-developers-depth-view", "Scripted REST APIs: a Developer's-Depth View"),
      L(14, "versioning-a-scripted-rest-api", "Versioning a Scripted REST API"),
      L(15, "exposing-data-lab", "Exposing Data Lab"),
    ],
  },
  {
    n: 5,
    title: "IntegrationHub",
    lessons: [
      L(16, "what-integrationhub-actually-adds", "What IntegrationHub Actually Adds"),
      L(17, "spokes-and-connector-actions", "Spokes & Connector Actions"),
      L(18, "building-a-custom-spoke-action", "Building a Custom Spoke Action"),
      L(19, "integrationhub-lab", "IntegrationHub Lab"),
    ],
  },
  {
    n: 6,
    title: "Error Handling, Logging & Retries",
    lessons: [
      L(20, "designing-for-integration-failures", "Designing for Integration Failures"),
      L(21, "retry-strategies-and-idempotency", "Retry Strategies & Idempotency"),
      L(22, "logging-integration-activity-for-troubleshooting", "Logging Integration Activity for Troubleshooting"),
      L(23, "error-handling-lab", "Error Handling Lab"),
    ],
  },
  {
    n: 7,
    title: "MID Server & On-Premises Integration",
    lessons: [
      L(24, "what-a-mid-server-does-and-why-its-needed", "What a MID Server Does & Why It's Needed"),
      L(25, "mid-server-use-cases", "MID Server Use Cases"),
    ],
  },
  {
    n: 8,
    title: "Capstone: an Enterprise REST Integration",
    lessons: [
      L(26, "capstone-kickoff-define-the-integration-requirements", "Capstone Kickoff: Define the Integration Requirements"),
      L(27, "capstone-build-authentication-and-the-rest-message", "Capstone: Build Authentication & the REST Message"),
      L(28, "capstone-build-error-handling-logging-and-retries", "Capstone: Build Error Handling, Logging & Retries"),
      L(29, "capstone-wrap-up-and-integration-test-plan", "Capstone Wrap-Up & Integration Test Plan"),
    ],
  },
];
