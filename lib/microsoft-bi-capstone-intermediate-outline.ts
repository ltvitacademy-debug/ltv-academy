// Intermediate-tier capstone for the Microsoft Data & BI Developer path.
// Only lessons with a contentDir + videoUrl are playable; everything else
// renders as "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/microsoft-bi-capstone-intermediate/
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

export const MICROSOFT_BI_CAPSTONE_INTERMEDIATE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Intermediate Capstone: The Weekly Sales & Fulfillment Report",
    lessons: [
      L(1, "the-ask-grows", "The Ask Grows: Two Stakeholders, Every Week", { contentDir: "ch01/01-the-ask-grows", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone-intermediate/the-ask-grows.mp4", durationLabel: "1 min 60 s" }),
      L(2, "planning-the-architecture", "Planning the Architecture", { contentDir: "ch01/02-planning-the-architecture", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone-intermediate/planning-the-architecture.mp4", durationLabel: "1 min 49 s" }),
      L(3, "writing-the-multi-table-query", "Writing the Multi-Table T-SQL Query", { contentDir: "ch01/03-writing-the-multi-table-query", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone-intermediate/writing-the-multi-table-query.mp4", durationLabel: "2 min 3 s" }),
      L(4, "staging-the-data-for-reuse", "Staging the Data for Repeatable Use", { contentDir: "ch01/04-staging-the-data-for-reuse", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone-intermediate/staging-the-data-for-reuse.mp4", durationLabel: "1 min 48 s" }),
      L(5, "building-the-power-bi-data-model", "Building the Power BI Data Model", { contentDir: "ch01/05-building-the-power-bi-data-model", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone-intermediate/building-the-power-bi-data-model.mp4", durationLabel: "1 min 56 s" }),
      L(6, "dax-measures-with-calculate", "DAX Measures With CALCULATE", { contentDir: "ch01/06-dax-measures-with-calculate", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone-intermediate/dax-measures-with-calculate.mp4", durationLabel: "1 min 41 s" }),
      L(7, "building-the-executive-summary-page", "Building the Executive Summary Page", { contentDir: "ch01/07-building-the-executive-summary-page", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone-intermediate/building-the-executive-summary-page.mp4", durationLabel: "1 min 42 s" }),
      L(8, "building-the-drill-down-page", "Building the Region & Product Drill-Down Page", { contentDir: "ch01/08-building-the-drill-down-page", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone-intermediate/building-the-drill-down-page.mp4", durationLabel: "1 min 30 s" }),
      L(9, "setting-up-the-scheduled-refresh", "Setting Up the Scheduled Refresh", { contentDir: "ch01/09-setting-up-the-scheduled-refresh", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone-intermediate/setting-up-the-scheduled-refresh.mp4", durationLabel: "1 min 35 s" }),
      L(10, "the-numbers-dont-match", "The Numbers Don't Match on Two Pages — Now What?", { contentDir: "ch01/10-the-numbers-dont-match", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone-intermediate/the-numbers-dont-match.mp4", durationLabel: "1 min 30 s" }),
      L(11, "finding-the-real-cause", "Finding the Real Cause", { contentDir: "ch01/11-finding-the-real-cause", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone-intermediate/finding-the-real-cause.mp4", durationLabel: "1 min 51 s" }),
      L(12, "fixing-and-validating", "Fixing the Measure and Validating the Result", { contentDir: "ch01/12-fixing-and-validating", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone-intermediate/fixing-and-validating.mp4", durationLabel: "1 min 33 s" }),
      L(13, "documenting-the-solution", "Documenting the Solution", { contentDir: "ch01/13-documenting-the-solution", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone-intermediate/documenting-the-solution.mp4", durationLabel: "1 min 31 s" }),
      L(14, "presenting-to-two-audiences", "Presenting to Two Different Audiences", { contentDir: "ch01/14-presenting-to-two-audiences", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone-intermediate/presenting-to-two-audiences.mp4", durationLabel: "1 min 27 s" }),
      L(15, "handling-a-change-request", "Handling a Follow-Up Change Request", { contentDir: "ch01/15-handling-a-change-request", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone-intermediate/handling-a-change-request.mp4", durationLabel: "1 min 34 s" }),
      L(16, "wrap-up-and-whats-next", "Wrap-Up: What You Built, and What's Next", { contentDir: "ch01/16-wrap-up-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-microsoft-bi-capstone-intermediate/wrap-up-and-whats-next.mp4", durationLabel: "1 min 49 s" }),
    ],
  },
];
