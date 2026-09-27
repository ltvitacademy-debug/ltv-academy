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
      L(1, "the-oracle-fusion-implementation-lifecycle", "The Oracle Fusion Implementation Lifecycle"),
      L(2, "roles-on-an-implementation-team", "Roles on an Implementation Team"),
      L(3, "project-planning-and-phases", "Project Planning and Phases"),
      L(4, "requirements-gathering", "Requirements Gathering"),
      L(5, "stakeholder-interviews-and-workshops", "Stakeholder Interviews and Workshops"),
    ],
  },
  {
    n: 2,
    title: "Analysis and Design",
    lessons: [
      L(6, "fit-gap-analysis", "Fit-Gap Analysis"),
      L(7, "documenting-gaps-and-solutions", "Documenting Gaps and Solutions"),
      L(8, "configuration-workbooks", "Configuration Workbooks"),
      L(9, "enterprise-structure-design-decisions", "Enterprise Structure Design Decisions"),
      L(10, "business-process-design-and-solution-design-documents", "Business Process Design and Solution Design Documents"),
    ],
  },
  {
    n: 3,
    title: "Configuration and Migration",
    lessons: [
      L(11, "setup-and-maintenance-and-implementation-projects", "Setup and Maintenance and Implementation Projects"),
      L(12, "configuration-packages-and-moving-setup", "Configuration Packages and Moving Setup"),
      L(13, "dev-test-and-prod-environments", "DEV, TEST and PROD Environments"),
      L(14, "data-migration-strategy", "Data Migration Strategy"),
      L(15, "data-migration-cleansing-and-validation", "Data Migration Cleansing and Validation"),
    ],
  },
  {
    n: 4,
    title: "Testing",
    lessons: [
      L(16, "test-planning-and-test-scripts", "Test Planning and Test Scripts"),
      L(17, "system-integration-testing", "System Integration Testing"),
      L(18, "user-acceptance-testing", "User Acceptance Testing"),
      L(19, "defect-management-and-issue-logs", "Defect Management and Issue Logs"),
      L(20, "regression-testing-for-quarterly-updates", "Regression Testing for Quarterly Updates"),
    ],
  },
  {
    n: 5,
    title: "Go-Live and Support",
    lessons: [
      L(21, "cutover-planning", "Cutover Planning"),
      L(22, "deployment-and-go-live", "Deployment and Go-Live"),
      L(23, "hypercare", "Hypercare"),
      L(24, "production-support-and-service-requests", "Production Support and Service Requests"),
      L(25, "training-documentation-and-knowledge-transfer", "Training, Documentation and Knowledge Transfer"),
    ],
  },
];
