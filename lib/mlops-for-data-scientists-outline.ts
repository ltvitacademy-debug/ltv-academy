// The MLOps for Data Scientists course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 11 of the Data Scientist path. Applies engineering practice — version control, containers, CI/CD — to ML systems; assumes the two cloud data science courses.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/mlops-for-data-scientists/
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

export const MLOPS_FOR_DATA_SCIENTISTS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "From Notebook to Production",
    lessons: [
      L(1, "why-models-fail-in-production", "Why Models Fail in Production", { contentDir: "ch01/01-why-models-fail-in-production", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792435887/ltv-mlops-for-data-scientists/why-models-fail-in-production.mp4", durationLabel: "1 min 46 s" }),
      L(2, "the-ml-lifecycle-and-mlops", "The ML Lifecycle & MLOps", { contentDir: "ch01/02-the-ml-lifecycle-and-mlops", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792435985/ltv-mlops-for-data-scientists/the-ml-lifecycle-and-mlops.mp4", durationLabel: "1 min 50 s" }),
      L(3, "project-structure-for-ml", "Project Structure for ML", { contentDir: "ch01/03-project-structure-for-ml", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436082/ltv-mlops-for-data-scientists/project-structure-for-ml.mp4", durationLabel: "1 min 43 s" }),
      L(4, "git-and-github-for-data-scientists", "Git & GitHub for Data Scientists", { contentDir: "ch01/04-git-and-github-for-data-scientists", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436203/ltv-mlops-for-data-scientists/git-and-github-for-data-scientists.mp4", durationLabel: "2 min 10 s" }),
      L(5, "reproducible-environments", "Reproducible Environments", { contentDir: "ch01/05-reproducible-environments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436317/ltv-mlops-for-data-scientists/reproducible-environments.mp4", durationLabel: "2 min 0 s" }),
    ],
  },
  {
    n: 2,
    title: "Versioning & Tracking",
    lessons: [
      L(6, "data-versioning", "Data Versioning", { contentDir: "ch02/06-data-versioning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436432/ltv-mlops-for-data-scientists/data-versioning.mp4", durationLabel: "2 min 8 s" }),
      L(7, "model-versioning", "Model Versioning", { contentDir: "ch02/07-model-versioning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436550/ltv-mlops-for-data-scientists/model-versioning.mp4", durationLabel: "2 min 5 s" }),
      L(8, "experiment-tracking-with-mlflow", "Experiment Tracking With MLflow", { contentDir: "ch02/08-experiment-tracking-with-mlflow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436672/ltv-mlops-for-data-scientists/experiment-tracking-with-mlflow.mp4", durationLabel: "2 min 13 s" }),
      L(9, "the-model-registry", "The Model Registry", { contentDir: "ch02/09-the-model-registry", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436781/ltv-mlops-for-data-scientists/the-model-registry.mp4", durationLabel: "2 min 1 s" }),
    ],
  },
  {
    n: 3,
    title: "Packaging & Serving",
    lessons: [
      L(10, "building-a-prediction-api", "Building a Prediction API", { contentDir: "ch03/10-building-a-prediction-api", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792436900/ltv-mlops-for-data-scientists/building-a-prediction-api.mp4", durationLabel: "2 min 4 s" }),
      L(11, "docker-for-model-services", "Docker for Model Services", { contentDir: "ch03/11-docker-for-model-services", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792437003/ltv-mlops-for-data-scientists/docker-for-model-services.mp4", durationLabel: "2 min 2 s" }),
      L(12, "batch-vs-real-time-inference", "Batch vs. Real-Time Inference", { contentDir: "ch03/12-batch-vs-real-time-inference", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792437121/ltv-mlops-for-data-scientists/batch-vs-real-time-inference.mp4", durationLabel: "2 min 2 s" }),
      L(13, "deploying-to-the-cloud", "Deploying to the Cloud", { contentDir: "ch03/13-deploying-to-the-cloud", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792437238/ltv-mlops-for-data-scientists/deploying-to-the-cloud.mp4", durationLabel: "2 min 8 s" }),
    ],
  },
  {
    n: 4,
    title: "CI/CD for Machine Learning",
    lessons: [
      L(14, "testing-ml-code-and-data", "Testing ML Code & Data", { contentDir: "ch04/14-testing-ml-code-and-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792437364/ltv-mlops-for-data-scientists/testing-ml-code-and-data.mp4", durationLabel: "2 min 15 s" }),
      L(15, "github-actions-for-ml", "GitHub Actions for ML", { contentDir: "ch04/15-github-actions-for-ml", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792437543/ltv-mlops-for-data-scientists/github-actions-for-ml.mp4", durationLabel: "2 min 10 s" }),
      L(16, "automated-model-validation", "Automated Model Validation", { contentDir: "ch04/16-automated-model-validation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792437811/ltv-mlops-for-data-scientists/automated-model-validation.mp4", durationLabel: "2 min 10 s" }),
      L(17, "promotion-between-environments", "Promotion Between Environments", { contentDir: "ch04/17-promotion-between-environments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792437824/ltv-mlops-for-data-scientists/promotion-between-environments.mp4", durationLabel: "2 min 5 s" }),
    ],
  },
  {
    n: 5,
    title: "Monitoring & Retraining",
    lessons: [
      L(18, "data-drift-and-concept-drift", "Data Drift & Concept Drift", { contentDir: "ch05/18-data-drift-and-concept-drift", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792437952/ltv-mlops-for-data-scientists/data-drift-and-concept-drift.mp4", durationLabel: "2 min 7 s" }),
      L(19, "performance-monitoring-and-alerting", "Performance Monitoring & Alerting", { contentDir: "ch05/19-performance-monitoring-and-alerting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792438049/ltv-mlops-for-data-scientists/performance-monitoring-and-alerting.mp4", durationLabel: "2 min 8 s" }),
      L(20, "automated-retraining-triggers", "Automated Retraining Triggers", { contentDir: "ch05/20-automated-retraining-triggers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792438160/ltv-mlops-for-data-scientists/automated-retraining-triggers.mp4", durationLabel: "2 min 18 s" }),
      L(21, "governance-and-model-documentation", "Governance & Model Documentation", { contentDir: "ch05/21-governance-and-model-documentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792438257/ltv-mlops-for-data-scientists/governance-and-model-documentation.mp4", durationLabel: "2 min 3 s" }),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(22, "capstone-kickoff-automate-a-models-full-lifecycle", "Capstone Kickoff: Automate a Model's Full Lifecycle", { contentDir: "ch06/22-capstone-kickoff-automate-a-models-full-lifecycle", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792438358/ltv-mlops-for-data-scientists/capstone-kickoff-automate-a-models-full-lifecycle.mp4", durationLabel: "2 min 2 s" }),
      L(23, "capstone-build-it", "Capstone: Build It", { contentDir: "ch06/23-capstone-build-it", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792438453/ltv-mlops-for-data-scientists/capstone-build-it.mp4", durationLabel: "2 min 5 s" }),
      L(24, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch06/24-capstone-wrap-up-and-portfolio-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792438550/ltv-mlops-for-data-scientists/capstone-wrap-up-and-portfolio-presentation.mp4", durationLabel: "2 min 4 s" }),
    ],
  },
];
