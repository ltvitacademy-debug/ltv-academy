// The full Data Modeling & Data Warehousing course outline. Only lessons
// with a contentDir + videoUrl are playable; everything else renders as
// "in production". Assumes T-SQL Development — this course teaches
// dimensional modeling and warehouse design as their own discipline: star
// schemas, facts, dimensions, grain, surrogate keys, SCDs, and staging.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/data-warehousing/
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

export const DATA_WAREHOUSING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Dimensional Modeling Fundamentals",
    lessons: [
      L(1, "oltp-vs-olap-revisited", "OLTP vs. OLAP, Revisited", { contentDir: "ch01/01-oltp-vs-olap-revisited" }),
      L(2, "what-is-dimensional-modeling", "What Is Dimensional Modeling?", { contentDir: "ch01/02-what-is-dimensional-modeling" }),
      L(3, "star-schema-vs-snowflake-schema", "Star Schema vs. Snowflake Schema", { contentDir: "ch01/03-star-schema-vs-snowflake-schema" }),
      L(4, "choosing-the-grain", "Choosing the Grain", { contentDir: "ch01/04-choosing-the-grain" }),
      L(5, "business-process-modeling", "Business Process Modeling", { contentDir: "ch01/05-business-process-modeling" }),
    ],
  },
  {
    n: 2,
    title: "Fact Tables",
    lessons: [
      L(6, "fact-table-types", "Fact Table Types", { contentDir: "ch02/06-fact-table-types" }),
      L(7, "transaction-facts", "Transaction Facts", { contentDir: "ch02/07-transaction-facts" }),
      L(8, "periodic-snapshot-facts", "Periodic Snapshot Facts", { contentDir: "ch02/08-periodic-snapshot-facts" }),
      L(9, "accumulating-snapshot-facts", "Accumulating Snapshot Facts", { contentDir: "ch02/09-accumulating-snapshot-facts" }),
      L(10, "factless-fact-tables", "Factless Fact Tables", { contentDir: "ch02/10-factless-fact-tables" }),
    ],
  },
  {
    n: 3,
    title: "Dimension Tables",
    lessons: [
      L(11, "dimension-table-design", "Dimension Table Design", { contentDir: "ch03/11-dimension-table-design" }),
      L(12, "surrogate-keys", "Surrogate Keys", { contentDir: "ch03/12-surrogate-keys" }),
      L(13, "natural-vs-surrogate-keys", "Natural vs. Surrogate Keys", { contentDir: "ch03/13-natural-vs-surrogate-keys" }),
      L(14, "degenerate-dimensions", "Degenerate Dimensions", { contentDir: "ch03/14-degenerate-dimensions" }),
      L(15, "conformed-dimensions", "Conformed Dimensions", { contentDir: "ch03/15-conformed-dimensions" }),
    ],
  },
  {
    n: 4,
    title: "Slowly Changing Dimensions",
    lessons: [
      L(16, "scd-type-0", "SCD Type 0", { contentDir: "ch04/16-scd-type-0" }),
      L(17, "scd-type-1", "SCD Type 1", { contentDir: "ch04/17-scd-type-1" }),
      L(18, "scd-type-2", "SCD Type 2", { contentDir: "ch04/18-scd-type-2" }),
      L(19, "scd-type-3", "SCD Type 3", { contentDir: "ch04/19-scd-type-3" }),
      L(20, "hybrid-scd-patterns", "Hybrid SCD Patterns", { contentDir: "ch04/20-hybrid-scd-patterns" }),
    ],
  },
  {
    n: 5,
    title: "Staging & ETL Design",
    lessons: [
      L(21, "the-staging-layers-purpose", "The Staging Layer's Purpose", { contentDir: "ch05/21-the-staging-layers-purpose" }),
      L(22, "staging-table-design", "Staging Table Design", { contentDir: "ch05/22-staging-table-design" }),
      L(23, "load-patterns-full-vs-incremental", "Load Patterns: Full vs. Incremental", { contentDir: "ch05/23-load-patterns-full-vs-incremental" }),
      L(24, "data-quality-in-staging", "Data Quality in Staging", { contentDir: "ch05/24-data-quality-in-staging" }),
      L(25, "auditing-and-lineage-columns", "Auditing & Lineage Columns", { contentDir: "ch05/25-auditing-and-lineage-columns" }),
    ],
  },
  {
    n: 6,
    title: "Advanced Warehouse Patterns",
    lessons: [
      L(26, "junk-dimensions", "Junk Dimensions", { contentDir: "ch06/26-junk-dimensions" }),
      L(27, "role-playing-dimensions", "Role-Playing Dimensions", { contentDir: "ch06/27-role-playing-dimensions" }),
      L(28, "bridge-tables-for-many-to-many", "Bridge Tables for Many-to-Many Relationships", { contentDir: "ch06/28-bridge-tables-for-many-to-many" }),
      L(29, "late-arriving-dimensions", "Late-Arriving Dimensions", { contentDir: "ch06/29-late-arriving-dimensions" }),
      L(30, "aggregate-tables", "Aggregate Tables", { contentDir: "ch06/30-aggregate-tables" }),
    ],
  },
  {
    n: 7,
    title: "Building the Warehouse",
    lessons: [
      L(31, "physical-warehouse-design", "Physical Warehouse Design", { contentDir: "ch07/31-physical-warehouse-design" }),
      L(32, "indexing-a-warehouse", "Indexing a Warehouse", { contentDir: "ch07/32-indexing-a-warehouse" }),
      L(33, "partitioning-large-fact-tables", "Partitioning Large Fact Tables", { contentDir: "ch07/33-partitioning-large-fact-tables" }),
      L(34, "warehouse-naming-conventions", "Warehouse Naming Conventions", { contentDir: "ch07/34-warehouse-naming-conventions" }),
      L(35, "documenting-the-model", "Documenting the Model", { contentDir: "ch07/35-documenting-the-model" }),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(36, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch08/36-capstone-kickoff" }),
      L(37, "capstone-modeling-a-real-business-process", "Capstone: Modeling a Real Business Process", { contentDir: "ch08/37-capstone-modeling-a-real-business-process" }),
      L(38, "capstone-building-the-physical-schema", "Capstone: Building the Physical Schema", { contentDir: "ch08/38-capstone-building-the-physical-schema" }),
      L(39, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch08/39-capstone-wrap-up" }),
    ],
  },
];
