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
    title: "Final Enterprise Architect Capstone",
    lessons: [
      L(1, "capstone-kickoff-the-ltv-global-scenario", "Capstone Kickoff: The LTV Global Scenario"),
      L(2, "requirements-constraints-and-assumptions", "Requirements, Constraints and Assumptions"),
      L(3, "salesforce-application-architecture", "Salesforce Application Architecture"),
      L(4, "data-architecture", "Data Architecture"),
      L(5, "security-and-sharing-architecture", "Security and Sharing Architecture"),
      L(6, "identity-architecture", "Identity Architecture"),
      L(7, "integration-and-api-architecture", "Integration and API Architecture"),
      L(8, "environment-and-devops-strategy", "Environment and DevOps Strategy"),
      L(9, "migration-strategy", "Migration Strategy"),
      L(10, "backup-recovery-and-monitoring-strategy", "Backup, Recovery and Monitoring Strategy"),
      L(11, "governance-model", "Governance Model"),
      L(12, "deliverables-diagrams-and-data-model", "Deliverables: Diagrams and Data Model"),
      L(13, "deliverables-risk-register-decision-records-and-roadmap", "Deliverables: Risk Register, Decision Records and Roadmap"),
      L(14, "technical-architecture-document-and-executive-presentation", "Technical Architecture Document and Executive Presentation"),
      L(15, "final-defense-before-the-architecture-review-board", "Final Defense Before the Architecture Review Board"),
    ],
  },
];
