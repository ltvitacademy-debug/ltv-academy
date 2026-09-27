// The LTV Service & Sales Platform course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ltv-service-and-sales-platform/
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

export const SFTA_LTV_SERVICE_AND_SALES_PLATFORM_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Design",
    lessons: [
      L(1, "capstone-kickoff-and-requirements", "Capstone Kickoff and Requirements"),
      L(2, "architecture-overview", "Architecture Overview"),
      L(3, "custom-data-model", "Custom Data Model"),
      L(4, "security-model", "Security Model"),
      L(5, "environment-and-version-control-setup", "Environment and Version Control Setup"),
    ],
  },
  {
    n: 2,
    title: "Build: Automation and Code",
    lessons: [
      L(6, "complex-flow", "Complex Flow"),
      L(7, "apex", "Apex"),
      L(8, "soql", "SOQL"),
      L(9, "apex-triggers-and-handlers", "Apex Triggers and Handlers"),
      L(10, "apex-tests", "Apex Tests"),
      L(11, "asynchronous-processing", "Asynchronous Processing"),
    ],
  },
  {
    n: 3,
    title: "Build: UI and Integration",
    lessons: [
      L(12, "lightning-web-components", "Lightning Web Components"),
      L(13, "lightning-web-components-data-and-events", "Lightning Web Components: Data and Events"),
      L(14, "rest-integration", "REST Integration"),
      L(15, "named-credentials-and-error-handling", "Named Credentials and Error Handling"),
    ],
  },
  {
    n: 4,
    title: "Analytics and Delivery",
    lessons: [
      L(16, "reports", "Reports"),
      L(17, "dashboards", "Dashboards"),
      L(18, "deployment", "Deployment"),
      L(19, "testing-and-code-review", "Testing and Code Review"),
      L(20, "performance-review", "Performance Review"),
      L(21, "documentation-and-presentation", "Documentation and Presentation"),
      L(22, "capstone-ii-retrospective", "Capstone II Retrospective"),
    ],
  },
  {
    n: 5,
    title: "Wrap-Up",
    lessons: [
      L(23, "demo-preparation", "Demo Preparation"),
      L(24, "presenting-the-platform", "Presenting the Platform"),
      L(25, "feedback-and-next-steps", "Feedback and Next Steps"),
    ],
  },
];
