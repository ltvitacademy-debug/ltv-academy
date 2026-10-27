// Intermediate-tier capstone for the Snowflake Data Engineer path. Only
// lessons with a contentDir + videoUrl are playable; everything else
// renders as "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/snowflake-capstone-intermediate/
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

export const SNOWFLAKE_CAPSTONE_INTERMEDIATE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Intermediate Capstone: Support and Finance, One Shared Model",
    lessons: [
      L(1, "the-ask-grows", "The Ask Grows: Two Teams, One Ticket Model", { contentDir: "ch01/01-the-ask-grows", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-intermediate/the-ask-grows.mp4", durationLabel: "1 min 58 s" }),
      L(2, "planning-the-streams-and-tasks-design", "Planning the Streams-and-Tasks Design", { contentDir: "ch01/02-planning-the-streams-and-tasks-design", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-intermediate/planning-the-streams-and-tasks-design.mp4", durationLabel: "2 min 2 s" }),
      L(3, "ingesting-the-ticketing-apis-json", "Ingesting the Ticketing API's JSON", { contentDir: "ch01/03-ingesting-the-ticketing-apis-json", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-intermediate/ingesting-the-ticketing-apis-json.mp4", durationLabel: "1 min 44 s" }),
      L(4, "parsing-variant-data", "Parsing VARIANT Data in Snowflake SQL", { contentDir: "ch01/04-parsing-variant-data", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-intermediate/parsing-variant-data.mp4", durationLabel: "1 min 49 s" }),
      L(5, "creating-a-stream-on-the-raw-table", "Creating a Stream on the Raw Table", { contentDir: "ch01/05-creating-a-stream-on-the-raw-table", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-intermediate/creating-a-stream-on-the-raw-table.mp4", durationLabel: "1 min 39 s" }),
      L(6, "writing-the-task-that-consumes-the-stream", "Writing the Task That Consumes the Stream", { contentDir: "ch01/06-writing-the-task-that-consumes-the-stream", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-intermediate/writing-the-task-that-consumes-the-stream.mp4", durationLabel: "1 min 48 s" }),
      L(7, "scheduling-the-task", "Scheduling the Task", { contentDir: "ch01/07-scheduling-the-task", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-intermediate/scheduling-the-task.mp4", durationLabel: "1 min 38 s" }),
      L(8, "building-the-finance-refund-view", "Building the Finance Refund View", { contentDir: "ch01/08-building-the-finance-refund-view", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-intermediate/building-the-finance-refund-view.mp4", durationLabel: "1 min 35 s" }),
      L(9, "building-the-support-trends-view", "Building the Support Trends View", { contentDir: "ch01/09-building-the-support-trends-view", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-intermediate/building-the-support-trends-view.mp4", durationLabel: "1 min 35 s" }),
      L(10, "connecting-power-bi-to-both-views", "Connecting Power BI to Both Views", { contentDir: "ch01/10-connecting-power-bi-to-both-views", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-intermediate/connecting-power-bi-to-both-views.mp4", durationLabel: "1 min 40 s" }),
      L(11, "building-the-support-page", "Building the Support Page", { contentDir: "ch01/11-building-the-support-page", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-intermediate/building-the-support-page.mp4", durationLabel: "1 min 23 s" }),
      L(12, "building-the-finance-page", "Building the Finance Page", { contentDir: "ch01/12-building-the-finance-page", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-intermediate/building-the-finance-page.mp4", durationLabel: "1 min 39 s" }),
      L(13, "the-numbers-dont-match", "The Numbers Don't Match — Now What?", { contentDir: "ch01/13-the-numbers-dont-match", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-intermediate/the-numbers-dont-match.mp4", durationLabel: "1 min 53 s" }),
      L(14, "finding-the-real-cause", "Finding the Real Cause", { contentDir: "ch01/14-finding-the-real-cause", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-intermediate/finding-the-real-cause.mp4", durationLabel: "1 min 47 s" }),
      L(15, "fixing-and-validating", "Fixing and Validating", { contentDir: "ch01/15-fixing-and-validating", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-intermediate/fixing-and-validating.mp4", durationLabel: "1 min 29 s" }),
      L(16, "wrap-up-and-whats-next", "Wrap-Up: What You Built, and What's Next", { contentDir: "ch01/16-wrap-up-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-intermediate/wrap-up-and-whats-next.mp4", durationLabel: "1 min 52 s" }),
    ],
  },
];
