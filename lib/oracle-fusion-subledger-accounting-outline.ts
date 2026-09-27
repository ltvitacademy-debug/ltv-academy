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
      L(4, "subledger-applications-and-their-sources", "Subledger Applications and Their Sources"),
    ],
  },
  {
    n: 2,
    title: "Accounting Rules",
    lessons: [
      L(5, "journal-line-types-and-journal-line-rules", "Journal Line Types and Journal Line Rules"),
      L(6, "account-rules-and-account-derivation", "Account Rules and Account Derivation"),
      L(7, "mapping-sets", "Mapping Sets"),
      L(8, "description-rules", "Description Rules"),
      L(9, "supporting-references", "Supporting References"),
    ],
  },
  {
    n: 3,
    title: "Application Accounting Definitions",
    lessons: [
      L(10, "application-accounting-definitions", "Application Accounting Definitions"),
      L(11, "copying-and-modifying-seeded-definitions", "Copying and Modifying Seeded Definitions"),
      L(12, "subledger-accounting-methods", "Subledger Accounting Methods"),
      L(13, "assigning-methods-to-ledgers", "Assigning Methods to Ledgers"),
      L(14, "validating-and-activating-definitions", "Validating and Activating Definitions"),
    ],
  },
  {
    n: 4,
    title: "Creating Accounting",
    lessons: [
      L(15, "creating-accounting-draft-vs-final", "Creating Accounting: Draft vs. Final"),
      L(16, "creating-accounting-in-payables-and-receivables", "Creating Accounting in Payables and Receivables"),
      L(17, "reviewing-subledger-journal-entries", "Reviewing Subledger Journal Entries"),
      L(18, "accounting-errors-and-corrections", "Accounting Errors and Corrections"),
      L(19, "transferring-to-general-ledger", "Transferring to General Ledger"),
      L(20, "journal-import-from-subledgers", "Journal Import from Subledgers"),
    ],
  },
  {
    n: 5,
    title: "Reporting and Reconciliation",
    lessons: [
      L(21, "subledger-reports-journal-entries-and-account-analysis", "Subledger Reports: Journal Entries and Account Analysis"),
      L(22, "open-account-balances-listings", "Open Account Balances Listings"),
      L(23, "reconciling-subledgers-to-general-ledger", "Reconciling Subledgers to General Ledger"),
      L(24, "accounting-attribute-assignments", "Accounting Attribute Assignments"),
      L(25, "subledger-accounting-troubleshooting-practice", "Subledger Accounting Troubleshooting Practice"),
    ],
  },
  {
    n: 6,
    title: "Advanced Topics",
    lessons: [
      L(26, "multiple-accounting-representations", "Multiple Accounting Representations"),
      L(27, "data-access-and-security-in-subledger-accounting", "Data Access and Security in Subledger Accounting"),
      L(28, "rebuilding-accounting-after-rule-changes", "Rebuilding Accounting After Rule Changes"),
      L(29, "design-patterns-for-a-manufacturing-company", "Design Patterns for a Manufacturing Company"),
    ],
  },
];
