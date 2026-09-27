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
      L(6, "enterprise-architecture-overview", "Enterprise Architecture Overview"),
    ],
  },
  {
    n: 2,
    title: "Enterprise Concerns",
    lessons: [
      L(7, "security-in-the-enterprise", "Security in the Enterprise"),
      L(8, "governance", "Governance"),
      L(9, "enterprise-architecture-frameworks-overview", "Enterprise Architecture Frameworks Overview"),
      L(10, "landscape-diagrams", "Landscape Diagrams"),
      L(11, "vendor-and-platform-strategy", "Vendor and Platform Strategy"),
      L(12, "multi-org-architecture", "Multi-Org Architecture"),
    ],
  },
  {
    n: 3,
    title: "Enterprise Design",
    lessons: [
      L(13, "enterprise-data-flows", "Enterprise Data Flows"),
      L(14, "enterprise-identity-landscape", "Enterprise Identity Landscape"),
      L(15, "enterprise-monitoring-and-operations", "Enterprise Monitoring and Operations"),
      L(16, "availability-and-disaster-recovery-concepts", "Availability and Disaster Recovery Concepts"),
      L(17, "enterprise-constraints-and-legacy-systems", "Enterprise Constraints and Legacy Systems"),
      L(18, "enterprise-roadmaps", "Enterprise Roadmaps"),
    ],
  },
  {
    n: 4,
    title: "Practice",
    lessons: [
      L(19, "enterprise-systems-case-study", "Enterprise Systems Case Study"),
      L(20, "system-architect-exam-domains", "System Architect Exam Domains"),
      L(21, "exam-style-system-architecture-scenarios", "Exam-Style System Architecture Scenarios"),
      L(22, "system-architecture-review-board-practice", "System Architecture Review Board Practice"),
    ],
  },
];
