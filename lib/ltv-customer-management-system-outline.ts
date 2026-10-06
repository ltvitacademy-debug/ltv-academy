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
      L(1, "capstone-kickoff-and-requirements", "Capstone Kickoff and Requirements", { contentDir: "ch01/01-capstone-kickoff-and-requirements" }),
      L(2, "reviewing-the-fictional-company", "Reviewing the Fictional Company", { contentDir: "ch01/02-reviewing-the-fictional-company" }),
      L(3, "designing-the-data-model", "Designing the Data Model", { contentDir: "ch01/03-designing-the-data-model" }),
      L(4, "designing-the-security-model", "Designing the Security Model", { contentDir: "ch01/04-designing-the-security-model" }),
      L(5, "planning-the-build", "Planning the Build", { contentDir: "ch01/05-planning-the-build" }),
    ],
  },
  {
    n: 2,
    title: "Build: Data and Objects",
    lessons: [
      L(6, "accounts-and-contacts", "Accounts and Contacts", { contentDir: "ch02/06-accounts-and-contacts" }),
      L(7, "leads-and-lead-conversion", "Leads and Lead Conversion", { contentDir: "ch02/07-leads-and-lead-conversion" }),
      L(8, "opportunities-and-sales-stages", "Opportunities and Sales Stages", { contentDir: "ch02/08-opportunities-and-sales-stages" }),
      L(9, "custom-objects", "Custom Objects", { contentDir: "ch02/09-custom-objects" }),
      L(10, "page-layouts-and-lightning-pages", "Page Layouts and Lightning Pages", { contentDir: "ch02/10-page-layouts-and-lightning-pages" }),
    ],
  },
  {
    n: 3,
    title: "Build: Automation and Security",
    lessons: [
      L(11, "security-model-implementation", "Security Model Implementation", { contentDir: "ch03/11-security-model-implementation" }),
      L(12, "flows", "Flows", { contentDir: "ch03/12-flows" }),
      L(13, "validation-rules", "Validation Rules", { contentDir: "ch03/13-validation-rules" }),
      L(14, "approval-processes", "Approval Processes", { contentDir: "ch03/14-approval-processes" }),
    ],
  },
  {
    n: 4,
    title: "Analytics and Delivery",
    lessons: [
      L(15, "reports-and-dashboards", "Reports and Dashboards", { contentDir: "ch04/15-reports-and-dashboards" }),
      L(16, "data-loading-and-sample-data", "Data Loading and Sample Data", { contentDir: "ch04/16-data-loading-and-sample-data" }),
      L(17, "testing", "Testing", { contentDir: "ch04/17-testing" }),
      L(18, "documentation", "Documentation", { contentDir: "ch04/18-documentation" }),
      L(19, "presenting-your-portfolio-project", "Presenting Your Portfolio Project", { contentDir: "ch04/19-presenting-your-portfolio-project" }),
      L(20, "capstone-i-retrospective", "Capstone I Retrospective", { contentDir: "ch04/20-capstone-i-retrospective" }),
    ],
  },
];
