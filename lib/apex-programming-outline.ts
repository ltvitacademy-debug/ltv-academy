// The Apex Programming course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/apex-programming/
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

export const SFTA_APEX_PROGRAMMING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Apex Fundamentals",
    lessons: [
      L(1, "introduction-to-apex-and-the-developer-console", "Introduction to Apex and the Developer Console"),
      L(2, "variables-and-data-types", "Variables and Data Types"),
      L(3, "operators-and-expressions", "Operators and Expressions"),
      L(4, "collections-lists-sets-and-maps", "Collections: Lists, Sets and Maps"),
      L(5, "control-flow-conditions-and-loops", "Control Flow: Conditions and Loops"),
      L(6, "classes-and-methods", "Classes and Methods"),
      L(7, "object-oriented-concepts-in-apex", "Object-Oriented Concepts in Apex"),
      L(8, "access-modifiers-and-static-members", "Access Modifiers and Static Members"),
      L(9, "interfaces-and-inheritance", "Interfaces and Inheritance"),
    ],
  },
  {
    n: 2,
    title: "Working with Data in Apex",
    lessons: [
      L(10, "soql-in-apex", "SOQL in Apex"),
      L(11, "dml-statements", "DML Statements"),
      L(12, "database-class-methods", "Database Class Methods"),
      L(13, "working-with-related-records", "Working with Related Records"),
      L(14, "sobjects-and-field-access", "SObjects and Field Access"),
      L(15, "exception-handling", "Exception Handling"),
      L(16, "custom-exceptions", "Custom Exceptions"),
      L(17, "transactions-and-rollbacks", "Transactions and Rollbacks"),
    ],
  },
  {
    n: 3,
    title: "Triggers",
    lessons: [
      L(18, "what-triggers-are", "What Triggers Are"),
      L(19, "trigger-context-variables", "Trigger Context Variables"),
      L(20, "before-and-after-triggers", "Before and After Triggers"),
      L(21, "trigger-handlers-and-frameworks", "Trigger Handlers and Frameworks"),
      L(22, "one-trigger-per-object", "One Trigger per Object"),
      L(23, "bulkification", "Bulkification"),
      L(24, "avoiding-recursion-in-triggers", "Avoiding Recursion in Triggers"),
      L(25, "trigger-practice-lab", "Trigger Practice Lab"),
    ],
  },
  {
    n: 4,
    title: "Governor Limits and Design",
    lessons: [
      L(26, "governor-limits", "Governor Limits"),
      L(27, "working-within-soql-and-dml-limits", "Working Within SOQL and DML Limits"),
      L(28, "apex-best-practices-and-design-patterns", "Apex Best Practices and Design Patterns"),
      L(29, "selector-and-service-layer-patterns", "Selector and Service Layer Patterns"),
      L(30, "custom-metadata-and-custom-settings-in-apex", "Custom Metadata and Custom Settings in Apex"),
      L(31, "apex-security-sharing-and-crud-fls", "Apex Security: Sharing and CRUD/FLS"),
      L(32, "working-with-dates-times-and-strings", "Working With Dates, Times and Strings"),
    ],
  },
  {
    n: 5,
    title: "Applied Apex",
    lessons: [
      L(33, "apex-practice-project-opportunity-automation", "Apex Practice Project: Opportunity Automation"),
      L(34, "apex-practice-project-case-routing", "Apex Practice Project: Case Routing"),
      L(35, "apex-practice-project-data-cleanup", "Apex Practice Project: Data Cleanup"),
      L(36, "debugging-apex-with-debug-logs", "Debugging Apex with Debug Logs"),
      L(37, "reading-apex-documentation", "Reading Apex Documentation"),
      L(38, "apex-code-review-checklist", "Apex Code Review Checklist"),
    ],
  },
  {
    n: 6,
    title: "Apex Beyond the Basics",
    lessons: [
      L(39, "apex-rest-overview", "Apex REST Overview"),
      L(40, "invocable-methods-and-flow", "Invocable Methods and Flow"),
      L(41, "apex-enums-and-wrapper-classes", "Apex Enums and Wrapper Classes"),
      L(42, "working-with-json-in-apex", "Working With JSON in Apex"),
      L(43, "apex-performance-considerations", "Apex Performance Considerations"),
    ],
  },
];
