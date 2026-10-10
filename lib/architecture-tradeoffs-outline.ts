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
      L(1, "what-a-tradeoff-is", "What a Tradeoff Is", { contentDir: "ch01/01-what-a-tradeoff-is" }),
      L(2, "security-vs-usability", "Security vs. Usability", { contentDir: "ch01/02-security-vs-usability" }),
      L(3, "performance-vs-complexity", "Performance vs. Complexity", { contentDir: "ch01/03-performance-vs-complexity" }),
      L(4, "build-vs-buy", "Build vs. Buy", { contentDir: "ch01/04-build-vs-buy" }),
      L(5, "synchronous-vs-asynchronous", "Synchronous vs. Asynchronous", { contentDir: "ch01/05-synchronous-vs-asynchronous" }),
      L(6, "declarative-vs-programmatic", "Declarative vs. Programmatic", { contentDir: "ch01/06-declarative-vs-programmatic" }),
      L(7, "real-time-vs-batch", "Real-Time vs. Batch", { contentDir: "ch01/07-real-time-vs-batch" }),
      L(8, "documenting-tradeoffs", "Documenting Tradeoffs", { contentDir: "ch01/08-documenting-tradeoffs" }),
    ],
  },
  {
    n: 2,
    title: "Tradeoffs in Depth",
    lessons: [
      L(9, "cost-vs-capability", "Cost vs. Capability", { contentDir: "ch02/09-cost-vs-capability" }),
      L(10, "speed-to-market-vs-long-term-design", "Speed to Market vs. Long-Term Design", { contentDir: "ch02/10-speed-to-market-vs-long-term-design" }),
      L(11, "standardization-vs-flexibility", "Standardization vs. Flexibility", { contentDir: "ch02/11-standardization-vs-flexibility" }),
      L(12, "centralized-vs-decentralized-design", "Centralized vs. Decentralized Design", { contentDir: "ch02/12-centralized-vs-decentralized-design" }),
      L(13, "custom-code-vs-managed-packages", "Custom Code vs. Managed Packages", { contentDir: "ch02/13-custom-code-vs-managed-packages" }),
      L(14, "governance-vs-agility", "Governance vs. Agility", { contentDir: "ch02/14-governance-vs-agility" }),
    ],
  },
  {
    n: 3,
    title: "Applying Tradeoffs",
    lessons: [
      L(15, "explaining-tradeoffs-to-executives", "Explaining Tradeoffs to Executives", { contentDir: "ch03/15-explaining-tradeoffs-to-executives" }),
      L(16, "tradeoff-practice", "Tradeoff Practice", { contentDir: "ch03/16-tradeoff-practice" }),
      L(17, "tradeoff-case-study-service-console", "Tradeoff Case Study: Service Console", { contentDir: "ch03/17-tradeoff-case-study-service-console" }),
      L(18, "tradeoff-case-study-integration-platform", "Tradeoff Case Study: Integration Platform", { contentDir: "ch03/18-tradeoff-case-study-integration-platform" }),
      L(19, "tradeoff-review-board-practice", "Tradeoff Review Board Practice", { contentDir: "ch03/19-tradeoff-review-board-practice" }),
      L(20, "common-tradeoff-mistakes", "Common Tradeoff Mistakes", { contentDir: "ch03/20-common-tradeoff-mistakes" }),
    ],
  },
];
