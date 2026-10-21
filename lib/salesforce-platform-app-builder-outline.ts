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
      L(1, "what-a-salesforce-application-is", "What a Salesforce Application Is", { contentDir: "ch01/01-what-a-salesforce-application-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527463/ltv-salesforce-platform-app-builder/what-a-salesforce-application-is.mp4", durationLabel: "1 min 31 s" }),
      L(2, "custom-applications", "Custom Applications", { contentDir: "ch01/02-custom-applications", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528118/ltv-salesforce-platform-app-builder/custom-applications.mp4", durationLabel: "1 min 20 s" }),
      L(3, "requirements-and-application-design-principles", "Requirements and Application Design Principles", { contentDir: "ch01/03-requirements-and-application-design-principles", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528862/ltv-salesforce-platform-app-builder/requirements-and-application-design-principles.mp4", durationLabel: "1 min 32 s" }),
      L(4, "data-modeling-for-apps", "Data Modeling for Apps", { contentDir: "ch01/04-data-modeling-for-apps", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529669/ltv-salesforce-platform-app-builder/data-modeling-for-apps.mp4", durationLabel: "1 min 34 s" }),
      L(5, "custom-objects-and-relationships", "Custom Objects and Relationships", { contentDir: "ch01/05-custom-objects-and-relationships", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530438/ltv-salesforce-platform-app-builder/custom-objects-and-relationships.mp4", durationLabel: "1 min 37 s" }),
      L(6, "field-design-for-apps", "Field Design for Apps", { contentDir: "ch01/06-field-design-for-apps", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531165/ltv-salesforce-platform-app-builder/field-design-for-apps.mp4", durationLabel: "1 min 36 s" }),
    ],
  },
  {
    n: 2,
    title: "User Interface",
    lessons: [
      L(7, "page-layouts-and-compact-layouts", "Page Layouts and Compact Layouts", { contentDir: "ch02/07-page-layouts-and-compact-layouts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532061/ltv-salesforce-platform-app-builder/page-layouts-and-compact-layouts.mp4", durationLabel: "1 min 36 s" }),
      L(8, "lightning-app-builder", "Lightning App Builder", { contentDir: "ch02/08-lightning-app-builder", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792599720/ltv-salesforce-platform-app-builder/lightning-app-builder.mp4", durationLabel: "1 min 40 s" }),
      L(9, "lightning-pages-and-dynamic-forms", "Lightning Pages and Dynamic Forms", { contentDir: "ch02/09-lightning-pages-and-dynamic-forms", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600138/ltv-salesforce-platform-app-builder/lightning-pages-and-dynamic-forms.mp4", durationLabel: "1 min 41 s" }),
      L(10, "actions-and-quick-actions", "Actions and Quick Actions", { contentDir: "ch02/10-actions-and-quick-actions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600693/ltv-salesforce-platform-app-builder/actions-and-quick-actions.mp4", durationLabel: "1 min 34 s" }),
      L(11, "lightning-components-on-pages", "Lightning Components on Pages", { contentDir: "ch02/11-lightning-components-on-pages", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601201/ltv-salesforce-platform-app-builder/lightning-components-on-pages.mp4", durationLabel: "1 min 43 s" }),
      L(12, "mobile-and-the-salesforce-mobile-app", "Mobile and the Salesforce Mobile App", { contentDir: "ch02/12-mobile-and-the-salesforce-mobile-app", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601743/ltv-salesforce-platform-app-builder/mobile-and-the-salesforce-mobile-app.mp4", durationLabel: "1 min 39 s" }),
    ],
  },
  {
    n: 3,
    title: "Business Logic",
    lessons: [
      L(13, "business-logic-overview", "Business Logic Overview", { contentDir: "ch03/13-business-logic-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602411/ltv-salesforce-platform-app-builder/business-logic-overview.mp4", durationLabel: "2 min 12 s" }),
      L(14, "validation-rules", "Validation Rules", { contentDir: "ch03/14-validation-rules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603089/ltv-salesforce-platform-app-builder/validation-rules.mp4", durationLabel: "2 min 11 s" }),
      L(15, "formula-fields-for-logic", "Formula Fields for Logic", { contentDir: "ch03/15-formula-fields-for-logic", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603716/ltv-salesforce-platform-app-builder/formula-fields-for-logic.mp4", durationLabel: "2 min 1 s" }),
      L(16, "roll-up-summary-fields-and-junction-objects", "Roll-Up Summary Fields and Junction Objects", { contentDir: "ch03/16-roll-up-summary-fields-and-junction-objects", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604435/ltv-salesforce-platform-app-builder/roll-up-summary-fields-and-junction-objects.mp4", durationLabel: "2 min 15 s" }),
      L(17, "approval-processes-and-flow-for-apps", "Approval Processes and Flow for Apps", { contentDir: "ch03/17-approval-processes-and-flow-for-apps", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605147/ltv-salesforce-platform-app-builder/approval-processes-and-flow-for-apps.mp4", durationLabel: "2 min 18 s" }),
      L(18, "choosing-the-right-automation-tool", "Choosing the Right Automation Tool", { contentDir: "ch03/18-choosing-the-right-automation-tool", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605945/ltv-salesforce-platform-app-builder/choosing-the-right-automation-tool.mp4", durationLabel: "2 min 30 s" }),
    ],
  },
  {
    n: 4,
    title: "Delivering Applications",
    lessons: [
      L(19, "reports-and-dashboards-for-apps", "Reports and Dashboards for Apps", { contentDir: "ch04/19-reports-and-dashboards-for-apps", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606638/ltv-salesforce-platform-app-builder/reports-and-dashboards-for-apps.mp4", durationLabel: "2 min 4 s" }),
      L(20, "security-for-custom-applications", "Security for Custom Applications", { contentDir: "ch04/20-security-for-custom-applications", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607360/ltv-salesforce-platform-app-builder/security-for-custom-applications.mp4", durationLabel: "2 min 22 s" }),
      L(21, "deployment-change-sets-and-environments", "Deployment: Change Sets and Environments", { contentDir: "ch04/21-deployment-change-sets-and-environments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608050/ltv-salesforce-platform-app-builder/deployment-change-sets-and-environments.mp4", durationLabel: "2 min 12 s" }),
      L(22, "user-experience-and-adoption", "User Experience and Adoption", { contentDir: "ch04/22-user-experience-and-adoption", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608771/ltv-salesforce-platform-app-builder/user-experience-and-adoption.mp4", durationLabel: "2 min 18 s" }),
      L(23, "app-builder-case-study", "App Builder Case Study", { contentDir: "ch04/23-app-builder-case-study", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609527/ltv-salesforce-platform-app-builder/app-builder-case-study.mp4", durationLabel: "2 min 24 s" }),
      L(24, "building-a-complete-app", "Building a Complete App", { contentDir: "ch04/24-building-a-complete-app", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610281/ltv-salesforce-platform-app-builder/building-a-complete-app.mp4", durationLabel: "2 min 29 s" }),
    ],
  },
];
