// Intermediate-tier capstone for the Data Analyst → BI Engineer path. Only
// lessons with a contentDir + videoUrl are playable; everything else renders
// as "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/data-analyst-capstone-intermediate/
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

export const DATA_ANALYST_CAPSTONE_INTERMEDIATE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Intermediate Capstone: Customer Segment & Territory Report",
    lessons: [
      L(1, "the-ask-grows", "The Ask Grows: Two Stakeholders, One Messy Dataset", { contentDir: "ch01/01-the-ask-grows", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-intermediate/the-ask-grows.mp4", durationLabel: "1 min 15 s" }),
      L(2, "planning-the-data-pipeline", "Planning the Data Pipeline", { contentDir: "ch01/02-planning-the-data-pipeline", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-intermediate/planning-the-data-pipeline.mp4", durationLabel: "1 min 18 s" }),
      L(3, "writing-the-multi-table-tsql-extract", "Writing the Multi-Table T-SQL Extract", { contentDir: "ch01/03-writing-the-multi-table-tsql-extract", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-intermediate/writing-the-multi-table-tsql-extract.mp4", durationLabel: "1 min 7 s" }),
      L(4, "why-this-data-needs-python-first", "Why This Data Needs Python Before Power BI", { contentDir: "ch01/04-why-this-data-needs-python-first", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-intermediate/why-this-data-needs-python-first.mp4", durationLabel: "1 min 11 s" }),
      L(5, "cleaning-the-data-with-pandas", "Cleaning the Data with Pandas", { contentDir: "ch01/05-cleaning-the-data-with-pandas", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-intermediate/cleaning-the-data-with-pandas.mp4", durationLabel: "59 s" }),
      L(6, "joining-two-extracts-with-pandas", "Joining Two Extracts with Pandas", { contentDir: "ch01/06-joining-two-extracts-with-pandas", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-intermediate/joining-two-extracts-with-pandas.mp4", durationLabel: "1 min 3 s" }),
      L(7, "loading-the-cleaned-data-into-power-bi", "Loading the Cleaned Data into Power BI", { contentDir: "ch01/07-loading-the-cleaned-data-into-power-bi", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-intermediate/loading-the-cleaned-data-into-power-bi.mp4", durationLabel: "1 min 9 s" }),
      L(8, "building-the-star-schema-data-model", "Building the Star-Schema Data Model", { contentDir: "ch01/08-building-the-star-schema-data-model", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-intermediate/building-the-star-schema-data-model.mp4", durationLabel: "59 s" }),
      L(9, "dax-measures-with-calculate", "DAX Measures With CALCULATE", { contentDir: "ch01/09-dax-measures-with-calculate", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-intermediate/dax-measures-with-calculate.mp4", durationLabel: "1 min 8 s" }),
      L(10, "building-the-segment-page", "Building the Marketing Manager's Segment Page", { contentDir: "ch01/10-building-the-segment-page", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-intermediate/building-the-segment-page.mp4", durationLabel: "1 min 5 s" }),
      L(11, "building-the-territory-benchmark-page", "Building the Sales Director's Territory Benchmark Page", { contentDir: "ch01/11-building-the-territory-benchmark-page", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-intermediate/building-the-territory-benchmark-page.mp4", durationLabel: "1 min 5 s" }),
      L(12, "the-gateway-limitation", "The Gateway Limitation: Why the Scheduled Refresh Needs a Workaround", { contentDir: "ch01/12-the-gateway-limitation", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-intermediate/the-gateway-limitation.mp4", durationLabel: "1 min 4 s" }),
      L(13, "the-numbers-dont-match", "The Numbers Don't Match — Now What?", { contentDir: "ch01/13-the-numbers-dont-match", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-intermediate/the-numbers-dont-match.mp4", durationLabel: "57 s" }),
      L(14, "finding-the-real-cause", "Finding the Real Cause", { contentDir: "ch01/14-finding-the-real-cause", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-intermediate/finding-the-real-cause.mp4", durationLabel: "1 min 5 s" }),
      L(15, "fixing-and-validating", "Fixing and Validating", { contentDir: "ch01/15-fixing-and-validating", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-intermediate/fixing-and-validating.mp4", durationLabel: "1 min 8 s" }),
      L(16, "wrap-up-and-whats-next", "Wrap-Up: What You Built, and What's Next", { contentDir: "ch01/16-wrap-up-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-intermediate/wrap-up-and-whats-next.mp4", durationLabel: "1 min 10 s" }),
    ],
  },
];
