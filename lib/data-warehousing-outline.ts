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
      L(1, "oltp-vs-olap-revisited", "OLTP vs. OLAP, Revisited", { contentDir: "ch01/01-oltp-vs-olap-revisited",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789837687/ltv-data-warehousing/ch01-01-oltp-vs-olap-revisited.mp4",
        durationLabel: "1 min 50 s",
      }),
      L(2, "what-is-dimensional-modeling", "What Is Dimensional Modeling?", { contentDir: "ch01/02-what-is-dimensional-modeling",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789837767/ltv-data-warehousing/ch01-02-what-is-dimensional-modeling.mp4",
        durationLabel: "2 min 12 s",
      }),
      L(3, "star-schema-vs-snowflake-schema", "Star Schema vs. Snowflake Schema", { contentDir: "ch01/03-star-schema-vs-snowflake-schema",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789837859/ltv-data-warehousing/ch01-03-star-schema-vs-snowflake-schema.mp4",
        durationLabel: "2 min 27 s",
      }),
      L(4, "choosing-the-grain", "Choosing the Grain", { contentDir: "ch01/04-choosing-the-grain",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789837945/ltv-data-warehousing/ch01-04-choosing-the-grain.mp4",
        durationLabel: "2 min 24 s",
      }),
      L(5, "business-process-modeling", "Business Process Modeling", { contentDir: "ch01/05-business-process-modeling",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789838011/ltv-data-warehousing/ch01-05-business-process-modeling.mp4",
        durationLabel: "1 min 45 s",
      }),
    ],
  },
  {
    n: 2,
    title: "Fact Tables",
    lessons: [
      L(6, "fact-table-types", "Fact Table Types", { contentDir: "ch02/06-fact-table-types",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789838073/ltv-data-warehousing/ch02-06-fact-table-types.mp4",
        durationLabel: "1 min 47 s",
      }),
      L(7, "transaction-facts", "Transaction Facts", { contentDir: "ch02/07-transaction-facts",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789838129/ltv-data-warehousing/ch02-07-transaction-facts.mp4",
        durationLabel: "1 min 40 s",
      }),
      L(8, "periodic-snapshot-facts", "Periodic Snapshot Facts", { contentDir: "ch02/08-periodic-snapshot-facts",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789838190/ltv-data-warehousing/ch02-08-periodic-snapshot-facts.mp4",
        durationLabel: "1 min 47 s",
      }),
      L(9, "accumulating-snapshot-facts", "Accumulating Snapshot Facts", { contentDir: "ch02/09-accumulating-snapshot-facts",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789838245/ltv-data-warehousing/ch02-09-accumulating-snapshot-facts.mp4",
        durationLabel: "1 min 37 s",
      }),
      L(10, "factless-fact-tables", "Factless Fact Tables", { contentDir: "ch02/10-factless-fact-tables",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789838307/ltv-data-warehousing/ch02-10-factless-fact-tables.mp4",
        durationLabel: "1 min 55 s",
      }),
    ],
  },
  {
    n: 3,
    title: "Dimension Tables",
    lessons: [
      L(11, "dimension-table-design", "Dimension Table Design", { contentDir: "ch03/11-dimension-table-design",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789838368/ltv-data-warehousing/ch03-11-dimension-table-design.mp4",
        durationLabel: "1 min 40 s",
      }),
      L(12, "surrogate-keys", "Surrogate Keys", { contentDir: "ch03/12-surrogate-keys",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789838420/ltv-data-warehousing/ch03-12-surrogate-keys.mp4",
        durationLabel: "1 min 31 s",
      }),
      L(13, "natural-vs-surrogate-keys", "Natural vs. Surrogate Keys", { contentDir: "ch03/13-natural-vs-surrogate-keys",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789838469/ltv-data-warehousing/ch03-13-natural-vs-surrogate-keys.mp4",
        durationLabel: "1 min 23 s",
      }),
      L(14, "degenerate-dimensions", "Degenerate Dimensions", { contentDir: "ch03/14-degenerate-dimensions",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789838518/ltv-data-warehousing/ch03-14-degenerate-dimensions.mp4",
        durationLabel: "1 min 20 s",
      }),
      L(15, "conformed-dimensions", "Conformed Dimensions", { contentDir: "ch03/15-conformed-dimensions",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789838579/ltv-data-warehousing/ch03-15-conformed-dimensions.mp4",
        durationLabel: "1 min 40 s",
      }),
    ],
  },
  {
    n: 4,
    title: "Slowly Changing Dimensions",
    lessons: [
      L(16, "scd-type-0", "SCD Type 0", { contentDir: "ch04/16-scd-type-0",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789838637/ltv-data-warehousing/ch04-16-scd-type-0.mp4",
        durationLabel: "1 min 38 s",
      }),
      L(17, "scd-type-1", "SCD Type 1", { contentDir: "ch04/17-scd-type-1",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789838705/ltv-data-warehousing/ch04-17-scd-type-1.mp4",
        durationLabel: "1 min 56 s",
      }),
      L(18, "scd-type-2", "SCD Type 2", { contentDir: "ch04/18-scd-type-2",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789838781/ltv-data-warehousing/ch04-18-scd-type-2.mp4",
        durationLabel: "2 min 8 s",
      }),
      L(19, "scd-type-3", "SCD Type 3", { contentDir: "ch04/19-scd-type-3",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789838839/ltv-data-warehousing/ch04-19-scd-type-3.mp4",
        durationLabel: "1 min 33 s",
      }),
      L(20, "hybrid-scd-patterns", "Hybrid SCD Patterns", { contentDir: "ch04/20-hybrid-scd-patterns",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789838905/ltv-data-warehousing/ch04-20-hybrid-scd-patterns.mp4",
        durationLabel: "1 min 48 s",
      }),
    ],
  },
  {
    n: 5,
    title: "Staging & ETL Design",
    lessons: [
      L(21, "the-staging-layers-purpose", "The Staging Layer's Purpose", { contentDir: "ch05/21-the-staging-layers-purpose",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789838972/ltv-data-warehousing/ch05-21-the-staging-layers-purpose.mp4",
        durationLabel: "1 min 52 s",
      }),
      L(22, "staging-table-design", "Staging Table Design", { contentDir: "ch05/22-staging-table-design",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789839035/ltv-data-warehousing/ch05-22-staging-table-design.mp4",
        durationLabel: "1 min 39 s",
      }),
      L(23, "load-patterns-full-vs-incremental", "Load Patterns: Full vs. Incremental", { contentDir: "ch05/23-load-patterns-full-vs-incremental",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789839101/ltv-data-warehousing/ch05-23-load-patterns-full-vs-incremental.mp4",
        durationLabel: "1 min 45 s",
      }),
      L(24, "data-quality-in-staging", "Data Quality in Staging", { contentDir: "ch05/24-data-quality-in-staging",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789839165/ltv-data-warehousing/ch05-24-data-quality-in-staging.mp4",
        durationLabel: "1 min 38 s",
      }),
      L(25, "auditing-and-lineage-columns", "Auditing & Lineage Columns", { contentDir: "ch05/25-auditing-and-lineage-columns",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789839226/ltv-data-warehousing/ch05-25-auditing-and-lineage-columns.mp4",
        durationLabel: "1 min 34 s",
      }),
    ],
  },
  {
    n: 6,
    title: "Advanced Warehouse Patterns",
    lessons: [
      L(26, "junk-dimensions", "Junk Dimensions", { contentDir: "ch06/26-junk-dimensions",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789839313/ltv-data-warehousing/ch06-26-junk-dimensions.mp4",
        durationLabel: "2 min 22 s",
      }),
      L(27, "role-playing-dimensions", "Role-Playing Dimensions", { contentDir: "ch06/27-role-playing-dimensions",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789839402/ltv-data-warehousing/ch06-27-role-playing-dimensions.mp4",
        durationLabel: "2 min 27 s",
      }),
      L(28, "bridge-tables-for-many-to-many", "Bridge Tables for Many-to-Many Relationships", { contentDir: "ch06/28-bridge-tables-for-many-to-many",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789839485/ltv-data-warehousing/ch06-28-bridge-tables-for-many-to-many.mp4",
        durationLabel: "2 min 12 s",
      }),
      L(29, "late-arriving-dimensions", "Late-Arriving Dimensions", { contentDir: "ch06/29-late-arriving-dimensions",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789839568/ltv-data-warehousing/ch06-29-late-arriving-dimensions.mp4",
        durationLabel: "2 min 11 s",
      }),
      L(30, "aggregate-tables", "Aggregate Tables", { contentDir: "ch06/30-aggregate-tables",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789839644/ltv-data-warehousing/ch06-30-aggregate-tables.mp4",
        durationLabel: "1 min 58 s",
      }),
    ],
  },
  {
    n: 7,
    title: "Building the Warehouse",
    lessons: [
      L(31, "physical-warehouse-design", "Physical Warehouse Design", { contentDir: "ch07/31-physical-warehouse-design",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789840312/ltv-data-warehousing/ch07-31-physical-warehouse-design.mp4",
        durationLabel: "1 min 38 s",
      }),
      L(32, "indexing-a-warehouse", "Indexing a Warehouse", { contentDir: "ch07/32-indexing-a-warehouse",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789840371/ltv-data-warehousing/ch07-32-indexing-a-warehouse.mp4",
        durationLabel: "1 min 36 s",
      }),
      L(33, "partitioning-large-fact-tables", "Partitioning Large Fact Tables", { contentDir: "ch07/33-partitioning-large-fact-tables",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789839802/ltv-data-warehousing/ch07-33-partitioning-large-fact-tables.mp4",
        durationLabel: "1 min 51 s",
      }),
      L(34, "warehouse-naming-conventions", "Warehouse Naming Conventions", { contentDir: "ch07/34-warehouse-naming-conventions",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789839861/ltv-data-warehousing/ch07-34-warehouse-naming-conventions.mp4",
        durationLabel: "1 min 35 s",
      }),
      L(35, "documenting-the-model", "Documenting the Model", { contentDir: "ch07/35-documenting-the-model",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789839923/ltv-data-warehousing/ch07-35-documenting-the-model.mp4",
        durationLabel: "1 min 40 s",
      }),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(36, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch08/36-capstone-kickoff",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789840010/ltv-data-warehousing/ch08-36-capstone-kickoff.mp4",
        durationLabel: "2 min 31 s",
      }),
      L(37, "capstone-modeling-a-real-business-process", "Capstone: Modeling a Real Business Process", { contentDir: "ch08/37-capstone-modeling-a-real-business-process",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789840092/ltv-data-warehousing/ch08-37-capstone-modeling-a-real-business-process.mp4",
        durationLabel: "2 min 18 s",
      }),
      L(38, "capstone-building-the-physical-schema", "Capstone: Building the Physical Schema", { contentDir: "ch08/38-capstone-building-the-physical-schema",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789840180/ltv-data-warehousing/ch08-38-capstone-building-the-physical-schema.mp4",
        durationLabel: "2 min 24 s",
      }),
      L(39, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch08/39-capstone-wrap-up",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1789840264/ltv-data-warehousing/ch08-39-capstone-wrap-up.mp4",
        durationLabel: "2 min 25 s",
      }),
    ],
  },
];
