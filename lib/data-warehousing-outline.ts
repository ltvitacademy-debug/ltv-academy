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
      L(1, "oltp-vs-olap-revisited", "OLTP vs. OLAP, Revisited"),
      L(2, "what-is-dimensional-modeling", "What Is Dimensional Modeling?"),
      L(3, "star-schema-vs-snowflake-schema", "Star Schema vs. Snowflake Schema"),
      L(4, "choosing-the-grain", "Choosing the Grain"),
      L(5, "business-process-modeling", "Business Process Modeling"),
    ],
  },
  {
    n: 2,
    title: "Fact Tables",
    lessons: [
      L(6, "fact-table-types", "Fact Table Types"),
      L(7, "transaction-facts", "Transaction Facts"),
      L(8, "periodic-snapshot-facts", "Periodic Snapshot Facts"),
      L(9, "accumulating-snapshot-facts", "Accumulating Snapshot Facts"),
      L(10, "factless-fact-tables", "Factless Fact Tables"),
    ],
  },
  {
    n: 3,
    title: "Dimension Tables",
    lessons: [
      L(11, "dimension-table-design", "Dimension Table Design"),
      L(12, "surrogate-keys", "Surrogate Keys"),
      L(13, "natural-vs-surrogate-keys", "Natural vs. Surrogate Keys"),
      L(14, "degenerate-dimensions", "Degenerate Dimensions"),
      L(15, "conformed-dimensions", "Conformed Dimensions"),
    ],
  },
  {
    n: 4,
    title: "Slowly Changing Dimensions",
    lessons: [
      L(16, "scd-type-0", "SCD Type 0"),
      L(17, "scd-type-1", "SCD Type 1"),
      L(18, "scd-type-2", "SCD Type 2"),
      L(19, "scd-type-3", "SCD Type 3"),
      L(20, "hybrid-scd-patterns", "Hybrid SCD Patterns"),
    ],
  },
  {
    n: 5,
    title: "Staging & ETL Design",
    lessons: [
      L(21, "the-staging-layers-purpose", "The Staging Layer's Purpose"),
      L(22, "staging-table-design", "Staging Table Design"),
      L(23, "load-patterns-full-vs-incremental", "Load Patterns: Full vs. Incremental"),
      L(24, "data-quality-in-staging", "Data Quality in Staging"),
      L(25, "auditing-and-lineage-columns", "Auditing & Lineage Columns"),
    ],
  },
  {
    n: 6,
    title: "Advanced Warehouse Patterns",
    lessons: [
      L(26, "junk-dimensions", "Junk Dimensions"),
      L(27, "role-playing-dimensions", "Role-Playing Dimensions"),
      L(28, "bridge-tables-for-many-to-many", "Bridge Tables for Many-to-Many Relationships"),
      L(29, "late-arriving-dimensions", "Late-Arriving Dimensions"),
      L(30, "aggregate-tables", "Aggregate Tables"),
    ],
  },
  {
    n: 7,
    title: "Building the Warehouse",
    lessons: [
      L(31, "physical-warehouse-design", "Physical Warehouse Design"),
      L(32, "indexing-a-warehouse", "Indexing a Warehouse"),
      L(33, "partitioning-large-fact-tables", "Partitioning Large Fact Tables"),
      L(34, "warehouse-naming-conventions", "Warehouse Naming Conventions"),
      L(35, "documenting-the-model", "Documenting the Model"),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(36, "capstone-kickoff", "Capstone Kickoff"),
      L(37, "capstone-modeling-a-real-business-process", "Capstone: Modeling a Real Business Process"),
      L(38, "capstone-building-the-physical-schema", "Capstone: Building the Physical Schema"),
      L(39, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
