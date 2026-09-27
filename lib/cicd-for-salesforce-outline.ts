// The CI/CD for Salesforce course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/cicd-for-salesforce/
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

export const SFTA_CICD_FOR_SALESFORCE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Automating Delivery",
    lessons: [
      L(1, "what-ci-cd-means-for-salesforce", "What CI/CD Means for Salesforce"),
      L(2, "automated-testing", "Automated Testing"),
      L(3, "validation", "Validation"),
      L(4, "deployment-pipelines", "Deployment Pipelines"),
      L(5, "release-automation", "Release Automation"),
      L(6, "pipeline-design-principles", "Pipeline Design Principles"),
    ],
  },
  {
    n: 2,
    title: "Pipelines in Practice",
    lessons: [
      L(7, "pipeline-tooling-with-github-actions", "Pipeline Tooling with GitHub Actions"),
      L(8, "salesforce-cli-in-pipelines", "Salesforce CLI in Pipelines"),
      L(9, "authenticating-pipelines-to-orgs", "Authenticating Pipelines to Orgs"),
      L(10, "delta-deployments", "Delta Deployments"),
      L(11, "quality-gates", "Quality Gates"),
      L(12, "static-code-analysis-for-salesforce", "Static Code Analysis for Salesforce"),
      L(13, "monitoring-pipelines", "Monitoring Pipelines"),
    ],
  },
  {
    n: 3,
    title: "Operating Pipelines",
    lessons: [
      L(14, "secrets-in-pipelines", "Secrets in Pipelines"),
      L(15, "handling-failed-deployments", "Handling Failed Deployments"),
      L(16, "data-and-configuration-deployment", "Data and Configuration Deployment"),
      L(17, "pipelines-for-packages", "Pipelines for Packages"),
      L(18, "ci-cd-case-study", "CI/CD Case Study"),
      L(19, "ci-cd-practice-lab", "CI/CD Practice Lab"),
    ],
  },
];
