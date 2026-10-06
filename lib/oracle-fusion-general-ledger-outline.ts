// The General Ledger course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 02. Oracle Fusion Cloud General Ledger, hands-on in the practice environment.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/oracle-fusion-general-ledger/
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

export const ORACLE_FUSION_GENERAL_LEDGER_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "General Ledger Fundamentals",
    lessons: [
      L(1, "ledgers-and-balances-overview", "Ledgers and Balances Overview", { contentDir: "ch01/01-ledgers-and-balances-overview" }),
      L(2, "how-balances-are-stored-and-summarized", "How Balances Are Stored and Summarized", { contentDir: "ch01/02-how-balances-are-stored-and-summarized" }),
      L(3, "the-general-ledger-work-area", "The General Ledger Work Area", { contentDir: "ch01/03-the-general-ledger-work-area" }),
      L(4, "accounting-periods-and-period-status", "Accounting Periods and Period Status", { contentDir: "ch01/04-accounting-periods-and-period-status" }),
      L(5, "general-ledger-setup-review", "General Ledger Setup Review", { contentDir: "ch01/05-general-ledger-setup-review" }),
    ],
  },
  {
    n: 2,
    title: "Manual Journals",
    lessons: [
      L(6, "creating-a-manual-journal", "Creating a Manual Journal", { contentDir: "ch02/06-creating-a-manual-journal" }),
      L(7, "journal-sources-and-categories", "Journal Sources and Categories", { contentDir: "ch02/07-journal-sources-and-categories" }),
      L(8, "journal-batches-and-journal-lines", "Journal Batches and Journal Lines", { contentDir: "ch02/08-journal-batches-and-journal-lines" }),
      L(9, "journal-validation-and-errors", "Journal Validation and Errors", { contentDir: "ch02/09-journal-validation-and-errors" }),
      L(10, "posting-journals", "Posting Journals", { contentDir: "ch02/10-posting-journals" }),
      L(11, "reversing-journals", "Reversing Journals", { contentDir: "ch02/11-reversing-journals" }),
    ],
  },
  {
    n: 3,
    title: "Journal Approvals and Import",
    lessons: [
      L(12, "journal-approvals", "Journal Approvals", { contentDir: "ch03/12-journal-approvals" }),
      L(13, "importing-journals-with-fbdi-preview", "Importing Journals with FBDI Preview", { contentDir: "ch03/13-importing-journals-with-fbdi-preview" }),
      L(14, "journal-import-errors", "Journal Import Errors", { contentDir: "ch03/14-journal-import-errors" }),
      L(15, "auto-post-criteria", "Auto Post Criteria", { contentDir: "ch03/15-auto-post-criteria" }),
      L(16, "suspense-accounts-and-balancing", "Suspense Accounts and Balancing", { contentDir: "ch03/16-suspense-accounts-and-balancing" }),
    ],
  },
  {
    n: 4,
    title: "Automating Journals",
    lessons: [
      L(17, "recurring-journals-skeleton-standard-and-formula", "Recurring Journals: Skeleton, Standard and Formula", { contentDir: "ch04/17-recurring-journals-skeleton-standard-and-formula" }),
      L(18, "generating-recurring-journals", "Generating Recurring Journals", { contentDir: "ch04/18-generating-recurring-journals" }),
      L(19, "allocations-and-mass-allocations", "Allocations and Mass Allocations", { contentDir: "ch04/19-allocations-and-mass-allocations" }),
      L(20, "allocation-rules-and-pools", "Allocation Rules and Pools", { contentDir: "ch04/20-allocation-rules-and-pools" }),
      L(21, "journal-copy-and-reuse", "Journal Copy and Reuse", { contentDir: "ch04/21-journal-copy-and-reuse" }),
    ],
  },
  {
    n: 5,
    title: "Balances, Inquiries and Monitoring",
    lessons: [
      L(22, "account-balances-and-inquiries", "Account Balances and Inquiries", { contentDir: "ch05/22-account-balances-and-inquiries" }),
      L(23, "account-monitor", "Account Monitor", { contentDir: "ch05/23-account-monitor" }),
      L(24, "account-inspector", "Account Inspector", { contentDir: "ch05/24-account-inspector" }),
      L(25, "trial-balance-reports", "Trial Balance Reports", { contentDir: "ch05/25-trial-balance-reports" }),
      L(26, "journal-reports-and-audit-trails", "Journal Reports and Audit Trails", { contentDir: "ch05/26-journal-reports-and-audit-trails" }),
      L(27, "drilling-down-to-subledger-detail", "Drilling Down to Subledger Detail", { contentDir: "ch05/27-drilling-down-to-subledger-detail" }),
    ],
  },
  {
    n: 6,
    title: "Multi-Currency and Multi-Entity",
    lessons: [
      L(28, "foreign-currency-journals", "Foreign Currency Journals", { contentDir: "ch06/28-foreign-currency-journals" }),
      L(29, "period-end-revaluation", "Period-End Revaluation", { contentDir: "ch06/29-period-end-revaluation" }),
      L(30, "translation", "Translation", { contentDir: "ch06/30-translation" }),
      L(31, "intercompany-transactions", "Intercompany Transactions", { contentDir: "ch06/31-intercompany-transactions" }),
      L(32, "consolidation-concepts", "Consolidation Concepts", { contentDir: "ch06/32-consolidation-concepts" }),
    ],
  },
  {
    n: 7,
    title: "Period Close",
    lessons: [
      L(33, "period-end-close-checklist", "Period-End Close Checklist", { contentDir: "ch07/33-period-end-close-checklist" }),
      L(34, "reviewing-unposted-and-error-journals", "Reviewing Unposted and Error Journals", { contentDir: "ch07/34-reviewing-unposted-and-error-journals" }),
      L(35, "opening-and-closing-periods", "Opening and Closing Periods", { contentDir: "ch07/35-opening-and-closing-periods" }),
      L(36, "year-end-close-and-opening-balances", "Year-End Close and Opening Balances", { contentDir: "ch07/36-year-end-close-and-opening-balances" }),
      L(37, "general-ledger-troubleshooting-practice", "General Ledger Troubleshooting Practice", { contentDir: "ch07/37-general-ledger-troubleshooting-practice" }),
    ],
  },
];
