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
      L(1, "capstone-kickoff-and-requirements", "Capstone Kickoff and Requirements", { contentDir: "ch01/01-capstone-kickoff-and-requirements" }),
      L(2, "architecture-overview", "Architecture Overview", { contentDir: "ch01/02-architecture-overview" }),
      L(3, "custom-data-model", "Custom Data Model", { contentDir: "ch01/03-custom-data-model" }),
      L(4, "security-model", "Security Model", { contentDir: "ch01/04-security-model" }),
      L(5, "environment-and-version-control-setup", "Environment and Version Control Setup", { contentDir: "ch01/05-environment-and-version-control-setup" }),
    ],
  },
  {
    n: 2,
    title: "Build: Automation and Code",
    lessons: [
      L(6, "complex-flow", "Complex Flow", { contentDir: "ch02/06-complex-flow" }),
      L(7, "apex", "Apex", { contentDir: "ch02/07-apex" }),
      L(8, "soql", "SOQL", { contentDir: "ch02/08-soql" }),
      L(9, "apex-triggers-and-handlers", "Apex Triggers and Handlers", { contentDir: "ch02/09-apex-triggers-and-handlers" }),
      L(10, "apex-tests", "Apex Tests", { contentDir: "ch02/10-apex-tests" }),
      L(11, "asynchronous-processing", "Asynchronous Processing", { contentDir: "ch02/11-asynchronous-processing" }),
    ],
  },
  {
    n: 3,
    title: "Build: UI and Integration",
    lessons: [
      L(12, "lightning-web-components", "Lightning Web Components", { contentDir: "ch03/12-lightning-web-components" }),
      L(13, "lightning-web-components-data-and-events", "Lightning Web Components: Data and Events", { contentDir: "ch03/13-lightning-web-components-data-and-events" }),
      L(14, "rest-integration", "REST Integration", { contentDir: "ch03/14-rest-integration" }),
      L(15, "named-credentials-and-error-handling", "Named Credentials and Error Handling", { contentDir: "ch03/15-named-credentials-and-error-handling" }),
    ],
  },
  {
    n: 4,
    title: "Analytics and Delivery",
    lessons: [
      L(16, "reports", "Reports", { contentDir: "ch04/16-reports" }),
      L(17, "dashboards", "Dashboards", { contentDir: "ch04/17-dashboards" }),
      L(18, "deployment", "Deployment", { contentDir: "ch04/18-deployment" }),
      L(19, "testing-and-code-review", "Testing and Code Review", { contentDir: "ch04/19-testing-and-code-review" }),
      L(20, "performance-review", "Performance Review", { contentDir: "ch04/20-performance-review" }),
      L(21, "documentation-and-presentation", "Documentation and Presentation", { contentDir: "ch04/21-documentation-and-presentation" }),
      L(22, "capstone-ii-retrospective", "Capstone II Retrospective", { contentDir: "ch04/22-capstone-ii-retrospective" }),
    ],
  },
  {
    n: 5,
    title: "Wrap-Up",
    lessons: [
      L(23, "demo-preparation", "Demo Preparation", { contentDir: "ch05/23-demo-preparation" }),
      L(24, "presenting-the-platform", "Presenting the Platform", { contentDir: "ch05/24-presenting-the-platform" }),
      L(25, "feedback-and-next-steps", "Feedback and Next Steps", { contentDir: "ch05/25-feedback-and-next-steps" }),
    ],
  },
];
