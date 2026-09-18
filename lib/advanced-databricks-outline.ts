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
      L(1, "unity-catalog-architecture-review", "Unity Catalog Architecture, Revisited", {
        contentDir: "ch01/01-unity-catalog-architecture-review",
        // videoUrl/durationLabel pending
      }),
      L(2, "catalogs-schemas-external-locations", "Catalogs, Schemas & External Locations", {
        contentDir: "ch01/02-catalogs-schemas-external-locations",
        // videoUrl/durationLabel pending
      }),
      L(3, "managed-vs-external-tables", "Managed vs. External Tables", {
        contentDir: "ch01/03-managed-vs-external-tables",
        // videoUrl/durationLabel pending
      }),
      L(4, "unity-catalog-volumes", "Unity Catalog Volumes", {
        contentDir: "ch01/04-unity-catalog-volumes",
        // videoUrl/durationLabel pending
      }),
      L(5, "data-lineage-in-unity-catalog", "Data Lineage in Unity Catalog", {
        contentDir: "ch01/05-data-lineage-in-unity-catalog",
        // videoUrl/durationLabel pending
      }),
      L(6, "access-control-at-scale", "Access Control at Scale", {
        contentDir: "ch01/06-access-control-at-scale",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 2,
    title: "Auto Loader & Ingestion at Scale",
    lessons: [
      L(7, "auto-loader-fundamentals", "Auto Loader Fundamentals", {
        contentDir: "ch02/07-auto-loader-fundamentals",
        // videoUrl/durationLabel pending
      }),
      L(8, "schema-inference-and-evolution", "Schema Inference & Evolution", {
        contentDir: "ch02/08-schema-inference-and-evolution",
        // videoUrl/durationLabel pending
      }),
      L(9, "file-notification-mode", "File Notification Mode", {
        contentDir: "ch02/09-file-notification-mode",
        // videoUrl/durationLabel pending
      }),
      L(10, "auto-loader-plus-streaming", "Auto Loader + Structured Streaming", {
        contentDir: "ch02/10-auto-loader-plus-streaming",
        // videoUrl/durationLabel pending
      }),
      L(11, "ingestion-patterns-at-scale", "Ingestion Patterns at Scale", {
        contentDir: "ch02/11-ingestion-patterns-at-scale",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 3,
    title: "Lakeflow & Declarative Pipelines",
    lessons: [
      L(12, "what-is-lakeflow", "What Is Lakeflow?", {
        contentDir: "ch03/12-what-is-lakeflow",
        // videoUrl/durationLabel pending
      }),
      L(13, "declarative-pipeline-syntax", "Declarative Pipeline Syntax", {
        contentDir: "ch03/13-declarative-pipeline-syntax",
        // videoUrl/durationLabel pending
      }),
      L(14, "lakeflow-vs-traditional-notebooks", "Lakeflow vs. Traditional Notebooks", {
        contentDir: "ch03/14-lakeflow-vs-traditional-notebooks",
        // videoUrl/durationLabel pending
      }),
      L(15, "expectations-and-data-quality", "Expectations & Data Quality in Lakeflow", {
        contentDir: "ch03/15-expectations-and-data-quality",
        // videoUrl/durationLabel pending
      }),
      L(16, "lakeflow-deployment", "Lakeflow Deployment", {
        contentDir: "ch03/16-lakeflow-deployment",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 4,
    title: "Jobs, Workflows & Orchestration",
    lessons: [
      L(17, "databricks-jobs", "Databricks Jobs", {
        contentDir: "ch04/17-databricks-jobs",
        // videoUrl/durationLabel pending
      }),
      L(18, "workflows-ui", "The Workflows UI", {
        contentDir: "ch04/18-workflows-ui",
        // videoUrl/durationLabel pending
      }),
      L(19, "task-dependencies", "Task Dependencies", {
        contentDir: "ch04/19-task-dependencies",
        // videoUrl/durationLabel pending
      }),
      L(20, "job-clusters-vs-all-purpose-clusters", "Job Clusters vs. All-Purpose Clusters", {
        contentDir: "ch04/20-job-clusters-vs-all-purpose-clusters",
        // videoUrl/durationLabel pending
      }),
      L(21, "orchestrating-multi-step-pipelines", "Orchestrating Multi-Step Pipelines", {
        contentDir: "ch04/21-orchestrating-multi-step-pipelines",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 5,
    title: "Performance at Scale",
    lessons: [
      L(22, "the-photon-engine", "The Photon Engine", {
        contentDir: "ch05/22-the-photon-engine",
        // videoUrl/durationLabel pending
      }),
      L(23, "adaptive-query-execution", "Adaptive Query Execution", {
        contentDir: "ch05/23-adaptive-query-execution",
        // videoUrl/durationLabel pending
      }),
      L(24, "caching-strategies", "Caching Strategies", {
        contentDir: "ch05/24-caching-strategies",
        // videoUrl/durationLabel pending
      }),
      L(25, "cluster-sizing-for-large-workloads", "Cluster Sizing for Large Workloads", {
        contentDir: "ch05/25-cluster-sizing-for-large-workloads",
        // videoUrl/durationLabel pending
      }),
      L(26, "cost-optimization", "Cost Optimization", {
        contentDir: "ch05/26-cost-optimization",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 6,
    title: "Advanced Security & Governance",
    lessons: [
      L(27, "row-and-column-level-security", "Row- & Column-Level Security in Unity Catalog", {
        contentDir: "ch06/27-row-and-column-level-security",
        // videoUrl/durationLabel pending
      }),
      L(28, "delta-sharing", "Delta Sharing", {
        contentDir: "ch06/28-delta-sharing",
        // videoUrl/durationLabel pending
      }),
      L(29, "secrets-management", "Secrets Management", {
        contentDir: "ch06/29-secrets-management",
        // videoUrl/durationLabel pending
      }),
      L(30, "compliance-patterns", "Compliance Patterns", {
        contentDir: "ch06/30-compliance-patterns",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 7,
    title: "DP-750 Prep & Capstone",
    lessons: [
      L(31, "dp-750-exam-overview", "DP-750 Exam Overview", {
        contentDir: "ch07/31-dp-750-exam-overview",
        // videoUrl/durationLabel pending
      }),
      L(32, "dp-750-practice-scenarios", "DP-750 Practice Scenarios", {
        contentDir: "ch07/32-dp-750-practice-scenarios",
        // videoUrl/durationLabel pending
      }),
      L(33, "capstone-project", "Capstone: An Advanced Lakehouse Pipeline", {
        contentDir: "ch07/33-capstone-project",
        // videoUrl/durationLabel pending
      }),
      L(34, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", {
        contentDir: "ch07/34-capstone-wrap-up",
        // videoUrl/durationLabel pending
      }),
    ],
  },
];
