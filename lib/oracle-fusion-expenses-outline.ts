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
      L(1, "expenses-overview-and-the-expense-lifecycle", "Expenses Overview and the Expense Lifecycle", { contentDir: "ch01/01-expenses-overview-and-the-expense-lifecycle" }),
      L(2, "expenses-setup-overview", "Expenses Setup Overview", { contentDir: "ch01/02-expenses-setup-overview" }),
      L(3, "expense-templates-and-expense-types", "Expense Templates and Expense Types", { contentDir: "ch01/03-expense-templates-and-expense-types" }),
      L(4, "expense-policies-and-limits", "Expense Policies and Limits", { contentDir: "ch01/04-expense-policies-and-limits" }),
    ],
  },
  {
    n: 2,
    title: "Submitting Expenses",
    lessons: [
      L(5, "creating-an-expense-report", "Creating an Expense Report", { contentDir: "ch02/05-creating-an-expense-report" }),
      L(6, "receipts-attachments-and-itemization", "Receipts, Attachments and Itemization", { contentDir: "ch02/06-receipts-attachments-and-itemization" }),
      L(7, "mileage-and-per-diem", "Mileage and Per Diem", { contentDir: "ch02/07-mileage-and-per-diem" }),
      L(8, "cash-advances", "Cash Advances", { contentDir: "ch02/08-cash-advances" }),
      L(9, "corporate-cards-and-card-transactions", "Corporate Cards and Card Transactions", { contentDir: "ch02/09-corporate-cards-and-card-transactions" }),
    ],
  },
  {
    n: 3,
    title: "Audit, Approval and Payment",
    lessons: [
      L(10, "expense-audit-rules", "Expense Audit Rules", { contentDir: "ch03/10-expense-audit-rules" }),
      L(11, "expense-approvals", "Expense Approvals", { contentDir: "ch03/11-expense-approvals" }),
      L(12, "reimbursements-through-payables", "Reimbursements Through Payables", { contentDir: "ch03/12-reimbursements-through-payables" }),
      L(13, "expense-report-corrections-and-resubmission", "Expense Report Corrections and Resubmission", { contentDir: "ch03/13-expense-report-corrections-and-resubmission" }),
    ],
  },
  {
    n: 4,
    title: "Accounting and Reporting",
    lessons: [
      L(14, "expense-accounting", "Expense Accounting", { contentDir: "ch04/14-expense-accounting" }),
      L(15, "expenses-to-payables-to-general-ledger", "Expenses to Payables to General Ledger", { contentDir: "ch04/15-expenses-to-payables-to-general-ledger" }),
      L(16, "expense-reports-and-analysis", "Expense Reports and Analysis", { contentDir: "ch04/16-expense-reports-and-analysis" }),
      L(17, "expenses-troubleshooting-practice", "Expenses Troubleshooting Practice", { contentDir: "ch04/17-expenses-troubleshooting-practice" }),
    ],
  },
  {
    n: 5,
    title: "Best Practices",
    lessons: [
      L(18, "designing-expense-policy-for-a-real-company", "Designing Expense Policy for a Real Company", { contentDir: "ch05/18-designing-expense-policy-for-a-real-company" }),
      L(19, "corporate-card-reconciliation", "Corporate Card Reconciliation", { contentDir: "ch05/19-corporate-card-reconciliation" }),
    ],
  },
];
