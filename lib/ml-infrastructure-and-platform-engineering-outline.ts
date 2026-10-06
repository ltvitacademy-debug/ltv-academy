// The ML Infrastructure & Platform Engineering course outline — FRAMEWORK ONLY
// (chapter and lesson titles, no lesson content yet). Lessons without a contentDir
// render as "in production". Third course of the AI Infrastructure / ML Systems
// Engineer destination. Assumes Distributed Training Infrastructure. The platform
// layer a company builds once it has more than one model in production — feature
// stores, experiment tracking, pipelines, deployment and reliability.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ml-infrastructure-and-platform-engineering/
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

export const ML_INFRASTRUCTURE_AND_PLATFORM_ENGINEERING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "What an ML Platform Does",
    lessons: [
      L(1, "the-ml-platform-teams-job", "The ML Platform Team's Job"),
      L(2, "build-vs-buy-for-ml-infrastructure", "Build vs. Buy for ML Infrastructure"),
      L(3, "common-ml-platform-components", "Common ML Platform Components"),
      L(4, "how-platform-needs-change-with-scale", "How Platform Needs Change With Scale"),
    ],
  },
  {
    n: 2,
    title: "Feature Stores",
    lessons: [
      L(5, "what-a-feature-store-solves", "What a Feature Store Solves"),
      L(6, "online-vs-offline-features", "Online vs. Offline Features"),
      L(7, "feature-store-architecture-patterns", "Feature Store Architecture Patterns"),
      L(8, "training-serving-skew", "Training/Serving Skew"),
      L(9, "feature-versioning-and-lineage", "Feature Versioning & Lineage"),
    ],
  },
  {
    n: 3,
    title: "Experiment Tracking & Model Registries",
    lessons: [
      L(10, "experiment-tracking-as-infrastructure", "Experiment Tracking as Infrastructure"),
      L(11, "model-registries", "Model Registries"),
      L(12, "model-versioning-strategies", "Model Versioning Strategies"),
      L(13, "lineage-from-data-to-deployed-model", "Lineage: From Data to Deployed Model"),
      L(14, "comparing-model-versions-in-production", "Comparing Model Versions in Production"),
    ],
  },
  {
    n: 4,
    title: "ML Pipelines & Orchestration",
    lessons: [
      L(15, "pipeline-frameworks-for-ml", "Pipeline Frameworks for ML"),
      L(16, "airflow-and-kubeflow-style-patterns", "Airflow- & Kubeflow-Style Patterns"),
      L(17, "building-a-reproducible-training-pipeline", "Building a Reproducible Training Pipeline"),
      L(18, "pipeline-scheduling-and-triggers", "Pipeline Scheduling & Triggers"),
      L(19, "pipeline-failure-handling", "Pipeline Failure Handling"),
      L(20, "retraining-pipelines", "Retraining Pipelines"),
    ],
  },
  {
    n: 5,
    title: "Model Deployment Infrastructure",
    lessons: [
      L(21, "packaging-a-model-for-deployment", "Packaging a Model for Deployment"),
      L(22, "ci-cd-for-ml", "CI/CD for ML"),
      L(23, "canary-and-shadow-deployments", "Canary & Shadow Deployments"),
      L(24, "rollback-strategies-for-models", "Rollback Strategies for Models"),
      L(25, "deployment-approval-gates", "Deployment Approval Gates"),
      L(26, "blue-green-deployment-for-models", "Blue-Green Deployment for Models"),
    ],
  },
  {
    n: 6,
    title: "Data & Model Versioning",
    lessons: [
      L(27, "data-versioning-tools", "Data Versioning Tools"),
      L(28, "reproducibility-across-the-full-ml-lifecycle", "Reproducibility Across the Full ML Lifecycle"),
      L(29, "artifact-storage-strategies", "Artifact Storage Strategies"),
      L(30, "auditability-for-regulated-environments", "Auditability for Regulated Environments"),
    ],
  },
  {
    n: 7,
    title: "Platform Reliability for ML",
    lessons: [
      L(31, "slas-and-slos-for-ml-systems", "SLAs & SLOs for ML Systems"),
      L(32, "on-call-for-an-ml-platform", "On-Call for an ML Platform"),
      L(33, "incident-response-when-a-model-degrades", "Incident Response When a Model Degrades"),
      L(34, "capstone-designing-a-platform-for-a-growing-ml-team", "Capstone: Designing a Platform for a Growing ML Team"),
      L(35, "capstone-writeup", "Capstone Write-Up"),
    ],
  },
];
