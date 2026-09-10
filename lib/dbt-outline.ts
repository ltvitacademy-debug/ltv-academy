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
      L(1, "what-is-analytics-engineering", "What Is Analytics Engineering?"),
      L(2, "dbt-fundamentals", "dbt Fundamentals: What Problem Does It Solve?"),
      L(3, "dbt-cloud-vs-dbt-core", "dbt Cloud vs. dbt Core"),
      L(4, "dbt-project-structure", "dbt Project Structure"),
      L(5, "connecting-dbt-to-snowflake", "Connecting dbt to Snowflake"),
      L(6, "your-first-dbt-run", "Your First dbt Run"),
    ],
  },
  {
    n: 2,
    title: "Sources, Models & ref()",
    lessons: [
      L(7, "defining-sources", "Defining Sources"),
      L(8, "staging-models", "Staging Models"),
      L(9, "the-ref-function", "The ref() Function"),
      L(10, "building-your-first-model", "Building Your First dbt Model"),
      L(11, "model-materializations", "Model Materializations: View, Table, Incremental & Ephemeral"),
      L(12, "organizing-models", "Organizing Models Across a Project"),
    ],
  },
  {
    n: 3,
    title: "Staging, Intermediate & Marts",
    lessons: [
      L(13, "staging-layer-patterns", "Staging Layer Patterns"),
      L(14, "intermediate-models", "Intermediate Models"),
      L(15, "marts-layer", "The Marts Layer"),
      L(16, "naming-conventions", "Naming Conventions That Scale"),
      L(17, "the-layering-philosophy", "The Layering Philosophy: Why Three Layers"),
    ],
  },
  {
    n: 4,
    title: "Testing & Documentation",
    lessons: [
      L(18, "generic-tests", "Generic Tests: not_null, unique, relationships"),
      L(19, "singular-tests", "Singular Tests"),
      L(20, "schema-yml", "schema.yml & Column-Level Documentation"),
      L(21, "generating-dbt-docs", "Generating and Reading dbt Docs"),
      L(22, "exposures", "Exposures: Connecting Models to Downstream BI"),
    ],
  },
  {
    n: 5,
    title: "Seeds, Snapshots & Incremental Models",
    lessons: [
      L(23, "seeds", "Seeds: Loading Static Reference Data"),
      L(24, "snapshots-for-scd", "Snapshots for Slowly Changing Dimensions"),
      L(25, "incremental-models-fundamentals", "Incremental Models: Fundamentals"),
      L(26, "incremental-strategies", "Incremental Strategies: merge, delete+insert, append"),
      L(27, "incremental-model-gotchas", "Incremental Model Gotchas & Full Refreshes"),
    ],
  },
  {
    n: 6,
    title: "Jinja & Macros",
    lessons: [
      L(28, "jinja-basics", "Jinja Basics Inside dbt"),
      L(29, "custom-macros", "Writing Custom Macros"),
      L(30, "dbt-packages", "dbt Packages"),
      L(31, "dbt-utils", "dbt_utils: The Macros You'll Actually Reuse"),
    ],
  },
  {
    n: 7,
    title: "dbt + Git + CI/CD",
    lessons: [
      L(32, "version-controlling-a-dbt-project", "Version-Controlling a dbt Project"),
      L(33, "dbt-in-ci", "Running dbt in Continuous Integration"),
      L(34, "dbt-cloud-jobs-and-scheduling", "dbt Cloud Jobs & Scheduling"),
      L(35, "slim-ci", "Slim CI: Only Running What Changed"),
      L(36, "deployment-environments", "Deployment Environments: Dev, Staging & Prod"),
    ],
  },
  {
    n: 8,
    title: "Semantic Layer & Advanced Patterns",
    lessons: [
      L(37, "semantic-layer-concepts", "Semantic Layer Concepts"),
      L(38, "defining-metrics", "Defining Metrics in dbt"),
      L(39, "scd-type-2-in-dbt", "SCD Type 2 in dbt"),
      L(40, "data-quality-in-dbt", "Data Quality Patterns in dbt"),
    ],
  },
  {
    n: 9,
    title: "Capstone",
    lessons: [
      L(41, "capstone-kickoff", "Capstone Kickoff: Raw Data to Reporting"),
      L(42, "capstone-staging-and-intermediate", "Capstone: Staging & Intermediate Models"),
      L(43, "capstone-marts-tests-and-docs", "Capstone: Marts, Tests & Documentation"),
      L(44, "capstone-connecting-to-power-bi", "Capstone: Connecting to Power BI"),
      L(45, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
