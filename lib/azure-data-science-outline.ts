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
      L(1, "the-azure-ml-workspace", "The Azure ML Workspace", { contentDir: "ch01/01-the-azure-ml-workspace", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420435/ltv-azure-data-science/the-azure-ml-workspace.mp4", durationLabel: "2 min 14 s" }),
      L(2, "compute-and-environments", "Compute & Environments", { contentDir: "ch01/02-compute-and-environments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420713/ltv-azure-data-science/compute-and-environments.mp4", durationLabel: "2 min 2 s" }),
      L(3, "data-assets-and-datastores", "Data Assets & Datastores", { contentDir: "ch01/03-data-assets-and-datastores", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420952/ltv-azure-data-science/data-assets-and-datastores.mp4", durationLabel: "1 min 56 s" }),
      L(4, "notebooks-and-jobs", "Notebooks & Jobs", { contentDir: "ch01/04-notebooks-and-jobs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421210/ltv-azure-data-science/notebooks-and-jobs.mp4", durationLabel: "1 min 59 s" }),
      L(5, "azure-ml-studio-vs-sdk", "Azure ML Studio vs. SDK", { contentDir: "ch01/05-azure-ml-studio-vs-sdk", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421581/ltv-azure-data-science/azure-ml-studio-vs-sdk.mp4", durationLabel: "1 min 48 s" }),
    ],
  },
  {
    n: 2,
    title: "Training & Experiment Tracking",
    lessons: [
      L(6, "running-training-jobs", "Running Training Jobs", { contentDir: "ch02/06-running-training-jobs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421871/ltv-azure-data-science/running-training-jobs.mp4", durationLabel: "1 min 59 s" }),
      L(7, "experiment-tracking-with-mlflow", "Experiment Tracking With MLflow", { contentDir: "ch02/07-experiment-tracking-with-mlflow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422133/ltv-azure-data-science/experiment-tracking-with-mlflow.mp4", durationLabel: "2 min 5 s" }),
      L(8, "automated-ml", "Automated ML", { contentDir: "ch02/08-automated-ml", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422405/ltv-azure-data-science/automated-ml.mp4", durationLabel: "2 min 12 s" }),
      L(9, "hyperparameter-tuning-at-scale", "Hyperparameter Tuning at Scale", { contentDir: "ch02/09-hyperparameter-tuning-at-scale", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422665/ltv-azure-data-science/hyperparameter-tuning-at-scale.mp4", durationLabel: "2 min 16 s" }),
      L(10, "pipelines", "Pipelines", { contentDir: "ch02/10-pipelines", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422882/ltv-azure-data-science/pipelines.mp4", durationLabel: "1 min 55 s" }),
    ],
  },
  {
    n: 3,
    title: "Databricks & Fabric for Data Science",
    lessons: [
      L(11, "databricks-for-ml", "Databricks for ML", { contentDir: "ch03/11-databricks-for-ml", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423131/ltv-azure-data-science/databricks-for-ml.mp4", durationLabel: "2 min 11 s" }),
      L(12, "mlflow-on-databricks", "MLflow on Databricks", { contentDir: "ch03/12-mlflow-on-databricks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423413/ltv-azure-data-science/mlflow-on-databricks.mp4", durationLabel: "2 min 14 s" }),
      L(13, "feature-engineering-at-scale-with-spark", "Feature Engineering at Scale With Spark", { contentDir: "ch03/13-feature-engineering-at-scale-with-spark", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423870/ltv-azure-data-science/feature-engineering-at-scale-with-spark.mp4", durationLabel: "2 min 11 s" }),
      L(14, "data-science-in-microsoft-fabric", "Data Science in Microsoft Fabric", { contentDir: "ch03/14-data-science-in-microsoft-fabric", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424153/ltv-azure-data-science/data-science-in-microsoft-fabric.mp4", durationLabel: "2 min 19 s" }),
    ],
  },
  {
    n: 4,
    title: "Deployment & Monitoring",
    lessons: [
      L(15, "the-model-registry", "The Model Registry", { contentDir: "ch04/15-the-model-registry", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424309/ltv-azure-data-science/the-model-registry.mp4", durationLabel: "2 min 20 s" }),
      L(16, "real-time-endpoints", "Real-Time Endpoints", { contentDir: "ch04/16-real-time-endpoints", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424447/ltv-azure-data-science/real-time-endpoints.mp4", durationLabel: "2 min 19 s" }),
      L(17, "batch-endpoints", "Batch Endpoints", { contentDir: "ch04/17-batch-endpoints", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424568/ltv-azure-data-science/batch-endpoints.mp4", durationLabel: "2 min 5 s" }),
      L(18, "monitoring-models-and-data-drift", "Monitoring Models & Data Drift", { contentDir: "ch04/18-monitoring-models-and-data-drift", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792424685/ltv-azure-data-science/monitoring-models-and-data-drift.mp4", durationLabel: "2 min 0 s" }),
      L(19, "responsible-ai-tooling", "Responsible AI Tooling", { contentDir: "ch04/19-responsible-ai-tooling", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792425184/ltv-azure-data-science/responsible-ai-tooling.mp4", durationLabel: "2 min 7 s" }),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(20, "capstone-kickoff-train-deploy-and-monitor-a-model-on-azure", "Capstone Kickoff: Train, Deploy and Monitor a Model on Azure", { contentDir: "ch05/20-capstone-kickoff-train-deploy-and-monitor-a-model-on-azure", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792425235/ltv-azure-data-science/capstone-kickoff-train-deploy-and-monitor-a-model-on-azure.mp4", durationLabel: "1 min 7 s" }),
      L(21, "capstone-build-it", "Capstone: Build It", { contentDir: "ch05/21-capstone-build-it", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433438/ltv-azure-data-science/capstone-build-it.mp4", durationLabel: "2 min 10 s" }),
      L(22, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch05/22-capstone-wrap-up-and-portfolio-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792426594/ltv-azure-data-science/capstone-wrap-up-and-portfolio-presentation.mp4", durationLabel: "2 min 6 s" }),
    ],
  },
];
