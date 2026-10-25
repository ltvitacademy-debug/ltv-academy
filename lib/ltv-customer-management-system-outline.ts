// The LTV Customer Management System course outline. All 20 lessons have
// real guide.md content (the header here previously, incorrectly, called
// this "framework only" — fixed 2026-10-17). Lessons without a contentDir
// render as "in production". This is the Salesforce Administrator path's
// capstone (not the Technical Architect path, as a prior version of this
// comment said) — see career-paths.ts's "salesforce-administrator" entry.

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
      L(1, "capstone-kickoff-and-requirements", "Capstone Kickoff and Requirements", { contentDir: "ch01/01-capstone-kickoff-and-requirements", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792521044/ltv-ltv-customer-management-system/capstone-kickoff-and-requirements.mp4", durationLabel: "1 min 48 s" }),
      L(2, "reviewing-the-fictional-company", "Reviewing the Fictional Company", { contentDir: "ch01/02-reviewing-the-fictional-company", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522150/ltv-ltv-customer-management-system/reviewing-the-fictional-company.mp4", durationLabel: "2 min 38 s" }),
      L(3, "designing-the-data-model", "Designing the Data Model", { contentDir: "ch01/03-designing-the-data-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523032/ltv-ltv-customer-management-system/designing-the-data-model.mp4", durationLabel: "1 min 57 s" }),
      L(4, "designing-the-security-model", "Designing the Security Model", { contentDir: "ch01/04-designing-the-security-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524005/ltv-ltv-customer-management-system/designing-the-security-model.mp4", durationLabel: "2 min 9 s" }),
      L(5, "planning-the-build", "Planning the Build", { contentDir: "ch01/05-planning-the-build", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524826/ltv-ltv-customer-management-system/planning-the-build.mp4", durationLabel: "1 min 45 s" }),
    ],
  },
  {
    n: 2,
    title: "Build: Data and Objects",
    lessons: [
      L(6, "accounts-and-contacts", "Accounts and Contacts", { contentDir: "ch02/06-accounts-and-contacts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525732/ltv-ltv-customer-management-system/accounts-and-contacts.mp4", durationLabel: "2 min 6 s" }),
      L(7, "leads-and-lead-conversion", "Leads and Lead Conversion", { contentDir: "ch02/07-leads-and-lead-conversion", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526629/ltv-ltv-customer-management-system/leads-and-lead-conversion.mp4", durationLabel: "1 min 58 s" }),
      L(8, "opportunities-and-sales-stages", "Opportunities and Sales Stages", { contentDir: "ch02/08-opportunities-and-sales-stages", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527574/ltv-ltv-customer-management-system/opportunities-and-sales-stages.mp4", durationLabel: "2 min 5 s" }),
      L(9, "custom-objects", "Custom Objects", { contentDir: "ch02/09-custom-objects", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528374/ltv-ltv-customer-management-system/custom-objects.mp4", durationLabel: "1 min 48 s" }),
      L(10, "page-layouts-and-lightning-pages", "Page Layouts and Lightning Pages", { contentDir: "ch02/10-page-layouts-and-lightning-pages", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529372/ltv-ltv-customer-management-system/page-layouts-and-lightning-pages.mp4", durationLabel: "1 min 55 s" }),
    ],
  },
  {
    n: 3,
    title: "Build: Automation and Security",
    lessons: [
      L(11, "security-model-implementation", "Security Model Implementation", { contentDir: "ch03/11-security-model-implementation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530359/ltv-ltv-customer-management-system/security-model-implementation.mp4", durationLabel: "2 min 10 s" }),
      L(12, "flows", "Flows", { contentDir: "ch03/12-flows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530953/ltv-ltv-customer-management-system/flows.mp4", durationLabel: "1 min 27 s" }),
      L(13, "validation-rules", "Validation Rules", { contentDir: "ch03/13-validation-rules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531780/ltv-ltv-customer-management-system/validation-rules.mp4", durationLabel: "1 min 32 s" }),
      L(14, "approval-processes", "Approval Processes", { contentDir: "ch03/14-approval-processes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532581/ltv-ltv-customer-management-system/approval-processes.mp4", durationLabel: "1 min 29 s" }),
    ],
  },
  {
    n: 4,
    title: "Analytics and Delivery",
    lessons: [
      L(15, "reports-and-dashboards", "Reports and Dashboards", { contentDir: "ch04/15-reports-and-dashboards", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600154/ltv-ltv-customer-management-system/reports-and-dashboards.mp4", durationLabel: "1 min 42 s" }),
      L(16, "data-loading-and-sample-data", "Data Loading and Sample Data", { contentDir: "ch04/16-data-loading-and-sample-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600695/ltv-ltv-customer-management-system/data-loading-and-sample-data.mp4", durationLabel: "1 min 34 s" }),
      L(17, "testing", "Testing", { contentDir: "ch04/17-testing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601134/ltv-ltv-customer-management-system/testing.mp4", durationLabel: "1 min 32 s" }),
      L(18, "documentation", "Documentation", { contentDir: "ch04/18-documentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601576/ltv-ltv-customer-management-system/documentation.mp4", durationLabel: "1 min 19 s" }),
      L(19, "presenting-your-portfolio-project", "Presenting Your Portfolio Project", { contentDir: "ch04/19-presenting-your-portfolio-project", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601922/ltv-ltv-customer-management-system/presenting-your-portfolio-project.mp4", durationLabel: "1 min 6 s" }),
      L(20, "capstone-i-retrospective", "Capstone I Retrospective", { contentDir: "ch04/20-capstone-i-retrospective", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602437/ltv-ltv-customer-management-system/capstone-i-retrospective.mp4", durationLabel: "1 min 32 s" }),
    ],
  },
];
