// The full dbt / Analytics Engineering course outline. Only lessons with a
// contentDir + videoUrl are playable; everything else renders as "in
// production". Assumes prior SQL knowledge from T-SQL Development and cloud
// warehouse basics from Snowflake — this course teaches how a modeling layer
// gets built ON TOP of a warehouse, not SQL fundamentals again.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/dbt/
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

export const DBT_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Analytics Engineering & dbt Fundamentals",
    lessons: [
      L(1, "what-is-analytics-engineering", "What Is Analytics Engineering?", { contentDir: "ch01/01-what-is-analytics-engineering" }),
      L(2, "dbt-fundamentals", "dbt Fundamentals: What Problem Does It Solve?", { contentDir: "ch01/02-dbt-fundamentals" }),
      L(3, "dbt-cloud-vs-dbt-core", "dbt Cloud vs. dbt Core", { contentDir: "ch01/03-dbt-cloud-vs-dbt-core" }),
      L(4, "dbt-project-structure", "dbt Project Structure", { contentDir: "ch01/04-dbt-project-structure" }),
      L(5, "connecting-dbt-to-snowflake", "Connecting dbt to Snowflake", { contentDir: "ch01/05-connecting-dbt-to-snowflake" }),
      L(6, "your-first-dbt-run", "Your First dbt Run", { contentDir: "ch01/06-your-first-dbt-run" }),
    ],
  },
  {
    n: 2,
    title: "Sources, Models & ref()",
    lessons: [
      L(7, "defining-sources", "Defining Sources", { contentDir: "ch02/07-defining-sources" }),
      L(8, "staging-models", "Staging Models", { contentDir: "ch02/08-staging-models" }),
      L(9, "the-ref-function", "The ref() Function", { contentDir: "ch02/09-the-ref-function" }),
      L(10, "building-your-first-model", "Building Your First dbt Model", { contentDir: "ch02/10-building-your-first-model" }),
      L(11, "model-materializations", "Model Materializations: View, Table, Incremental & Ephemeral", { contentDir: "ch02/11-model-materializations" }),
      L(12, "organizing-models", "Organizing Models Across a Project", { contentDir: "ch02/12-organizing-models" }),
    ],
  },
  {
    n: 3,
    title: "Staging, Intermediate & Marts",
    lessons: [
      L(13, "staging-layer-patterns", "Staging Layer Patterns", { contentDir: "ch03/13-staging-layer-patterns" }),
      L(14, "intermediate-models", "Intermediate Models", { contentDir: "ch03/14-intermediate-models" }),
      L(15, "marts-layer", "The Marts Layer", { contentDir: "ch03/15-marts-layer" }),
      L(16, "naming-conventions", "Naming Conventions That Scale", { contentDir: "ch03/16-naming-conventions" }),
      L(17, "the-layering-philosophy", "The Layering Philosophy: Why Three Layers", { contentDir: "ch03/17-the-layering-philosophy" }),
    ],
  },
  {
    n: 4,
    title: "Testing & Documentation",
    lessons: [
      L(18, "generic-tests", "Generic Tests: not_null, unique, relationships", { contentDir: "ch04/18-generic-tests" }),
      L(19, "singular-tests", "Singular Tests", { contentDir: "ch04/19-singular-tests" }),
      L(20, "schema-yml", "schema.yml & Column-Level Documentation", { contentDir: "ch04/20-schema-yml" }),
      L(21, "generating-dbt-docs", "Generating and Reading dbt Docs", { contentDir: "ch04/21-generating-dbt-docs" }),
      L(22, "exposures", "Exposures: Connecting Models to Downstream BI", { contentDir: "ch04/22-exposures" }),
    ],
  },
  {
    n: 5,
    title: "Seeds, Snapshots & Incremental Models",
    lessons: [
      L(23, "seeds", "Seeds: Loading Static Reference Data", { contentDir: "ch05/23-seeds" }),
      L(24, "snapshots-for-scd", "Snapshots for Slowly Changing Dimensions", { contentDir: "ch05/24-snapshots-for-scd" }),
      L(25, "incremental-models-fundamentals", "Incremental Models: Fundamentals", { contentDir: "ch05/25-incremental-models-fundamentals" }),
      L(26, "incremental-strategies", "Incremental Strategies: merge, delete+insert, append", { contentDir: "ch05/26-incremental-strategies" }),
      L(27, "incremental-model-gotchas", "Incremental Model Gotchas & Full Refreshes", { contentDir: "ch05/27-incremental-model-gotchas" }),
    ],
  },
  {
    n: 6,
    title: "Jinja & Macros",
    lessons: [
      L(28, "jinja-basics", "Jinja Basics Inside dbt", { contentDir: "ch06/28-jinja-basics" }),
      L(29, "custom-macros", "Writing Custom Macros", { contentDir: "ch06/29-custom-macros" }),
      L(30, "dbt-packages", "dbt Packages", { contentDir: "ch06/30-dbt-packages" }),
      L(31, "dbt-utils", "dbt_utils: The Macros You'll Actually Reuse", { contentDir: "ch06/31-dbt-utils" }),
    ],
  },
  {
    n: 7,
    title: "dbt + Git + CI/CD",
    lessons: [
      L(32, "version-controlling-a-dbt-project", "Version-Controlling a dbt Project", { contentDir: "ch07/32-version-controlling-a-dbt-project" }),
      L(33, "dbt-in-ci", "Running dbt in Continuous Integration", { contentDir: "ch07/33-dbt-in-ci" }),
      L(34, "dbt-cloud-jobs-and-scheduling", "dbt Cloud Jobs & Scheduling", { contentDir: "ch07/34-dbt-cloud-jobs-and-scheduling" }),
      L(35, "slim-ci", "Slim CI: Only Running What Changed", { contentDir: "ch07/35-slim-ci" }),
      L(36, "deployment-environments", "Deployment Environments: Dev, Staging & Prod", { contentDir: "ch07/36-deployment-environments" }),
    ],
  },
  {
    n: 8,
    title: "Semantic Layer & Advanced Patterns",
    lessons: [
      L(37, "semantic-layer-concepts", "Semantic Layer Concepts", { contentDir: "ch08/37-semantic-layer-concepts" }),
      L(38, "defining-metrics", "Defining Metrics in dbt", { contentDir: "ch08/38-defining-metrics" }),
      L(39, "scd-type-2-in-dbt", "SCD Type 2 in dbt", { contentDir: "ch08/39-scd-type-2-in-dbt" }),
      L(40, "data-quality-in-dbt", "Data Quality Patterns in dbt", { contentDir: "ch08/40-data-quality-in-dbt" }),
    ],
  },
  {
    n: 9,
    title: "Capstone",
    lessons: [
      L(41, "capstone-kickoff", "Capstone Kickoff: Raw Data to Reporting", { contentDir: "ch09/41-capstone-kickoff" }),
      L(42, "capstone-staging-and-intermediate", "Capstone: Staging & Intermediate Models", { contentDir: "ch09/42-capstone-staging-and-intermediate" }),
      L(43, "capstone-marts-tests-and-docs", "Capstone: Marts, Tests & Documentation", { contentDir: "ch09/43-capstone-marts-tests-and-docs" }),
      L(44, "capstone-connecting-to-power-bi", "Capstone: Connecting to Power BI", { contentDir: "ch09/44-capstone-connecting-to-power-bi" }),
      L(45, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch09/45-capstone-wrap-up" }),
    ],
  },
];
