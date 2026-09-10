// The full Advanced Databricks Specialization course outline. Only lessons
// with a contentDir + videoUrl are playable; everything else renders as
// "in production". Continues straight from Azure Databricks & Delta Lake —
// this course does not re-teach clusters, notebooks, or basic Delta Lake;
// it goes deeper into Unity Catalog, ingestion at scale, Lakeflow,
// orchestration, performance, and DP-750 prep.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/advanced-databricks/
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

export const ADVANCED_DATABRICKS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Beyond the Basics: Unity Catalog Deep Dive",
    lessons: [
      L(1, "unity-catalog-architecture-review", "Unity Catalog Architecture, Revisited"),
      L(2, "catalogs-schemas-external-locations", "Catalogs, Schemas & External Locations"),
      L(3, "managed-vs-external-tables", "Managed vs. External Tables"),
      L(4, "unity-catalog-volumes", "Unity Catalog Volumes"),
      L(5, "data-lineage-in-unity-catalog", "Data Lineage in Unity Catalog"),
      L(6, "access-control-at-scale", "Access Control at Scale"),
    ],
  },
  {
    n: 2,
    title: "Auto Loader & Ingestion at Scale",
    lessons: [
      L(7, "auto-loader-fundamentals", "Auto Loader Fundamentals"),
      L(8, "schema-inference-and-evolution", "Schema Inference & Evolution"),
      L(9, "file-notification-mode", "File Notification Mode"),
      L(10, "auto-loader-plus-streaming", "Auto Loader + Structured Streaming"),
      L(11, "ingestion-patterns-at-scale", "Ingestion Patterns at Scale"),
    ],
  },
  {
    n: 3,
    title: "Lakeflow & Declarative Pipelines",
    lessons: [
      L(12, "what-is-lakeflow", "What Is Lakeflow?"),
      L(13, "declarative-pipeline-syntax", "Declarative Pipeline Syntax"),
      L(14, "lakeflow-vs-traditional-notebooks", "Lakeflow vs. Traditional Notebooks"),
      L(15, "expectations-and-data-quality", "Expectations & Data Quality in Lakeflow"),
      L(16, "lakeflow-deployment", "Lakeflow Deployment"),
    ],
  },
  {
    n: 4,
    title: "Jobs, Workflows & Orchestration",
    lessons: [
      L(17, "databricks-jobs", "Databricks Jobs"),
      L(18, "workflows-ui", "The Workflows UI"),
      L(19, "task-dependencies", "Task Dependencies"),
      L(20, "job-clusters-vs-all-purpose-clusters", "Job Clusters vs. All-Purpose Clusters"),
      L(21, "orchestrating-multi-step-pipelines", "Orchestrating Multi-Step Pipelines"),
    ],
  },
  {
    n: 5,
    title: "Performance at Scale",
    lessons: [
      L(22, "the-photon-engine", "The Photon Engine"),
      L(23, "adaptive-query-execution", "Adaptive Query Execution"),
      L(24, "caching-strategies", "Caching Strategies"),
      L(25, "cluster-sizing-for-large-workloads", "Cluster Sizing for Large Workloads"),
      L(26, "cost-optimization", "Cost Optimization"),
    ],
  },
  {
    n: 6,
    title: "Advanced Security & Governance",
    lessons: [
      L(27, "row-and-column-level-security", "Row- & Column-Level Security in Unity Catalog"),
      L(28, "delta-sharing", "Delta Sharing"),
      L(29, "secrets-management", "Secrets Management"),
      L(30, "compliance-patterns", "Compliance Patterns"),
    ],
  },
  {
    n: 7,
    title: "DP-750 Prep & Capstone",
    lessons: [
      L(31, "dp-750-exam-overview", "DP-750 Exam Overview"),
      L(32, "dp-750-practice-scenarios", "DP-750 Practice Scenarios"),
      L(33, "capstone-project", "Capstone: An Advanced Lakehouse Pipeline"),
      L(34, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
