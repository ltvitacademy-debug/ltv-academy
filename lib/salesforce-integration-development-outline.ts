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
      L(1, "integration-development-overview", "Integration Development Overview"),
      L(2, "callouts", "Callouts"),
      L(3, "named-credentials-and-external-credentials", "Named Credentials and External Credentials"),
      L(4, "http-callouts-with-apex", "HTTP Callouts With Apex"),
      L(5, "mock-callouts-and-testing", "Mock Callouts and Testing"),
      L(6, "error-handling-and-retries", "Error Handling and Retries"),
      L(7, "callout-limits-and-timeouts", "Callout Limits and Timeouts"),
    ],
  },
  {
    n: 2,
    title: "Inbound Integration",
    lessons: [
      L(8, "web-services-with-apex-rest", "Web Services With Apex REST"),
      L(9, "inbound-integration", "Inbound Integration"),
      L(10, "authenticating-inbound-callers", "Authenticating Inbound Callers"),
      L(11, "versioning-your-web-services", "Versioning Your Web Services"),
      L(12, "soap-web-services-in-apex", "SOAP Web Services in Apex"),
    ],
  },
  {
    n: 3,
    title: "Asynchronous and Event-Based Integration",
    lessons: [
      L(13, "asynchronous-integration", "Asynchronous Integration"),
      L(14, "platform-events", "Platform Events"),
      L(15, "change-data-capture-basics", "Change Data Capture Basics"),
      L(16, "outbound-messaging-and-flow-http-callouts", "Outbound Messaging and Flow HTTP Callouts"),
      L(17, "external-services", "External Services"),
    ],
  },
  {
    n: 4,
    title: "Patterns and Practice",
    lessons: [
      L(18, "integration-patterns", "Integration Patterns"),
      L(19, "request-and-reply-fire-and-forget-batch-sync", "Request and Reply, Fire and Forget, Batch Sync"),
      L(20, "choosing-a-pattern", "Choosing a Pattern"),
      L(21, "integration-practice-project-order-sync", "Integration Practice Project: Order Sync"),
      L(22, "integration-practice-project-address-validation", "Integration Practice Project: Address Validation"),
      L(23, "monitoring-integrations", "Monitoring Integrations"),
    ],
  },
];
