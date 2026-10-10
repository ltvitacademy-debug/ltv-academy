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
      L(1, "what-ci-cd-means-for-salesforce", "What CI/CD Means for Salesforce", { contentDir: "ch01/01-what-ci-cd-means-for-salesforce" }),
      L(2, "automated-testing", "Automated Testing", { contentDir: "ch01/02-automated-testing" }),
      L(3, "validation", "Validation", { contentDir: "ch01/03-validation" }),
      L(4, "deployment-pipelines", "Deployment Pipelines", { contentDir: "ch01/04-deployment-pipelines" }),
      L(5, "release-automation", "Release Automation", { contentDir: "ch01/05-release-automation" }),
      L(6, "pipeline-design-principles", "Pipeline Design Principles", { contentDir: "ch01/06-pipeline-design-principles" }),
    ],
  },
  {
    n: 2,
    title: "Pipelines in Practice",
    lessons: [
      L(7, "pipeline-tooling-with-github-actions", "Pipeline Tooling with GitHub Actions", { contentDir: "ch02/07-pipeline-tooling-with-github-actions" }),
      L(8, "salesforce-cli-in-pipelines", "Salesforce CLI in Pipelines", { contentDir: "ch02/08-salesforce-cli-in-pipelines" }),
      L(9, "authenticating-pipelines-to-orgs", "Authenticating Pipelines to Orgs", { contentDir: "ch02/09-authenticating-pipelines-to-orgs" }),
      L(10, "delta-deployments", "Delta Deployments", { contentDir: "ch02/10-delta-deployments" }),
      L(11, "quality-gates", "Quality Gates", { contentDir: "ch02/11-quality-gates" }),
      L(12, "static-code-analysis-for-salesforce", "Static Code Analysis for Salesforce", { contentDir: "ch02/12-static-code-analysis-for-salesforce" }),
      L(13, "monitoring-pipelines", "Monitoring Pipelines", { contentDir: "ch02/13-monitoring-pipelines" }),
    ],
  },
  {
    n: 3,
    title: "Operating Pipelines",
    lessons: [
      L(14, "secrets-in-pipelines", "Secrets in Pipelines", { contentDir: "ch03/14-secrets-in-pipelines" }),
      L(15, "handling-failed-deployments", "Handling Failed Deployments", { contentDir: "ch03/15-handling-failed-deployments" }),
      L(16, "data-and-configuration-deployment", "Data and Configuration Deployment", { contentDir: "ch03/16-data-and-configuration-deployment" }),
      L(17, "pipelines-for-packages", "Pipelines for Packages", { contentDir: "ch03/17-pipelines-for-packages" }),
      L(18, "ci-cd-case-study", "CI/CD Case Study", { contentDir: "ch03/18-ci-cd-case-study" }),
      L(19, "ci-cd-practice-lab", "CI/CD Practice Lab", { contentDir: "ch03/19-ci-cd-practice-lab" }),
    ],
  },
];
