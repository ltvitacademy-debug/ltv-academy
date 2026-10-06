// The Salesforce Platform App Builder course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-platform-app-builder/
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

export const SFTA_SALESFORCE_PLATFORM_APP_BUILDER_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Application Fundamentals",
    lessons: [
      L(1, "what-a-salesforce-application-is", "What a Salesforce Application Is", { contentDir: "ch01/01-what-a-salesforce-application-is" }),
      L(2, "custom-applications", "Custom Applications", { contentDir: "ch01/02-custom-applications" }),
      L(3, "requirements-and-application-design-principles", "Requirements and Application Design Principles", { contentDir: "ch01/03-requirements-and-application-design-principles" }),
      L(4, "data-modeling-for-apps", "Data Modeling for Apps", { contentDir: "ch01/04-data-modeling-for-apps" }),
      L(5, "custom-objects-and-relationships", "Custom Objects and Relationships", { contentDir: "ch01/05-custom-objects-and-relationships" }),
      L(6, "field-design-for-apps", "Field Design for Apps", { contentDir: "ch01/06-field-design-for-apps" }),
    ],
  },
  {
    n: 2,
    title: "User Interface",
    lessons: [
      L(7, "page-layouts-and-compact-layouts", "Page Layouts and Compact Layouts", { contentDir: "ch02/07-page-layouts-and-compact-layouts" }),
      L(8, "lightning-app-builder", "Lightning App Builder", { contentDir: "ch02/08-lightning-app-builder" }),
      L(9, "lightning-pages-and-dynamic-forms", "Lightning Pages and Dynamic Forms", { contentDir: "ch02/09-lightning-pages-and-dynamic-forms" }),
      L(10, "actions-and-quick-actions", "Actions and Quick Actions", { contentDir: "ch02/10-actions-and-quick-actions" }),
      L(11, "lightning-components-on-pages", "Lightning Components on Pages", { contentDir: "ch02/11-lightning-components-on-pages" }),
      L(12, "mobile-and-the-salesforce-mobile-app", "Mobile and the Salesforce Mobile App", { contentDir: "ch02/12-mobile-and-the-salesforce-mobile-app" }),
    ],
  },
  {
    n: 3,
    title: "Business Logic",
    lessons: [
      L(13, "business-logic-overview", "Business Logic Overview", { contentDir: "ch03/13-business-logic-overview" }),
      L(14, "validation-rules", "Validation Rules", { contentDir: "ch03/14-validation-rules" }),
      L(15, "formula-fields-for-logic", "Formula Fields for Logic", { contentDir: "ch03/15-formula-fields-for-logic" }),
      L(16, "roll-up-summary-fields-and-junction-objects", "Roll-Up Summary Fields and Junction Objects", { contentDir: "ch03/16-roll-up-summary-fields-and-junction-objects" }),
      L(17, "approval-processes-and-flow-for-apps", "Approval Processes and Flow for Apps", { contentDir: "ch03/17-approval-processes-and-flow-for-apps" }),
      L(18, "choosing-the-right-automation-tool", "Choosing the Right Automation Tool", { contentDir: "ch03/18-choosing-the-right-automation-tool" }),
    ],
  },
  {
    n: 4,
    title: "Delivering Applications",
    lessons: [
      L(19, "reports-and-dashboards-for-apps", "Reports and Dashboards for Apps", { contentDir: "ch04/19-reports-and-dashboards-for-apps" }),
      L(20, "security-for-custom-applications", "Security for Custom Applications", { contentDir: "ch04/20-security-for-custom-applications" }),
      L(21, "deployment-change-sets-and-environments", "Deployment: Change Sets and Environments", { contentDir: "ch04/21-deployment-change-sets-and-environments" }),
      L(22, "user-experience-and-adoption", "User Experience and Adoption", { contentDir: "ch04/22-user-experience-and-adoption" }),
      L(23, "app-builder-case-study", "App Builder Case Study", { contentDir: "ch04/23-app-builder-case-study" }),
      L(24, "building-a-complete-app", "Building a Complete App", { contentDir: "ch04/24-building-a-complete-app" }),
    ],
  },
];
