// Shared Intermediate-tier capstone for the Azure/Fabric Data Engineer AND
// Databricks/Lakehouse Engineer paths. Only lessons with a contentDir +
// videoUrl are playable; everything else renders as "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/data-engineering-capstone-intermediate/
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

export const DATA_ENGINEERING_CAPSTONE_INTERMEDIATE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Intermediate Capstone: Two Stakeholders, One Incremental Pipeline",
    lessons: [
      L(1, "the-ask-grows", "The Ask Grows: Two Stakeholders, One Pipeline", { contentDir: "ch01/01-the-ask-grows", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-intermediate/the-ask-grows.mp4", durationLabel: "2 min 41 s" }),
      L(2, "planning-the-incremental-design", "Planning the Incremental Design", { contentDir: "ch01/02-planning-the-incremental-design", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-intermediate/planning-the-incremental-design.mp4", durationLabel: "2 min 48 s" }),
      L(3, "why-a-full-reload-no-longer-works", "Why a Full Reload No Longer Works", { contentDir: "ch01/03-why-a-full-reload-no-longer-works", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-intermediate/why-a-full-reload-no-longer-works.mp4", durationLabel: "2 min 38 s" }),
      L(4, "building-the-incremental-bronze-ingestion", "Building the Incremental Bronze Ingestion", { contentDir: "ch01/04-building-the-incremental-bronze-ingestion", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-intermediate/building-the-incremental-bronze-ingestion.mp4", durationLabel: "2 min 38 s" }),
      L(5, "using-merge-into-for-the-silver-layer", "Using MERGE INTO for the Silver Layer", { contentDir: "ch01/05-using-merge-into-for-the-silver-layer", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-intermediate/using-merge-into-for-the-silver-layer.mp4", durationLabel: "3 min 8 s" }),
      L(6, "handling-late-arriving-data", "Handling Late-Arriving Data", { contentDir: "ch01/06-handling-late-arriving-data", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-intermediate/handling-late-arriving-data.mp4", durationLabel: "2 min 52 s" }),
      L(7, "building-the-category-breakdown-table", "Building the Category Breakdown Gold Table", { contentDir: "ch01/07-building-the-category-breakdown-table", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-intermediate/building-the-category-breakdown-table.mp4", durationLabel: "2 min 54 s" }),
      L(8, "building-the-daily-summary-table", "Extending the Daily Summary Gold Table", { contentDir: "ch01/08-building-the-daily-summary-table", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-intermediate/building-the-daily-summary-table.mp4", durationLabel: "2 min 47 s" }),
      L(9, "validating-both-gold-tables", "Validating Both Gold Tables", { contentDir: "ch01/09-validating-both-gold-tables", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-intermediate/validating-both-gold-tables.mp4", durationLabel: "2 min 42 s" }),
      L(10, "connecting-power-bi-to-both-tables", "Connecting Power BI to Both Tables", { contentDir: "ch01/10-connecting-power-bi-to-both-tables", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-intermediate/connecting-power-bi-to-both-tables.mp4", durationLabel: "2 min 49 s" }),
      L(11, "building-the-store-ops-page", "Building the Store Ops Page", { contentDir: "ch01/11-building-the-store-ops-page", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-intermediate/building-the-store-ops-page.mp4", durationLabel: "2 min 26 s" }),
      L(12, "building-the-regional-manager-page", "Building the Regional Manager Page", { contentDir: "ch01/12-building-the-regional-manager-page", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-intermediate/building-the-regional-manager-page.mp4", durationLabel: "2 min 27 s" }),
      L(13, "the-numbers-dont-match", "The Numbers Don't Match — Now What?", { contentDir: "ch01/13-the-numbers-dont-match", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-intermediate/the-numbers-dont-match.mp4", durationLabel: "2 min 12 s" }),
      L(14, "finding-the-real-cause", "Finding the Real Cause", { contentDir: "ch01/14-finding-the-real-cause", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-intermediate/finding-the-real-cause.mp4", durationLabel: "2 min 46 s" }),
      L(15, "fixing-and-validating", "Fixing and Validating", { contentDir: "ch01/15-fixing-and-validating", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-intermediate/fixing-and-validating.mp4", durationLabel: "2 min 26 s" }),
      L(16, "wrap-up-and-whats-next", "Wrap-Up: What You Built, and What's Next", { contentDir: "ch01/16-wrap-up-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-engineering-capstone-intermediate/wrap-up-and-whats-next.mp4", durationLabel: "2 min 45 s" }),
    ],
  },
];
