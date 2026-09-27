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
      L(1, "what-programming-is", "What Programming Is"),
      L(2, "how-software-runs", "How Software Runs"),
      L(3, "variables-and-data-types", "Variables and Data Types"),
      L(4, "operators-and-expressions", "Operators and Expressions"),
      L(5, "control-flow-conditions", "Control Flow: Conditions"),
      L(6, "control-flow-loops", "Control Flow: Loops"),
    ],
  },
  {
    n: 2,
    title: "Structuring Code",
    lessons: [
      L(7, "functions-and-methods", "Functions and Methods"),
      L(8, "objects-and-classes", "Objects and Classes"),
      L(9, "arrays-and-collections", "Arrays and Collections"),
      L(10, "strings-and-text-handling", "Strings and Text Handling"),
      L(11, "errors-and-exceptions", "Errors and Exceptions"),
      L(12, "debugging-and-thinking-like-a-developer", "Debugging and Thinking Like a Developer"),
    ],
  },
  {
    n: 3,
    title: "Developer Habits",
    lessons: [
      L(13, "reading-documentation-and-error-messages", "Reading Documentation and Error Messages"),
      L(14, "version-control-concepts", "Version Control Concepts"),
      L(15, "writing-clean-code", "Writing Clean Code"),
      L(16, "testing-your-own-code", "Testing Your Own Code"),
      L(17, "the-developer-console-and-vs-code", "The Developer Console and VS Code"),
      L(18, "from-programming-concepts-to-salesforce-development", "From Programming Concepts to Salesforce Development"),
    ],
  },
];
