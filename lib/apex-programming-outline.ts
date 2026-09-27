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
      L(3, "collections", "Collections"),
      L(4, "control-flow", "Control Flow"),
      L(5, "classes-and-methods", "Classes and Methods"),
      L(6, "object-oriented-concepts-in-apex", "Object-Oriented Concepts in Apex"),
    ],
  },
  {
    n: 2,
    title: "Working with Data in Apex",
    lessons: [
      L(7, "soql-in-apex", "SOQL in Apex"),
      L(8, "dml", "DML"),
      L(9, "exception-handling", "Exception Handling"),
    ],
  },
  {
    n: 3,
    title: "Triggers and Limits",
    lessons: [
      L(10, "triggers", "Triggers"),
      L(11, "trigger-context-and-trigger-handlers", "Trigger Context and Trigger Handlers"),
      L(12, "bulkification", "Bulkification"),
      L(13, "governor-limits", "Governor Limits"),
      L(14, "apex-best-practices-and-design-patterns", "Apex Best Practices and Design Patterns"),
    ],
  },
];
