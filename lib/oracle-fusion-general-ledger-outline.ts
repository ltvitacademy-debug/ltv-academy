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
    title: "Journals",
    lessons: [
      L(1, "ledgers-and-balances-overview", "Ledgers and Balances Overview"),
      L(2, "manual-journals-sources-and-categories", "Manual Journals: Sources and Categories"),
      L(3, "posting-journals", "Posting Journals"),
      L(4, "journal-approvals-and-reversals", "Journal Approvals and Reversals"),
    ],
  },
  {
    n: 2,
    title: "Automating Journals",
    lessons: [
      L(5, "recurring-journals", "Recurring Journals"),
      L(6, "allocations-and-mass-allocations", "Allocations and Mass Allocations"),
    ],
  },
  {
    n: 3,
    title: "Balances and Periods",
    lessons: [
      L(7, "account-balances-and-inquiries", "Account Balances and Inquiries"),
      L(8, "account-monitor-and-account-inspector", "Account Monitor and Account Inspector"),
      L(9, "accounting-period-management", "Accounting Period Management"),
      L(10, "period-end-close-in-general-ledger", "Period-End Close in General Ledger"),
    ],
  },
];
