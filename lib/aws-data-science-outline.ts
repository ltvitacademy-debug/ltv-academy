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
      L(1, "s3-for-data-science", "S3 for Data Science"),
      L(2, "glue-data-catalog-and-etl", "Glue Data Catalog & ETL"),
      L(3, "athena-for-ad-hoc-queries", "Athena for Ad Hoc Queries"),
      L(4, "redshift-for-analytics", "Redshift for Analytics"),
      L(5, "iam-for-data-science-work", "IAM for Data Science Work"),
    ],
  },
  {
    n: 2,
    title: "SageMaker Foundations",
    lessons: [
      L(6, "the-sagemaker-environment", "The SageMaker Environment"),
      L(7, "notebooks-and-studio", "Notebooks & Studio"),
      L(8, "data-preparation-with-data-wrangler", "Data Preparation With Data Wrangler"),
      L(9, "training-jobs", "Training Jobs"),
      L(10, "built-in-algorithms-and-bring-your-own", "Built-In Algorithms & Bring-Your-Own"),
    ],
  },
  {
    n: 3,
    title: "Tuning & Pipelines",
    lessons: [
      L(11, "hyperparameter-tuning", "Hyperparameter Tuning"),
      L(12, "experiments-and-model-tracking", "Experiments & Model Tracking"),
      L(13, "sagemaker-pipelines", "SageMaker Pipelines"),
      L(14, "feature-store", "Feature Store"),
    ],
  },
  {
    n: 4,
    title: "Deployment & Monitoring",
    lessons: [
      L(15, "real-time-endpoints", "Real-Time Endpoints"),
      L(16, "batch-transform-and-serverless-inference", "Batch Transform & Serverless Inference"),
      L(17, "model-registry", "Model Registry"),
      L(18, "model-monitor-and-drift", "Model Monitor & Drift"),
      L(19, "cost-management-for-ml", "Cost Management for ML"),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(20, "capstone-kickoff-train-deploy-and-monitor-a-model-on-aws", "Capstone Kickoff: Train, Deploy and Monitor a Model on AWS"),
      L(21, "capstone-build-it", "Capstone: Build It"),
      L(22, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
