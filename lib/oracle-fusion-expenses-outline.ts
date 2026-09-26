// The Expenses course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 03. Oracle Fusion Cloud Expenses.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/oracle-fusion-expenses/
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

export const ORACLE_FUSION_EXPENSES_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Setup and Submission",
    lessons: [
      L(1, "expenses-overview-and-setup", "Expenses Overview and Setup"),
      L(2, "expense-reports-and-corporate-cards", "Expense Reports and Corporate Cards"),
    ],
  },
  {
    n: 2,
    title: "Approval to Accounting",
    lessons: [
      L(3, "expense-approvals", "Expense Approvals"),
      L(4, "reimbursements", "Reimbursements"),
      L(5, "expense-accounting", "Expense Accounting"),
    ],
  },
];
