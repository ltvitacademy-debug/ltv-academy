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
      L(1, "oltp-vs-olap-revisited", "OLTP vs. OLAP, Revisited", { contentDir: "ch01/01-oltp-vs-olap-revisited", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/oltp-vs-olap-revisited.mp4", durationLabel: "1 min 30 s" }),
      L(2, "what-is-dimensional-modeling", "What Is Dimensional Modeling?", { contentDir: "ch01/02-what-is-dimensional-modeling", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/what-is-dimensional-modeling.mp4", durationLabel: "1 min 39 s" }),
      L(3, "star-schema-vs-snowflake-schema", "Star Schema vs. Snowflake Schema", { contentDir: "ch01/03-star-schema-vs-snowflake-schema", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/star-schema-vs-snowflake-schema.mp4", durationLabel: "1 min 58 s" }),
      L(4, "choosing-the-grain", "Choosing the Grain", { contentDir: "ch01/04-choosing-the-grain", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/choosing-the-grain.mp4", durationLabel: "1 min 49 s" }),
      L(5, "business-process-modeling", "Business Process Modeling", { contentDir: "ch01/05-business-process-modeling", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/business-process-modeling.mp4", durationLabel: "1 min 25 s" }),
    ],
  },
  {
    n: 2,
    title: "Fact Tables",
    lessons: [
      L(6, "fact-table-types", "Fact Table Types", { contentDir: "ch02/06-fact-table-types", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/fact-table-types.mp4", durationLabel: "1 min 33 s" }),
      L(7, "transaction-facts", "Transaction Facts", { contentDir: "ch02/07-transaction-facts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/transaction-facts.mp4", durationLabel: "1 min 20 s" }),
      L(8, "periodic-snapshot-facts", "Periodic Snapshot Facts", { contentDir: "ch02/08-periodic-snapshot-facts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/periodic-snapshot-facts.mp4", durationLabel: "1 min 22 s" }),
      L(9, "accumulating-snapshot-facts", "Accumulating Snapshot Facts", { contentDir: "ch02/09-accumulating-snapshot-facts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/accumulating-snapshot-facts.mp4", durationLabel: "1 min 21 s" }),
      L(10, "factless-fact-tables", "Factless Fact Tables", { contentDir: "ch02/10-factless-fact-tables", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/factless-fact-tables.mp4", durationLabel: "1 min 29 s" }),
    ],
  },
  {
    n: 3,
    title: "Dimension Tables",
    lessons: [
      L(11, "dimension-table-design", "Dimension Table Design", { contentDir: "ch03/11-dimension-table-design", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/dimension-table-design.mp4", durationLabel: "1 min 16 s" }),
      L(12, "surrogate-keys", "Surrogate Keys", { contentDir: "ch03/12-surrogate-keys", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/surrogate-keys.mp4", durationLabel: "1 min 12 s" }),
      L(13, "natural-vs-surrogate-keys", "Natural vs. Surrogate Keys", { contentDir: "ch03/13-natural-vs-surrogate-keys", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/natural-vs-surrogate-keys.mp4", durationLabel: "1 min 7 s" }),
      L(14, "degenerate-dimensions", "Degenerate Dimensions", { contentDir: "ch03/14-degenerate-dimensions", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/degenerate-dimensions.mp4", durationLabel: "1 min 9 s" }),
      L(15, "conformed-dimensions", "Conformed Dimensions", { contentDir: "ch03/15-conformed-dimensions", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/conformed-dimensions.mp4", durationLabel: "1 min 15 s" }),
    ],
  },
  {
    n: 4,
    title: "Slowly Changing Dimensions",
    lessons: [
      L(16, "scd-type-0", "SCD Type 0", { contentDir: "ch04/16-scd-type-0", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/scd-type-0.mp4", durationLabel: "1 min 17 s" }),
      L(17, "scd-type-1", "SCD Type 1", { contentDir: "ch04/17-scd-type-1", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/scd-type-1.mp4", durationLabel: "1 min 25 s" }),
      L(18, "scd-type-2", "SCD Type 2", { contentDir: "ch04/18-scd-type-2", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/scd-type-2.mp4", durationLabel: "1 min 37 s" }),
      L(19, "scd-type-3", "SCD Type 3", { contentDir: "ch04/19-scd-type-3", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/scd-type-3.mp4", durationLabel: "1 min 18 s" }),
      L(20, "hybrid-scd-patterns", "Hybrid SCD Patterns", { contentDir: "ch04/20-hybrid-scd-patterns", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/hybrid-scd-patterns.mp4", durationLabel: "1 min 18 s" }),
    ],
  },
  {
    n: 5,
    title: "Staging & ETL Design",
    lessons: [
      L(21, "the-staging-layers-purpose", "The Staging Layer's Purpose", { contentDir: "ch05/21-the-staging-layers-purpose", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/the-staging-layers-purpose.mp4", durationLabel: "1 min 34 s" }),
      L(22, "staging-table-design", "Staging Table Design", { contentDir: "ch05/22-staging-table-design", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/staging-table-design.mp4", durationLabel: "1 min 26 s" }),
      L(23, "load-patterns-full-vs-incremental", "Load Patterns: Full vs. Incremental", { contentDir: "ch05/23-load-patterns-full-vs-incremental", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/load-patterns-full-vs-incremental.mp4", durationLabel: "1 min 28 s" }),
      L(24, "data-quality-in-staging", "Data Quality in Staging", { contentDir: "ch05/24-data-quality-in-staging", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/data-quality-in-staging.mp4", durationLabel: "1 min 18 s" }),
      L(25, "auditing-and-lineage-columns", "Auditing & Lineage Columns", { contentDir: "ch05/25-auditing-and-lineage-columns", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/auditing-and-lineage-columns.mp4", durationLabel: "1 min 17 s" }),
    ],
  },
  {
    n: 6,
    title: "Advanced Warehouse Patterns",
    lessons: [
      L(26, "junk-dimensions", "Junk Dimensions", { contentDir: "ch06/26-junk-dimensions", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/junk-dimensions.mp4", durationLabel: "1 min 53 s" }),
      L(27, "role-playing-dimensions", "Role-Playing Dimensions", { contentDir: "ch06/27-role-playing-dimensions", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/role-playing-dimensions.mp4", durationLabel: "1 min 57 s" }),
      L(28, "bridge-tables-for-many-to-many", "Bridge Tables for Many-to-Many Relationships", { contentDir: "ch06/28-bridge-tables-for-many-to-many", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/bridge-tables-for-many-to-many.mp4", durationLabel: "1 min 46 s" }),
      L(29, "late-arriving-dimensions", "Late-Arriving Dimensions", { contentDir: "ch06/29-late-arriving-dimensions", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/late-arriving-dimensions.mp4", durationLabel: "1 min 47 s" }),
      L(30, "aggregate-tables", "Aggregate Tables", { contentDir: "ch06/30-aggregate-tables", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/aggregate-tables.mp4", durationLabel: "1 min 39 s" }),
    ],
  },
  {
    n: 7,
    title: "Building the Warehouse",
    lessons: [
      L(31, "physical-warehouse-design", "Physical Warehouse Design", { contentDir: "ch07/31-physical-warehouse-design", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/physical-warehouse-design.mp4", durationLabel: "1 min 26 s" }),
      L(32, "indexing-a-warehouse", "Indexing a Warehouse", { contentDir: "ch07/32-indexing-a-warehouse", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/indexing-a-warehouse.mp4", durationLabel: "1 min 16 s" }),
      L(33, "partitioning-large-fact-tables", "Partitioning Large Fact Tables", { contentDir: "ch07/33-partitioning-large-fact-tables", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/partitioning-large-fact-tables.mp4", durationLabel: "1 min 29 s" }),
      L(34, "warehouse-naming-conventions", "Warehouse Naming Conventions", { contentDir: "ch07/34-warehouse-naming-conventions", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/warehouse-naming-conventions.mp4", durationLabel: "1 min 17 s" }),
      L(35, "documenting-the-model", "Documenting the Model", { contentDir: "ch07/35-documenting-the-model", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/documenting-the-model.mp4", durationLabel: "1 min 20 s" }),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(36, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch08/36-capstone-kickoff", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/capstone-kickoff.mp4", durationLabel: "1 min 53 s" }),
      L(37, "capstone-modeling-a-real-business-process", "Capstone: Modeling a Real Business Process", { contentDir: "ch08/37-capstone-modeling-a-real-business-process", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/capstone-modeling-a-real-business-process.mp4", durationLabel: "1 min 50 s" }),
      L(38, "capstone-building-the-physical-schema", "Capstone: Building the Physical Schema", { contentDir: "ch08/38-capstone-building-the-physical-schema", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/capstone-building-the-physical-schema.mp4", durationLabel: "1 min 51 s" }),
      L(39, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch08/39-capstone-wrap-up", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-warehousing/capstone-wrap-up.mp4", durationLabel: "1 min 57 s" }),
    ],
  },
];
