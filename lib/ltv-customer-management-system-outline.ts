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
    title: "Design",
    lessons: [
      L(1, "capstone-kickoff-and-requirements", "Capstone Kickoff and Requirements"),
      L(2, "reviewing-the-fictional-company", "Reviewing the Fictional Company"),
      L(3, "designing-the-data-model", "Designing the Data Model"),
      L(4, "designing-the-security-model", "Designing the Security Model"),
      L(5, "planning-the-build", "Planning the Build"),
    ],
  },
  {
    n: 2,
    title: "Build: Data and Objects",
    lessons: [
      L(6, "accounts-and-contacts", "Accounts and Contacts"),
      L(7, "leads-and-lead-conversion", "Leads and Lead Conversion"),
      L(8, "opportunities-and-sales-stages", "Opportunities and Sales Stages"),
      L(9, "custom-objects", "Custom Objects"),
      L(10, "page-layouts-and-lightning-pages", "Page Layouts and Lightning Pages"),
    ],
  },
  {
    n: 3,
    title: "Build: Automation and Security",
    lessons: [
      L(11, "security-model-implementation", "Security Model Implementation"),
      L(12, "flows", "Flows"),
      L(13, "validation-rules", "Validation Rules"),
      L(14, "approval-processes", "Approval Processes"),
    ],
  },
  {
    n: 4,
    title: "Analytics and Delivery",
    lessons: [
      L(15, "reports-and-dashboards", "Reports and Dashboards"),
      L(16, "data-loading-and-sample-data", "Data Loading and Sample Data"),
      L(17, "testing", "Testing"),
      L(18, "documentation", "Documentation"),
      L(19, "presenting-your-portfolio-project", "Presenting Your Portfolio Project"),
      L(20, "capstone-i-retrospective", "Capstone I Retrospective"),
    ],
  },
];
