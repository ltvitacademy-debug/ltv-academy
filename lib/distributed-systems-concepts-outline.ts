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
      L(1, "what-distributed-systems-are", "What Distributed Systems Are", { contentDir: "ch01/01-what-distributed-systems-are", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792506116/ltv-distributed-systems-concepts/what-distributed-systems-are.mp4", durationLabel: "1 min 57 s" }),
      L(2, "availability", "Availability", { contentDir: "ch01/02-availability", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792506889/ltv-distributed-systems-concepts/availability.mp4", durationLabel: "1 min 58 s" }),
      L(3, "scalability", "Scalability", { contentDir: "ch01/03-scalability", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507662/ltv-distributed-systems-concepts/scalability.mp4", durationLabel: "1 min 55 s" }),
      L(4, "reliability", "Reliability", { contentDir: "ch01/04-reliability", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508389/ltv-distributed-systems-concepts/reliability.mp4", durationLabel: "1 min 48 s" }),
      L(5, "latency-and-throughput", "Latency and Throughput", { contentDir: "ch01/05-latency-and-throughput", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509104/ltv-distributed-systems-concepts/latency-and-throughput.mp4", durationLabel: "1 min 56 s" }),
    ],
  },
  {
    n: 2,
    title: "Consistency and Communication",
    lessons: [
      L(6, "asynchronous-systems", "Asynchronous Systems", { contentDir: "ch02/06-asynchronous-systems", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509924/ltv-distributed-systems-concepts/asynchronous-systems.mp4", durationLabel: "2 min 10 s" }),
      L(7, "eventual-consistency", "Eventual Consistency", { contentDir: "ch02/07-eventual-consistency", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510838/ltv-distributed-systems-concepts/eventual-consistency.mp4", durationLabel: "2 min 24 s" }),
      L(8, "the-cap-theorem-in-practice", "The CAP Theorem in Practice", { contentDir: "ch02/08-the-cap-theorem-in-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511674/ltv-distributed-systems-concepts/the-cap-theorem-in-practice.mp4", durationLabel: "2 min 13 s" }),
      L(9, "message-queues-and-streams", "Message Queues and Streams", { contentDir: "ch02/09-message-queues-and-streams", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512600/ltv-distributed-systems-concepts/message-queues-and-streams.mp4", durationLabel: "2 min 26 s" }),
      L(10, "failure-handling", "Failure Handling", { contentDir: "ch02/10-failure-handling", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513512/ltv-distributed-systems-concepts/failure-handling.mp4", durationLabel: "2 min 18 s" }),
      L(11, "idempotency-and-retries", "Idempotency and Retries", { contentDir: "ch02/11-idempotency-and-retries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514419/ltv-distributed-systems-concepts/idempotency-and-retries.mp4", durationLabel: "2 min 22 s" }),
    ],
  },
  {
    n: 3,
    title: "Applying the Concepts",
    lessons: [
      L(12, "distributed-systems-and-salesforce", "Distributed Systems and Salesforce", { contentDir: "ch03/12-distributed-systems-and-salesforce", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792515269/ltv-distributed-systems-concepts/distributed-systems-and-salesforce.mp4", durationLabel: "2 min 9 s" }),
      L(13, "designing-for-failure", "Designing for Failure", { contentDir: "ch03/13-designing-for-failure", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516205/ltv-distributed-systems-concepts/designing-for-failure.mp4", durationLabel: "2 min 15 s" }),
      L(14, "backpressure-and-rate-limiting", "Backpressure and Rate Limiting", { contentDir: "ch03/14-backpressure-and-rate-limiting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792517091/ltv-distributed-systems-concepts/backpressure-and-rate-limiting.mp4", durationLabel: "2 min 20 s" }),
      L(15, "observability-basics", "Observability Basics", { contentDir: "ch03/15-observability-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518051/ltv-distributed-systems-concepts/observability-basics.mp4", durationLabel: "2 min 26 s" }),
      L(16, "distributed-systems-case-study", "Distributed Systems Case Study", { contentDir: "ch03/16-distributed-systems-case-study", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518926/ltv-distributed-systems-concepts/distributed-systems-case-study.mp4", durationLabel: "2 min 7 s" }),
      L(17, "distributed-systems-practice", "Distributed Systems Practice", { contentDir: "ch03/17-distributed-systems-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519841/ltv-distributed-systems-concepts/distributed-systems-practice.mp4", durationLabel: "2 min 11 s" }),
    ],
  },
];
