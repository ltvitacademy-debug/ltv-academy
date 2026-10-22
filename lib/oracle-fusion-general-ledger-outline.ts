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
      L(1, "ledgers-and-balances-overview", "Ledgers and Balances Overview", { contentDir: "ch01/01-ledgers-and-balances-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625151/ltv-oracle-fusion-general-ledger/ledgers-and-balances-overview.mp4", durationLabel: "1 min 45 s" }),
      L(2, "how-balances-are-stored-and-summarized", "How Balances Are Stored and Summarized", { contentDir: "ch01/02-how-balances-are-stored-and-summarized", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625286/ltv-oracle-fusion-general-ledger/how-balances-are-stored-and-summarized.mp4", durationLabel: "1 min 46 s" }),
      L(3, "the-general-ledger-work-area", "The General Ledger Work Area", { contentDir: "ch01/03-the-general-ledger-work-area", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625408/ltv-oracle-fusion-general-ledger/the-general-ledger-work-area.mp4", durationLabel: "1 min 31 s" }),
      L(4, "accounting-periods-and-period-status", "Accounting Periods and Period Status", { contentDir: "ch01/04-accounting-periods-and-period-status", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625539/ltv-oracle-fusion-general-ledger/accounting-periods-and-period-status.mp4", durationLabel: "1 min 41 s" }),
      L(5, "general-ledger-setup-review", "General Ledger Setup Review", { contentDir: "ch01/05-general-ledger-setup-review", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625662/ltv-oracle-fusion-general-ledger/general-ledger-setup-review.mp4", durationLabel: "1 min 38 s" }),
    ],
  },
  {
    n: 2,
    title: "Manual Journals",
    lessons: [
      L(6, "creating-a-manual-journal", "Creating a Manual Journal", { contentDir: "ch02/06-creating-a-manual-journal", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625767/ltv-oracle-fusion-general-ledger/creating-a-manual-journal.mp4", durationLabel: "1 min 19 s" }),
      L(7, "journal-sources-and-categories", "Journal Sources and Categories", { contentDir: "ch02/07-journal-sources-and-categories", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625909/ltv-oracle-fusion-general-ledger/journal-sources-and-categories.mp4", durationLabel: "1 min 46 s" }),
      L(8, "journal-batches-and-journal-lines", "Journal Batches and Journal Lines", { contentDir: "ch02/08-journal-batches-and-journal-lines", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626019/ltv-oracle-fusion-general-ledger/journal-batches-and-journal-lines.mp4", durationLabel: "1 min 28 s" }),
      L(9, "journal-validation-and-errors", "Journal Validation and Errors", { contentDir: "ch02/09-journal-validation-and-errors", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626132/ltv-oracle-fusion-general-ledger/journal-validation-and-errors.mp4", durationLabel: "1 min 28 s" }),
      L(10, "posting-journals", "Posting Journals", { contentDir: "ch02/10-posting-journals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626253/ltv-oracle-fusion-general-ledger/posting-journals.mp4", durationLabel: "1 min 36 s" }),
      L(11, "reversing-journals", "Reversing Journals", { contentDir: "ch02/11-reversing-journals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626383/ltv-oracle-fusion-general-ledger/reversing-journals.mp4", durationLabel: "1 min 34 s" }),
    ],
  },
  {
    n: 3,
    title: "Journal Approvals and Import",
    lessons: [
      L(12, "journal-approvals", "Journal Approvals", { contentDir: "ch03/12-journal-approvals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626522/ltv-oracle-fusion-general-ledger/journal-approvals.mp4", durationLabel: "1 min 45 s" }),
      L(13, "importing-journals-with-fbdi-preview", "Importing Journals with FBDI Preview", { contentDir: "ch03/13-importing-journals-with-fbdi-preview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626659/ltv-oracle-fusion-general-ledger/importing-journals-with-fbdi-preview.mp4", durationLabel: "1 min 41 s" }),
      L(14, "journal-import-errors", "Journal Import Errors", { contentDir: "ch03/14-journal-import-errors", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626792/ltv-oracle-fusion-general-ledger/journal-import-errors.mp4", durationLabel: "1 min 38 s" }),
      L(15, "auto-post-criteria", "Auto Post Criteria", { contentDir: "ch03/15-auto-post-criteria", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626929/ltv-oracle-fusion-general-ledger/auto-post-criteria.mp4", durationLabel: "1 min 37 s" }),
      L(16, "suspense-accounts-and-balancing", "Suspense Accounts and Balancing", { contentDir: "ch03/16-suspense-accounts-and-balancing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627053/ltv-oracle-fusion-general-ledger/suspense-accounts-and-balancing.mp4", durationLabel: "1 min 28 s" }),
    ],
  },
  {
    n: 4,
    title: "Automating Journals",
    lessons: [
      L(17, "recurring-journals-skeleton-standard-and-formula", "Recurring Journals: Skeleton, Standard and Formula", { contentDir: "ch04/17-recurring-journals-skeleton-standard-and-formula", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627180/ltv-oracle-fusion-general-ledger/recurring-journals-skeleton-standard-and-formula.mp4", durationLabel: "1 min 41 s" }),
      L(18, "generating-recurring-journals", "Generating Recurring Journals", { contentDir: "ch04/18-generating-recurring-journals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627294/ltv-oracle-fusion-general-ledger/generating-recurring-journals.mp4", durationLabel: "1 min 39 s" }),
      L(19, "allocations-and-mass-allocations", "Allocations and Mass Allocations", { contentDir: "ch04/19-allocations-and-mass-allocations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627426/ltv-oracle-fusion-general-ledger/allocations-and-mass-allocations.mp4", durationLabel: "1 min 44 s" }),
      L(20, "allocation-rules-and-pools", "Allocation Rules and Pools", { contentDir: "ch04/20-allocation-rules-and-pools", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627567/ltv-oracle-fusion-general-ledger/allocation-rules-and-pools.mp4", durationLabel: "1 min 44 s" }),
      L(21, "journal-copy-and-reuse", "Journal Copy and Reuse", { contentDir: "ch04/21-journal-copy-and-reuse", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627708/ltv-oracle-fusion-general-ledger/journal-copy-and-reuse.mp4", durationLabel: "1 min 35 s" }),
    ],
  },
  {
    n: 5,
    title: "Balances, Inquiries and Monitoring",
    lessons: [
      L(22, "account-balances-and-inquiries", "Account Balances and Inquiries", { contentDir: "ch05/22-account-balances-and-inquiries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627859/ltv-oracle-fusion-general-ledger/account-balances-and-inquiries.mp4", durationLabel: "1 min 47 s" }),
      L(23, "account-monitor", "Account Monitor", { contentDir: "ch05/23-account-monitor", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627972/ltv-oracle-fusion-general-ledger/account-monitor.mp4", durationLabel: "1 min 27 s" }),
      L(24, "account-inspector", "Account Inspector", { contentDir: "ch05/24-account-inspector", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792628095/ltv-oracle-fusion-general-ledger/account-inspector.mp4", durationLabel: "1 min 38 s" }),
      L(25, "trial-balance-reports", "Trial Balance Reports", { contentDir: "ch05/25-trial-balance-reports", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792628184/ltv-oracle-fusion-general-ledger/trial-balance-reports.mp4", durationLabel: "1 min 30 s" }),
      L(26, "journal-reports-and-audit-trails", "Journal Reports and Audit Trails", { contentDir: "ch05/26-journal-reports-and-audit-trails", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792628265/ltv-oracle-fusion-general-ledger/journal-reports-and-audit-trails.mp4", durationLabel: "1 min 30 s" }),
      L(27, "drilling-down-to-subledger-detail", "Drilling Down to Subledger Detail", { contentDir: "ch05/27-drilling-down-to-subledger-detail", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792628355/ltv-oracle-fusion-general-ledger/drilling-down-to-subledger-detail.mp4", durationLabel: "1 min 34 s" }),
    ],
  },
  {
    n: 6,
    title: "Multi-Currency and Multi-Entity",
    lessons: [
      L(28, "foreign-currency-journals", "Foreign Currency Journals", { contentDir: "ch06/28-foreign-currency-journals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792628450/ltv-oracle-fusion-general-ledger/foreign-currency-journals.mp4", durationLabel: "1 min 41 s" }),
      L(29, "period-end-revaluation", "Period-End Revaluation", { contentDir: "ch06/29-period-end-revaluation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792628543/ltv-oracle-fusion-general-ledger/period-end-revaluation.mp4", durationLabel: "1 min 39 s" }),
      L(30, "translation", "Translation", { contentDir: "ch06/30-translation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792628639/ltv-oracle-fusion-general-ledger/translation.mp4", durationLabel: "1 min 36 s" }),
      L(31, "intercompany-transactions", "Intercompany Transactions", { contentDir: "ch06/31-intercompany-transactions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792628732/ltv-oracle-fusion-general-ledger/intercompany-transactions.mp4", durationLabel: "1 min 37 s" }),
      L(32, "consolidation-concepts", "Consolidation Concepts", { contentDir: "ch06/32-consolidation-concepts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792628826/ltv-oracle-fusion-general-ledger/consolidation-concepts.mp4", durationLabel: "1 min 42 s" }),
    ],
  },
  {
    n: 7,
    title: "Period Close",
    lessons: [
      L(33, "period-end-close-checklist", "Period-End Close Checklist", { contentDir: "ch07/33-period-end-close-checklist", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792628907/ltv-oracle-fusion-general-ledger/period-end-close-checklist.mp4", durationLabel: "1 min 30 s" }),
      L(34, "reviewing-unposted-and-error-journals", "Reviewing Unposted and Error Journals", { contentDir: "ch07/34-reviewing-unposted-and-error-journals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792628988/ltv-oracle-fusion-general-ledger/reviewing-unposted-and-error-journals.mp4", durationLabel: "1 min 29 s" }),
      L(35, "opening-and-closing-periods", "Opening and Closing Periods", { contentDir: "ch07/35-opening-and-closing-periods", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629052/ltv-oracle-fusion-general-ledger/opening-and-closing-periods.mp4", durationLabel: "1 min 30 s" }),
      L(36, "year-end-close-and-opening-balances", "Year-End Close and Opening Balances", { contentDir: "ch07/36-year-end-close-and-opening-balances", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629145/ltv-oracle-fusion-general-ledger/year-end-close-and-opening-balances.mp4", durationLabel: "1 min 34 s" }),
      L(37, "general-ledger-troubleshooting-practice", "General Ledger Troubleshooting Practice", { contentDir: "ch07/37-general-ledger-troubleshooting-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629240/ltv-oracle-fusion-general-ledger/general-ledger-troubleshooting-practice.mp4", durationLabel: "1 min 46 s" }),
    ],
  },
];
