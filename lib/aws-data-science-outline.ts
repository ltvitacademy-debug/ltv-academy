// The AWS Data Science course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 10 of the Data Scientist path. AWS ML platform counterpart to Azure Data Science; reuses S3/Glue/Athena/Redshift ideas from the AWS Data Engineer path where helpful.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/aws-data-science/
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

export const AWS_DATA_SCIENCE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Data on AWS",
    lessons: [
      L(1, "s3-for-data-science", "S3 for Data Science", { contentDir: "ch01/01-s3-for-data-science" }),
      L(2, "glue-data-catalog-and-etl", "Glue Data Catalog & ETL", { contentDir: "ch01/02-glue-data-catalog-and-etl" }),
      L(3, "athena-for-ad-hoc-queries", "Athena for Ad Hoc Queries", { contentDir: "ch01/03-athena-for-ad-hoc-queries" }),
      L(4, "redshift-for-analytics", "Redshift for Analytics", { contentDir: "ch01/04-redshift-for-analytics" }),
      L(5, "iam-for-data-science-work", "IAM for Data Science Work", { contentDir: "ch01/05-iam-for-data-science-work" }),
    ],
  },
  {
    n: 2,
    title: "SageMaker Foundations",
    lessons: [
      L(6, "the-sagemaker-environment", "The SageMaker Environment", { contentDir: "ch02/06-the-sagemaker-environment" }),
      L(7, "notebooks-and-studio", "Notebooks & Studio", { contentDir: "ch02/07-notebooks-and-studio" }),
      L(8, "data-preparation-with-data-wrangler", "Data Preparation With Data Wrangler", { contentDir: "ch02/08-data-preparation-with-data-wrangler" }),
      L(9, "training-jobs", "Training Jobs", { contentDir: "ch02/09-training-jobs" }),
      L(10, "built-in-algorithms-and-bring-your-own", "Built-In Algorithms & Bring-Your-Own", { contentDir: "ch02/10-built-in-algorithms-and-bring-your-own" }),
    ],
  },
  {
    n: 3,
    title: "Tuning & Pipelines",
    lessons: [
      L(11, "hyperparameter-tuning", "Hyperparameter Tuning", { contentDir: "ch03/11-hyperparameter-tuning" }),
      L(12, "experiments-and-model-tracking", "Experiments & Model Tracking", { contentDir: "ch03/12-experiments-and-model-tracking" }),
      L(13, "sagemaker-pipelines", "SageMaker Pipelines", { contentDir: "ch03/13-sagemaker-pipelines" }),
      L(14, "feature-store", "Feature Store", { contentDir: "ch03/14-feature-store" }),
    ],
  },
  {
    n: 4,
    title: "Deployment & Monitoring",
    lessons: [
      L(15, "real-time-endpoints", "Real-Time Endpoints", { contentDir: "ch04/15-real-time-endpoints" }),
      L(16, "batch-transform-and-serverless-inference", "Batch Transform & Serverless Inference", { contentDir: "ch04/16-batch-transform-and-serverless-inference" }),
      L(17, "model-registry", "Model Registry", { contentDir: "ch04/17-model-registry" }),
      L(18, "model-monitor-and-drift", "Model Monitor & Drift", { contentDir: "ch04/18-model-monitor-and-drift" }),
      L(19, "cost-management-for-ml", "Cost Management for ML", { contentDir: "ch04/19-cost-management-for-ml" }),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(20, "capstone-kickoff-train-deploy-and-monitor-a-model-on-aws", "Capstone Kickoff: Train, Deploy and Monitor a Model on AWS", { contentDir: "ch05/20-capstone-kickoff-train-deploy-and-monitor-a-model-on-aws" }),
      L(21, "capstone-build-it", "Capstone: Build It", { contentDir: "ch05/21-capstone-build-it" }),
      L(22, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch05/22-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
