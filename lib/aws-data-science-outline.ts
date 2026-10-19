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
      L(1, "s3-for-data-science", "S3 for Data Science", { contentDir: "ch01/01-s3-for-data-science", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792426250/ltv-aws-data-science/s3-for-data-science.mp4", durationLabel: "2 min 15 s" }),
      L(2, "glue-data-catalog-and-etl", "Glue Data Catalog & ETL", { contentDir: "ch01/02-glue-data-catalog-and-etl", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792426490/ltv-aws-data-science/glue-data-catalog-and-etl.mp4", durationLabel: "2 min 7 s" }),
      L(3, "athena-for-ad-hoc-queries", "Athena for Ad Hoc Queries", { contentDir: "ch01/03-athena-for-ad-hoc-queries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792427889/ltv-aws-data-science/athena-for-ad-hoc-queries.mp4", durationLabel: "2 min 10 s" }),
      L(4, "redshift-for-analytics", "Redshift for Analytics", { contentDir: "ch01/04-redshift-for-analytics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792427054/ltv-aws-data-science/redshift-for-analytics.mp4", durationLabel: "2 min 2 s" }),
      L(5, "iam-for-data-science-work", "IAM for Data Science Work", { contentDir: "ch01/05-iam-for-data-science-work", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792428885/ltv-aws-data-science/iam-for-data-science-work.mp4", durationLabel: "2 min 26 s" }),
    ],
  },
  {
    n: 2,
    title: "SageMaker Foundations",
    lessons: [
      L(6, "the-sagemaker-environment", "The SageMaker Environment", { contentDir: "ch02/06-the-sagemaker-environment", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792428433/ltv-aws-data-science/the-sagemaker-environment.mp4", durationLabel: "2 min 18 s" }),
      L(7, "notebooks-and-studio", "Notebooks & Studio", { contentDir: "ch02/07-notebooks-and-studio", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433347/ltv-aws-data-science/notebooks-and-studio.mp4", durationLabel: "1 min 58 s" }),
      L(8, "data-preparation-with-data-wrangler", "Data Preparation With Data Wrangler", { contentDir: "ch02/08-data-preparation-with-data-wrangler", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792430089/ltv-aws-data-science/data-preparation-with-data-wrangler.mp4", durationLabel: "2 min 6 s" }),
      L(9, "training-jobs", "Training Jobs", { contentDir: "ch02/09-training-jobs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433351/ltv-aws-data-science/training-jobs.mp4", durationLabel: "2 min 6 s" }),
      L(10, "built-in-algorithms-and-bring-your-own", "Built-In Algorithms & Bring-Your-Own", { contentDir: "ch02/10-built-in-algorithms-and-bring-your-own", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792431249/ltv-aws-data-science/built-in-algorithms-and-bring-your-own.mp4", durationLabel: "2 min 16 s" }),
    ],
  },
  {
    n: 3,
    title: "Tuning & Pipelines",
    lessons: [
      L(11, "hyperparameter-tuning", "Hyperparameter Tuning", { contentDir: "ch03/11-hyperparameter-tuning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792431730/ltv-aws-data-science/hyperparameter-tuning.mp4", durationLabel: "2 min 10 s" }),
      L(12, "experiments-and-model-tracking", "Experiments & Model Tracking", { contentDir: "ch03/12-experiments-and-model-tracking", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792432181/ltv-aws-data-science/experiments-and-model-tracking.mp4", durationLabel: "1 min 59 s" }),
      L(13, "sagemaker-pipelines", "SageMaker Pipelines", { contentDir: "ch03/13-sagemaker-pipelines", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792432585/ltv-aws-data-science/sagemaker-pipelines.mp4", durationLabel: "2 min 6 s" }),
      L(14, "feature-store", "Feature Store", { contentDir: "ch03/14-feature-store", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792432960/ltv-aws-data-science/feature-store.mp4", durationLabel: "2 min 8 s" }),
    ],
  },
  {
    n: 4,
    title: "Deployment & Monitoring",
    lessons: [
      L(15, "real-time-endpoints", "Real-Time Endpoints", { contentDir: "ch04/15-real-time-endpoints", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433283/ltv-aws-data-science/real-time-endpoints.mp4", durationLabel: "2 min 13 s" }),
      L(16, "batch-transform-and-serverless-inference", "Batch Transform & Serverless Inference", { contentDir: "ch04/16-batch-transform-and-serverless-inference", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792433233/ltv-aws-data-science/batch-transform-and-serverless-inference.mp4", durationLabel: "2 min 6 s" }),
      L(17, "model-registry", "Model Registry", { contentDir: "ch04/17-model-registry", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792432888/ltv-aws-data-science/model-registry.mp4", durationLabel: "2 min 7 s" }),
      L(18, "model-monitor-and-drift", "Model Monitor & Drift", { contentDir: "ch04/18-model-monitor-and-drift", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792432390/ltv-aws-data-science/model-monitor-and-drift.mp4", durationLabel: "1 min 58 s" }),
      L(19, "cost-management-for-ml", "Cost Management for ML", { contentDir: "ch04/19-cost-management-for-ml", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792431882/ltv-aws-data-science/cost-management-for-ml.mp4", durationLabel: "2 min 2 s" }),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(20, "capstone-kickoff-train-deploy-and-monitor-a-model-on-aws", "Capstone Kickoff: Train, Deploy and Monitor a Model on AWS", { contentDir: "ch05/20-capstone-kickoff-train-deploy-and-monitor-a-model-on-aws", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792431318/ltv-aws-data-science/capstone-kickoff-train-deploy-and-monitor-a-model-on-aws.mp4", durationLabel: "1 min 50 s" }),
      L(21, "capstone-build-it", "Capstone: Build It", { contentDir: "ch05/21-capstone-build-it", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792430788/ltv-aws-data-science/capstone-build-it.mp4", durationLabel: "2 min 17 s" }),
      L(22, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch05/22-capstone-wrap-up-and-portfolio-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792429998/ltv-aws-data-science/capstone-wrap-up-and-portfolio-presentation.mp4", durationLabel: "2 min 1 s" }),
    ],
  },
];
