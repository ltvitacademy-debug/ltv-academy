// Advanced-tier capstone for the Analytics Engineer path. Only lessons with
// a contentDir + videoUrl are playable; everything else renders as "in
// production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/analytics-engineer-capstone-advanced/
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

export const ANALYTICS_ENGINEER_CAPSTONE_ADVANCED_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Scoping the Production Analytics Platform",
    lessons: [
      L(1, "the-business-ask", "The Business Ask: A Governed Platform, Not Ad Hoc SQL", { contentDir: "ch01/01-the-business-ask", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/the-business-ask.mp4", durationLabel: "1 min 24 s" }),
      L(2, "planning-the-architecture", "Planning the Architecture", { contentDir: "ch01/02-planning-the-architecture", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/planning-the-architecture.mp4", durationLabel: "1 min 23 s" }),
    ],
  },
  {
    n: 2,
    title: "Snowflake Foundations",
    lessons: [
      L(3, "setting-up-warehouses-and-roles", "Setting Up Warehouses and Roles", { contentDir: "ch02/03-setting-up-warehouses-and-roles", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/setting-up-warehouses-and-roles.mp4", durationLabel: "1 min 17 s" }),
      L(4, "loading-the-raw-data", "Loading the Raw Data", { contentDir: "ch02/04-loading-the-raw-data", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/loading-the-raw-data.mp4", durationLabel: "1 min 13 s" }),
      L(5, "structuring-dev-and-prod-schemas", "Structuring Dev and Prod Schemas", { contentDir: "ch02/05-structuring-dev-and-prod-schemas", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/structuring-dev-and-prod-schemas.mp4", durationLabel: "1 min 20 s" }),
      L(6, "connecting-dbt-for-a-team", "Connecting dbt to Snowflake for a Team", { contentDir: "ch02/06-connecting-dbt-for-a-team", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/connecting-dbt-for-a-team.mp4", durationLabel: "1 min 21 s" }),
    ],
  },
  {
    n: 3,
    title: "Building the dbt Model Layer",
    lessons: [
      L(7, "planning-the-staging-layer", "Planning the Staging Layer for Every Source", { contentDir: "ch03/07-planning-the-staging-layer", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/planning-the-staging-layer.mp4", durationLabel: "1 min 12 s" }),
      L(8, "building-the-staging-models", "Building the Staging Models", { contentDir: "ch03/08-building-the-staging-models", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/building-the-staging-models.mp4", durationLabel: "1 min 24 s" }),
      L(9, "building-the-intermediate-and-mart-models", "Building the Intermediate and Mart Models", { contentDir: "ch03/09-building-the-intermediate-and-mart-models", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/building-the-intermediate-and-mart-models.mp4", durationLabel: "1 min 15 s" }),
      L(10, "adding-a-snapshot", "Adding a Snapshot for Slowly Changing Customer Status", { contentDir: "ch03/10-adding-a-snapshot", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/adding-a-snapshot.mp4", durationLabel: "1 min 25 s" }),
      L(11, "writing-a-shared-macro-library", "Writing a Shared Macro Library", { contentDir: "ch03/11-writing-a-shared-macro-library", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/writing-a-shared-macro-library.mp4", durationLabel: "1 min 19 s" }),
      L(12, "handling-a-late-breaking-schema-change", "Handling a Late-Breaking Source Schema Change", { contentDir: "ch03/12-handling-a-late-breaking-schema-change", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/handling-a-late-breaking-schema-change.mp4", durationLabel: "1 min 20 s" }),
    ],
  },
  {
    n: 4,
    title: "Testing, Documentation & Governance",
    lessons: [
      L(13, "writing-a-custom-generic-test", "Writing a Custom Generic Test", { contentDir: "ch04/13-writing-a-custom-generic-test", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/writing-a-custom-generic-test.mp4", durationLabel: "1 min 17 s" }),
      L(14, "generating-dbt-docs-and-the-lineage-graph", "Generating dbt Docs and Reading the Lineage Graph", { contentDir: "ch04/14-generating-dbt-docs-and-the-lineage-graph", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/generating-dbt-docs-and-the-lineage-graph.mp4", durationLabel: "1 min 13 s" }),
      L(15, "enforcing-tests-as-a-governance-gate", "Enforcing Tests as a Governance Gate", { contentDir: "ch04/15-enforcing-tests-as-a-governance-gate", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/enforcing-tests-as-a-governance-gate.mp4", durationLabel: "1 min 13 s" }),
    ],
  },
  {
    n: 5,
    title: "Python Ingestion Layer",
    lessons: [
      L(16, "why-this-source-needs-python", "Why This Source Needs a Python Ingestion Script", { contentDir: "ch05/16-why-this-source-needs-python", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/why-this-source-needs-python.mp4", durationLabel: "1 min 17 s" }),
      L(17, "writing-the-ingestion-script", "Writing the Script", { contentDir: "ch05/17-writing-the-ingestion-script", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/writing-the-ingestion-script.mp4", durationLabel: "1 min 13 s" }),
      L(18, "logging-and-scheduling-the-ingestion", "Logging and Scheduling the Ingestion", { contentDir: "ch05/18-logging-and-scheduling-the-ingestion", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/logging-and-scheduling-the-ingestion.mp4", durationLabel: "1 min 7 s" }),
    ],
  },
  {
    n: 6,
    title: "CI/CD for the dbt Project",
    lessons: [
      L(19, "why-ci-matters-for-a-shared-project", "Why CI Matters for a Shared dbt Project", { contentDir: "ch06/19-why-ci-matters-for-a-shared-project", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/why-ci-matters-for-a-shared-project.mp4", durationLabel: "1 min 15 s" }),
      L(20, "building-the-github-actions-workflow", "Building the GitHub Actions Workflow", { contentDir: "ch06/20-building-the-github-actions-workflow", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/building-the-github-actions-workflow.mp4", durationLabel: "1 min 20 s" }),
      L(21, "requiring-ci-to-pass-before-merging", "Requiring CI to Pass Before Merging", { contentDir: "ch06/21-requiring-ci-to-pass-before-merging", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/requiring-ci-to-pass-before-merging.mp4", durationLabel: "1 min 8 s" }),
    ],
  },
  {
    n: 7,
    title: "The Power BI Layer, Incident, and Wrap-Up",
    lessons: [
      L(22, "connecting-power-bi-to-the-governed-marts", "Connecting Power BI to the Governed Marts", { contentDir: "ch07/22-connecting-power-bi-to-the-governed-marts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/connecting-power-bi-to-the-governed-marts.mp4", durationLabel: "1 min 8 s" }),
      L(23, "a-production-incident", "A Production Incident: A Broken Model Reaches CI", { contentDir: "ch07/23-a-production-incident", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/a-production-incident.mp4", durationLabel: "1 min 11 s" }),
      L(24, "diagnosing-and-fixing-before-it-ships", "Diagnosing and Fixing Before It Ships", { contentDir: "ch07/24-diagnosing-and-fixing-before-it-ships", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/diagnosing-and-fixing-before-it-ships.mp4", durationLabel: "1 min 12 s" }),
      L(25, "presenting-the-platform", "Presenting the Platform", { contentDir: "ch07/25-presenting-the-platform", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/presenting-the-platform.mp4", durationLabel: "1 min 8 s" }),
      L(26, "wrap-up-and-whats-next", "Wrap-Up: What You Built, and What's Next", { contentDir: "ch07/26-wrap-up-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-advanced/wrap-up-and-whats-next.mp4", durationLabel: "1 min 15 s" }),
    ],
  },
];
