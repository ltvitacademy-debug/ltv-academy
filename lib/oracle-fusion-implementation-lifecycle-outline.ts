// The Oracle Fusion Implementation Lifecycle course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 07. How real Oracle Fusion Financials implementations run from requirements to production support.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/oracle-fusion-implementation-lifecycle/
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

export const ORACLE_FUSION_IMPLEMENTATION_LIFECYCLE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Implementation Methodology",
    lessons: [
      L(1, "the-oracle-fusion-implementation-lifecycle", "The Oracle Fusion Implementation Lifecycle", { contentDir: "ch01/01-the-oracle-fusion-implementation-lifecycle" }),
      L(2, "roles-on-an-implementation-team", "Roles on an Implementation Team", { contentDir: "ch01/02-roles-on-an-implementation-team" }),
      L(3, "project-planning-and-phases", "Project Planning and Phases", { contentDir: "ch01/03-project-planning-and-phases" }),
      L(4, "requirements-gathering", "Requirements Gathering", { contentDir: "ch01/04-requirements-gathering" }),
      L(5, "stakeholder-interviews-and-workshops", "Stakeholder Interviews and Workshops", { contentDir: "ch01/05-stakeholder-interviews-and-workshops" }),
    ],
  },
  {
    n: 2,
    title: "Analysis and Design",
    lessons: [
      L(6, "fit-gap-analysis", "Fit-Gap Analysis", { contentDir: "ch02/06-fit-gap-analysis" }),
      L(7, "documenting-gaps-and-solutions", "Documenting Gaps and Solutions", { contentDir: "ch02/07-documenting-gaps-and-solutions" }),
      L(8, "configuration-workbooks", "Configuration Workbooks", { contentDir: "ch02/08-configuration-workbooks" }),
      L(9, "enterprise-structure-design-decisions", "Enterprise Structure Design Decisions", { contentDir: "ch02/09-enterprise-structure-design-decisions" }),
      L(10, "business-process-design-and-solution-design-documents", "Business Process Design and Solution Design Documents", { contentDir: "ch02/10-business-process-design-and-solution-design-documents" }),
    ],
  },
  {
    n: 3,
    title: "Configuration and Migration",
    lessons: [
      L(11, "setup-and-maintenance-and-implementation-projects", "Setup and Maintenance and Implementation Projects", { contentDir: "ch03/11-setup-and-maintenance-and-implementation-projects" }),
      L(12, "configuration-packages-and-moving-setup", "Configuration Packages and Moving Setup", { contentDir: "ch03/12-configuration-packages-and-moving-setup" }),
      L(13, "dev-test-and-prod-environments", "DEV, TEST and PROD Environments", { contentDir: "ch03/13-dev-test-and-prod-environments" }),
      L(14, "data-migration-strategy", "Data Migration Strategy", { contentDir: "ch03/14-data-migration-strategy" }),
      L(15, "data-migration-cleansing-and-validation", "Data Migration Cleansing and Validation", { contentDir: "ch03/15-data-migration-cleansing-and-validation" }),
    ],
  },
  {
    n: 4,
    title: "Testing",
    lessons: [
      L(16, "test-planning-and-test-scripts", "Test Planning and Test Scripts", { contentDir: "ch04/16-test-planning-and-test-scripts" }),
      L(17, "system-integration-testing", "System Integration Testing", { contentDir: "ch04/17-system-integration-testing" }),
      L(18, "user-acceptance-testing", "User Acceptance Testing", { contentDir: "ch04/18-user-acceptance-testing" }),
      L(19, "defect-management-and-issue-logs", "Defect Management and Issue Logs", { contentDir: "ch04/19-defect-management-and-issue-logs" }),
      L(20, "regression-testing-for-quarterly-updates", "Regression Testing for Quarterly Updates", { contentDir: "ch04/20-regression-testing-for-quarterly-updates" }),
    ],
  },
  {
    n: 5,
    title: "Go-Live and Support",
    lessons: [
      L(21, "cutover-planning", "Cutover Planning", { contentDir: "ch05/21-cutover-planning" }),
      L(22, "deployment-and-go-live", "Deployment and Go-Live", { contentDir: "ch05/22-deployment-and-go-live" }),
      L(23, "hypercare", "Hypercare", { contentDir: "ch05/23-hypercare" }),
      L(24, "production-support-and-service-requests", "Production Support and Service Requests", { contentDir: "ch05/24-production-support-and-service-requests" }),
      L(25, "training-documentation-and-knowledge-transfer", "Training, Documentation and Knowledge Transfer", { contentDir: "ch05/25-training-documentation-and-knowledge-transfer" }),
    ],
  },
];
