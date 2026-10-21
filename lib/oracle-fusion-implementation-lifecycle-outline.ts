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
      L(1, "the-oracle-fusion-implementation-lifecycle", "The Oracle Fusion Implementation Lifecycle", { contentDir: "ch01/01-the-oracle-fusion-implementation-lifecycle", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792612385/ltv-oracle-fusion-implementation-lifecycle/the-oracle-fusion-implementation-lifecycle.mp4", durationLabel: "1 min 45 s" }),
      L(2, "roles-on-an-implementation-team", "Roles on an Implementation Team", { contentDir: "ch01/02-roles-on-an-implementation-team", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792612950/ltv-oracle-fusion-implementation-lifecycle/roles-on-an-implementation-team.mp4", durationLabel: "1 min 44 s" }),
      L(3, "project-planning-and-phases", "Project Planning and Phases", { contentDir: "ch01/03-project-planning-and-phases", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792613472/ltv-oracle-fusion-implementation-lifecycle/project-planning-and-phases.mp4", durationLabel: "1 min 53 s" }),
      L(4, "requirements-gathering", "Requirements Gathering", { contentDir: "ch01/04-requirements-gathering", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792613936/ltv-oracle-fusion-implementation-lifecycle/requirements-gathering.mp4", durationLabel: "1 min 45 s" }),
      L(5, "stakeholder-interviews-and-workshops", "Stakeholder Interviews and Workshops", { contentDir: "ch01/05-stakeholder-interviews-and-workshops", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614270/ltv-oracle-fusion-implementation-lifecycle/stakeholder-interviews-and-workshops.mp4", durationLabel: "1 min 52 s" }),
    ],
  },
  {
    n: 2,
    title: "Analysis and Design",
    lessons: [
      L(6, "fit-gap-analysis", "Fit-Gap Analysis", { contentDir: "ch02/06-fit-gap-analysis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614638/ltv-oracle-fusion-implementation-lifecycle/fit-gap-analysis.mp4", durationLabel: "1 min 48 s" }),
      L(7, "documenting-gaps-and-solutions", "Documenting Gaps and Solutions", { contentDir: "ch02/07-documenting-gaps-and-solutions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614979/ltv-oracle-fusion-implementation-lifecycle/documenting-gaps-and-solutions.mp4", durationLabel: "1 min 49 s" }),
      L(8, "configuration-workbooks", "Configuration Workbooks", { contentDir: "ch02/08-configuration-workbooks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615253/ltv-oracle-fusion-implementation-lifecycle/configuration-workbooks.mp4", durationLabel: "1 min 41 s" }),
      L(9, "enterprise-structure-design-decisions", "Enterprise Structure Design Decisions", { contentDir: "ch02/09-enterprise-structure-design-decisions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615489/ltv-oracle-fusion-implementation-lifecycle/enterprise-structure-design-decisions.mp4", durationLabel: "1 min 44 s" }),
      L(10, "business-process-design-and-solution-design-documents", "Business Process Design and Solution Design Documents", { contentDir: "ch02/10-business-process-design-and-solution-design-documents", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615779/ltv-oracle-fusion-implementation-lifecycle/business-process-design-and-solution-design-documents.mp4", durationLabel: "1 min 49 s" }),
    ],
  },
  {
    n: 3,
    title: "Configuration and Migration",
    lessons: [
      L(11, "setup-and-maintenance-and-implementation-projects", "Setup and Maintenance and Implementation Projects", { contentDir: "ch03/11-setup-and-maintenance-and-implementation-projects", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615980/ltv-oracle-fusion-implementation-lifecycle/setup-and-maintenance-and-implementation-projects.mp4", durationLabel: "1 min 43 s" }),
      L(12, "configuration-packages-and-moving-setup", "Configuration Packages and Moving Setup", { contentDir: "ch03/12-configuration-packages-and-moving-setup", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616173/ltv-oracle-fusion-implementation-lifecycle/configuration-packages-and-moving-setup.mp4", durationLabel: "1 min 50 s" }),
      L(13, "dev-test-and-prod-environments", "DEV, TEST and PROD Environments", { contentDir: "ch03/13-dev-test-and-prod-environments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616316/ltv-oracle-fusion-implementation-lifecycle/dev-test-and-prod-environments.mp4", durationLabel: "1 min 40 s" }),
      L(14, "data-migration-strategy", "Data Migration Strategy", { contentDir: "ch03/14-data-migration-strategy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616469/ltv-oracle-fusion-implementation-lifecycle/data-migration-strategy.mp4", durationLabel: "1 min 55 s" }),
      L(15, "data-migration-cleansing-and-validation", "Data Migration Cleansing and Validation", { contentDir: "ch03/15-data-migration-cleansing-and-validation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616617/ltv-oracle-fusion-implementation-lifecycle/data-migration-cleansing-and-validation.mp4", durationLabel: "1 min 42 s" }),
    ],
  },
  {
    n: 4,
    title: "Testing",
    lessons: [
      L(16, "test-planning-and-test-scripts", "Test Planning and Test Scripts", { contentDir: "ch04/16-test-planning-and-test-scripts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616762/ltv-oracle-fusion-implementation-lifecycle/test-planning-and-test-scripts.mp4", durationLabel: "1 min 48 s" }),
      L(17, "system-integration-testing", "System Integration Testing", { contentDir: "ch04/17-system-integration-testing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616897/ltv-oracle-fusion-implementation-lifecycle/system-integration-testing.mp4", durationLabel: "1 min 42 s" }),
      L(18, "user-acceptance-testing", "User Acceptance Testing", { contentDir: "ch04/18-user-acceptance-testing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617041/ltv-oracle-fusion-implementation-lifecycle/user-acceptance-testing.mp4", durationLabel: "1 min 51 s" }),
      L(19, "defect-management-and-issue-logs", "Defect Management and Issue Logs", { contentDir: "ch04/19-defect-management-and-issue-logs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617153/ltv-oracle-fusion-implementation-lifecycle/defect-management-and-issue-logs.mp4", durationLabel: "1 min 41 s" }),
      L(20, "regression-testing-for-quarterly-updates", "Regression Testing for Quarterly Updates", { contentDir: "ch04/20-regression-testing-for-quarterly-updates", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617280/ltv-oracle-fusion-implementation-lifecycle/regression-testing-for-quarterly-updates.mp4", durationLabel: "1 min 55 s" }),
    ],
  },
  {
    n: 5,
    title: "Go-Live and Support",
    lessons: [
      L(21, "cutover-planning", "Cutover Planning", { contentDir: "ch05/21-cutover-planning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617383/ltv-oracle-fusion-implementation-lifecycle/cutover-planning.mp4", durationLabel: "1 min 40 s" }),
      L(22, "deployment-and-go-live", "Deployment and Go-Live", { contentDir: "ch05/22-deployment-and-go-live", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617499/ltv-oracle-fusion-implementation-lifecycle/deployment-and-go-live.mp4", durationLabel: "1 min 47 s" }),
      L(23, "hypercare", "Hypercare", { contentDir: "ch05/23-hypercare", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617612/ltv-oracle-fusion-implementation-lifecycle/hypercare.mp4", durationLabel: "1 min 50 s" }),
      L(24, "production-support-and-service-requests", "Production Support and Service Requests", { contentDir: "ch05/24-production-support-and-service-requests", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617717/ltv-oracle-fusion-implementation-lifecycle/production-support-and-service-requests.mp4", durationLabel: "1 min 49 s" }),
      L(25, "training-documentation-and-knowledge-transfer", "Training, Documentation and Knowledge Transfer", { contentDir: "ch05/25-training-documentation-and-knowledge-transfer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617836/ltv-oracle-fusion-implementation-lifecycle/training-documentation-and-knowledge-transfer.mp4", durationLabel: "1 min 59 s" }),
    ],
  },
];
