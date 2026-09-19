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
      L(1, "s3-fundamentals", "S3 Fundamentals", {
        contentDir: "ch01/01-s3-fundamentals",
        // videoUrl/durationLabel pending
      }),
      L(2, "buckets-and-objects", "Buckets & Objects", {
        contentDir: "ch01/02-buckets-and-objects",
      }),
      L(3, "storage-classes", "Storage Classes", {
        contentDir: "ch01/03-storage-classes",
      }),
      L(4, "partitioning-strategy-in-s3", "Partitioning Strategy in S3", {
        contentDir: "ch01/04-partitioning-strategy-in-s3",
      }),
      L(5, "s3-event-notifications", "S3 Event Notifications", {
        contentDir: "ch01/05-s3-event-notifications",
      }),
      L(6, "s3-as-a-data-lake-foundation", "S3 as a Data Lake Foundation", {
        contentDir: "ch01/06-s3-as-a-data-lake-foundation",
      }),
    ],
  },
  {
    n: 2,
    title: "IAM for Data Pipelines",
    lessons: [
      L(7, "iam-roles-for-services", "IAM Roles for Services", {
        contentDir: "ch02/07-iam-roles-for-services",
      }),
      L(8, "resource-based-policies", "Resource-Based Policies", {
        contentDir: "ch02/08-resource-based-policies",
      }),
      L(9, "cross-account-access", "Cross-Account Access", {
        contentDir: "ch02/09-cross-account-access",
      }),
      L(10, "iam-best-practices-for-pipelines", "IAM Best Practices for Pipelines", {
        contentDir: "ch02/10-iam-best-practices-for-pipelines",
      }),
    ],
  },
  {
    n: 3,
    title: "AWS Glue & the Glue Catalog",
    lessons: [
      L(11, "glue-architecture", "Glue Architecture", {
        contentDir: "ch03/11-glue-architecture",
      }),
      L(12, "glue-crawlers", "Glue Crawlers", {
        contentDir: "ch03/12-glue-crawlers",
      }),
      L(13, "the-glue-data-catalog", "The Glue Data Catalog", {
        contentDir: "ch03/13-the-glue-data-catalog",
      }),
      L(14, "glue-etl-jobs", "Glue ETL Jobs: Python & Scala Spark", {
        contentDir: "ch03/14-glue-etl-jobs",
      }),
      L(15, "glue-studio", "Glue Studio", {
        contentDir: "ch03/15-glue-studio",
      }),
      L(16, "glue-job-bookmarks", "Glue Job Bookmarks", {
        contentDir: "ch03/16-glue-job-bookmarks",
      }),
      L(17, "glue-triggers-and-workflows", "Glue Triggers & Workflows", {
        contentDir: "ch03/17-glue-triggers-and-workflows",
      }),
    ],
  },
  {
    n: 4,
    title: "Athena — Serverless Querying",
    lessons: [
      L(18, "athena-fundamentals", "Athena Fundamentals", {
        contentDir: "ch04/18-athena-fundamentals",
      }),
      L(19, "querying-s3-data-with-athena", "Querying S3 Data With Athena", {
        contentDir: "ch04/19-querying-s3-data-with-athena",
      }),
      L(20, "athena-and-the-glue-catalog", "Athena + Glue Catalog Integration", {
        contentDir: "ch04/20-athena-and-the-glue-catalog",
      }),
      L(21, "partitioning-for-athena-performance", "Partitioning for Athena Performance", {
        contentDir: "ch04/21-partitioning-for-athena-performance",
      }),
      L(22, "athena-cost-optimization", "Athena Cost Optimization", {
        contentDir: "ch04/22-athena-cost-optimization",
      }),
    ],
  },
  {
    n: 5,
    title: "Redshift — Cloud Data Warehousing",
    lessons: [
      L(23, "redshift-architecture", "Redshift Architecture", {
        contentDir: "ch05/23-redshift-architecture",
      }),
      L(24, "cluster-vs-serverless", "Cluster vs. Serverless", {
        contentDir: "ch05/24-cluster-vs-serverless",
      }),
      L(25, "loading-data-with-copy", "Loading Data Into Redshift: the COPY Command", {
        contentDir: "ch05/25-loading-data-with-copy",
      }),
      L(26, "distribution-and-sort-keys", "Distribution & Sort Keys", {
        contentDir: "ch05/26-distribution-and-sort-keys",
      }),
      L(27, "redshift-spectrum", "Redshift Spectrum", {
        contentDir: "ch05/27-redshift-spectrum",
      }),
      L(28, "workload-management", "Workload Management", {
        contentDir: "ch05/28-workload-management",
      }),
      L(29, "redshift-performance-tuning", "Redshift Performance Tuning", {
        contentDir: "ch05/29-redshift-performance-tuning",
      }),
    ],
  },
  {
    n: 6,
    title: "Lambda for Data Engineering",
    lessons: [
      L(30, "lambda-fundamentals", "Lambda Fundamentals", {
        contentDir: "ch06/30-lambda-fundamentals",
      }),
      L(31, "event-driven-data-processing", "Event-Driven Data Processing", {
        contentDir: "ch06/31-event-driven-data-processing",
      }),
      L(32, "lambda-and-s3-triggers", "Lambda + S3 Triggers", {
        contentDir: "ch06/32-lambda-and-s3-triggers",
      }),
      L(33, "lambda-limitations-for-data-workloads", "Lambda's Limitations for Data Workloads", {
        contentDir: "ch06/33-lambda-limitations-for-data-workloads",
      }),
      L(34, "lambda-and-step-functions", "Lambda + Step Functions", {
        contentDir: "ch06/34-lambda-and-step-functions",
      }),
    ],
  },
  {
    n: 7,
    title: "Step Functions — Orchestration",
    lessons: [
      L(35, "step-functions-fundamentals", "Step Functions Fundamentals", {
        contentDir: "ch07/35-step-functions-fundamentals",
      }),
      L(36, "building-a-state-machine", "Building a State Machine", {
        contentDir: "ch07/36-building-a-state-machine",
      }),
      L(37, "error-handling-in-step-functions", "Error Handling in Step Functions", {
        contentDir: "ch07/37-error-handling-in-step-functions",
      }),
      L(38, "orchestrating-glue-and-lambda", "Orchestrating Glue & Lambda", {
        contentDir: "ch07/38-orchestrating-glue-and-lambda",
      }),
    ],
  },
  {
    n: 8,
    title: "DMS — Database Migration Service",
    lessons: [
      L(39, "dms-fundamentals", "DMS Fundamentals", {
        contentDir: "ch08/39-dms-fundamentals",
      }),
      L(40, "migrating-a-database-with-dms", "Migrating a Database With DMS", {
        contentDir: "ch08/40-migrating-a-database-with-dms",
      }),
      L(41, "cdc-with-dms", "CDC With DMS", {
        contentDir: "ch08/41-cdc-with-dms",
      }),
      L(42, "dms-troubleshooting", "DMS Troubleshooting", {
        contentDir: "ch08/42-dms-troubleshooting",
      }),
    ],
  },
  {
    n: 9,
    title: "EMR — Big Data Processing",
    lessons: [
      L(43, "emr-fundamentals", "EMR Fundamentals", {
        contentDir: "ch09/43-emr-fundamentals",
      }),
      L(44, "emr-vs-glue-vs-databricks", "EMR vs. Glue vs. Databricks", {
        contentDir: "ch09/44-emr-vs-glue-vs-databricks",
      }),
      L(45, "running-spark-on-emr", "Running Spark on EMR", {
        contentDir: "ch09/45-running-spark-on-emr",
      }),
      L(46, "emr-cluster-configuration", "EMR Cluster Configuration", {
        contentDir: "ch09/46-emr-cluster-configuration",
      }),
      L(47, "emr-cost-optimization", "EMR Cost Optimization", {
        contentDir: "ch09/47-emr-cost-optimization",
      }),
    ],
  },
  {
    n: 10,
    title: "Kinesis — Real-Time Streaming",
    lessons: [
      L(48, "kinesis-data-streams", "Kinesis Data Streams", {
        contentDir: "ch10/48-kinesis-data-streams",
      }),
      L(49, "kinesis-data-firehose", "Kinesis Data Firehose", {
        contentDir: "ch10/49-kinesis-data-firehose",
      }),
      L(50, "kinesis-data-analytics", "Kinesis Data Analytics", {
        contentDir: "ch10/50-kinesis-data-analytics",
      }),
      L(51, "kinesis-vs-eventstreams-and-kafka", "Kinesis vs. Fabric Eventstreams & Kafka", {
        contentDir: "ch10/51-kinesis-vs-eventstreams-and-kafka",
      }),
      L(52, "a-real-kinesis-pipeline", "A Real Kinesis Streaming Pipeline", {
        contentDir: "ch10/52-a-real-kinesis-pipeline",
      }),
    ],
  },
  {
    n: 11,
    title: "CloudWatch — Monitoring AWS Pipelines",
    lessons: [
      L(53, "cloudwatch-fundamentals", "CloudWatch Fundamentals", {
        contentDir: "ch11/53-cloudwatch-fundamentals",
      }),
      L(54, "cloudwatch-alarms-and-dashboards", "CloudWatch Alarms & Dashboards", {
        contentDir: "ch11/54-cloudwatch-alarms-and-dashboards",
      }),
      L(55, "monitoring-a-pipeline-end-to-end", "Monitoring a Pipeline End to End", {
        contentDir: "ch11/55-monitoring-a-pipeline-end-to-end",
      }),
    ],
  },
];
