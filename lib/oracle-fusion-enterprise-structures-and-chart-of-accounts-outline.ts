// The Enterprise Structures & Chart of Accounts course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 02 — the first hands-on course. Lesson 1 walks students through activating their practice environment.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/oracle-fusion-enterprise-structures-and-chart-of-accounts/
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

export const ORACLE_FUSION_ENTERPRISE_STRUCTURES_AND_CHART_OF_ACCOUNTS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Getting Started in the Practice Environment",
    lessons: [
      L(1, "activate-your-practice-environment-and-sign-in", "Activate Your Practice Environment and Sign In"),
      L(2, "finding-your-way-around-setup-and-maintenance", "Finding Your Way Around Setup and Maintenance"),
      L(3, "enterprise-structures-overview", "Enterprise Structures Overview"),
      L(4, "functional-setup-manager-and-task-lists", "Functional Setup Manager and Task Lists"),
    ],
  },
  {
    n: 2,
    title: "Legal Entities and Ledgers",
    lessons: [
      L(5, "enterprise-structure-design-principles", "Enterprise Structure Design Principles"),
      L(6, "legal-entities-and-legal-reporting-units", "Legal Entities and Legal Reporting Units"),
      L(7, "ledgers-primary-secondary-and-reporting", "Ledgers: Primary, Secondary and Reporting"),
      L(8, "ledger-sets", "Ledger Sets"),
      L(9, "accounting-configuration-manager-walkthrough", "Accounting Configuration Manager Walkthrough"),
    ],
  },
  {
    n: 3,
    title: "Business Units and Reference Data",
    lessons: [
      L(10, "business-units", "Business Units"),
      L(11, "business-unit-functions-and-assignments", "Business Unit Functions and Assignments"),
      L(12, "reference-data-sets", "Reference Data Sets"),
      L(13, "shared-and-non-shared-reference-data", "Shared and Non-Shared Reference Data"),
      L(14, "locations-geographies-and-addresses", "Locations, Geographies and Addresses"),
    ],
  },
  {
    n: 4,
    title: "Calendars and Currencies",
    lessons: [
      L(15, "accounting-calendars-and-periods", "Accounting Calendars and Periods"),
      L(16, "period-types-and-adjusting-periods", "Period Types and Adjusting Periods"),
      L(17, "currencies-and-conversion-rate-types", "Currencies and Conversion Rate Types"),
      L(18, "daily-rates-and-currency-conversion", "Daily Rates and Currency Conversion"),
      L(19, "opening-the-first-accounting-period", "Opening the First Accounting Period"),
    ],
  },
  {
    n: 5,
    title: "Chart of Accounts",
    lessons: [
      L(20, "chart-of-accounts-structure-and-segments", "Chart of Accounts Structure and Segments"),
      L(21, "segment-labels-balancing-cost-center-and-natural-account", "Segment Labels: Balancing, Cost Center and Natural Account"),
      L(22, "value-sets-and-values", "Value Sets and Values"),
      L(23, "account-hierarchies-and-trees", "Account Hierarchies and Trees"),
      L(24, "cross-validation-rules", "Cross-Validation Rules"),
    ],
  },
  {
    n: 6,
    title: "Putting It Together",
    lessons: [
      L(25, "designing-a-chart-of-accounts-for-a-manufacturer", "Designing a Chart of Accounts for a Manufacturer"),
      L(26, "deploying-flexfields-and-structures", "Deploying Flexfields and Structures"),
      L(27, "rapid-implementation-spreadsheets", "Rapid Implementation Spreadsheets"),
      L(28, "testing-and-reviewing-your-enterprise-structure", "Testing and Reviewing Your Enterprise Structure"),
      L(29, "common-enterprise-structure-mistakes", "Common Enterprise Structure Mistakes"),
    ],
  },
];
