// The Integration Development course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-integration-development/
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

export const SFTA_SALESFORCE_INTEGRATION_DEVELOPMENT_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Outbound Integration",
    lessons: [
      L(1, "integration-development-overview", "Integration Development Overview", { contentDir: "ch01/01-integration-development-overview" }),
      L(2, "callouts", "Callouts", { contentDir: "ch01/02-callouts" }),
      L(3, "named-credentials-and-external-credentials", "Named Credentials and External Credentials", { contentDir: "ch01/03-named-credentials-and-external-credentials" }),
      L(4, "http-callouts-with-apex", "HTTP Callouts With Apex", { contentDir: "ch01/04-http-callouts-with-apex" }),
      L(5, "mock-callouts-and-testing", "Mock Callouts and Testing", { contentDir: "ch01/05-mock-callouts-and-testing" }),
      L(6, "error-handling-and-retries", "Error Handling and Retries", { contentDir: "ch01/06-error-handling-and-retries" }),
      L(7, "callout-limits-and-timeouts", "Callout Limits and Timeouts", { contentDir: "ch01/07-callout-limits-and-timeouts" }),
    ],
  },
  {
    n: 2,
    title: "Inbound Integration",
    lessons: [
      L(8, "web-services-with-apex-rest", "Web Services With Apex REST", { contentDir: "ch02/08-web-services-with-apex-rest" }),
      L(9, "inbound-integration", "Inbound Integration", { contentDir: "ch02/09-inbound-integration" }),
      L(10, "authenticating-inbound-callers", "Authenticating Inbound Callers", { contentDir: "ch02/10-authenticating-inbound-callers" }),
      L(11, "versioning-your-web-services", "Versioning Your Web Services", { contentDir: "ch02/11-versioning-your-web-services" }),
      L(12, "soap-web-services-in-apex", "SOAP Web Services in Apex", { contentDir: "ch02/12-soap-web-services-in-apex" }),
    ],
  },
  {
    n: 3,
    title: "Asynchronous and Event-Based Integration",
    lessons: [
      L(13, "asynchronous-integration", "Asynchronous Integration", { contentDir: "ch03/13-asynchronous-integration" }),
      L(14, "platform-events", "Platform Events", { contentDir: "ch03/14-platform-events" }),
      L(15, "change-data-capture-basics", "Change Data Capture Basics", { contentDir: "ch03/15-change-data-capture-basics" }),
      L(16, "outbound-messaging-and-flow-http-callouts", "Outbound Messaging and Flow HTTP Callouts", { contentDir: "ch03/16-outbound-messaging-and-flow-http-callouts" }),
      L(17, "external-services", "External Services", { contentDir: "ch03/17-external-services" }),
    ],
  },
  {
    n: 4,
    title: "Patterns and Practice",
    lessons: [
      L(18, "integration-patterns", "Integration Patterns", { contentDir: "ch04/18-integration-patterns" }),
      L(19, "request-and-reply-fire-and-forget-batch-sync", "Request and Reply, Fire and Forget, Batch Sync", { contentDir: "ch04/19-request-and-reply-fire-and-forget-batch-sync" }),
      L(20, "choosing-a-pattern", "Choosing a Pattern", { contentDir: "ch04/20-choosing-a-pattern" }),
      L(21, "integration-practice-project-order-sync", "Integration Practice Project: Order Sync", { contentDir: "ch04/21-integration-practice-project-order-sync" }),
      L(22, "integration-practice-project-address-validation", "Integration Practice Project: Address Validation", { contentDir: "ch04/22-integration-practice-project-address-validation" }),
      L(23, "monitoring-integrations", "Monitoring Integrations", { contentDir: "ch04/23-monitoring-integrations" }),
    ],
  },
];
