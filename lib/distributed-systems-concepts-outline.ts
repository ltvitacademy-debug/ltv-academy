// The Distributed Systems Concepts course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/distributed-systems-concepts/
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

export const SFTA_DISTRIBUTED_SYSTEMS_CONCEPTS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Distributed Systems",
    lessons: [
      L(1, "availability", "Availability"),
      L(2, "scalability", "Scalability"),
      L(3, "reliability", "Reliability"),
      L(4, "asynchronous-systems", "Asynchronous Systems"),
      L(5, "eventual-consistency", "Eventual Consistency"),
      L(6, "failure-handling", "Failure Handling"),
      L(7, "idempotency-and-retries", "Idempotency and Retries"),
    ],
  },
];
