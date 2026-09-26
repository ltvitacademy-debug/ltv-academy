// The Oracle Financial Reporting course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 05. Reporting tools in Oracle Fusion Cloud Financials.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/oracle-financial-reporting/
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

export const ORACLE_FINANCIAL_REPORTING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Reporting Tools",
    lessons: [
      L(1, "financial-reporting-center", "Financial Reporting Center"),
      L(2, "otbi-analyses-and-subject-areas", "OTBI: Analyses and Subject Areas"),
      L(3, "bi-publisher-reports", "BI Publisher Reports"),
    ],
  },
  {
    n: 2,
    title: "Statements and Dashboards",
    lessons: [
      L(4, "smart-view-and-excel-reporting", "Smart View and Excel Reporting"),
      L(5, "financial-statements-income-statement-and-balance-sheet", "Financial Statements: Income Statement and Balance Sheet"),
      L(6, "operational-reports", "Operational Reports"),
      L(7, "dashboards", "Dashboards"),
    ],
  },
];
