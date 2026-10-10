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
      L(1, "salesforce-in-the-enterprise-landscape", "Salesforce in the Enterprise Landscape", { contentDir: "ch01/01-salesforce-in-the-enterprise-landscape" }),
      L(2, "external-systems", "External Systems", { contentDir: "ch01/02-external-systems" }),
      L(3, "systems-of-record-and-systems-of-engagement", "Systems of Record and Systems of Engagement", { contentDir: "ch01/03-systems-of-record-and-systems-of-engagement" }),
      L(4, "integration-boundaries", "Integration Boundaries", { contentDir: "ch01/04-integration-boundaries" }),
      L(5, "master-data-ownership-across-systems", "Master Data Ownership Across Systems", { contentDir: "ch01/05-master-data-ownership-across-systems" }),
      L(6, "enterprise-architecture-overview", "Enterprise Architecture Overview", { contentDir: "ch01/06-enterprise-architecture-overview" }),
    ],
  },
  {
    n: 2,
    title: "Enterprise Concerns",
    lessons: [
      L(7, "security-in-the-enterprise", "Security in the Enterprise", { contentDir: "ch02/07-security-in-the-enterprise" }),
      L(8, "governance", "Governance", { contentDir: "ch02/08-governance" }),
      L(9, "enterprise-architecture-frameworks-overview", "Enterprise Architecture Frameworks Overview", { contentDir: "ch02/09-enterprise-architecture-frameworks-overview" }),
      L(10, "landscape-diagrams", "Landscape Diagrams", { contentDir: "ch02/10-landscape-diagrams" }),
      L(11, "vendor-and-platform-strategy", "Vendor and Platform Strategy", { contentDir: "ch02/11-vendor-and-platform-strategy" }),
      L(12, "multi-org-architecture", "Multi-Org Architecture", { contentDir: "ch02/12-multi-org-architecture" }),
    ],
  },
  {
    n: 3,
    title: "Enterprise Design",
    lessons: [
      L(13, "enterprise-data-flows", "Enterprise Data Flows", { contentDir: "ch03/13-enterprise-data-flows" }),
      L(14, "enterprise-identity-landscape", "Enterprise Identity Landscape", { contentDir: "ch03/14-enterprise-identity-landscape" }),
      L(15, "enterprise-monitoring-and-operations", "Enterprise Monitoring and Operations", { contentDir: "ch03/15-enterprise-monitoring-and-operations" }),
      L(16, "availability-and-disaster-recovery-concepts", "Availability and Disaster Recovery Concepts", { contentDir: "ch03/16-availability-and-disaster-recovery-concepts" }),
      L(17, "enterprise-constraints-and-legacy-systems", "Enterprise Constraints and Legacy Systems", { contentDir: "ch03/17-enterprise-constraints-and-legacy-systems" }),
      L(18, "enterprise-roadmaps", "Enterprise Roadmaps", { contentDir: "ch03/18-enterprise-roadmaps" }),
    ],
  },
  {
    n: 4,
    title: "Practice",
    lessons: [
      L(19, "enterprise-systems-case-study", "Enterprise Systems Case Study", { contentDir: "ch04/19-enterprise-systems-case-study" }),
      L(20, "system-architect-exam-domains", "System Architect Exam Domains", { contentDir: "ch04/20-system-architect-exam-domains" }),
      L(21, "exam-style-system-architecture-scenarios", "Exam-Style System Architecture Scenarios", { contentDir: "ch04/21-exam-style-system-architecture-scenarios" }),
      L(22, "system-architecture-review-board-practice", "System Architecture Review Board Practice", { contentDir: "ch04/22-system-architecture-review-board-practice" }),
    ],
  },
];
