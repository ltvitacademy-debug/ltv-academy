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
      L(1, "what-a-salesforce-application-is", "What a Salesforce Application Is"),
      L(2, "custom-applications", "Custom Applications"),
      L(3, "requirements-and-application-design-principles", "Requirements and Application Design Principles"),
      L(4, "data-modeling-for-apps", "Data Modeling for Apps"),
      L(5, "custom-objects-and-relationships", "Custom Objects and Relationships"),
      L(6, "field-design-for-apps", "Field Design for Apps"),
    ],
  },
  {
    n: 2,
    title: "User Interface",
    lessons: [
      L(7, "page-layouts-and-compact-layouts", "Page Layouts and Compact Layouts"),
      L(8, "lightning-app-builder", "Lightning App Builder"),
      L(9, "lightning-pages-and-dynamic-forms", "Lightning Pages and Dynamic Forms"),
      L(10, "actions-and-quick-actions", "Actions and Quick Actions"),
      L(11, "lightning-components-on-pages", "Lightning Components on Pages"),
      L(12, "mobile-and-the-salesforce-mobile-app", "Mobile and the Salesforce Mobile App"),
    ],
  },
  {
    n: 3,
    title: "Business Logic",
    lessons: [
      L(13, "business-logic-overview", "Business Logic Overview"),
      L(14, "validation-rules", "Validation Rules"),
      L(15, "formula-fields-for-logic", "Formula Fields for Logic"),
      L(16, "roll-up-summary-fields-and-junction-objects", "Roll-Up Summary Fields and Junction Objects"),
      L(17, "approval-processes-and-flow-for-apps", "Approval Processes and Flow for Apps"),
      L(18, "choosing-the-right-automation-tool", "Choosing the Right Automation Tool"),
    ],
  },
  {
    n: 4,
    title: "Delivering Applications",
    lessons: [
      L(19, "reports-and-dashboards-for-apps", "Reports and Dashboards for Apps"),
      L(20, "security-for-custom-applications", "Security for Custom Applications"),
      L(21, "deployment-change-sets-and-environments", "Deployment: Change Sets and Environments"),
      L(22, "user-experience-and-adoption", "User Experience and Adoption"),
      L(23, "app-builder-case-study", "App Builder Case Study"),
      L(24, "building-a-complete-app", "Building a Complete App"),
    ],
  },
];
