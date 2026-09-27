// The Lightning Web Components course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/lightning-web-components/
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

export const SFTA_LIGHTNING_WEB_COMPONENTS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Component Basics",
    lessons: [
      L(1, "lwc-overview-and-setup", "LWC Overview and Setup"),
      L(2, "modern-javascript-for-lwc", "Modern JavaScript for LWC"),
      L(3, "html-templates", "HTML Templates"),
      L(4, "javascript-fundamentals", "JavaScript Fundamentals"),
      L(5, "components-and-component-files", "Components and Component Files"),
      L(6, "properties-and-reactivity", "Properties and Reactivity"),
      L(7, "conditional-rendering-and-lists", "Conditional Rendering and Lists"),
      L(8, "getters-and-computed-values", "Getters and Computed Values"),
    ],
  },
  {
    n: 2,
    title: "Connecting Components",
    lessons: [
      L(9, "events", "Events"),
      L(10, "parent-to-child-communication", "Parent to Child Communication"),
      L(11, "child-to-parent-communication", "Child to Parent Communication"),
      L(12, "lightning-message-service", "Lightning Message Service"),
      L(13, "slots-and-composition", "Slots and Composition"),
      L(14, "lifecycle-hooks", "Lifecycle Hooks"),
    ],
  },
  {
    n: 3,
    title: "Working with Salesforce Data",
    lessons: [
      L(15, "calling-apex", "Calling Apex"),
      L(16, "lightning-data-service", "Lightning Data Service"),
      L(17, "the-wire-service", "The Wire Service"),
      L(18, "imperative-apex-calls", "Imperative Apex Calls"),
      L(19, "refreshing-data-and-caching", "Refreshing Data and Caching"),
      L(20, "navigation-and-the-lightning-platform-services", "Navigation and the Lightning Platform Services"),
      L(21, "error-handling-and-toasts", "Error Handling and Toasts"),
    ],
  },
  {
    n: 4,
    title: "Reusable UI",
    lessons: [
      L(22, "base-lightning-components", "Base Lightning Components"),
      L(23, "reusable-ui-components", "Reusable UI Components"),
      L(24, "styling", "Styling"),
      L(25, "design-systems-and-slds", "Design Systems and SLDS"),
      L(26, "custom-labels-static-resources-and-assets", "Custom Labels, Static Resources and Assets"),
      L(27, "exposing-components-to-app-builder", "Exposing Components to App Builder"),
    ],
  },
  {
    n: 5,
    title: "Testing and Delivery",
    lessons: [
      L(28, "lwc-testing-with-jest", "LWC Testing With Jest"),
      L(29, "lwc-debugging", "LWC Debugging"),
      L(30, "accessibility", "Accessibility"),
      L(31, "performance-best-practices", "Performance Best Practices"),
      L(32, "lwc-practice-project-case-dashboard", "LWC Practice Project: Case Dashboard"),
      L(33, "lwc-practice-project-record-search-tool", "LWC Practice Project: Record Search Tool"),
    ],
  },
];
