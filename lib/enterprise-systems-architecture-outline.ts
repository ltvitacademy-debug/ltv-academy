// The Enterprise Systems Architecture course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/enterprise-systems-architecture/
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

export const SFTA_ENTERPRISE_SYSTEMS_ARCHITECTURE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Salesforce in the Enterprise",
    lessons: [
      L(1, "salesforce-in-the-enterprise-landscape", "Salesforce in the Enterprise Landscape"),
      L(2, "external-systems", "External Systems"),
      L(3, "systems-of-record-and-systems-of-engagement", "Systems of Record and Systems of Engagement"),
      L(4, "integration-boundaries", "Integration Boundaries"),
      L(5, "master-data-ownership-across-systems", "Master Data Ownership Across Systems"),
    ],
  },
  {
    n: 2,
    title: "Enterprise Concerns",
    lessons: [
      L(6, "security-in-the-enterprise", "Security in the Enterprise"),
      L(7, "governance", "Governance"),
      L(8, "enterprise-architecture-frameworks-overview", "Enterprise Architecture Frameworks Overview"),
      L(9, "landscape-diagrams", "Landscape Diagrams"),
      L(10, "enterprise-systems-case-study", "Enterprise Systems Case Study"),
    ],
  },
];
