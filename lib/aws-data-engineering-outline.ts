// The full AWS Data Engineering course outline. Only lessons with a
// contentDir + videoUrl are playable; everything else renders as "in
// production". Assumes AWS Fundamentals for Data Engineers and the SQL/
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
      L(1, "s3-fundamentals", "S3 Fundamentals"),
      L(2, "buckets-and-objects", "Buckets & Objects"),
      L(3, "storage-classes", "Storage Classes"),
      L(4, "partitioning-strategy-in-s3", "Partitioning Strategy in S3"),
      L(5, "s3-event-notifications", "S3 Event Notifications"),
      L(6, "s3-as-a-data-lake-foundation", "S3 as a Data Lake Foundation"),
    ],
  },
  {
    n: 2,
    title: "IAM for Data Pipelines",
    lessons: [
      L(7, "iam-roles-for-services", "IAM Roles for Services"),
      L(8, "resource-based-policies", "Resource-Based Policies"),
      L(9, "cross-account-access", "Cross-Account Access"),
      L(10, "iam-best-practices-for-pipelines", "IAM Best Practices for Pipelines"),
    ],
  },
  {
    n: 3,
    title: "AWS Glue & the Glue Catalog",
    lessons: [
      L(11, "glue-architecture", "Glue Architecture"),
      L(12, "glue-crawlers", "Glue Crawlers"),
      L(13, "the-glue-data-catalog", "The Glue Data Catalog"),
      L(14, "glue-etl-jobs", "Glue ETL Jobs: Python & Scala Spark"),
      L(15, "glue-studio", "Glue Studio"),
      L(16, "glue-job-bookmarks", "Glue Job Bookmarks"),
      L(17, "glue-triggers-and-workflows", "Glue Triggers & Workflows"),
    ],
  },
  {
    n: 4,
    title: "Athena — Serverless Querying",
    lessons: [
      L(18, "athena-fundamentals", "Athena Fundamentals"),
      L(19, "querying-s3-data-with-athena", "Querying S3 Data With Athena"),
      L(20, "athena-and-the-glue-catalog", "Athena + Glue Catalog Integration"),
      L(21, "partitioning-for-athena-performance", "Partitioning for Athena Performance"),
      L(22, "athena-cost-optimization", "Athena Cost Optimization"),
    ],
  },
  {
    n: 5,
    title: "Redshift — Cloud Data Warehousing",
    lessons: [
      L(23, "redshift-architecture", "Redshift Architecture"),
      L(24, "cluster-vs-serverless", "Cluster vs. Serverless"),
      L(25, "loading-data-with-copy", "Loading Data Into Redshift: the COPY Command"),
      L(26, "distribution-and-sort-keys", "Distribution & Sort Keys"),
      L(27, "redshift-spectrum", "Redshift Spectrum"),
      L(28, "workload-management", "Workload Management"),
      L(29, "redshift-performance-tuning", "Redshift Performance Tuning"),
    ],
  },
  {
    n: 6,
    title: "Lambda for Data Engineering",
    lessons: [
      L(30, "lambda-fundamentals", "Lambda Fundamentals"),
      L(31, "event-driven-data-processing", "Event-Driven Data Processing"),
      L(32, "lambda-and-s3-triggers", "Lambda + S3 Triggers"),
      L(33, "lambda-limitations-for-data-workloads", "Lambda's Limitations for Data Workloads"),
      L(34, "lambda-and-step-functions", "Lambda + Step Functions"),
    ],
  },
  {
    n: 7,
    title: "Step Functions — Orchestration",
    lessons: [
      L(35, "step-functions-fundamentals", "Step Functions Fundamentals"),
      L(36, "building-a-state-machine", "Building a State Machine"),
      L(37, "error-handling-in-step-functions", "Error Handling in Step Functions"),
      L(38, "orchestrating-glue-and-lambda", "Orchestrating Glue & Lambda"),
    ],
  },
  {
    n: 8,
    title: "DMS — Database Migration Service",
    lessons: [
      L(39, "dms-fundamentals", "DMS Fundamentals"),
      L(40, "migrating-a-database-with-dms", "Migrating a Database With DMS"),
      L(41, "cdc-with-dms", "CDC With DMS"),
      L(42, "dms-troubleshooting", "DMS Troubleshooting"),
    ],
  },
  {
    n: 9,
    title: "EMR — Big Data Processing",
    lessons: [
      L(43, "emr-fundamentals", "EMR Fundamentals"),
      L(44, "emr-vs-glue-vs-databricks", "EMR vs. Glue vs. Databricks"),
      L(45, "running-spark-on-emr", "Running Spark on EMR"),
      L(46, "emr-cluster-configuration", "EMR Cluster Configuration"),
      L(47, "emr-cost-optimization", "EMR Cost Optimization"),
    ],
  },
  {
    n: 10,
    title: "Kinesis — Real-Time Streaming",
    lessons: [
      L(48, "kinesis-data-streams", "Kinesis Data Streams"),
      L(49, "kinesis-data-firehose", "Kinesis Data Firehose"),
      L(50, "kinesis-data-analytics", "Kinesis Data Analytics"),
      L(51, "kinesis-vs-eventstreams-and-kafka", "Kinesis vs. Fabric Eventstreams & Kafka"),
      L(52, "a-real-kinesis-pipeline", "A Real Kinesis Streaming Pipeline"),
    ],
  },
  {
    n: 11,
    title: "CloudWatch — Monitoring AWS Pipelines",
    lessons: [
      L(53, "cloudwatch-fundamentals", "CloudWatch Fundamentals"),
      L(54, "cloudwatch-alarms-and-dashboards", "CloudWatch Alarms & Dashboards"),
      L(55, "monitoring-a-pipeline-end-to-end", "Monitoring a Pipeline End to End"),
    ],
  },
];
