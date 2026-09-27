// The Architecture Tradeoffs course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/architecture-tradeoffs/
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

export const SFTA_ARCHITECTURE_TRADEOFFS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Architecture Tradeoffs",
    lessons: [
      L(1, "what-a-tradeoff-is", "What a Tradeoff Is"),
      L(2, "security-vs-usability", "Security vs. Usability"),
      L(3, "performance-vs-complexity", "Performance vs. Complexity"),
      L(4, "build-vs-buy", "Build vs. Buy"),
      L(5, "synchronous-vs-asynchronous", "Synchronous vs. Asynchronous"),
      L(6, "declarative-vs-programmatic", "Declarative vs. Programmatic"),
      L(7, "real-time-vs-batch", "Real-Time vs. Batch"),
      L(8, "documenting-tradeoffs", "Documenting Tradeoffs"),
    ],
  },
  {
    n: 2,
    title: "Tradeoffs in Depth",
    lessons: [
      L(9, "cost-vs-capability", "Cost vs. Capability"),
      L(10, "speed-to-market-vs-long-term-design", "Speed to Market vs. Long-Term Design"),
      L(11, "standardization-vs-flexibility", "Standardization vs. Flexibility"),
      L(12, "centralized-vs-decentralized-design", "Centralized vs. Decentralized Design"),
      L(13, "custom-code-vs-managed-packages", "Custom Code vs. Managed Packages"),
      L(14, "governance-vs-agility", "Governance vs. Agility"),
    ],
  },
  {
    n: 3,
    title: "Applying Tradeoffs",
    lessons: [
      L(15, "explaining-tradeoffs-to-executives", "Explaining Tradeoffs to Executives"),
      L(16, "tradeoff-practice", "Tradeoff Practice"),
      L(17, "tradeoff-case-study-service-console", "Tradeoff Case Study: Service Console"),
      L(18, "tradeoff-case-study-integration-platform", "Tradeoff Case Study: Integration Platform"),
      L(19, "tradeoff-review-board-practice", "Tradeoff Review Board Practice"),
      L(20, "common-tradeoff-mistakes", "Common Tradeoff Mistakes"),
    ],
  },
];
