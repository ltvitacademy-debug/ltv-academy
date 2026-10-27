// Beginner-tier capstone for the Snowflake Data Engineer path,
// complementing the existing Advanced "snowflake-data-engineering-capstone"
// course. Only lessons with a contentDir + videoUrl are playable; everything
// else renders as "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/snowflake-capstone-beginner/
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

export const SNOWFLAKE_CAPSTONE_BEGINNER_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Beginner Capstone: The First Support Ticket Report",
    lessons: [
      L(1, "the-business-ask", "The Business Ask: One Clean Ticket Report", { contentDir: "ch01/01-the-business-ask", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-beginner/the-business-ask.mp4", durationLabel: "2 min 15 s" }),
      L(2, "planning-the-snowflake-setup", "Planning the Snowflake Setup", { contentDir: "ch01/02-planning-the-snowflake-setup", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-beginner/planning-the-snowflake-setup.mp4", durationLabel: "2 min 9 s" }),
      L(3, "creating-the-warehouse-and-loading-data", "Creating the Warehouse and Loading the Data", { contentDir: "ch01/03-creating-the-warehouse-and-loading-data", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-beginner/creating-the-warehouse-and-loading-data.mp4", durationLabel: "1 min 55 s" }),
      L(4, "snowflake-sql-vs-tsql", "Snowflake SQL: What's Different From T-SQL", { contentDir: "ch01/04-snowflake-sql-vs-tsql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-beginner/snowflake-sql-vs-tsql.mp4", durationLabel: "2 min 5 s" }),
      L(5, "writing-the-ticket-summary-query", "Writing the Ticket Summary Query", { contentDir: "ch01/05-writing-the-ticket-summary-query", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-beginner/writing-the-ticket-summary-query.mp4", durationLabel: "1 min 56 s" }),
      L(6, "setting-up-basic-rbac", "Setting Up Basic RBAC", { contentDir: "ch01/06-setting-up-basic-rbac", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-beginner/setting-up-basic-rbac.mp4", durationLabel: "1 min 40 s" }),
      L(7, "turning-the-query-into-a-view", "Turning the Query Into a View", { contentDir: "ch01/07-turning-the-query-into-a-view", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-beginner/turning-the-query-into-a-view.mp4", durationLabel: "1 min 46 s" }),
      L(8, "connecting-power-bi", "Connecting Power BI to the View", { contentDir: "ch01/08-connecting-power-bi", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-beginner/connecting-power-bi.mp4", durationLabel: "1 min 54 s" }),
      L(9, "presenting-the-report", "Presenting the Report", { contentDir: "ch01/09-presenting-the-report", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-beginner/presenting-the-report.mp4", durationLabel: "1 min 48 s" }),
      L(10, "wrap-up-and-whats-next", "Wrap-Up: What You Built, and What's Next", { contentDir: "ch01/10-wrap-up-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-snowflake-capstone-beginner/wrap-up-and-whats-next.mp4", durationLabel: "2 min 28 s" }),
    ],
  },
];
