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
      L(1, "what-distributed-systems-are", "What Distributed Systems Are"),
      L(2, "availability", "Availability"),
      L(3, "scalability", "Scalability"),
      L(4, "reliability", "Reliability"),
      L(5, "latency-and-throughput", "Latency and Throughput"),
    ],
  },
  {
    n: 2,
    title: "Consistency and Communication",
    lessons: [
      L(6, "asynchronous-systems", "Asynchronous Systems"),
      L(7, "eventual-consistency", "Eventual Consistency"),
      L(8, "the-cap-theorem-in-practice", "The CAP Theorem in Practice"),
      L(9, "message-queues-and-streams", "Message Queues and Streams"),
      L(10, "failure-handling", "Failure Handling"),
      L(11, "idempotency-and-retries", "Idempotency and Retries"),
    ],
  },
  {
    n: 3,
    title: "Applying the Concepts",
    lessons: [
      L(12, "distributed-systems-and-salesforce", "Distributed Systems and Salesforce"),
      L(13, "designing-for-failure", "Designing for Failure"),
      L(14, "backpressure-and-rate-limiting", "Backpressure and Rate Limiting"),
      L(15, "observability-basics", "Observability Basics"),
      L(16, "distributed-systems-case-study", "Distributed Systems Case Study"),
      L(17, "distributed-systems-practice", "Distributed Systems Practice"),
    ],
  },
];
