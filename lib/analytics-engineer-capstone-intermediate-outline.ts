// Intermediate-tier capstone for the Analytics Engineer path. Only lessons
// with a contentDir + videoUrl are playable; everything else renders as "in
// production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/analytics-engineer-capstone-intermediate/
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

export const ANALYTICS_ENGINEER_CAPSTONE_INTERMEDIATE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Intermediate Capstone: The Orders Analytics Layer",
    lessons: [
      L(1, "the-ask-grows", "The Ask Grows: Two Stakeholders, One Orders Model", { contentDir: "ch01/01-the-ask-grows", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-intermediate/the-ask-grows.mp4", durationLabel: "1 min 25 s" }),
      L(2, "planning-the-model-layer", "Planning the Model Layer", { contentDir: "ch01/02-planning-the-model-layer", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-intermediate/planning-the-model-layer.mp4", durationLabel: "1 min 37 s" }),
      L(3, "building-the-orders-staging-model", "Building the Orders Staging Model", { contentDir: "ch01/03-building-the-orders-staging-model", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-intermediate/building-the-orders-staging-model.mp4", durationLabel: "1 min 14 s" }),
      L(4, "building-an-intermediate-model", "Building an Intermediate Model", { contentDir: "ch01/04-building-an-intermediate-model", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-intermediate/building-an-intermediate-model.mp4", durationLabel: "1 min 17 s" }),
      L(5, "why-this-model-needs-to-be-incremental", "Why This Model Needs to Be Incremental", { contentDir: "ch01/05-why-this-model-needs-to-be-incremental", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-intermediate/why-this-model-needs-to-be-incremental.mp4", durationLabel: "1 min 16 s" }),
      L(6, "building-the-incremental-orders-model", "Building the Incremental Orders Model", { contentDir: "ch01/06-building-the-incremental-orders-model", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-intermediate/building-the-incremental-orders-model.mp4", durationLabel: "1 min 16 s" }),
      L(7, "writing-a-custom-jinja-macro", "Writing a Custom Jinja Macro", { contentDir: "ch01/07-writing-a-custom-jinja-macro", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-intermediate/writing-a-custom-jinja-macro.mp4", durationLabel: "1 min 11 s" }),
      L(8, "adding-tests-across-the-new-models", "Adding Tests Across the New Models", { contentDir: "ch01/08-adding-tests-across-the-new-models", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-intermediate/adding-tests-across-the-new-models.mp4", durationLabel: "1 min 22 s" }),
      L(9, "generating-and-reading-dbt-docs", "Generating and Reading dbt Docs", { contentDir: "ch01/09-generating-and-reading-dbt-docs", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-intermediate/generating-and-reading-dbt-docs.mp4", durationLabel: "1 min 10 s" }),
      L(10, "connecting-power-bi-to-the-marts", "Connecting Power BI to the Marts", { contentDir: "ch01/10-connecting-power-bi-to-the-marts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-intermediate/connecting-power-bi-to-the-marts.mp4", durationLabel: "1 min 7 s" }),
      L(11, "building-the-finance-revenue-page", "Building the Finance Revenue Page", { contentDir: "ch01/11-building-the-finance-revenue-page", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-intermediate/building-the-finance-revenue-page.mp4", durationLabel: "1 min 15 s" }),
      L(12, "building-the-ops-order-status-page", "Building the Ops Order-Status Page", { contentDir: "ch01/12-building-the-ops-order-status-page", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-intermediate/building-the-ops-order-status-page.mp4", durationLabel: "1 min 8 s" }),
      L(13, "a-test-fails-now-what", "A Test Fails — Now What?", { contentDir: "ch01/13-a-test-fails-now-what", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-intermediate/a-test-fails-now-what.mp4", durationLabel: "1 min 20 s" }),
      L(14, "finding-the-real-cause", "Finding the Real Cause", { contentDir: "ch01/14-finding-the-real-cause", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-intermediate/finding-the-real-cause.mp4", durationLabel: "1 min 21 s" }),
      L(15, "fixing-and-validating", "Fixing and Validating", { contentDir: "ch01/15-fixing-and-validating", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-intermediate/fixing-and-validating.mp4", durationLabel: "1 min 12 s" }),
      L(16, "wrap-up-and-whats-next", "Wrap-Up: What You Built, and What's Next", { contentDir: "ch01/16-wrap-up-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-intermediate/wrap-up-and-whats-next.mp4", durationLabel: "1 min 12 s" }),
    ],
  },
];
