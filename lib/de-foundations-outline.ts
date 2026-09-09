// The full Data Engineering Foundations course outline. Only lessons with a
// contentDir + videoUrl are playable; everything else renders as "in production".
// First of a 4-course Data Engineering track: Foundations -> Azure Databricks &
// Delta Lake -> Microsoft Fabric & Real-Time Analytics -> Career & Capstone.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/de-foundations/
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

export const DE_FOUNDATIONS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Azure Data Lake & Storage",
    lessons: [
      L(1, "azure-storage-accounts", "Azure Storage Accounts", {
        contentDir: "ch01/01-azure-storage-accounts",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788957977/ltv-de-foundations/ch01-01-azure-storage-accounts.mp4",
        durationLabel: "1 min 56 s",
      }),
      L(2, "blob-vs-adls-gen2", "Blob Storage vs. ADLS Gen2", {
        contentDir: "ch01/02-blob-vs-adls-gen2",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788958216/ltv-de-foundations/ch01-02-blob-vs-adls-gen2.mp4",
        durationLabel: "1 min 59 s",
      }),
      L(3, "containers-and-directories", "Containers and Directories", {
        contentDir: "ch01/03-containers-and-directories",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788958468/ltv-de-foundations/ch01-03-containers-and-directories.mp4",
        durationLabel: "1 min 31 s",
      }),
      L(4, "hierarchical-namespace", "Hierarchical Namespace", {
        contentDir: "ch01/04-hierarchical-namespace",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788958683/ltv-de-foundations/ch01-04-hierarchical-namespace.mp4",
        durationLabel: "1 min 43 s",
      }),
      L(5, "rbac-vs-acls", "RBAC vs. ACLs", {
        contentDir: "ch01/05-rbac-vs-acls",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788958889/ltv-de-foundations/ch01-05-rbac-vs-acls.mp4",
        durationLabel: "1 min 44 s",
      }),
      L(6, "managed-identities-for-storage", "Managed Identities for Storage", {
        contentDir: "ch01/06-managed-identities-for-storage",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788959064/ltv-de-foundations/ch01-06-managed-identities-for-storage.mp4",
        durationLabel: "1 min 32 s",
      }),
      L(7, "sas-tokens", "SAS Tokens", {
        contentDir: "ch01/07-sas-tokens",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788959271/ltv-de-foundations/ch01-07-sas-tokens.mp4",
        durationLabel: "1 min 52 s",
      }),
      L(8, "csv-vs-json-vs-parquet-vs-delta", "CSV vs. JSON vs. Parquet vs. Delta", {
        contentDir: "ch01/08-csv-vs-json-vs-parquet-vs-delta",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788959447/ltv-de-foundations/ch01-08-csv-vs-json-vs-parquet-vs-delta.mp4",
        durationLabel: "2 min 16 s",
      }),
      L(9, "partitioning-data", "Partitioning Data", {
        contentDir: "ch01/09-partitioning-data",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788959622/ltv-de-foundations/ch01-09-partitioning-data.mp4",
        durationLabel: "2 min 12 s",
      }),
      L(10, "designing-a-data-lake", "Designing a Data Lake", {
        contentDir: "ch01/10-designing-a-data-lake",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788959782/ltv-de-foundations/ch01-10-designing-a-data-lake.mp4",
        durationLabel: "1 min 40 s",
      }),
      L(11, "raw-cleansed-curated-zones", "Raw, Cleansed, and Curated Zones", {
        contentDir: "ch01/11-raw-cleansed-curated-zones",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788959969/ltv-de-foundations/ch01-11-raw-cleansed-curated-zones.mp4",
        durationLabel: "1 min 47 s",
      }),
      L(12, "bronze-silver-gold-architecture", "Bronze, Silver, Gold Architecture", {
        contentDir: "ch01/12-bronze-silver-gold-architecture",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788960148/ltv-de-foundations/ch01-12-bronze-silver-gold-architecture.mp4",
        durationLabel: "1 min 53 s",
      }),
    ],
  },
  {
    n: 2,
    title: "Python for Data Engineers",
    lessons: [
      L(13, "python-for-data-engineering", "Python for Data Engineering", {
        contentDir: "ch02/13-python-for-data-engineering",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(14, "variables-and-data-types", "Variables and Data Types", {
        contentDir: "ch02/14-variables-and-data-types",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(15, "lists-and-dictionaries", "Lists and Dictionaries", {
        contentDir: "ch02/15-lists-and-dictionaries",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(16, "conditions", "Conditions", {
        contentDir: "ch02/16-conditions",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(17, "loops", "Loops", {
        contentDir: "ch02/17-loops",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(18, "functions", "Functions", {
        contentDir: "ch02/18-functions",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(19, "exception-handling", "Exception Handling", {
        contentDir: "ch02/19-exception-handling",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(20, "working-with-files", "Working With Files", {
        contentDir: "ch02/20-working-with-files",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(21, "pandas-dataframes", "Pandas DataFrames", {
        contentDir: "ch02/21-pandas-dataframes",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(22, "reading-csv-and-json", "Reading CSV and JSON", {
        contentDir: "ch02/22-reading-csv-and-json",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(23, "rest-apis-with-python", "REST APIs with Python", {
        contentDir: "ch02/23-rest-apis-with-python",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(24, "processing-json", "Processing JSON", {
        contentDir: "ch02/24-processing-json",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(25, "connecting-python-to-sql", "Connecting Python to SQL", {
        contentDir: "ch02/25-connecting-python-to-sql",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(26, "cleaning-data-with-python", "Cleaning Data With Python", {
        contentDir: "ch02/26-cleaning-data-with-python",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(27, "building-a-simple-python-etl-process", "Building a Simple Python ETL Process", {
        contentDir: "ch02/27-building-a-simple-python-etl-process",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
    ],
  },
  {
    n: 3,
    title: "Apache Spark Fundamentals",
    lessons: [
      L(28, "why-apache-spark", "Why Apache Spark?", {
        contentDir: "ch03/28-why-apache-spark",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(29, "distributed-computing", "Distributed Computing", {
        contentDir: "ch03/29-distributed-computing",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(30, "spark-architecture", "Spark Architecture", {
        contentDir: "ch03/30-spark-architecture",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(31, "driver-and-executors", "Driver and Executors", {
        contentDir: "ch03/31-driver-and-executors",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(32, "clusters-and-nodes", "Clusters and Nodes", {
        contentDir: "ch03/32-clusters-and-nodes",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(33, "spark-partitions", "Spark Partitions", {
        contentDir: "ch03/33-spark-partitions",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(34, "lazy-evaluation", "Lazy Evaluation", {
        contentDir: "ch03/34-lazy-evaluation",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(35, "transformations-vs-actions", "Transformations vs. Actions", {
        contentDir: "ch03/35-transformations-vs-actions",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(36, "sparksession", "SparkSession", {
        contentDir: "ch03/36-sparksession",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(37, "spark-dataframes", "Spark DataFrames", {
        contentDir: "ch03/37-spark-dataframes",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(38, "spark-sql", "Spark SQL", {
        contentDir: "ch03/38-spark-sql",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
    ],
  },
  {
    n: 4,
    title: "PySpark",
    lessons: [
      L(39, "creating-dataframes", "Creating DataFrames", {
        contentDir: "ch04/39-creating-dataframes",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(40, "reading-csv", "Reading CSV", {
        contentDir: "ch04/40-reading-csv",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(41, "reading-json", "Reading JSON", {
        contentDir: "ch04/41-reading-json",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(42, "reading-parquet", "Reading Parquet", {
        contentDir: "ch04/42-reading-parquet",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(43, "defining-schemas", "Defining Schemas", {
        contentDir: "ch04/43-defining-schemas",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(44, "select", "select()", {
        contentDir: "ch04/44-select",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(45, "filter-and-where", "filter() and where()", {
        contentDir: "ch04/45-filter-and-where",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(46, "withcolumn", "withColumn()", {
        contentDir: "ch04/46-withcolumn",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(47, "when-and-conditional-logic", "when() and Conditional Logic", {
        contentDir: "ch04/47-when-and-conditional-logic",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(48, "data-type-conversion", "Data Type Conversion", {
        contentDir: "ch04/48-data-type-conversion",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(49, "string-functions", "String Functions", {
        contentDir: "ch04/49-string-functions",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(50, "date-functions", "Date Functions", {
        contentDir: "ch04/50-date-functions",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(51, "null-handling", "Null Handling", {
        contentDir: "ch04/51-null-handling",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(52, "removing-duplicates", "Removing Duplicates", {
        contentDir: "ch04/52-removing-duplicates",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(53, "groupby", "groupBy()", {
        contentDir: "ch04/53-groupby",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(54, "aggregations", "Aggregations", {
        contentDir: "ch04/54-aggregations",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(55, "pyspark-joins", "PySpark Joins", {
        contentDir: "ch04/55-pyspark-joins",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(56, "union", "union()", {
        contentDir: "ch04/56-union",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(57, "window-functions", "Window Functions", {
        contentDir: "ch04/57-window-functions",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(58, "temporary-views", "Temporary Views", {
        contentDir: "ch04/58-temporary-views",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(59, "spark-sql-with-dataframes", "Spark SQL With DataFrames", {
        contentDir: "ch04/59-spark-sql-with-dataframes",
        // videoUrl/durationLabel pending — ElevenLabs renews 2026-09-18
      }),
      L(60, "writing-data", "Writing Data"),
      L(61, "partitioning-output", "Partitioning Output"),
      L(62, "spark-performance-fundamentals", "Spark Performance Fundamentals"),
    ],
  },
];
