// Beginner-tier capstone for the Analytics Engineer path. Only lessons with
// a contentDir + videoUrl are playable; everything else renders as "in
// production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/analytics-engineer-capstone-beginner/
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

export const ANALYTICS_ENGINEER_CAPSTONE_BEGINNER_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Beginner Capstone: First dbt Model on Snowflake",
    lessons: [
      L(1, "the-business-ask", "The Business Ask: One Trustworthy Customer List", { contentDir: "ch01/01-the-business-ask", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-beginner/the-business-ask.mp4", durationLabel: "2 min 52 s" }),
      L(2, "planning-the-dbt-project", "Planning the dbt Project", { contentDir: "ch01/02-planning-the-dbt-project", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-beginner/planning-the-dbt-project.mp4", durationLabel: "2 min 43 s" }),
      L(3, "loading-the-raw-data-into-snowflake", "Loading the Raw Data into Snowflake", { contentDir: "ch01/03-loading-the-raw-data-into-snowflake", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-beginner/loading-the-raw-data-into-snowflake.mp4", durationLabel: "2 min 36 s" }),
      L(4, "connecting-dbt-to-snowflake", "Setting Up the dbt Project and Connecting to Snowflake", { contentDir: "ch01/04-connecting-dbt-to-snowflake", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-beginner/connecting-dbt-to-snowflake.mp4", durationLabel: "2 min 41 s" }),
      L(5, "defining-the-source", "Defining the Source in dbt", { contentDir: "ch01/05-defining-the-source", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-beginner/defining-the-source.mp4", durationLabel: "2 min 23 s" }),
      L(6, "building-the-staging-model", "Building the Staging Model", { contentDir: "ch01/06-building-the-staging-model", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-beginner/building-the-staging-model.mp4", durationLabel: "2 min 38 s" }),
      L(7, "writing-dbt-tests", "Writing dbt Tests", { contentDir: "ch01/07-writing-dbt-tests", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-beginner/writing-dbt-tests.mp4", durationLabel: "2 min 23 s" }),
      L(8, "building-the-customer-mart", "Building the Customer Mart Model", { contentDir: "ch01/08-building-the-customer-mart", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-beginner/building-the-customer-mart.mp4", durationLabel: "1 min 59 s" }),
      L(9, "running-dbt-build", "Running dbt build and Reading the Results", { contentDir: "ch01/09-running-dbt-build", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-beginner/running-dbt-build.mp4", durationLabel: "2 min 17 s" }),
      L(10, "wrap-up-and-whats-next", "Wrap-Up: What You Built, and What's Next", { contentDir: "ch01/10-wrap-up-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-analytics-engineer-capstone-beginner/wrap-up-and-whats-next.mp4", durationLabel: "2 min 25 s" }),
    ],
  },
];
