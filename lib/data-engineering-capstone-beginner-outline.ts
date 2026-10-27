// Shared Beginner-tier capstone for the Azure/Fabric Data Engineer AND
// Databricks/Lakehouse Engineer paths, which already share one Advanced
// capstone ("Data Engineering Career & Capstone"). Only lessons with a
// contentDir + videoUrl are playable; everything else renders as "in
// production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/data-engineering-capstone-beginner/
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

export const DATA_ENGINEERING_CAPSTONE_BEGINNER_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Beginner Capstone: First Medallion Pipeline",
    lessons: [
      L(1, "the-business-ask", "The Business Ask: One Clean Daily Sales Table", { contentDir: "ch01/01-the-business-ask", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-beginner/the-business-ask.mp4", durationLabel: "2 min 24 s" }),
      L(2, "planning-the-medallion-pipeline", "Planning the Medallion Pipeline", { contentDir: "ch01/02-planning-the-medallion-pipeline", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-beginner/planning-the-medallion-pipeline.mp4", durationLabel: "1 min 52 s" }),
      L(3, "landing-raw-data", "Landing Raw Data in the Bronze Layer", { contentDir: "ch01/03-landing-raw-data", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-beginner/landing-raw-data.mp4", durationLabel: "1 min 47 s" }),
      L(4, "bronze-to-silver-transformation", "Writing the Bronze-to-Silver Transformation", { contentDir: "ch01/04-bronze-to-silver-transformation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-beginner/bronze-to-silver-transformation.mp4", durationLabel: "1 min 35 s" }),
      L(5, "silver-to-gold-aggregation", "Writing the Silver-to-Gold Aggregation", { contentDir: "ch01/05-silver-to-gold-aggregation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-beginner/silver-to-gold-aggregation.mp4", durationLabel: "1 min 43 s" }),
      L(6, "validating-row-counts", "Validating Row Counts Across Layers", { contentDir: "ch01/06-validating-row-counts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-beginner/validating-row-counts.mp4", durationLabel: "1 min 50 s" }),
      L(7, "scheduling-the-pipeline", "Scheduling the Pipeline to Run Daily", { contentDir: "ch01/07-scheduling-the-pipeline", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-beginner/scheduling-the-pipeline.mp4", durationLabel: "1 min 47 s" }),
      L(8, "connecting-power-bi", "Connecting Power BI to the Gold Table", { contentDir: "ch01/08-connecting-power-bi", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-beginner/connecting-power-bi.mp4", durationLabel: "1 min 57 s" }),
      L(9, "presenting-the-dashboard", "Presenting the Dashboard", { contentDir: "ch01/09-presenting-the-dashboard", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-beginner/presenting-the-dashboard.mp4", durationLabel: "1 min 47 s" }),
      L(10, "wrap-up-and-whats-next", "Wrap-Up: What You Built, and What's Next", { contentDir: "ch01/10-wrap-up-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-beginner/wrap-up-and-whats-next.mp4", durationLabel: "2 min 1 s" }),
    ],
  },
];
