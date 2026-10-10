// The Event-Driven Salesforce course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/event-driven-salesforce/
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

export const SFTA_EVENT_DRIVEN_SALESFORCE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Events in Salesforce",
    lessons: [
      L(1, "event-driven-thinking", "Event-Driven Thinking", { contentDir: "ch01/01-event-driven-thinking" }),
      L(2, "platform-events", "Platform Events", { contentDir: "ch01/02-platform-events" }),
      L(3, "publishing-and-subscribing-to-events", "Publishing and Subscribing to Events", { contentDir: "ch01/03-publishing-and-subscribing-to-events" }),
      L(4, "change-data-capture", "Change Data Capture", { contentDir: "ch01/04-change-data-capture" }),
      L(5, "streaming-api-and-cometd-concepts", "Streaming API and CometD Concepts", { contentDir: "ch01/05-streaming-api-and-cometd-concepts" }),
      L(6, "event-delivery-and-replay", "Event Delivery and Replay", { contentDir: "ch01/06-event-delivery-and-replay" }),
    ],
  },
  {
    n: 2,
    title: "Designing Event-Driven Solutions",
    lessons: [
      L(7, "event-driven-integration", "Event-Driven Integration", { contentDir: "ch02/07-event-driven-integration" }),
      L(8, "decoupled-architectures", "Decoupled Architectures", { contentDir: "ch02/08-decoupled-architectures" }),
      L(9, "event-schema-design", "Event Schema Design", { contentDir: "ch02/09-event-schema-design" }),
      L(10, "ordering-duplicates-and-idempotency", "Ordering, Duplicates and Idempotency", { contentDir: "ch02/10-ordering-duplicates-and-idempotency" }),
      L(11, "event-driven-design-practice", "Event-Driven Design Practice", { contentDir: "ch02/11-event-driven-design-practice" }),
      L(12, "event-limits-and-monitoring", "Event Limits and Monitoring", { contentDir: "ch02/12-event-limits-and-monitoring" }),
    ],
  },
  {
    n: 3,
    title: "Applying Events",
    lessons: [
      L(13, "pub-sub-api-overview", "Pub/Sub API Overview", { contentDir: "ch03/13-pub-sub-api-overview" }),
      L(14, "event-driven-case-study", "Event-Driven Case Study", { contentDir: "ch03/14-event-driven-case-study" }),
      L(15, "choosing-events-vs-apis-vs-batch", "Choosing Events vs. APIs vs. Batch", { contentDir: "ch03/15-choosing-events-vs-apis-vs-batch" }),
      L(16, "testing-event-driven-solutions", "Testing Event-Driven Solutions", { contentDir: "ch03/16-testing-event-driven-solutions" }),
    ],
  },
];
