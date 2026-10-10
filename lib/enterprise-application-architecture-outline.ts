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
      L(1, "what-an-application-architect-does", "What an Application Architect Does", { contentDir: "ch01/01-what-an-application-architect-does" }),
      L(2, "requirements-analysis", "Requirements Analysis", { contentDir: "ch01/02-requirements-analysis" }),
      L(3, "domain-modeling", "Domain Modeling", { contentDir: "ch01/03-domain-modeling" }),
      L(4, "application-boundaries", "Application Boundaries", { contentDir: "ch01/04-application-boundaries" }),
      L(5, "declarative-vs-programmatic-solutions", "Declarative vs. Programmatic Solutions", { contentDir: "ch01/05-declarative-vs-programmatic-solutions" }),
      L(6, "design-patterns-on-the-platform", "Design Patterns on the Platform", { contentDir: "ch01/06-design-patterns-on-the-platform" }),
      L(7, "choosing-clouds-and-features", "Choosing Clouds and Features", { contentDir: "ch01/07-choosing-clouds-and-features" }),
    ],
  },
  {
    n: 2,
    title: "Quality Attributes",
    lessons: [
      L(8, "scalability", "Scalability", { contentDir: "ch02/08-scalability" }),
      L(9, "maintainability", "Maintainability", { contentDir: "ch02/09-maintainability" }),
      L(10, "reuse-and-modularity", "Reuse and Modularity", { contentDir: "ch02/10-reuse-and-modularity" }),
      L(11, "technical-debt", "Technical Debt", { contentDir: "ch02/11-technical-debt" }),
      L(12, "architecture-principles", "Architecture Principles", { contentDir: "ch02/12-architecture-principles" }),
      L(13, "performance-in-application-design", "Performance in Application Design", { contentDir: "ch02/13-performance-in-application-design" }),
      L(14, "extensibility-and-future-change", "Extensibility and Future Change", { contentDir: "ch02/14-extensibility-and-future-change" }),
    ],
  },
  {
    n: 3,
    title: "Application Architecture Practice",
    lessons: [
      L(15, "solution-design-process", "Solution Design Process", { contentDir: "ch03/15-solution-design-process" }),
      L(16, "data-model-and-security-in-application-design", "Data Model and Security in Application Design", { contentDir: "ch03/16-data-model-and-security-in-application-design" }),
      L(17, "automation-design-flow-vs-apex", "Automation Design: Flow vs. Apex", { contentDir: "ch03/17-automation-design-flow-vs-apex" }),
      L(18, "ui-design-lightning-pages-vs-lwc", "UI Design: Lightning Pages vs. LWC", { contentDir: "ch03/18-ui-design-lightning-pages-vs-lwc" }),
      L(19, "packaging-and-modularity", "Packaging and Modularity", { contentDir: "ch03/19-packaging-and-modularity" }),
      L(20, "application-architecture-review", "Application Architecture Review", { contentDir: "ch03/20-application-architecture-review" }),
      L(21, "application-architecture-case-study", "Application Architecture Case Study", { contentDir: "ch03/21-application-architecture-case-study" }),
      L(22, "documenting-design-decisions", "Documenting Design Decisions", { contentDir: "ch03/22-documenting-design-decisions" }),
    ],
  },
  {
    n: 4,
    title: "Exam Preparation",
    lessons: [
      L(23, "application-architect-exam-domains", "Application Architect Exam Domains", { contentDir: "ch04/23-application-architect-exam-domains" }),
      L(24, "exam-style-scenarios", "Exam-Style Scenarios", { contentDir: "ch04/24-exam-style-scenarios" }),
      L(25, "common-application-architecture-mistakes", "Common Application Architecture Mistakes", { contentDir: "ch04/25-common-application-architecture-mistakes" }),
    ],
  },
];
