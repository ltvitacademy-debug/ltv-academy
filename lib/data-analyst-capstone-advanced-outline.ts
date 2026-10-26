// Advanced-tier capstone for the Data Analyst → BI Engineer path. Only
// lessons with a contentDir + videoUrl are playable; everything else renders
// as "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/data-analyst-capstone-advanced/
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

export const DATA_ANALYST_CAPSTONE_ADVANCED_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Scoping the Quarterly Business Review Package",
    lessons: [
      L(1, "the-business-ask", "The Business Ask: Three Audiences, One Quarter", { contentDir: "ch01/01-the-business-ask", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/the-business-ask.mp4", durationLabel: "1 min 14 s" }),
      L(2, "planning-the-architecture", "Planning the Architecture", { contentDir: "ch01/02-planning-the-architecture", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/planning-the-architecture.mp4", durationLabel: "60 s" }),
    ],
  },
  {
    n: 2,
    title: "Building the T-SQL Warehouse Layer",
    lessons: [
      L(3, "designing-the-star-schema", "Designing the Star Schema", { contentDir: "ch02/03-designing-the-star-schema", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/designing-the-star-schema.mp4", durationLabel: "59 s" }),
      L(4, "building-the-fact-table", "Building the Fact Table", { contentDir: "ch02/04-building-the-fact-table", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/building-the-fact-table.mp4", durationLabel: "55 s" }),
      L(5, "building-the-dimension-tables", "Building the Dimension Tables", { contentDir: "ch02/05-building-the-dimension-tables", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/building-the-dimension-tables.mp4", durationLabel: "1 min 14 s" }),
      L(6, "loading-and-validating-row-counts", "Loading and Validating Row Counts", { contentDir: "ch02/06-loading-and-validating-row-counts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/loading-and-validating-row-counts.mp4", durationLabel: "55 s" }),
      L(7, "handling-a-late-schema-change", "Handling a Late Schema Change", { contentDir: "ch02/07-handling-a-late-schema-change", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/handling-a-late-schema-change.mp4", durationLabel: "1 min 14 s" }),
    ],
  },
  {
    n: 3,
    title: "Python Data-Quality Automation",
    lessons: [
      L(8, "why-automate-the-data-quality-checks", "Why Automate the Data-Quality Checks", { contentDir: "ch03/08-why-automate-the-data-quality-checks", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/why-automate-the-data-quality-checks.mp4", durationLabel: "1 min 3 s" }),
      L(9, "writing-the-pandas-validation-script", "Writing the Pandas Validation Script", { contentDir: "ch03/09-writing-the-pandas-validation-script", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/writing-the-pandas-validation-script.mp4", durationLabel: "59 s" }),
      L(10, "scheduling-and-logging-the-checks", "Scheduling and Logging the Checks", { contentDir: "ch03/10-scheduling-and-logging-the-checks", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/scheduling-and-logging-the-checks.mp4", durationLabel: "59 s" }),
    ],
  },
  {
    n: 4,
    title: "The Power BI Operational Dashboard",
    lessons: [
      L(11, "building-the-power-bi-data-model", "Building the Power BI Data Model", { contentDir: "ch04/11-building-the-power-bi-data-model", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/building-the-power-bi-data-model.mp4", durationLabel: "57 s" }),
      L(12, "core-dax-measures", "Core DAX Measures", { contentDir: "ch04/12-core-dax-measures", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/core-dax-measures.mp4", durationLabel: "57 s" }),
      L(13, "building-the-executive-summary-page", "Building the Executive Summary Page", { contentDir: "ch04/13-building-the-executive-summary-page", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/building-the-executive-summary-page.mp4", durationLabel: "54 s" }),
      L(14, "building-the-regional-drill-down-page", "Building the Regional Drill-Down Page", { contentDir: "ch04/14-building-the-regional-drill-down-page", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/building-the-regional-drill-down-page.mp4", durationLabel: "53 s" }),
      L(15, "publishing-and-scheduled-refresh", "Publishing and Scheduled Refresh", { contentDir: "ch04/15-publishing-and-scheduled-refresh", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/publishing-and-scheduled-refresh.mp4", durationLabel: "56 s" }),
    ],
  },
  {
    n: 5,
    title: "The Tableau Board Deck",
    lessons: [
      L(16, "connecting-tableau-to-the-same-warehouse", "Connecting Tableau to the Same Warehouse", { contentDir: "ch05/16-connecting-tableau-to-the-same-warehouse", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/connecting-tableau-to-the-same-warehouse.mp4", durationLabel: "59 s" }),
      L(17, "building-the-board-ready-dashboard", "Building the Board-Ready Dashboard", { contentDir: "ch05/17-building-the-board-ready-dashboard", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/building-the-board-ready-dashboard.mp4", durationLabel: "56 s" }),
      L(18, "formatting-for-a-non-technical-audience", "Formatting for a Non-Technical Board Audience", { contentDir: "ch05/18-formatting-for-a-non-technical-audience", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/formatting-for-a-non-technical-audience.mp4", durationLabel: "56 s" }),
      L(19, "publishing-to-tableau-public", "Publishing to Tableau Public", { contentDir: "ch05/19-publishing-to-tableau-public", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/publishing-to-tableau-public.mp4", durationLabel: "56 s" }),
    ],
  },
  {
    n: 6,
    title: "The Finance Excel Reconciliation Workbook",
    lessons: [
      L(20, "the-finance-request", "The Finance Request: Why Excel, Not a BI Tool", { contentDir: "ch06/20-the-finance-request", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/the-finance-request.mp4", durationLabel: "53 s" }),
      L(21, "building-the-reconciliation-workbook", "Building the Reconciliation Workbook", { contentDir: "ch06/21-building-the-reconciliation-workbook", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/building-the-reconciliation-workbook.mp4", durationLabel: "55 s" }),
      L(22, "the-numbers-dont-match", "Validating Against Power BI and Tableau — The Numbers Don't Match", { contentDir: "ch06/22-the-numbers-dont-match", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/the-numbers-dont-match.mp4", durationLabel: "60 s" }),
    ],
  },
  {
    n: 7,
    title: "Resolving the Discrepancy and Wrap-Up",
    lessons: [
      L(23, "finding-the-real-cause", "Finding the Real Cause", { contentDir: "ch07/23-finding-the-real-cause", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/finding-the-real-cause.mp4", durationLabel: "1 min 5 s" }),
      L(24, "fixing-and-validating-across-all-three", "Fixing and Validating Across All Three Deliverables", { contentDir: "ch07/24-fixing-and-validating-across-all-three", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/fixing-and-validating-across-all-three.mp4", durationLabel: "1 min 1 s" }),
      L(25, "presenting-the-qbr-package", "Presenting the QBR Package to the Business", { contentDir: "ch07/25-presenting-the-qbr-package", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/presenting-the-qbr-package.mp4", durationLabel: "58 s" }),
      L(26, "wrap-up-and-whats-next", "Wrap-Up: What You Built, and What's Next", { contentDir: "ch07/26-wrap-up-and-whats-next", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-data-analyst-capstone-advanced/wrap-up-and-whats-next.mp4", durationLabel: "1 min 8 s" }),
    ],
  },
];
