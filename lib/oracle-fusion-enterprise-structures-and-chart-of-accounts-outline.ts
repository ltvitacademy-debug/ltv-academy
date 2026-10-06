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
      L(1, "activate-your-practice-environment-and-sign-in", "Activate Your Practice Environment and Sign In", { contentDir: "ch01/01-activate-your-practice-environment-and-sign-in" }),
      L(2, "finding-your-way-around-setup-and-maintenance", "Finding Your Way Around Setup and Maintenance", { contentDir: "ch01/02-finding-your-way-around-setup-and-maintenance" }),
      L(3, "enterprise-structures-overview", "Enterprise Structures Overview", { contentDir: "ch01/03-enterprise-structures-overview" }),
      L(4, "functional-setup-manager-and-task-lists", "Functional Setup Manager and Task Lists", { contentDir: "ch01/04-functional-setup-manager-and-task-lists" }),
    ],
  },
  {
    n: 2,
    title: "Legal Entities and Ledgers",
    lessons: [
      L(5, "enterprise-structure-design-principles", "Enterprise Structure Design Principles", { contentDir: "ch02/05-enterprise-structure-design-principles" }),
      L(6, "legal-entities-and-legal-reporting-units", "Legal Entities and Legal Reporting Units", { contentDir: "ch02/06-legal-entities-and-legal-reporting-units" }),
      L(7, "ledgers-primary-secondary-and-reporting", "Ledgers: Primary, Secondary and Reporting", { contentDir: "ch02/07-ledgers-primary-secondary-and-reporting" }),
      L(8, "ledger-sets", "Ledger Sets", { contentDir: "ch02/08-ledger-sets" }),
      L(9, "accounting-configuration-manager-walkthrough", "Accounting Configuration Manager Walkthrough", { contentDir: "ch02/09-accounting-configuration-manager-walkthrough" }),
    ],
  },
  {
    n: 3,
    title: "Business Units and Reference Data",
    lessons: [
      L(10, "business-units", "Business Units", { contentDir: "ch03/10-business-units" }),
      L(11, "business-unit-functions-and-assignments", "Business Unit Functions and Assignments", { contentDir: "ch03/11-business-unit-functions-and-assignments" }),
      L(12, "reference-data-sets", "Reference Data Sets", { contentDir: "ch03/12-reference-data-sets" }),
      L(13, "shared-and-non-shared-reference-data", "Shared and Non-Shared Reference Data", { contentDir: "ch03/13-shared-and-non-shared-reference-data" }),
      L(14, "locations-geographies-and-addresses", "Locations, Geographies and Addresses", { contentDir: "ch03/14-locations-geographies-and-addresses" }),
    ],
  },
  {
    n: 4,
    title: "Calendars and Currencies",
    lessons: [
      L(15, "accounting-calendars-and-periods", "Accounting Calendars and Periods", { contentDir: "ch04/15-accounting-calendars-and-periods" }),
      L(16, "period-types-and-adjusting-periods", "Period Types and Adjusting Periods", { contentDir: "ch04/16-period-types-and-adjusting-periods" }),
      L(17, "currencies-and-conversion-rate-types", "Currencies and Conversion Rate Types", { contentDir: "ch04/17-currencies-and-conversion-rate-types" }),
      L(18, "daily-rates-and-currency-conversion", "Daily Rates and Currency Conversion", { contentDir: "ch04/18-daily-rates-and-currency-conversion" }),
      L(19, "opening-the-first-accounting-period", "Opening the First Accounting Period", { contentDir: "ch04/19-opening-the-first-accounting-period" }),
    ],
  },
  {
    n: 5,
    title: "Chart of Accounts",
    lessons: [
      L(20, "chart-of-accounts-structure-and-segments", "Chart of Accounts Structure and Segments", { contentDir: "ch05/20-chart-of-accounts-structure-and-segments" }),
      L(21, "segment-labels-balancing-cost-center-and-natural-account", "Segment Labels: Balancing, Cost Center and Natural Account", { contentDir: "ch05/21-segment-labels-balancing-cost-center-and-natural-account" }),
      L(22, "value-sets-and-values", "Value Sets and Values", { contentDir: "ch05/22-value-sets-and-values" }),
      L(23, "account-hierarchies-and-trees", "Account Hierarchies and Trees", { contentDir: "ch05/23-account-hierarchies-and-trees" }),
      L(24, "cross-validation-rules", "Cross-Validation Rules", { contentDir: "ch05/24-cross-validation-rules" }),
    ],
  },
  {
    n: 6,
    title: "Putting It Together",
    lessons: [
      L(25, "designing-a-chart-of-accounts-for-a-manufacturer", "Designing a Chart of Accounts for a Manufacturer", { contentDir: "ch06/25-designing-a-chart-of-accounts-for-a-manufacturer" }),
      L(26, "deploying-flexfields-and-structures", "Deploying Flexfields and Structures", { contentDir: "ch06/26-deploying-flexfields-and-structures" }),
      L(27, "rapid-implementation-spreadsheets", "Rapid Implementation Spreadsheets", { contentDir: "ch06/27-rapid-implementation-spreadsheets" }),
      L(28, "testing-and-reviewing-your-enterprise-structure", "Testing and Reviewing Your Enterprise Structure", { contentDir: "ch06/28-testing-and-reviewing-your-enterprise-structure" }),
      L(29, "common-enterprise-structure-mistakes", "Common Enterprise Structure Mistakes", { contentDir: "ch06/29-common-enterprise-structure-mistakes" }),
    ],
  },
];
