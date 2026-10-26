// Beginner-tier capstone for the Data Analyst → BI Engineer path. Only
// lessons with a contentDir + videoUrl are playable; everything else renders
// as "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/data-analyst-capstone-beginner/
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

export const DATA_ANALYST_CAPSTONE_BEGINNER_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Beginner Capstone: Product Category Performance Snapshot",
    lessons: [
      L(1, "the-business-ask", "The Business Ask: One Question, One Stakeholder", { contentDir: "ch01/01-the-business-ask", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-beginner/the-business-ask.mp4", durationLabel: "1 min 55 s" }),
      L(2, "planning-the-tsql-query", "Planning the T-SQL Query", { contentDir: "ch01/02-planning-the-tsql-query", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-beginner/planning-the-tsql-query.mp4", durationLabel: "2 min 10 s" }),
      L(3, "writing-the-category-performance-query", "Writing the Category Performance Extract Query", { contentDir: "ch01/03-writing-the-category-performance-query", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-beginner/writing-the-category-performance-query.mp4", durationLabel: "2 min 11 s" }),
      L(4, "connecting-power-bi-and-shaping-the-data", "Connecting Power BI and Shaping the Data", { contentDir: "ch01/04-connecting-power-bi-and-shaping-the-data", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-beginner/connecting-power-bi-and-shaping-the-data.mp4", durationLabel: "2 min 9 s" }),
      L(5, "building-the-report-page-layout", "Building the Report Page Layout", { contentDir: "ch01/05-building-the-report-page-layout", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-beginner/building-the-report-page-layout.mp4", durationLabel: "1 min 50 s" }),
      L(6, "writing-the-core-dax-measures", "Writing the Core DAX Measures", { contentDir: "ch01/06-writing-the-core-dax-measures", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-beginner/writing-the-core-dax-measures.mp4", durationLabel: "1 min 50 s" }),
      L(7, "adding-slicers-and-formatting", "Adding Slicers and Formatting", { contentDir: "ch01/07-adding-slicers-and-formatting", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-beginner/adding-slicers-and-formatting.mp4", durationLabel: "1 min 53 s" }),
      L(8, "publishing-to-the-power-bi-service", "Publishing to the Power BI Service", { contentDir: "ch01/08-publishing-to-the-power-bi-service", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-beginner/publishing-to-the-power-bi-service.mp4", durationLabel: "1 min 43 s" }),
      L(9, "presenting-the-dashboard", "Presenting the Dashboard", { contentDir: "ch01/09-presenting-the-dashboard", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-beginner/presenting-the-dashboard.mp4", durationLabel: "1 min 44 s" }),
      L(10, "wrap-up-and-whats-next", "Wrap-Up: What You Built, and What's Next", { contentDir: "ch01/10-wrap-up-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-beginner/wrap-up-and-whats-next.mp4", durationLabel: "2 min 16 s" }),
    ],
  },
];
