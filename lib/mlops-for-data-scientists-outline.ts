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
      L(1, "why-models-fail-in-production", "Why Models Fail in Production", { contentDir: "ch01/01-why-models-fail-in-production" }),
      L(2, "the-ml-lifecycle-and-mlops", "The ML Lifecycle & MLOps", { contentDir: "ch01/02-the-ml-lifecycle-and-mlops" }),
      L(3, "project-structure-for-ml", "Project Structure for ML", { contentDir: "ch01/03-project-structure-for-ml" }),
      L(4, "git-and-github-for-data-scientists", "Git & GitHub for Data Scientists", { contentDir: "ch01/04-git-and-github-for-data-scientists" }),
      L(5, "reproducible-environments", "Reproducible Environments", { contentDir: "ch01/05-reproducible-environments" }),
    ],
  },
  {
    n: 2,
    title: "Versioning & Tracking",
    lessons: [
      L(6, "data-versioning", "Data Versioning", { contentDir: "ch02/06-data-versioning" }),
      L(7, "model-versioning", "Model Versioning", { contentDir: "ch02/07-model-versioning" }),
      L(8, "experiment-tracking-with-mlflow", "Experiment Tracking With MLflow", { contentDir: "ch02/08-experiment-tracking-with-mlflow" }),
      L(9, "the-model-registry", "The Model Registry", { contentDir: "ch02/09-the-model-registry" }),
    ],
  },
  {
    n: 3,
    title: "Packaging & Serving",
    lessons: [
      L(10, "building-a-prediction-api", "Building a Prediction API", { contentDir: "ch03/10-building-a-prediction-api" }),
      L(11, "docker-for-model-services", "Docker for Model Services", { contentDir: "ch03/11-docker-for-model-services" }),
      L(12, "batch-vs-real-time-inference", "Batch vs. Real-Time Inference", { contentDir: "ch03/12-batch-vs-real-time-inference" }),
      L(13, "deploying-to-the-cloud", "Deploying to the Cloud", { contentDir: "ch03/13-deploying-to-the-cloud" }),
    ],
  },
  {
    n: 4,
    title: "CI/CD for Machine Learning",
    lessons: [
      L(14, "testing-ml-code-and-data", "Testing ML Code & Data", { contentDir: "ch04/14-testing-ml-code-and-data" }),
      L(15, "github-actions-for-ml", "GitHub Actions for ML", { contentDir: "ch04/15-github-actions-for-ml" }),
      L(16, "automated-model-validation", "Automated Model Validation", { contentDir: "ch04/16-automated-model-validation" }),
      L(17, "promotion-between-environments", "Promotion Between Environments", { contentDir: "ch04/17-promotion-between-environments" }),
    ],
  },
  {
    n: 5,
    title: "Monitoring & Retraining",
    lessons: [
      L(18, "data-drift-and-concept-drift", "Data Drift & Concept Drift", { contentDir: "ch05/18-data-drift-and-concept-drift" }),
      L(19, "performance-monitoring-and-alerting", "Performance Monitoring & Alerting", { contentDir: "ch05/19-performance-monitoring-and-alerting" }),
      L(20, "automated-retraining-triggers", "Automated Retraining Triggers", { contentDir: "ch05/20-automated-retraining-triggers" }),
      L(21, "governance-and-model-documentation", "Governance & Model Documentation", { contentDir: "ch05/21-governance-and-model-documentation" }),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(22, "capstone-kickoff-automate-a-models-full-lifecycle", "Capstone Kickoff: Automate a Model's Full Lifecycle", { contentDir: "ch06/22-capstone-kickoff-automate-a-models-full-lifecycle" }),
      L(23, "capstone-build-it", "Capstone: Build It", { contentDir: "ch06/23-capstone-build-it" }),
      L(24, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch06/24-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
