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
      L(1, "expenses-overview-and-the-expense-lifecycle", "Expenses Overview and the Expense Lifecycle", { contentDir: "ch01/01-expenses-overview-and-the-expense-lifecycle", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792505622/ltv-oracle-fusion-expenses/expenses-overview-and-the-expense-lifecycle.mp4", durationLabel: "2 min 9 s" }),
      L(2, "expenses-setup-overview", "Expenses Setup Overview", { contentDir: "ch01/02-expenses-setup-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792506461/ltv-oracle-fusion-expenses/expenses-setup-overview.mp4", durationLabel: "2 min 6 s" }),
      L(3, "expense-templates-and-expense-types", "Expense Templates and Expense Types", { contentDir: "ch01/03-expense-templates-and-expense-types", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507439/ltv-oracle-fusion-expenses/expense-templates-and-expense-types.mp4", durationLabel: "2 min 3 s" }),
      L(4, "expense-policies-and-limits", "Expense Policies and Limits", { contentDir: "ch01/04-expense-policies-and-limits", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508695/ltv-oracle-fusion-expenses/expense-policies-and-limits.mp4", durationLabel: "2 min 23 s" }),
    ],
  },
  {
    n: 2,
    title: "Submitting Expenses",
    lessons: [
      L(5, "creating-an-expense-report", "Creating an Expense Report", { contentDir: "ch02/05-creating-an-expense-report", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509538/ltv-oracle-fusion-expenses/creating-an-expense-report.mp4", durationLabel: "2 min 16 s" }),
      L(6, "receipts-attachments-and-itemization", "Receipts, Attachments and Itemization", { contentDir: "ch02/06-receipts-attachments-and-itemization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510382/ltv-oracle-fusion-expenses/receipts-attachments-and-itemization.mp4", durationLabel: "2 min 9 s" }),
      L(7, "mileage-and-per-diem", "Mileage and Per Diem", { contentDir: "ch02/07-mileage-and-per-diem", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511252/ltv-oracle-fusion-expenses/mileage-and-per-diem.mp4", durationLabel: "2 min 10 s" }),
      L(8, "cash-advances", "Cash Advances", { contentDir: "ch02/08-cash-advances", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512011/ltv-oracle-fusion-expenses/cash-advances.mp4", durationLabel: "2 min 1 s" }),
      L(9, "corporate-cards-and-card-transactions", "Corporate Cards and Card Transactions", { contentDir: "ch02/09-corporate-cards-and-card-transactions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512897/ltv-oracle-fusion-expenses/corporate-cards-and-card-transactions.mp4", durationLabel: "2 min 22 s" }),
    ],
  },
  {
    n: 3,
    title: "Audit, Approval and Payment",
    lessons: [
      L(10, "expense-audit-rules", "Expense Audit Rules", { contentDir: "ch03/10-expense-audit-rules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513802/ltv-oracle-fusion-expenses/expense-audit-rules.mp4", durationLabel: "2 min 22 s" }),
      L(11, "expense-approvals", "Expense Approvals", { contentDir: "ch03/11-expense-approvals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514664/ltv-oracle-fusion-expenses/expense-approvals.mp4", durationLabel: "2 min 9 s" }),
      L(12, "reimbursements-through-payables", "Reimbursements Through Payables", { contentDir: "ch03/12-reimbursements-through-payables", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792515533/ltv-oracle-fusion-expenses/reimbursements-through-payables.mp4", durationLabel: "2 min 6 s" }),
      L(13, "expense-report-corrections-and-resubmission", "Expense Report Corrections and Resubmission", { contentDir: "ch03/13-expense-report-corrections-and-resubmission", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516472/ltv-oracle-fusion-expenses/expense-report-corrections-and-resubmission.mp4", durationLabel: "2 min 22 s" }),
    ],
  },
  {
    n: 4,
    title: "Accounting and Reporting",
    lessons: [
      L(14, "expense-accounting", "Expense Accounting", { contentDir: "ch04/14-expense-accounting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792517399/ltv-oracle-fusion-expenses/expense-accounting.mp4", durationLabel: "2 min 18 s" }),
      L(15, "expenses-to-payables-to-general-ledger", "Expenses to Payables to General Ledger", { contentDir: "ch04/15-expenses-to-payables-to-general-ledger", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518223/ltv-oracle-fusion-expenses/expenses-to-payables-to-general-ledger.mp4", durationLabel: "2 min 13 s" }),
      L(16, "expense-reports-and-analysis", "Expense Reports and Analysis", { contentDir: "ch04/16-expense-reports-and-analysis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519213/ltv-oracle-fusion-expenses/expense-reports-and-analysis.mp4", durationLabel: "2 min 20 s" }),
      L(17, "expenses-troubleshooting-practice", "Expenses Troubleshooting Practice", { contentDir: "ch04/17-expenses-troubleshooting-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520193/ltv-oracle-fusion-expenses/expenses-troubleshooting-practice.mp4", durationLabel: "2 min 27 s" }),
    ],
  },
  {
    n: 5,
    title: "Best Practices",
    lessons: [
      L(18, "designing-expense-policy-for-a-real-company", "Designing Expense Policy for a Real Company", { contentDir: "ch05/18-designing-expense-policy-for-a-real-company", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792521186/ltv-oracle-fusion-expenses/designing-expense-policy-for-a-real-company.mp4", durationLabel: "2 min 31 s" }),
      L(19, "corporate-card-reconciliation", "Corporate Card Reconciliation", { contentDir: "ch05/19-corporate-card-reconciliation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522155/ltv-oracle-fusion-expenses/corporate-card-reconciliation.mp4", durationLabel: "2 min 29 s" }),
    ],
  },
];
