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
      L(1, "subledger-accounting-overview", "Subledger Accounting Overview", { contentDir: "ch01/01-subledger-accounting-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603323/ltv-oracle-fusion-subledger-accounting/subledger-accounting-overview.mp4", durationLabel: "1 min 56 s" }),
      L(2, "accounting-events-and-event-classes", "Accounting Events and Event Classes", { contentDir: "ch01/02-accounting-events-and-event-classes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603999/ltv-oracle-fusion-subledger-accounting/accounting-events-and-event-classes.mp4", durationLabel: "2 min 7 s" }),
      L(3, "accounting-methods-and-rules", "Accounting Methods and Rules", { contentDir: "ch01/03-accounting-methods-and-rules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604653/ltv-oracle-fusion-subledger-accounting/accounting-methods-and-rules.mp4", durationLabel: "2 min 2 s" }),
      L(4, "subledger-applications-and-their-sources", "Subledger Applications and Their Sources", { contentDir: "ch01/04-subledger-applications-and-their-sources", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605424/ltv-oracle-fusion-subledger-accounting/subledger-applications-and-their-sources.mp4", durationLabel: "2 min 14 s" }),
    ],
  },
  {
    n: 2,
    title: "Accounting Rules",
    lessons: [
      L(5, "journal-line-types-and-journal-line-rules", "Journal Line Types and Journal Line Rules", { contentDir: "ch02/05-journal-line-types-and-journal-line-rules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606107/ltv-oracle-fusion-subledger-accounting/journal-line-types-and-journal-line-rules.mp4", durationLabel: "2 min 4 s" }),
      L(6, "account-rules-and-account-derivation", "Account Rules and Account Derivation", { contentDir: "ch02/06-account-rules-and-account-derivation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606735/ltv-oracle-fusion-subledger-accounting/account-rules-and-account-derivation.mp4", durationLabel: "1 min 52 s" }),
      L(7, "mapping-sets", "Mapping Sets", { contentDir: "ch02/07-mapping-sets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607395/ltv-oracle-fusion-subledger-accounting/mapping-sets.mp4", durationLabel: "2 min 4 s" }),
      L(8, "description-rules", "Description Rules", { contentDir: "ch02/08-description-rules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607996/ltv-oracle-fusion-subledger-accounting/description-rules.mp4", durationLabel: "1 min 54 s" }),
      L(9, "supporting-references", "Supporting References", { contentDir: "ch02/09-supporting-references", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608662/ltv-oracle-fusion-subledger-accounting/supporting-references.mp4", durationLabel: "2 min 7 s" }),
    ],
  },
  {
    n: 3,
    title: "Application Accounting Definitions",
    lessons: [
      L(10, "application-accounting-definitions", "Application Accounting Definitions", { contentDir: "ch03/10-application-accounting-definitions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609410/ltv-oracle-fusion-subledger-accounting/application-accounting-definitions.mp4", durationLabel: "2 min 10 s" }),
      L(11, "copying-and-modifying-seeded-definitions", "Copying and Modifying Seeded Definitions", { contentDir: "ch03/11-copying-and-modifying-seeded-definitions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610073/ltv-oracle-fusion-subledger-accounting/copying-and-modifying-seeded-definitions.mp4", durationLabel: "1 min 57 s" }),
      L(12, "subledger-accounting-methods", "Subledger Accounting Methods", { contentDir: "ch03/12-subledger-accounting-methods", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610649/ltv-oracle-fusion-subledger-accounting/subledger-accounting-methods.mp4", durationLabel: "2 min 0 s" }),
      L(13, "assigning-methods-to-ledgers", "Assigning Methods to Ledgers", { contentDir: "ch03/13-assigning-methods-to-ledgers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792611571/ltv-oracle-fusion-subledger-accounting/assigning-methods-to-ledgers.mp4", durationLabel: "2 min 6 s" }),
      L(14, "validating-and-activating-definitions", "Validating and Activating Definitions", { contentDir: "ch03/14-validating-and-activating-definitions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792612512/ltv-oracle-fusion-subledger-accounting/validating-and-activating-definitions.mp4", durationLabel: "2 min 12 s" }),
    ],
  },
  {
    n: 4,
    title: "Creating Accounting",
    lessons: [
      L(15, "creating-accounting-draft-vs-final", "Creating Accounting: Draft vs. Final", { contentDir: "ch04/15-creating-accounting-draft-vs-final", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632773/ltv-oracle-fusion-subledger-accounting/creating-accounting-draft-vs-final.mp4", durationLabel: "2 min 0 s" }),
      L(16, "creating-accounting-in-payables-and-receivables", "Creating Accounting in Payables and Receivables", { contentDir: "ch04/16-creating-accounting-in-payables-and-receivables", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632862/ltv-oracle-fusion-subledger-accounting/creating-accounting-in-payables-and-receivables.mp4", durationLabel: "2 min 6 s" }),
      L(17, "reviewing-subledger-journal-entries", "Reviewing Subledger Journal Entries", { contentDir: "ch04/17-reviewing-subledger-journal-entries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792632938/ltv-oracle-fusion-subledger-accounting/reviewing-subledger-journal-entries.mp4", durationLabel: "1 min 52 s" }),
      L(18, "accounting-errors-and-corrections", "Accounting Errors and Corrections", { contentDir: "ch04/18-accounting-errors-and-corrections", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633026/ltv-oracle-fusion-subledger-accounting/accounting-errors-and-corrections.mp4", durationLabel: "2 min 4 s" }),
      L(19, "transferring-to-general-ledger", "Transferring to General Ledger", { contentDir: "ch04/19-transferring-to-general-ledger", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633106/ltv-oracle-fusion-subledger-accounting/transferring-to-general-ledger.mp4", durationLabel: "1 min 54 s" }),
      L(20, "journal-import-from-subledgers", "Journal Import from Subledgers", { contentDir: "ch04/20-journal-import-from-subledgers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633202/ltv-oracle-fusion-subledger-accounting/journal-import-from-subledgers.mp4", durationLabel: "2 min 10 s" }),
    ],
  },
  {
    n: 5,
    title: "Reporting and Reconciliation",
    lessons: [
      L(21, "subledger-reports-journal-entries-and-account-analysis", "Subledger Reports: Journal Entries and Account Analysis", { contentDir: "ch05/21-subledger-reports-journal-entries-and-account-analysis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633295/ltv-oracle-fusion-subledger-accounting/subledger-reports-journal-entries-and-account-analysis.mp4", durationLabel: "2 min 3 s" }),
      L(22, "open-account-balances-listings", "Open Account Balances Listings", { contentDir: "ch05/22-open-account-balances-listings", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633383/ltv-oracle-fusion-subledger-accounting/open-account-balances-listings.mp4", durationLabel: "1 min 59 s" }),
      L(23, "reconciling-subledgers-to-general-ledger", "Reconciling Subledgers to General Ledger", { contentDir: "ch05/23-reconciling-subledgers-to-general-ledger", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633469/ltv-oracle-fusion-subledger-accounting/reconciling-subledgers-to-general-ledger.mp4", durationLabel: "1 min 56 s" }),
      L(24, "accounting-attribute-assignments", "Accounting Attribute Assignments", { contentDir: "ch05/24-accounting-attribute-assignments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633561/ltv-oracle-fusion-subledger-accounting/accounting-attribute-assignments.mp4", durationLabel: "2 min 3 s" }),
      L(25, "subledger-accounting-troubleshooting-practice", "Subledger Accounting Troubleshooting Practice", { contentDir: "ch05/25-subledger-accounting-troubleshooting-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633640/ltv-oracle-fusion-subledger-accounting/subledger-accounting-troubleshooting-practice.mp4", durationLabel: "1 min 52 s" }),
    ],
  },
  {
    n: 6,
    title: "Advanced Topics",
    lessons: [
      L(26, "multiple-accounting-representations", "Multiple Accounting Representations", { contentDir: "ch06/26-multiple-accounting-representations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633736/ltv-oracle-fusion-subledger-accounting/multiple-accounting-representations.mp4", durationLabel: "2 min 11 s" }),
      L(27, "data-access-and-security-in-subledger-accounting", "Data Access and Security in Subledger Accounting", { contentDir: "ch06/27-data-access-and-security-in-subledger-accounting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633828/ltv-oracle-fusion-subledger-accounting/data-access-and-security-in-subledger-accounting.mp4", durationLabel: "2 min 9 s" }),
      L(28, "rebuilding-accounting-after-rule-changes", "Rebuilding Accounting After Rule Changes", { contentDir: "ch06/28-rebuilding-accounting-after-rule-changes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792633915/ltv-oracle-fusion-subledger-accounting/rebuilding-accounting-after-rule-changes.mp4", durationLabel: "1 min 59 s" }),
      L(29, "design-patterns-for-a-manufacturing-company", "Design Patterns for a Manufacturing Company", { contentDir: "ch06/29-design-patterns-for-a-manufacturing-company", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792634009/ltv-oracle-fusion-subledger-accounting/design-patterns-for-a-manufacturing-company.mp4", durationLabel: "2 min 9 s" }),
    ],
  },
];
