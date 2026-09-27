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
      L(1, "ledgers-and-balances-overview", "Ledgers and Balances Overview"),
      L(2, "how-balances-are-stored-and-summarized", "How Balances Are Stored and Summarized"),
      L(3, "the-general-ledger-work-area", "The General Ledger Work Area"),
      L(4, "accounting-periods-and-period-status", "Accounting Periods and Period Status"),
      L(5, "general-ledger-setup-review", "General Ledger Setup Review"),
    ],
  },
  {
    n: 2,
    title: "Manual Journals",
    lessons: [
      L(6, "creating-a-manual-journal", "Creating a Manual Journal"),
      L(7, "journal-sources-and-categories", "Journal Sources and Categories"),
      L(8, "journal-batches-and-journal-lines", "Journal Batches and Journal Lines"),
      L(9, "journal-validation-and-errors", "Journal Validation and Errors"),
      L(10, "posting-journals", "Posting Journals"),
      L(11, "reversing-journals", "Reversing Journals"),
    ],
  },
  {
    n: 3,
    title: "Journal Approvals and Import",
    lessons: [
      L(12, "journal-approvals", "Journal Approvals"),
      L(13, "importing-journals-with-fbdi-preview", "Importing Journals with FBDI Preview"),
      L(14, "journal-import-errors", "Journal Import Errors"),
      L(15, "auto-post-criteria", "Auto Post Criteria"),
      L(16, "suspense-accounts-and-balancing", "Suspense Accounts and Balancing"),
    ],
  },
  {
    n: 4,
    title: "Automating Journals",
    lessons: [
      L(17, "recurring-journals-skeleton-standard-and-formula", "Recurring Journals: Skeleton, Standard and Formula"),
      L(18, "generating-recurring-journals", "Generating Recurring Journals"),
      L(19, "allocations-and-mass-allocations", "Allocations and Mass Allocations"),
      L(20, "allocation-rules-and-pools", "Allocation Rules and Pools"),
      L(21, "journal-copy-and-reuse", "Journal Copy and Reuse"),
    ],
  },
  {
    n: 5,
    title: "Balances, Inquiries and Monitoring",
    lessons: [
      L(22, "account-balances-and-inquiries", "Account Balances and Inquiries"),
      L(23, "account-monitor", "Account Monitor"),
      L(24, "account-inspector", "Account Inspector"),
      L(25, "trial-balance-reports", "Trial Balance Reports"),
      L(26, "journal-reports-and-audit-trails", "Journal Reports and Audit Trails"),
      L(27, "drilling-down-to-subledger-detail", "Drilling Down to Subledger Detail"),
    ],
  },
  {
    n: 6,
    title: "Multi-Currency and Multi-Entity",
    lessons: [
      L(28, "foreign-currency-journals", "Foreign Currency Journals"),
      L(29, "period-end-revaluation", "Period-End Revaluation"),
      L(30, "translation", "Translation"),
      L(31, "intercompany-transactions", "Intercompany Transactions"),
      L(32, "consolidation-concepts", "Consolidation Concepts"),
    ],
  },
  {
    n: 7,
    title: "Period Close",
    lessons: [
      L(33, "period-end-close-checklist", "Period-End Close Checklist"),
      L(34, "reviewing-unposted-and-error-journals", "Reviewing Unposted and Error Journals"),
      L(35, "opening-and-closing-periods", "Opening and Closing Periods"),
      L(36, "year-end-close-and-opening-balances", "Year-End Close and Opening Balances"),
      L(37, "general-ledger-troubleshooting-practice", "General Ledger Troubleshooting Practice"),
    ],
  },
];
