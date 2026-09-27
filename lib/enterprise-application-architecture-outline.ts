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
      L(1, "what-an-application-architect-does", "What an Application Architect Does"),
      L(2, "requirements-analysis", "Requirements Analysis"),
      L(3, "domain-modeling", "Domain Modeling"),
      L(4, "application-boundaries", "Application Boundaries"),
      L(5, "declarative-vs-programmatic-solutions", "Declarative vs. Programmatic Solutions"),
      L(6, "design-patterns-on-the-platform", "Design Patterns on the Platform"),
      L(7, "choosing-clouds-and-features", "Choosing Clouds and Features"),
    ],
  },
  {
    n: 2,
    title: "Quality Attributes",
    lessons: [
      L(8, "scalability", "Scalability"),
      L(9, "maintainability", "Maintainability"),
      L(10, "reuse-and-modularity", "Reuse and Modularity"),
      L(11, "technical-debt", "Technical Debt"),
      L(12, "architecture-principles", "Architecture Principles"),
      L(13, "performance-in-application-design", "Performance in Application Design"),
      L(14, "extensibility-and-future-change", "Extensibility and Future Change"),
    ],
  },
  {
    n: 3,
    title: "Application Architecture Practice",
    lessons: [
      L(15, "solution-design-process", "Solution Design Process"),
      L(16, "data-model-and-security-in-application-design", "Data Model and Security in Application Design"),
      L(17, "automation-design-flow-vs-apex", "Automation Design: Flow vs. Apex"),
      L(18, "ui-design-lightning-pages-vs-lwc", "UI Design: Lightning Pages vs. LWC"),
      L(19, "packaging-and-modularity", "Packaging and Modularity"),
      L(20, "application-architecture-review", "Application Architecture Review"),
      L(21, "application-architecture-case-study", "Application Architecture Case Study"),
      L(22, "documenting-design-decisions", "Documenting Design Decisions"),
    ],
  },
  {
    n: 4,
    title: "Exam Preparation",
    lessons: [
      L(23, "application-architect-exam-domains", "Application Architect Exam Domains"),
      L(24, "exam-style-scenarios", "Exam-Style Scenarios"),
      L(25, "common-application-architecture-mistakes", "Common Application Architecture Mistakes"),
    ],
  },
];
