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
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142216/ltv-databricks-delta/what-is-azure-databricks.mp4",
        durationLabel: "1 min 37 s",
      }),
      L(2, "creating-a-databricks-workspace", "Creating a Databricks Workspace", {
        contentDir: "ch01/02-creating-a-databricks-workspace",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142287/ltv-databricks-delta/creating-a-databricks-workspace.mp4",
        durationLabel: "1 min 36 s",
      }),
      L(3, "the-workspace-ui-tour", "The Workspace UI Tour", {
        contentDir: "ch01/03-the-workspace-ui-tour",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142347/ltv-databricks-delta/the-workspace-ui-tour.mp4",
        durationLabel: "1 min 33 s",
      }),
      L(4, "clusters-and-compute", "Clusters and Compute", {
        contentDir: "ch01/04-clusters-and-compute",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142407/ltv-databricks-delta/clusters-and-compute.mp4",
        durationLabel: "1 min 30 s",
      }),
      L(5, "all-purpose-vs-job-clusters", "All-Purpose vs. Job Clusters", {
        contentDir: "ch01/05-all-purpose-vs-job-clusters",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142462/ltv-databricks-delta/all-purpose-vs-job-clusters.mp4",
        durationLabel: "1 min 26 s",
      }),
      L(6, "notebooks-cells-and-languages", "Notebooks, Cells, and Languages", {
        contentDir: "ch01/06-notebooks-cells-and-languages",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142524/ltv-databricks-delta/notebooks-cells-and-languages.mp4",
        durationLabel: "1 min 31 s",
      }),
      L(7, "attaching-a-notebook-to-a-cluster", "Attaching a Notebook to a Cluster", {
        contentDir: "ch01/07-attaching-a-notebook-to-a-cluster",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142575/ltv-databricks-delta/attaching-a-notebook-to-a-cluster.mp4",
        durationLabel: "1 min 11 s",
      }),
      L(8, "dbfs-databricks-file-system", "DBFS — Databricks File System", {
        contentDir: "ch01/08-dbfs-databricks-file-system",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142646/ltv-databricks-delta/dbfs-databricks-file-system.mp4",
        durationLabel: "1 min 32 s",
      }),
      L(9, "widgets-and-parameters", "Widgets and Parameters", {
        contentDir: "ch01/09-widgets-and-parameters",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142718/ltv-databricks-delta/widgets-and-parameters.mp4",
        durationLabel: "1 min 31 s",
      }),
      L(10, "databricks-runtime-and-versions", "Databricks Runtime and Versions", {
        contentDir: "ch01/10-databricks-runtime-and-versions",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142787/ltv-databricks-delta/databricks-runtime-and-versions.mp4",
        durationLabel: "1 min 25 s",
      }),
      L(11, "jobs-scheduling-notebook-runs", "Jobs — Scheduling Notebook Runs", {
        contentDir: "ch01/11-jobs-scheduling-notebook-runs",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142863/ltv-databricks-delta/jobs-scheduling-notebook-runs.mp4",
        durationLabel: "1 min 31 s",
      }),
      L(12, "databricks-cli-and-rest-api-basics", "Databricks CLI and REST API Basics", {
        contentDir: "ch01/12-databricks-cli-and-rest-api-basics",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792142933/ltv-databricks-delta/databricks-cli-and-rest-api-basics.mp4",
        durationLabel: "1 min 25 s",
      }),
    ],
  },
  {
    n: 2,
    title: "Delta Lake",
    lessons: [
      L(13, "what-is-delta-lake", "What Is Delta Lake?", {
        contentDir: "ch02/13-what-is-delta-lake",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143004/ltv-databricks-delta/what-is-delta-lake.mp4",
        durationLabel: "1 min 31 s",
      }),
      L(14, "delta-tables-vs-parquet-tables", "Delta Tables vs. Parquet Tables", {
        contentDir: "ch02/14-delta-tables-vs-parquet-tables",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143071/ltv-databricks-delta/delta-tables-vs-parquet-tables.mp4",
        durationLabel: "1 min 25 s",
      }),
      L(15, "creating-a-delta-table", "Creating a Delta Table", {
        contentDir: "ch02/15-creating-a-delta-table",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143130/ltv-databricks-delta/creating-a-delta-table.mp4",
        durationLabel: "1 min 14 s",
      }),
      L(16, "reading-and-writing-delta-tables", "Reading and Writing Delta Tables", {
        contentDir: "ch02/16-reading-and-writing-delta-tables",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143197/ltv-databricks-delta/reading-and-writing-delta-tables.mp4",
        durationLabel: "1 min 21 s",
      }),
      L(17, "the-delta-transaction-log", "The Delta Transaction Log", {
        contentDir: "ch02/17-the-delta-transaction-log",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143270/ltv-databricks-delta/the-delta-transaction-log.mp4",
        durationLabel: "1 min 35 s",
      }),
      L(18, "acid-transactions-in-delta-lake", "ACID Transactions in Delta Lake", {
        contentDir: "ch02/18-acid-transactions-in-delta-lake",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143345/ltv-databricks-delta/acid-transactions-in-delta-lake.mp4",
        durationLabel: "1 min 33 s",
      }),
      L(19, "schema-enforcement", "Schema Enforcement", {
        contentDir: "ch02/19-schema-enforcement",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143414/ltv-databricks-delta/schema-enforcement.mp4",
        durationLabel: "1 min 21 s",
      }),
      L(20, "schema-evolution", "Schema Evolution", {
        contentDir: "ch02/20-schema-evolution",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143479/ltv-databricks-delta/schema-evolution.mp4",
        durationLabel: "1 min 21 s",
      }),
      L(21, "time-travel", "Time Travel — Querying Historical Versions", {
        contentDir: "ch02/21-time-travel",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143542/ltv-databricks-delta/time-travel.mp4",
        durationLabel: "1 min 17 s",
      }),
      L(22, "update-delete-and-merge", "UPDATE, DELETE, and MERGE", {
        contentDir: "ch02/22-update-delete-and-merge",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143621/ltv-databricks-delta/update-delete-and-merge.mp4",
        durationLabel: "1 min 29 s",
      }),
      L(23, "optimize-and-file-compaction", "OPTIMIZE and File Compaction", {
        contentDir: "ch02/23-optimize-and-file-compaction",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143696/ltv-databricks-delta/optimize-and-file-compaction.mp4",
        durationLabel: "1 min 26 s",
      }),
      L(24, "vacuum-cleaning-up-old-files", "VACUUM — Cleaning Up Old Files", {
        contentDir: "ch02/24-vacuum-cleaning-up-old-files",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143770/ltv-databricks-delta/vacuum-cleaning-up-old-files.mp4",
        durationLabel: "1 min 29 s",
      }),
    ],
  },
  {
    n: 3,
    title: "Medallion Architecture",
    lessons: [
      L(25, "what-is-medallion-architecture", "What Is Medallion Architecture?", {
        contentDir: "ch03/25-what-is-medallion-architecture",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143850/ltv-databricks-delta/what-is-medallion-architecture.mp4",
        durationLabel: "1 min 38 s",
      }),
      L(26, "the-bronze-layer", "The Bronze Layer — Raw Ingestion", {
        contentDir: "ch03/26-the-bronze-layer",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143918/ltv-databricks-delta/the-bronze-layer.mp4",
        durationLabel: "1 min 24 s",
      }),
      L(27, "the-silver-layer", "The Silver Layer — Cleaned and Conformed Data", {
        contentDir: "ch03/27-the-silver-layer",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792143982/ltv-databricks-delta/the-silver-layer.mp4",
        durationLabel: "1 min 21 s",
      }),
      L(28, "the-gold-layer", "The Gold Layer — Business-Level Aggregates", {
        contentDir: "ch03/28-the-gold-layer",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144039/ltv-databricks-delta/the-gold-layer.mp4",
        durationLabel: "1 min 10 s",
      }),
      L(29, "designing-a-bronze-to-silver-pipeline", "Designing a Bronze-to-Silver Pipeline", {
        contentDir: "ch03/29-designing-a-bronze-to-silver-pipeline",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144108/ltv-databricks-delta/designing-a-bronze-to-silver-pipeline.mp4",
        durationLabel: "1 min 22 s",
      }),
      L(30, "designing-a-silver-to-gold-pipeline", "Designing a Silver-to-Gold Pipeline", {
        contentDir: "ch03/30-designing-a-silver-to-gold-pipeline",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144173/ltv-databricks-delta/designing-a-silver-to-gold-pipeline.mp4",
        durationLabel: "1 min 25 s",
      }),
      L(31, "incremental-processing-patterns", "Incremental Processing Patterns", {
        contentDir: "ch03/31-incremental-processing-patterns",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144243/ltv-databricks-delta/incremental-processing-patterns.mp4",
        durationLabel: "1 min 26 s",
      }),
      L(32, "autoloader", "Autoloader — Incremental File Ingestion", {
        contentDir: "ch03/32-autoloader",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144308/ltv-databricks-delta/autoloader.mp4",
        durationLabel: "1 min 17 s",
      }),
      L(33, "structured-streaming-basics", "Structured Streaming Basics", {
        contentDir: "ch03/33-structured-streaming-basics",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144372/ltv-databricks-delta/structured-streaming-basics.mp4",
        durationLabel: "1 min 16 s",
      }),
      L(34, "streaming-from-bronze-to-silver", "Streaming from Bronze to Silver", {
        contentDir: "ch03/34-streaming-from-bronze-to-silver",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144428/ltv-databricks-delta/streaming-from-bronze-to-silver.mp4",
        durationLabel: "1 min 13 s",
      }),
      L(35, "handling-late-arriving-data", "Handling Late-Arriving Data", {
        contentDir: "ch03/35-handling-late-arriving-data",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144500/ltv-databricks-delta/handling-late-arriving-data.mp4",
        durationLabel: "1 min 23 s",
      }),
      L(36, "data-quality-checks", "Data Quality Checks in the Medallion Flow", {
        contentDir: "ch03/36-data-quality-checks",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144569/ltv-databricks-delta/data-quality-checks.mp4",
        durationLabel: "1 min 22 s",
      }),
      L(37, "building-a-full-medallion-pipeline", "Building a Full Medallion Pipeline", {
        contentDir: "ch03/37-building-a-full-medallion-pipeline",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144641/ltv-databricks-delta/building-a-full-medallion-pipeline.mp4",
        durationLabel: "1 min 31 s",
      }),
    ],
  },
  {
    n: 4,
    title: "Unity Catalog",
    lessons: [
      L(38, "what-is-unity-catalog", "What Is Unity Catalog?", {
        contentDir: "ch04/38-what-is-unity-catalog",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144718/ltv-databricks-delta/what-is-unity-catalog.mp4",
        durationLabel: "1 min 32 s",
      }),
      L(39, "the-three-level-namespace", "The Three-Level Namespace", {
        contentDir: "ch04/39-the-three-level-namespace",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144782/ltv-databricks-delta/the-three-level-namespace.mp4",
        durationLabel: "1 min 23 s",
      }),
      L(40, "creating-a-catalog-and-schema", "Creating a Catalog and Schema", {
        contentDir: "ch04/40-creating-a-catalog-and-schema",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144846/ltv-databricks-delta/creating-a-catalog-and-schema.mp4",
        durationLabel: "1 min 15 s",
      }),
      L(41, "managed-vs-external-tables", "Managed Tables vs. External Tables", {
        contentDir: "ch04/41-managed-vs-external-tables",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144925/ltv-databricks-delta/managed-vs-external-tables.mp4",
        durationLabel: "1 min 39 s",
      }),
      L(42, "access-control-grant-and-revoke", "Access Control — GRANT and REVOKE", {
        contentDir: "ch04/42-access-control-grant-and-revoke",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792144990/ltv-databricks-delta/access-control-grant-and-revoke.mp4",
        durationLabel: "1 min 22 s",
      }),
      L(43, "row-and-column-level-security", "Row-Level and Column-Level Security", {
        contentDir: "ch04/43-row-and-column-level-security",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792145058/ltv-databricks-delta/row-and-column-level-security.mp4",
        durationLabel: "1 min 24 s",
      }),
      L(44, "data-lineage-in-unity-catalog", "Data Lineage in Unity Catalog", {
        contentDir: "ch04/44-data-lineage-in-unity-catalog",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792145123/ltv-databricks-delta/data-lineage-in-unity-catalog.mp4",
        durationLabel: "1 min 28 s",
      }),
      L(45, "unity-catalog-volumes", "Unity Catalog Volumes", {
        contentDir: "ch04/45-unity-catalog-volumes",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792145196/ltv-databricks-delta/unity-catalog-volumes.mp4",
        durationLabel: "1 min 26 s",
      }),
      L(46, "delta-sharing-basics", "Delta Sharing Basics", {
        contentDir: "ch04/46-delta-sharing-basics",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792145269/ltv-databricks-delta/delta-sharing-basics.mp4",
        durationLabel: "1 min 24 s",
      }),
      L(47, "unity-catalog-best-practices", "Unity Catalog Best Practices", {
        contentDir: "ch04/47-unity-catalog-best-practices",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792145341/ltv-databricks-delta/unity-catalog-best-practices.mp4",
        durationLabel: "1 min 34 s",
      }),
    ],
  },
  {
    n: 5,
    title: "Lakeflow",
    lessons: [
      L(48, "what-is-lakeflow", "What Is Lakeflow?", {
        contentDir: "ch05/48-what-is-lakeflow",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792145406/ltv-databricks-delta/what-is-lakeflow.mp4",
        durationLabel: "1 min 19 s",
      }),
      L(49, "lakeflow-connect", "Lakeflow Connect — Ingestion Basics", {
        contentDir: "ch05/49-lakeflow-connect",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792145475/ltv-databricks-delta/lakeflow-connect.mp4",
        durationLabel: "1 min 25 s",
      }),
      L(50, "lakeflow-declarative-pipelines", "Lakeflow Declarative Pipelines", {
        contentDir: "ch05/50-lakeflow-declarative-pipelines",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792145548/ltv-databricks-delta/lakeflow-declarative-pipelines.mp4",
        durationLabel: "1 min 26 s",
      }),
      L(51, "defining-a-pipeline-with-dlt-table", "Defining a Pipeline With @dlt.table", {
        contentDir: "ch05/51-defining-a-pipeline-with-dlt-table",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792145613/ltv-databricks-delta/defining-a-pipeline-with-dlt-table.mp4",
        durationLabel: "1 min 19 s",
      }),
      L(52, "expectations-declarative-data-quality", "Expectations — Declarative Data Quality", {
        contentDir: "ch05/52-expectations-declarative-data-quality",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792145686/ltv-databricks-delta/expectations-declarative-data-quality.mp4",
        durationLabel: "1 min 31 s",
      }),
      L(53, "pipeline-modes-triggered-vs-continuous", "Pipeline Modes: Triggered vs. Continuous", {
        contentDir: "ch05/53-pipeline-modes-triggered-vs-continuous",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792145759/ltv-databricks-delta/pipeline-modes-triggered-vs-continuous.mp4",
        durationLabel: "1 min 30 s",
      }),
      L(54, "lakeflow-jobs-orchestration", "Lakeflow Jobs — Orchestration", {
        contentDir: "ch05/54-lakeflow-jobs-orchestration",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(55, "monitoring-pipeline-runs", "Monitoring Pipeline Runs", {
        contentDir: "ch05/55-monitoring-pipeline-runs",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(56, "lakeflow-vs-traditional-adf-pipelines", "Lakeflow vs. Traditional ADF Pipelines", {
        contentDir: "ch05/56-lakeflow-vs-traditional-adf-pipelines",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(57, "course-recap", "Course Recap — From Storage to Orchestrated Pipelines", {
        contentDir: "ch05/57-course-recap",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
    ],
  },
];
