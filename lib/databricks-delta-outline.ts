// The full Azure Databricks & Delta Lake course outline. Only lessons with a
// contentDir + videoUrl are playable; everything else renders as "in production".
// Second of a 4-course Data Engineering track: Foundations -> Azure Databricks &
// Delta Lake (this course) -> Microsoft Fabric & Real-Time Analytics -> Career & Capstone.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/databricks-delta/
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

export const DATABRICKS_DELTA_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Databricks Fundamentals",
    lessons: [
      L(1, "what-is-azure-databricks", "What Is Azure Databricks?", {
        contentDir: "ch01/01-what-is-azure-databricks",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(2, "creating-a-databricks-workspace", "Creating a Databricks Workspace", {
        contentDir: "ch01/02-creating-a-databricks-workspace",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(3, "the-workspace-ui-tour", "The Workspace UI Tour", {
        contentDir: "ch01/03-the-workspace-ui-tour",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(4, "clusters-and-compute", "Clusters and Compute", {
        contentDir: "ch01/04-clusters-and-compute",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(5, "all-purpose-vs-job-clusters", "All-Purpose vs. Job Clusters", {
        contentDir: "ch01/05-all-purpose-vs-job-clusters",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(6, "notebooks-cells-and-languages", "Notebooks, Cells, and Languages", {
        contentDir: "ch01/06-notebooks-cells-and-languages",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(7, "attaching-a-notebook-to-a-cluster", "Attaching a Notebook to a Cluster", {
        contentDir: "ch01/07-attaching-a-notebook-to-a-cluster",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(8, "dbfs-databricks-file-system", "DBFS — Databricks File System", {
        contentDir: "ch01/08-dbfs-databricks-file-system",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(9, "widgets-and-parameters", "Widgets and Parameters", {
        contentDir: "ch01/09-widgets-and-parameters",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(10, "databricks-runtime-and-versions", "Databricks Runtime and Versions", {
        contentDir: "ch01/10-databricks-runtime-and-versions",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(11, "jobs-scheduling-notebook-runs", "Jobs — Scheduling Notebook Runs", {
        contentDir: "ch01/11-jobs-scheduling-notebook-runs",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(12, "databricks-cli-and-rest-api-basics", "Databricks CLI and REST API Basics", {
        contentDir: "ch01/12-databricks-cli-and-rest-api-basics",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
    ],
  },
  {
    n: 2,
    title: "Delta Lake",
    lessons: [
      L(13, "what-is-delta-lake", "What Is Delta Lake?", {
        contentDir: "ch02/13-what-is-delta-lake",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(14, "delta-tables-vs-parquet-tables", "Delta Tables vs. Parquet Tables", {
        contentDir: "ch02/14-delta-tables-vs-parquet-tables",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(15, "creating-a-delta-table", "Creating a Delta Table"),
      L(16, "reading-and-writing-delta-tables", "Reading and Writing Delta Tables"),
      L(17, "the-delta-transaction-log", "The Delta Transaction Log"),
      L(18, "acid-transactions-in-delta-lake", "ACID Transactions in Delta Lake"),
      L(19, "schema-enforcement", "Schema Enforcement"),
      L(20, "schema-evolution", "Schema Evolution"),
      L(21, "time-travel", "Time Travel — Querying Historical Versions"),
      L(22, "update-delete-and-merge", "UPDATE, DELETE, and MERGE"),
      L(23, "optimize-and-file-compaction", "OPTIMIZE and File Compaction"),
      L(24, "vacuum-cleaning-up-old-files", "VACUUM — Cleaning Up Old Files"),
    ],
  },
  {
    n: 3,
    title: "Medallion Architecture",
    lessons: [
      L(25, "what-is-medallion-architecture", "What Is Medallion Architecture?"),
      L(26, "the-bronze-layer", "The Bronze Layer — Raw Ingestion"),
      L(27, "the-silver-layer", "The Silver Layer — Cleaned and Conformed Data"),
      L(28, "the-gold-layer", "The Gold Layer — Business-Level Aggregates"),
      L(29, "designing-a-bronze-to-silver-pipeline", "Designing a Bronze-to-Silver Pipeline"),
      L(30, "designing-a-silver-to-gold-pipeline", "Designing a Silver-to-Gold Pipeline"),
      L(31, "incremental-processing-patterns", "Incremental Processing Patterns"),
      L(32, "autoloader", "Autoloader — Incremental File Ingestion"),
      L(33, "structured-streaming-basics", "Structured Streaming Basics"),
      L(34, "streaming-from-bronze-to-silver", "Streaming from Bronze to Silver"),
      L(35, "handling-late-arriving-data", "Handling Late-Arriving Data"),
      L(36, "data-quality-checks", "Data Quality Checks in the Medallion Flow"),
      L(37, "building-a-full-medallion-pipeline", "Building a Full Medallion Pipeline"),
    ],
  },
  {
    n: 4,
    title: "Unity Catalog",
    lessons: [
      L(38, "what-is-unity-catalog", "What Is Unity Catalog?"),
      L(39, "the-three-level-namespace", "The Three-Level Namespace"),
      L(40, "creating-a-catalog-and-schema", "Creating a Catalog and Schema"),
      L(41, "managed-vs-external-tables", "Managed Tables vs. External Tables"),
      L(42, "access-control-grant-and-revoke", "Access Control — GRANT and REVOKE"),
      L(43, "row-and-column-level-security", "Row-Level and Column-Level Security"),
      L(44, "data-lineage-in-unity-catalog", "Data Lineage in Unity Catalog"),
      L(45, "unity-catalog-volumes", "Unity Catalog Volumes"),
      L(46, "delta-sharing-basics", "Delta Sharing Basics"),
      L(47, "unity-catalog-best-practices", "Unity Catalog Best Practices"),
    ],
  },
  {
    n: 5,
    title: "Lakeflow",
    lessons: [
      L(48, "what-is-lakeflow", "What Is Lakeflow?"),
      L(49, "lakeflow-connect", "Lakeflow Connect — Ingestion Basics"),
      L(50, "lakeflow-declarative-pipelines", "Lakeflow Declarative Pipelines"),
      L(51, "defining-a-pipeline-with-dlt-table", "Defining a Pipeline With @dlt.table"),
      L(52, "expectations-declarative-data-quality", "Expectations — Declarative Data Quality"),
      L(53, "pipeline-modes-triggered-vs-continuous", "Pipeline Modes: Triggered vs. Continuous"),
      L(54, "lakeflow-jobs-orchestration", "Lakeflow Jobs — Orchestration"),
      L(55, "monitoring-pipeline-runs", "Monitoring Pipeline Runs"),
      L(56, "lakeflow-vs-traditional-adf-pipelines", "Lakeflow vs. Traditional ADF Pipelines"),
      L(57, "course-recap", "Course Recap — From Storage to Orchestrated Pipelines"),
    ],
  },
];
