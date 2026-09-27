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
      L(1, "event-driven-thinking", "Event-Driven Thinking"),
      L(2, "platform-events", "Platform Events"),
      L(3, "publishing-and-subscribing-to-events", "Publishing and Subscribing to Events"),
      L(4, "change-data-capture", "Change Data Capture"),
      L(5, "streaming-api-and-cometd-concepts", "Streaming API and CometD Concepts"),
      L(6, "event-delivery-and-replay", "Event Delivery and Replay"),
    ],
  },
  {
    n: 2,
    title: "Designing Event-Driven Solutions",
    lessons: [
      L(7, "event-driven-integration", "Event-Driven Integration"),
      L(8, "decoupled-architectures", "Decoupled Architectures"),
      L(9, "event-schema-design", "Event Schema Design"),
      L(10, "ordering-duplicates-and-idempotency", "Ordering, Duplicates and Idempotency"),
      L(11, "event-driven-design-practice", "Event-Driven Design Practice"),
      L(12, "event-limits-and-monitoring", "Event Limits and Monitoring"),
    ],
  },
  {
    n: 3,
    title: "Applying Events",
    lessons: [
      L(13, "pub-sub-api-overview", "Pub/Sub API Overview"),
      L(14, "event-driven-case-study", "Event-Driven Case Study"),
      L(15, "choosing-events-vs-apis-vs-batch", "Choosing Events vs. APIs vs. Batch"),
      L(16, "testing-event-driven-solutions", "Testing Event-Driven Solutions"),
    ],
  },
];
