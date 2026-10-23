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
      L(1, "why-enterprises-integrate-servicenow-with-everything", "Why Enterprises Integrate ServiceNow With Everything", { contentDir: "ch01/01-why-enterprises-integrate-servicenow-with-everything", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792715353/ltv-servicenow-integrationhub-rest-apis/why-enterprises-integrate-servicenow-with-everything.mp4", durationLabel: "2 min 4 s" }),
      L(2, "integration-patterns-overview", "Integration Patterns: Overview", { contentDir: "ch01/02-integration-patterns-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792715417/ltv-servicenow-integrationhub-rest-apis/integration-patterns-overview.mp4", durationLabel: "2 min 26 s" }),
      L(3, "rest-vs-soap-vs-event-driven-integration", "REST vs. SOAP vs. Event-Driven Integration", { contentDir: "ch01/03-rest-vs-soap-vs-event-driven-integration", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792715478/ltv-servicenow-integrationhub-rest-apis/rest-vs-soap-vs-event-driven-integration.mp4", durationLabel: "2 min 20 s" }),
    ],
  },
  {
    n: 2,
    title: "Consuming External REST APIs",
    lessons: [
      L(4, "the-rest-message-record", "The REST Message Record", { contentDir: "ch02/04-the-rest-message-record", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792715540/ltv-servicenow-integrationhub-rest-apis/the-rest-message-record.mp4", durationLabel: "2 min 20 s" }),
      L(5, "building-and-testing-a-rest-message", "Building & Testing a REST Message", { contentDir: "ch02/05-building-and-testing-a-rest-message", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792715600/ltv-servicenow-integrationhub-rest-apis/building-and-testing-a-rest-message.mp4", durationLabel: "2 min 19 s" }),
      L(6, "calling-a-rest-message-from-script", "Calling a REST Message From Script", { contentDir: "ch02/06-calling-a-rest-message-from-script", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792715669/ltv-servicenow-integrationhub-rest-apis/calling-a-rest-message-from-script.mp4", durationLabel: "2 min 39 s" }),
      L(7, "consuming-rest-apis-lab", "Consuming REST APIs Lab", { contentDir: "ch02/07-consuming-rest-apis-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792715729/ltv-servicenow-integrationhub-rest-apis/consuming-rest-apis-lab.mp4", durationLabel: "2 min 14 s" }),
    ],
  },
  {
    n: 3,
    title: "Authentication for Integrations",
    lessons: [
      L(8, "basic-auth-and-why-its-rarely-enough", "Basic Auth & Why It's Rarely Enough", { contentDir: "ch03/08-basic-auth-and-why-its-rarely-enough", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792715797/ltv-servicenow-integrationhub-rest-apis/basic-auth-and-why-its-rarely-enough.mp4", durationLabel: "2 min 40 s" }),
      L(9, "oauth-2-0-for-servicenow-integrations", "OAuth 2.0 for ServiceNow Integrations", { contentDir: "ch03/09-oauth-2-0-for-servicenow-integrations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792715858/ltv-servicenow-integrationhub-rest-apis/oauth-2-0-for-servicenow-integrations.mp4", durationLabel: "2 min 18 s" }),
      L(10, "mutual-authentication-and-api-keys", "Mutual Authentication & API Keys", { contentDir: "ch03/10-mutual-authentication-and-api-keys", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792715918/ltv-servicenow-integrationhub-rest-apis/mutual-authentication-and-api-keys.mp4", durationLabel: "2 min 19 s" }),
      L(11, "authentication-lab", "Authentication Lab", { contentDir: "ch03/11-authentication-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792715984/ltv-servicenow-integrationhub-rest-apis/authentication-lab.mp4", durationLabel: "2 min 29 s" }),
    ],
  },
  {
    n: 4,
    title: "Exposing ServiceNow Data via REST",
    lessons: [
      L(12, "the-table-api", "The Table API", { contentDir: "ch04/12-the-table-api", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792716049/ltv-servicenow-integrationhub-rest-apis/the-table-api.mp4", durationLabel: "2 min 30 s" }),
      L(13, "scripted-rest-apis-a-developers-depth-view", "Scripted REST APIs: a Developer's-Depth View", { contentDir: "ch04/13-scripted-rest-apis-a-developers-depth-view", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792716114/ltv-servicenow-integrationhub-rest-apis/scripted-rest-apis-a-developers-depth-view.mp4", durationLabel: "2 min 28 s" }),
      L(14, "versioning-a-scripted-rest-api", "Versioning a Scripted REST API", { contentDir: "ch04/14-versioning-a-scripted-rest-api", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792717233/ltv-servicenow-integrationhub-rest-apis/versioning-a-scripted-rest-api.mp4", durationLabel: "2 min 14 s" }),
      L(15, "exposing-data-lab", "Exposing Data Lab", { contentDir: "ch04/15-exposing-data-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792717306/ltv-servicenow-integrationhub-rest-apis/exposing-data-lab.mp4", durationLabel: "2 min 36 s" }),
    ],
  },
  {
    n: 5,
    title: "IntegrationHub",
    lessons: [
      L(16, "what-integrationhub-actually-adds", "What IntegrationHub Actually Adds", { contentDir: "ch05/16-what-integrationhub-actually-adds", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792716271/ltv-servicenow-integrationhub-rest-apis/what-integrationhub-actually-adds.mp4", durationLabel: "2 min 44 s" }),
      L(17, "spokes-and-connector-actions", "Spokes & Connector Actions", { contentDir: "ch05/17-spokes-and-connector-actions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792716338/ltv-servicenow-integrationhub-rest-apis/spokes-and-connector-actions.mp4", durationLabel: "2 min 38 s" }),
      L(18, "building-a-custom-spoke-action", "Building a Custom Spoke Action", { contentDir: "ch05/18-building-a-custom-spoke-action", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792716409/ltv-servicenow-integrationhub-rest-apis/building-a-custom-spoke-action.mp4", durationLabel: "2 min 48 s" }),
      L(19, "integrationhub-lab", "IntegrationHub Lab", { contentDir: "ch05/19-integrationhub-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792716483/ltv-servicenow-integrationhub-rest-apis/integrationhub-lab.mp4", durationLabel: "2 min 54 s" }),
    ],
  },
  {
    n: 6,
    title: "Error Handling, Logging & Retries",
    lessons: [
      L(20, "designing-for-integration-failures", "Designing for Integration Failures", { contentDir: "ch06/20-designing-for-integration-failures", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792716558/ltv-servicenow-integrationhub-rest-apis/designing-for-integration-failures.mp4", durationLabel: "2 min 59 s" }),
      L(21, "retry-strategies-and-idempotency", "Retry Strategies & Idempotency", { contentDir: "ch06/21-retry-strategies-and-idempotency", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792716636/ltv-servicenow-integrationhub-rest-apis/retry-strategies-and-idempotency.mp4", durationLabel: "3 min 2 s" }),
      L(22, "logging-integration-activity-for-troubleshooting", "Logging Integration Activity for Troubleshooting", { contentDir: "ch06/22-logging-integration-activity-for-troubleshooting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792716708/ltv-servicenow-integrationhub-rest-apis/logging-integration-activity-for-troubleshooting.mp4", durationLabel: "2 min 45 s" }),
      L(23, "error-handling-lab", "Error Handling Lab", { contentDir: "ch06/23-error-handling-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792716792/ltv-servicenow-integrationhub-rest-apis/error-handling-lab.mp4", durationLabel: "3 min 21 s" }),
    ],
  },
  {
    n: 7,
    title: "MID Server & On-Premises Integration",
    lessons: [
      L(24, "what-a-mid-server-does-and-why-its-needed", "What a MID Server Does & Why It's Needed", { contentDir: "ch07/24-what-a-mid-server-does-and-why-its-needed", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792716846/ltv-servicenow-integrationhub-rest-apis/what-a-mid-server-does-and-why-its-needed.mp4", durationLabel: "2 min 3 s" }),
      L(25, "mid-server-use-cases", "MID Server Use Cases", { contentDir: "ch07/25-mid-server-use-cases", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792716897/ltv-servicenow-integrationhub-rest-apis/mid-server-use-cases.mp4", durationLabel: "1 min 58 s" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: an Enterprise REST Integration",
    lessons: [
      L(26, "capstone-kickoff-define-the-integration-requirements", "Capstone Kickoff: Define the Integration Requirements", { contentDir: "ch08/26-capstone-kickoff-define-the-integration-requirements", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792716967/ltv-servicenow-integrationhub-rest-apis/capstone-kickoff-define-the-integration-requirements.mp4", durationLabel: "2 min 39 s" }),
      L(27, "capstone-build-authentication-and-the-rest-message", "Capstone: Build Authentication & the REST Message", { contentDir: "ch08/27-capstone-build-authentication-and-the-rest-message", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792717034/ltv-servicenow-integrationhub-rest-apis/capstone-build-authentication-and-the-rest-message.mp4", durationLabel: "2 min 31 s" }),
      L(28, "capstone-build-error-handling-logging-and-retries", "Capstone: Build Error Handling, Logging & Retries", { contentDir: "ch08/28-capstone-build-error-handling-logging-and-retries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792717103/ltv-servicenow-integrationhub-rest-apis/capstone-build-error-handling-logging-and-retries.mp4", durationLabel: "2 min 34 s" }),
      L(29, "capstone-wrap-up-and-integration-test-plan", "Capstone Wrap-Up & Integration Test Plan", { contentDir: "ch08/29-capstone-wrap-up-and-integration-test-plan", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792717175/ltv-servicenow-integrationhub-rest-apis/capstone-wrap-up-and-integration-test-plan.mp4", durationLabel: "2 min 41 s" }),
    ],
  },
];
