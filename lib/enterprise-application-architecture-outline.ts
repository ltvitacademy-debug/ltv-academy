// The Enterprise Application Architecture course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/enterprise-application-architecture/
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

export const SFTA_ENTERPRISE_APPLICATION_ARCHITECTURE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Designing Applications",
    lessons: [
      L(1, "requirements-analysis", "Requirements Analysis"),
      L(2, "domain-modeling", "Domain Modeling"),
      L(3, "application-boundaries", "Application Boundaries"),
      L(4, "declarative-vs-programmatic-solutions", "Declarative vs. Programmatic Solutions"),
      L(5, "design-patterns-on-the-platform", "Design Patterns on the Platform"),
    ],
  },
  {
    n: 2,
    title: "Quality Attributes",
    lessons: [
      L(6, "scalability", "Scalability"),
      L(7, "maintainability", "Maintainability"),
      L(8, "reuse-and-modularity", "Reuse and Modularity"),
      L(9, "technical-debt", "Technical Debt"),
      L(10, "architecture-principles", "Architecture Principles"),
    ],
  },
];
