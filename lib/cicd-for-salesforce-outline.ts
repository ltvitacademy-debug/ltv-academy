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
      L(1, "automated-testing", "Automated Testing"),
      L(2, "validation", "Validation"),
      L(3, "deployment-pipelines", "Deployment Pipelines"),
      L(4, "release-automation", "Release Automation"),
    ],
  },
  {
    n: 2,
    title: "Pipelines in Practice",
    lessons: [
      L(5, "pipeline-tooling-with-github-actions", "Pipeline Tooling with GitHub Actions"),
      L(6, "delta-deployments", "Delta Deployments"),
      L(7, "quality-gates", "Quality Gates"),
      L(8, "monitoring-pipelines", "Monitoring Pipelines"),
    ],
  },
];
