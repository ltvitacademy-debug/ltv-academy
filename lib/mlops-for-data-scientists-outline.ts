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
      L(1, "why-models-fail-in-production", "Why Models Fail in Production"),
      L(2, "the-ml-lifecycle-and-mlops", "The ML Lifecycle & MLOps"),
      L(3, "project-structure-for-ml", "Project Structure for ML"),
      L(4, "git-and-github-for-data-scientists", "Git & GitHub for Data Scientists"),
      L(5, "reproducible-environments", "Reproducible Environments"),
    ],
  },
  {
    n: 2,
    title: "Versioning & Tracking",
    lessons: [
      L(6, "data-versioning", "Data Versioning"),
      L(7, "model-versioning", "Model Versioning"),
      L(8, "experiment-tracking-with-mlflow", "Experiment Tracking With MLflow"),
      L(9, "the-model-registry", "The Model Registry"),
    ],
  },
  {
    n: 3,
    title: "Packaging & Serving",
    lessons: [
      L(10, "building-a-prediction-api", "Building a Prediction API"),
      L(11, "docker-for-model-services", "Docker for Model Services"),
      L(12, "batch-vs-real-time-inference", "Batch vs. Real-Time Inference"),
      L(13, "deploying-to-the-cloud", "Deploying to the Cloud"),
    ],
  },
  {
    n: 4,
    title: "CI/CD for Machine Learning",
    lessons: [
      L(14, "testing-ml-code-and-data", "Testing ML Code & Data"),
      L(15, "github-actions-for-ml", "GitHub Actions for ML"),
      L(16, "automated-model-validation", "Automated Model Validation"),
      L(17, "promotion-between-environments", "Promotion Between Environments"),
    ],
  },
  {
    n: 5,
    title: "Monitoring & Retraining",
    lessons: [
      L(18, "data-drift-and-concept-drift", "Data Drift & Concept Drift"),
      L(19, "performance-monitoring-and-alerting", "Performance Monitoring & Alerting"),
      L(20, "automated-retraining-triggers", "Automated Retraining Triggers"),
      L(21, "governance-and-model-documentation", "Governance & Model Documentation"),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(22, "capstone-kickoff-automate-a-models-full-lifecycle", "Capstone Kickoff: Automate a Model's Full Lifecycle"),
      L(23, "capstone-build-it", "Capstone: Build It"),
      L(24, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
