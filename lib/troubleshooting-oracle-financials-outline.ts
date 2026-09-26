// The Troubleshooting Oracle Financials course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 08. Eight realistic production-support tickets; each is diagnose, resolve, document.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/troubleshooting-oracle-financials/
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

export const TROUBLESHOOTING_ORACLE_FINANCIALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Payables and Ledger Tickets",
    lessons: [
      L(1, "ticket-ap-invoice-will-not-validate", "Ticket: AP Invoice Will Not Validate"),
      L(2, "ticket-journal-will-not-post", "Ticket: Journal Will Not Post"),
      L(3, "ticket-user-cannot-access-a-business-unit", "Ticket: User Cannot Access a Business Unit"),
      L(4, "ticket-payment-is-missing-from-gl", "Ticket: Payment Is Missing from GL"),
    ],
  },
  {
    n: 2,
    title: "Setup, Data and Close Tickets",
    lessons: [
      L(5, "ticket-supplier-was-configured-incorrectly", "Ticket: Supplier Was Configured Incorrectly"),
      L(6, "ticket-fbdi-import-failed", "Ticket: FBDI Import Failed"),
      L(7, "ticket-ar-does-not-reconcile-with-gl", "Ticket: AR Does Not Reconcile with GL"),
      L(8, "ticket-accounting-period-will-not-close", "Ticket: Accounting Period Will Not Close"),
    ],
  },
];
