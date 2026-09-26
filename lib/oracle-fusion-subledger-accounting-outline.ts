// The Subledger Accounting course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 04. Oracle Fusion Cloud Subledger Accounting.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/oracle-fusion-subledger-accounting/
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

export const ORACLE_FUSION_SUBLEDGER_ACCOUNTING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Subledger Accounting Concepts",
    lessons: [
      L(1, "subledger-accounting-overview", "Subledger Accounting Overview"),
      L(2, "accounting-events-and-event-classes", "Accounting Events and Event Classes"),
      L(3, "accounting-methods-and-rules", "Accounting Methods and Rules"),
    ],
  },
  {
    n: 2,
    title: "Subledger Journals",
    lessons: [
      L(4, "journal-lines-and-account-derivation", "Journal Lines and Account Derivation"),
      L(5, "creating-accounting-and-reviewing-subledger-entries", "Creating Accounting and Reviewing Subledger Entries"),
      L(6, "transferring-to-general-ledger", "Transferring to General Ledger"),
    ],
  },
  {
    n: 3,
    title: "Reconciliation",
    lessons: [
      L(7, "reconciling-subledgers-to-general-ledger", "Reconciling Subledgers to General Ledger"),
    ],
  },
];
