// The LTV Customer Management System course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ltv-customer-management-system/
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

export const SFTA_LTV_CUSTOMER_MANAGEMENT_SYSTEM_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Capstone I",
    lessons: [
      L(1, "capstone-kickoff-and-requirements", "Capstone Kickoff and Requirements"),
      L(2, "designing-the-data-model", "Designing the Data Model"),
      L(3, "designing-the-security-model", "Designing the Security Model"),
      L(4, "accounts-and-contacts", "Accounts and Contacts"),
      L(5, "leads-and-opportunities", "Leads and Opportunities"),
      L(6, "custom-objects", "Custom Objects"),
      L(7, "flows-and-validation-rules", "Flows and Validation Rules"),
      L(8, "reports-and-dashboards", "Reports and Dashboards"),
      L(9, "testing-and-documentation", "Testing and Documentation"),
      L(10, "presenting-your-portfolio-project", "Presenting Your Portfolio Project"),
    ],
  },
];
