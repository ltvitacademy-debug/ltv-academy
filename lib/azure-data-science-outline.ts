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
      L(1, "the-azure-ml-workspace", "The Azure ML Workspace", { contentDir: "ch01/01-the-azure-ml-workspace" }),
      L(2, "compute-and-environments", "Compute & Environments", { contentDir: "ch01/02-compute-and-environments" }),
      L(3, "data-assets-and-datastores", "Data Assets & Datastores", { contentDir: "ch01/03-data-assets-and-datastores" }),
      L(4, "notebooks-and-jobs", "Notebooks & Jobs", { contentDir: "ch01/04-notebooks-and-jobs" }),
      L(5, "azure-ml-studio-vs-sdk", "Azure ML Studio vs. SDK", { contentDir: "ch01/05-azure-ml-studio-vs-sdk" }),
    ],
  },
  {
    n: 2,
    title: "Training & Experiment Tracking",
    lessons: [
      L(6, "running-training-jobs", "Running Training Jobs", { contentDir: "ch02/06-running-training-jobs" }),
      L(7, "experiment-tracking-with-mlflow", "Experiment Tracking With MLflow", { contentDir: "ch02/07-experiment-tracking-with-mlflow" }),
      L(8, "automated-ml", "Automated ML", { contentDir: "ch02/08-automated-ml" }),
      L(9, "hyperparameter-tuning-at-scale", "Hyperparameter Tuning at Scale", { contentDir: "ch02/09-hyperparameter-tuning-at-scale" }),
      L(10, "pipelines", "Pipelines", { contentDir: "ch02/10-pipelines" }),
    ],
  },
  {
    n: 3,
    title: "Databricks & Fabric for Data Science",
    lessons: [
      L(11, "databricks-for-ml", "Databricks for ML", { contentDir: "ch03/11-databricks-for-ml" }),
      L(12, "mlflow-on-databricks", "MLflow on Databricks", { contentDir: "ch03/12-mlflow-on-databricks" }),
      L(13, "feature-engineering-at-scale-with-spark", "Feature Engineering at Scale With Spark", { contentDir: "ch03/13-feature-engineering-at-scale-with-spark" }),
      L(14, "data-science-in-microsoft-fabric", "Data Science in Microsoft Fabric", { contentDir: "ch03/14-data-science-in-microsoft-fabric" }),
    ],
  },
  {
    n: 4,
    title: "Deployment & Monitoring",
    lessons: [
      L(15, "the-model-registry", "The Model Registry", { contentDir: "ch04/15-the-model-registry" }),
      L(16, "real-time-endpoints", "Real-Time Endpoints", { contentDir: "ch04/16-real-time-endpoints" }),
      L(17, "batch-endpoints", "Batch Endpoints", { contentDir: "ch04/17-batch-endpoints" }),
      L(18, "monitoring-models-and-data-drift", "Monitoring Models & Data Drift", { contentDir: "ch04/18-monitoring-models-and-data-drift" }),
      L(19, "responsible-ai-tooling", "Responsible AI Tooling", { contentDir: "ch04/19-responsible-ai-tooling" }),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(20, "capstone-kickoff-train-deploy-and-monitor-a-model-on-azure", "Capstone Kickoff: Train, Deploy and Monitor a Model on Azure", { contentDir: "ch05/20-capstone-kickoff-train-deploy-and-monitor-a-model-on-azure" }),
      L(21, "capstone-build-it", "Capstone: Build It", { contentDir: "ch05/21-capstone-build-it" }),
      L(22, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch05/22-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
