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
      L(1, "introduction-to-apex-and-the-developer-console", "Introduction to Apex and the Developer Console", { contentDir: "ch01/01-introduction-to-apex-and-the-developer-console" }),
      L(2, "variables-and-data-types", "Variables and Data Types", { contentDir: "ch01/02-variables-and-data-types" }),
      L(3, "operators-and-expressions", "Operators and Expressions", { contentDir: "ch01/03-operators-and-expressions" }),
      L(4, "collections-lists-sets-and-maps", "Collections: Lists, Sets and Maps", { contentDir: "ch01/04-collections-lists-sets-and-maps" }),
      L(5, "control-flow-conditions-and-loops", "Control Flow: Conditions and Loops", { contentDir: "ch01/05-control-flow-conditions-and-loops" }),
      L(6, "classes-and-methods", "Classes and Methods", { contentDir: "ch01/06-classes-and-methods" }),
      L(7, "object-oriented-concepts-in-apex", "Object-Oriented Concepts in Apex", { contentDir: "ch01/07-object-oriented-concepts-in-apex" }),
      L(8, "access-modifiers-and-static-members", "Access Modifiers and Static Members", { contentDir: "ch01/08-access-modifiers-and-static-members" }),
      L(9, "interfaces-and-inheritance", "Interfaces and Inheritance", { contentDir: "ch01/09-interfaces-and-inheritance" }),
    ],
  },
  {
    n: 2,
    title: "Working with Data in Apex",
    lessons: [
      L(10, "soql-in-apex", "SOQL in Apex", { contentDir: "ch02/10-soql-in-apex" }),
      L(11, "dml-statements", "DML Statements", { contentDir: "ch02/11-dml-statements" }),
      L(12, "database-class-methods", "Database Class Methods", { contentDir: "ch02/12-database-class-methods" }),
      L(13, "working-with-related-records", "Working with Related Records", { contentDir: "ch02/13-working-with-related-records" }),
      L(14, "sobjects-and-field-access", "SObjects and Field Access", { contentDir: "ch02/14-sobjects-and-field-access" }),
      L(15, "exception-handling", "Exception Handling", { contentDir: "ch02/15-exception-handling" }),
      L(16, "custom-exceptions", "Custom Exceptions", { contentDir: "ch02/16-custom-exceptions" }),
      L(17, "transactions-and-rollbacks", "Transactions and Rollbacks", { contentDir: "ch02/17-transactions-and-rollbacks" }),
    ],
  },
  {
    n: 3,
    title: "Triggers",
    lessons: [
      L(18, "what-triggers-are", "What Triggers Are", { contentDir: "ch03/18-what-triggers-are" }),
      L(19, "trigger-context-variables", "Trigger Context Variables", { contentDir: "ch03/19-trigger-context-variables" }),
      L(20, "before-and-after-triggers", "Before and After Triggers", { contentDir: "ch03/20-before-and-after-triggers" }),
      L(21, "trigger-handlers-and-frameworks", "Trigger Handlers and Frameworks", { contentDir: "ch03/21-trigger-handlers-and-frameworks" }),
      L(22, "one-trigger-per-object", "One Trigger per Object", { contentDir: "ch03/22-one-trigger-per-object" }),
      L(23, "bulkification", "Bulkification", { contentDir: "ch03/23-bulkification" }),
      L(24, "avoiding-recursion-in-triggers", "Avoiding Recursion in Triggers", { contentDir: "ch03/24-avoiding-recursion-in-triggers" }),
      L(25, "trigger-practice-lab", "Trigger Practice Lab", { contentDir: "ch03/25-trigger-practice-lab" }),
    ],
  },
  {
    n: 4,
    title: "Governor Limits and Design",
    lessons: [
      L(26, "governor-limits", "Governor Limits", { contentDir: "ch04/26-governor-limits" }),
      L(27, "working-within-soql-and-dml-limits", "Working Within SOQL and DML Limits", { contentDir: "ch04/27-working-within-soql-and-dml-limits" }),
      L(28, "apex-best-practices-and-design-patterns", "Apex Best Practices and Design Patterns", { contentDir: "ch04/28-apex-best-practices-and-design-patterns" }),
      L(29, "selector-and-service-layer-patterns", "Selector and Service Layer Patterns", { contentDir: "ch04/29-selector-and-service-layer-patterns" }),
      L(30, "custom-metadata-and-custom-settings-in-apex", "Custom Metadata and Custom Settings in Apex", { contentDir: "ch04/30-custom-metadata-and-custom-settings-in-apex" }),
      L(31, "apex-security-sharing-and-crud-fls", "Apex Security: Sharing and CRUD/FLS", { contentDir: "ch04/31-apex-security-sharing-and-crud-fls" }),
      L(32, "working-with-dates-times-and-strings", "Working With Dates, Times and Strings", { contentDir: "ch04/32-working-with-dates-times-and-strings" }),
    ],
  },
  {
    n: 5,
    title: "Applied Apex",
    lessons: [
      L(33, "apex-practice-project-opportunity-automation", "Apex Practice Project: Opportunity Automation", { contentDir: "ch05/33-apex-practice-project-opportunity-automation" }),
      L(34, "apex-practice-project-case-routing", "Apex Practice Project: Case Routing", { contentDir: "ch05/34-apex-practice-project-case-routing" }),
      L(35, "apex-practice-project-data-cleanup", "Apex Practice Project: Data Cleanup", { contentDir: "ch05/35-apex-practice-project-data-cleanup" }),
      L(36, "debugging-apex-with-debug-logs", "Debugging Apex with Debug Logs", { contentDir: "ch05/36-debugging-apex-with-debug-logs" }),
      L(37, "reading-apex-documentation", "Reading Apex Documentation", { contentDir: "ch05/37-reading-apex-documentation" }),
      L(38, "apex-code-review-checklist", "Apex Code Review Checklist", { contentDir: "ch05/38-apex-code-review-checklist" }),
    ],
  },
  {
    n: 6,
    title: "Apex Beyond the Basics",
    lessons: [
      L(39, "apex-rest-overview", "Apex REST Overview", { contentDir: "ch06/39-apex-rest-overview" }),
      L(40, "invocable-methods-and-flow", "Invocable Methods and Flow", { contentDir: "ch06/40-invocable-methods-and-flow" }),
      L(41, "apex-enums-and-wrapper-classes", "Apex Enums and Wrapper Classes", { contentDir: "ch06/41-apex-enums-and-wrapper-classes" }),
      L(42, "working-with-json-in-apex", "Working With JSON in Apex", { contentDir: "ch06/42-working-with-json-in-apex" }),
      L(43, "apex-performance-considerations", "Apex Performance Considerations", { contentDir: "ch06/43-apex-performance-considerations" }),
    ],
  },
];
