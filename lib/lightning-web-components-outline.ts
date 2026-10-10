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
      L(1, "lwc-overview-and-setup", "LWC Overview and Setup", { contentDir: "ch01/01-lwc-overview-and-setup" }),
      L(2, "modern-javascript-for-lwc", "Modern JavaScript for LWC", { contentDir: "ch01/02-modern-javascript-for-lwc" }),
      L(3, "html-templates", "HTML Templates", { contentDir: "ch01/03-html-templates" }),
      L(4, "javascript-fundamentals", "JavaScript Fundamentals", { contentDir: "ch01/04-javascript-fundamentals" }),
      L(5, "components-and-component-files", "Components and Component Files", { contentDir: "ch01/05-components-and-component-files" }),
      L(6, "properties-and-reactivity", "Properties and Reactivity", { contentDir: "ch01/06-properties-and-reactivity" }),
      L(7, "conditional-rendering-and-lists", "Conditional Rendering and Lists", { contentDir: "ch01/07-conditional-rendering-and-lists" }),
      L(8, "getters-and-computed-values", "Getters and Computed Values", { contentDir: "ch01/08-getters-and-computed-values" }),
    ],
  },
  {
    n: 2,
    title: "Connecting Components",
    lessons: [
      L(9, "events", "Events", { contentDir: "ch02/09-events" }),
      L(10, "parent-to-child-communication", "Parent to Child Communication", { contentDir: "ch02/10-parent-to-child-communication" }),
      L(11, "child-to-parent-communication", "Child to Parent Communication", { contentDir: "ch02/11-child-to-parent-communication" }),
      L(12, "lightning-message-service", "Lightning Message Service", { contentDir: "ch02/12-lightning-message-service" }),
      L(13, "slots-and-composition", "Slots and Composition", { contentDir: "ch02/13-slots-and-composition" }),
      L(14, "lifecycle-hooks", "Lifecycle Hooks", { contentDir: "ch02/14-lifecycle-hooks" }),
    ],
  },
  {
    n: 3,
    title: "Working with Salesforce Data",
    lessons: [
      L(15, "calling-apex", "Calling Apex", { contentDir: "ch03/15-calling-apex" }),
      L(16, "lightning-data-service", "Lightning Data Service", { contentDir: "ch03/16-lightning-data-service" }),
      L(17, "the-wire-service", "The Wire Service", { contentDir: "ch03/17-the-wire-service" }),
      L(18, "imperative-apex-calls", "Imperative Apex Calls", { contentDir: "ch03/18-imperative-apex-calls" }),
      L(19, "refreshing-data-and-caching", "Refreshing Data and Caching", { contentDir: "ch03/19-refreshing-data-and-caching" }),
      L(20, "navigation-and-the-lightning-platform-services", "Navigation and the Lightning Platform Services", { contentDir: "ch03/20-navigation-and-the-lightning-platform-services" }),
      L(21, "error-handling-and-toasts", "Error Handling and Toasts", { contentDir: "ch03/21-error-handling-and-toasts" }),
    ],
  },
  {
    n: 4,
    title: "Reusable UI",
    lessons: [
      L(22, "base-lightning-components", "Base Lightning Components", { contentDir: "ch04/22-base-lightning-components" }),
      L(23, "reusable-ui-components", "Reusable UI Components", { contentDir: "ch04/23-reusable-ui-components" }),
      L(24, "styling", "Styling", { contentDir: "ch04/24-styling" }),
      L(25, "design-systems-and-slds", "Design Systems and SLDS", { contentDir: "ch04/25-design-systems-and-slds" }),
      L(26, "custom-labels-static-resources-and-assets", "Custom Labels, Static Resources and Assets", { contentDir: "ch04/26-custom-labels-static-resources-and-assets" }),
      L(27, "exposing-components-to-app-builder", "Exposing Components to App Builder", { contentDir: "ch04/27-exposing-components-to-app-builder" }),
    ],
  },
  {
    n: 5,
    title: "Testing and Delivery",
    lessons: [
      L(28, "lwc-testing-with-jest", "LWC Testing With Jest", { contentDir: "ch05/28-lwc-testing-with-jest" }),
      L(29, "lwc-debugging", "LWC Debugging", { contentDir: "ch05/29-lwc-debugging" }),
      L(30, "accessibility", "Accessibility", { contentDir: "ch05/30-accessibility" }),
      L(31, "performance-best-practices", "Performance Best Practices", { contentDir: "ch05/31-performance-best-practices" }),
      L(32, "lwc-practice-project-case-dashboard", "LWC Practice Project: Case Dashboard", { contentDir: "ch05/32-lwc-practice-project-case-dashboard" }),
      L(33, "lwc-practice-project-record-search-tool", "LWC Practice Project: Record Search Tool", { contentDir: "ch05/33-lwc-practice-project-record-search-tool" }),
    ],
  },
];
