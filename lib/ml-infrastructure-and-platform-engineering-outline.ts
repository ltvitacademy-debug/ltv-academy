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
      L(1, "the-ml-platform-teams-job", "The ML Platform Team's Job", { contentDir: "ch01/01-the-ml-platform-teams-job", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600145/ltv-ml-infrastructure-and-platform-engineering/the-ml-platform-teams-job.mp4", durationLabel: "2 min 18 s" }),
      L(2, "build-vs-buy-for-ml-infrastructure", "Build vs. Buy for ML Infrastructure", { contentDir: "ch01/02-build-vs-buy-for-ml-infrastructure", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600759/ltv-ml-infrastructure-and-platform-engineering/build-vs-buy-for-ml-infrastructure.mp4", durationLabel: "2 min 25 s" }),
      L(3, "common-ml-platform-components", "Common ML Platform Components", { contentDir: "ch01/03-common-ml-platform-components", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601289/ltv-ml-infrastructure-and-platform-engineering/common-ml-platform-components.mp4", durationLabel: "2 min 11 s" }),
      L(4, "how-platform-needs-change-with-scale", "How Platform Needs Change With Scale", { contentDir: "ch01/04-how-platform-needs-change-with-scale", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601797/ltv-ml-infrastructure-and-platform-engineering/how-platform-needs-change-with-scale.mp4", durationLabel: "2 min 2 s" }),
    ],
  },
  {
    n: 2,
    title: "Feature Stores",
    lessons: [
      L(5, "what-a-feature-store-solves", "What a Feature Store Solves", { contentDir: "ch02/05-what-a-feature-store-solves", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602417/ltv-ml-infrastructure-and-platform-engineering/what-a-feature-store-solves.mp4", durationLabel: "2 min 18 s" }),
      L(6, "online-vs-offline-features", "Online vs. Offline Features", { contentDir: "ch02/06-online-vs-offline-features", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603003/ltv-ml-infrastructure-and-platform-engineering/online-vs-offline-features.mp4", durationLabel: "2 min 16 s" }),
      L(7, "feature-store-architecture-patterns", "Feature Store Architecture Patterns", { contentDir: "ch02/07-feature-store-architecture-patterns", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603595/ltv-ml-infrastructure-and-platform-engineering/feature-store-architecture-patterns.mp4", durationLabel: "2 min 15 s" }),
      L(8, "training-serving-skew", "Training/Serving Skew", { contentDir: "ch02/08-training-serving-skew", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604164/ltv-ml-infrastructure-and-platform-engineering/training-serving-skew.mp4", durationLabel: "2 min 17 s" }),
      L(9, "feature-versioning-and-lineage", "Feature Versioning & Lineage", { contentDir: "ch02/09-feature-versioning-and-lineage", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604745/ltv-ml-infrastructure-and-platform-engineering/feature-versioning-and-lineage.mp4", durationLabel: "2 min 12 s" }),
    ],
  },
  {
    n: 3,
    title: "Experiment Tracking & Model Registries",
    lessons: [
      L(10, "experiment-tracking-as-infrastructure", "Experiment Tracking as Infrastructure", { contentDir: "ch03/10-experiment-tracking-as-infrastructure", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605463/ltv-ml-infrastructure-and-platform-engineering/experiment-tracking-as-infrastructure.mp4", durationLabel: "2 min 28 s" }),
      L(11, "model-registries", "Model Registries", { contentDir: "ch03/11-model-registries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606066/ltv-ml-infrastructure-and-platform-engineering/model-registries.mp4", durationLabel: "2 min 7 s" }),
      L(12, "model-versioning-strategies", "Model Versioning Strategies", { contentDir: "ch03/12-model-versioning-strategies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606624/ltv-ml-infrastructure-and-platform-engineering/model-versioning-strategies.mp4", durationLabel: "1 min 59 s" }),
      L(13, "lineage-from-data-to-deployed-model", "Lineage: From Data to Deployed Model", { contentDir: "ch03/13-lineage-from-data-to-deployed-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607185/ltv-ml-infrastructure-and-platform-engineering/lineage-from-data-to-deployed-model.mp4", durationLabel: "2 min 5 s" }),
      L(14, "comparing-model-versions-in-production", "Comparing Model Versions in Production", { contentDir: "ch03/14-comparing-model-versions-in-production", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607695/ltv-ml-infrastructure-and-platform-engineering/comparing-model-versions-in-production.mp4", durationLabel: "1 min 59 s" }),
    ],
  },
  {
    n: 4,
    title: "ML Pipelines & Orchestration",
    lessons: [
      L(15, "pipeline-frameworks-for-ml", "Pipeline Frameworks for ML", { contentDir: "ch04/15-pipeline-frameworks-for-ml", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608267/ltv-ml-infrastructure-and-platform-engineering/pipeline-frameworks-for-ml.mp4", durationLabel: "2 min 18 s" }),
      L(16, "airflow-and-kubeflow-style-patterns", "Airflow- & Kubeflow-Style Patterns", { contentDir: "ch04/16-airflow-and-kubeflow-style-patterns", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608929/ltv-ml-infrastructure-and-platform-engineering/airflow-and-kubeflow-style-patterns.mp4", durationLabel: "2 min 23 s" }),
      L(17, "building-a-reproducible-training-pipeline", "Building a Reproducible Training Pipeline", { contentDir: "ch04/17-building-a-reproducible-training-pipeline", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609533/ltv-ml-infrastructure-and-platform-engineering/building-a-reproducible-training-pipeline.mp4", durationLabel: "2 min 9 s" }),
      L(18, "pipeline-scheduling-and-triggers", "Pipeline Scheduling & Triggers", { contentDir: "ch04/18-pipeline-scheduling-and-triggers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610164/ltv-ml-infrastructure-and-platform-engineering/pipeline-scheduling-and-triggers.mp4", durationLabel: "2 min 21 s" }),
      L(19, "pipeline-failure-handling", "Pipeline Failure Handling", { contentDir: "ch04/19-pipeline-failure-handling", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610669/ltv-ml-infrastructure-and-platform-engineering/pipeline-failure-handling.mp4", durationLabel: "2 min 9 s" }),
      L(20, "retraining-pipelines", "Retraining Pipelines", { contentDir: "ch04/20-retraining-pipelines", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792611398/ltv-ml-infrastructure-and-platform-engineering/retraining-pipelines.mp4", durationLabel: "2 min 13 s" }),
    ],
  },
  {
    n: 5,
    title: "Model Deployment Infrastructure",
    lessons: [
      L(21, "packaging-a-model-for-deployment", "Packaging a Model for Deployment", { contentDir: "ch05/21-packaging-a-model-for-deployment", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792612145/ltv-ml-infrastructure-and-platform-engineering/packaging-a-model-for-deployment.mp4", durationLabel: "2 min 13 s" }),
      L(22, "ci-cd-for-ml", "CI/CD for ML", { contentDir: "ch05/22-ci-cd-for-ml", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792612855/ltv-ml-infrastructure-and-platform-engineering/ci-cd-for-ml.mp4", durationLabel: "2 min 1 s" }),
      L(23, "canary-and-shadow-deployments", "Canary & Shadow Deployments", { contentDir: "ch05/23-canary-and-shadow-deployments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792613437/ltv-ml-infrastructure-and-platform-engineering/canary-and-shadow-deployments.mp4", durationLabel: "2 min" }),
      L(24, "rollback-strategies-for-models", "Rollback Strategies for Models", { contentDir: "ch05/24-rollback-strategies-for-models", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792613957/ltv-ml-infrastructure-and-platform-engineering/rollback-strategies-for-models.mp4", durationLabel: "2 min 4 s" }),
      L(25, "deployment-approval-gates", "Deployment Approval Gates", { contentDir: "ch05/25-deployment-approval-gates", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614303/ltv-ml-infrastructure-and-platform-engineering/deployment-approval-gates.mp4", durationLabel: "1 min 57 s" }),
      L(26, "blue-green-deployment-for-models", "Blue-Green Deployment for Models", { contentDir: "ch05/26-blue-green-deployment-for-models", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614722/ltv-ml-infrastructure-and-platform-engineering/blue-green-deployment-for-models.mp4", durationLabel: "2 min 1 s" }),
    ],
  },
  {
    n: 6,
    title: "Data & Model Versioning",
    lessons: [
      L(27, "data-versioning-tools", "Data Versioning Tools", { contentDir: "ch06/27-data-versioning-tools", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615102/ltv-ml-infrastructure-and-platform-engineering/data-versioning-tools.mp4", durationLabel: "2 min 7 s" }),
      L(28, "reproducibility-across-the-full-ml-lifecycle", "Reproducibility Across the Full ML Lifecycle", { contentDir: "ch06/28-reproducibility-across-the-full-ml-lifecycle", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615392/ltv-ml-infrastructure-and-platform-engineering/reproducibility-across-the-full-ml-lifecycle.mp4", durationLabel: "2 min 4 s" }),
      L(29, "artifact-storage-strategies", "Artifact Storage Strategies", { contentDir: "ch06/29-artifact-storage-strategies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615664/ltv-ml-infrastructure-and-platform-engineering/artifact-storage-strategies.mp4", durationLabel: "2 min 1 s" }),
      L(30, "auditability-for-regulated-environments", "Auditability for Regulated Environments", { contentDir: "ch06/30-auditability-for-regulated-environments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615979/ltv-ml-infrastructure-and-platform-engineering/auditability-for-regulated-environments.mp4", durationLabel: "2 min 16 s" }),
    ],
  },
  {
    n: 7,
    title: "Platform Reliability for ML",
    lessons: [
      L(31, "slas-and-slos-for-ml-systems", "SLAs & SLOs for ML Systems", { contentDir: "ch07/31-slas-and-slos-for-ml-systems", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616237/ltv-ml-infrastructure-and-platform-engineering/slas-and-slos-for-ml-systems.mp4", durationLabel: "2 min 39 s" }),
      L(32, "on-call-for-an-ml-platform", "On-Call for an ML Platform", { contentDir: "ch07/32-on-call-for-an-ml-platform", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616414/ltv-ml-infrastructure-and-platform-engineering/on-call-for-an-ml-platform.mp4", durationLabel: "2 min 16 s" }),
      L(33, "incident-response-when-a-model-degrades", "Incident Response When a Model Degrades", { contentDir: "ch07/33-incident-response-when-a-model-degrades", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616625/ltv-ml-infrastructure-and-platform-engineering/incident-response-when-a-model-degrades.mp4", durationLabel: "2 min 45 s" }),
      L(34, "capstone-designing-a-platform-for-a-growing-ml-team", "Capstone: Designing a Platform for a Growing ML Team", { contentDir: "ch07/34-capstone-designing-a-platform-for-a-growing-ml-team", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616854/ltv-ml-infrastructure-and-platform-engineering/capstone-designing-a-platform-for-a-growing-ml-team.mp4", durationLabel: "2 min 54 s" }),
      L(35, "capstone-writeup", "Capstone Write-Up", { contentDir: "ch07/35-capstone-writeup", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617043/ltv-ml-infrastructure-and-platform-engineering/capstone-writeup.mp4", durationLabel: "2 min 31 s" }),
    ],
  },
];
