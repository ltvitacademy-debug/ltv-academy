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
    title: "Expenses Fundamentals",
    lessons: [
      L(1, "expenses-overview-and-the-expense-lifecycle", "Expenses Overview and the Expense Lifecycle"),
      L(2, "expenses-setup-overview", "Expenses Setup Overview"),
      L(3, "expense-templates-and-expense-types", "Expense Templates and Expense Types"),
      L(4, "expense-policies-and-limits", "Expense Policies and Limits"),
    ],
  },
  {
    n: 2,
    title: "Submitting Expenses",
    lessons: [
      L(5, "creating-an-expense-report", "Creating an Expense Report"),
      L(6, "receipts-attachments-and-itemization", "Receipts, Attachments and Itemization"),
      L(7, "mileage-and-per-diem", "Mileage and Per Diem"),
      L(8, "cash-advances", "Cash Advances"),
      L(9, "corporate-cards-and-card-transactions", "Corporate Cards and Card Transactions"),
    ],
  },
  {
    n: 3,
    title: "Audit, Approval and Payment",
    lessons: [
      L(10, "expense-audit-rules", "Expense Audit Rules"),
      L(11, "expense-approvals", "Expense Approvals"),
      L(12, "reimbursements-through-payables", "Reimbursements Through Payables"),
      L(13, "expense-report-corrections-and-resubmission", "Expense Report Corrections and Resubmission"),
    ],
  },
  {
    n: 4,
    title: "Accounting and Reporting",
    lessons: [
      L(14, "expense-accounting", "Expense Accounting"),
      L(15, "expenses-to-payables-to-general-ledger", "Expenses to Payables to General Ledger"),
      L(16, "expense-reports-and-analysis", "Expense Reports and Analysis"),
      L(17, "expenses-troubleshooting-practice", "Expenses Troubleshooting Practice"),
    ],
  },
  {
    n: 5,
    title: "Best Practices",
    lessons: [
      L(18, "designing-expense-policy-for-a-real-company", "Designing Expense Policy for a Real Company"),
      L(19, "corporate-card-reconciliation", "Corporate Card Reconciliation"),
    ],
  },
];
