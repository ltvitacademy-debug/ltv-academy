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
      L(1, "subledger-accounting-overview", "Subledger Accounting Overview", { contentDir: "ch01/01-subledger-accounting-overview" }),
      L(2, "accounting-events-and-event-classes", "Accounting Events and Event Classes", { contentDir: "ch01/02-accounting-events-and-event-classes" }),
      L(3, "accounting-methods-and-rules", "Accounting Methods and Rules", { contentDir: "ch01/03-accounting-methods-and-rules" }),
      L(4, "subledger-applications-and-their-sources", "Subledger Applications and Their Sources", { contentDir: "ch01/04-subledger-applications-and-their-sources" }),
    ],
  },
  {
    n: 2,
    title: "Accounting Rules",
    lessons: [
      L(5, "journal-line-types-and-journal-line-rules", "Journal Line Types and Journal Line Rules", { contentDir: "ch02/05-journal-line-types-and-journal-line-rules" }),
      L(6, "account-rules-and-account-derivation", "Account Rules and Account Derivation", { contentDir: "ch02/06-account-rules-and-account-derivation" }),
      L(7, "mapping-sets", "Mapping Sets", { contentDir: "ch02/07-mapping-sets" }),
      L(8, "description-rules", "Description Rules", { contentDir: "ch02/08-description-rules" }),
      L(9, "supporting-references", "Supporting References", { contentDir: "ch02/09-supporting-references" }),
    ],
  },
  {
    n: 3,
    title: "Application Accounting Definitions",
    lessons: [
      L(10, "application-accounting-definitions", "Application Accounting Definitions", { contentDir: "ch03/10-application-accounting-definitions" }),
      L(11, "copying-and-modifying-seeded-definitions", "Copying and Modifying Seeded Definitions", { contentDir: "ch03/11-copying-and-modifying-seeded-definitions" }),
      L(12, "subledger-accounting-methods", "Subledger Accounting Methods", { contentDir: "ch03/12-subledger-accounting-methods" }),
      L(13, "assigning-methods-to-ledgers", "Assigning Methods to Ledgers", { contentDir: "ch03/13-assigning-methods-to-ledgers" }),
      L(14, "validating-and-activating-definitions", "Validating and Activating Definitions", { contentDir: "ch03/14-validating-and-activating-definitions" }),
    ],
  },
  {
    n: 4,
    title: "Creating Accounting",
    lessons: [
      L(15, "creating-accounting-draft-vs-final", "Creating Accounting: Draft vs. Final", { contentDir: "ch04/15-creating-accounting-draft-vs-final" }),
      L(16, "creating-accounting-in-payables-and-receivables", "Creating Accounting in Payables and Receivables", { contentDir: "ch04/16-creating-accounting-in-payables-and-receivables" }),
      L(17, "reviewing-subledger-journal-entries", "Reviewing Subledger Journal Entries", { contentDir: "ch04/17-reviewing-subledger-journal-entries" }),
      L(18, "accounting-errors-and-corrections", "Accounting Errors and Corrections", { contentDir: "ch04/18-accounting-errors-and-corrections" }),
      L(19, "transferring-to-general-ledger", "Transferring to General Ledger", { contentDir: "ch04/19-transferring-to-general-ledger" }),
      L(20, "journal-import-from-subledgers", "Journal Import from Subledgers", { contentDir: "ch04/20-journal-import-from-subledgers" }),
    ],
  },
  {
    n: 5,
    title: "Reporting and Reconciliation",
    lessons: [
      L(21, "subledger-reports-journal-entries-and-account-analysis", "Subledger Reports: Journal Entries and Account Analysis", { contentDir: "ch05/21-subledger-reports-journal-entries-and-account-analysis" }),
      L(22, "open-account-balances-listings", "Open Account Balances Listings", { contentDir: "ch05/22-open-account-balances-listings" }),
      L(23, "reconciling-subledgers-to-general-ledger", "Reconciling Subledgers to General Ledger", { contentDir: "ch05/23-reconciling-subledgers-to-general-ledger" }),
      L(24, "accounting-attribute-assignments", "Accounting Attribute Assignments", { contentDir: "ch05/24-accounting-attribute-assignments" }),
      L(25, "subledger-accounting-troubleshooting-practice", "Subledger Accounting Troubleshooting Practice", { contentDir: "ch05/25-subledger-accounting-troubleshooting-practice" }),
    ],
  },
  {
    n: 6,
    title: "Advanced Topics",
    lessons: [
      L(26, "multiple-accounting-representations", "Multiple Accounting Representations", { contentDir: "ch06/26-multiple-accounting-representations" }),
      L(27, "data-access-and-security-in-subledger-accounting", "Data Access and Security in Subledger Accounting", { contentDir: "ch06/27-data-access-and-security-in-subledger-accounting" }),
      L(28, "rebuilding-accounting-after-rule-changes", "Rebuilding Accounting After Rule Changes", { contentDir: "ch06/28-rebuilding-accounting-after-rule-changes" }),
      L(29, "design-patterns-for-a-manufacturing-company", "Design Patterns for a Manufacturing Company", { contentDir: "ch06/29-design-patterns-for-a-manufacturing-company" }),
    ],
  },
];
