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
      L(1, "platform-events", "Platform Events"),
      L(2, "change-data-capture", "Change Data Capture"),
      L(3, "event-delivery-and-replay", "Event Delivery and Replay"),
      L(4, "event-driven-integration", "Event-Driven Integration"),
      L(5, "decoupled-architectures", "Decoupled Architectures"),
      L(6, "event-driven-design-practice", "Event-Driven Design Practice"),
    ],
  },
];
