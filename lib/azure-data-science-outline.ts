// The Azure Data Science course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 9 of the Data Scientist path. Microsoft-cloud ML platforms; pairs with AWS Data Science (step 10) so graduates can work in either cloud.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/azure-data-science/
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

export const AZURE_DATA_SCIENCE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Azure Machine Learning Foundations",
    lessons: [
      L(1, "the-azure-ml-workspace", "The Azure ML Workspace"),
      L(2, "compute-and-environments", "Compute & Environments"),
      L(3, "data-assets-and-datastores", "Data Assets & Datastores"),
      L(4, "notebooks-and-jobs", "Notebooks & Jobs"),
      L(5, "azure-ml-studio-vs-sdk", "Azure ML Studio vs. SDK"),
    ],
  },
  {
    n: 2,
    title: "Training & Experiment Tracking",
    lessons: [
      L(6, "running-training-jobs", "Running Training Jobs"),
      L(7, "experiment-tracking-with-mlflow", "Experiment Tracking With MLflow"),
      L(8, "automated-ml", "Automated ML"),
      L(9, "hyperparameter-tuning-at-scale", "Hyperparameter Tuning at Scale"),
      L(10, "pipelines", "Pipelines"),
    ],
  },
  {
    n: 3,
    title: "Databricks & Fabric for Data Science",
    lessons: [
      L(11, "databricks-for-ml", "Databricks for ML"),
      L(12, "mlflow-on-databricks", "MLflow on Databricks"),
      L(13, "feature-engineering-at-scale-with-spark", "Feature Engineering at Scale With Spark"),
      L(14, "data-science-in-microsoft-fabric", "Data Science in Microsoft Fabric"),
    ],
  },
  {
    n: 4,
    title: "Deployment & Monitoring",
    lessons: [
      L(15, "the-model-registry", "The Model Registry"),
      L(16, "real-time-endpoints", "Real-Time Endpoints"),
      L(17, "batch-endpoints", "Batch Endpoints"),
      L(18, "monitoring-models-and-data-drift", "Monitoring Models & Data Drift"),
      L(19, "responsible-ai-tooling", "Responsible AI Tooling"),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(20, "capstone-kickoff-train-deploy-and-monitor-a-model-on-azure", "Capstone Kickoff: Train, Deploy and Monitor a Model on Azure"),
      L(21, "capstone-build-it", "Capstone: Build It"),
      L(22, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
