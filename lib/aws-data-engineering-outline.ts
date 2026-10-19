// The full AWS Data Engineering course outline. Lessons 1-55 (chapters
// 1-11) have real video. Chapter 12 (lessons 56-58) is a deliberate
// exception added 2026-10-17: written case studies on modern lakehouse
// patterns (S3 Tables/Iceberg, Lake Formation fine-grained permissions,
// Glue Data Quality/DQDL) researched and verified against current AWS
// docs — no video, contentDir only, same pattern used elsewhere in this
// catalog for guide-only lessons. A lesson with a contentDir but no
// videoUrl still renders fully (guide, quiz, AI assistant, navigation)
// — only the video player itself is replaced with an "in production"
// placeholder. Assumes AWS Fundamentals for Data Engineers and the SQL/
// Spark foundation from T-SQL Development and Data Engineering
// Foundations — this course goes straight into the AWS services current
// AWS data engineering postings actually ask for: S3, Glue, Athena,
// Redshift, Lambda, Step Functions, DMS, EMR, Kinesis, and CloudWatch.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/aws-data-engineering/
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

export const AWS_DATA_ENGINEERING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "S3 for Data Engineers",
    lessons: [
      L(1, "s3-fundamentals", "S3 Fundamentals", {
        contentDir: "ch01/01-s3-fundamentals",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792153891/ltv-aws-data-engineering/s3-fundamentals.mp4",
        durationLabel: "1 min 29 s",
      }),
      L(2, "buckets-and-objects", "Buckets & Objects", {
        contentDir: "ch01/02-buckets-and-objects",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792153929/ltv-aws-data-engineering/buckets-and-objects.mp4",
        durationLabel: "1 min 15 s",
      }),
      L(3, "storage-classes", "Storage Classes", {
        contentDir: "ch01/03-storage-classes",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792153972/ltv-aws-data-engineering/storage-classes.mp4",
        durationLabel: "1 min 24 s",
      }),
      L(4, "partitioning-strategy-in-s3", "Partitioning Strategy in S3", {
        contentDir: "ch01/04-partitioning-strategy-in-s3",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792154011/ltv-aws-data-engineering/partitioning-strategy-in-s3.mp4",
        durationLabel: "1 min 18 s",
      }),
      L(5, "s3-event-notifications", "S3 Event Notifications", {
        contentDir: "ch01/05-s3-event-notifications",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792154053/ltv-aws-data-engineering/s3-event-notifications.mp4",
        durationLabel: "1 min 17 s",
      }),
      L(6, "s3-as-a-data-lake-foundation", "S3 as a Data Lake Foundation", {
        contentDir: "ch01/06-s3-as-a-data-lake-foundation",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792154095/ltv-aws-data-engineering/s3-as-a-data-lake-foundation.mp4",
        durationLabel: "1 min 23 s",
      }),
    ],
  },
  {
    n: 2,
    title: "IAM for Data Pipelines",
    lessons: [
      L(7, "iam-roles-for-services", "IAM Roles for Services", {
        contentDir: "ch02/07-iam-roles-for-services",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792154136/ltv-aws-data-engineering/iam-roles-for-services.mp4",
        durationLabel: "1 min 17 s",
      }),
      L(8, "resource-based-policies", "Resource-Based Policies", {
        contentDir: "ch02/08-resource-based-policies",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792154175/ltv-aws-data-engineering/resource-based-policies.mp4",
        durationLabel: "1 min 16 s",
      }),
      L(9, "cross-account-access", "Cross-Account Access", {
        contentDir: "ch02/09-cross-account-access",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792154217/ltv-aws-data-engineering/cross-account-access.mp4",
        durationLabel: "1 min 22 s",
      }),
      L(10, "iam-best-practices-for-pipelines", "IAM Best Practices for Pipelines", {
        contentDir: "ch02/10-iam-best-practices-for-pipelines",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792154258/ltv-aws-data-engineering/iam-best-practices-for-pipelines.mp4",
        durationLabel: "1 min 19 s",
      }),
    ],
  },
  {
    n: 3,
    title: "AWS Glue & the Glue Catalog",
    lessons: [
      L(11, "glue-architecture", "Glue Architecture", {
        contentDir: "ch03/11-glue-architecture",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792154321/ltv-aws-data-engineering/glue-architecture.mp4",
        durationLabel: "2 min 4 s",
      }),
      L(12, "glue-crawlers", "Glue Crawlers", {
        contentDir: "ch03/12-glue-crawlers",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792154386/ltv-aws-data-engineering/glue-crawlers.mp4",
        durationLabel: "1 min 56 s",
      }),
      L(13, "the-glue-data-catalog", "The Glue Data Catalog", {
        contentDir: "ch03/13-the-glue-data-catalog",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792154451/ltv-aws-data-engineering/the-glue-data-catalog.mp4",
        durationLabel: "2 min 9 s",
      }),
      L(14, "glue-etl-jobs", "Glue ETL Jobs: Python & Scala Spark", {
        contentDir: "ch03/14-glue-etl-jobs",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792154513/ltv-aws-data-engineering/glue-etl-jobs.mp4",
        durationLabel: "1 min 57 s",
      }),
      L(15, "glue-studio", "Glue Studio", {
        contentDir: "ch03/15-glue-studio",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792154573/ltv-aws-data-engineering/glue-studio.mp4",
        durationLabel: "1 min 57 s",
      }),
      L(16, "glue-job-bookmarks", "Glue Job Bookmarks", {
        contentDir: "ch03/16-glue-job-bookmarks",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792154632/ltv-aws-data-engineering/glue-job-bookmarks.mp4",
        durationLabel: "1 min 58 s",
      }),
      L(17, "glue-triggers-and-workflows", "Glue Triggers & Workflows", {
        contentDir: "ch03/17-glue-triggers-and-workflows",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792154692/ltv-aws-data-engineering/glue-triggers-and-workflows.mp4",
        durationLabel: "1 min 53 s",
      }),
    ],
  },
  {
    n: 4,
    title: "Athena — Serverless Querying",
    lessons: [
      L(18, "athena-fundamentals", "Athena Fundamentals", {
        contentDir: "ch04/18-athena-fundamentals",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792154755/ltv-aws-data-engineering/athena-fundamentals.mp4",
        durationLabel: "2 min 7 s",
      }),
      L(19, "querying-s3-data-with-athena", "Querying S3 Data With Athena", {
        contentDir: "ch04/19-querying-s3-data-with-athena",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792154820/ltv-aws-data-engineering/querying-s3-data-with-athena.mp4",
        durationLabel: "2 min 10 s",
      }),
      L(20, "athena-and-the-glue-catalog", "Athena + Glue Catalog Integration", {
        contentDir: "ch04/20-athena-and-the-glue-catalog",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792154873/ltv-aws-data-engineering/athena-and-the-glue-catalog.mp4",
        durationLabel: "1 min 43 s",
      }),
      L(21, "partitioning-for-athena-performance", "Partitioning for Athena Performance", {
        contentDir: "ch04/21-partitioning-for-athena-performance",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792154940/ltv-aws-data-engineering/partitioning-for-athena-performance.mp4",
        durationLabel: "2 min 15 s",
      }),
      L(22, "athena-cost-optimization", "Athena Cost Optimization", {
        contentDir: "ch04/22-athena-cost-optimization",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792155000/ltv-aws-data-engineering/athena-cost-optimization.mp4",
        durationLabel: "2 min 2 s",
      }),
    ],
  },
  {
    n: 5,
    title: "Redshift — Cloud Data Warehousing",
    lessons: [
      L(23, "redshift-architecture", "Redshift Architecture", {
        contentDir: "ch05/23-redshift-architecture",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792155043/ltv-aws-data-engineering/redshift-architecture.mp4",
        durationLabel: "1 min 23 s",
      }),
      L(24, "cluster-vs-serverless", "Cluster vs. Serverless", {
        contentDir: "ch05/24-cluster-vs-serverless",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792155087/ltv-aws-data-engineering/cluster-vs-serverless.mp4",
        durationLabel: "1 min 28 s",
      }),
      L(25, "loading-data-with-copy", "Loading Data Into Redshift: the COPY Command", {
        contentDir: "ch05/25-loading-data-with-copy",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792155131/ltv-aws-data-engineering/loading-data-with-copy.mp4",
        durationLabel: "1 min 24 s",
      }),
      L(26, "distribution-and-sort-keys", "Distribution & Sort Keys", {
        contentDir: "ch05/26-distribution-and-sort-keys",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792155186/ltv-aws-data-engineering/distribution-and-sort-keys.mp4",
        durationLabel: "1 min 44 s",
      }),
      L(27, "redshift-spectrum", "Redshift Spectrum", {
        contentDir: "ch05/27-redshift-spectrum",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792155231/ltv-aws-data-engineering/redshift-spectrum.mp4",
        durationLabel: "1 min 24 s",
      }),
      L(28, "workload-management", "Workload Management", {
        contentDir: "ch05/28-workload-management",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792155276/ltv-aws-data-engineering/workload-management.mp4",
        durationLabel: "1 min 26 s",
      }),
      L(29, "redshift-performance-tuning", "Redshift Performance Tuning", {
        contentDir: "ch05/29-redshift-performance-tuning",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792155322/ltv-aws-data-engineering/redshift-performance-tuning.mp4",
        durationLabel: "1 min 28 s",
      }),
    ],
  },
  {
    n: 6,
    title: "Lambda for Data Engineering",
    lessons: [
      L(30, "lambda-fundamentals", "Lambda Fundamentals", {
        contentDir: "ch06/30-lambda-fundamentals",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792155370/ltv-aws-data-engineering/lambda-fundamentals.mp4",
        durationLabel: "1 min 33 s",
      }),
      L(31, "event-driven-data-processing", "Event-Driven Data Processing", {
        contentDir: "ch06/31-event-driven-data-processing",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792155417/ltv-aws-data-engineering/event-driven-data-processing.mp4",
        durationLabel: "1 min 28 s",
      }),
      L(32, "lambda-and-s3-triggers", "Lambda + S3 Triggers", {
        contentDir: "ch06/32-lambda-and-s3-triggers",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792155461/ltv-aws-data-engineering/lambda-and-s3-triggers.mp4",
        durationLabel: "1 min 22 s",
      }),
      L(33, "lambda-limitations-for-data-workloads", "Lambda's Limitations for Data Workloads", {
        contentDir: "ch06/33-lambda-limitations-for-data-workloads",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792155507/ltv-aws-data-engineering/lambda-limitations-for-data-workloads.mp4",
        durationLabel: "1 min 28 s",
      }),
      L(34, "lambda-and-step-functions", "Lambda + Step Functions", {
        contentDir: "ch06/34-lambda-and-step-functions",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792155548/ltv-aws-data-engineering/lambda-and-step-functions.mp4",
        durationLabel: "1 min 12 s",
      }),
    ],
  },
  {
    n: 7,
    title: "Step Functions — Orchestration",
    lessons: [
      L(35, "step-functions-fundamentals", "Step Functions Fundamentals", {
        contentDir: "ch07/35-step-functions-fundamentals",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792155603/ltv-aws-data-engineering/step-functions-fundamentals.mp4",
        durationLabel: "1 min 44 s",
      }),
      L(36, "building-a-state-machine", "Building a State Machine", {
        contentDir: "ch07/36-building-a-state-machine",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792155658/ltv-aws-data-engineering/building-a-state-machine.mp4",
        durationLabel: "1 min 46 s",
      }),
      L(37, "error-handling-in-step-functions", "Error Handling in Step Functions", {
        contentDir: "ch07/37-error-handling-in-step-functions",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792155709/ltv-aws-data-engineering/error-handling-in-step-functions.mp4",
        durationLabel: "1 min 34 s",
      }),
      L(38, "orchestrating-glue-and-lambda", "Orchestrating Glue & Lambda", {
        contentDir: "ch07/38-orchestrating-glue-and-lambda",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792155763/ltv-aws-data-engineering/orchestrating-glue-and-lambda.mp4",
        durationLabel: "1 min 37 s",
      }),
    ],
  },
  {
    n: 8,
    title: "DMS — Database Migration Service",
    lessons: [
      L(39, "dms-fundamentals", "DMS Fundamentals", {
        contentDir: "ch08/39-dms-fundamentals",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792155816/ltv-aws-data-engineering/dms-fundamentals.mp4",
        durationLabel: "1 min 41 s",
      }),
      L(40, "migrating-a-database-with-dms", "Migrating a Database With DMS", {
        contentDir: "ch08/40-migrating-a-database-with-dms",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792155868/ltv-aws-data-engineering/migrating-a-database-with-dms.mp4",
        durationLabel: "1 min 41 s",
      }),
      L(41, "cdc-with-dms", "CDC With DMS", {
        contentDir: "ch08/41-cdc-with-dms",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792155920/ltv-aws-data-engineering/cdc-with-dms.mp4",
        durationLabel: "1 min 43 s",
      }),
      L(42, "dms-troubleshooting", "DMS Troubleshooting", {
        contentDir: "ch08/42-dms-troubleshooting",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792155976/ltv-aws-data-engineering/dms-troubleshooting.mp4",
        durationLabel: "1 min 48 s",
      }),
    ],
  },
  {
    n: 9,
    title: "EMR — Big Data Processing",
    lessons: [
      L(43, "emr-fundamentals", "EMR Fundamentals", {
        contentDir: "ch09/43-emr-fundamentals",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792156025/ltv-aws-data-engineering/emr-fundamentals.mp4",
        durationLabel: "1 min 36 s",
      }),
      L(44, "emr-vs-glue-vs-databricks", "EMR vs. Glue vs. Databricks", {
        contentDir: "ch09/44-emr-vs-glue-vs-databricks",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792156078/ltv-aws-data-engineering/emr-vs-glue-vs-databricks.mp4",
        durationLabel: "1 min 40 s",
      }),
      L(45, "running-spark-on-emr", "Running Spark on EMR", {
        contentDir: "ch09/45-running-spark-on-emr",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792156126/ltv-aws-data-engineering/running-spark-on-emr.mp4",
        durationLabel: "1 min 27 s",
      }),
      L(46, "emr-cluster-configuration", "EMR Cluster Configuration", {
        contentDir: "ch09/46-emr-cluster-configuration",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792156179/ltv-aws-data-engineering/emr-cluster-configuration.mp4",
        durationLabel: "1 min 43 s",
      }),
      L(47, "emr-cost-optimization", "EMR Cost Optimization", {
        contentDir: "ch09/47-emr-cost-optimization",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792156226/ltv-aws-data-engineering/emr-cost-optimization.mp4",
        durationLabel: "1 min 31 s",
      }),
    ],
  },
  {
    n: 10,
    title: "Kinesis — Real-Time Streaming",
    lessons: [
      L(48, "kinesis-data-streams", "Kinesis Data Streams", {
        contentDir: "ch10/48-kinesis-data-streams",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792156268/ltv-aws-data-engineering/kinesis-data-streams.mp4",
        durationLabel: "1 min 21 s",
      }),
      L(49, "kinesis-data-firehose", "Kinesis Data Firehose", {
        contentDir: "ch10/49-kinesis-data-firehose",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792156308/ltv-aws-data-engineering/kinesis-data-firehose.mp4",
        durationLabel: "1 min 16 s",
      }),
      L(50, "kinesis-data-analytics", "Kinesis Data Analytics", {
        contentDir: "ch10/50-kinesis-data-analytics",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792156350/ltv-aws-data-engineering/kinesis-data-analytics.mp4",
        durationLabel: "1 min 19 s",
      }),
      L(51, "kinesis-vs-eventstreams-and-kafka", "Kinesis vs. Fabric Eventstreams & Kafka", {
        contentDir: "ch10/51-kinesis-vs-eventstreams-and-kafka",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792156399/ltv-aws-data-engineering/kinesis-vs-eventstreams-and-kafka.mp4",
        durationLabel: "1 min 36 s",
      }),
      L(52, "a-real-kinesis-pipeline", "A Real Kinesis Streaming Pipeline", {
        contentDir: "ch10/52-a-real-kinesis-pipeline",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792156452/ltv-aws-data-engineering/a-real-kinesis-pipeline.mp4",
        durationLabel: "1 min 43 s",
      }),
    ],
  },
  {
    n: 11,
    title: "CloudWatch — Monitoring AWS Pipelines",
    lessons: [
      L(53, "cloudwatch-fundamentals", "CloudWatch Fundamentals", {
        contentDir: "ch11/53-cloudwatch-fundamentals",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792156495/ltv-aws-data-engineering/cloudwatch-fundamentals.mp4",
        durationLabel: "1 min 21 s",
      }),
      L(54, "cloudwatch-alarms-and-dashboards", "CloudWatch Alarms & Dashboards", {
        contentDir: "ch11/54-cloudwatch-alarms-and-dashboards",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792156536/ltv-aws-data-engineering/cloudwatch-alarms-and-dashboards.mp4",
        durationLabel: "1 min 16 s",
      }),
      L(55, "monitoring-a-pipeline-end-to-end", "Monitoring a Pipeline End to End", {
        contentDir: "ch11/55-monitoring-a-pipeline-end-to-end",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792156600/ltv-aws-data-engineering/monitoring-a-pipeline-end-to-end.mp4",
        durationLabel: "2 min 8 s",
      }),
    ],
  },
  {
    n: 12,
    title: "Modern Lakehouse Patterns on AWS",
    lessons: [
      L(56, "iceberg-and-s3-tables", "Table Formats for a Data Lake: Apache Iceberg via S3 Tables", {
        contentDir: "ch12/56-iceberg-and-s3-tables",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792382549/ltv-aws-data-engineering/iceberg-and-s3-tables.mp4",
        durationLabel: "2 min 39 s",
      }),
      L(57, "lake-formation-fine-grained-permissions", "AWS Lake Formation: Fine-Grained Permissions for the Lake", {
        contentDir: "ch12/57-lake-formation-fine-grained-permissions",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792382665/ltv-aws-data-engineering/lake-formation-fine-grained-permissions.mp4",
        durationLabel: "2 min 30 s",
      }),
      L(58, "glue-data-quality-dqdl", "AWS Glue Data Quality: Defining and Enforcing Data Quality Rules", {
        contentDir: "ch12/58-glue-data-quality-dqdl",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792382785/ltv-aws-data-engineering/glue-data-quality-dqdl.mp4",
        durationLabel: "2 min 51 s",
      }),
    ],
  },
];
