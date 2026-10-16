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
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792150524/ltv-advanced-databricks/unity-catalog-architecture-review.mp4",
        durationLabel: "1 min 2 s",
      }),
      L(2, "catalogs-schemas-external-locations", "Catalogs, Schemas & External Locations", {
        contentDir: "ch01/02-catalogs-schemas-external-locations",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792150579/ltv-advanced-databricks/catalogs-schemas-external-locations.mp4",
        durationLabel: "1 min 47 s",
      }),
      L(3, "managed-vs-external-tables", "Managed vs. External Tables", {
        contentDir: "ch01/03-managed-vs-external-tables",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792150630/ltv-advanced-databricks/managed-vs-external-tables.mp4",
        durationLabel: "1 min 42 s",
      }),
      L(4, "unity-catalog-volumes", "Unity Catalog Volumes", {
        contentDir: "ch01/04-unity-catalog-volumes",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792150685/ltv-advanced-databricks/unity-catalog-volumes.mp4",
        durationLabel: "1 min 47 s",
      }),
      L(5, "data-lineage-in-unity-catalog", "Data Lineage in Unity Catalog", {
        contentDir: "ch01/05-data-lineage-in-unity-catalog",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792150739/ltv-advanced-databricks/data-lineage-in-unity-catalog.mp4",
        durationLabel: "1 min 39 s",
      }),
      L(6, "access-control-at-scale", "Access Control at Scale", {
        contentDir: "ch01/06-access-control-at-scale",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792150794/ltv-advanced-databricks/access-control-at-scale.mp4",
        durationLabel: "1 min 41 s",
      }),
    ],
  },
  {
    n: 2,
    title: "Auto Loader & Ingestion at Scale",
    lessons: [
      L(7, "auto-loader-fundamentals", "Auto Loader Fundamentals", {
        contentDir: "ch02/07-auto-loader-fundamentals",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792150843/ltv-advanced-databricks/auto-loader-fundamentals.mp4",
        durationLabel: "1 min 33 s",
      }),
      L(8, "schema-inference-and-evolution", "Schema Inference & Evolution", {
        contentDir: "ch02/08-schema-inference-and-evolution",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792150893/ltv-advanced-databricks/schema-inference-and-evolution.mp4",
        durationLabel: "1 min 34 s",
      }),
      L(9, "file-notification-mode", "File Notification Mode", {
        contentDir: "ch02/09-file-notification-mode",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792150939/ltv-advanced-databricks/file-notification-mode.mp4",
        durationLabel: "1 min 28 s",
      }),
      L(10, "auto-loader-plus-streaming", "Auto Loader + Structured Streaming", {
        contentDir: "ch02/10-auto-loader-plus-streaming",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792150996/ltv-advanced-databricks/auto-loader-plus-streaming.mp4",
        durationLabel: "1 min 52 s",
      }),
      L(11, "ingestion-patterns-at-scale", "Ingestion Patterns at Scale", {
        contentDir: "ch02/11-ingestion-patterns-at-scale",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792151049/ltv-advanced-databricks/ingestion-patterns-at-scale.mp4",
        durationLabel: "1 min 40 s",
      }),
    ],
  },
  {
    n: 3,
    title: "Lakeflow & Declarative Pipelines",
    lessons: [
      L(12, "what-is-lakeflow", "What Is Lakeflow?", {
        contentDir: "ch03/12-what-is-lakeflow",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792151100/ltv-advanced-databricks/what-is-lakeflow.mp4",
        durationLabel: "1 min 40 s",
      }),
      L(13, "declarative-pipeline-syntax", "Declarative Pipeline Syntax", {
        contentDir: "ch03/13-declarative-pipeline-syntax",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792151144/ltv-advanced-databricks/declarative-pipeline-syntax.mp4",
        durationLabel: "1 min 22 s",
      }),
      L(14, "lakeflow-vs-traditional-notebooks", "Lakeflow vs. Traditional Notebooks", {
        contentDir: "ch03/14-lakeflow-vs-traditional-notebooks",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792151185/ltv-advanced-databricks/lakeflow-vs-traditional-notebooks.mp4",
        durationLabel: "1 min 12 s",
      }),
      L(15, "expectations-and-data-quality", "Expectations & Data Quality in Lakeflow", {
        contentDir: "ch03/15-expectations-and-data-quality",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792151227/ltv-advanced-databricks/expectations-and-data-quality.mp4",
        durationLabel: "1 min 20 s",
      }),
      L(16, "lakeflow-deployment", "Lakeflow Deployment", {
        contentDir: "ch03/16-lakeflow-deployment",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792151273/ltv-advanced-databricks/lakeflow-deployment.mp4",
        durationLabel: "1 min 26 s",
      }),
    ],
  },
  {
    n: 4,
    title: "Jobs, Workflows & Orchestration",
    lessons: [
      L(17, "databricks-jobs", "Databricks Jobs", {
        contentDir: "ch04/17-databricks-jobs",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792151310/ltv-advanced-databricks/databricks-jobs.mp4",
        durationLabel: "1 min 9 s",
      }),
      L(18, "workflows-ui", "The Workflows UI", {
        contentDir: "ch04/18-workflows-ui",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792151351/ltv-advanced-databricks/workflows-ui.mp4",
        durationLabel: "1 min 15 s",
      }),
      L(19, "task-dependencies", "Task Dependencies", {
        contentDir: "ch04/19-task-dependencies",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792151392/ltv-advanced-databricks/task-dependencies.mp4",
        durationLabel: "1 min 19 s",
      }),
      L(20, "job-clusters-vs-all-purpose-clusters", "Job Clusters vs. All-Purpose Clusters", {
        contentDir: "ch04/20-job-clusters-vs-all-purpose-clusters",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792151429/ltv-advanced-databricks/job-clusters-vs-all-purpose-clusters.mp4",
        durationLabel: "1 min 9 s",
      }),
      L(21, "orchestrating-multi-step-pipelines", "Orchestrating Multi-Step Pipelines", {
        contentDir: "ch04/21-orchestrating-multi-step-pipelines",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792151469/ltv-advanced-databricks/orchestrating-multi-step-pipelines.mp4",
        durationLabel: "1 min 17 s",
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
  {
    n: 8,
    title: "Agentic Data Engineering & What's New",
    lessons: [
      L(35, "agentic-data-engineering-paradigm", "Agentic Data Engineering: The New Paradigm", {
        contentDir: "ch08/35-agentic-data-engineering-paradigm",
        // videoUrl/durationLabel pending
      }),
      L(36, "zerobus-ingest", "Zerobus Ingest", {
        contentDir: "ch08/36-zerobus-ingest",
        // videoUrl/durationLabel pending
      }),
      L(37, "lakebase", "Lakebase", {
        contentDir: "ch08/37-lakebase",
        // videoUrl/durationLabel pending
      }),
      L(38, "auto-loader-file-events", "Auto Loader With File Events", {
        contentDir: "ch08/38-auto-loader-file-events",
        // videoUrl/durationLabel pending
      }),
      L(39, "real-time-mode-spark-declarative-pipelines", "Real-Time Mode for Spark Declarative Pipelines", {
        contentDir: "ch08/39-real-time-mode-spark-declarative-pipelines",
        // videoUrl/durationLabel pending
      }),
      L(40, "lakeflow-designer", "Lakeflow Designer", {
        contentDir: "ch08/40-lakeflow-designer",
        // videoUrl/durationLabel pending
      }),
      L(41, "agent-bricks-document-intelligence", "Agent Bricks & Document Intelligence", {
        contentDir: "ch08/41-agent-bricks-document-intelligence",
        // videoUrl/durationLabel pending
      }),
      L(42, "genie-code-and-zeroops", "Genie Code & Genie ZeroOps", {
        contentDir: "ch08/42-genie-code-and-zeroops",
        // videoUrl/durationLabel pending
      }),
    ],
  },
];
