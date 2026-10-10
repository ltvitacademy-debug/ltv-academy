// The Programming Foundations for Salesforce course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/programming-foundations-for-salesforce/
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

export const SFTA_PROGRAMMING_FOUNDATIONS_FOR_SALESFORCE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Programming Concepts",
    lessons: [
      L(1, "what-programming-is", "What Programming Is", { contentDir: "ch01/01-what-programming-is" }),
      L(2, "how-software-runs", "How Software Runs", { contentDir: "ch01/02-how-software-runs" }),
      L(3, "variables-and-data-types", "Variables and Data Types", { contentDir: "ch01/03-variables-and-data-types" }),
      L(4, "operators-and-expressions", "Operators and Expressions", { contentDir: "ch01/04-operators-and-expressions" }),
      L(5, "control-flow-conditions", "Control Flow: Conditions", { contentDir: "ch01/05-control-flow-conditions" }),
      L(6, "control-flow-loops", "Control Flow: Loops", { contentDir: "ch01/06-control-flow-loops" }),
    ],
  },
  {
    n: 2,
    title: "Structuring Code",
    lessons: [
      L(7, "functions-and-methods", "Functions and Methods", { contentDir: "ch02/07-functions-and-methods" }),
      L(8, "objects-and-classes", "Objects and Classes", { contentDir: "ch02/08-objects-and-classes" }),
      L(9, "arrays-and-collections", "Arrays and Collections", { contentDir: "ch02/09-arrays-and-collections" }),
      L(10, "strings-and-text-handling", "Strings and Text Handling", { contentDir: "ch02/10-strings-and-text-handling" }),
      L(11, "errors-and-exceptions", "Errors and Exceptions", { contentDir: "ch02/11-errors-and-exceptions" }),
      L(12, "debugging-and-thinking-like-a-developer", "Debugging and Thinking Like a Developer", { contentDir: "ch02/12-debugging-and-thinking-like-a-developer" }),
    ],
  },
  {
    n: 3,
    title: "Developer Habits",
    lessons: [
      L(13, "reading-documentation-and-error-messages", "Reading Documentation and Error Messages", { contentDir: "ch03/13-reading-documentation-and-error-messages" }),
      L(14, "version-control-concepts", "Version Control Concepts", { contentDir: "ch03/14-version-control-concepts" }),
      L(15, "writing-clean-code", "Writing Clean Code", { contentDir: "ch03/15-writing-clean-code" }),
      L(16, "testing-your-own-code", "Testing Your Own Code", { contentDir: "ch03/16-testing-your-own-code" }),
      L(17, "the-developer-console-and-vs-code", "The Developer Console and VS Code", { contentDir: "ch03/17-the-developer-console-and-vs-code" }),
      L(18, "from-programming-concepts-to-salesforce-development", "From Programming Concepts to Salesforce Development", { contentDir: "ch03/18-from-programming-concepts-to-salesforce-development" }),
    ],
  },
];
