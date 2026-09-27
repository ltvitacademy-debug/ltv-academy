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
      L(1, "capstone-kickoff-the-ltv-global-scenario", "Capstone Kickoff: The LTV Global Scenario"),
      L(2, "requirements-constraints-and-assumptions", "Requirements, Constraints and Assumptions"),
      L(3, "stakeholders-and-business-drivers", "Stakeholders and Business Drivers"),
      L(4, "current-state-landscape-analysis", "Current-State Landscape Analysis"),
      L(5, "target-state-vision", "Target-State Vision"),
      L(6, "risk-identification", "Risk Identification"),
    ],
  },
  {
    n: 2,
    title: "Core Architecture",
    lessons: [
      L(7, "salesforce-application-architecture", "Salesforce Application Architecture"),
      L(8, "data-architecture", "Data Architecture"),
      L(9, "data-model-design", "Data Model Design"),
      L(10, "large-data-volume-strategy", "Large Data Volume Strategy"),
      L(11, "security-and-sharing-architecture", "Security and Sharing Architecture"),
      L(12, "identity-architecture", "Identity Architecture"),
    ],
  },
  {
    n: 3,
    title: "Integration and Platform Architecture",
    lessons: [
      L(13, "integration-and-api-architecture", "Integration and API Architecture"),
      L(14, "erp-and-financial-system-integration", "ERP and Financial System Integration"),
      L(15, "data-warehouse-and-external-api-integration", "Data Warehouse and External API Integration"),
      L(16, "customer-portal-architecture", "Customer Portal Architecture"),
      L(17, "nonfunctional-requirements-design", "Nonfunctional Requirements Design"),
    ],
  },
  {
    n: 4,
    title: "Delivery Strategy",
    lessons: [
      L(18, "environment-and-devops-strategy", "Environment and DevOps Strategy"),
      L(19, "ci-cd-and-release-design", "CI/CD and Release Design"),
      L(20, "migration-strategy", "Migration Strategy"),
      L(21, "backup-recovery-and-monitoring-strategy", "Backup, Recovery and Monitoring Strategy"),
      L(22, "governance-model", "Governance Model"),
    ],
  },
  {
    n: 5,
    title: "Deliverables",
    lessons: [
      L(23, "deliverables-diagrams-and-data-model", "Deliverables: Diagrams and Data Model"),
      L(24, "deliverables-integration-and-security-diagrams", "Deliverables: Integration and Security Diagrams"),
      L(25, "deliverables-risk-register-and-decision-records", "Deliverables: Risk Register and Decision Records"),
      L(26, "deliverables-implementation-roadmap", "Deliverables: Implementation Roadmap"),
      L(27, "technical-architecture-document", "Technical Architecture Document"),
      L(28, "executive-presentation", "Executive Presentation"),
    ],
  },
  {
    n: 6,
    title: "Defense",
    lessons: [
      L(29, "preparing-for-the-architecture-review-board", "Preparing for the Architecture Review Board"),
      L(30, "mock-defense-data-and-security", "Mock Defense: Data and Security"),
      L(31, "mock-defense-integration-and-scale", "Mock Defense: Integration and Scale"),
      L(32, "final-defense-before-the-architecture-review-board", "Final Defense Before the Architecture Review Board"),
      L(33, "post-defense-review-and-reflection", "Post-Defense Review and Reflection"),
    ],
  },
];
