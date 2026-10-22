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
      L(1, "activate-your-practice-environment-and-sign-in", "Activate Your Practice Environment and Sign In", { contentDir: "ch01/01-activate-your-practice-environment-and-sign-in", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792622242/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/activate-your-practice-environment-and-sign-in.mp4", durationLabel: "1 min 14 s" }),
      L(2, "finding-your-way-around-setup-and-maintenance", "Finding Your Way Around Setup and Maintenance", { contentDir: "ch01/02-finding-your-way-around-setup-and-maintenance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792622339/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/finding-your-way-around-setup-and-maintenance.mp4", durationLabel: "1 min 17 s" }),
      L(3, "enterprise-structures-overview", "Enterprise Structures Overview", { contentDir: "ch01/03-enterprise-structures-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792622443/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/enterprise-structures-overview.mp4", durationLabel: "1 min 22 s" }),
      L(4, "functional-setup-manager-and-task-lists", "Functional Setup Manager and Task Lists", { contentDir: "ch01/04-functional-setup-manager-and-task-lists", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792622538/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/functional-setup-manager-and-task-lists.mp4", durationLabel: "1 min 14 s" }),
    ],
  },
  {
    n: 2,
    title: "Legal Entities and Ledgers",
    lessons: [
      L(5, "enterprise-structure-design-principles", "Enterprise Structure Design Principles", { contentDir: "ch02/05-enterprise-structure-design-principles", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792622644/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/enterprise-structure-design-principles.mp4", durationLabel: "1 min 15 s" }),
      L(6, "legal-entities-and-legal-reporting-units", "Legal Entities and Legal Reporting Units", { contentDir: "ch02/06-legal-entities-and-legal-reporting-units", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792622730/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/legal-entities-and-legal-reporting-units.mp4", durationLabel: "1 min 14 s" }),
      L(7, "ledgers-primary-secondary-and-reporting", "Ledgers: Primary, Secondary and Reporting", { contentDir: "ch02/07-ledgers-primary-secondary-and-reporting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792622832/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/ledgers-primary-secondary-and-reporting.mp4", durationLabel: "1 min 12 s" }),
      L(8, "ledger-sets", "Ledger Sets", { contentDir: "ch02/08-ledger-sets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792622937/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/ledger-sets.mp4", durationLabel: "1 min 15 s" }),
      L(9, "accounting-configuration-manager-walkthrough", "Accounting Configuration Manager Walkthrough", { contentDir: "ch02/09-accounting-configuration-manager-walkthrough", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623043/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/accounting-configuration-manager-walkthrough.mp4", durationLabel: "1 min 18 s" }),
    ],
  },
  {
    n: 3,
    title: "Business Units and Reference Data",
    lessons: [
      L(10, "business-units", "Business Units", { contentDir: "ch03/10-business-units", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623139/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/business-units.mp4", durationLabel: "1 min 16 s" }),
      L(11, "business-unit-functions-and-assignments", "Business Unit Functions and Assignments", { contentDir: "ch03/11-business-unit-functions-and-assignments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623223/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/business-unit-functions-and-assignments.mp4", durationLabel: "1 min 7 s" }),
      L(12, "reference-data-sets", "Reference Data Sets", { contentDir: "ch03/12-reference-data-sets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623325/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/reference-data-sets.mp4", durationLabel: "1 min 13 s" }),
      L(13, "shared-and-non-shared-reference-data", "Shared and Non-Shared Reference Data", { contentDir: "ch03/13-shared-and-non-shared-reference-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623424/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/shared-and-non-shared-reference-data.mp4", durationLabel: "1 min 18 s" }),
      L(14, "locations-geographies-and-addresses", "Locations, Geographies and Addresses", { contentDir: "ch03/14-locations-geographies-and-addresses", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623527/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/locations-geographies-and-addresses.mp4", durationLabel: "1 min 16 s" }),
    ],
  },
  {
    n: 4,
    title: "Calendars and Currencies",
    lessons: [
      L(15, "accounting-calendars-and-periods", "Accounting Calendars and Periods", { contentDir: "ch04/15-accounting-calendars-and-periods", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623626/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/accounting-calendars-and-periods.mp4", durationLabel: "1 min 14 s" }),
      L(16, "period-types-and-adjusting-periods", "Period Types and Adjusting Periods", { contentDir: "ch04/16-period-types-and-adjusting-periods", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623722/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/period-types-and-adjusting-periods.mp4", durationLabel: "1 min 12 s" }),
      L(17, "currencies-and-conversion-rate-types", "Currencies and Conversion Rate Types", { contentDir: "ch04/17-currencies-and-conversion-rate-types", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623821/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/currencies-and-conversion-rate-types.mp4", durationLabel: "1 min 12 s" }),
      L(18, "daily-rates-and-currency-conversion", "Daily Rates and Currency Conversion", { contentDir: "ch04/18-daily-rates-and-currency-conversion", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623902/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/daily-rates-and-currency-conversion.mp4", durationLabel: "1 min 6 s" }),
      L(19, "opening-the-first-accounting-period", "Opening the First Accounting Period", { contentDir: "ch04/19-opening-the-first-accounting-period", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792623988/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/opening-the-first-accounting-period.mp4", durationLabel: "1 min 5 s" }),
    ],
  },
  {
    n: 5,
    title: "Chart of Accounts",
    lessons: [
      L(20, "chart-of-accounts-structure-and-segments", "Chart of Accounts Structure and Segments", { contentDir: "ch05/20-chart-of-accounts-structure-and-segments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624089/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/chart-of-accounts-structure-and-segments.mp4", durationLabel: "1 min 11 s" }),
      L(21, "segment-labels-balancing-cost-center-and-natural-account", "Segment Labels: Balancing, Cost Center and Natural Account", { contentDir: "ch05/21-segment-labels-balancing-cost-center-and-natural-account", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624206/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/segment-labels-balancing-cost-center-and-natural-account.mp4", durationLabel: "1 min 28 s" }),
      L(22, "value-sets-and-values", "Value Sets and Values", { contentDir: "ch05/22-value-sets-and-values", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624292/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/value-sets-and-values.mp4", durationLabel: "1 min 8 s" }),
      L(23, "account-hierarchies-and-trees", "Account Hierarchies and Trees", { contentDir: "ch05/23-account-hierarchies-and-trees", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624384/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/account-hierarchies-and-trees.mp4", durationLabel: "1 min 13 s" }),
      L(24, "cross-validation-rules", "Cross-Validation Rules", { contentDir: "ch05/24-cross-validation-rules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624479/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/cross-validation-rules.mp4", durationLabel: "1 min 13 s" }),
    ],
  },
  {
    n: 6,
    title: "Putting It Together",
    lessons: [
      L(25, "designing-a-chart-of-accounts-for-a-manufacturer", "Designing a Chart of Accounts for a Manufacturer", { contentDir: "ch06/25-designing-a-chart-of-accounts-for-a-manufacturer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624612/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/designing-a-chart-of-accounts-for-a-manufacturer.mp4", durationLabel: "1 min 35 s" }),
      L(26, "deploying-flexfields-and-structures", "Deploying Flexfields and Structures", { contentDir: "ch06/26-deploying-flexfields-and-structures", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624704/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/deploying-flexfields-and-structures.mp4", durationLabel: "1 min 13 s" }),
      L(27, "rapid-implementation-spreadsheets", "Rapid Implementation Spreadsheets", { contentDir: "ch06/27-rapid-implementation-spreadsheets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624806/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/rapid-implementation-spreadsheets.mp4", durationLabel: "1 min 13 s" }),
      L(28, "testing-and-reviewing-your-enterprise-structure", "Testing and Reviewing Your Enterprise Structure", { contentDir: "ch06/28-testing-and-reviewing-your-enterprise-structure", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624903/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/testing-and-reviewing-your-enterprise-structure.mp4", durationLabel: "1 min 15 s" }),
      L(29, "common-enterprise-structure-mistakes", "Common Enterprise Structure Mistakes", { contentDir: "ch06/29-common-enterprise-structure-mistakes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624999/ltv-oracle-fusion-enterprise-structures-and-chart-of-accounts/common-enterprise-structure-mistakes.mp4", durationLabel: "1 min 13 s" }),
    ],
  },
];
