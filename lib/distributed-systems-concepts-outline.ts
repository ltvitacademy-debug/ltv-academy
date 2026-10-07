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
      L(1, "what-distributed-systems-are", "What Distributed Systems Are", { contentDir: "ch01/01-what-distributed-systems-are" }),
      L(2, "availability", "Availability", { contentDir: "ch01/02-availability" }),
      L(3, "scalability", "Scalability", { contentDir: "ch01/03-scalability" }),
      L(4, "reliability", "Reliability", { contentDir: "ch01/04-reliability" }),
      L(5, "latency-and-throughput", "Latency and Throughput", { contentDir: "ch01/05-latency-and-throughput" }),
    ],
  },
  {
    n: 2,
    title: "Consistency and Communication",
    lessons: [
      L(6, "asynchronous-systems", "Asynchronous Systems", { contentDir: "ch02/06-asynchronous-systems" }),
      L(7, "eventual-consistency", "Eventual Consistency", { contentDir: "ch02/07-eventual-consistency" }),
      L(8, "the-cap-theorem-in-practice", "The CAP Theorem in Practice", { contentDir: "ch02/08-the-cap-theorem-in-practice" }),
      L(9, "message-queues-and-streams", "Message Queues and Streams", { contentDir: "ch02/09-message-queues-and-streams" }),
      L(10, "failure-handling", "Failure Handling", { contentDir: "ch02/10-failure-handling" }),
      L(11, "idempotency-and-retries", "Idempotency and Retries", { contentDir: "ch02/11-idempotency-and-retries" }),
    ],
  },
  {
    n: 3,
    title: "Applying the Concepts",
    lessons: [
      L(12, "distributed-systems-and-salesforce", "Distributed Systems and Salesforce", { contentDir: "ch03/12-distributed-systems-and-salesforce" }),
      L(13, "designing-for-failure", "Designing for Failure", { contentDir: "ch03/13-designing-for-failure" }),
      L(14, "backpressure-and-rate-limiting", "Backpressure and Rate Limiting", { contentDir: "ch03/14-backpressure-and-rate-limiting" }),
      L(15, "observability-basics", "Observability Basics", { contentDir: "ch03/15-observability-basics" }),
      L(16, "distributed-systems-case-study", "Distributed Systems Case Study", { contentDir: "ch03/16-distributed-systems-case-study" }),
      L(17, "distributed-systems-practice", "Distributed Systems Practice", { contentDir: "ch03/17-distributed-systems-practice" }),
    ],
  },
];
