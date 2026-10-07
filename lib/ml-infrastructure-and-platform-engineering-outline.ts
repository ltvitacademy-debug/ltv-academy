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
      L(1, "the-ml-platform-teams-job", "The ML Platform Team's Job", { contentDir: "ch01/01-the-ml-platform-teams-job" }),
      L(2, "build-vs-buy-for-ml-infrastructure", "Build vs. Buy for ML Infrastructure", { contentDir: "ch01/02-build-vs-buy-for-ml-infrastructure" }),
      L(3, "common-ml-platform-components", "Common ML Platform Components", { contentDir: "ch01/03-common-ml-platform-components" }),
      L(4, "how-platform-needs-change-with-scale", "How Platform Needs Change With Scale", { contentDir: "ch01/04-how-platform-needs-change-with-scale" }),
    ],
  },
  {
    n: 2,
    title: "Feature Stores",
    lessons: [
      L(5, "what-a-feature-store-solves", "What a Feature Store Solves", { contentDir: "ch02/05-what-a-feature-store-solves" }),
      L(6, "online-vs-offline-features", "Online vs. Offline Features", { contentDir: "ch02/06-online-vs-offline-features" }),
      L(7, "feature-store-architecture-patterns", "Feature Store Architecture Patterns", { contentDir: "ch02/07-feature-store-architecture-patterns" }),
      L(8, "training-serving-skew", "Training/Serving Skew", { contentDir: "ch02/08-training-serving-skew" }),
      L(9, "feature-versioning-and-lineage", "Feature Versioning & Lineage", { contentDir: "ch02/09-feature-versioning-and-lineage" }),
    ],
  },
  {
    n: 3,
    title: "Experiment Tracking & Model Registries",
    lessons: [
      L(10, "experiment-tracking-as-infrastructure", "Experiment Tracking as Infrastructure", { contentDir: "ch03/10-experiment-tracking-as-infrastructure" }),
      L(11, "model-registries", "Model Registries", { contentDir: "ch03/11-model-registries" }),
      L(12, "model-versioning-strategies", "Model Versioning Strategies", { contentDir: "ch03/12-model-versioning-strategies" }),
      L(13, "lineage-from-data-to-deployed-model", "Lineage: From Data to Deployed Model", { contentDir: "ch03/13-lineage-from-data-to-deployed-model" }),
      L(14, "comparing-model-versions-in-production", "Comparing Model Versions in Production", { contentDir: "ch03/14-comparing-model-versions-in-production" }),
    ],
  },
  {
    n: 4,
    title: "ML Pipelines & Orchestration",
    lessons: [
      L(15, "pipeline-frameworks-for-ml", "Pipeline Frameworks for ML", { contentDir: "ch04/15-pipeline-frameworks-for-ml" }),
      L(16, "airflow-and-kubeflow-style-patterns", "Airflow- & Kubeflow-Style Patterns", { contentDir: "ch04/16-airflow-and-kubeflow-style-patterns" }),
      L(17, "building-a-reproducible-training-pipeline", "Building a Reproducible Training Pipeline", { contentDir: "ch04/17-building-a-reproducible-training-pipeline" }),
      L(18, "pipeline-scheduling-and-triggers", "Pipeline Scheduling & Triggers", { contentDir: "ch04/18-pipeline-scheduling-and-triggers" }),
      L(19, "pipeline-failure-handling", "Pipeline Failure Handling", { contentDir: "ch04/19-pipeline-failure-handling" }),
      L(20, "retraining-pipelines", "Retraining Pipelines", { contentDir: "ch04/20-retraining-pipelines" }),
    ],
  },
  {
    n: 5,
    title: "Model Deployment Infrastructure",
    lessons: [
      L(21, "packaging-a-model-for-deployment", "Packaging a Model for Deployment", { contentDir: "ch05/21-packaging-a-model-for-deployment" }),
      L(22, "ci-cd-for-ml", "CI/CD for ML", { contentDir: "ch05/22-ci-cd-for-ml" }),
      L(23, "canary-and-shadow-deployments", "Canary & Shadow Deployments", { contentDir: "ch05/23-canary-and-shadow-deployments" }),
      L(24, "rollback-strategies-for-models", "Rollback Strategies for Models", { contentDir: "ch05/24-rollback-strategies-for-models" }),
      L(25, "deployment-approval-gates", "Deployment Approval Gates", { contentDir: "ch05/25-deployment-approval-gates" }),
      L(26, "blue-green-deployment-for-models", "Blue-Green Deployment for Models", { contentDir: "ch05/26-blue-green-deployment-for-models" }),
    ],
  },
  {
    n: 6,
    title: "Data & Model Versioning",
    lessons: [
      L(27, "data-versioning-tools", "Data Versioning Tools", { contentDir: "ch06/27-data-versioning-tools" }),
      L(28, "reproducibility-across-the-full-ml-lifecycle", "Reproducibility Across the Full ML Lifecycle", { contentDir: "ch06/28-reproducibility-across-the-full-ml-lifecycle" }),
      L(29, "artifact-storage-strategies", "Artifact Storage Strategies", { contentDir: "ch06/29-artifact-storage-strategies" }),
      L(30, "auditability-for-regulated-environments", "Auditability for Regulated Environments", { contentDir: "ch06/30-auditability-for-regulated-environments" }),
    ],
  },
  {
    n: 7,
    title: "Platform Reliability for ML",
    lessons: [
      L(31, "slas-and-slos-for-ml-systems", "SLAs & SLOs for ML Systems", { contentDir: "ch07/31-slas-and-slos-for-ml-systems" }),
      L(32, "on-call-for-an-ml-platform", "On-Call for an ML Platform", { contentDir: "ch07/32-on-call-for-an-ml-platform" }),
      L(33, "incident-response-when-a-model-degrades", "Incident Response When a Model Degrades", { contentDir: "ch07/33-incident-response-when-a-model-degrades" }),
      L(34, "capstone-designing-a-platform-for-a-growing-ml-team", "Capstone: Designing a Platform for a Growing ML Team", { contentDir: "ch07/34-capstone-designing-a-platform-for-a-growing-ml-team" }),
      L(35, "capstone-writeup", "Capstone Write-Up", { contentDir: "ch07/35-capstone-writeup" }),
    ],
  },
];
