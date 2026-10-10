// The LTV Global Enterprise Transformation course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ltv-global-enterprise-transformation/
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

export const SFTA_LTV_GLOBAL_ENTERPRISE_TRANSFORMATION_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Scenario and Requirements",
    lessons: [
      L(1, "capstone-kickoff-the-ltv-global-scenario", "Capstone Kickoff: The LTV Global Scenario", { contentDir: "ch01/01-capstone-kickoff-the-ltv-global-scenario" }),
      L(2, "requirements-constraints-and-assumptions", "Requirements, Constraints and Assumptions", { contentDir: "ch01/02-requirements-constraints-and-assumptions" }),
      L(3, "stakeholders-and-business-drivers", "Stakeholders and Business Drivers", { contentDir: "ch01/03-stakeholders-and-business-drivers" }),
      L(4, "current-state-landscape-analysis", "Current-State Landscape Analysis", { contentDir: "ch01/04-current-state-landscape-analysis" }),
      L(5, "target-state-vision", "Target-State Vision", { contentDir: "ch01/05-target-state-vision" }),
      L(6, "risk-identification", "Risk Identification", { contentDir: "ch01/06-risk-identification" }),
    ],
  },
  {
    n: 2,
    title: "Core Architecture",
    lessons: [
      L(7, "salesforce-application-architecture", "Salesforce Application Architecture", { contentDir: "ch02/07-salesforce-application-architecture" }),
      L(8, "data-architecture", "Data Architecture", { contentDir: "ch02/08-data-architecture" }),
      L(9, "data-model-design", "Data Model Design", { contentDir: "ch02/09-data-model-design" }),
      L(10, "large-data-volume-strategy", "Large Data Volume Strategy", { contentDir: "ch02/10-large-data-volume-strategy" }),
      L(11, "security-and-sharing-architecture", "Security and Sharing Architecture", { contentDir: "ch02/11-security-and-sharing-architecture" }),
      L(12, "identity-architecture", "Identity Architecture", { contentDir: "ch02/12-identity-architecture" }),
    ],
  },
  {
    n: 3,
    title: "Integration and Platform Architecture",
    lessons: [
      L(13, "integration-and-api-architecture", "Integration and API Architecture", { contentDir: "ch03/13-integration-and-api-architecture" }),
      L(14, "erp-and-financial-system-integration", "ERP and Financial System Integration", { contentDir: "ch03/14-erp-and-financial-system-integration" }),
      L(15, "data-warehouse-and-external-api-integration", "Data Warehouse and External API Integration", { contentDir: "ch03/15-data-warehouse-and-external-api-integration" }),
      L(16, "customer-portal-architecture", "Customer Portal Architecture", { contentDir: "ch03/16-customer-portal-architecture" }),
      L(17, "nonfunctional-requirements-design", "Nonfunctional Requirements Design", { contentDir: "ch03/17-nonfunctional-requirements-design" }),
    ],
  },
  {
    n: 4,
    title: "Delivery Strategy",
    lessons: [
      L(18, "environment-and-devops-strategy", "Environment and DevOps Strategy", { contentDir: "ch04/18-environment-and-devops-strategy" }),
      L(19, "ci-cd-and-release-design", "CI/CD and Release Design", { contentDir: "ch04/19-ci-cd-and-release-design" }),
      L(20, "migration-strategy", "Migration Strategy", { contentDir: "ch04/20-migration-strategy" }),
      L(21, "backup-recovery-and-monitoring-strategy", "Backup, Recovery and Monitoring Strategy", { contentDir: "ch04/21-backup-recovery-and-monitoring-strategy" }),
      L(22, "governance-model", "Governance Model", { contentDir: "ch04/22-governance-model" }),
    ],
  },
  {
    n: 5,
    title: "Deliverables",
    lessons: [
      L(23, "deliverables-diagrams-and-data-model", "Deliverables: Diagrams and Data Model", { contentDir: "ch05/23-deliverables-diagrams-and-data-model" }),
      L(24, "deliverables-integration-and-security-diagrams", "Deliverables: Integration and Security Diagrams", { contentDir: "ch05/24-deliverables-integration-and-security-diagrams" }),
      L(25, "deliverables-risk-register-and-decision-records", "Deliverables: Risk Register and Decision Records", { contentDir: "ch05/25-deliverables-risk-register-and-decision-records" }),
      L(26, "deliverables-implementation-roadmap", "Deliverables: Implementation Roadmap", { contentDir: "ch05/26-deliverables-implementation-roadmap" }),
      L(27, "technical-architecture-document", "Technical Architecture Document", { contentDir: "ch05/27-technical-architecture-document" }),
      L(28, "executive-presentation", "Executive Presentation", { contentDir: "ch05/28-executive-presentation" }),
    ],
  },
  {
    n: 6,
    title: "Defense",
    lessons: [
      L(29, "preparing-for-the-architecture-review-board", "Preparing for the Architecture Review Board", { contentDir: "ch06/29-preparing-for-the-architecture-review-board" }),
      L(30, "mock-defense-data-and-security", "Mock Defense: Data and Security", { contentDir: "ch06/30-mock-defense-data-and-security" }),
      L(31, "mock-defense-integration-and-scale", "Mock Defense: Integration and Scale", { contentDir: "ch06/31-mock-defense-integration-and-scale" }),
      L(32, "final-defense-before-the-architecture-review-board", "Final Defense Before the Architecture Review Board", { contentDir: "ch06/32-final-defense-before-the-architecture-review-board" }),
      L(33, "post-defense-review-and-reflection", "Post-Defense Review and Reflection", { contentDir: "ch06/33-post-defense-review-and-reflection" }),
    ],
  },
];
