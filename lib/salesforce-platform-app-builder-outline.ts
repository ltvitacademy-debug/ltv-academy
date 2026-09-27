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
    title: "Building Applications",
    lessons: [
      L(1, "custom-applications", "Custom Applications"),
      L(2, "custom-objects-and-relationships", "Custom Objects and Relationships"),
      L(3, "data-modeling-for-apps", "Data Modeling for Apps"),
      L(4, "page-layouts-and-compact-layouts", "Page Layouts and Compact Layouts"),
      L(5, "lightning-app-builder", "Lightning App Builder"),
    ],
  },
  {
    n: 2,
    title: "Design and Delivery",
    lessons: [
      L(6, "lightning-pages-and-dynamic-forms", "Lightning Pages and Dynamic Forms"),
      L(7, "business-logic-overview", "Business Logic Overview"),
      L(8, "application-design-principles", "Application Design Principles"),
      L(9, "user-experience-and-adoption", "User Experience and Adoption"),
      L(10, "building-a-complete-app", "Building a Complete App"),
    ],
  },
];
